import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { radioOpen, radioClosed, removeIconSmall, openDetail, closeDetail } from './svg'
import { CreateCostID, CreateRentalRate, CreateEquipment, EquipmentOwnership, formatDateStringDisplay } from './functions';
import DynamicStyles from './dynamicstyles';
import PurchaseDate from './purchasedate';
import SaleDate from './saledate';
import EquipmentDate from './equipmentdate';
import AccountID from './accountid'
import MakeID from './makeids';
class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeequipmentid: '', accountid: '', equipment: '', ownership: '', activecostid: '', cost: '', resaledate: '', detail: '', resalevalue: '', loaninterest: '', workinghours: '', showdetail: true, equipmentdate: new Date(), costmenu: true, purchasecalender: true, purchasedateday: '', purchasedatemonth: '', purchasedateyear: '', saledateday: '', saledatemonth: '', saledateyear: '', salecalender: true, equipmentcalender: true, equipmentdateday: '', equipmentdateyear: '', equipmentdatemonth: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.reset();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    reset() {

        this.purchasedatedefault();
        this.saledatedefault();
        this.equipmentdatedefault()
    }

    saledatedefault() {
        const saledatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const saledateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const saledateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ saledateyear: saledateyear(), saledatemonth: saledatemonth(), saledateday: saledateday() })
    }


    equipmentdatedefault() {
        const equipmentdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const equipmentdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const equipmentdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ equipmentdateyear: equipmentdateyear(), equipmentdatemonth: equipmentdatemonth(), equipmentdateday: equipmentdateday() })
    }


    purchasedatedefault() {
        const purchasedatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const purchasedateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const purchasedateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ purchasedateyear: purchasedateyear(), purchasedatemonth: purchasedatemonth(), purchasedateday: purchasedateday() })
    }

    getactiveequipment() {
        let activeequipment = false;

        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myequipment = this.getmyequipment();
            // eslint-disable-next-line
            myequipment.map(equipment => {
                if (equipment.equipmentid === equipmentid) {
                    activeequipment = equipment
                }
            })

        }
        return activeequipment;
    }

    getactiveequipmentkey() {
        let key = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myequipment = this.getmyequipment();
            // eslint-disable-next-line
            myequipment.map((equipment, i) => {
                if (equipment.equipmentid === equipmentid) {
                    key = i;
                }
            })

        }
        return key;
    }
    getequipment() {
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            return (equipment.equipment)
        } else {
            return (this.state.equipment)
        }
    }
    getloaninterest() {
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            return (equipment.ownership.loaninterest)
        } else {
            return (this.state.loaninterest)
        }
    }
    getworkinghours() {
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            return (equipment.ownership.workinghours)
        } else {
            return (this.state.workinghours)
        }
    }
    getresalevalue() {
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            return (equipment.ownership.resalevalue)
        } else {
            return (this.state.resalevalue)
        }
    }

    handleequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        const checkmanager = dynamicstyles.checkmanager.call(this)
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        myuser.company.equipment.myequipment[i].equipment = equipment;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                } else {
               
                    let equipmentid = makeID.equipmentid.call(this);

                    let ownership = "";
                    let accountid = this.state.accountid;


                    let newEquipment = CreateEquipment(equipmentid, equipment, ownership, accountid)

                    if (myuser.company.hasOwnProperty("equipment")) {
                        myuser.company.equipment.myequipment.push(newEquipment);
                    } else {
                        let equipment = { myequipment: [newEquipment] };
                        myuser.company.equipment = equipment;

                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activeequipmentid: equipmentid })
                }

            }
        } else {
            alert(`Only Managers have access to this function`)
        }
    }
    showequipment() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Equipment
                </div>
                <div style={{ ...styles.flex4, ...styles.generalFont, ...regularFont }}>
                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                        value={this.getequipment()}
                        onChange={event => { this.handleequipment(event.target.value) }}
                    />
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Equipment <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                        value={this.getequipment()}
                        onChange={event => { this.handleequipment(event.target.value) }}
                    />
                </div>
            </div>)
        }
    }
    getradioIcon() {
        if (this.state.width > 1200) {
            return ({ width: '83px', height: '83px' })
        } else if (this.state.width > 800) {
            return ({ width: '60px', height: '60px' })
        } else {
            return ({ width: '44px', height: '44px' })
        }

    }

    getowned() {
        const styles = MyStylesheet();
        const radioIcon = this.getradioIcon();
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            if (equipment.hasOwnProperty("ownership")) {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>)
            } else {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioOpen()}</button>)
            }
        } else {
            if (this.state.ownership === 'owned') {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>)
            } else {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioOpen()}</button>)
            }
        }

    }

    getrented() {
        const styles = MyStylesheet();
        const radioIcon = this.getradioIcon();
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            if (equipment.hasOwnProperty("rentalrates")) {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>)
            } else {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioOpen()}</button>)
            }
        } else {
            if (this.state.ownership === 'rented') {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>)
            } else {
                return (<button style={{ ...styles.generalButton, ...radioIcon }}>{radioOpen()}</button>)
            }
        }

    }

    getcompany() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }
    getaccounts() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        let accounts = false;
        if (company.hasOwnProperty("office")) {
            let office = company.office;
            if (office.hasOwnProperty("accounts")) {
                accounts = company.office.accounts.account;

            }
        }
        return accounts;
    }

    makeequipmentcostactive(costid) {
        const dynamicstyles = new DynamicStyles();

        if (this.state.activeequipmentid) {
            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (myequipment) {
                if (this.state.activecostid === costid) {

                    this.setState({ activecostid: false, equipmentdateday: '', equipmentdatemonth: '', equipmentdateyear: '' })
                } else {
                    const cost = dynamicstyles.getcostbyid.call(this, myequipment.equipmentid, costid)
                    if (cost) {
                        const equipmentdateyear = cost.timein.substring(0, 4)
                        const equipmentdatemonth = cost.timein.substring(5, 7);
                        const equipmentdateday = cost.timein.substring(8, 10);
                        this.setState({ activecostid: costid, equipmentdateday, equipmentdatemonth, equipmentdateyear })

                    }
                }

            }

        }

    }
    getequipmentcostskeybyid(costid) {

        let key = false;
        const myequipment = this.getactiveequipment();

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }

            })

        }

        return key;
    }
    removeequipmentcost(cost) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this);
            if (checkmanager) {
                if (window.confirm(`Are you sure you want to delete ${cost.detail}?`)) {
                    if (this.state.activeequipmentid) {
                        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                        if (myequipment) {
                            const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                            const mycost = dynamicstyles.getequipmentcostsbyid.call(this, cost.costid);
                            if (mycost) {
                                const j = dynamicstyles.getequipmentcostskeybyid.call(this, cost.costid)

                                myuser.company.equipment.myequipment[i].ownership.cost.splice(j, 1);
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render', activecostid: false })

                            }


                        }

                    }

                }

            } else {
                alert(` Only Managers can remove equipment costs `)
            }

        }
    }
    showequipmentcost(cost) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = this.getremoveicon()
        return (
            <div style={{ ...styles.generalFlex }} key={cost.costid}>
                <div 
                    style={{ ...styles.flex5, ...regularFont, ...styles.bottomMargin15, ...styles.generalFont, ...this.getactiveecostbackground(cost.costid) }} onClick={() => { this.makeequipmentcostactive(cost.costid) }}>
                    {formatDateStringDisplay(cost.timein)} Cost:${Number(cost.cost).toFixed(2)}  Detail: {cost.detail}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeequipmentcost(cost) }}>{removeIconSmall()} </button>
                </div>
            </div>
        )


    }
    showequipmentcosts() {
        let equipmentcosts = [];
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            if (equipment.hasOwnProperty("ownership")) {
                if (equipment.ownership.hasOwnProperty("cost")) {
                    // eslint-disable-next-line
                    equipment.ownership.cost.map(cost => {
                        equipmentcosts.push(this.showequipmentcost(cost))
                    })

                }

            }
        }
        return equipmentcosts;
    }
    getactiveequipmentcosts() {
        let equipment = this.getactiveequipment();
        let costs = false;

        if (equipment) {
            if (equipment.hasOwnProperty("ownership")) {
                costs = equipment.ownership.cost;
            }
        }
        return costs;
    }
    getactiveequipmentcost() {
        let equipmentcost = false;
        if (this.state.activecostid) {
            let costid = this.state.activecostid;
            let costs = this.getactiveequipmentcosts();
            if (costs) {
                // eslint-disable-next-line
                costs.map(cost => {
                    if (cost.costid === costid) {
                        equipmentcost = cost;
                    }
                })
            }

        }

        return equipmentcost;
    }
    getactiveequipmentcostkey() {
        let key = false;
        if (this.state.activecostid) {
            let costid = this.state.activecostid;
            let costs = this.getactiveequipmentcosts();
            // eslint-disable-next-line
            costs.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }
            })

        }

        return key;
    }

    getcost() {

        let cost = this.getactiveequipmentcost();
        console.log()
        if (cost) {
            return (cost.cost)
        } else {
            return (this.state.cost)
        }

    }
    handlecost(cost) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if(checkmanager) {
            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {
                    let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid);

                    if (this.state.activecostid) {
                        const mycost = dynamicstyles.getequipmentcostsbyid.call(this, this.state.activeequipmentid, this.state.activecostid)
                        if (mycost) {

                            let j = dynamicstyles.getequipmentcostskeybyid.call(this,this.state.activeequipmentid,this.state.activecostid)
                            myuser.company.equipment.myequipment[i].ownership.cost[j].cost = cost;
                            
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        let costid = makeID.costid.call(this);
                        const year = this.state.equipmentdateyear;
                        const day = this.state.equipmentdateday;
                        const month = this.state.equipmentdatemonth;
                        const datein = `${year}-${month}-${day}`;
                        let detail = "";
                        let newcost = CreateCostID(costid, cost, detail, datein)
                        let equipment = this.getactiveequipment();

                        if (equipment.ownership.hasOwnProperty("cost")) {
                            myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                        } else {

                            myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                        }

                        this.props.reduxUser(myuser)
                        this.setState({ activecostid: costid, render: 'render' })

                    }

                }

            }

        } else {
            alert(`Only Managers can update equipment costs `)
        }

        }

    }
    getdetail() {

        let cost = this.getactiveequipmentcost();

        if (cost) {
            return (cost.detail)
        } else {
            return (this.state.detail)
        }

    }

    handledetail(detail) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
    
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if(checkmanager) {
            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {
                    let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid);
    
                    if (this.state.activecostid) {
                        const mycost = dynamicstyles.getequipmentcostsbyid.call(this, this.state.activeequipmentid, this.state.activecostid)
                        if (mycost) {
    
                            let j = dynamicstyles.getequipmentcostskeybyid.call(this,this.state.activeequipmentid,this.state.activecostid)
                            myuser.company.equipment.myequipment[i].ownership.cost[j].detail = detail;
                            
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
    
                        }
    
                    } else {
    
                        let costid = makeID.costid.call(this);
                        const year = this.state.equipmentdateyear;
                        const day = this.state.equipmentdateday;
                        const month = this.state.equipmentdatemonth;
                        const datein = `${year}-${month}-${day}`;
                        let cost = 0;
                        let newcost = CreateCostID(costid, cost, detail, datein)
                        let equipment = this.getactiveequipment();
    
                        if (equipment.ownership.hasOwnProperty("cost")) {
                            myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                        } else {
    
                            myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                        }
    
                        this.props.reduxUser(myuser)
                        this.setState({ activecostid: costid, render: 'render' })
    
                    }
    
                }
    
            }
    
        } else {
            alert(`Only Managers can update equipment details `)
        }
    
        }
    
    }

    showaccountcost() {
        const styles = MyStylesheet();


        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();

        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'owned') {



                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...styles.addRightMargin }}>
                                        {equipmentdate.showequipmentdate.call(this)}
                                    </div>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                                        Cost <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                            value={this.getcost()}
                                            onChange={event => { this.handlecost(event.target.value) }} />
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                        Detail <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                            value={this.getdetail()}
                                            onChange={event => { this.handledetail(event.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    {this.showequipmentcosts()}
                                </div>
                            </div>

                        </div>
                    </div>
                )

            } else {
                return;
            }
        }
        else {
            return;
        }

    }
    showequipmentowned() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (this.state.activeequipmentid) {
            return (

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                        {this.showaccountcost()}
                    </div>
                </div>)

        } else {
            return;
        }

    }
    handleweek(week) {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid) {

            let myuser = dynamicstyles.getuser.call(this);
            let equipment = this.getactiveequipment();
            let i = this.getactiveequipmentkey();
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.week = week;
            } else {
                let month = 0;
                let day = 0;
                let hour = 0;
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }
    getweek() {
        let week = "";
        let equipment = this.getactiveequipment();

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                week = equipment.rentalrates.week
            }
        }
        return week;
    }
    handlemonth(month) {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid) {
            let myuser = dynamicstyles.getuser.call(this);
            let equipment = this.getactiveequipment();
            let i = this.getactiveequipmentkey();
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.month = month;
            } else {
                let week = 0;
                let day = 0;
                let hour = 0;
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }
    getmonth() {
        let month = "";
        let equipment = this.getactiveequipment();
        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                month = equipment.rentalrates.month
            }
        }
        return month;
    }

    getday() {
        let day = ""
        let equipment = this.getactiveequipment();

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                day = equipment.rentalrates.day
            }
        }
        return day;
    }

    handleday(day) {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid) {
            let myuser = dynamicstyles.getuser.call(this);
            let equipment = this.getactiveequipment();
            let i = this.getactiveequipmentkey();
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.day = day;
            } else {
                let month = 0;
                let week = 0;
                let hour = 0;
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }

    gethour() {
        let hour = ""
        let equipment = this.getactiveequipment();

        if (equipment) {
            if (equipment.hasOwnProperty("rentalrates")) {
                hour = equipment.rentalrates.hour
            }
        }
        return hour;
    }
    getactiveequipmentbackground(equipmentid) {
        if (this.state.activeequipmentid === equipmentid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    getactiveecostbackground(costid) {
        if (this.state.activecostid === costid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    handlehour(hour) {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid) {
            let myuser = dynamicstyles.getuser.call(this);
            let equipment = this.getactiveequipment();
            let i = this.getactiveequipmentkey();
            if (equipment.hasOwnProperty("rentalrates")) {
                myuser.company.equipment.myequipment[i].rentalrates.hour = hour;
            } else {
                let month = 0;
                let week = 0;
                let day = 0;
                let rentalrates = CreateRentalRate(month, week, day, hour);
                myuser.company.equipment.myequipment[i].rentalrates = rentalrates;

            }
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })

        }
    }
    showrentalrates() {

        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'rented' && this.state.showdetail) {
                if (this.state.width > 800) {
                    return (
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        Rental Rates
                                     </div>
                                </div>


                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        Month <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                            value={this.getmonth()}
                                            onChange={event => { this.handlemonth(event.target.value) }}
                                        />
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        Week <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                            value={this.getweek()}
                                            onChange={event => { this.handleweek(event.target.value) }} />
                                    </div>

                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        Day <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                            value={this.getday()}
                                            onChange={event => { this.handleday(event.target.value) }}
                                        />
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        Hour <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                            value={this.gethour()}
                                            onChange={event => { this.handlehour(event.target.value) }} />
                                    </div>

                                </div>

                            </div>

                        </div>)
                } else {
                    return (<div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex, ...regularFont, ...styles.generalFont }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    Rental Rates
                            </div>
                            </div>

                            <div style={{ ...styles.generalContainer }}>
                                Month <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    value={this.getmonth()}
                                    onChange={event => { this.handlemonth(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Week <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    value={this.getweek()}
                                    onChange={event => { this.handleweek(event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Day <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    value={this.getday()}
                                    onChange={event => { this.handleday(event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Hour <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    value={this.gethour()}
                                    onChange={event => { this.handlehour(event.target.value) }}
                                />
                            </div>
                        </div>
                    </div>)

                }
            } else {
                return;
            }

        }
    }
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    getmyequipment() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let equipment = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("equipment")) {
                    equipment = myuser.company.equipment.myequipment;
                }
            }
        }
        return equipment;
    }
    showequipmentids() {
        let myequipment = this.getmyequipment();
        let equipmentids = [];
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                equipmentids.push(this.showequipmentid(equipment))

            })
        }
        return equipmentids;
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    makequipmentactive(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid !== equipmentid) {
            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)
            if (myequipment) {
                const purchasedateyear = myequipment.ownership.purchasedate.substring(0, 4)
                const purchasedatemonth = myequipment.ownership.purchasedate.substring(5, 7);
                const purchasedateday = myequipment.ownership.purchasedate.substring(8, 10);
                const saledateyear = myequipment.ownership.saledate.substring(0, 4)
                const saledatemonth = myequipment.ownership.saledate.substring(5, 7);
                const saledateday = myequipment.ownership.saledate.substring(8, 10);
                this.setState({ activeequipmentid: equipmentid, purchasedateyear, purchasedatemonth, purchasedateday, saledateyear, saledatemonth, saledateday })
            }
        } else {

            this.reset();
            this.setState({ activeequipmentid: false })
        }
    }
    checkremoveequipment(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const company = dynamicstyles.getcompany.call(this)
        let validate = {};
        validate.validate = true;
        validate.message = "";
        if (company.hasOwnProperty("projects")) {
            // eslint-disable-next-line
            company.projects.myproject.map(myproject => {
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Schedule Equipment for Project ID ${myproject.projectid}  `;
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Actual Equipment for Project ID ${myproject.projectid}  `;
                        }
                    })

                }
            })
        }
        return validate;
    }
    removeequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        if (window.confirm(`Are you sure you want to remove ${equipment.equipment}?`)) {
            const myuser = dynamicstyles.getuser.call(this)
            const validate = this.checkremoveequipment(equipment.equipmentid);

            if (validate.validate) {
                const i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid)
                myuser.company.equipment.myequipment.splice(i, 1);
                if (myuser.company.equipment.myequipment.length === 0) {
                    delete myuser.company.equipment.myequipment
                    delete myuser.company.equipment
                }
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', activeequipmentid: false })


            } else {
                this.setState({ message: validate.message })
            }
        }
    }
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = this.getremoveicon();
        return (
            <div style={{ ...styles.generalFlex }} key={equipment.equipmentid}>
                <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...this.getactiveequipmentbackground(equipment.equipmentid) }} key={equipment.equipmentid} onClick={() => { this.makequipmentactive(equipment.equipmentid) }}>
                    {equipment.equipment}
                </div>
                <div style={{ ...styles.flex1 }} onClick={() => { this.removeequipment(equipment) }}> <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button></div>
            </div>)
    }
    getaccountid() {
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            return equipment.accountid;
        } else {
            return;
        }
    }
    handleaccountid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const checkmanager = dynamicstyles.checkmanager.call(this);
        if (checkmanager) {
            let myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {

                        let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        myuser.company.equipment.myequipment[i].accountid = accountid;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }

            }

        } else {
            alert(`Only Managers can access this function`)
        }
    }

    handleOwnedIcon() {
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'owned') {
                return (radioClosed())
            } else {
                return (radioOpen())
            }

        } else {
            return (radioOpen())
        }
    }
    handleRentedIcon() {
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'rented') {
                return (radioClosed())
            } else {
                return (radioOpen())
            }

        } else {
            return (radioOpen())
        }
    }
    handledetailicon() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const hideDetail = dynamicstyles.gethidedetails.call(this);
        if (this.state.activeequipmentid) {
            if (this.state.showdetail) {
                return (<span>Hide Detail <button style={{ ...styles.generalButton, ...hideDetail }} onClick={() => { this.setState({ showdetail: false }) }}>{closeDetail()} </button></span>)
            } else {
                return (<span>Show Detail <button style={{ ...styles.generalButton, ...hideDetail }} onClick={() => { this.setState({ showdetail: true }) }}>{openDetail()} </button></span>)
            }


        }



    }
    showequipmentdetail() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const radioButton = dynamicstyles.getradiobutton.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)

        if (this.state.activeequipmentid) {
            return (<div style={{ ...styles.generalFlex, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    Owned  <button style={{ ...styles.generalButton, ...radioButton, ...styles.addRightMargin }} onClick={() => { this.handleOwned() }}>{this.handleOwnedIcon()}</button>
                    Rented  <button style={{ ...styles.generalButton, ...radioButton, ...styles.addRightMargin }} onClick={() => { this.handleRented() }}>  {this.handleRentedIcon()}</button>
                    {this.handledetailicon()}
                </div>

            </div>)

        } else {
            return;
        }
    }
    handleOwned() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this);
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeequipmentid) {

                    let myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                    if (myequipment) {
                        let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (myequipment.ownershipstatus !== 'owned') {
                            myuser.company.equipment.myequipment[i].ownershipstatus = 'owned';
                            let workinghours = 0;
                            let purchasedate = `${this.state.purchasedateyear}-${this.state.purchasedatemonth}-${this.state.purchasedateday}`
                            let saledate = `${this.state.saledateyear}-${this.state.saledatemonth}-${this.state.saledateday}`
                            let loaninterest = 0;
                            let resalevalue = 0;
                            let ownership = EquipmentOwnership(workinghours, purchasedate, saledate, loaninterest, resalevalue)
                            myuser.company.equipment.myequipment[i].ownership = ownership;




                        } else {
                            myuser.company.equipment.myequipment[i].ownershipstatus = ''
                            delete myuser.company.equipment.myequipment[i].ownership;
                        }

                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    }

                }

            }

        } else {
            alert(`Only Managers have access to this function`)
        }
    }

    handleRented() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this);
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeequipmentid) {

                    let myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (myequipment.ownershipstatus !== 'rented') {
                            myuser.company.equipment.myequipment[i].ownershipstatus = 'rented'

                        } else {
                            myuser.company.equipment.myequipment[i].ownershipstatus = ''
                            delete myuser.company.equipment.myequipment[i].rentalrates;
                        }

                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })


                    }

                }

            }

        } else {
            alert(`Only Managers have access to this function`)
        }

    }

    handleworkinghours(workinghours) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = this.getactiveequipmentkey();
                myuser.company.equipment.myequipment[i].ownership.workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }

        }

    }

    handleloaninterest(loaninterest) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                if (myequipment) {

                    const checkmanager = dynamicstyles.checkmanager.call(this)
                    if (checkmanager) {
                        const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)


                        myuser.company.equipment.myequipment[i].ownership.loaninterest = loaninterest;
                    } else {
                        alert(`Only Managers can modify equipment loan values `)
                    }


                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }

            }

        }

    }

    handleresalevalue(resalevalue) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                if (myequipment) {

                    const checkmanager = dynamicstyles.checkmanager.call(this)
                    if (checkmanager) {
                        const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        myuser.company.equipment.myequipment[i].ownership.resalevalue = resalevalue;

                    } else {
                        alert(`Only Managers can modify equipment resale values `)
                    }


                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }

            }

        }

    }

    equipmentdetail() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const bidField = dynamicstyles.getbidfield.call(this);
        const purchasedate = new PurchaseDate();
        const saledate = new SaleDate();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'owned' && this.state.showdetail) {
                return (<div style={{ ...styles.generalFlex, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex2 }}>
                                {purchasedate.showpurchasedate.call(this)}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                Loan Interest <br />
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                    value={this.getloaninterest()}
                                    onChange={event => { this.handleloaninterest(event.target.value) }}
                                />
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex2 }}>
                                {saledate.showsaledate.call(this)}

                            </div>
                            <div style={{ ...styles.flex1 }}>
                                Resale Value <br />
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                    value={this.getresalevalue()}
                                    onChange={event => { this.handleresalevalue(event.target.value) }}
                                />
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                Estimated Annual Working Hours
                        <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getworkinghours()}
                                    onChange={event => { this.handleworkinghours(event.target.value) }}
                                />
                            </div>

                        </div>

                    </div>
                </div>)

            } else {
                return;
            }
        } else {
            return;
        }
    }
    showcostaccounts() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const hideDetail = dynamicstyles.gethidedetails.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);

        const iconmenu = () => {
            if (this.state.costmenu) {
                return (<span>Hide Cost Menu <button style={{ ...styles.generalButton, ...hideDetail }} onClick={() => { this.setState({ costmenu: false }) }}>{closeDetail()} </button></span>)
            } else {
                return (<span>Show Cost Menu <button style={{ ...styles.generalButton, ...hideDetail }} onClick={() => { this.setState({ costmenu: true }) }}>{openDetail()} </button></span>)
            }
        }
        const costmenu = () => {
            if (this.state.costmenu) {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showequipmentowned()}
                    </div>
                </div>)
            }
        }
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment.ownershipstatus === 'owned') {
                return (
                    <div style={{ ...styles.flex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    {iconmenu()}
                                </div>
                            </div>
                            {costmenu()}
                        </div>
                    </div>
                )
            }

        }

    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const accountid = new AccountID();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const showaccountid = () => {
            if (this.state.activeequipmentid) {
                return (accountid.showaccountmenu.call(this))
            } else {
                return;
            }
        }
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this);
            const companyurl = () => {
                if (myuser.hasOwnProperty("company")) {
                    return (myuser.company.url)
                }
            }
            if(checkmanager) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont, ...styles.boldFont }}>/{companyurl()}</span><br />
                                <span style={{ ...headerFont, ...styles.boldFont }}>/equipment</span>
                            </div>
                        </div>

                        {this.showequipment()}
                        {showaccountid()}
                        {this.showequipmentids()}
                        {this.showequipmentdetail()}
                        {this.equipmentdetail()}
                        {this.showcostaccounts()}
                        {this.showrentalrates()}


                        {dynamicstyles.showsavecompany.call(this)}

                    </div>
                </div>
            )

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You have to be a Manager to view this component  </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Equipment </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Equipment);