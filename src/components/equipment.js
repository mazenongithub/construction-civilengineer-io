import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { radioOpen, radioClosed, saveCompanyIcon, removeIconSmall } from './svg'
import { CreateCostID, makeID, CreateRentalRate, CreateEquipment } from './functions';

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeequipmentid: '', equipment: '', ownership: '', activecostid: '', cost: '', datein: '', detail: '' }
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
    handleequipment(equipment) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = this.getactiveequipmentkey();
                myuser.company.equipment.myequipment[i].equipment = equipment;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            } else {
                this.setState({ equipment })
                let equipmentid = makeID(16);
                let workinghours = 0;
                let newEquipment = CreateEquipment(equipmentid, equipment, workinghours)

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
    }
    showequipment() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Equipment  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
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
    showicons() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Owned {this.getowned()}  Rented {this.getrented()}
                </div>
            </div>)
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        Owned {this.getowned()}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Rented  {this.getrented()}
                    </div>
                </div>
            )
        }

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
    getaccounts() {
        let company = this.getcompany();
        let accounts = false;
        if (company.hasOwnProperty("office")) {
            let office = company.office;
            if (office.hasOwnProperty("accounts")) {
                accounts = company.office.accounts.account;

            }
        }
        return accounts;
    }
    loadaccounts() {
        let accounts = this.getaccounts();
        let options = [];
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option value={account.accountid} key={account.accountid}>{account.account} -{account.accountname}</option>)
            })
        }
        return options;
    }
    makeequipmentcostactive(costid) {
        console.log(costid)
        if (this.state.activecostid === costid) {
            this.setState({ activecostid: false })
        } else {
            this.setState({ activecostid: costid })
        }

    }
    showequipmentcost(cost) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon()
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactiveecostbackground(cost.costid) }} onClick={() => { this.makeequipmentcostactive(cost.costid) }}>
            {cost.timein} {cost.cost}  {cost.detail} <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
        </div>)


    }
    showequipmentcosts() {
        let equipmentcosts = [];
        if (this.state.activeequipmentid) {
            let equipment = this.getactiveequipment();
            if (equipment.hasOwnProperty("ownership")) {
                // eslint-disable-next-line
                equipment.ownership.cost.map(cost => {
                    equipmentcosts.push(this.showequipmentcost(cost))
                })

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
        let myuser = this.getuser();
        if (myuser) {

            let i = this.getactiveequipmentkey();

            if (this.state.activecostid) {
                let activecost = this.getactiveequipmentcost();
                activecost.cost = cost;
                let j = this.getactiveequipmentcostkey();
                myuser.company.equipment.myequipment[i].ownership.cost[j].cost = cost;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            } else {
                this.setState({ cost });
                let costid = makeID(16)
                let datein = this.state.datein;
                let detail = "";
                let newcost = CreateCostID(costid, cost, detail, datein)
                let equipment = this.getactiveequipment();

                if (equipment.hasOwnProperty("ownership")) {
                    myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                } else {
                    let ownership = { cost: [newcost] }
                    myuser.company.equipment.myequipment[i].ownership = ownership;
                }
                this.props.reduxUser(myuser)
                this.setState({ activecostid: costid, render: 'render' })

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
        let myuser = this.getuser();
        if (myuser) {

            let i = this.getactiveequipmentkey();

            if (this.state.activecostid) {

                let j = this.getactiveequipmentcostkey();
                myuser.company.equipment.myequipment[i].ownership.cost[j].detail = detail;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                this.setState({ detail });
                let costid = makeID(16);
                let datein = this.state.datein;
                let cost = 0;
                let newcost = CreateCostID(costid, cost, detail, datein)
                let equipment = this.getactiveequipment();
                if (equipment.hasOwnProperty("ownership")) {
                    myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                } else {
                    let ownership = { cost: [newcost] }
                    myuser.company.equipment.myequipment[i].ownership = ownership;
                }
                this.props.reduxUser(myuser)
                this.setState({ activecostid: costid, render: 'render' })

            }


        }

    }
    showaccountcost() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.activeequipmentid) {

            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                                    Date
                                 </div>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                                    Cost <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                        value={this.getcost()}
                                        onChange={event => { this.handlecost(event.target.value) }}
                                    />
                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                Detail  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    value={this.getdetail()}
                                    onChange={event => { this.handledetail(event.target.value) }}
                                />
                            </div>

                            {this.showequipmentcosts()}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...styles.addRightMargin }}>
                                        Date
                                    </div>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...styles.addLeftMargin }}>
                                        Cost <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                            value={this.getcost()}
                                            onChange={event => { this.handlecost(event.target.value) }} />
                                    </div>

                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                        Detail <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
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
            }
        } else {
            return;
        }
    }
    showequipmentowned() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
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
        if (this.state.activeequipmentid) {
            let myuser = this.getuser();
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
        if (this.state.activeequipmentid) {
            let myuser = this.getuser();
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
        if (this.state.activeequipmentid) {
            let myuser = this.getuser();
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
        if (this.state.activeequipmentid) {
            let myuser = this.getuser();
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
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.activeequipmentid) {
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    Rental Rates
                            </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
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

                            <div style={{ ...styles.generalFlex }}>
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
        let myuser = this.getuser();
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
        if (this.state.activeequipmentid !== equipmentid) {
            this.setState({ activeequipmentid: equipmentid })
        } else {
            this.setState({ activeequipmentid: false })
        }
    }
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...this.getactiveequipmentbackground(equipment.equipmentid) }} key={equipment.equipmentid} onClick={() => { this.makequipmentactive(equipment.equipmentid) }}>
                {equipment.equipment} <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
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
        if (this.state.activeequipmentid) {
            let myuser = this.getmyuser();
            let i = this.getactiveequipmentkey();
            myuser.company.equipment.myequipment[i].accountid = accountid;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }
    showaccountmenu() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.activeequipmentid) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, }}>
                    Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                        value={this.getaccountid()}
                        onChange={event => { this.handleaccountid(event.target.value) }}>
                        {this.loadaccounts()}
                    </select>
                </div>)

        }
    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const savecompanyicon = this.getsavecompanyicon();
        const regularFont = this.getRegularFont;

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/equipment
                        </div>
                    </div>

                    {this.showequipment()}

                    {this.showaccountmenu()}
                    {this.showequipmentowned()}
                    {this.showrentalrates()}

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        &nbsp;
                     </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...savecompanyicon }}>{saveCompanyIcon()}</button>
                    </div>

                    {this.showequipmentids()}
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

export default connect(mapStateToProps, actions)(Equipment);