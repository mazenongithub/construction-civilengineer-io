import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { folderIcon, scrollImageDown } from './svg';
import DynamicStyles from './dynamicstyles';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        }
        return (styles.font30)
    }

    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        }
        return (styles.font24)
    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }
    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '285px',
                    height: '249px'
                })

        } else {
            return (
                {
                    width: '167px',
                    height: '145px'
                })
        }
    }
    getFolderSize() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '142px',
                    height: '88px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '93px',
                    height: '76px'
                })

        } else {
            return (
                {
                    width: '88px',
                    height: '61px'
                })
        }

    }
    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55px',
                    height: '48px'
                })

        } else {
            return (
                {
                    width: '45px',
                    height: '34px'
                })
        }

    }
    getprofileurl() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        return myuser.profileurl;


    }
    showprofileurl() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}

                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}
                    />
                </div>

            </div>)

        }
    }
    getclientmessage() {
        let user = this.getuser();
        if (user) {
            return `Your Profile is connected with ${user.client}`
        } else {
            return;
        }
    }
    getfirstname() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.firstname;
    }
    handlefirstname(firstname) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.emailaddress;
    }
    handleemailaddress(emailaddress) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.emailaddress = emailaddress;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.lastname;
    }
    handlelastname(lastname) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getaddress() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.address;
    }
    handleaddress(address) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.address = address;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getcity() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.city;
    }
    handlecity(city) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.city = city;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getcontactstate() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.contactstate;
    }
    handlecontactstate(contactstate) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.contactstate = contactstate;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getzipcode() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.zipcode;
    }
    handlezipcode(zipcode) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.zipcode = zipcode;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getphonenumber() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    showlogininfo() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        {this.getclientmessage()}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Email <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getemailaddress()}
                            onChange={event => { this.handleemailaddress(event.target.value) }}
                        />
                    </div>
                </div>

            </div>
        </div>)

    }
    showadditional() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getfirstname()}
                            onChange={event => { this.handlefirstname(event.target.value) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getlastname()}
                            onChange={event => { this.handlelastname(event.target.value) }}
                        />
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }}
                            value={this.getphonenumber()}
                            onChange={event => { this.handlephonenumber(event.target.value) }}
                        />
                    </div>
                </div>

            </div>
        </div>)
    }
    getstripebutton() {
        if (this.state.width > 1200) {
            return ({
                width: '427px',
                height: '82px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '265px',
                height: '64px'
            })

        } else {
            return ({
                width: '196px',
                height: '49px'
            })
        }
    }
    render() {
        const styles = MyStylesheet();
        const headerFont = this.getHeaderFont();
        const regularFontHeight = this.getRegularFont();
        let myuser = this.getuser();
        const profileDimensions = this.getprofiledimensions();
        const folderSize = this.getFolderSize();
        const arrowHeight = this.getArrowHeight();

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...headerFont, ...styles.fontBold, ...styles.alignCenter }}>
                        /{myuser.providerid}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex2 }}>
                        <div style={{ ...styles.generalContainer, ...profileDimensions, ...styles.showBorder, ...styles.margin10, ...styles.alignRight }}>
                            &nbsp;
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                        <button style={{ ...styles.generalButton, ...folderSize }}>
                            {folderIcon()}
                        </button>
                    </div>
                </div>

                {this.showprofileurl()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        Login Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showlogininfo()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showadditional()}


            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Profile);