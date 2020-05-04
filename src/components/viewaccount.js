import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { StripeConnect, ClientLoginNode, LogoutUserNode } from './actions/api'
import { GoogleSignIcon, AppleSignIcon } from './svg';
import firebase from 'firebase/app';
import 'firebase/auth';
class ViewAccount extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, nodesignin: false, stripedashboard:true }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    


    }

    async checkpayments() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
    
        if (myuser.payments) {
            this.getstripedashboard();
        }


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    async getstripedashboard() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
  
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
                this.setState({ stripdashboard:false })

            }
        } else {
            this.setState({ render: 'render' })
        }
    }


    async appleSignIn() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;
            if (emailaddress && clientid && client) {
                try {

                    let values = { client, clientid, emailaddress }
                    console.log(values)
                    const response = await ClientLoginNode(values);
                    if (response.hasOwnProperty("myuser")) {
                        myuser.payments = true;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                        this.getstripedashboard();
                    }
                } catch (err) {
                    alert(err)
                }

            }

        } catch (err) {
            alert(err)
        }

    }

    async googleSignIn() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)

        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;

            if (emailaddress && clientid && client) {
                try {


                    let values = { client, clientid, emailaddress }
                    const response = await ClientLoginNode(values);
                    if (response.hasOwnProperty("myuser")) {
                        myuser.payments = true;
                        this.props.reduxUser(myuser);
                        this.getstripedashboard();
                        this.setState({ render: 'render' })
                    }

                } catch (err) {
                    alert(err)
                }

            }

        } catch (error) {
            alert(error)
        }


    }
    async logoutusernode() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            try {
                let response = await LogoutUserNode();
                if (response.hasOwnProperty("response")) {
                    myuser.payments = false;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }


            } catch (err) {
                alert(err)
            }
        }
    }

    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const account = dynamicstyles.getaccountbyid.call(this, this.props.match.params.accountid);

        const myuser = dynamicstyles.getuser.call(this);
        const headerFont = dynamicstyles.gettitlefont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const loginButton = dynamicstyles.getLoginButton.call(this);
        this.checkpayments();
        const showlogin = () => {
            if (!myuser.payments) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.flex1, ...regularFont }}>
                            Login to {process.env.REACT_APP_SERVER_API} to Before Connecting Account`
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { this.googleSignIn.call(this) }}>
                                {GoogleSignIcon()}
                            </button>
                        </div>

                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { this.appleSignIn.call(this) }}>
                                {AppleSignIcon()}
                            </button>
                        </div>
                    </div>

                )

            } else {
                return (<div className='createlink' style={{ ...styles.generalContainer, ...regularFont, ...styles.bottomMargin15 }}>You are logged into Payments and ready to connect accounts</div>)
            }
        }

        const stripe = () => {
            if (myuser.payments) {

                if (account.stripedashboard) {

                    return (<a href={account.stripedashboard} style={{ ...styles.generalLink, ...regularFont }}>Account Connected View Account Dashboard </a>)

                } else {
                    return (<a href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&redirect_uri=${process.env.REACT_APP_SERVER_API}/construction/stripe/accounts&client_id=${process.env.REACT_APP_STRIPE_CONNECT}&state=${this.props.match.params.accountid}&scope=read_write`} style={{ ...styles.generalLink, ...regularFont }}>Not Connected, Click Link to Connect Account</a>)
                }

            }

        }
        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <div style={{ ...styles.generalContainer, ...headerFont, ...styles.alignCenter, ...styles.fontBold, ...styles.bottomMargin15 }}>
                                {`/${this.props.match.params.providerid}/company/${this.props.match.params.companyid}/accounts/${this.props.match.params.accountid}`}
                            </div>
                            <div style={{ ...styles.generalContainer, ...headerFont, ...styles.alignCenter, ...styles.fontBold, ...styles.bottomMargin15 }}>
                                Account Name: {`${account.accountname}`}
                            </div>

                        </div>
                    </div>

                    {showlogin()}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...regularFont }}>
                            {stripe()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                        </div>
                    </div>

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

export default connect(mapStateToProps, actions)(ViewAccount);