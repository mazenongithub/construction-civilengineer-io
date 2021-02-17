import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { StripeConnect } from './actions/api'
import { inputUTCStringForLaborID, calculatetotalhours, sorttimes } from './functions'
import { Link } from 'react-router-dom';

class ViewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, stripeconnect: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const construction = new Construction();
        const csicodes = construction.getcsis.call(this)
        if (!csicodes) {
            construction.loadcsis.call(this)
        }


    }



    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    checklaborid(providerid) {
        let accountid = this.props.match.params.accountid;
        const construction = new Construction();
        let check = false;
        const benefits = construction.getemployeebenefitsbyid.call(this, providerid)
        if (benefits) {
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.accountid === accountid) {
                    check = true;
                }
            })
        }
        return check;

    }


    checkmaterialid(mymaterialid) {
        const construction = new Construction();
        let check = false;
        const accountid = this.props.match.params.accountid;
        const mymaterial = construction.getmymaterialfromid.call(this, mymaterialid)
        if (mymaterial) {
            if (mymaterial.accountid === accountid) {
                check = true;
            }

        }

        return check;
    }

    checkequipmentid(equipmentid) {
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)
        const accountid = this.props.match.params.accountid;
        let check = false;
        if (myequipment) {
            if (myequipment.accountid === accountid) {
                check = true;
            }
        }
        return check;
    }

    getallitems() {
        const construction = new Construction()
        let items = [];
        const workItem = (itemid, timein, csiid, type, amount) => {
            return ({ itemid, timein, csiid, type, amount })
        }

        const updateItems = (items) => {
            // eslint-disable-next-line
            items.map((item, i) => {
                if (item.type === "material") {
                    items[i].timein = item.timein.replace(/-/g, '/')
                }
            })
            return items;
        }

        const addRunningBalance = (items) => {
            let runningbalance = 0;
            // eslint-disable-next-line
            items.map((item, i) => {
                if (item.type === 'transfer') {
                    runningbalance -= Number(item.amount)
                } else {
                    runningbalance += Number(item.amount)
                }
                items[i].runningbalance = runningbalance;

            })
            return items;
        }
        const myprojects = construction.getprojects.call(this)
        if (myprojects) {
            // eslint-disable-next-line
            myprojects.map(project => {


                if (project.hasOwnProperty("actual")) {
                    if (project.actual.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        project.actual.labor.map(mylabor => {

                            if (this.checklaborid(mylabor.providerid)) {

                                let amount = calculatetotalhours(mylabor.timeout, mylabor.timein) * Number(mylabor.laborrate) * (1 + (Number(mylabor.profit) / 100))
                                items.push(workItem(mylabor.laborid, mylabor.timein, mylabor.csiid, 'labor', amount))

                                if (mylabor.hasOwnProperty("actualtransfers")) {
                                    // eslint-disable-next-line
                                    mylabor.actualtransfers.map(transfer => {

                                        items.push(workItem(transfer.transferid, transfer.created, mylabor.csiid, 'transfer', transfer.amount))
                                    })
                                }


                            }

                        })

                    }



                    if (project.actual.hasOwnProperty("materials")) {
                        // eslint-disable-next-line
                        project.actual.materials.map(mymaterial => {

                            if (this.checkmaterialid(mymaterial.mymaterialid)) {

                                let amount = Number(mymaterial.quantity) * Number(mymaterial.unitcost) * (1 + (Number(mymaterial.profit) / 100))
                                items.push(workItem(mymaterial.materialid, mymaterial.timein, mymaterial.csiid, 'material', amount))

                                if (mymaterial.hasOwnProperty("actualtransfers")) {
                                    // eslint-disable-next-line
                                    mymaterial.actualtransfers.map(transfer => {

                                        items.push(workItem(transfer.transferid, transfer.created, mymaterial.csiid, 'transfer', transfer.amount))
                                    })
                                }

                            }

                        })

                    }

                    if (project.actual.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        project.actual.equipment.map(myequipment => {

                            if (this.checkequipmentid(myequipment.myequipmentid)) {

                                let amount = calculatetotalhours(myequipment.timeout, myequipment.timein) * Number(myequipment.equipmentrate) * (1 + (Number(myequipment.profit) / 100))
                                items.push(workItem(myequipment.equipmentid, myequipment.timein, myequipment.csiid, 'equipment', amount))

                                if (myequipment.hasOwnProperty("actualtransfers")) {
                                    // eslint-disable-next-line
                                    myequipment.actualtransfers.map(transfer => {

                                        items.push(workItem(transfer.transferid, transfer.created, myequipment.csiid, 'transfer', transfer.amount))
                                    })
                                }

                            }


                        })
                    }


                }



            })

        }

        items = updateItems(items)

        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        items = addRunningBalance(items)


        return items;
    }

    async loadstripeconnect(myuser, stripe) {
        const construction = new Construction();

        try {

            let response = await StripeConnect(stripe)
            console.log(response)
            let i = construction.getaccountkeybyid.call(this, this.props.match.params.accountid)
            if (response.url) {
                myuser.company.accounts[i].stripedashboard = response.url;
                this.props.reduxUser(myuser)
                this.setState({ stripeconnect: true })

            } else {
                this.setState({ stripeconnect: true })

            }


        } catch (err) {
            this.setState({ stripeconnect: true })
            alert(err)
        }


    }

    default() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        return (<div style={{ ...styles.generalContainer }}>
            <span style={{ ...styles.generalFont, ...regularFont }}>
                Please Login to View Account
            </span>
        </div>)
    }
    showitem(item) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const csi = construction.getcsibyid.call(this, item.csiid)
        const regularFont = construction.getRegularFont.call(this)

        const showamount = (item) => {
            if (item.type === 'transfer') {
                return `($${Number(item.amount).toFixed(2)})`

            } else {
                return `$${Number(item.amount).toFixed(2)}`
            }
        }

        const transferitem = (item) => {
            let transfer = "";
            if (item.type === 'transfer') {
                transfer = `(transfer)`
            }
            return transfer;
        }
        if (this.state.width > 600) {
            return (
                <div style={{ ...styles.generalFlex }} key={item.itemid}>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            {inputUTCStringForLaborID(item.timein)}
                        </span>
                    </div>
                    <div style={{ ...styles.flex2 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            {transferitem(item)}{csi.csi} {csi.title}
                        </span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            {showamount(item)}
                        </span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>
                            {`$${Number(item.runningbalance).toFixed(2)}`}
                        </span>
                    </div>

                </div>)

        } else {
            return (
                <div style={{ ...styles.generalContainer }} key={item.itemid}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>
                        {inputUTCStringForLaborID(item.timein)} {csi.csi} {csi.title}  {showamount(item)}  {`$${Number(item.runningbalance).toFixed(2)}`}
                    </span>

                </div>)
        }
    }

    showallworkitems() {
        const items = this.getallitems();
        let myitems = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                myitems.push(this.showitem(item))
            })
        }
        return myitems;
    }


    render() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const items = this.getallitems();
        console.log(items)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {

                if (myuser.company.hasOwnProperty("accounts")) {

                    const accountid = this.props.match.params.accountid;
                    const account = construction.getaccountbyid.call(this, accountid)
                    if (account.stripe && !account.stripedashboard && !this.state.stripeconnect) {
                        this.loadstripeconnect(myuser, account.stripe)

                    }
                    if (account) {

                        const stripeconnect = (account) => {
                            if (account.stripedashboard) {
                                return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                                    <span style={{ ...styles.generalFont, ...styles.boldFont, ...headerFont }}>Account Status</span> <br />

                                    <a style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink, ...styles.blueLink }}
                                        href={account.stripedashboard}>{account.stripedashboard}</a>

                                </div>)
                            } else {
                                return (
                                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                        <span style={{ ...styles.generalFont, ...styles.boldFont, ...headerFont }}>Account Status</span> <br />
                                        <a style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink, ...styles.blueLink }}
                                            href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_SERVER_API}/construction/stripe/accounts&client_id=${process.env.REACT_APP_STRIPE_CONNECT}&state=${this.props.match.params.accountid}&scope=read_write`}>Connect Your Account to Stripe To Get Started and Accept Payments</a>
                                    </div>)
                            }
                        }

                        return (

                            <div style={{ ...styles.generalContainer }}>


                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/accounts`}
                                    > /accounts</Link>
                                </div>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/accounts/${account.accountid}`}
                                    > /{account.accountname}</Link>
                                </div>


                                {stripeconnect(account)}

                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...styles.generalFont, ...styles.boldFont, ...headerFont }}>Account Summary </span> <br />
                                    {this.showallworkitems()}
                                </div>





                            </div>)

                    } else {
                        return (this.default())
                    }
                } else {
                    return (this.default())
                }
            } else {
                return (this.default())
            }
        } else {
            return (this.default())
        }


    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers: state.allusers,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ViewAccount);