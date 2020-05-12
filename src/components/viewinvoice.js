import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidItem,UTCStringFormatDateforProposal } from './functions';
import { Link } from 'react-router-dom'
class ViewInvoice extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ activeprojectid: this.props.match.params.projectid })

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    getbiditems() {
        let items = [];
        let myinvoice = this.getinvoice();
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            items = myinvoice.bid.biditem;
        }




        return (items)

    }
    getitems() {
        const dynamicstyles = new DynamicStyles();
        let invoiceid = this.props.match.params.invoiceid;
        let payitems = dynamicstyles.getAllActual.call(this)

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
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.invoiceid === invoiceid) {
                    items.push(item)
                }

            }

        })
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {

                    let newItem = CreateBidItem(lineitem.csiid, "", 0)
                    csis.push(newItem)
                }
            })
        }

        return csis;
    }
    invoiceitemsbycsiid(csiid) {
        const invoiceid = this.props.match.params.invoiceid;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let items = [];
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    getprofit(csiid) {
        let profit = 0;
        let directcost = 0;
        let items = this.invoiceitemsbycsiid(csiid);

        // eslint-disable-next-line
        items.map(item => {
            if (item.hasOwnProperty("laborid")) {
                directcost += DirectCostForLabor(item);
                profit += ProfitForLabor(item);
            }
            if (item.hasOwnProperty("materialid")) {
                directcost += DirectCostForMaterial(item);
                profit += ProfitForMaterial(item);
            }
            if (item.hasOwnProperty("equipmentid")) {
                directcost += DirectCostForEquipment(item);
                profit += ProfitForEquipment(item);
            }

        })

        return ((profit / directcost) * 100)

    }
    getquantity(csiid) {

        let scheduleitem = this.getactualitem(csiid);

        if (scheduleitem) {
            if (Number(scheduleitem.quantity) > 0) {
                return Number(scheduleitem.quantity);
            } else {
                return 1;
            }

        } else {
            return ""
        }

    }
    getinvoice() {
        let invoiceid = this.props.match.params.invoiceid;
        let invoice = false;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map(myinvoice => {
                if (myinvoice.invoiceid === invoiceid) {
                    invoice = myinvoice;
                }
            })
        }
        return invoice;
    }
    getinvoicekey() {
        let invoiceid = this.props.match.params.invoiceid;
        let key = false;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getactualitems() {

        let actualitems = false;
        let myinvoice = this.getinvoice();
        if (myinvoice) {
            if (myinvoice.hasOwnProperty("bid")) {
                actualitems = myinvoice.bid.biditem
            }
        }
        return actualitems;
    }
    getactualitem(csiid) {

        let actualitems = this.getactualitems();

        let actualitem = false;
        if (actualitems) {
            // eslint-disable-next-line
            actualitems.map(item => {
                if (item.csiid === csiid) {
                    actualitem = item;
                }
            })
        }
        return actualitem;
    }

    getunit(csiid) {

        let scheduleitem = this.getactualitem(csiid);

        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
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
            return bidprice;
        }


    }
    getdirectcost(csiid) {
        const dynamicstyles = new DynamicStyles()
        let myproject = dynamicstyles.getproject.call(this)
        let invoiceid = this.props.match.params.invoiceid;
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.invoiceid === invoiceid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.invoiceid === invoiceid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.invoiceid === invoiceid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }

    getinvoiceitemkey(csiid) {
        let key = false;
        let myinvoice = this.getinvoice();
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            myinvoice.bid.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i
                }

            })
        }
        return key;

    }
    handlechangequantity(quantity, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const lineitem = dynamicstyles.getinvoiceitem.call(this, csiid)

        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getinvoicekeybyid.call(this, this.props.match.params.invoiceid)
            if (lineitem) {
                let k = dynamicstyles.getinvoiceitemkey.call(this, csiid)
                myuser.company.projects.myproject[i].invoices.myinvoice[j].bid.biditem[k].quantity = quantity;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            } else {
                let unit = "";
                let newItem = CreateBidItem(csiid, unit, quantity)
                myuser.company.projects.myproject[i].invoices.myinvoice[j].bid = { biditem: [newItem] }
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }

    }


    handlechangeunit(unit, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const lineitem = dynamicstyles.getinvoiceitem.call(this, csiid)

        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getinvoicekeybyid.call(this, this.props.match.params.invoiceid)
            if (lineitem) {
                let k = dynamicstyles.getinvoiceitemkey.call(this, csiid)
                myuser.company.projects.myproject[i].invoices.myinvoice[j].bid.biditem[k].unit = unit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            } else {
                let quantity = "";
                let newItem = CreateBidItem(csiid, unit, quantity)
                myuser.company.projects.myproject[i].invoices.myinvoice[j].bid = { biditem: [newItem] }
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }

    }
    showbiditem(item) {

        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const bidField = dynamicstyles.getbidfield.call(this)
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid);


        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let providerid = this.props.match.params.providerid;
        let companyid = this.props.match.params.companyid;
        let projectid = this.props.match.params.projectid;
        let invoiceid = this.props.match.params.invoiceid;
        const checkinvoice = dynamicstyles.checkupdateinvoice.call(this,invoiceid)
        console.log(checkinvoice)
        let profit = () => {
            if(checkinvoice) {
            return (
                <input type="text"
                    value={Number(this.getprofit(item.csiid)).toFixed(4)}
                    onChange={event => { this.handlechangeprofit(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                />)

            } else {
                return(this.getprofit(item.csiid).toFixed(4))
            }
        }
        const quantity = () => {
            if(checkinvoice) {
            return (<div style={{ ...styles.generalContainer }}>
              
                <input type="text"
                    value={this.getquantity(csi.csiid)}
                    onChange={event => { this.handlechangequantity(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }} />
            </div>)

            } else {
                return(this.getquantity(csi.csiid))
            }
        }
        const unit = () => {
            if(checkinvoice)  {
            return (
                <div style={{ ...styles.generalContainer }}>
                  
                    <input type="text"
                        value={this.getunit(csi.csiid)}
                        onChange={event => { this.handlechangeunit(event.target.value, item.csiid) }}
                        style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                    />
                </div>)

            }else {
                return(this.getunit(csi.csiid))
            }
        }
        if (this.state.width > 1200) {
            return (
                <tr>
                    <td> <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/invoices/${invoiceid}/csi/${csi.csiid}`}> Line Item <br />
                        {csi.csi}-{csi.title} </Link></td>
                    <td style={{ ...styles.alignCenter }}>
                    Quantity <br />
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>
                    Unit <br />{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)



        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.lineid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/invoices/${invoiceid}/csi/${csi.csiid}`}> Line Item <br />
                                    {csi.csi}-{csi.title} </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                            Quantity <br />
                                {quantity()}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                {unit()}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                               {profit()}

                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${bidprice}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {`$${unitprice}/${this.getunit(csi.csiid)}`}
                            </div>
                        </div>
                    </div>
                </div>)
        }
    }
    handlechangeprofit(profit, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let invoiceid = this.props.match.params.invoiceid;
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map((mylabor, j) => {
                    if (mylabor.invoiceid === invoiceid && (mylabor.csiid === csiid)) {
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].profit = profit;
                    }

                })

            }
            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                    if (mymaterial.invoiceid === invoiceid && (mymaterial.csiid === csiid)) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].profit = profit;
                    }

                })
            }
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map((myequipment, j) => {
                    if (myequipment.invoiceid === invoiceid && (myequipment.csiid === csiid)) {
                        myuser.company.projects.myproject[i].actualequipment.myequipment[j].profit = profit;
                    }

                })
            }
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })

        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const titleFont = dynamicstyles.gettitlefont.call(this)
        const invoice = dynamicstyles.getinvoicebyid.call(this,this.props.match.params.invoiceid)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const captured = () => {
            if(invoice.approved) {
                return(<div style={{...styles.generalFont,...regularFont,...styles.alignCenter,...styles.topMargin15}}>Payment Captured {UTCStringFormatDateforProposal(invoice.approved)}</div>)
            }

        }
        const settlement = () => {
            if(invoice.settlement) {
                return(<div style={{...styles.generalFont,...regularFont,...styles.alignCenter,...styles.topMargin15}}>Settlement Occurred {UTCStringFormatDateforProposal(invoice.settlement)}</div>)
            }

        }


        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...titleFont, ...styles.alignCenter }}>
                            /viewinvoice/{this.props.match.params.invoiceid}
                        </div>
                    </div>

                    {dynamicstyles.showbidtable.call(this)}
                    {dynamicstyles.showsaveproject.call(this)}
                    {captured()}
                    {settlement()}
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        projectid: state.projectid,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(ViewInvoice);