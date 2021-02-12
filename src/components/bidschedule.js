import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { CreateBidScheduleItem, makeID, ProfitForLabor, DirectCostForMaterial, DirectCostForLabor, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment } from './functions'
import DynamicStyles from './dynamicstyles'
import { Link } from 'react-router-dom';

class BidSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csiids: [], biditems: [], spinner:false}
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const dynamicstyles = new DynamicStyles();
     
        const csicodes = dynamicstyles.getcsis.call(this)
        if(!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }
      
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

    getproject() {
        let myuser = this.getuser();

        let projectid = this.props.match.params.projectid;

        let projects = false;
        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(myproject => {

                        if (myproject.projectid === projectid) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
    }
    getprojectkey() {
        let myuser = this.getuser();
        let projectid = this.props.match.params.projectid;
        let key = false;
        if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.company.projects.myproject.map((myproject, i) => {

                    if (myproject.projectid === projectid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
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
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (myproject) {

            let lineid = makeID(16);
            let profit = "";
            let unit = "";
            let quantity = "";
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    let csiid = mylabor.csiid;
                    let insert = true;
                    // eslint-disable-next-line
                    items.map(item => {
                        if (item.csiid === csiid) {
                            insert = false;

                        }
                    })

                    if (insert) {
                        let newItem = CreateBidScheduleItem(lineid, csiid, profit, unit, quantity)
                        items.push(newItem)
                    }

                })

            }
            if (myproject.hasOwnProperty("schedulematerials")) {

            }
            if (myproject.hasOwnProperty("scheduleequipment")) {

            }


        }

        return (items)

    }
    getitems() {
        const dynamicstyles = new DynamicStyles();
        let payitems = dynamicstyles.getAllSchedule.call(this)

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

                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
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
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);

        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    if (mylabor.csiid === csiid) {
                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }

            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    if (myequipment.csiid === csiid) {
                        directcost += DirectCostForEquipment(myequipment)
                    }

                })
            }
        }

        return directcost;

    }

    getquantity(csiid) {
        let quantity = ""

        const dynamicstyles = new DynamicStyles();
        const item = dynamicstyles.getbidschedulebyid.call(this, csiid);
        if (item) {
            quantity = item.quantity;
        }
        return quantity;

        }
     
        getunit(csiid) {
            let unit = ""
    
            const dynamicstyles = new DynamicStyles();
            const item = dynamicstyles.getbidschedulebyid.call(this, csiid);
            if (item) {
                unit = item.unit
            }
            return unit 
    
            }
    getprofit(csiid) {
        const dynamicstyles = new DynamicStyles();
        const myschedule = dynamicstyles.getAllSchedule.call(this);
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
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {
            const project = dynamicstyles.getproject.call(this);
            if (project) {
                const i = dynamicstyles.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = dynamicstyles.getbidschedule.call(this)
                if(scheduleitems) {

                const scheduleitem = dynamicstyles.getbidschedulebyid.call(this, csiid)
                if (scheduleitem) {
                    const j = dynamicstyles.getbidschedulekeybyid.call(this, csiid)
                    myuser.company.projects.myproject[i].bidschedule[j].quantity = quantity;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity, unit:'', providerid:myuser.providerid}
                    myuser.company.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }

            } else {
                let newItem = {csiid, quantity, unit:'', providerid:myuser.providerid}
                myuser.company.projects.myproject[i].bidschedule = [newItem]
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
            let j = this.getscheduleitemkey(csiid);
            myuser.company.projects.myproject[i].bidschedule.biditem[j].profit = profit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }

    handleunit(csiid, unit) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
      
        if(myuser) {
            const project = dynamicstyles.getproject.call(this);
            if (project) {
                const i = dynamicstyles.getprojectkeybyid.call(this, project.projectid);
                const scheduleitems = dynamicstyles.getbidschedule.call(this)
                if(scheduleitems) {
                   
                const scheduleitem = dynamicstyles.getbidschedulebyid.call(this, csiid)
              
                if (scheduleitem) {
                    
                    const j = dynamicstyles.getbidschedulekeybyid.call(this, csiid)
                    myuser.company.projects.myproject[i].bidschedule[j].unit = unit;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                   
                } else {
                    let newItem = {csiid, quantity:'', unit, providerid:myuser.providerid}
                    myuser.company.projects.myproject[i].bidschedule.push(newItem)
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }

            } else {
                let newItem = {csiid, quantity:'', unit, providerid:myuser.providerid}
                myuser.company.projects.myproject[i].bidschedule = [newItem]
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }

           


            }
        }

    }
    showbiditem(item) {

        const dynamicstyles = new DynamicStyles();
        let providerid = this.props.match.params.providerid;
        let companyid = this.props.match.params.companyid;
        let projectid = this.props.match.params.projectid;

        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid);
        let profit = () => {
            return (
                Number(this.getprofit(item.csiid)).toFixed(4)
            )
        }
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);

        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                    Unit <br />
                    <input type="text"
                        style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                        value={this.getunit(item.csiid)}
                        onChange={event => { this.handleunit(item.csiid,event.target.value) }} />
                </div>)
        }
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                <input type="text"
                    style={{ ...regularFont, ...styles.generalFont, ...styles.minWidth90, ...styles.alignCenter }}
                    value={this.getquantity(item.csiid)} onChange={event => { this.handlequantity(item.csiid,event.target.value) }} />

            </div>)
        }

        if (this.state.width > 1200) {
            return (
                <tr>
                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}>  {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.csiid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule/csi/${csi.csiid}`}> Line Item <br />
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
        const dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
      

        if(myuser) {
            const project = dynamicstyles.getproject.call(this)
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

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.boldFont }}>
                            Proposed Bid Schedule
                        </div>
                    </div>

                    {dynamicstyles.showbidtable.call(this)}

                    {dynamicstyles.showsaveproject.call(this)}



                </div>
            </div>
        )

            } else {
                return(<div style={{...styles.generalContainer,...regularFont}}>
                    <span style={{...styles.generalFont,...regularFont}}> Project Not Found </span>
                </div>)
            }

        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Bid Schedule </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(BidSchedule);