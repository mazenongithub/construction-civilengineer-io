import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { radioOpen, radioClosed, removeIconSmall, CheckedBox, EmptyBox } from './svg'
import { EquipmentOwnership, formatDateStringDisplay, CreateCostID } from './functions';
import PurchaseDate from './purchasedate';
import SaleDate from './saledate';
import AccountID from './accountid'
import EquipmentDate from './equipmentdate';
import { Link } from 'react-router-dom';
import MakeID from './makeids'
import Frequency from './frequency';


class ViewEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activecostid: '', purchasecalender: true, purchasedateday: '', purchasedatemonth: '', purchasedateyear: '', saledateday: '', saledatemonth: '', saledateyear: '', salecalender: true, equipmentcalender: true, equipmentdateday: '', equipmentdateyear: '', equipmentdatemonth: '', spinner: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.equipmentdatedefault()

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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

    

    removeequipmentcost(cost) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            if (window.confirm(`Are you sure you want to delete ${cost.detail}?`)) {
                const equipment = this.getequipment()
                if (equipment) {


                    const i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid)
                    const mycost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, cost.costid);

                    if (mycost) {
                        const j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.eequipmentid, cost.costid)

                        myuser.company.equipment.myequipment[i].ownership.cost.splice(j, 1);
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render', activecostid: false })

                    }



                }

            }


        }
    }

    showequipmentcost(cost) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = dynamicstyles.getremoveicon.call(this)

        const reoccurring = (cost) => {
            if(cost.hasOwnProperty("reoccurring")) {
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
                    style={{ ...styles.flex5, ...regularFont, ...styles.bottomMargin15, ...styles.generalFont, ...getactivecostbackground(cost.costid) }} onClick={() => { this.makeequipmentcostactive(cost.costid) }}>
                    {formatDateStringDisplay(cost.timein)} Cost:${Number(cost.cost).toFixed(2)}  Detail: {cost.detail} {reoccurring(cost)}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeequipmentcost(cost) }}>{removeIconSmall()} </button>
                </div>
            </div>
        )


    }


    showequipmentcosts(equipment) {
        let equipmentcosts = [];

        if (equipment.hasOwnProperty("ownership")) {
            if (equipment.ownership.hasOwnProperty("cost")) {
                // eslint-disable-next-line
                equipment.ownership.cost.map(cost => {
                    equipmentcosts.push(this.showequipmentcost(cost))
                })

            }


        }
        return equipmentcosts;
    }

    handledetail(detail) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            const equipment = this.getequipment()

            if (equipment) {
                let i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid);

                if (this.state.activecostid) {
                    const mycost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (mycost) {

                        let j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
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
                    let newcost = CreateCostID(costid, 0, detail, datein)


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

    }


    handlecost(cost) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            const equipment = this.getequipment()

            if (equipment) {
                let i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid);

                if (this.state.activecostid) {
                    const mycost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (mycost) {

                        let j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
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

    }




    showaccountcost(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const frequency = new Frequency();

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
                const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

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

                const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

                if (cost.hasOwnProperty("reoccurring")) {
                    return (frequency.showFrequency.call(this))
                }
            }

        }


        const Reoccurring = (equipment) => {

            if (this.state.activecostid) {
                return (<div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => this.handlereoccurring()}> {getreoccuring(equipment)}</button>
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
                                    value={this.getdetail(equipment)}
                                    onChange={event => { this.handledetail(event.target.value) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}> Cost</span> <br />
                        <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                            value={this.getcost(equipment)}
                            onChange={event => { this.handlecost(event.target.value) }} />
                    </div>

                    {Reoccurring(equipment)}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            {this.showequipmentcosts(equipment)}
                        </div>
                    </div>



                </div>
            </div>
        )

    }
  


    handleworkinghours(workinghours) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const equipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid)
            if (equipment) {
                let i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
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
            if (this.props.match.params.equipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                if (myequipment) {

                    const checkmanager = dynamicstyles.checkmanager.call(this)
                    if (checkmanager) {
                        const i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)


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


    getpurchasevalue(equipment) {
        if (equipment.hasOwnProperty("ownership")) {
            return equipment.ownership.purchase
        }
    }

    getaccountid() {
        const dynamicstyles = new DynamicStyles();
        const equipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid)
        let accountid = "";
        if (equipment) {
            if (equipment.accountid) {
                accountid = equipment.accountid
            }
        }

        return accountid
    }

    handleaccountid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const checkmanager = dynamicstyles.checkmanager.call(this);
        if (checkmanager) {
            let myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                if (this.props.match.params.equipmentid) {
                    const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid)
                    if (myequipment) {

                        let i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
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
    getequipment() {
        const dynamicstyles = new DynamicStyles();
        return dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid)

    }

    makeequipmentcostactive(costid) {
        const dynamicstyles = new DynamicStyles();
        const equipment = this.getequipment()

        if (equipment) {

            if (this.state.activecostid === costid) {

                this.setState({ activecostid: false })
                this.equipmentdatedefault()
            } else {

                const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, costid)
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

    equipmentdetail(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const bidField = dynamicstyles.getbidfield.call(this);
        const purchasedate = new PurchaseDate();
        const saledate = new SaleDate();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const headerFont = dynamicstyles.getHeaderFont.call(this)

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
                                value={this.getresalevalue(equipment)}
                                onChange={event => { this.handleresalevalue(event.target.value) }}
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
                                value={this.getresalevalue(equipment)}
                                onChange={event => { this.handleresalevalue(event.target.value) }}
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
                            value={this.getpurchasevalue(equipment)}
                            onChange={event => { this.handlepurchasevalue(event.target.value) }}
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
                                value={this.getpurchasevalue(equipment)}
                                onChange={event => { this.handlepurchasevalue(event.target.value) }}
                            />
                        </div>
                    </div>)

            }
        }

        if (equipment.hasOwnProperty("ownership")) {
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
                                value={this.getworkinghours(equipment)}
                                onChange={event => { this.handleworkinghours(event.target.value) }}
                            />
                        </div>

                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}> Loan Interest </span> <br />
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...bidField }}
                                value={this.getloaninterest(equipment)}
                                onChange={event => { this.handleloaninterest(event.target.value) }}
                            />
                        </div>

                    </div>

                </div>
            </div>)

        }


    }

    handlepurchasevalue(purchasevalue) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {

            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
            if (myequipment) {
                console.log(myequipment)


                const i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)

                myuser.company.equipment.myequipment[i].ownership.purchase = purchasevalue;




                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }



        }

    }

    handleresalevalue(resalevalue) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (this.props.match.params.equipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                if (myequipment) {

                    const i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                    myuser.company.equipment.myequipment[i].ownership.resalevalue = resalevalue;



                    this.props.reduxUser(myuser)
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

    handleownership(type, add) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const equipment = dynamicstyles.getmyequipmentbyid.call(this, this.props.match.params.equipmentid)
            if (equipment) {
                const i = dynamicstyles.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)

                if (type === 'owned') {

                    if (add) {

                        if (!equipment.hasOwnProperty("ownership")) {

                            myuser.company.equipment.myequipment[i].ownership = this.createOwnership()
                            
                            
                        }

                        if (equipment.hasOwnProperty("rented")) {
                            delete myuser.company.equipment.myequipment[i].rented
                        }

                    }

                }

             else if (type === 'rented') {

                if (add) {

                    if (equipment.hasOwnProperty("ownership")) {


                        myuser.company.equipment.myequipment[i].rented = true;

                    }



                } else {

                    if (equipment.hasOwnProperty("rented")) {
                        delete myuser.company.equipment.myequipment[i].rented
                    }

                }

            }
        
        
        }


        }

        this.props.reduxUser(myuser)
        this.setState({ render: 'render' })
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
        const dynamicstyles = new DynamicStyles();
        let detail = "";
        if (this.state.activecostid) {
            const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
            if (cost) {
                detail = cost.detail;
            }
        }
        return detail;


    }

    getcost(equipment) {
        const dynamicstyles = new DynamicStyles();
        let getcost = "";
        if (this.state.activecostid) {
            const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
            if (cost) {
                getcost = cost.cost;
            }
        }
        return getcost;


    }

    handleFrequency(amount) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const equipment = this.getequipment()
            if (equipment) {
                const i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid)
                if (this.state.activecostid) {
                    const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (cost) {
                        if (cost.hasOwnProperty("reoccurring")) {
                            const j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                            myuser.company.equipment.myequipment[i].ownership.cost[j].reoccurring.frequency = amount;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    }

                }
            }


        }


    }

    getfrequency() {

        const dynamicstyles = new DynamicStyles();
        const equipment = this.getequipment()
        if (equipment) {
            if (this.state.activecostid) {
                const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)

                if (cost.hasOwnProperty("reoccurring")) {
                    return cost.reoccurring.frequency;
                }
            }

        }

    }

    handlereoccurring() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            const equipment = this.getequipment()
            if (equipment) {
                const i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid)
                if (this.state.activecostid) {
                    const cost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (cost.hasOwnProperty("reoccurring")) {
                            delete myuser.company.equipment.myequipment[i].ownership.cost[j].reoccurring
                        } else {

                            myuser.company.equipment.myequipment[i].ownership.cost[j].reoccurring = { frequency: '' }
                        }
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }
                }
            }



        }

    }


    render() {
        const accountid = new AccountID();
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const headerFont = dynamicstyles.getHeaderFont.call(this)

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
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                const equipmentid = this.props.match.params.equipmentid;
                const equipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)
                if (equipment) {

                    const ownershipbox = (equipment) => {
                        if (equipment.hasOwnProperty("ownership") && !equipment.rented) {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { this.handleownership('owned', false) }}>{radioClosed()}</button>
                                </div>
                            )
                        } else {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { this.handleownership('owned', true) }}>{radioOpen()}</button>
                                </div>
                            )
                        }
                    }

                    const rentedbox = (equipment) => {
                        if (equipment.hasOwnProperty("rented")) {
                            if (equipment.rented) {
                                return (
                                    <div style={{ ...styles.generalContainer }}>
                                        <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { this.handleownership('rented', false) }}>{radioClosed()}</button>
                                    </div>
                                )
                            } else {
                                return (
                                    <div style={{ ...styles.generalContainer }}>
                                        <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { this.handleownership('rented', true) }}>{radioOpen()}</button>
                                    </div>
                                )

                            }
                        } else {
                            return (
                                <div style={{ ...styles.generalContainer }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth() }} onClick={() => { this.handleownership('rented', true) }}>{radioOpen()}</button>
                                </div>
                            )
                        }
                    }

                    if (equipment.hasOwnProperty("ownership") && !this.setDefault()) {
                        this.setDefaultState(equipment)
                    }

                    const equipmentrate =(equipment) => {

                        if(equipment.hasOwnProperty("ownership")) {
                            let equipmentrate =  dynamicstyles.calculateequipmentratebyownership.call(this, equipment.equipmentid) 
                            if(equipmentrate) {
                                return(<div style={{...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15}}>
                                    <span style={{...styles.generalFont,...regularFont}}>Equipment Rate is ${Number(equipmentrate).toFixed(2)}/hr</span>
                                    </div>)
                            }
                        }
                    }
                    return (
                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>

                                <Link to={`/${myuser.profile}/company/${myuser.company.url}/equipment/${equipment.equipmentid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{equipment.equipment}</Link>
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

                            {accountid.showaccountmenu.call(this)}
                            {this.equipmentdetail(equipment)}
                            {this.showaccountcost(equipment)}
                            {equipmentrate(equipment)}


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

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ViewEquipment);