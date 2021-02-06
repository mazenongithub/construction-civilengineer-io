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
        this.state = { render: '', width: 0, height: 0}
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

    async loadstripeconnect(myuser,stripe) {
        const dynamicstyles = new DynamicStyles();
        
        try {

            let response = await StripeConnect(stripe)
            console.log(response)
            let i = dynamicstyles.getaccountkeybyid.call(this, this.props.match.params.accountid)
            if (response.url) {
                myuser.company.office.accounts.account[i].stripedashboard = response.url;
                this.props.reduxUser(myuser)
                this.setState({render:'render'})

            }


        } catch(err) {
            alert(err)
        }
             

    }

    default() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        return(<div style={{...styles.generalContainer}}>
            <span style={{...styles.generalFont, ...regularFont}}>
                Please Login to View Account
            </span>
        </div>)
    }

    
render() {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this)
    const headerFont = dynamicstyles.getHeaderFont.call(this)
    const regularFont = dynamicstyles.getRegularFont.call(this)
    const styles = MyStylesheet();
    if(myuser) {
        if(myuser.hasOwnProperty("company")) {
            console.log("company")
            if(myuser.company.office.hasOwnProperty("accounts")) {
               
                const accountid = this.props.match.params.accountid;
                const account  = dynamicstyles.getaccountbyid.call(this,accountid)
                if(account.stripe && !account.stripedashboard) {
                    this.loadstripeconnect(myuser,account.stripe)

                }
                if(account) {

                    const stripeconnect = (account) => {
                        if(account.stripedashboard) {
                        return(<div style={{...styles.generalContainer}}>

                            <a style={{...styles.generalFont,...regularFont,...styles.generalLink,...styles.blueLink}}
                              href={account.stripedashboard}>{account.stripedashboard}</a>
                          
                        </div>)
                        } else {
                            return(<a style={{...styles.generalFont,...regularFont,...styles.generalLink,...styles.blueLink}}
                            href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_SERVER_API}/construction/stripe/accounts&client_id=${process.env.REACT_APP_STRIPE_CONNECT}&state=${this.props.match.params.accountid}&scope=read_write`}>Connect Your Account to Stripe To Get Started and Accept Payments</a>)
                        }
                    }
                  
                    return(
                        
                        <div style={{...styles.generalContainer}}>

                          <div style={{...styles.generalContainer,...styles.alignCenter}}>
                            <span style={{...styles.generalFont,...headerFont,...styles.boldFont}}>
                                /{this.props.match.params.accountid}
                            </span>
                            </div>

                            {stripeconnect(account)}



                    </div>)

                } else {
                    return(this.default())
                }
            } else {
                return(this.default())
            }
        } else {
            return(this.default())
        }
    } else {
        return(this.default())
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