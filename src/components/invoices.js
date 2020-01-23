import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { activeCheckIcon, CreateInvoiceIcon } from './svg'
import { UTCStringFormatDateforProposal, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime } from './functions'
import { Link } from 'react-router-dom';

class Invoices extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeinvoiceid: false }
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
    getactiveinvoicebackground(item) {
        if (item.invoiceid === this.state.activeinvoiceid) {
            return ({ backgroundColor: '#93CCE5' })
        }
    }

    handleequipmentprofit(profit, equipmentid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                let j = dynamicstyles.getactualequipmentkeybyid.call(this, equipmentid);
                myuser.company.projects.myproject[i].actualequipment.myequipment[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    handlematerialprofit(profit, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid);
                myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    handlelaborprofit(profit, laborid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                let j = dynamicstyles.getactuallaborkeybyid.call(this, laborid);
                myuser.company.projects.myproject[i].actuallabor.mylabor[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
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
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();


        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveinvoicebackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  ${item.laborrate} =  ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getactuallaborprofitbyid.call(this, item.laborid)}
                            onChange={event => { this.handlelaborprofit(event.target.value, item.laborid) }}
                        />
                    </div>
                </div>
            </div>
        )


    }
    checkinvoiceitem(item) {
        let result = 'add';
        if (item.invoiceid === this.state.activeinvoiceid) {
            result = 'remove'
        }
        return result;
    }
    addItemtoProposal(item) {



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
        console.log(myuser)
        let invoices = [];
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            console.log(myproject)
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
    showequipmentitem(item) {
        let dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const smallFont = dynamicstyles.getSmallFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, item.myequipmentid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        return (

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveinvoicebackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}  Total Hours:{totalhours.toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getactualequipmentprofitbyid.call(this, item.equipmentid)}
                            onChange={event => { this.handleequipmentprofit(event.target.value, item.equipmentid) }}
                        />
                    </div>
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
        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveinvoicebackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}
                    {item.quantity}  x ${item.unitcost}/{item.unit} = ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getactualmaterialprofitbyid.call(this, item.materialid)}
                            onChange={event => { this.handlematerialprofit(event.target.value, item.materialid) }} />
                    </div>
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
    render() {
        let dynamicstyles = new DynamicStyles();
        let styles = MyStylesheet();
        let titleFont = dynamicstyles.gettitlefont.call(this)
        let proposalButton = dynamicstyles.getcreateproposal.call(this)
        let headerFont = dynamicstyles.getHeaderFont.call(this)
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
                            <button style={{ ...styles.generalButton, ...proposalButton }}>{CreateInvoiceIcon()}</button>
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

export default connect(mapStateToProps, actions)(Invoices);