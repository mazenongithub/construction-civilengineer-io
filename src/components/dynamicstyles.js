import React from 'react'
import { MyStylesheet } from './styles';
import { sorttimes } from './functions'
import firebase from 'firebase/app';
import 'firebase/auth';
import { returnCompanyList, CreateUser } from './functions'
import { saveCompanyIcon, saveProjectIcon } from './svg';
import { SaveCompany, ClientLogin, SaveProject } from './actions/api';

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

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
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
                &nbsp;
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
    getlaborprofitbyid(laborid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
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
    getmaterialprofitbyid(materialid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterials => {
                    if (mymaterials.materialid === materialid) {
                        profit = mymaterials.profit;
                    }
                })
            }
        }
        return profit;
    }

    getequipmentprofitbyid(equipmentid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    if (myequipment.equipmentid === equipmentid) {
                        profit = myequipment.profit;
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
    getactualmaterialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let key = false;
        if (myproject) {


            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i
                    }
                })
            }

        }
        return key;
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