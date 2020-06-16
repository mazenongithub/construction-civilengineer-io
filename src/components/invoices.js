import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { activeCheckIcon, CreateInvoiceIcon } from './svg'
import { UTCStringFormatDateforProposal, CreateInvoice, inputDateObjOutputAdjString, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime } from './functions'
import { Link } from 'react-router-dom';
import MakeID from './makeids';

class Invoices extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeinvoiceid: false, updated: new Date(), approved: '' }
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
    getactiveinvoicekey() {
        let dynamicstyles = new DynamicStyles();
        let key = false;
        if (this.state.activeinvoiceid) {
            let invoiceid = this.state.invoiceid;
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject.hasOwnProperty("invoices")) {
                // eslint-disable-next-line
                myproject.invoices.myinvoice.map((myinvoice, i) => {
                    if (myinvoice.invoiceid === invoiceid) {
                        key = i;
                    }
                })

            }


        }


        return key;
    }
    getactivebackground(item) {
        if (item.invoiceid === this.state.activeinvoiceid) {
            return ({ backgroundColor: '#F2C4D2' })
        }
    }

    handleequipmentprofit(profit, equipmentid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                const myequipment = dynamicstyles.getactualequipmentbyid.call(this, equipmentid)
                if (myequipment) {
                    let j = dynamicstyles.getactualequipmentkeybyid.call(this, equipmentid);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].profit = profit;
                    this.props.reduxUser(myuser);
                    if (myequipment.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, myequipment.invoiceid)
                    } else {

                        this.setState({ render: 'render' })

                    }

                }
            }
        }
    }

    handlematerialprofit(profit, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid)
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid)
                if (mymaterial) {
                    let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid);
                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].profit = profit;
                    this.props.reduxUser(myuser);
                    if (mymaterial.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }

                }
            }
        }
    }

    handlelaborprofit(profit, laborid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                const mylabor = dynamicstyles.getactuallaborbyid.call(this, laborid);
                if (mylabor) {
                    let j = dynamicstyles.getactuallaborkeybyid.call(this, laborid);
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].profit = profit;
                    this.props.reduxUser(myuser);
                    if (mylabor.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }
            }
        }
    }

    checkinvoiceitem(item) {
        let result = 'add';
        if (item.invoiceid === this.state.activeinvoiceid) {
            result = 'remove'
        }
        return result;
    }
    addItem(item) {



        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            if (this.state.activeinvoiceid) {

                let invoiceid = this.state.activeinvoiceid;
          
                    let i = dynamicstyles.getprojectkey.call(this)

                    let result = this.checkinvoiceitem(item);
                    let j = false;
                    if (result === 'add') {

                        if (item.hasOwnProperty("laborid")) {
                            j = dynamicstyles.getactuallaborkeybyid.call(this, item.laborid)
                            myuser.company.projects.myproject[i].actuallabor.mylabor[j].invoiceid = invoiceid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("materialid")) {
                            j = dynamicstyles.getactualmaterialkeybyid.call(this, item.materialid)
                            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].invoiceid = invoiceid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("equipmentid")) {
                            j = dynamicstyles.getactualequipmentkeybyid.call(this, item.equipmentid);

                            myuser.company.projects.myproject[i].actualequipment.myequipment[j].invoiceid = invoiceid;
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }

                    } else if (result === 'remove') {

                        if (item.hasOwnProperty("laborid")) {
                            j = dynamicstyles.getactuallaborkeybyid.call(this, item.laborid)
                            myuser.company.projects.myproject[i].actuallabor.mylabor[j].invoiceid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("materialid")) {
                            j = dynamicstyles.getactualmaterialkeybyid.call(this, item.materialid)
                            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].invoiceid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else if (item.hasOwnProperty("equipmentid")) {
                            j = dynamicstyles.getactualequipmentkeybyid.call(this, item.equipmentid);

                            myuser.company.projects.myproject[i].actualequipment.myequipment[j].invoiceid = ""
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }


                    }

                

            }
        }


    }

    showinvoiceids() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        let invoices = [];
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);

            if (myproject) {
                if (myproject.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    myproject.invoices.myinvoice.map(myinvoice => {
                        invoices.push(this.showinvoiceid(myinvoice))
                    })
                }
            }
        }
        return invoices;
    }
    handlecheckicon(invoiceid) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const checkButton = dynamicstyles.getCheckButton.call(this)
        if (this.state.activeinvoiceid === invoiceid) {
            return (<button style={{ ...styles.generalButton, ...checkButton }}>{activeCheckIcon()}</button>)
        } else {
            return;
        }
    }
    makeinvoiceactive(invoiceid) {
        if (this.state.activeinvoiceid === invoiceid) {
            this.setState({ activeinvoiceid: false })
        } else {
            this.setState({ activeinvoiceid: invoiceid })
        }
    }
    getmaterialprofitbyid(materialid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterials => {
                    if (mymaterials.materialid === materialid) {
                        profit = mymaterials.profit;
                    }
                })
            }
        }
        return profit;
    }
    getlaborprofitbyid(laborid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    if (mylabor.laborid === laborid) {
                        profit = mylabor.profit;
                    }
                })
            }
        }
        return profit;
    }
    showinvoiceid(myinvoice) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const invoiceid = myinvoice.invoiceid;
        let updateinfo = "";
        if (myinvoice.updated) {
            updateinfo = `Updated ${UTCStringFormatDateforProposal(myinvoice.updated)}`
        }
        if (this.state.width > 1200) {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myinvoice.invoiceid)}
                </div>
                <div style={{ ...styles.flex5 }} onClick={() => { this.makeinvoiceactive(invoiceid) }}>
                    Invoice ID {myinvoice.invoiceid} {updateinfo}
                </div>
            </div>)

        } else if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myinvoice.invoiceid)}
                </div>
                <div style={{ ...styles.flex3 }} onClick={() => { this.makeinvoiceactive(invoiceid) }}>
                    Invoice ID {myinvoice.invoiceid} {updateinfo}
                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myinvoice.invoiceid)}
                </div>
                <div style={{ ...styles.flex2 }} onClick={() => { this.makeinvoiceactive(invoiceid) }}>
                    Invoice ID {myinvoice.invoiceid} {updateinfo}
                </div>
            </div>)
        }
    }
    getequipmentprofitbyid(equipmentid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {
                    if (myequipment.equipmentid === equipmentid) {
                        profit = myequipment.profit;
                    }
                })
            }
        }
        return profit;
    }

    showequipmentitem(item) {
        let dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const smallFont = dynamicstyles.getSmallFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, item.myequipmentid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        const equipmentrate = item.equipmentrate;
        const largeField = dynamicstyles.getitemfieldlarge.call(this)
        const amount = Number(totalhours * Number(item.equipmentrate))
        const profit = Number(item.profit) / 100;
        const checkequipment = () => {
            let check = true;
            if(item.settlementid) {
                check = false;
            }
            return check;
        }
        const showequipmentrate = () => {
            if (checkequipment()) {
                return (<input type="text" style={{ ...styles.generalFont, ...smallFont, ...largeField }}
                    onChange={event => { this.handleequipmentrate(event.target.value, item.equipmentid) }}
                    value={equipmentrate} />)
            } else {
                return equipmentrate;
            }
        }
        const showprofit = () => {
            if (checkequipment()) {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={this.getequipmentprofitbyid(item.equipmentid)}
                            onChange={event => { this.handleequipmentprofit(event.target.value, item.equipmentid) }}
                        />
                    </div>)
            }
        }
        return (

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                    Total Hours:{totalhours.toFixed(2)} x $
                    {showequipmentrate()}
                         = {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>


                    {showprofit()}

                </div>
            </div>
        )

    }

    showmaterialitem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const profitField = dynamicstyles.getprofitfield.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const material = dynamicstyles.getmymaterialfromid.call(this, item.mymaterialid)
        const amount = Number(item.quantity * item.unitcost);
        const smallFont = dynamicstyles.getSmallFont.call(this)
        const proposalFieldLarge = dynamicstyles.getitemfieldlarge.call(this)
        const proposalFieldSmall = dynamicstyles.getitemfieldsmall.call(this)
        const checkmaterial = () => {
            let check = true;
            if(item.settlementid) {
                check = false;
            }
            return check;
        }
        const showprofit = () => {
            if (checkmaterial()) {
                return (<div style={{ ...styles.generalContainer }}>
                    Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                        value={this.getmaterialprofitbyid(item.materialid)}
                        onChange={event => { this.handlematerialprofit(event.target.value, item.materialid) }} />
                </div>)
            }
        }
        const showunitcost = () => {
            if (checkmaterial()) {
                return (<input type="text" value={item.unitcost}
                    onChange={event => { this.handlematerialunitcost(event.target.value, item.materialid) }}
                    style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />)
            } else {
                return item.unitcost;
            }
        }
        const showquantity = () => {
            if (checkmaterial()) {
                return (<input type="text"
                    value={item.quantity}
                    onChange={event => { this.handlematerialquantity(event.target.value, item.materialid) }}
                    style={{ ...styles.generalFont, ...smallFont, ...proposalFieldLarge }} />)
            } else {
                return item.quantity;
            }
        }
        const showunit = () => {
            if (checkmaterial()) {
                return (<input type="text" value={item.unit} onChange={event => { this.handlematerialunit(event.target.value, item.materialid) }} style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />)
            } else {
                return item.unit;
            }
        }
        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}
                    {showquantity()}   x $
             {showunitcost()}/
             {showunit()}
              = ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>
                    {showprofit()}
                </div>
            </div>
        )

    }
    showlaboritem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const smallFont = dynamicstyles.getSmallFont.call(this)
        const amount = (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
        const employee = dynamicstyles.getemployeebyproviderid.call(this, item.providerid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        const largeField = dynamicstyles.getitemfieldlarge.call(this);
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const checklabor = () => {
            let check = true;
            if(item.settlementid) {
                check = false;
            }
            return check;
        }
        const profit = getprofit();
        const showprofit = () => {

            if (checklabor()) {
                return (<div style={{ ...styles.generalContainer }}>
                    Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                        value={this.getlaborprofitbyid(item.laborid)}
                        onChange={event => { this.handlelaborprofit(event.target.value, item.laborid) }}
                    />
                </div>)
            }


        }
        const showlaborrate = () => {
            if (checklabor()) {
                return (<input type="text" value={item.laborrate} style={{ ...styles.generalFont, ...largeField, ...smallFont }} onChange={event => { this.handlelaborrate(event.target.value, item.laborid) }} />)
            } else {
                return (item.laborrate)
            }
        }
        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $
                    {showlaborrate()}
                    =  ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    {showprofit()}
                </div>
            </div>
        )


    }

    showallpayitems() {
        const dynamicstyles = new DynamicStyles();
        let items = [];
        let payitems = dynamicstyles.getAllActual.call(this)
        if (payitems.hasOwnProperty("length")) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    items.push(this.showlaboritem(item))
                }
                if (item.hasOwnProperty("materialid")) {
                    items.push(this.showmaterialitem(item))

                }
                if (item.hasOwnProperty("equipmentid")) {
                    items.push(this.showequipmentitem(item))

                }


            })
        }
        return items;

    }
    showinvoicelink() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        if (this.state.activeinvoiceid) {
            let companyid = this.props.match.params.companyid;
            let projectid = this.props.match.params.projectid;
            let invoiceid = this.state.activeinvoiceid;
            let providerid = this.props.match.params.providerid;
            return (
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/invoices/${invoiceid}`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont }}>
                        View Invoice ID: {invoiceid}
                    </Link>
                </div>)
        } else {
            return;
        }

    }
    handlelaborrate(laborrate, laborid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                const mylabor = dynamicstyles.getactuallaborbyid.call(this, laborid);
                if (mylabor) {
                    let j = dynamicstyles.getactuallaborkeybyid.call(this, laborid);
                    myuser.company.projects.myproject[i].actuallabor.mylabor[j].laborrate = laborrate;
                    this.props.reduxUser(myuser);
                    if (mylabor.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }

            }
        }
    }
    handleequipmentrate(equipmentrate, equipmentid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                const myequipment = dynamicstyles.getactualequipmentbyid.call(this, equipmentid)
                if (myequipment) {
                    let j = dynamicstyles.getactualequipmentkeybyid.call(this, equipmentid);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
                    this.props.reduxUser(myuser);
                    if (myequipment.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, myequipment.invoiceid)
                    } else {

                        this.setState({ render: 'render' })

                    }
                }

            }
        }
    }
    handlematerialunit(unit, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid)
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid)
                if (mymaterial) {
                    let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid);
                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unit = unit;
                    this.props.reduxUser(myuser)
                    if (mymaterial.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }
            }
        }
    }
    handlematerialunitcost(unitcost, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid)
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid)
                if (mymaterial) {
                    let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid);
                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unitcost = unitcost;
                    this.props.reduxUser(myuser)
                    if (mymaterial.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }

            }
        }
    }
    handlematerialquantity(quantity, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid)
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid)
                if (mymaterial) {
                    let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid);

                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].quantity = quantity;
                    this.props.reduxUser(myuser)
                    if (mymaterial.invoiceid) {
                        dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                }

            }
        }
    }
    createnewinvoice() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID()
        if (myuser) {
            let invoiceid = makeID.invoiceid.call(this)
            let providerid = myuser.providerid;
            let updated = inputDateObjOutputAdjString(this.state.updated);
            let approved = this.state.approved;
            let newinvoice = CreateInvoice(invoiceid, providerid, updated, approved);
            let myproject = dynamicstyles.getproject.call(this);
            let i = dynamicstyles.getprojectkey.call(this);
            if (myproject.hasOwnProperty("invoices")) {
                myuser.company.projects.myproject[i].invoices.myinvoice.push(newinvoice)
            } else {
                myuser.company.projects.myproject[i].invoices = { myinvoice: [newinvoice] }
            }
            this.props.reduxUser(myuser)
            this.setState({ activeinvoiceid: invoiceid })

        }
    }
    render() {
        let dynamicstyles = new DynamicStyles();
        let styles = MyStylesheet();
        let titleFont = dynamicstyles.gettitlefont.call(this)
        let proposalButton = dynamicstyles.getcreateproposal.call(this)
        let headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const myuser =dynamicstyles.getuser.call(this)
        if(myuser) {
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...titleFont, ...styles.alignCenter }}>
                            /invoices
                </div>

                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...proposalButton }} onClick={() => { this.createnewinvoice() }}>{CreateInvoiceIcon()}</button>
                        </div>

                    </div>

                    {this.showinvoiceids()}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Labor
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Equipment
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Materials
                        </div>

                    </div>

                    {this.showallpayitems()}
                    {this.showinvoicelink()}
                    {dynamicstyles.showsaveproject.call(this)}
                </div>
            </div>
        )

        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to Invoices </span>
            </div>)
        }


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

export default connect(mapStateToProps, actions)(Invoices);