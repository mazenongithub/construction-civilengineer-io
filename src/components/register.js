import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon, goCheckIcon, RegisterNowIcon } from './svg';
import { RegisterUser } from './actions/api'
import firebase from 'firebase/app';
import { returnCompanyList, validateEmail, validateProviderID, validatePassword } from './functions';
import Profile from './profile';
import 'firebase/auth';
import DynamicStyles from './dynamicstyles';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, providerid: '', client: '', clientid: '', firstname: '', lastname: '', emailaddress: '', profileurl: '', phonenumber: '', provideridcheck: true, message: '', emailcheck: true, passwordcheck: false, pass: '' }
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

    handlegoicon() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const goCheckHeight = dynamicstyles.getgocheckheight.call(this);
        if (this.state.provideridcheck && this.state.providerid) {
            return (<button style={{ ...styles.generalButton, ...goCheckHeight }}>{goCheckIcon()}</button>)
        } else {
            return;
        }
    }
    handleproviderid(providerid) {
        this.setState({ providerid })
        const errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ provideridcheck: false, message: errmsg })
        } else {
            this.setState({ provideridcheck: true, message: "" })
        }
    }
    showproviderid() {
        const dynamicstyles = new DynamicStyles();
        let regularFont = dynamicstyles.getRegularFont.call(this);
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                Create A Provider ID
                            </div>
                            <div style={{ ...styles.flex3 }}>
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.providerid}
                                    onChange={event => { this.handleproviderid(event.target.value) }}
                                    onBlur={event => { dynamicstyles.verifyProviderID.call(this, event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {this.handlegoicon()}
                            </div>
                        </div>


                    </div>
                </div>

            )

        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                Create A Provider ID
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex3 }}>
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.providerid}
                                    onChange={event => { this.handleproviderid(event.target.value) }}
                                    onBlur={event => { dynamicstyles.verifyProviderID.call(this, event.target.value) }}
                                />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {this.handlegoicon()}
                            </div>
                        </div>

                    </div>
                </div>
            )

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
            console.log(user.providerData[0])
            let client = 'apple';
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
            this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })




        } catch (error) {

            alert(error.message);

        }


    }
    async googleSignIn() {


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            console.log(user.providerData[0]);
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
            this.setState({ client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber })



        } catch (error) {
            alert(error)
        }


    }
    showloginbuttons() {
        const dynamicstyles = new DynamicStyles()
        let regularFont = dynamicstyles.getRegularFont.call(this)
        const loginButtonHeight = dynamicstyles.getloginbuttonheight.call(this);
        const styles = MyStylesheet();

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Secure Your Sign In
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                        onClick={() => { this.googleSignIn() }}>{GoogleSignIcon()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                        onClick={() => { this.appleSignIn() }}>{AppleSignIcon()}</button>
                </div>
            </div>)

        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>

                                Secure Your Sign In
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                                    onClick={() => { this.googleSignIn() }}
                                >{GoogleSignIcon()}</button>

                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }}
                                    onClick={() => { this.appleSignIn() }}> {AppleSignIcon()} </button>

                            </div>
                        </div>



                    </div>
                </div>
            )

        }
    }
    handlemessage() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        if (this.state.message) {
            return (<div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {this.state.message}
                </div>
            </div>)
        }
    }
    handleprofilemessage() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);

        if (this.state.provideridcheck) {
            return (<div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Your Profile will be hosted at {process.env.REACT_APP_CLIENT_API}/{this.state.providerid}
                </div>
            </div>)
        } else {
            return;
        }


    }

    showregisternow() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const registerIcon = dynamicstyles.getRegisterIcon.call(this);
        const validate = this.validateprovider();


        if (!validate) {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { this.registernewuser() }}>{RegisterNowIcon()}</button>
            </div>)
        } else {
            return;
        }
    }
    handleshowloginbuttons() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);

        if (this.state.client) {
            return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                Your SignIn is Secure with {this.state.client}
            </div>)

        } else {
            return (this.showloginbuttons())
        }
    }


    validateprovider() {

        let errmsg = false;

        if (!this.state.emailcheck) {
            errmsg += validateEmail(this.state.emailaddress)
            errmsg += this.state.message;
        }

        if (!this.state.provideridcheck) {
            errmsg += validateProviderID(this.state.providerid);
            errmsg += this.state.message;
        }

        if (!this.state.client || !this.state.clientid) {
            errmsg += `Missing Client ID`
        }

        if (!this.state.passwordcheck) {
            errmsg += validatePassword(this.state.pass);
        }

        return errmsg;
    }



    async registernewuser() {
        const validateuser = this.validateprovider();
        if (!validateuser) {
            const values = { providerid: this.state.providerid, client: this.state.client, clientid: this.state.clientid, firstname: this.state.firstname, lastname: this.state.lastname, emailaddress: this.state.emailaddress, profileurl: this.state.profileurl, phonenumber: this.state.phonenumber, pass: this.state.pass }
            let response = await RegisterUser(values);
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

        } else {
            this.setState({ message: validateuser.message })
        }

    }
    handlesignupnow() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const signupnow = dynamicstyles.getsignupnow.call(this)
        let validateprovider = this.validateprovider();
        if (validateprovider) {
            return (<button style={{ ...styles.generalButton, ...signupnow, ...styles.addLeftMargin15 }}
                onClick={() => { this.registernewuser() }}>{RegisterNowIcon()}</button>)
        } else {
            return;
        }
    }
    handlepassword(pass) {
        this.setState({ pass })
        let errmsg = validatePassword(pass);

        if (!errmsg) {
            this.setState({ passwordcheck: true, message: '' })
        } else {
            this.setState({ passwordcheck: false, message: errmsg })
        }
    }

    handleemailaddress(emailaddress) {

        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ emailcheck: false, message: errmsg })
        } else {
            this.setState({ emailcheck: true, message: "" })
        }

    }
    showpassword() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this)

        const showButton = () => {
            if (this.state.pass && this.state.passwordcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return;
            }
        }
        if (this.state.emailaddress || (this.state.clientid && this.state.client)) {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Password
                </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                            value={this.state.pass}
                            onChange={event => { this.handlepassword(event.target.value) }}

                        />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {showButton()}
                    </div>
                </div>)
            } else {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Password
                        </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2 }}>
                                <input type="Password" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.pass}
                                    onChange={event => { this.handlepassword(event.target.value) }}

                                />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {showButton()}
                            </div>
                        </div>

                    </div>
                </div>)
            }
        } else {
            return;
        }
    }
    showemailaddress() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this)

        const showButton = () => {
            if (this.state.emailaddress && this.state.emailcheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return;
            }
        }

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                    Email Address
                </div>
                <div style={{ ...styles.flex3 }}>
                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                        value={this.state.emailaddress}
                        onChange={event => { this.handleemailaddress(event.target.value) }}
                        onBlur={event => { dynamicstyles.checkemailaddress.call(this, event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1 }}>
                    {showButton()}
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Email Address
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2 }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                value={this.state.emailaddress}
                                onChange={event => { this.handleemailaddress(event.target.value) }}
                                onBlur={event => { dynamicstyles.checkemailaddress.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {showButton()}
                        </div>
                    </div>

                </div>
            </div>)
        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);

        const Register = () => {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                                Registration
                        </div>
                        </div>

                        {this.handleshowloginbuttons()}
                        {this.showproviderid()}
                        {this.handleprofilemessage()}
                        {this.showemailaddress()}
                        {this.showpassword()}
                        {this.handlemessage()}
                        {this.showregisternow()}

                    </div>
                </div>
            )
        }
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            return (<Profile />)
        } else {
            return (Register())
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

export default connect(mapStateToProps, actions)(Register);