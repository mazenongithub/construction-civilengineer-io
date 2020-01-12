import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { saveProjectIcon } from './svg';
import { CreateBidScheduleItem, makeID, calculatetotalhours } from './functions'

class BidSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, csiids: [], biditems: [] }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
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
        let myproject = this.getproject()
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
    getcsibyid(csiid) {
        let csi = false;
        let company = this.getcompany();
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    if (code.csiid === csiid) {
                        csi = code;

                    }
                })
            }

            if (!csi) {
                if (company.construction.hasOwnProperty("civilengineer")) {
                    if (company.construction.civilengineer.hasOwnProperty("csicodes")) {
                        // eslint-disable-next-line
                        company.construction.civilengineer.csicodes.code.map(code => {
                            if (code.csiid === csiid) {
                                csi = code;

                            }
                        })
                    }

                }
            }

        }
        return csi;
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
        let myproject = this.getproject();

        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    if (mylabor.csiid === csiid) {
                        let hourlyrate = this.gethourlyrate(mylabor.providerid)
                        directcost += Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate);

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    directcost += Number(mymaterial.quantity) * Number(mymaterial.unitcost)

                })
            }
        }

        return directcost;

    }
    getscheduleitems() {
        let scheduleitems = false;
        let myproject = this.getproject();
        if (myproject) {
            if (myproject.hasOwnProperty("bidschedule")) {
                scheduleitems = myproject.bidschedule.biditem
            }
        }
        return scheduleitems;
    }

    getscheduleitem(csiid) {
        let scheduleitems = this.getscheduleitems();

        let scheduleitem = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map(item => {
                if (item.csiid === csiid) {
                    scheduleitem = item;
                }
            })
        }
        return scheduleitem;
    }
    getscheduleitemkey(csiid) {
        let scheduleitems = this.getscheduleitems();
        let key = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map((item, i) => {
                console.log(csiid, item)
                if (item.csiid === csiid) {
                    key = i
                }
            })
        }
        return key;
    }
    getquantity(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {
            return Number(scheduleitem.quantity);
        } else {
            return;
        }

    }
    getunit(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {
            return scheduleitem.unit;
        } else {
            return;
        }

    }
    getprofit(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {
            return scheduleitem.profit
        } else {
            return scheduleitem;
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
            return;
        }


    }
    handlequantity(csiid, quantity) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            let j = this.getscheduleitemkey(csiid);

            myuser.company.projects.myproject[i].bidschedule.biditem[j].quantity = quantity;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }
    handleprofit(csiid, profit) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            let j = this.getscheduleitemkey(csiid);
            myuser.company.projects.myproject[i].bidschedule.biditem[j].profit = profit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }

    handleunit(csiid, unit) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            let j = this.getscheduleitemkey(csiid);
            myuser.company.projects.myproject[i].bidschedule.biditem[j].unit = unit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' });

        }

    }
    showbiditem(item) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const csi = this.getcsibyid(item.csiid);
        const bidField = this.getbidfield()
        let profit = this.getprofit(item.csiid)
        let quantity = this.getquantity(item.csiid)
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let unit = this.getunit(item.csiid);
        if (this.state.width > 1200) {
            return (
                <tr>
                    <td>{csi.csi}-{csi.title}</td>
                    <td style={{ ...styles.alignCenter }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField, ...styles.alignCenter }}
                            value={quantity}
                            onChange={event => { this.handlequantity(item.csiid, event.target.value) }}
                        /></td>
                    <td style={{ ...styles.alignCenter }}><input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField, ...styles.alignCenter }}
                        value={unit}
                        onChange={event => { this.handleunit(item.csiid, event.target.value) }}

                    /></td>
                    <td style={{ ...styles.alignCenter }}>{this.getdirectcost(csi.csiid)}</td>
                    <td style={{ ...styles.alignCenter }}> <input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField, ...styles.alignCenter }}
                        value={profit}
                        onChange={event => { this.handleprofit(item.csiid, event.target.value) }}
                    /></td>
                    <td style={{ ...styles.alignCenter }}>${bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${unit}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={item.lineid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                Line Item <br />
                                {csi.csi}-{csi.title}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Quantity <br />
                                <input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField }}
                                    value={quantity}
                                    onChange={event => { this.handlequantity(item.csiid, event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                <input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField }}
                                    value={unit}
                                    onChange={event => { this.handleunit(item.csiid, event.target.value) }}

                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                                <input type="text" style={{ ...regularFont, ...styles.generalFont, ...bidField }}
                                    value={profit}
                                    onChange={event => { this.handleprofit(item.csiid, event.target.value) }} />
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
        const regularFont = this.getRegularFont();
        const saveprojecticon = this.getsaveprojecticon();
        const headerFont = this.getHeaderFont();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /bidschedule
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.fontBold }}>
                            Proposed Bid Schedule
                        </div>
                    </div>

                    {this.showbidtable()}

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        &nbsp;
                     </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }}>{saveProjectIcon()}</button>
                    </div>

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

export default connect(mapStateToProps, actions)(BidSchedule);