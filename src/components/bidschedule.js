import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { CreateBidScheduleItem,  ProfitForLabor, DirectCostForMaterial, DirectCostForLabor, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment,sortcode } from './functions'
import Construction from './construction'
import { Link } from 'react-router-dom';

class BidSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csiids: [], biditems: [], spinner: false }
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

    getbidschedule() {
        const construction = new Construction();
        const project = construction.getproject.call(this)
        let schedule = false;
        if (project.hasOwnProperty("schedule")) {
            if (project.schedule.hasOwnProperty("bidschedule")) {
                schedule = project.schedule.bidschedule;
            }

        }
        return schedule;

    }

    getbidschedulebyid(csiid) {
  
        const schedule = this.getbidschedule()

        let myitem = false;
        if (schedule) {

            // eslint-disable-next-line
            schedule.map(item => {
                if (item.csiid === csiid) {
                    myitem = item;
                }
            })
        }
        return myitem;

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

    showbiditem(item) {


        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const bidField = construction.getbidfield.call(this)
        if (myuser) {
            const providerid = myuser.profile;
            if (myuser.hasOwnProperty("company")) {
                const companyid = myuser.company.url;

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
                                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${project.title}/bidschedule/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
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
                                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${project.title}/bidschedule/${csi.csiid}`}> Line Item <br />
                                                    {csi.csi}-{csi.title} </Link>
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
    }




    getitems() {
        const construction = new Construction();
        let payitems = construction.getAllSchedule.call(this)

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
                    const csi = construction.getcsibyid.call(this,lineitem.csiid)
                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
                    newItem.csi = csi.csi;
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
            if (myproject.hasOwnProperty("schedule")) {

                if (myproject.schedule.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    myproject.schedule.labor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            directcost += DirectCostForLabor(mylabor)

                        }
                    })

                }




                if (myproject.schedule.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    myproject.schedule.materials.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            directcost += DirectCostForMaterial(mymaterial)

                        }

                    })
                }

                if (myproject.schedule.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myproject.schedule.equipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {

                            directcost += DirectCostForEquipment(myequipment)

                        }

                    })
                }


            }
        }

        return directcost;

    }

    getquantity(csiid) {
        let quantity = ""

        const item = this.getbidschedulebyid(csiid);
        if (item) {
            quantity = item.quantity;
        }
        return quantity;

    }

    getunit(csiid) {
        let unit = ""


        const item = this.getbidschedulebyid(csiid);
        if (item) {
            unit = item.unit
        }
        return unit

    }
    getprofit(csiid) {
        const construction = new Construction();
        const myschedule = construction.getAllSchedule.call(this);
        let directcost = 0;
        let profit = 0;
        if (myschedule.length > 0) {
            // eslint-disable-next-line
            myschedule.map(item => {
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
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const project = construction.getproject.call(this);
            if (project) {
                const i = construction.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = this.getbidschedule()
                if (scheduleitems) {

                    const scheduleitem = this.getbidschedulebyid(csiid)
                    if (scheduleitem) {
                        const j = construction.getbidschedulekeybyid.call(this, csiid)
                        myuser.company.projects[i].schedule.bidschedule[j].quantity = quantity;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity, unit: '', providerid: myuser.providerid }
                        myuser.company.projects[i].schedule.bidschedule.push(newItem)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity, unit: '', providerid: myuser.providerid }
                    myuser.company.projects[i].schedule.bidschedule = [newItem]
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }




            }
        }

    }
    handleprofit(csiid, profit) {
     
        console.log(csiid,profit)

    }

    handleunit(csiid, unit) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)

        if (myuser) {
            const project = construction.getproject.call(this);
            if (project) {
                const i = construction.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = this.getbidschedule()
                if (scheduleitems) {

                    const scheduleitem = this.getbidschedulebyid(csiid)

                    if (scheduleitem) {

                        const j = construction.getbidschedulekeybyid.call(this, csiid)
                        myuser.company.projects[i].schedule.bidschedule[j].unit = unit;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity: '', unit, providerid: myuser.providerid }
                        myuser.company.projects[i].schedule.bidschedule.push(newItem)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity: '', unit, providerid: myuser.providerid }
                    myuser.company.projects[i].bidschedule = [newItem]
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }




            }
        }

    }


    showbidtable() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();

        if (this.state.width > 1200) {
            return (
                <table width="100%" border="1" style={{ ...regularFont, ...styles.generalFont }}>
                    <tr>
                        <td width="24%" style={{ ...styles.alignCenter }}>Line ID</td>
                        <td width="12%" style={{ ...styles.alignCenter }}> Quantity</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Unit</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Direct Cost</td>
                        <td width="13%" style={{ ...styles.alignCenter }}> Overhead and Profit %</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Bid Price</td>
                        <td width="12%" style={{ ...styles.alignCenter }}>Unit Price</td>
                    </tr>
                    {this.showbiditems()}
                </table>

            )
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showbiditems()}

                    </div>
                </div>
            )
        }
    }
    render() {
        const construction = new Construction()
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const amount = `$${Number(this.getamount()).toFixed(2)}`;



        if (myuser) {
            const project = construction.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                                > /{project.title}</Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}

                                    to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/bidschedule`}
                                > /bidschedule</Link>
                            </div>


                            {construction.showbidtable.call(this)}

                            {construction.showsaveproject.call(this)}

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...regularFont }}>
                                    The Proposed BidSchedule Amount: {amount}
                                </div>
                            </div>


                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}> Project Not Found </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Bid Schedule </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(BidSchedule);