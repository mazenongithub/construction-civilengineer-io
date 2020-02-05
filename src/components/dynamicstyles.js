import React from 'react'
import { MyStylesheet } from './styles';
import { sorttimes } from './functions'
import firebase from 'firebase/app';
import 'firebase/auth';
import { returnCompanyList, CreateUser, FutureCostPresent, calculateTotalMonths, AmmortizeFactor, getEquipmentRentalObj, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime, validateProviderID } from './functions'
import { saveCompanyIcon, saveProjectIcon, saveProfileIcon } from './svg';
import { SaveCompany, ClientLogin, SaveProject, CheckEmailAddress, CheckProviderID, SaveProfile } from './actions/api';


class DynamicStyles {


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

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }
    getRegisterIcon() {
        if (this.state.width > 1200) {
            return ({
                width: '404px',
                height: '68px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '264px',
                height: '53px'
            })
        } else {
            return ({
                width: '162px',
                height: '42px'
            })
        }
    }
    gethidedetails() {
        if (this.state.width > 1200) {
            return ({
                width: '105px',
                height: '105px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '80px',
                height: '80px'
            })
        } else {
            return ({
                width: '50px',
                height: '50px'
            })
        }
    }
    getradiobutton() {
        if (this.state.width > 1200) {
            return ({
                width: '80px',
                height: '80px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '60px',
                height: '60px'
            })
        } else {
            return ({
                width: '40px',
                height: '40px'
            })
        }
    }
    getMaxWidth() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '900px' })
        } else if (this.state.width > 800) {
            return ({ maxWidth: '600px' })
        } else {
            return ({ maxWidth: '400px' })
        }
    }
    getSmallFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font20)
        } else {
            return (styles.font18)
        }

    }
    getmyproposals() {
        const dynamicstyles = new DynamicStyles();
        let proposals = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            proposals = myproject.proposals.myproposal;
        }
        return proposals;
    }
    getmyinvoices() {
        const dynamicstyles = new DynamicStyles();
        let invoices = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices.myinvoice;
        }
        return invoices;
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
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber }
            const response = await ClientLogin(values);
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
                delete response.allusers;

            }
            if (response.hasOwnProperty("providerid")) {
                this.props.reduxUser(response)
            }




        } catch (error) {

            alert(error.message);

        }


    }
    getCompanyParams() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        let values = {}
        let newuser = {};
        let company = {};
        if (myuser) {
            if (myuser.hasOwnProperty("providerid")) {
                newuser = CreateUser(myuser.providerid, myuser.client, myuser.clientid, myuser.firstname, myuser.lastname, myuser.emailaddress, myuser.phonenumber, myuser.profileurl)
            }
            if (myuser.hasOwnProperty("company")) {


                if (myuser.company.hasOwnProperty("projects")) {


                    company.companyid = myuser.company.companyid;
                    company.manager = myuser.company.manager;
                    company.address = myuser.company.address;
                    company.city = myuser.company.city;
                    company.contactstate = myuser.company.contactstate;
                    company.zipcode = myuser.company.zipcode;
                    company.construction = myuser.company.construction
                    company.office = myuser.company.office;
                    company.materials = myuser.company.materials;
                    company.equipment = myuser.company.equipment;
                }

            }
        }
        values = { company, myuser: newuser }
        return values;
    }
    async saveCompany() {
        const dynamicstyles = new DynamicStyles()
        let params = dynamicstyles.getCompanyParams.call(this)
        let response = await SaveCompany(params);
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
            let dateupdated = inputUTCStringForLaborID(response.lastupdated)
            this.setState({ message: `${response.message} Last Updated ${dateupdated}` })
        }
    }
    async savemyprofile() {
        let dynamicstyles = new DynamicStyles();
        let values = dynamicstyles.getCompanyParams.call(this);
        let myproject = dynamicstyles.getproject.call(this);
        values.project = myproject;
        let response = await SaveProfile(values)
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

        let message = "";
        if (response.hasOwnProperty("message")) {
            let lastupdated = inputUTCStringForLaborID(response.lastupdated)
            message = `${response.message} Last updated ${lastupdated}`

        }
        this.setState({ message })

    }
    async savemyproject() {
        let dynamicstyles = new DynamicStyles();
        let values = dynamicstyles.getCompanyParams.call(this);
        let myproject = dynamicstyles.getproject.call(this);
        values.project = myproject;
        let response = await SaveProject(values)
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
    showsaveprofile() {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const saveprojecticon = dynamicstyles.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        return (
            <div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    {this.state.message}
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { dynamicstyles.savemyprofile.call(this) }}>{saveProfileIcon()}</button>
                </div>
            </div>)
    }
    showsaveproject() {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const saveprojecticon = dynamicstyles.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        return (
            <div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    &nbsp;
            </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { dynamicstyles.savemyproject.call(this) }}>{saveProjectIcon()}</button>
                </div>
            </div>)
    }
    showsavecompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const savecompanyicon = dynamicstyles.getsavecompanyicon.call(this)
        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                {this.state.message}
            </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <button style={{ ...styles.generalButton, ...savecompanyicon }} onClick={() => { dynamicstyles.saveCompany.call(this) }}>{saveCompanyIcon()}</button>
            </div>

        </div>
        )
    }
    getsignupnow() {
        if (this.state.width > 1200) {
            return ({
                width: '335px',
                height: '65px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '216px',
                height: '51px'
            })
        } else {
            return ({
                width: '177px',
                height: '47x'
            })
        }

    }

    async verifyProviderID() {
        let providerid = this.state.providerid;
        let errmsg = validateProviderID(providerid);
        if (errmsg) {
            this.setState({ provideridcheck: false, message: errmsg })
        } else {
            this.setState({ provideridcheck: true, message: "" })
        }
        if (!errmsg) {
            try {
                let response = await CheckProviderID(providerid)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ provideridcheck: true });
                }
                else {
                    this.setState({ provideridcheck: false, message: response.message });
                }

            } catch (err) {

                alert(err)
            }

        }


    }
    getgocheckheight() {
        if (this.state.width > 1200) {
            return ({
                width: '69px',
                height: '69px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '59px',
                height: '59px'
            })
        } else {
            return ({
                width: '49px',
                height: '49px'
            })
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
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber }
            const response = await ClientLogin(values);
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
                delete response.allusers;

            }
            if (response.hasOwnProperty("providerid")) {
                this.props.reduxUser(response)
            }


        } catch (error) {
            alert(error)
        }


    }
    getAllActual() {
        const dynamicstyles = new DynamicStyles();

        let actuals = [];
        let myproject = dynamicstyles.getproject.call(this)

        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                actuals.push(mylabor)
            })
        }
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map(myequipment => {
                actuals.push(myequipment)
            })
        }
        if (myproject.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            myproject.actualmaterials.mymaterial.map(mymaterial => {
                actuals.push(mymaterial)
            })

        }

        actuals.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })


        return actuals;

    }

    getAllSchedule() {
        const user = () => {
            let myuser = false;
            if (this.props.myusermodel) {
                if (this.props.myusermodel.hasOwnProperty("providerid")) {
                    myuser = this.props.myusermodel;
                }

            }
            return myuser;
        }
        const MyProject = () => {
            let project = false;
            const myuser = user();

            if (myuser) {

                if (myuser.hasOwnProperty("company")) {
                    if (myuser.company.hasOwnProperty("projects")) {
                        const projectid = this.props.match.params.projectid;
                        // eslint-disable-next-line
                        myuser.company.projects.myproject.map(projects => {
                            if (projects.projectid === projectid) {
                                project = projects;
                            }

                        })
                    }
                }
            }
            return project;
        }
        const schedule = () => {
            let schedules = [];
            let myproject = MyProject();


            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    schedules.push(mylabor)
                })
            }
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    schedules.push(myequipment)
                })
            }
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    schedules.push(mymaterial)
                })

            }

            schedules.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })

            return schedules;

        }

        let MySchedule = schedule();

        return MySchedule

    }

    showlinedetail() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const totallabor = `$${Number(this.getlabortotal()).toFixed(2)}`
        const totalmaterials = `$${Number(this.getmaterialtotal()).toFixed(2)}`
        const totalequipment = `$${Number(this.getequipmenttotal()).toFixed(2)}`
        const totalamount = `$${Number(this.getitemtotal()).toFixed(2)}`
        const responsiveLayouts = () => {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>

                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder }}>

                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>




                            </div>
                        </div>


                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>

                            </div>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>

                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>
                            </div>


                        </div>
                    </div>
                )

            }
        }
        return responsiveLayouts();

    }
    getMaterialUnit(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let unit = "";
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    myuser.company.materials.mymaterial.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            unit = mymaterial.unit;
                        }
                    })
                }
            }
        }
        return unit;
    }
    getCheckButton() {
        if (this.state.width > 1200) {
            return ({
                width: '138px',
                height: '72px'
            })
        } else {
            return ({
                width: '84px',
                height: '44px'
            })
        }
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
    getproject() {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let projectid = this.props.match.params.projectid;
        let projects = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(myproject => {

                        if (myproject.projectid === projectid) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
    }
    getprojectkey() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        let projectid = this.props.match.params.projectid;
        let key = false;
        if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.company.projects.myproject.map((myproject, i) => {

                    if (myproject.projectid === projectid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }


    getactiveequipment() {
        const dynamicstyles = new DynamicStyles();
        let equipment = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myproject = dynamicstyles.getproject.call(this)
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {
                    if (myequipment.equipmentid === equipmentid) {
                        equipment = myequipment;
                    }
                })

            }

        }
        return equipment;
    }



    getmyemployees() {
        const dynamicstyles = new DynamicStyles()
        let myuser = dynamicstyles.getuser.call(this);
        let employees = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {
                    employees = myuser.company.office.employees.employee;
                }
            }
        }
        return employees;
    }
    getbidfield() {
        if (this.state.width > 800) {
            return ({ maxWidth: '138px' })
        } else {
            return ({ maxWidth: '90px' })
        }
    }
    getemployeebyid(providerid) {
        const dynamicstyles = new DynamicStyles()
        let myemployees = dynamicstyles.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.providerid === providerid) {
                    employees = employee;
                }
            })
        }
        return employees;
    }
    gethourlyrate(providerid) {
        const dynamicstyles = new DynamicStyles()
        let employee = dynamicstyles.getemployeebyid.call(this, providerid)
        let workinghours = Number(employee.workinghours);
        let hourlyrate = 0;
        let totalbenefits = 0;

        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                totalbenefits += Number(benefit.amount);

            })
        }

        if (workinghours && totalbenefits) {
            hourlyrate = Number(totalbenefits / workinghours)
        }
        return hourlyrate;

    }



    showbidtable() {

        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);


        if (this.state.width > 1200) {
            return (
                <table width="100%" border="1" style={{ ...regularFont, ...styles.generalFont }}>
                    <tr>
                        <td width="24%" style={{ ...styles.alignCenter }}>Line ID</td>
                        <td width="12%" style={{ ...styles.alignCenter }}>Quantity</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Unit</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Direct Cost</td>
                        <td width="13%" style={{ ...styles.alignCenter }}> Overhead and Profit %</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Bid Price</td>
                        <td width="12%" style={{ ...styles.alignCenter }}>Unit Price</td>
                    </tr>
                    {this.showbiditems()}
                </table>

            )
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showbiditems()}

                    </div>
                </div>
            )
        }
    }
    getactiveequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;


        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i;
                }
            })

        }


        return key;
    }

    getactualequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;


        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i;
                }
            })

        }


        return key;
    }
    getcompany() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
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
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({
                width: '452px',
                height: '87px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '342px',
                height: '72px'
            })
        } else {
            return ({
                width: '234px',
                height: '51px'
            })
        }

    }

    getcreateproposal() {
        if (this.state.width > 1200) {
            return ({
                width: '419px',
                height: '82px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '308px',
                height: '64px'
            })
        } else {
            return ({
                width: '197px',
                height: '57px'
            })
        }

    }
    getallusers() {
        let allusers = false;
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                if (this.props.allusers.myuser.hasOwnProperty("length")) {
                    allusers = this.props.allusers.myuser;
                }

            }
        }
        return allusers;
    }
    getemployeebyproviderid(providerid) {
        let dynamicstyles = new DynamicStyles();
        let allusers = dynamicstyles.getallusers.call(this);
        let user = false;
        if (allusers) {
            // eslint-disable-next-line
            allusers.map(myuser => {
                if (myuser.providerid === providerid) {
                    user = myuser;
                }

            })
        }
        return user;
    }
    getsearchimage() {
        if (this.state.width > 1200) {
            return ({ width: '168px', height: '152px' })
        } else {
            return ({ width: '115px', height: '97px' })
        }
    }
    async checkemailaddress(emailaddress) {
        if (emailaddress) {
            try {
                let response = await CheckEmailAddress(emailaddress);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ emailcheck: false, message: response.message })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ emailcheck: true, message: "" })
                }
            } catch (err) {
                alert(err)
            }

        }

    }

    getAddCompany() {
        if (this.state.width > 1200) {
            return ({ width: '138px', height: '85px' })
        } else if (this.state.width > 800) {
            return ({ width: '112px', height: '64px' })
        } else {
            return ({ width: '63px', height: '37px' })
        }
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
    getcsipropertybyid(csiid) {
        let csi = false;
        let dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        let property = false;
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    if (code.csiid === csiid) {
                        property = 'user'

                    }
                })
            }

            if (!csi) {
                if (company.construction.hasOwnProperty("civilengineer")) {
                    if (company.construction.civilengineer.hasOwnProperty("csicodes")) {
                        // eslint-disable-next-line
                        company.construction.civilengineer.csicodes.code.map(code => {
                            if (code.csiid === csiid) {
                                property = 'civilengineer'

                            }
                        })
                    }

                }
            }

        }
        return property;
    }
    getcsibyid(csiid) {
        let csi = false;
        let dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    if (code.csiid === csiid) {
                        csi = code;

                    }
                })
            }

            if (!csi) {
                if (company.construction.hasOwnProperty("civilengineer")) {
                    if (company.construction.civilengineer.hasOwnProperty("csicodes")) {
                        // eslint-disable-next-line
                        company.construction.civilengineer.csicodes.code.map(code => {
                            if (code.csiid === csiid) {
                                csi = code;

                            }
                        })
                    }

                }
            }

        }
        return csi;
    }
    getprofitfield() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '174px' })
        } else {
            return ({ maxWidth: '94px' })
        }
    }
    getactuallaborprofitbyid(laborid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map(mylabor => {
                    if (mylabor.laborid === laborid) {
                        profit = mylabor.profit;
                    }
                })
            }
        }
        return profit;
    }

    getactualmaterialprofitbyid(materialid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterials => {
                    if (mymaterials.materialid === materialid) {
                        profit = mymaterials.profit;
                    }
                })
            }
        }
        return profit;
    }



    getactualequipmentprofitbyid(equipmentid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map(myequipment => {

                    if (myequipment.equipmentid === equipmentid) {
                        console.log(myequipment)
                        profit = myequipment.profit;
                    }
                })
            }
        }
        console.log(profit)
        return profit;
    }

    getactivematerialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let key = false;
        if (myproject) {


            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i
                    }
                })
            }

        }
        return key;
    }

    getschedulematerialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let key = false;
        if (myproject) {


            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i;
                    }
                })
            }

        }
        return key;
    }
    getschedulematerialbyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let material = false;
        if (myproject) {


            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }

        }
        return material;
    }
    getactualmaterialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let key = false;
        if (myproject) {


            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i;
                    }
                })
            }

        }
        return key
    }
    getactualmaterialbyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let material = false;
        if (myproject) {


            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }

        }
        return material;
    }
    getscheduleequipmentbyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let equipment = false;
        if (myproject) {


            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map((myequipment, i) => {
                    if (myequipment.equipmentid === equipmentid) {
                        equipment = myequipment;
                    }
                })
            }

        }
        return equipment;
    }
    getitemfieldlarge() {
        if (this.state.width > 1200) {
            return ({ width: '120px' })
        } else {
            return ({ width: '80px' })
        }

    }
    getitemfieldsmall() {
        if (this.state.width > 1200) {
            return ({ width: '80px' })
        } else {
            return ({ width: '60px' })
        }

    }

    showequipmentitem(item) {
        let dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const smallFont = dynamicstyles.getSmallFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, item.myequipmentid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        const equipmentrate = item.equipmentrate;
        const largeField = dynamicstyles.getitemfieldlarge.call(this)
        const amount = Number(totalhours * Number(item.equipmentrate))
        const profit = Number(item.profit) / 100;

        return (

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                    Total Hours:{totalhours.toFixed(2)} x $<input type="text" style={{ ...styles.generalFont, ...smallFont, ...largeField }}
                        onChange={event => { this.handleequipmentrate(event.target.value, item.equipmentid) }}
                        value={equipmentrate} /> = {amount} x {`${Number(1 + profit).toFixed(2)}`} = ${Number(amount * (1 + profit)).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={this.getequipmentprofitbyid(item.equipmentid)}
                            onChange={event => { this.handleequipmentprofit(event.target.value, item.equipmentid) }}
                        />
                    </div>
                </div>
            </div>
        )

    }
    showmaterialitem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const profitField = dynamicstyles.getprofitfield.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const material = dynamicstyles.getmymaterialfromid.call(this, item.mymaterialid)
        const amount = Number(item.quantity * item.unitcost);
        const smallFont = dynamicstyles.getSmallFont.call(this)
        const proposalFieldLarge = dynamicstyles.getitemfieldlarge.call(this)
        const proposalFieldSmall = dynamicstyles.getitemfieldsmall.call(this)
        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}
                    <input type="text"
                        value={item.quantity}
                        onChange={event => { this.handlematerialquantity(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldLarge }} />   x $
                     <input type="text" value={item.unitcost}
                        onChange={event => { this.handlematerialunitcost(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} /> / <input type="text" value={item.unit} onChange={event => { this.handlematerialunit(event.target.value, item.materialid) }} style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />  = ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={this.getmaterialprofitbyid(item.materialid)}
                            onChange={event => { this.handlematerialprofit(event.target.value, item.materialid) }} />
                    </div>
                </div>
            </div>
        )

    }
    showlaboritem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const smallFont = dynamicstyles.getSmallFont.call(this)
        const amount = (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
        const employee = dynamicstyles.getemployeebyproviderid.call(this, item.providerid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        const largeField = dynamicstyles.getitemfieldlarge.call(this);
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();


        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $<input type="text" value={item.laborrate} style={{ ...styles.generalFont, ...largeField, ...smallFont }} onChange={event => { this.handlelaborrate(event.target.value, item.laborid) }} />=  ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={this.getlaborprofitbyid(item.laborid)}
                            onChange={event => { this.handlelaborprofit(event.target.value, item.laborid) }}
                        />
                    </div>
                </div>
            </div>
        )


    }
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipment.myequipmentid);
        const milestone = dynamicstyles.getmilestonebyid.call(this, equipment.milestoneid)
        const csi = dynamicstyles.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`

        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...this.getactivematerialbackground(equipment.equipmentid) }} key={equipment.equipmentid}
            onClick={() => { this.makeequipmentactive(equipment.equipmentid) }}>
            {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
            CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} <br />
            Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}
        </div>)
    }
    getequipmentrentalratebyid(equipmentid, timein, timeout) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
        const hourlyrate = Number(myequipment.rentalrates.hour);
        const dailyrate = Number(myequipment.rentalrates.day);
        const weeklyrate = Number(myequipment.rentalrates.week);
        const monthlyrate = Number(myequipment.rentalrates.month);
        const rentalObj = getEquipmentRentalObj(timein, timeout);
        console.log(rentalObj)
        const hours = rentalObj.hours;
        const days = rentalObj.days;
        const weeks = rentalObj.weeks;
        const months = rentalObj.months;
        let rentalcost = (hourlyrate * hours) + (days * dailyrate) + (weeks * weeklyrate) + (months * monthlyrate);
        let totalhours = calculatetotalhours(timeout, timein);
        let rentalrate = rentalcost / totalhours;
        return rentalrate;

    }
    calculateequipmentratebyid(equipmentid, timein, timeout) {

        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
        let equipmentrate = 0;
        if (myequipment.ownershipstatus === 'owned') {
            equipmentrate = dynamicstyles.calculateequipmentratebyownership.call(this, equipmentid)
        } else if (myequipment.ownershipstatus === 'rented') {
            equipmentrate = dynamicstyles.getequipmentrentalratebyid.call(this, equipmentid, timein, timeout)
        }
        return equipmentrate;

    }
    calculateequipmentratebyownership(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
        const i = Number(Number(myequipment.loaninterest) / 100) / 12;
        const workinghours = Math.round(Number(myequipment.workinghours) / 12);
        let equipmentrate = 0;

        const P = () => {
            let P = 0;
            const costs = dynamicstyles.getequipmentcostsbyid.call(this, myequipment.equipmentid)
            // eslint-disable-next-line
            costs.map(cost => {
                let n = calculateTotalMonths(myequipment.purchasedate, cost.timein);

                let F = Number(cost.cost)

                P += FutureCostPresent(i, n, F);
                console.log(n, F, P)

            })
            return (P)
        }
        const Period = () => {
            let purchasedate = myequipment.purchasedate;
            let saledate = myequipment.saledate;
            let totalmonths = calculateTotalMonths(purchasedate, saledate)
            return (totalmonths)
        }
        const AFactor = () => {
            const T = Period();
            return (AmmortizeFactor(i, T))
        }

        equipmentrate = (P() * AFactor()) / (workinghours);
        console.log(P(), AFactor(), workinghours, equipmentrate)
        return equipmentrate;
    }
    getequipmentcostsbyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let costs = false;
        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myuser.company.equipment.myequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {

                            if (myequipment.hasOwnProperty("ownership")) {

                                costs = myequipment.ownership.cost
                            }

                        }
                    })

                }



            }

        }
        return costs;
    }
    getactualequipmentbyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let equipment = false;
        if (myproject) {


            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map((myequipment, i) => {
                    if (myequipment.equipmentid === equipmentid) {
                        equipment = myequipment;
                    }
                })
            }

        }
        return equipment;
    }
    getactivelaborkeybyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        let key = false;

        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map((mylabor, i) => {
                    if (mylabor.laborid === laborid) {
                        key = i;
                    }
                })
            }
        }

        return key;
    }
    getactuallaborbyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        let labor = false

        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map((mylabor, i) => {
                    if (mylabor.laborid === laborid) {
                        labor = mylabor;
                    }
                })
            }
        }

        return labor;
    }
    getschedulelaborbyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        let labor = false

        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map((mylabor, i) => {
                    if (mylabor.laborid === laborid) {
                        labor = mylabor;
                    }
                })
            }
        }

        return labor;
    }

    getactuallaborkeybyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        let key = false;

        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                // eslint-disable-next-line
                myproject.actuallabor.mylabor.map((mylabor, i) => {

                    if (mylabor.laborid === laborid) {
                        key = i;
                    }
                })
            }
        }

        return key;
    }


    getmilestones() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                milestones = myproject.projectmilestones.mymilestone;

            }
        }
        return milestones;

    }
    getmymaterialfromid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        let material = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.mymaterial.map(mymaterial => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }
        }
        return material;
    }
    getmilestonebyid(milestoneid) {
        let dynamicstyles = new DynamicStyles();
        let milestones = dynamicstyles.getmilestones.call(this)
        let milestone = false;
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(mymilestone => {
                if (mymilestone.milestoneid === milestoneid) {
                    milestone = mymilestone;
                }
            })
        }
        return milestone;
    }

    getmyequipment() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let equipment = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("equipment")) {
                    equipment = myuser.company.equipment.myequipment;
                }
            }
        }
        return equipment;
    }

    getequipmentfromid(equipmentid) {
        let dynamicstyles = new DynamicStyles();
        let myequipment = dynamicstyles.getmyequipment.call(this)
        let equipment = false;
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipments => {
                if (equipments.equipmentid === equipmentid) {
                    equipment = equipments;
                }
            })
        }
        return equipment;
    }


}

export default DynamicStyles;