import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { ProfitForLabor, DirectCostForMaterial, DirectCostForLabor, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidItem, sortcode } from './functions'
import Construction from './construction';
import BidLineItem from './bidlineitem'

class Bid extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csiids: [], biditems: [], spinner: false, activecsiid: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const construction = new Construction();

        const csicodes = construction.getcsis.call(this)
        if (!csicodes) {
            construction.loadcsis.call(this)
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }



    getitems() {
        const construction = new Construction();
        let payitems = construction.getAllActual.call(this)

        let items = [];
        const validateNewItem = (items, item) => {
            let validate = true;
            // eslint-disable-next-line
            items.map(myitem => {
                if (myitem.csiid === item.csiid) {
                    validate = false;
                }
            })
            return validate;
        }
        // eslint-disable-next-line
        payitems.map(item => {

            if (item.hasOwnProperty("laborid")) {

                items.push(item)


            }
            if (item.hasOwnProperty("materialid")) {

                items.push(item)


            }
            if (item.hasOwnProperty("equipmentid")) {

                items.push(item)


            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {
                    const csi = construction.getcsibyid.call(this, lineitem.csiid)

                    let newItem = CreateBidItem(lineitem.csiid, "", 0)
                    newItem.csi = csi.csi
                    csis.push(newItem)
                }
            })
        }

        csis.sort((codea, codeb) => {
            return (sortcode(codea, codeb))
        })

        return csis;
    }
    showbiditems() {
        let biditems = this.getitems();

        let lineids = [];
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                lineids.push(this.showbiditem(item))
            })
        }
        return lineids;
    }


    getdirectcost(csiid) {
        const construction = new Construction();
        let myproject = construction.getproject.call(this);

        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actual")) {
                if (myproject.actual.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    myproject.actual.labor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            directcost += DirectCostForLabor(mylabor)


                        }
                    })
                }

                if (myproject.actual.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    myproject.actual.materials.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            directcost += DirectCostForMaterial(mymaterial)

                        }

                    })
                }

                if (myproject.actual.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myproject.actual.equipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {

                            directcost += DirectCostForEquipment(myequipment)


                        }

                    })
                }

            }
        }

        return directcost;

    }

    getamount() {
        let items = this.getitems();
        let amount = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                amount += this.getbidprice(item.csiid)
            })
        }
        return amount;
    }



    getquantity(csiid) {
        let quantity = ""

        const construction = new Construction();
        const item = construction.getbidactualbyid.call(this, csiid);
        if (item) {
            quantity = item.quantity;
        }
        return quantity;

    }



    getunit(csiid) {
        let unit = ""

        const construction = new Construction();
        const item = construction.getbidactualbyid.call(this, csiid);
        if (item) {
            unit = item.unit
        }
        return unit

    }
    getprofit(csiid) {
        const construction = new Construction();
        const myactual = construction.getAllActual.call(this);
        let directcost = 0;
        let profit = 0;
        if (myactual.length > 0) {
            // eslint-disable-next-line
            myactual.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    if (item.csiid === csiid) {
                        directcost += DirectCostForLabor(item);
                        profit += ProfitForLabor(item)

                    }
                }
                else if (item.hasOwnProperty("materialid")) {
                    if (item.csiid === csiid) {
                        directcost += DirectCostForMaterial(item);
                        profit += ProfitForMaterial(item)

                    }
                } else if (item.hasOwnProperty("equipmentid")) {
                    if (item.csiid === csiid) {
                        directcost += DirectCostForEquipment(item);
                        profit += ProfitForEquipment(item)

                    }
                }

            })
        }

        if (profit && directcost > 0) {
            return +Number((profit / directcost) * 100).toFixed(4)
        } else {
            return 0;
        }

    }
    getbidprice(csiid) {
        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }

    getunitprice(csiid) {
        let quantity = Number(this.getquantity(csiid));
        let bidprice = Number(this.getbidprice(csiid));
        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return 0
        }


    }
    handlequantity(csiid, quantity) {
        const construction = new Construction();

        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {
            const project = construction.getproject.call(this);
            if (project) {
                const i = construction.getOurProjectKeyById.call(this, this.props.project_id);
                const actualitems = construction.getbidactual.call(this)
                if (actualitems) {

                    const actualitem = construction.getbidactualbyid.call(this, csiid)
                    if (actualitem) {
                        const j = construction.getbidactualkeybyid.call(this, csiid)
                        myprojects[i].actual.bid[j].quantity = quantity;
                        this.props.reduxMyProjects(myprojects);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity, unit: '' }
                        myprojects[i].actual.bid.push(newItem)
                        this.props.reduxMyProjects(myprojects);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity, unit: '' }
                    myprojects[i].actual.bid = [newItem]
                    this.props.reduxMyProjects(myprojects);
                    this.setState({ render: 'render' })
                }




            }
        }

    }

    handleunit(csiid, unit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)

        if (myprojects) {
            const project = construction.getproject.call(this);
            if (project) {

                const i = construction.getOurProjectKeyById.call(this, this.props.project_id);
                const actualitems = construction.getbidactual.call(this)
                if (actualitems) {

                    const actualitem = construction.getbidactualbyid.call(this, csiid)

                    if (actualitem) {

                        const j = construction.getbidactualkeybyid.call(this, csiid)
                        myprojects[i].actual.bid[j].unit = unit;
                        this.props.reduxMyProjects(myprojects);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity: '', unit }
                        myprojects[i].actual.bid.push(newItem)
                        this.props.reduxMyProjects(myprojects);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity: '', unit }
                    myprojects[i].bid = [newItem]
                    this.props.reduxMyProjects(myprojects);
                    this.setState({ render: 'render' })
                }




            }
        }

    }


    handleprofit(csiid, profit) {

        console.log(csiid, profit)
    }


    showbiditem(item) {


        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const bidField = construction.getbidfield.call(this)
        if (myuser) {


            const project = construction.getproject.call(this)

            if (project) {

                const csi = construction.getcsibyid.call(this, item.csiid);

                if (csi) {

                    const getbidprice = `$${Number(this.getbidprice(item.csiid)).toFixed(2)}`;
                    const getunitprice = `$${Number(this.getunitprice(item.csiid)).toFixed(2)}`;
                    const getdirectcost = `$${Number(this.getdirectcost(item.csiid)).toFixed(2)}`;
                    const getprofit = +Number(this.getprofit(item.csiid)).toFixed(4)
                    const getunit = this.getunit(item.csiid);

                    const unitprice = () => {
                        const unitpriceLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Unit Price <br /></span> : '';
                        return (
                            <div style={{ ...styles.generalContainer }}>
                                {unitpriceLabel}
                                <span style={{ ...styles.generalFont, ...regularFont }}>{getunitprice}/{getunit}</span>
                            </div>)

                    }

                    const profit = () => {
                        const profitLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Profit % <br /></span> : '';
                        return (
                            <div style={{ ...styles.generalContainer }}>
                                {profitLabel}
                                <span style={{ ...styles.generalFont, ...regularFont }}>{getprofit}</span>
                            </div>)

                    }

                    const bidprice = () => {
                        const bidpriceLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Bid Price<br /> </span> : '';
                        return (
                            <div style={{ ...styles.generalContainer }}>
                                {bidpriceLabel}
                                <span style={{ ...styles.generalFont, ...regularFont }}>{getbidprice}</span>
                            </div>)

                    }

                    const directcost = () => {
                        const directcostLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Direct Cost<br /> </span> : '';
                        return (
                            <div style={{ ...styles.generalContainer }}>

                                {directcostLabel}
                                <span style={{ ...styles.generalFont, ...regularFont }}>{getdirectcost}</span>
                            </div>)

                    }

                    const unit = () => {
                        const unitLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Unit<br /></span> : '';
                        return (
                            <div style={{ ...styles.generalContainer }}>

                                {unitLabel}
                                <input type="text"
                                    style={{ ...regularFont, ...styles.generalFont, ...bidField, ...styles.alignCenter }}
                                    value={getunit}
                                    onChange={event => { this.handleunit(item.csiid, event.target.value) }} />
                            </div>)
                    }
                    const quantity = () => {
                        const quantityLabel = this.state.width < 1200 ? <span style={{ ...regularFont, ...styles.generalFont }}>Quantity <br /></span> : '';

                        return (<div style={{ ...styles.generalContainer }}>
                            {quantityLabel}
                            <input type="text"
                                style={{ ...regularFont, ...styles.generalFont, ...bidField, ...styles.alignCenter }}
                                value={this.getquantity(item.csiid)} onChange={event => { this.handlequantity(item.csiid, event.target.value) }} />

                        </div>)
                    }

                    if (this.state.width > 1200) {
                        return (
                            <tr>
                                <td><a style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} onClick={() => { this.handleCSIID(csi.csiid) }}>{csi.csi}-{csi.title}</a></td>
                                <td style={{ ...styles.alignCenter }}>{quantity()}</td>
                                <td style={{ ...styles.alignCenter }}>{unit()}</td>
                                <td style={{ ...styles.alignCenter }}>{directcost()}</td>
                                <td style={{ ...styles.alignCenter }}>{profit()}</td>
                                <td style={{ ...styles.alignCenter }}>{bidprice()}</td>
                                <td style={{ ...styles.alignCenter }}> {unitprice()}</td>
                            </tr>)


                    } else {
                        return (
                            <div style={{ ...styles.generalFlex }} key={item.csiid}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalFlex }}>
                                        <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                            <a style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} onClick={() => { this.handleCSIID(csi.csiid) }}> Line Item <br />
                                                {csi.csi}-{csi.title} </a>
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {quantity()}

                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {unit()}
                                        </div>
                                    </div>

                                    <div style={{ ...styles.generalFlex }}>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {directcost()}
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {profit()}
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {bidprice()}
                                        </div>
                                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                            {unitprice()}
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }




                }

            }




        }
    }

    handleBid() {

        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        if (this.state.activecsiid) {


            return (<BidLineItem project_id={this.props.project_id} csiid={this.state.activecsiid} />)

        } else {
            const amount = `$${Number(this.getamount()).toFixed(2)}`;

            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>



                {construction.showbidtable.call(this)}

    

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...regularFont }}>
                        The Proposed BidS Amount: {amount}
                    </div>
                </div>
            </div>)
        }



    }

    handleCSIID(csiid) {
        if (this.state.activecsiid === csiid) {
            this.setState({ activecsiid: false })
        } else {
            this.setState({ activecsiid: csiid })
        }
    }



    render() {
        const construction = new Construction();
        const styles = MyStylesheet();

        const headerFont = construction.getHeaderFont.call(this);
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const amount = `$${Number(this.getamount()).toFixed(2)}`;
        if (myuser) {
            const project = construction.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                                <a style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    onClick={() => { this.setState({ activecsiid: false }) }}>/bid</a>
                            </div>



                            {this.handleBid()}

                       

                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>[Project Not Found] </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>You must be logged in to view Bid </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        mycompany: state.mycompany,
        myprojects: state.myprojects,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        allprojects: state.allprojects,
        websockets: state.websockets,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Bid);