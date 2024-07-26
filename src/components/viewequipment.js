import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { radioOpen, radioClosed, removeIconSmall, CheckedBox, EmptyBox } from './svg'
import { EquipmentOwnership, formatDateStringDisplay, CreateCostID } from './functions';
import PurchaseDate from './purchasedate';
import SaleDate from './saledate';
import AccountID from './accountid'
import EquipmentDate from './equipmentdate';
import { Link } from 'react-router-dom';
import MakeID from './makeids'
import Frequency from './frequency';
import EquipmentID from './equipmentid';


class ViewEquipment {



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



    removeequipmentcost(cost) {


        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const company = construction.getcompany.call(this);

        if (company) {

            if (window.confirm(`Are you sure you want to delete ${cost.detail}?`)) {
                const equipment = viewequipment.getequipment.call(this)
                if (equipment) {


                    const i = construction.getequipmentkeybyid.call(this, equipment.equipmentid)
                    const mycost = construction.getcostbyid.call(this, equipment.equipmentid, cost.costid);

                    if (mycost) {
                        const j = construction.getequipmentcostskeybyid.call(this, equipment.eequipmentid, cost.costid)

                        company.equipment[i].ownership.cost.splice(j, 1);
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render', activecostid: false })

                    }



                }

            }


        }
    }

    showequipmentcost(cost) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const removeIcon = construction.getremoveicon.call(this)
        const viewequipment = new ViewEquipment();

        const reoccurring = (cost) => {
            if (cost.hasOwnProperty("reoccurring")) {
                return cost.reoccurring.frequency;
            }
        }

        const getactivecostbackground = (costid) => {

            if (this.state.activecostid === costid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return;
            }


        }
        return (
            <div style={{ ...styles.generalFlex }} key={cost.costid}>
                <div
                    style={{ ...styles.flex5, ...regularFont, ...styles.bottomMargin15, ...styles.generalFont, ...getactivecostbackground(cost.costid) }} onClick={() => { viewequipment.makeequipmentcostactive.call(this, cost.costid) }}>
                    {formatDateStringDisplay(cost.timein)} Cost:${Number(cost.cost).toFixed(2)}  Detail: {cost.detail} {reoccurring(cost)}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { viewequipment.removeequipmentcost.call(this, cost) }}>{removeIconSmall()} </button>
                </div>
            </div>
        )


    }


    showequipmentcosts(equipment) {
        const viewequipment = new ViewEquipment();
        let equipmentcosts = [];

        if (equipment.hasOwnProperty("ownership")) {
            if (equipment.ownership.hasOwnProperty("cost")) {
                // eslint-disable-next-line
                equipment.ownership.cost.map(cost => {
                    equipmentcosts.push(viewequipment.showequipmentcost.call(this, cost))
                })

            }


        }
        return equipmentcosts;
    }

    handledetail(detail) {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        const makeID = new MakeID();
        if (company) {

            const equipment = viewequipment.getequipment.call(this)

            if (equipment) {
                let i = construction.getequipmentkeybyid.call(this, equipment.equipmentid);

                if (this.state.activecostid) {
                    const mycost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (mycost) {

                        let j = construction.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                        company.equipment[i].ownership.cost[j].detail = detail;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {

                    let costid = makeID.costid.call(this);
                    const year = this.state.equipmentdateyear;
                    const day = this.state.equipmentdateday;
                    const month = this.state.equipmentdatemonth;
                    const datein = `${year}-${month}-${day}`;
                    let newcost = CreateCostID(costid, 0, detail, datein)


                    if (equipment.ownership.hasOwnProperty("cost")) {
                        company.equipment[i].ownership.cost.push(newcost)
                    } else {

                        company.equipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxCompany(company)
                    this.setState({ activecostid: costid, render: 'render' })

                }

            }


        }

    }


    handlecost(cost) {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        const makeID = new MakeID();
        if (company) {

            const equipment = viewequipment.getequipment.call(this)

            if (equipment) {
                let i = construction.getequipmentkeybyid.call(this, equipment.equipmentid);

                if (this.state.activecostid) {
                    const mycost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (mycost) {

                        let j = construction.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                        company.equipment[i].ownership.cost[j].cost = cost;
                        this.props.reduxCompany(company)
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


                    if (equipment.ownership.hasOwnProperty("cost")) {
                        company.equipment[i].ownership.cost.push(newcost)
                    } else {

                        company.equipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxCompany(company)
                    this.setState({ activecostid: costid, render: 'render' })

                }

            }


        }

    }
    getHourly() {
        const viewequipment = new ViewEquipment();
        let hourly = "";
        const equipment = viewequipment.getequipment.call(this);
        if (equipment.hasOwnProperty("rented")) {
            hourly = equipment.rented.hourly;
        }
        return hourly;

    }

    handleHourly(value) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)

        if (company) {

            const equipmentid = this.state.activeequipmentid;

            const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
            if (equipment) {
                if (equipment.hasOwnProperty("rented")) {
                    const i = construction.getequipmentkeybyid.call(this, equipmentid)
                    company.equipment[i].rented.hourly = value;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })


                }

            }

        }
    }


    getDaily() {
        const viewequipment = new ViewEquipment();
        let daily = "";
        const equipment = viewequipment.getequipment.call(this);
        if (equipment.hasOwnProperty("rented")) {
            daily = equipment.rented.daily;
        }
        return daily;

    }

    handleDaily(value) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)

        if (company) {

            const equipmentid = this.state.activeequipmentid;

            const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
            if (equipment) {
                if (equipment.hasOwnProperty("rented")) {
                    const i = construction.getequipmentkeybyid.call(this, equipmentid)
                    company.equipment[i].rented.daily = value;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })


                }

            }

        }
    }


    getWeekly() {
        const viewequipment = new ViewEquipment();
        let weekly = "";
        const equipment = viewequipment.getequipment.call(this);
        if (equipment.hasOwnProperty("rented")) {
            weekly = equipment.rented.weekly;
        }
        return weekly;

    }

    handleWeekly(value) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)

        if (company) {

            const equipmentid = this.state.activeequipmentid;

            const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
            if (equipment) {
                if (equipment.hasOwnProperty("rented")) {
                    const i = construction.getequipmentkeybyid.call(this, equipmentid)
                    company.equipment[i].rented.weekly = value;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })


                }

            }

        }
    }

    getMonthly() {
        const viewequipment = new ViewEquipment();
        let monthly = "";
        const equipment = viewequipment.getequipment.call(this);
        if (equipment.hasOwnProperty("rented")) {
            monthly = equipment.rented.monthly;
        }
        return monthly;

    }

    handleMonthly(value) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)

        if (company) {

            const equipmentid = this.state.activeequipmentid;

            const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
            if (equipment) {
                if (equipment.hasOwnProperty("rented")) {
                    const i = construction.getequipmentkeybyid.call(this, equipmentid)
                    company.equipment[i].rented.monthly = value;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })


                }

            }

        }
    }

    showRental() {
        const viewequipment = new ViewEquipment();

        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const equipment = viewequipment.getequipment.call(this);
        if (equipment) {

            if (equipment.hasOwnProperty("rented")) {

                return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                        <span style={{ ...headerFont, ...styles.generalFont, ...styles.boldFont }}>
                            Equipment Rental
                        </span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont, ...styles.generalFont }}>
                            Rates
                        </span>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...styles.addMargin }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                value={viewequipment.getHourly.call(this)}
                                onChange={event => { viewequipment.handleHourly.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>/hr</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...styles.addMargin }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                value={viewequipment.getDaily.call(this)}
                                onChange={event => { viewequipment.handleDaily.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>/day</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...styles.addMargin }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                value={viewequipment.getWeekly.call(this)}
                                onChange={event => { viewequipment.handleWeekly.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>/week</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...styles.addMargin }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                value={viewequipment.getMonthly.call(this)}
                                onChange={event => { viewequipment.handleMonthly.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>/month</span>
                        </div>
                    </div>

                </div>)

            }

        }
    }




    showaccountcost() {
        const viewequipment = new ViewEquipment();
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();
        const headerFont = construction.getHeaderFont.call(this)
        const frequency = new Frequency();

        const equipment = viewequipment.getequipment.call(this);

        if (equipment) {

            if (!equipment.hasOwnProperty("rented")) {

                const buttonWidth = () => {
                    if (this.state.width > 1200) {
                        return ({ width: '60px' })

                    } else if (this.state.width > 600) {
                        return ({ width: '50px' })

                    } else {
                        return ({ width: '40px' })
                    }
                }




                const getreoccuring = (equipment) => {

                    if (this.state.activecostid) {
                        const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

                        if (cost) {
                            if (cost.hasOwnProperty("reoccurring")) {
                                return (CheckedBox())

                            } else {
                                return (EmptyBox())
                            }
                        } else {
                            return (EmptyBox())
                        }
                    } else {
                        return (EmptyBox())
                    }

                }

                const showfrequency = (equipment) => {
                    if (this.state.activecostid) {

                        const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

                        if (cost.hasOwnProperty("reoccurring")) {
                            return (viewequipment.showFrequency.call(this))
                        }
                    }

                }


                const Reoccurring = (equipment) => {

                    if (this.state.activecostid) {
                        return (<div style={{ ...styles.generalContainer }}>
                            <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => viewequipment.handlereoccurring.call(this)}> {getreoccuring(equipment)}</button>
                            <span style={{ ...regularFont, ...styles.generalFont }}>
                                Reoccurring Cost
                            </span>
                            {showfrequency(equipment)}


                        </div>
                        )
                    }
                }



                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>Ownership Costs</span>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...styles.addRightMargin }}>
                                        {equipmentdate.showequipmentdate.call(this)}
                                    </div>




                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                        <span style={{ ...styles.generalFont, ...regularFont }}>  Detail </span> <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                            value={viewequipment.getdetail.call(this, equipment)}
                                            onChange={event => { viewequipment.handledetail.call(this, event.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}> Cost</span> <br />
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={viewequipment.getcost.call(this, equipment)}
                                    onChange={event => { viewequipment.handlecost.call(this, event.target.value) }} />
                            </div>

                            {Reoccurring(equipment)}

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    {viewequipment.showequipmentcosts.call(this, equipment)}
                                </div>
                            </div>



                        </div>
                    </div>
                )

            }

        }

    }



    handleworkinghours(workinghours) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        if (company) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (equipment) {
                let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                company.equipment[i].ownership.workinghours = workinghours;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })

            }

        }

    }

    handleloaninterest(loaninterest) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);

        if (company) {
            if (this.state.activeequipmentid) {
                const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                if (myequipment) {


                    const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)


                    company.equipment[i].ownership.loaninterest = loaninterest;



                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })

                }

            }

        }

    }


    getpurchasevalue(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            return equipment.ownership.purchase
        }
    }

    getaccountid() {
        const construction = new Construction();
        const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
        let accountid = "";
        if (equipment) {
            if (equipment.accountid) {
                accountid = equipment.accountid
            }
        }

        return accountid
    }

    handleaccountid(accountid) {
        const construction = new Construction();

        const company = construction.getcompany.call(this);
        if (company) {
            if (this.state.activeequipmentid) {
                const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {

                    let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                    company.equipment[i].accountid = accountid;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })

                }
            }

        }


    }
    getequipment() {
        const construction = new Construction();
        return construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)

    }

    makeequipmentcostactive(costid) {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const equipment = viewequipment.getequipment.call(this)

        if (equipment) {

            if (this.state.activecostid === costid) {

                this.setState({ activecostid: false })
                viewequipment.equipmentdatedefault.call(this)
            } else {

                const cost = construction.getcostbyid.call(this, equipment.equipmentid, costid)
                if (cost) {
                    const equipmentdateyear = cost.timein.substring(0, 4)
                    const equipmentdatemonth = cost.timein.substring(5, 7);
                    const equipmentdateday = cost.timein.substring(8, 10);
                    this.setState({ activecostid: costid, equipmentdateday, equipmentdatemonth, equipmentdateyear })

                }
            }

        }

    }

    getloaninterest(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            return equipment.ownership.loaninterest
        }
    }
    getresalevalue(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            return equipment.ownership.resalevalue;
        }
    }
    getworkinghours(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            return equipment.ownership.workinghours;
        }
    }

    equipmentdetail() {
        const viewequipment = new ViewEquipment();
        const styles = MyStylesheet();
        const construction = new Construction();
        const bidField = construction.getbidfield.call(this);
        const purchasedate = new PurchaseDate();
        const saledate = new SaleDate();
        const regularFont = construction.getRegularFont.call(this);
        const headerFont = construction.getHeaderFont.call(this)

        const equipment = viewequipment.getequipment.call(this);

        if (equipment) {

            if (!equipment.hasOwnProperty("rented")) {

                const getsaledate = () => {
                    if (this.state.width > 1200) {
                        return (
                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex2 }}>
                                    {saledate.showsaledate.call(this)}

                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}> Resale Value </span> <br />
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                        value={viewequipment.getresalevalue.call(this, equipment)}
                                        onChange={event => { viewequipment.handleresalevalue.call(this, event.target.value) }}
                                    />
                                </div>
                            </div>)
                    } else {
                        return (
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    {saledate.showsaledate.call(this)}

                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}> Resale Value </span> <br />
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                        value={viewequipment.getresalevalue.call(this, equipment)}
                                        onChange={event => { viewequipment.handleresalevalue.call(this, event.target.value) }}
                                    />
                                </div>
                            </div>)
                    }
                }

                const getpurchasedate = () => {
                    if (this.state.width > 1200) {
                        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex2 }}>
                                {purchasedate.showpurchasedate.call(this)}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <span style={{ ...regularFont, ...styles.generalFont }}> Purchase Value</span> <br />
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                    value={viewequipment.getpurchasevalue.call(this, equipment)}
                                    onChange={event => { viewequipment.handlepurchasevalue.call(this, event.target.value) }}
                                />
                            </div>
                        </div>)
                    } else {

                        return (
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    {purchasedate.showpurchasedate.call(this)}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}> Purchase Value</span> <br />
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                        value={viewequipment.getpurchasevalue.call(this, equipment)}
                                        onChange={event => { viewequipment.handlepurchasevalue.call(this, event.target.value) }}
                                    />
                                </div>
                            </div>)

                    }
                }


                return (<div style={{ ...styles.generalFlex, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>Ownership</span>
                        </div>

                        {getpurchasedate()}
                        {getsaledate()}



                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                <span style={{ ...regularFont, ...styles.generalFont }}> Estimated Annual Working Hours </span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={viewequipment.getworkinghours.call(this, equipment)}
                                    onChange={event => { viewequipment.handleworkinghours.call(this, event.target.value) }}
                                />
                            </div>

                            <div style={{ ...styles.flex1 }}>
                                <span style={{ ...regularFont, ...styles.generalFont }}> Loan Interest </span> <br />
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                    value={viewequipment.getloaninterest.call(this, equipment)}
                                    onChange={event => { viewequipment.handleloaninterest.call(this, event.target.value) }}
                                />
                            </div>

                        </div>

                    </div>
                </div>)

            }

        }


    }

    handlepurchasevalue(purchasevalue) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        if (company) {

            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            if (myequipment) {
            


                const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                company.equipment[i].ownership.purchase = purchasevalue;
                company.equipment[i].ownership.purchasedate = new Date();




                this.props.reduxCompany(company)
                this.setState({ render: 'render' })

            }



        }

    }

    handleresalevalue(resalevalue) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        if (company) {
            if (this.state.activeequipmentid) {
                const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                if (myequipment) {

                    const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                    company.equipment[i].ownership.resalevalue = resalevalue;



                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })

                }

            }

        }

    }

    createOwnership() {
        let workinghours = 0;
        let purchasedate = `${this.state.purchasedateyear}-${this.state.purchasedatemonth}-${this.state.purchasedateday}`
        let saledate = `${this.state.saledateyear}-${this.state.saledatemonth}-${this.state.saledateday}`
        let loaninterest = 0;
        let resalevalue = 0;
        let ownership = EquipmentOwnership(workinghours, purchasedate, saledate, loaninterest, resalevalue)
        return ownership;
    }

    handleownership(type) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            const equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            if (equipment) {
                const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)

                if (type === 'owned') {

                    company.equipment[i].ownership = {};

                    if (equipment.hasOwnProperty("rented")) {

                        delete company.equipment[i].rented;
                        this.props.reduxCompany(company)
                        this.setState({ render:'render'})
                    }



                }

                else if (type === 'rented') {

                    company.equipment[i].rented = {}

                    if (equipment.hasOwnProperty("ownership")) {


                        delete company.equipment[i].ownership
                       

                    }

                    this.props.reduxCompany(company)
                    this.setState({ activecostid:false })



                }



            }

        }




       
    }

    setDefaultState(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            const purchasedateyear = equipment.ownership.purchasedate.substring(0, 4)
            const purchasedatemonth = equipment.ownership.purchasedate.substring(5, 7);
            const purchasedateday = equipment.ownership.purchasedate.substring(8, 10);

            const saledateyear = equipment.ownership.saledate.substring(0, 4)
            const saledatemonth = equipment.ownership.saledate.substring(5, 7);
            const saledateday = equipment.ownership.saledate.substring(8, 10);

            this.setState({ purchasedateyear, purchasedatemonth, purchasedateday, saledateyear, saledatemonth, saledateday })

        }
    }

    setDefault() {
        let defaults = true;
        if (!this.state.purchasedateyear && !this.state.purchasedatemonth && !this.state.purchasedateday && !this.state.saledateyear && !this.state.saledatemonth && !this.state.saledateday) {
            defaults = false;
        }
        return defaults
    }

    getdetail(equipment) {
        const construction = new Construction();
        let detail = "";
        if (this.state.activecostid) {
            const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
            if (cost) {
                detail = cost.detail;
            }
        }
        return detail;


    }

    getcost(equipment) {
        const construction = new Construction();
        let getcost = "";
        if (this.state.activecostid) {
            const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
            if (cost) {
                getcost = cost.cost;
            }
        }
        return getcost;


    }

    handleFrequency(amount) {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            const equipment = viewequipment.getequipment.call(this)
            if (equipment) {
                const i = construction.getequipmentkeybyid.call(this, equipment.equipmentid)
                if (this.state.activecostid) {
                    const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("reoccurring")) {
                            const j = construction.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                            company.equipment[i].ownership.cost[j].reoccurring.frequency = amount;
                            this.props.reduxCompany(company)
                            this.setState({ render: 'render' })

                        }

                    }

                }
            }


        }


    }

    getfrequency() {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const equipment = viewequipment.getequipment.call(this)
        if (equipment) {
            if (this.state.activecostid) {
                const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

                if (cost.hasOwnProperty("reoccurring")) {
                    return cost.reoccurring.frequency;
                }
            }

        }

    }

    handlereoccurring() {
        const viewequipment = new ViewEquipment();
        const construction = new Construction();
        const company = construction.getcompany.call(this)

        if (company) {
            const equipment = viewequipment.getequipment.call(this)
            if (equipment) {
                const i = construction.getequipmentkeybyid.call(this, equipment.equipmentid)
                if (this.state.activecostid) {
                    const cost = construction.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = construction.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (cost.hasOwnProperty("reoccurring")) {
                            delete company.equipment[i].ownership.cost[j].reoccurring
                        } else {

                            company.equipment[i].ownership.cost[j].reoccurring = { frequency: '' }
                        }
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }
                }
            }



        }

    }

    makematerialactive(materialid) {
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false })
        } else {
            this.setState({ activematerialid: materialid })
        }

    }
    validatematerial(material) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        let validate = true;
        let validatemessage = "";
        const materialid = material.materialid;
        if (myprojects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside schedule materials Project ID ${myproject.projectid}`

                        }
                    })

                }

                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside actual materials Project ID ${myproject.projectid}`

                        }
                    })

                }
            })
        }
        return { validate, validatemessage }
    }

    removematerial(material) {
        const construction = new Construction();
        const viewequipment = new ViewEquipment();

        if (window.confirm(`Are you sure you want to delete ${material.material}?`)) {
            const validate = viewequipment.validatematerial.call(this, material);
            if (validate.validate) {
                const company = construction.getcompany.call(this);
                const mymaterial = construction.getmymaterialfromid.call(this, material.materialid)
                if (mymaterial) {
                    const i = construction.getmaterialkeybyid.call(this, material.materialid);
                    company.materials.mymaterial.splice(i, 1);
                    this.props.reduxCompany(company);
                    this.setState({ activematerialid: false, message: '' })

                }
            } else {
                this.setState({ message: validate.validatemessage })
            }

        }

    }

    loadaccounts() {
        const construction = new Construction();
        let accounts = construction.getaccounts.call(this)
        let options = [];
        options.push(<option key={`selectanaccount`} value=""> Select Account ID</option>);
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option key={account.accountid} value={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }

    showaccountmenu() {
        const construction = new Construction();
        const viewequipment = new ViewEquipment();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                    value={viewequipment.getaccountid.call(this)}
                    onChange={event => { viewequipment.handleaccountid.call(this, event.target.value) }}>
                    {viewequipment.loadaccounts.call(this)}
                </select>
            </div>)


    }


    showFrequency() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const viewequipment = new ViewEquipment();
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <select style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                    onChange={event => { viewequipment.handleFrequency.call(this, event.target.value) }}
                    value={viewequipment.getfrequency.call(this)}>
                    <option value={false}>Select Frequency</option>
                    <option value={`daily`}>Daily</option>
                    <option value={`weekly`}>Weekly</option>
                    <option value={`monthly`}>Monthly</option>
                    <option value={`annually`}>Annually</option>
                </select>
            </div>)
    }


    showViewEquipment() {
        const accountid = new AccountID();
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const viewequipment = new ViewEquipment();

        const styles = MyStylesheet();
        const buttonWidth = () => {

            if (this.state.width > 1200) {
                return ({ width: '90px' })

            } else if (this.state.width > 600) {
                return ({ width: '60px' })

            } else {

                return ({ width: '45px' })

            }
        }
        const company = construction.getcompany.call(this)
        if (myuser) {
            if (company) {
                const equipmentid = this.state.activeequipmentid;
                const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
                if (equipment) {



                    const ownershipbox = (equipment) => {
                        if (equipment.hasOwnProperty("rented")) {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'owned') }}>{radioOpen()}</button>
                                </div>
                            )
                        } else if (equipment.hasOwnProperty("ownership")) {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'owned') }}>{radioClosed()}</button>
                                </div>
                            )
                        } else {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'owned') }}>{radioOpen()}</button>
                                </div>
                            )
                        }
                    }

                    const rentedbox = (equipment) => {
                        if (equipment.hasOwnProperty("rented")) {

                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'rented') }}>{radioClosed()}</button>
                                </div>
                            )
                        } else if (equipment.hasOwnProperty("ownership")) {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'rented') }}>{radioOpen()}</button>
                                </div>
                            )

                        } else {

                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { viewequipment.handleownership.call(this, 'rented') }}>{radioOpen()}</button>
                                </div>
                            )

                        }
                    }










                    const equipmentrate = (equipment) => {

                        if (equipment.hasOwnProperty("ownership")) {
                            let equipmentrate = construction.calculateequipmentratebyownership.call(this, equipment.equipmentid)
                            if (equipmentrate) {
                                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Equipment Rate is ${Number(equipmentrate).toFixed(2)}/hr</span>
                                </div>)
                            }
                        }
                    }
                    return (
                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>

                                <a style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{equipment.equipment}</a>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>Owned</span>
                                    {ownershipbox(equipment)}
                                </div>

                                <div style={{ ...styles.flex1 }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>Rented</span>
                                    {rentedbox(equipment)}
                                </div>
                            </div>

                            {viewequipment.showaccountmenu.call(this)}

                            {viewequipment.showRental.call(this)}
                            {viewequipment.equipmentdetail.call(this)}
                            {viewequipment.showaccountcost.call(this)}




                        </div>

                    )

                } else {
                    return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Equipment Not Found</span>
                    </div>)

                }

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You need a company to view equipment</span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Equipment </span>
            </div>)
        }
    }


}


export default ViewEquipment;