import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon, goCheckIcon, signUpNowIcon } from './svg';
import { RegisterUser, CheckProviderID } from './actions/api'
import firebase from 'firebase/app';
import { returnCompanyList, validatePhoneNumber, validateEmail, validateProviderID } from './functions';
import Profile from './profile';
import 'firebase/auth';
import DynamicStyles from './dynamicstyles';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, providerid: '', client: '', clientid: '', firstname: '', lastname: '', emailaddress: '', profileurl: '', phonenumber: '', provideridcheck: true, message: '' }
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
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        }
        return (styles.font24)
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        }
        return (styles.font30)
    }
    getloginbuttonheight() {
        if (this.state.width > 1200) {
            return ({
                width: '279px',
                height: '63px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '181px',
                height: '48px'
            })
        } else {
            return ({
                width: '148px',
                height: '40px'
            })
        }

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
                                    onChange={event => { this.setState({ providerid: event.target.value }) }}
                                    onBlur={event => { this.verifyProviderID(event.target.value) }}
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
                                    onChange={event => { this.setState({ providerid: event.target.value }) }}
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
        let regularFont = this.getRegularFont();
        const loginButtonHeight = this.getloginbuttonheight();
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
        let providerid = this.state.providerid;
        let validateproviderid = validateProviderID(providerid);
        if (!validateproviderid) {
            if (this.state.provideridcheck) {
                return (<div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Your Profile will be hosted at {process.env.REACT_APP_CLIENT_API}/{this.state.providerid}
                    </div>
                </div>)
            } else {
                return (<div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {this.state.providerid} is taken, please choose another ID
                </div>
                </div>)
            }

        } else if (this.state.providerid) {
            return (<div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Invalid Provider ID {this.state.providerid}
                </div>
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
        if (this.state.providerid) {
            return (true)
        } else {
            return (false)
        }

    }

    validatenewuser() {
        let validate = {};
        validate.validate = true;
        validate.message = "";
        if (!this.state.client || !this.state.clientid) {
            validate.validate = false;
            validate.message += `Please Add your Client Either Apple or Google `
        }
        if (!this.state.provideridcheck) {
            validate.validate = false;
            validate.message += `Provider ID ${this.state.providerid} is taken `
        } else {
            let validateprovider = validateProviderID(this.state.providerid);
            if (validateprovider) {
                validate.validate = false;
                validate.message += `Invalid Provider ID ${validateprovider} `
            }
        }

        if (!this.state.emailaddress) {
            validate.validate = false;
            validate.message += `Please Add Email Address `
        } else {
            let emailvalidation = validateEmail(this.state.emailaddress);
            if (emailvalidation) {
                validate.validate = false;
                validate.message += `Invalid Email Address ${emailvalidation} `
            }
        }

        if (!this.state.phonenumber) {
            validate.validate = false;
            validate.message += `Please Add Phone Number `
        } else {
            let phonevalidation = validatePhoneNumber(this.state.phonenumber);

            if (phonevalidation) {
                validate.validate = false;
                validate.message += `Invalid Phone Number ${this.state.emailaddress} `
            }

        }

        if (!this.state.firstname) {
            validate.validate = false;
            validate.message += `Please Add Your First Name `
        }
        if (!this.state.lastname) {
            validate.validate = false;
            validate.message += `Please Add Your Last Name `
        }

        return validate;
    }


    async verifyProviderID() {
        let providerid = this.state.providerid;

        let errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ provideridcheck: false })
        }
        else {
            let response = await CheckProviderID(providerid)
            console.log(response)
            if (response.hasOwnProperty("valid")) {
                this.setState({ provideridcheck: true });
            }
            else {
                this.setState({ provideridcheck: false });
            }

        }


    }

    async registernewuser() {
        const validateuser = this.validatenewuser();
        console.log(validateuser)
        if (validateuser.validate) {
            const values = { providerid: this.state.providerid, client: this.state.client, clientid: this.state.clientid, firstname: this.state.firstname, lastname: this.state.lastname, emailaddress: this.state.emailaddress, profileurl: this.state.profileurl, phonenumber: this.state.phonenumber }
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
                onClick={() => { this.registernewuser() }}>{signUpNowIcon()}</button>)
        } else {
            return;
        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);

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
                        {this.handlemessage()}

                        <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Verify Your Info {this.handlesignupnow()}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Email Address <br />
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.emailaddress}
                                    onChange={event => { this.setState({ emailaddress: event.target.value }) }}
                                />
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                First Name <br />
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.firstname}
                                    onChange={event => { this.setState({ firstname: event.target.value }) }}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Last Name <br />
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.lastname}
                                    onChange={event => { this.setState({ lastname: event.target.value }) }}
                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Phone Number <br />
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.state.phonenumber}
                                    onChange={event => { this.setState({ phonenumber: event.target.value }) }}
                                />
                            </div>

                        </div>



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