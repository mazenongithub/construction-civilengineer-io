import React from 'react'
import { MyStylesheet } from './styles';
import { folderIcon, scrollImageDown, goCheckIcon, saveProfileIcon } from './svg';
import Construction from './construction';
import { UploadProfileImage, CheckProviderID, CheckEmailAddress } from './actions/api';
import { returnCompanyList, inputUTCStringForLaborID, validateProviderID, validateEmail } from './functions';
import Spinner from './spinner'

class Profile  {


    getprofileurl() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        return myuser.profileurl;


    }
    handleprofileurl(profileurl) {

        const construction = new Construction();
        let myuser = construction.getuser.call(this);
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
        const construction = new Construction();
        const myuser = construction.getuser.call(this);

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
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const profile = new Profile()
   
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.regularFont, ...regularFont}}>Profile URL </span>
                    <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFont, ...styles.generalField }}
                        value={profile.getprofileurl.call(this)}
                        onChange={event => { profile.handleprofileurl.call(this,event.target.value) }}
                        onBlur={event => { profile.checkprofile.call(this,event.target.value) }}

                    />

                </div>

            </div>)

    }
   
    getfirstname() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.firstname;
    }
    handlefirstname(firstname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.firstname = firstname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getemailaddress() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.emailaddress;
    }
    handleemailaddress(emailaddress) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.emailaddress = emailaddress;
            let errmsg = "";
            errmsg = validateEmail(emailaddress)

            if (errmsg) {
                myuser.invalidemail = errmsg;
                this.setState({message:errmsg})
            } else {

                if (myuser.hasOwnProperty("invalidemail")) {
                    delete myuser.invalidemail
                    this.setState({message:''})
                }

            }

            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    getlastname() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.lastname;
    }
    handlelastname(lastname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.lastname = lastname;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    getphonenumber() {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        return myuser.phonenumber;
    }
    handlephonenumber(phonenumber) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            myuser.phonenumber = phonenumber;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }

    async checkemailaddress() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const errmsg = validateEmail(myuser.emailaddress);

        if (!errmsg) {
            const response = await CheckEmailAddress(myuser.emailaddress)
            if (response.hasOwnProperty("invalid")) {
                myuser.invalidemail = `${response.invalid}`
                this.props.reduxUser(myuser)
                this.setState({ message: response.invalid })
            } else {
                delete myuser.invalidemail;
                this.props.reduxUser(myuser)
                this.setState({ message:'' })
            }




        } else {
            myuser.invalidemail = myuser.emailaddress;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }
    showlogininfo() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const goIcon = construction.getgocheckheight.call(this)
        const myuser = construction.getuser.call(this)
        const profile = new Profile()
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
                            value={profile.getemailaddress.call(this)}
                            onChange={event => { profile.handleemailaddress.call(this,event.target.value) }}
                            onBlur={() => { profile.checkemailaddress.call(this) }}
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
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const profile = new Profile()
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={profile.getfirstname.call(this)}
                            onChange={event => { profile.handlefirstname.call(this,event.target.value) }}
                        />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={profile.getlastname.call(this)}
                            onChange={event => { profile.handlelastname.call(this,event.target.value) }}
                        />
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>

                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                            value={profile.getphonenumber.call(this)}
                            onChange={event => { profile.handlephonenumber.call(this,event.target.value) }}
                        />
                    </div>
                </div>

            </div>
        </div>)
    }
   
    showprofileimage() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const profileImage = () => {
            if (this.state.width > 1200) {
                return (
                    {
                        width: '392px',
                        height: 'auto'
                    })
    
            } else if (this.state.width > 600) {
                return (
                    {
                        width: '285px',
                        height: 'auto'
                    })
    
            } else {
                return (
                    {
                        width: '167px',
                        height: 'auto'
                    })
            }
        }

        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profileImage() }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
        } else {
            return;
        }

    }

    async uploadprofileimage() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);

        if (myuser) {
            let formData = new FormData();
            let params = construction.getCompanyParams.call(this)
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
        const construction = new Construction();
        let errmsg = "";
        errmsg = validateProviderID(profile);
        let myuser = construction.getuser.call(this);
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

    showsaveprofile() {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const saveprojecticon = construction.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { construction.savemyprofile.call(this) }}>{saveProfileIcon()}</button>
                    </div>
                </div>)

        } else {
            return (<Spinner />)
        }
    }

    showProfile() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        let myuser = construction.getuser.call(this)
        const profileDimensions = () => {
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
        const folderSize = () => {
            if (this.state.width > 1200) {
                return (
                    {
                        width: '142px',
                        height: 'auto'
                    })
    
            } else if (this.state.width > 800) {
                return (
                    {
                        width: '93px',
                        height: 'auto'
                    })
    
            } else {
                return (
                    {
                        width: '88px',
                        height: 'auto'
                    })
            }
        } 
        const arrowHeight = construction.getArrowHeight.call(this);
        const goIcon = construction.getgocheckheight.call(this);
        const profile = new Profile()

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
                                onChange={event => { profile.handleprofile.call(this,event.target.value) }}
                                style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }}
                                onBlur={event => { profile.checkprofile.call(this,event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {showButton()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2 }}>
                            <div style={{ ...styles.generalContainer, ...profileDimensions(), ...styles.showBorder, ...styles.margin10, ...styles.alignRight }}>
                                {profile.showprofileimage.call(this)}
                            </div>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                            <input type="file" id="profile-image" />
                            <button style={{ ...styles.generalButton, ...folderSize() }} onClick={() => { profile.uploadprofileimage.call(this)}}>
                                {folderIcon()}
                            </button>
                        </div>
                    </div>

                    {profile.showprofileurl.call(this)}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                            Login Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {profile.showlogininfo.call(this)}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont }}>
                            Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>
                        </div>
                    </div>

                    {profile.showadditional.call(this)}



                    {profile.showsaveprofile.call(this)}


                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Profile </span>
            </div>)
        }
    }
}



export default Profile;