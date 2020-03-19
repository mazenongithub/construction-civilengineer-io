import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { CreateBidScheduleItem, makeID, ProfitForLabor, DirectCostForMaterial, DirectCostForLabor, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment } from './functions'
import DynamicStyles from './dynamicstyles';
import { Link } from 'react-router-dom';

class Bid extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csiids: [], biditems: [] }
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

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }



    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {

                user = this.props.myusermodel;
            }
        }
        return user;
    }
    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({
                width: '452px',
                height: '87px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '342px',
                height: '72px'
            })
        } else {
            return ({
                width: '234px',
                height: '51px'
            })
        }

    }
    getbiditems() {
        let items = [];
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        if (myproject) {

            let lineid = makeID(16);
            let profit = "";
            let unit = "";
            let quantity = "";
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    let csiid = mylabor.csiid;

                    let insertlabor = true;
                    // eslint-disable-next-line
                    items.map(item => {
                        if (item.csiid === csiid) {
                            insertlabor = false;

                        }
                    })

                    if (insertlabor) {

                        let newItem = CreateBidScheduleItem(lineid, csiid, profit, unit, quantity)

                        items.push(newItem)
                    }

                })

            }
            if (myproject.hasOwnProperty("actualmaterials")) {

                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    let csiid = mymaterial.csiid;
                    let insertmaterial = true;
                    // eslint-disable-next-line
                    items.map(item => {

                        if (item.csiid === csiid) {
                            insertmaterial = false;

                        }
                    })

                    if (insertmaterial) {

                        let newItem = CreateBidScheduleItem(lineid, csiid, profit, unit, quantity)
                        items.push(newItem)
                    }

                })

            }
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {
                    let csiid = myequipment.csiid;
                    let insertequipment = true;
                    // eslint-disable-next-line
                    items.map(item => {
                        if (item.csiid === csiid) {
                            insertequipment = false;

                        }
                    })

                    if (insertequipment) {

                        let newItem = CreateBidScheduleItem(lineid, csiid, profit, unit, quantity)
                        items.push(newItem)
                    }

                })

            }


        }

        return (items)

    }
    showbiditems() {
        let biditems = this.getbiditems();

        let lineids = [];
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                lineids.push(this.showbiditem(item))
            })
        }
        return lineids;
    }

    getcompany() {
        let myuser = this.getuser();
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }
    getbidfield() {
        if (this.state.width > 800) {
            return ({ maxWidth: '138px' })
        } else {
            return ({ maxWidth: '90px' })
        }
    }
    getmyemployees() {
        let myuser = this.getuser();
        let employees = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {
                    employees = myuser.company.office.employees.employee;
                }
            }
        }
        return employees;
    }
    getemployeebyid(providerid) {
        let myemployees = this.getmyemployees()
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.providerid === providerid) {
                    employees = employee;
                }
            })
        }
        return employees;
    }
    gethourlyrate(providerid) {
        let employee = this.getemployeebyid(providerid)
        let workinghours = Number(employee.workinghours);
        let hourlyrate = 0;
        let totalbenefits = 0;

        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                totalbenefits += Number(benefit.amount);

            })
        }

        if (workinghours && totalbenefits) {
            hourlyrate = Number(totalbenefits / workinghours).toFixed(2)
        }
        return hourlyrate;

    }

    getdirectcost(csiid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);

        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    if (mylabor.csiid === csiid) {
                        directcost += DirectCostForLabor(mylabor)


                    }
                })
            }

            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)

                    }

                })
            }

            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {
                    if (myequipment.csiid === csiid) {

                        directcost += DirectCostForEquipment(myequipment)


                    }

                })
            }
        }

        return directcost;

    }
    getactualitems() {
        const dynamicstyles = new DynamicStyles();
        let actualitems = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject) {
            if (myproject.hasOwnProperty("bid")) {
                actualitems = myproject.bid.biditem
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
    getactualitemkey(csiid) {
        let actualitems = this.getactualitems();
        let key = false;
        if (actualitems) {
            // eslint-disable-next-line
            actualitems.map((item, i) => {

                if (item.csiid === csiid) {
                    key = i
                }
            })
        }
        return key;
    }
    getmyinvoices() {
        const dynamicstyles = new DynamicStyles();
        let invoices = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices.myinvoice;
        }
        return invoices;
    }
    getquantity(csiid) {
        let quantity = 0;
        const dynamicstyles = new DynamicStyles();
        let myinvoice = dynamicstyles.getmyinvoices.call(this)
        if (myinvoice) {
            // eslint-disable-next-line
            myinvoice.map(invoices => {

                if (invoices.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    invoices.bid.biditem.map(item => {
                        if (item.unit && item.unit !== 'Lump Sum' && item.csiid === csiid) {
                            quantity += Number(item.quantity);
                        } else if (item.unit === 'Lump Sum') {
                            quantity = 1;
                        }
                    })
                }


            })

        }
        return quantity;

    }
    getunit(csiid) {
        let unit = ""
        const dynamicstyles = new DynamicStyles();
        let myinvoice = dynamicstyles.getmyinvoices.call(this)
        if (myinvoice) {
            // eslint-disable-next-line
            myinvoice.map(invoices => {

                if (invoices.hasOwnProperty("bid")) {
                    // eslint-disable-next-line
                    invoices.bid.biditem.map(item => {
                        if (item.csiid === csiid) {
                            unit = item.unit
                        }
                    })
                }


            })

        }
        return unit;

    }
    getprofit(csiid) {
        const dynamicstyles = new DynamicStyles();
        const myactual = dynamicstyles.getAllActual.call(this);
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

        return +Number((profit / directcost) * 100).toFixed(4)

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
            return;
        }


    }
    handlequantity(csiid, quantity) {
        const dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = this.getactualitemkey(csiid);

            myuser.company.projects.myproject[i].bid.biditem[j].quantity = quantity;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }
    handleprofit(csiid, profit) {
        const dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = this.getactualitemkey(csiid);
            myuser.company.projects.myproject[i].bid.biditem[j].profit = profit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }

    handleunit(csiid, unit) {
        const dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = this.getactualitemkey(csiid);
            myuser.company.projects.myproject[i].bid.biditem[j].unit = unit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }
    showbiditem(item) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid);
        let profit = this.getprofit(item.csiid)
        let quantity = this.getquantity(item.csiid)
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let unit = this.getunit(item.csiid);
        let providerid = this.props.match.params.providerid;
        let companyid = this.props.match.params.companyid;
        let projectid = this.props.match.params.projectid;
        if (this.state.width > 1200) {
            return (
                <tr>
                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bid/${csi.csiid}`}> Line Item <br />
                        {csi.csi}-{csi.title} </Link></td>
                    <td style={{ ...styles.alignCenter }}>{quantity} </td>
                    <td style={{ ...styles.alignCenter }}> {unit}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit}</td>
                    <td style={{ ...styles.alignCenter }}>${bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${unit}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.lineid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bid/${csi.csiid}`}> Line Item <br />
                                    {csi.csi}-{csi.title} </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Quantity <br />
                                {quantity}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                {unit}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                                {profit}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${bidprice}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {`$${unitprice}/${unit}`}
                            </div>
                        </div>
                    </div>
                </div>)
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
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const headerFont = this.getHeaderFont();
        const dynamicstyles = new DynamicStyles();

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /bids
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.fontBold }}>
                            Actual Bid
                        </div>
                    </div>

                    {dynamicstyles.showbidtable.call(this)}



                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Bid);