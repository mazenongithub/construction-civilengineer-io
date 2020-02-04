import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon, loginNowIcon } from './svg'
import { LoginLocal, ClientLogin, } from './actions/api'
import DynamicStyles from './dynamicstyles';
import { returnCompanyList } from './functions';
import Profile from './profile';
import firebase from 'firebase/app';
import 'firebase/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, client: '', clientid: '', firstname: '', lastname: '', profileurl: '', phonenumber: '', emailaddress: '', pass: '' }
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
    getTitleFont() {
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (styles.font72)
        } else {
            return (styles.font54)
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
    getloginbuttonheight() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '359px',
                    height: '86px'
                }
            )
        } else if (this.state.width > 800) {
            return (
                {
                    width: '287px',
                    height: '60px'
                }
            )
        } else {
            return (
                {
                    width: '165px',
                    height: '48px'
                }
            )
        }
    }
    showemailaddress() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Email Address
                </div>
                <div style={{ ...styles.flex2, ...styles.regularFont, ...regularFontHeight }}>
                    <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.state.emailaddress}
                        onChange={event => { this.setState({ emailaddress: event.target.value }) }}
                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Email Address <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.state.emailaddress}
                        onChange={event => { this.setState({ emailaddress: event.target.value }) }}
                    />
                </div>

            </div>)

        }

    }
    showpassword() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Password
                </div>
                <div style={{ ...styles.flex2, ...styles.regularFont, ...regularFontHeight }}>
                    <input type="password" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.state.pass}
                        onChange={event => { this.setState({ pass: event.target.value }) }}
                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Password <br /> <input type="password" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.state.pass}
                        onChange={event => { this.setState({ pass: event.target.value }) }}
                    />
                </div>

            </div>)

        }


    }
    getloginnow() {
        if (this.state.width > 1200) {
            return ({ width: '381px', height: '84px' })
        } else if (this.state.width > 800) {
            return ({ width: '279px', height: '72px' })
        } else {
            return ({ width: '205px', height: '60px' })
        }
    }
    async loginlocal() {
        let emailaddress = this.state.emailaddress;
        let pass = this.state.pass;
        let values = { emailaddress, pass }
        console.log(values)
        let response = await LoginLocal(values)
        console.log(response)
        if (response.hasOwnProperty("allusers")) {
            let companys = returnCompanyList(response.allusers);
            this.props.reduxAllCompanys(companys)
            this.props.reduxAllUsers(response.allusers);
            delete response.allusers;

        }
        if (response.hasOwnProperty("providerid")) {
            this.props.reduxUser(response)
        }
    }
    async googleSignIn() {


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;

            if (emailaddress && clientid && client) {
                try {
                    let pass = this.state.pass;

                    let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, pass }
                    const response = await ClientLogin(values);
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                        delete response.allusers;

                    }
                    if (response.hasOwnProperty("providerid")) {
                        this.props.reduxUser(response)
                    }
                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: response.message })
                    }
                } catch (err) {
                    alert(err)
                }

            } else {
                this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })
            }





        } catch (error) {
            alert(error)
        }




    }


    async appleSignIn() {
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            let firstname = "";
            let lastname = "";
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let phonenumber = user.providerData[0].phoneNumber
            let profileurl = user.providerData[0].photoURL;
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;

            if (emailaddress && clientid && client) {
                try {

                    let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber }
                    const response = await ClientLogin(values);
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                        delete response.allusers;

                    }
                    if (response.hasOwnProperty("providerid")) {
                        this.props.reduxUser(response)
                    }
                    if (response.hasOwnProperty("message")) {
                        this.setState({ message: response.message })
                    }
                } catch (err) {
                    alert(err)
                }

            } else {
                this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })
            }


            // ...
        } catch (err) {
            alert(err)
            // ...
        };


    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const Login = () => {
            const styles = MyStylesheet();
            const titleFont = this.getTitleFont();
            const loginButtonHeight = this.getloginbuttonheight();
            const loginnow = this.getloginnow()

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.addMarginTop, ...styles.addMarginBottom, ...styles.alignCenter, ...titleFont }}>
                                Login
                        </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }} onClick={() => { this.googleSignIn() }}>{GoogleSignIcon()}</button>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }} onClick={() => { this.appleSignIn() }}>{AppleSignIcon()}</button>
                            </div>
                        </div>
                        {this.showemailaddress()}
                        {this.showpassword()}
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <button style={{ ...styles.generalButton, ...loginnow }} onClick={() => { this.loginlocal() }}>
                                    {loginNowIcon()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }



        const HandleDisplay = () => {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                return (<Profile />)
            } else {
                return (Login())
            }
        }


        return (HandleDisplay())


    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Login);