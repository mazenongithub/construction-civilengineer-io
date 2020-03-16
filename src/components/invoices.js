import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { activeCheckIcon, CreateInvoiceIcon } from './svg'
import { UTCStringFormatDateforProposal, CreateInvoice, inputDateObjOutputAdjString } from './functions'
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


    showallpayitems() {
        const dynamicstyles = new DynamicStyles();
        let items = [];
        let payitems = dynamicstyles.getAllActual.call(this)
        if (payitems.hasOwnProperty("length")) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    items.push(dynamicstyles.showlaboritem.call(this, item))
                }
                if (item.hasOwnProperty("materialid")) {
                    items.push(dynamicstyles.showmaterialitem.call(this, item))

                }
                if (item.hasOwnProperty("equipmentid")) {
                    items.push(dynamicstyles.showequipmentitem.call(this, item))

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
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getactuallaborkeybyid.call(this, laborid)
            myuser.company.projects.myproject[i].actuallabor.mylabor[j].laborrate = laborrate;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }
    }
    handleequipmentrate(equipmentrate, equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getactualequipmentkeybyid.call(this, equipmentid);
            myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }
    }
    handlematerialunit(unit, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unit = unit;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }
    handlematerialunitcost(unitcost, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unitcost = unitcost;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }
    handlematerialquantity(quantity, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = dynamicstyles.getactualmaterialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].quantity = quantity;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
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