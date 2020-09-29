import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { ProfitForLabor, DirectCostForMaterial, DirectCostForLabor, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidItem } from './functions'
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
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (myproject) {

            this.props.reduxProject({ projectid: myproject.projectid })
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    getitems() {
        const dynamicstyles = new DynamicStyles();
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

                    let newItem = CreateBidItem(lineitem.csiid, "", 0)
                    csis.push(newItem)
                }
            })
        }

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
        let quantity = ""

        const dynamicstyles = new DynamicStyles();
        const item = dynamicstyles.getbidactualbyid.call(this, csiid);
        if (item) {
            quantity = item.quantity;
        }
        return quantity;

    }



    getunit(csiid) {
        let unit = ""

        const dynamicstyles = new DynamicStyles();
        const item = dynamicstyles.getbidactualbyid.call(this, csiid);
        if (item) {
            unit = item.unit
        }
        return unit

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
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const project = dynamicstyles.getproject.call(this);
            if (project) {
                const i = dynamicstyles.getprojectkeybyid.call(this, project.projectid);
                const actualitems = dynamicstyles.getbidactual.call(this)
                if (actualitems) {

                    const actualitem = dynamicstyles.getbidactualbyid.call(this, csiid)
                    if (actualitem) {
                        const j = dynamicstyles.getbidactualkeybyid.call(this, csiid)
                        myuser.company.projects.myproject[i].bid[j].quantity = quantity;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity, unit: '', providerid: myuser.providerid }
                        myuser.company.projects.myproject[i].bid.push(newItem)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity, unit: '', providerid: myuser.providerid }
                    myuser.company.projects.myproject[i].bid = [newItem]
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }




            }
        }

    }

    handleunit(csiid, unit) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            const project = dynamicstyles.getproject.call(this);
            if (project) {
                const i = dynamicstyles.getprojectkeybyid.call(this, project.projectid);
                const actualitems = dynamicstyles.getbidactual.call(this)
                if (actualitems) {

                    const actualitem = dynamicstyles.getbidactualbyid.call(this, csiid)

                    if (actualitem) {

                        const j = dynamicstyles.getbidactualkeybyid.call(this, csiid)
                        myuser.company.projects.myproject[i].bid[j].unit = unit;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    } else {
                        let newItem = { csiid, quantity: '', unit, providerid: myuser.providerid }
                        myuser.company.projects.myproject[i].bid.push(newItem)
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else {
                    let newItem = { csiid, quantity: '', unit, providerid: myuser.providerid }
                    myuser.company.projects.myproject[i].bid = [newItem]
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }




            }
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


    showbiditem(item) {

        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid);


        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let providerid = this.props.match.params.providerid;
        let companyid = this.props.match.params.companyid;
        let projectid = this.props.match.params.projectid;

        let profit = () => {
            return (
                Number(this.getprofit(item.csiid)).toFixed(4)
            )
        }
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                <input type="text"
                    style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                    value={this.getquantity(item.csiid)} onChange={event => { this.handlequantity(item.csiid, event.target.value) }} />

            </div>)
        }
        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                    Unit <br />
                    <input type="text"
                        style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                        value={this.getunit(item.csiid)}
                        onChange={event => { this.handleunit(item.csiid, event.target.value) }} />
                </div>)
        }
        if (this.state.width > 1200) {
            return (
                <tr>
                    <td> <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bid/csi/${csi.csiid}`}> Line Item <br />
                        {csi.csi}-{csi.title} </Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)



        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.csiid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bid/csi/${csi.csiid}`}> Line Item <br />
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
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                                {+Number(this.getprofit(csi.csiid).toFixed(4))}


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
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const titleFont = dynamicstyles.gettitlefont.call(this);
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{this.props.match.params.projectid}</span> <br/>
                                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/bid</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}> Actual Bid </span>
                        </div>
                            </div>

                            {dynamicstyles.showbidtable.call(this)}

                            {dynamicstyles.showsaveproject.call(this)}




                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Only Managers can view Bid </span>
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
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Bid);