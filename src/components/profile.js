import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { folderIcon, scrollImageDown } from './svg';
import DynamicStyles from './dynamicstyles';
import { UploadProfileImage } from './actions/api';
import { returnCompanyList, inputUTCStringForLaborID } from './functions';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '' }
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




    getprofileurl() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        return myuser.profileurl;


    }
    handleprofileurl(profileurl) {

        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            myuser.profileurl = profileurl;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }
    }
    showprofileurl() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFontHeight = dynamicstyles.getRegularFont.call(this);
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}
                        onChange={event => { this.handleprofileurl(event.target.value) }}

                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }}
                        value={this.getprofileurl()}
                        onChange={event => { this.handleprofileurl(event.target.value) }}
                    />
                </div>

            </div>)

        }
    }
    getclientmessage() {
        const dynamicstyles = new DynamicStyles();

        let user = dynamicstyles.getuser.call(this);
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
        const dynamicstyles = new DynamicStyles();
        const regularFontHeight = dynamicstyles.getRegularFont.call(this);
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
        const dynamicstyles = new DynamicStyles();
        const regularFontHeight = dynamicstyles.getRegularFont.call(this);
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
    showprofileimage() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const profileImage = dynamicstyles.getprofiledimensions.call(this)
        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profileImage }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
        } else {
            return;
        }

    }
    async uploadprofileimage() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            let formData = new FormData();
            let params = dynamicstyles.getCompanyParams.call(this)
            let myfile = document.getElementById("profile-image");
            console.log(params.myuser)
            formData.append("profilephoto", myfile.files[0]);
            formData.append("myuser", JSON.stringify(params.myuser))
            try {
                let response = await UploadProfileImage(formData);
                console.log(response)
                if (response.hasOwnProperty("allusers")) {
                    let companys = returnCompanyList(response.allusers);
                    this.props.reduxAllCompanys(companys)
                    this.props.reduxAllUsers(response.allusers);

                }
                if (response.hasOwnProperty("myuser")) {

                    this.props.reduxUser(response.myuser)
                }

                let message = "";
                if (response.hasOwnProperty("message")) {
                    let lastupdated = inputUTCStringForLaborID(response.lastupdated)
                    message = `${response.message} Last updated ${lastupdated}`

                }
                this.setState({ message })
            } catch (err) {
                alert(err)
            }
        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFontHeight = dynamicstyles.getRegularFont.call(this)
        let myuser = dynamicstyles.getuser.call(this)
        const profileDimensions = dynamicstyles.getprofiledimensions.call(this);
        const folderSize = dynamicstyles.getFolderSize.call(this);
        const arrowHeight = dynamicstyles.getArrowHeight.call(this);

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
                            {this.showprofileimage()}
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                        <input type="file" id="profile-image" />
                        <button style={{ ...styles.generalButton, ...folderSize }} onClick={() => { this.uploadprofileimage() }}>
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

                {dynamicstyles.showsaveprofile.call(this)}


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