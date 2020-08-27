import React, { Component } from 'react'
import { MyStylesheet } from './styles';
import { folderIcon, scrollImageDown, goCheckIcon } from './svg';
import DynamicStyles from './dynamicstyles';
import { UploadProfileImage, CheckProviderID, CheckEmailAddress } from './actions/api';
import { returnCompanyList, inputUTCStringForLaborID, validateProviderID, validateEmail } from './functions';
import * as actions from './actions';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0
        }
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
            let errmsg = "";
            errmsg = validateProviderID(profileurl);

            if (errmsg) {

                myuser.invalid = errmsg;
            } else {
                if (myuser.hasOwnProperty("invalid")) {
                    delete myuser.invalid;
                }

            }

            myuser.profileurl = profileurl;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })


        }
    }

    async checkprofile(profile) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            let validate = validateProviderID(profile)
            if (profile && !validate) {
                try {
                    let response = await CheckProviderID(profile);
                    console.log(response)
                    if (response.hasOwnProperty("invalid")) {
                        myuser.invalid = response.invalid;
                        this.props.reduxUser(myuser);
                        this.setState({ message: response.invalid })
                    } else if (response.hasOwnProperty("valid")) {

                        if (myuser.hasOwnProperty("invalid")) {
                            delete myuser.invalid;
                            this.setState({ message: '' })
                        }
                    }
                } catch (err) {
                    alert(err)
                }
            }

        }
    }
    showprofileurl() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);

        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFont, ...styles.generalField }}
                        value={this.getprofileurl()}
                        onChange={event => { this.handleprofileurl(event.target.value) }}
                        onBlur={event => { this.checkprofile.call(event.target.value) }}

                    />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFont, ...styles.generalField }}
                        value={this.getprofileurl(this)}
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

            let errmsg = "";
            errmsg = validateEmail(emailaddress)

            if (errmsg) {
                myuser.invalidemail = errmsg;
            } else {

                if (myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail
                }

            }
            myuser.emailaddress = emailaddress;
            console.log(myuser)
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

    async checkemailaddress() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);

        if (!errmsg) {
            const response = await CheckEmailAddress(myuser.emailaddress)
            if (response.hasOwnProperty("invalid")) {
                myuser.invalidemail = `${response.message} ${response.invalid}`
                this.props.reduxUser(myuser)
                this.setState({ message: response.message })
            } else {
                delete myuser.invalidemail;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    showlogininfo() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this)
        const myuser = dynamicstyles.getuser.call(this)

        const showemailicon = () => {
            if (myuser) {
                if (!myuser.hasOwnProperty("invalidemail")) {
                    return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
                } else {
                    return;
                }
            }
        }

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex5, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        Email <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={this.getemailaddress.call(this)}
                            onChange={event => { this.handleemailaddress(event.target.value) }}
                            onBlur={() => { this.checkemailaddress.call(this) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {showemailicon()}
                    </div>
                </div>

            </div>
        </div>)

    }
    showadditional() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={this.getfirstname.call(this)}
                            onChange={event => { this.handlefirstname(event.target.value) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={this.getlastname.call(this)}
                            onChange={event => { this.handlelastname(event.target.value) }}
                        />
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={this.getphonenumber.call(this)}
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
                let response = await UploadProfileImage(params.myuser.providerid, formData);
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
    handleprofile(profile) {
        const dynamicstyles = new DynamicStyles();
        let errmsg = "";
        errmsg = validateProviderID(profile);
        let myuser = dynamicstyles.getuser.call(this);
        if (errmsg) {
            myuser.invalid = errmsg;

        } else {
            if (myuser.hasOwnProperty("invalid")) {
                delete myuser.invalid;
            }
        }

        myuser.profile = profile;
        this.props.reduxUser(myuser);
        this.setState({ message: errmsg })

    }



    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        let myuser = dynamicstyles.getuser.call(this)
        const profileDimensions = dynamicstyles.getprofiledimensions.call(this);
        const folderSize = dynamicstyles.getFolderSize.call(this);
        const arrowHeight = dynamicstyles.getArrowHeight.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this);

        const showButton = () => {

            if (!myuser.hasOwnProperty("invalid")) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return;
            }
        }

        if (myuser) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex5, ...regularFont, ...headerFont, ...styles.fontBold, ...styles.alignCenter }}>
                            /<input type="text" value={myuser.profile}
                                onChange={event => { this.handleprofile(event.target.value) }}
                                style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                                onBlur={event => { this.checkprofile(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {showButton()}
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
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                            Login Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {this.showlogininfo()}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                            Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {this.showadditional()}



                    {dynamicstyles.showsaveprofile.call(this)}


                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Profile </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Profile);