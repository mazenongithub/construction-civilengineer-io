import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { StripeConnect } from './actions/api'
import {inputUTCStringForLaborID, calculatetotalhours,formatDateStringDisplay} from './functions'

class ViewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, nodesignin: false, stripedashboard: true, chargeamount:0,transferamount:0,setamount:false,settransferamount:false}
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
    async getstripedashboard() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            const account = dynamicstyles.getaccountbyid.call(this, this.props.match.params.accountid);
            if (account.stripe && !account.stripedashboard && this.state.stripedashboard) {
                let response = await StripeConnect(myuser.profile, account.stripe)
                console.log(response)
                let i = dynamicstyles.getaccountkeybyid.call(this, this.props.match.params.accountid)
                if (response.url) {
                    myuser.company.office.accounts.account[i].stripedashboard = response.url;
                    this.props.reduxUser(myuser)

                }
                this.setState({ stripdashboard: false })

            }
        }
    }


    
aborid(laborid) {
       
        const dynamicstyles = new DynamicStyles();
        const mylabor = dynamicstyles.findactuallaborbyid.call(this,laborid)
        const amount = () => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);
            let ratio = dynamicstyles.getemployeeaccountratio.call(this,mylabor.providerid,this.props.match.params.accountid)
            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100))*ratio;
            return labor;

        }
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid);
        let employee = dynamicstyles.getemployeebyproviderid.call(this,mylabor.providerid)
        let hourlyrate = dynamicstyles.gethourlyrate.call(this, employee.providerid)
        let ratio = dynamicstyles.getemployeeaccountratio.call(this,mylabor.providerid,this.props.match.params.accountid)
     

    if(mylabor) {
        return (
            <div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
        
                    {employee.firstname} {employee.lastname}: {mylabor.description} CSI:{csi.csi}-{csi.title}<br />
                    From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                    ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs x {ratio} = ${Number(amount().toFixed(2))}
                    
            </div>)
}
    }
    showmaterialid(materialid) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const mymaterial = dynamicstyles.findactualmaterialbyid.call(this,materialid)
        const csi = dynamicstyles.getcsibyid.call(this,mymaterial.csiid);
        const milestone = dynamicstyles.getmilestonebyid.call(this,mymaterial.milestoneid)
        const material = dynamicstyles.getmymaterialfromid.call(this,mymaterial.mymaterialid)
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont}} key={mymaterial.materialid}>
                {formatDateStringDisplay(mymaterial.timein)} <br />
                {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
                {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit/100))).toFixed(2)} 

        </div>)

    }
    showequipmentid(equipmentid) {

        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const equipment = dynamicstyles.findactualequipmentbyid.call(this,equipmentid)
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipment.myequipmentid);
        const milestone = dynamicstyles.getmilestonebyid.call(this, equipment.milestoneid)
        const csi = dynamicstyles.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate) * (1 + (equipment.profit/100)))
        return (
        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
           
           {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
            CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} <br />
            Total Hours: {totalhours} x  {equipmentrate}  x {1+(equipment.profit/100)} = ${amount.toFixed(2)}
        </div>
        )

    }
    showcharges() {
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const charges = dynamicstyles.showchargesbyaccountid.call(this,this.props.match.params.accountid)
       let amount = 0;
        const calculatelabor = (mylabor) => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);
            let ratio = dynamicstyles.getemployeeaccountratio.call(this,mylabor.providerid,this.props.match.params.accountid)
            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100))*ratio;
            return labor;

        }
        const calculatematerialamount = (mymaterial) => {
            let materialamount = mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit / 100))
            return materialamount;
        }
        const calculateequipmentamount = (myequipment) => {
            let hours = calculatetotalhours(myequipment.timeout, myequipment.timein)
            let equipment = hours * myequipment.equipmentrate * (1 + (myequipment.profit / 100))
            return equipment;
        }

    
        let mycharges = [];
        if(charges.hasOwnProperty("project")) {
            if(charges.project.hasOwnProperty("myproject")) {
                // eslint-disable-next-line
                charges.project.myproject.map(myproject=> {
                    const project = dynamicstyles.getprojectbyid.call(this,myproject.projectid)
                    mycharges.push(<div style={{...headerFont}}>project: /{project.title}</div>)
                    if(myproject.hasOwnProperty("charges")) {
                        if(myproject.charges.hasOwnProperty("charge")) {
                            // eslint-disable-next-line
                            myproject.charges.charge.map(charge=> {
                                if(charge.hasOwnProperty("laborid")) {
                                    let mylabor = dynamicstyles.findactuallaborbyid.call(this,charge.laborid)
                                    amount +=calculatelabor(mylabor)
                                    mycharges.push(this.showlaborid(charge.laborid))
                                } else if (charge.hasOwnProperty("materialid")) {
                                   let mymaterial = dynamicstyles.findactualmaterialbyid.call(this,charge.materialid)
                                    amount +=calculatematerialamount(mymaterial)
                                    mycharges.push(this.showmaterialid(charge.materialid))
                                } else if (charge.hasOwnProperty("equipmentid")) {
                                    let equipment = dynamicstyles.findactualequipmentbyid.call(this,charge.equipmentid)
                                    amount +=calculateequipmentamount(equipment)
                                    mycharges.push(this.showequipmentid(charge.equipmentid))
                                }
                            })
                        }
                    }
                
                
                })
                
            }
        }
        if(!this.state.setamount && amount >0) {
            this.setState({amount,setamount:true})
        }
        return mycharges;
    }
    showtransfer(transfer) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const created = inputUTCStringForLaborID(transfer.created);
        const invoiceid = dynamicstyles.getinvoiceidfromtransferid.call(this,transfer.transferid)
        return(<div style={{...regularFont,...styles.generalFont}}>
            Transfer Created {created} for the Amount ${transfer.amount} reference Invoice ID {invoiceid}
        </div>)
    }

    showpayments() {
        const dynamicstyles = new DynamicStyles();
        const transfers = dynamicstyles.gettransfersbyaccountid.call(this,this.props.match.params.accountid)
        let showtransfers = [];
        let transferamount = 0;
        if(transfers.length > 0) {
            // eslint-disable-next-line
            transfers.map(transfer=> {
                transferamount +=Number(transfer.amount);
                showtransfers.push(this.showtransfer(transfer))
            })
        }
        if(!this.state.settransferamount && transferamount > 0) {
            this.setState({settransferamount:true,transferamount})
        }
        return showtransfers;
    } 

render() {
    const styles = MyStylesheet();
    const dynamicstyles = new DynamicStyles();
    const account = dynamicstyles.getaccountbyid.call(this, this.props.match.params.accountid);
    const headerFont = dynamicstyles.gettitlefont.call(this);
    const regularFont = dynamicstyles.getRegularFont.call(this);
    const myuser = dynamicstyles.getuser.call(this);
    const company = () => {
        if(myuser.hasOwnProperty("company")) {
            return myuser.company.url;
        }
    }
    this.getstripedashboard();
    let accountbalance = Number(this.state.amount) - Number(this.state.transferamount)
    accountbalance = Number(accountbalance).toFixed(2)
    const stripe = () => {

        if (account.stripedashboard) {

            return (<a href={account.stripedashboard} style={{ ...styles.generalLink, ...regularFont,...styles.blueLink}}><u>Account Connected View Account Dashboard </u> </a>)

        } else {
            return (<a href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_SERVER_API}/construction/stripe/accounts&client_id=${process.env.REACT_APP_STRIPE_CONNECT}&state=${this.props.match.params.accountid}&scope=read_write`} style={{ ...styles.generalLink, ...regularFont }}>Not Connected, Click Link to Connect Account</a>)
        }


    }
    if(myuser) {

    return (

        <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...headerFont, ...styles.alignCenter, ...styles.boldFont, ...styles.bottomMargin15 }}>
                            {`/${company()}`} <br/>
                            /accounts
                        </div>
                        <div style={{ ...styles.generalContainer, ...headerFont, ...styles.alignCenter, ...styles.boldFont, ...styles.bottomMargin15 }}>
                            Account Name: {`${account.accountname}`}
                        </div>

                    </div>
                </div>



                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...regularFont }}>
                        {stripe()}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...headerFont, ...styles.generalFont }}>Summary of Charges</div>
                        {this.showcharges()}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...headerFont, ...styles.generalFont }}>Summary of Payments</div>
                        {this.showpayments()}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...headerFont, ...styles.generalFont }}>Balance</div>
                        <div style={{...styles.generalFont,...regularFont}}>Sum of Charges = ${Number(this.state.amount).toFixed(2)}</div>
                        <div style={{...styles.generalFont,...regularFont}}>Sum of Transfers = ${Number(this.state.transferamount).toFixed(2)}</div>
                        <div style={{...styles.generalFont,...regularFont}}>Account Balanace = ${accountbalance}</div>
                    </div>
                </div>

            </div>
        </div>
    )

    } else {
        return(<div style={{...styles.generalContainer}}>
            <span style={{...regularFont,...styles.generalFont}}>Please login to view accounts </span>
        </div>)
    }
}



}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers:state.allusers
    }
}

export default connect(mapStateToProps, actions)(ViewAccount);