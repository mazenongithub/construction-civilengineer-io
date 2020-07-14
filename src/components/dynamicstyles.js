import React from 'react'
import { MyStylesheet } from './styles';
import { sorttimes } from './functions'
import firebase from 'firebase/app';
import 'firebase/auth';
import { returnCompanyList, CreateUser, FutureCostPresent, calculateTotalMonths, AmmortizeFactor, getEquipmentRentalObj, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime, validateProviderID, sortcode, UTCTimefromCurrentDate, sortpart} from './functions'
import { saveCompanyIcon, saveProjectIcon, saveProfileIcon, removeIconSmall } from './svg';
import { SaveCompany, ClientLoginNode, SaveProject, CheckEmailAddress, CheckProviderID, SaveProfile } from './actions/api';


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

    getampmicon() {
        if (this.state.width > 1200) {
            return ({ width: '83px', height: '48px' })
        } else if (this.state.width > 800) {
            return ({ width: '70px', height: '41px' })
        } else {
            return ({ width: '57px', height: '33px' })
        }

    }

    getcheckfield() {
        if(this.state.width>1200) {
            return({width:'77px'})
        } else if (this.state.width>800) {
            return({width:'55px'})
        } else {
            return({width:'33px'})
        }
    }

    getdropicon() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '93x',
                    height: '45px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '78px',
                    height: '38px'
                })

        } else {
            return (
                {
                    width: '62px',
                    height: '30px'
                })
        }
    }

    getbuttonheight() {
        if (this.state.width > 1200) {
            return ({ height: '75px' })
        } else if (this.state.width > 800) {
            return ({ height: '58px' })
        } else {
            return ({ height: '40px' })
        }
    }

    getupdatepassword() {
        return ({ width: '266px', height: '64px' })
    }
    getplusicon() {
        return ({ width: '63px', height: '63px' })
    }
    getminusicon() {
        return ({ width: '63px', height: '18px' })
    }
    getLoginButton() {
        if (this.state.width > 1200) {
            return ({ width: '276px', height: '63px' })
        } else {
            return ({ width: '181px', height: '49px' })
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
    getmainlogo() {
        if(this.state.width>1200) {
            return({width:'449px',height:'71px'})
        } else if (this.state.width>800) {
            return({width:'376px',height:'59px'})
        } else {

            return({width:'302px',height:'48px'})

        }

    }
    getlogoicon() {
        if(this.state.width>1200) {
            return({width:'100px',height:'70px'})
        } else if (this.state.width>800) {
            return({width:'91px',height:'64px'})
        } else {

            return({width:'82px',height:'58px'})

        }
    }
    getnavigation() {
        let navigation = false;
        
        if(this.props.navigation) {
            if(this.props.navigation.hasOwnProperty("position")) {
                navigation  = this.props.navigation.position;
            }
           

        }
        return navigation;
    }
    getemployeebenefitsbyid(providerid) {
        const dynamicstyles = new DynamicStyles();
        let benefits = false;
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        if (employee.hasOwnProperty("benefits")) {
            benefits = employee.benefits.benefit;
        }
        return benefits;
    }
    getemployeeaccountratio(providerid, accountid) {
        const dynamicstyles = new DynamicStyles();
        const accounts = dynamicstyles.getemployeeaccountsbyid.call(this, providerid)
        let ratio = false;
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    ratio = account.ratio;
                }
            })
        }
        return ratio;
    }
    getaccountbydestination(stripe) {
        const dynamicstyles = new DynamicStyles();
        const myaccounts = dynamicstyles.getmyaccounts.call(this);
        let myaccount = false;
        if(myaccounts) {
            // eslint-disable-next-line
            myaccounts.map(account=> {
                if(account.stripe === stripe) {
                    myaccount = account;
                }
            })

        }
        return myaccount;
    }

    validateremovemanager(providerid) {
        // checks to see if there is one manager
        let validate = true;
        const dynamicstyles = new DynamicStyles();
        let obj= dynamicstyles.getuser.call(this);
      
        const validatemyuser = (obj) => {
            let validateuser = false;
            // eslint-disable-next-line
            obj.company.office.employees.employee.map(employee=> {
                if(employee.manager === 'manager' && employee.providerid !== providerid) {
                    validateuser = true;
                }
            })

            return validateuser;
          
        }

        if(obj) {
            const employee = dynamicstyles.getemployeebyid.call(this,providerid);
            if(employee) {
            validate = validatemyuser(obj)

            }
        }
        
        return validate;

    }

    checkactive() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let check = false;
        if(myuser) {
        const employee =dynamicstyles.getemployeebyid.call(this,myuser.providerid);
        if(employee) {
            if(employee.active === 'active') {
                check = true;
            }
        }

        }
        return check;
        

    }

    checkmanager() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let check = false;
        if(myuser) {
        const employee =dynamicstyles.getemployeebyid.call(this,myuser.providerid);
        if(employee) {
            if(employee.manager === 'manager') {
                check = true;
            }
        }

        }
        return check;
        

    }
    getemployeeaccountsbyid(providerid) {
        const dynamicstyles = new DynamicStyles();
        const accountratio = (benefits, accountid) => {
            let benefitamount = 0;
            let totalbenefits = 0;
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.accountid === accountid) {
                    benefitamount = benefit.amount;
                }
            })
            // eslint-disable-next-line
            benefits.map(benefit => {
                totalbenefits += benefit.amount;
            })
            return (benefitamount / totalbenefits);
        }
        const checkaccounts = (accounts, accountid) => {
            let checkaccount = true;
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    checkaccount = false;
                }
            })
            return checkaccount;

        }
        let accounts = [];
        const benefits = dynamicstyles.getemployeebenefitsbyid.call(this, providerid)
        // eslint-disable-next-line
        benefits.map(benefit => {
            if (checkaccounts(accounts, benefit.accountid)) {
                accounts.push({ accountid: benefit.accountid, ratio: accountratio(benefits, benefit.accountid) })
            }
        })
        return accounts;
    }


 
    getslidebyid(id) {
        const dynamicstyles = new DynamicStyles();
        const slides = dynamicstyles.getslides.call(this)
        let myslide = false;
        if(slides) {
            // eslint-disable-next-line
            slides.map(slide=>{
                if(slide.id === id) {
                    myslide = slide;
                }
            })
        }
        return myslide;
    }
    getmainslide() {
        if (this.state.width > 1200) {
            return ({ width:'1087px',height:'1035px' })
        } else if (this.state.width > 800) {
            return ({ width:'762px',height:'725px' })
        } else {
            return ({ width:'356px',height:'339px' })
        }
    }
    getslides() {
        const slides = () => {
            return([
                {
                    title:'Construction by civilengineer.io',
                    id:'construction',
                    url:'http://civilengineer.io/construction/slides/construction.png',
                    caption:`Construction by civilengineer.io. The Best construction management program online. Sign up and Create your company to Get Started! See the Slide Show `
                },
                {
                    title:'Accounts',
                    id:'accounts',
                    url:'http://civilengineer.io/construction/slides/accounts.png',
                    caption:`Create accounts for employee benefits, equipment, and materials. These accounts are reimbersed when an invoice is settled by the PM. `

                },
                {
                    title:'View Account',
                    id:'viewaccount',
                    url:'http://civilengineer.io/construction/slides/viewaccount.png',
                    caption:`View Balances for Each Account you create including all charges and transfers `
                },
                {
                    title:'Company',
                    id:'company',
                    url:'http://civilengineer.io/construction/slides/company.png',
                    caption:`Once you create or add a company, you will have access to the company component.  `
                },
                {
                    title:'Employees',
                    id:'employees',
                    url:'http://civilengineer.io/construction/slides/employees.png',
                    caption:`Adding benefits inside employee components deteermines default labor rate  `
                },
                {
                    title:'Equipment',
                    id:'equipment',
                    url:'http://civilengineer.io/construction/slides/equipment.png',
                    caption:`Equipment component holds company equipment. Calculates equipment rate based on ownership. Optionally allows you to store rental rates. The cost of Equipment is a Direct Cost on the Project `
                },
                {
                    title:'Materials',
                    id:'materials',
                    url:'http://civilengineer.io/construction/slides/materials.png',
                    caption:`Enter company materials and set the default unit price and unit `
                },
                {
                    title:'Project',
                    id:'project',
                    url:'http://civilengineer.io/construction/slides/project.png',
                    caption:`Project Component after the PM added your company to their project`

                },
            
              
                {
                    title:'Schedule',
                    id:'Schedule',
                    url:'http://civilengineer.io/construction/slides/schedule.png',
                    caption:`Schedule cost component adds construction schedule and does cost estimating. Enter the labor, materials, and equipment required to complete the job`
                },

                {
                    title:'Actual',
                    id:'actual',
                    url:'http://civilengineer.io/construction/slides/actual.png',
                    caption:`Actual Cost component records cost separately than schedule. These are the charges that appear in the invoice for payment. You cannot update an invoice item if it has already been settled`
                },
              
                {
                    title:'Proposal',
                    id:'proposals',
                    url:'http://civilengineer.io/construction/slides/proposals.png',
                    caption:`Proposal Component allows you to easily add your schedule items and send it to the PM in a proposal. You can see the proposal in the view proposal component  `
                },
                {
                    title:'View Proposal',
                    id:'viewinvoice',
                    url:'http://civilengineer.io/construction/slides/viewproposal.png',
                    caption:`View Proposal components allows you to add the quantity and the unit to produce the Unit Price. When you adjust profit, it changes the profit factor for all of the items `
                },

                {
                    title:'Invoices',
                    id:'invoices',
                    url:'http://civilengineer.io/construction/slides/invoices.png',
                    caption:`Invoice Component allows you to easily add items to the invoice, add profit, and make any adjustments to payitems. When you save it will notify the PM you have updated the invoice. You cannot update an item after it has been settled `
                },
  
  
                {
                    title:'View Invoice',
                    id:'viewinvoice',
                    url:'http://civilengineer.io/construction/slides/viewinvoice.png',
                    caption:`ViewInvoice component after transfers has been completed to the contractor through PM `
                },
                {
                    title:'Labor, Equipment, Materials',
                    id:'lem',
                    url:'http://civilengineer.io/construction/slides/lem.png',
                    caption:`Labor, Material, Equipment breakdown for each pay item used `
                },
              
                {
                    title:'Quantity Take Off Schedule',
                    id:'takeoffschedule',
                    url:'http://civilengineer.io/construction/slides/costestimate.png',
                    caption:`Engineers provide the Contractor quantity take off schedules for bid `
                },
                {
                    title:'Specification',
                    id:'specification',
                    url:'http://civilengineer.io/construction/slides/specification.png',
                    caption:`Engineers deliver the specifications to the contractor for each item in their pay schedule or to be included in other items  `
                }
                
        ])
        }
        return slides();
    }
    getsmallslide() {
        if (this.state.width > 1200) {
            return ({ width:'362px',height:'345px' })
        } else if (this.state.width > 800) {
            return ({ width:'254px',height:'241px' })
        } else {
            return ({ width:'178px',height:'169px' })
        }
    
    }
    showchargesbyaccountid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const myprojects = dynamicstyles.getmyprojects.call(this)
        let charges = false;
        const calculatelabor = (mylabor) => {
            let hours = calculatetotalhours(mylabor.timeout, mylabor.timein);

            let labor = hours * mylabor.laborrate * (1 + (mylabor.profit / 100));
            return labor;

        }
        const calculatematerialamount = (mymaterial) => {
            let materialamount = mymaterial.quantity * mymaterial.unitcost * (1 + (mymaterial.profit / 100))
            return materialamount;
        }
        const calculateequipmentamount = (myequipment) => {
            let hours = calculatetotalhours(myequipment.timeout, myequipment.timein)
            let equipment = hours * myequipment.equipmentrate * (1 + (myequipment.profit / 100))
            return equipment;
        }
        if (myprojects) {
            charges = {};
            charges.project = {};
            charges.project.myproject = [];
            // eslint-disable-next-line
            myprojects.map((myproject, i) => {
                charges.project.myproject[i] = {}
                charges.project.myproject[i].projectid = myproject.projectid;
                charges.project.myproject[i].charges = {};
                charges.project.myproject[i].charges.charge = [];
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        let accounts = dynamicstyles.getemployeeaccountsbyid.call(this, mylabor.providerid)
                        let laboramount = calculatelabor(mylabor)
                        let laborid = mylabor.laborid;
                        // eslint-disable-next-line
                        accounts.map(account => {
                            if (account.accountid === accountid) {
                                let ratio = account.ratio;
                                let amount = laboramount * ratio;
                                charges.project.myproject[i].charges.charge.push({ laborid, amount })
                            }
                        })

                    })
                }
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {

                        let materialid = mymaterial.materialid;
                        let material = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid);
                        if (material.accountid === accountid) {
                            let materialamount = calculatematerialamount(mymaterial)
                            charges.project.myproject[i].charges.charge.push({ materialid, amount: materialamount })
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        let equipment = dynamicstyles.getequipmentfromid.call(this, myequipment.myequipmentid)
                        if (equipment.accountid === accountid) {
                            let equipmentamount = calculateequipmentamount(myequipment)
                            charges.project.myproject[i].charges.charge.push({ equipmentid: myequipment.equipmentid, amount: equipmentamount })
                        }
                    })

                }
            })

        }
        return charges;
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
            let emailaddresscheck = false;
            if (emailaddress) {
                emailaddresscheck = true;
            }
            let profile = this.state.profile;
            this.setState({ client, clientid, firstname, lastname, profileurl, phonenumber, emailaddress, emailaddresscheck })
            if (emailaddress && clientid && client && (this.state.login || this.state.profile)) {
                try {

                    let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, profile }
                    const response = await ClientLoginNode(values);
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                    }
                    if (response.hasOwnProperty("myuser")) {
                        this.props.reduxUser(response.myuser)
                        this.setState({ client: '', clientid: '', emailaddress: '', message: '' })
                    } else if (response.hasOwnProperty("message")) {
                        this.setState({ message: response.message })
                    }
                } catch (err) {
                    alert(err)
                }

            }

        } catch (err) {
            alert(err)
        }

    }

    getallcsicodes() {
        let codes = [];
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        codes = myuser.company.construction.civilengineer.csicodes.code;

        if (myuser.company.construction.hasOwnProperty("csicodes")) {
            // eslint-disable-next-line
            myuser.company.construction.csicodes.code.map(code => {
                codes.push(code)
            })



        }

        codes.sort((codea, codeb) => {
            return (sortcode(codea, codeb))
        })

        return codes;
    }

    getCompanyParams() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        let values = {}
        let newuser = {};
        let company = {};
        if (myuser) {
            if (myuser.hasOwnProperty("providerid")) {
                newuser = CreateUser(myuser.providerid, myuser.client, myuser.clientid, myuser.firstname, myuser.lastname, myuser.emailaddress, myuser.phonenumber, myuser.profileurl, myuser.profile)
            }
            if (myuser.hasOwnProperty("invalid")) {
                newuser.invalid = myuser.invalid;
            }
            if (myuser.hasOwnProperty("company")) {

                company.companyid = myuser.company.companyid;
                company.url = myuser.company.url;
                company.address = myuser.company.address;
                company.city = myuser.company.city;
                company.contactstate = myuser.company.contactstate;
                company.zipcode = myuser.company.zipcode;
                company.company = myuser.company.company;

                company.office = myuser.company.office;
                if (myuser.company.hasOwnProperty("materials")) {
                    company.materials = myuser.company.materials;
                }
                if (myuser.company.hasOwnProperty("equipment")) {
                    company.equipment = myuser.company.equipment;
                }


            }
        }
        values = { company, myuser: newuser }
        return values;
    }
    getequipmentcostskeybyid(equipmentid,costid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this,equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }

            })

        }

        return key;
    }
    checkemployeeactive(employeeid) {
        const dynamicstyles = new DynamicStyles();
        const employee = dynamicstyles.getemployeebyid.call(this,employeeid);
        let check = true;
        if(employee) {
            if(employee.active === 'not-active') {
                check = false;
            }
        }
        return check;
    }
    getbenefitkeybyid(benefitid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        let employees = dynamicstyles.getmyemployees.call(this);
        // eslint-disable-next-line
        employees.map(employee => {


            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map((benefit, i) => {
                    if (benefit.benefitid === benefitid) {
                        key = i;
                    }
                })
            }

        })

        return key
    }
    handlecompanyids(response) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (response.hasOwnProperty("replaceids")) {
                if (response.replaceids.hasOwnProperty("accounts")) {
                    // eslint-disable-next-line
                    response.replaceids.accounts.map(replaceids => {

                        let oldaccountid = replaceids.oldaccountid;

                        let i = dynamicstyles.getaccountkeybyid.call(this, oldaccountid);
                        myuser.company.office.accounts.account[i].accountid = replaceids.accountid;
                        if (this.state.activeaccountid === oldaccountid) {
                            this.setState({ activeaccountid: replaceids.accountid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("mymaterial")) {
                    // eslint-disable-next-line
                    response.replaceids.mymaterial.map(material => {
                        let oldmaterialid = material.oldmaterialid;
                        let materialid = material.materialid;
                        let j = dynamicstyles.getmaterialkeybyid.call(this, oldmaterialid)
                        myuser.company.materials.mymaterial[j].materialid = material.materialid;
                        if (this.state.activematerialid === oldmaterialid) {
                            this.setState({ activematerialid: materialid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    response.replaceids.equipment.map(equipment => {

                        let oldequipmentid = equipment.oldequipmentid;
                        let equipmentid = equipment.equipmentid;
                        let k = dynamicstyles.getequipmentkeybyid.call(this, oldequipmentid)
                        myuser.company.equipment.myequipment[k].equipmentid = equipmentid;
                        if (this.state.activeequipmentid === oldequipmentid) {
                            this.setState({ activeequipmentid: equipmentid })
                        }
                    })

                }

                if (response.replaceids.hasOwnProperty("costid")) {
                    // eslint-disable-next-line
                    response.replaceids.costid.map(cost => {
                        let oldcostid = cost.oldcostid;
                        let costid = cost.costid;
                        let equipmentid = cost.equipmentid;
                        let l = dynamicstyles.getequipmentkeybyid.call(this, equipmentid)
                        let m = dynamicstyles.getequipmentcostskeybyid.call(this, oldcostid)

                        myuser.company.equipment.myequipment[l].ownership.cost[m].costid = costid;
                        if (this.state.activecostid === oldcostid) {
                            this.setState({ activecostid: costid })
                        }

                    })
                }
                if (response.replaceids.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    response.replaceids.benefits.map(benefit => {
                        let providerid = benefit.providerid;
                        let oldbenefitid = benefit.oldbenefitid;
                        let benefitid = benefit.benefitid;
                        let n = dynamicstyles.getemployeekeybyid.call(this, providerid);
                        let o = dynamicstyles.getbenefitkeybyid.call(this, oldbenefitid)
                        myuser.company.office.employees.employee[n].benefits.benefit[o].benefitid = benefitid;
                        if (this.state.activebenefitid === oldbenefitid) {
                            this.setState({ activebenefitid: benefitid })
                        }
                    })
                }
                this.props.reduxUser(myuser)
            }

        }
    }
    validateCompany(params) {
        let validate = {};

        validate.validate = true;
        validate.message = '';
        const company = params.company;
        const myuser = params.myuser;

        if (myuser.hasOwnProperty("invalid")) {
            validate.validate = false;
            validate.message += myuser.invalid;
        }
        if (company.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            company.equipment.myequipment.map(myequipment => {
                if (!myequipment.accountid) {
                    validate.validate = false;
                    validate.message += `${myequipment.equipment} is missing AccountID `
                }

            })
        }
        if (company.hasOwnProperty("materials")) {
            // eslint-disable-next-line
            company.materials.mymaterial.map(mymaterial => {
                if (!mymaterial.accountid) {
                    validate.validate = false;
                    validate.message += `${mymaterial.material} is missing AccountID `
                }
            })
        }
        if (company.office.hasOwnProperty("employees")) {
            // eslint-disable-next-line
            company.office.employees.employee.map(employee => {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.benefit.map(benefit => {
                        if (!benefit.accountid) {
                            validate.validate = false;
                            validate.message += `${benefit.benefit} is missing AccountID `
                        }
                    })
                }
            })
        }
        return validate;

    }
    async saveCompany() {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this);
        if(myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this,myuser.getemployeebyproviderid);
            if(checkmanager) {
        let params = dynamicstyles.getCompanyParams.call(this)

        const validate = dynamicstyles.validateCompany(params);
        if (validate.validate) {
            let response = await SaveCompany(params);
            console.log(response)
            dynamicstyles.handlecompanyids.call(this, response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
            if (response.hasOwnProperty("myuser")) {
                this.props.reduxUser(response.myuser)
            }

            if (response.hasOwnProperty("message")) {
                let dateupdated = inputUTCStringForLaborID(response.lastupdated)
                this.setState({ message: `${response.message} Last Updated ${dateupdated}` })
            }
        } else {
            this.setState({ message: validate.message })
        }

    } else {
        alert(`Only Managers have access to this function `)
    }

    }
    }
    async savemyprofile() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        let values = { providerid: myuser.providerid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }

        let response = await SaveProfile(values)
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

    }

    getinvoiceitem(csiid) {

        let myinvoice = this.getinvoice();
        let invoiceitem = false;
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            myinvoice.bid.biditem.map((item) => {
                if (item.csiid === csiid) {
                    invoiceitem = item
                }

            })
        }
        return invoiceitem;

    }

    getproposalitem(csiid) {

        let myproposal = this.getproposal();
        let proposalitem = false;
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item) => {
                if (item.csiid === csiid) {
                    proposalitem = item
                }

            })
        }
        return proposalitem;

    }

    getinvoiceitemkey(csiid) {
        let key = false;
        let myinvoice = this.getinvoice();
        if (myinvoice.hasOwnProperty("bid")) {
            // eslint-disable-next-line
            myinvoice.bid.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i
                }

            })
        }
        return key;

    }

    getproposalitemkey(csiid) {
        let key = false;
        let myproposal = this.getproposal();
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i
                }

            })
        }
        return key;

    }
    getproposalkeybyid(proposalid) {
        let dynamicstyles = new DynamicStyles();
        let key = false;

        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    key = i;
                }
            })

        }





        return key;
    }
    getproposalbyid(proposalid) {
        let dynamicstyles = new DynamicStyles();
        let proposal = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    proposal = myproposal;
                }
            })

        }


        return proposal;
    }
    getinvoicekeybyid(invoiceid) {
        let dynamicstyles = new DynamicStyles();
        let key = false;

        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map((myinvoice, i) => {
                if (myinvoice.invoiceid === invoiceid) {
                    key = i;
                }
            })

        }



        return key;
    }
    getinvoicebyid(invoiceid) {
        let dynamicstyles = new DynamicStyles();
        let invoice = false;

        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            // eslint-disable-next-line
            myproject.invoices.myinvoice.map((myinvoice) => {
                if (myinvoice.invoiceid === invoiceid) {
                    invoice = myinvoice
                }
            })

        }



        return invoice;
    }

    handleprojectids(response) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (response.hasOwnProperty("projectids")) {
                const i = dynamicstyles.getprojectkey.call(this)
                if (response.projectids.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    response.projectids.scheduleequipment.map(myequipment => {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, myequipment.oldequipmentid);
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentid = myequipment.equipmentid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeequipmentid === myequipment.oldequipmentid) {
                            this.setState({ activeequipmentid: myequipment.equipmentid })
                        }

                    })

                }
                if (response.projectids.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    response.projectids.schedulematerials.map(mymaterial => {
                        const j = dynamicstyles.getschedulematerialkeybyid.call(this, mymaterial.oldmaterialid);
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].materialid = mymaterial.materialid;
                        this.props.reduxUser(myuser);
                        if (this.state.activematerialid === mymaterial.oldmaterialid) {
                            this.setState({ activematerialid: mymaterial.materialid })
                        }

                    })
                }

                if (response.projectids.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    response.projectids.schedulelabor.map(mylabor => {
                        const k = dynamicstyles.getschedulelaborkeybyid.call(this, mylabor.oldlaborid);
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[k].laborid = mylabor.laborid;
                        this.props.reduxUser(myuser);
                        if (this.state.activelaborid === mylabor.oldlaborid) {
                            this.setState({ activelaborid: mylabor.laborid })
                        }

                    })
                }
                if (response.projectids.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    response.projectids.actualequipment.map(myequipment => {

                        const l = dynamicstyles.getactualequipmentkeybyid.call(this, myequipment.oldequipmentid);
                        myuser.company.projects.myproject[i].actualequipment.myequipment[l].equipmentid = myequipment.equipmentid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeequipmentid === myequipment.oldequipmentid) {
                            this.setState({ activeequipmentid: myequipment.equipmentid })
                        }



                    })
                }
                if (response.projectids.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    response.projectids.actualmaterials.map(mymaterial => {
                        const m = dynamicstyles.getactualmaterialkeybyid.call(this, mymaterial.oldmaterialid);
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[m].materialid = mymaterial.materialid;
                        this.props.reduxUser(myuser);
                        if (this.state.activematerialid === mymaterial.oldmaterialid) {
                            this.setState({ activematerialid: mymaterial.materialid })
                        }

                    })
                }


                if (response.projectids.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    response.projectids.actuallabor.map(mylabor => {
                        const n = dynamicstyles.getactuallaborkeybyid.call(this, mylabor.oldlaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[n].laborid = mylabor.laborid;
                        this.props.reduxUser(myuser);
                        if (this.state.activelaborid === mylabor.oldlaborid) {
                            this.setState({ activelaborid: mylabor.laborid })
                        }



                    })
                }

                if (response.projectids.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    response.projectids.proposals.map(myproposal => {
                        const o = dynamicstyles.getproposalkeybyid.call(this, myproposal.oldproposalid);
                        myuser.company.projects.myproject[i].proposals.myproposal[o].proposalid = myproposal.proposalid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeproposalid === myproposal.oldproposalid) {
                            this.setState({ activeproposalid: myproposal.proposalid })
                        }

                    })
                }



                if (response.projectids.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    response.projectids.invoices.map(myinvoice => {
                        const p = dynamicstyles.getinvoicekeybyid.call(this, myinvoice.oldinvoiceid);
                        myuser.company.projects.myproject[i].invoices.myinvoice[p].invoiceid = myinvoice.invoiceid;
                        this.props.reduxUser(myuser);
                        if (this.state.activeinvoiceid === myinvoice.oldinvoiceid) {
                            this.setState({ activeinvoiceid: myinvoice.invoiceid })
                        }

                    })

                }

            }
        }
    }
    validateProject(project) {
        let validate = {};
        validate.validate = true;
        validate.message = "";
        const dynamicstyles = new DynamicStyles();
        if (project.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            project.schedulelabor.mylabor.map(mylabor => {
                if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                    validate.validate = false;
                    if (!mylabor.csiid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing CSIID `
                    }
                    if (!mylabor.milestoneid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing MilestoneID `
                    }
                    if (!mylabor.providerid) {
                        validate.message += `Schedule labor ${mylabor.description} is missing ProviderID `
                    }

                }
            })
        }

        if (project.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            project.actuallabor.mylabor.map(mylabor => {
                if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                    validate.validate = false;
                    if (!mylabor.csiid) {
                        validate.message += `Actual labor ${mylabor.description} is missing CSIID `
                    }
                    if (!mylabor.milestoneid) {
                        validate.message += `Actual labor ${mylabor.description} is missing MilestoneID `
                    }
                    if (!mylabor.providerid) {
                        validate.message += `Actual labor ${mylabor.description} is missing ProviderID `
                    }

                }
            })
        }

        if (project.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            project.schedulematerials.mymaterial.map(mymaterial => {
                let schedulematerial = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid)
                let material = "";
                if (schedulematerial) {
                    material = schedulematerial.mymaterialid;
                }

                if (!schedulematerial || !mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                    validate.validate = false;
                    if (!mymaterial.mymaterialid) {
                        validate.message += `Schedule Material is missing materialid `
                    }
                    if (!mymaterial.csiid) {
                        validate.message += `Schedule Material ${material} is missing csiid `
                    }
                    if (!mymaterial.milestoneid) {
                        validate.message += `Schedule Material ${material} is missing milestoneid `
                    }

                }
            })
        }

        if (project.hasOwnProperty("actualmaterials")) {
            // eslint-disable-next-line
            project.actualmaterials.mymaterial.map(mymaterial => {
                let myactualmaterial = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid);
                let actualmaterial = "";
                if (myactualmaterial) {
                    actualmaterial = myactualmaterial.mymaterialid;
                }
                if (!mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                    validate.validate = false;
                    if (!mymaterial.mymaterialid) {

                        validate.message += `Actual Material is missing materialid `
                    }
                    if (!mymaterial.csiid) {

                        validate.message += `Actual Material ${actualmaterial} is missing csiid `
                    }
                    if (!mymaterial.milestoneid) {
                        validate.message += `Actual Material ${actualmaterial} is missing milestoneid `
                    }
                }
            })
        }
        if (project.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            project.scheduleequipment.myequipment.map(myequipment => {
                let myscheduleequipment = "";
                let scheduleequipment = dynamicstyles.getequipmentfromid.call(this, myequipment.myequipmentid);
                if (scheduleequipment) {
                    myscheduleequipment = scheduleequipment.equipment;
                }
                if (!myequipment.myequipmentid || !myequipment.csiid || !myequipment.milestoneid) {
                    validate.validate = false;
                    if (!myequipment.myequipmentid) {
                        validate.message += `Schedule Equipment is missing Equipment ID `;
                    }
                    if (!myequipment.csiid) {
                        validate.message += `Schedule Equipment ${myscheduleequipment} is missing CSIID `;
                    }

                    if (!myequipment.milestoneid) {
                        validate.message += `Schedule Equipment ${myscheduleequipment} is missing MilestoneID `;
                    }

                }

            })


        }
        if (project.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            project.actualequipment.myequipment.map(myequipment => {
                let myactualequipment = "";
                let actualequipment = dynamicstyles.getequipmentfromid.call(this, myequipment.myequipmentid);
                if (actualequipment) {
                    myactualequipment = actualequipment.equipment;
                }
                if (!myequipment.myequipmentid || !myequipment.csiid || !myequipment.milestoneid) {
                    validate.validate = false;
                    if (!myequipment.myequipmentid) {
                        validate.message += `Actual Equipment is missing Equipment ID `;
                    }
                    if (!myequipment.csiid) {
                        validate.message += `Actual Equipment ${myactualequipment} is missing CSIID `;
                    }

                    if (!myequipment.milestoneid) {
                        validate.message += `Actual Equipment ${myactualequipment} is missing MilestoneID `;
                    }

                }

            })


        }
        return validate;
    }
    async savemyproject() {
        let dynamicstyles = new DynamicStyles();
        let values = dynamicstyles.getCompanyParams.call(this);
        let myproject = dynamicstyles.getproject.call(this);
        values.project = myproject;
        let validatecompany = dynamicstyles.validateCompany.call(this, values);
        let validateproject = dynamicstyles.validateProject.call(this, values.project)

        if (validatecompany.validate && validateproject.validate) {
            try {
                let response = await SaveProject(values)
                console.log(response)
                dynamicstyles.handlecompanyids.call(this, response)
                dynamicstyles.handleprojectids.call(this, response)
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

        } else {
            let message = "";
            message += validatecompany.message;
            message += validateproject.message;
            this.setState({ message })
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
                    {this.state.message}
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
        let profile = this.state.profile;
        let errmsg = validateProviderID(profile);
        if (errmsg) {
            this.setState({ profilecheck: false, message: errmsg })
        } else {
            this.setState({ profilecheck: true, message: "" })
        }
        if (!errmsg) {
            try {
                let response = await CheckProviderID(profile)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true });
                }
                else {
                    this.setState({ profilecheck: false, message: response.message });
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

    async clientlogin() {
        try {

            let client = this.state.client;
            let clientid = this.state.clientid;
            let firstname = this.state.firstname;
            let lastname = this.state.lastname;
            let emailaddress = this.state.emailaddress;
            let profileurl = this.state.profileurl;
            let phonenumber = this.state.phonumber;
            let profile = this.state.profile
            let password = this.state.password;
            let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, profile, password }
            console.log(values)
            const response = await ClientLoginNode(values);
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);

            }
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '' })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }

        } catch (err) {
            alert(err)
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
            let emailaddresscheck = false;
            if (emailaddress) {
                emailaddresscheck = true;
            }
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            this.setState({ client, clientid, emailaddress, firstname, lastname, profileurl, phonenumber, emailaddresscheck })

            if (emailaddress && clientid && client && (this.state.login || this.state.profile)) {
                let profile = this.state.profile;
                try {


                    let values = { client, clientid, firstname, lastname, emailaddress, profileurl, phonenumber, profile }

                    const response = await ClientLoginNode(values);
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                    }
                    if (response.hasOwnProperty("myuser")) {
                        this.props.reduxUser(response.myuser)
                        this.setState({ client: '', clientid: '', emailaddress: '', message: '' })
                    } else if (response.hasOwnProperty("message")) {
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
        const dynamicstyles = new DynamicStyles();

        const schedule = () => {
            let schedules = [];
            let myproject = dynamicstyles.getproject.call(this)


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
    getmymaterials() {
        const dynamicstyles = new DynamicStyles();
        const company = dynamicstyles.getcompany.call(this);
        let materials = false;
        if (company.hasOwnProperty("materials")) {
            materials = company.materials.mymaterial;

        }
        return materials;
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
    getprojectbytitle(title) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let projects = false;
        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(myproject => {

                        if (myproject.title === title) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
    }
    getprojectkeybyid(projectid) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let key = false;
        if (myuser) {
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
        }
        return key;
    }
    getprojectbyid(projectid) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
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

    getsectionbyid(projectid, csiid, sectionid) {
        const dynamicstyles = new DynamicStyles();
        const spec = dynamicstyles.getspecficationbycsi.call(this, projectid, csiid)
        let mysection = false;
        if (spec) {

            if (spec.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                spec.sections.map(section => {
                    if (section.sectionid === sectionid) {
                        mysection = section;
                    }
                })
            }
        }
        return mysection;
    }

    getsectionnumberbyid(projectid, csiid, sectionid) {
        const dynamicstyles = new DynamicStyles();
        const spec = dynamicstyles.getspecficationbycsi.call(this, projectid, csiid)
        let mycounter = "";
        if (spec.hasOwnProperty("sections")) {
            const section = dynamicstyles.getsectionbyid.call(this, projectid, csiid, sectionid)
            if (section) {
                let part = section.part;

                spec.sections.sort((b, a) => {
                    return sortpart(b, a)
                })

                let counter = 1;
                // eslint-disable-next-line
                spec.sections.map((section, i) => {
                    if (section.part === part) {

                        if (section.sectionid === sectionid) {
                            mycounter = counter;
                        } else {
                            counter += 1;
                        }

                    }



                })

            }

        }
        if (Number(mycounter) < 10) {
            mycounter = `0${mycounter}`
        }
        return mycounter;
    }

    getspecficationbycsi(projectid, csiid) {
        const dynamicstyles = new DynamicStyles();
        const specs = dynamicstyles.getspecficationsbyprojectid.call(this, projectid)
        let myspec = false;
        if (specs) {
            // eslint-disable-next-line
            specs.map(spec => {
                if (spec.csiid === csiid) {
                    myspec = spec;
                }
            })
        }
        return myspec;
    }

    getspecficationsbyprojectid(projectid) {
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbyid.call(this, projectid)
        let specifications = false;
        if (myproject.hasOwnProperty("specifications")) {
            specifications = myproject.specifications;
        }
       
        return specifications;
    }

    getbiditembycsiid(projectid, csiid) {
        const dynamicstyles= new DynamicStyles();
        let schedule = false;
        const project = dynamicstyles.getprojectbyid.call(this, projectid);
        if (project.hasOwnProperty("costestimate")) {
            if (project.costestimate.hasOwnProperty("bidschedule")) {
                // eslint-disable-next-line
                project.costestimate.bidschedule.map(bidschedule => {
                    if (bidschedule.csiid === csiid) {
                        schedule = bidschedule;
                    }
                })

            }

        }
        return schedule;
    }
    getquantityfield() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '145px' })
        } else {
            return ({ maxWidth: '96px' })
        }
    }

    getproject() {

        const dynamicstyles = new DynamicStyles();
        let projectid = this.props.match.params.projectid;
        let projects = false;
        let myproject = dynamicstyles.getprojectbytitle.call(this, projectid);
        if (myproject) {
            projects = myproject;
        }
        return projects;
    }
    getprojectkey() {
        const dynamicstyles = new DynamicStyles();
        let title = this.props.match.params.projectid;
        const myproject = dynamicstyles.getprojectbytitle.call(this, title);
        let key = false;
        if (myproject) {
            key = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid)
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
    getemployeekeybyid(providerid) {
        const dynamicstyles = new DynamicStyles()
        let myemployees = dynamicstyles.getmyemployees.call(this)
        let key = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map((employee, i) => {
                if (employee.providerid === providerid) {
                    key = i;
                }
            })
        }
        return key;
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
    getschedulematerials() {
        const dynamicstyles = new DynamicStyles();
        let schedulematerials = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("schedulematerials")) {
            schedulematerials = myproject.schedulematerials.mymaterial;

        }
        return schedulematerials;
    }
    getactualmaterials() {
        const dynamicstyles = new DynamicStyles();
        let actualmaterials = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actualmaterials")) {
            actualmaterials = myproject.actualmaterials.mymaterial;

        }
        return actualmaterials;
    }

    getactuallabor() {
        const dynamicstyles = new DynamicStyles();
        let actuallabor = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actuallabor")) {
            actuallabor = myproject.actuallabor.mylabor;

        }
        return actuallabor;
    }
    getschedulelabor() {
        const dynamicstyles = new DynamicStyles();
        let schedulelabor = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("schedulelabor")) {
            schedulelabor = myproject.schedulelabor.mylabor;

        }
        return schedulelabor;
    }
    getinvoices() {
        const dynamicstyles = new DynamicStyles();
        let invoices = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("invoices")) {
            invoices = myproject.invoices.myinvoice;

        }
        return invoices;
    }
    getproposals() {
        const dynamicstyles = new DynamicStyles();
        let proposals = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            proposals = myproject.proposals.myproposal;

        }
        return proposals;
    }

    getscheduleequipment() {
        const dynamicstyles = new DynamicStyles();
        let scheduleequipment = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("scheduleequipment")) {
            scheduleequipment = myproject.scheduleequipment.myequipment;

        }
        return scheduleequipment;
    }
    getactualequipment() {
        const dynamicstyles = new DynamicStyles();
        let actualequipment = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actualequipment")) {
            actualequipment = myproject.actualequipment.myequipment;

        }
        return actualequipment;
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
        if (this.state.width > 1200) {
            return (styles.font40)
        } else if (this.state.wisth>800) {
            return (styles.font30)
        } else {
            return (styles.font24)
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
        if(this.state.width>1200) {
            return (styles.font30)
        }
        if (this.state.width > 800) {
            return (styles.font24)
        } else {
            return (styles.font20)
        }

    }
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '273px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '235px'
            })
        } else {
            return ({
                width: '197px'
            })
        }

    }
    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({
                width: '273px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '235px'
            })
        } else {
            return ({
                width: '197px'
            })
        }

    }

    getequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;

        let myequipment = dynamicstyles.getmyequipment.call(this)
        // eslint-disable-next-line
        myequipment.map((equipment, i) => {
            if (equipment.equipmentid === equipmentid) {
                key = i;
            }
        })


        return key;
    }
    getmyequipmentbyid(equipmentid) {
        console.log(equipmentid)
        const dynamicstyles = new DynamicStyles();
        let equipments = false;

        let myequipment = dynamicstyles.getmyequipment.call(this)
        console.log(myequipment)
        // eslint-disable-next-line
        myequipment.map((equipment) => {
            console.log(equipment)
            if (equipment.equipmentid === equipmentid) {
                equipments = equipment
            }
        })


        return equipments;
    }


    getcreateproposal() {
       
            return ({
                width: '32px',
                height: '32px'
            })
        

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

    getinvoiceidfromtransferid(transferid) {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)
        let invoiceid = false;
        if (projects) {
            // eslint-disable-next-line 
            projects.map(myproject => {
                if (myproject.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    myproject.invoices.myinvoice.map(myinvoice => {

                        if (myinvoice.hasOwnProperty("transfers")) {
                            if (myinvoice.transfers.hasOwnProperty("transfer")) {
                                // eslint-disable-next-line
                                myinvoice.transfers.transfer.map(transfer => {
                                    if (transfer.transferid === transferid) {
                                        invoiceid = myinvoice.invoiceid;
                                    }

                                })

                            }
                        }
                    })


                }
            })
        }
        return invoiceid;
    }
    gettransfersbyaccountid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)
        const account = dynamicstyles.getaccountbyid.call(this, accountid);
        let transfers = [];
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("invoices")) {
                    // eslint-disable-next-line
                    myproject.invoices.myinvoice.map(myinvoice => {
                        if (myinvoice.hasOwnProperty("transfers")) {
                            if (myinvoice.transfers.hasOwnProperty("transfer")) {
                                // eslint-disable-next-line
                                myinvoice.transfers.transfer.map(transfer => {
                                    if (transfer.destination === account.stripe) {
                                        transfers.push(transfer)
                                    }

                                })
                            }
                        }
                    })
                }
            })
        }
        return transfers;
    }
    findactualequipmentbyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)
        let equipment = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipment = myequipment;
                        }
                    })
                }
            })
        }
        return equipment;
    }
    findactualmaterialbyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)
        let material = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            material = mymaterial;
                        }
                    })
                }

            })
        }
        return material;
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
    getcsis() {
        let csis = false;
        if(this.props.csis) {
            if(this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }
    getcsibyid(csiid) {
        let csi = false;
        let dynamicstyles = new DynamicStyles();
       const csis = dynamicstyles.getcsis.call(this)
       if(csis) {
                // eslint-disable-next-line
                csis.map(code => {
                    if (code.csiid === csiid) {
                        csi = code;

                    }
                })
            
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

                        profit = myequipment.profit;
                    }
                })
            }
        }

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

    updateinvoice(invoiceid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const projectid = this.props.match.params.projectid;

        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this, projectid);
            if (myproject) {
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                const myinvoice = dynamicstyles.getinvoicebyid.call(this, invoiceid)
                if (myinvoice) {

                    const j = dynamicstyles.getinvoicekeybyid.call(this, invoiceid)

                    myuser.company.projects.myproject[i].invoices.myinvoice[j].updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    updateproposal(proposalid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const projectid = this.props.match.params.projectid;

        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this, projectid);
            if (myproject) {
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                const myproposal = dynamicstyles.getproposalbyid.call(this, proposalid)
                if (myproposal) {

                    const j = dynamicstyles.getproposalkeybyid.call(this, proposalid)

                    myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

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
    getscheduleequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let key = false;
        if (myproject) {


            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map((myequipment, i) => {
                    if (myequipment.equipmentid === equipmentid) {
                        key = i
                    }
                })
            }

        }
        return key;
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

    checkinvoiceequipmentid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getactualequipmentbyid.call(this, equipmentid);
        let checkinvoice = true;
        if (myequipment) {
            if (myequipment.settlementid) {
                checkinvoice = false;
            }
        }
        return checkinvoice;

    }

    checkinvoicematerialid(materialid) {
        const dynamicstyles = new DynamicStyles();
        const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid);
        let checkinvoice = true;
        if (mymaterial) {
            if (mymaterial.settlementid) {
                checkinvoice=false;
            }
        }
        return checkinvoice;

    }
   

    checkinvoicelaborid(laborid) {
        const dynamicstyles = new DynamicStyles();
        const mylabor = dynamicstyles.getactuallaborbyid.call(this, laborid);
        let checkinvoice = true;
        if (mylabor) {
            if (mylabor.settlementid) {

                checkinvoice = false;
            }

        }
        return checkinvoice;
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

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                    Total Hours:{totalhours.toFixed(2)} x $<input type="text" style={{ ...styles.generalFont, ...smallFont, ...largeField }}
                        onChange={event => { this.handleequipmentrate(event.target.value, item.equipmentid) }}
                        value={equipmentrate} /> = {amount} x {+Number(1+profit).toFixed(4)}= ${Number(amount * (1 + profit)).toFixed(2)}
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
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.bottomMargin15 }}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} onClick={() => { this.addItem(item) }}>
                    {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}
                    <input type="text"
                        value={item.quantity}
                        onChange={event => { this.handlematerialquantity(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldLarge }} />   x $
                     <input type="text" value={item.unitcost}
                        onChange={event => { this.handlematerialunitcost(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} /> / <input type="text" value={item.unit} onChange={event => { this.handlematerialunit(event.target.value, item.materialid) }} style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />  = ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}
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
        const employee = dynamicstyles.getemployeebyid.call(this, item.providerid);
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
                    {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $<input type="text" value={item.laborrate} style={{ ...styles.generalFont, ...largeField, ...smallFont }} onChange={event => { this.handlelaborrate(event.target.value, item.laborid) }} />=  ${amount.toFixed(2)}  x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}
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
        const removeIcon = dynamicstyles.getremoveicon.call(this)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={equipment.equipmentid}>
            <span style={{ ...this.getactivematerialbackground(equipment.equipmentid) }} onClick={() => { this.makeequipmentactive(equipment.equipmentid) }}>{myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone} <br />
                Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}
            </span>
            <button style={{ ...styles.generalButton, ...removeIcon }}
                onClick={() => { this.removeequipment(equipment) }}>{removeIconSmall()} </button>
        </div>
        )
    }
    getequipmentrentalratebyid(equipmentid, timein, timeout) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
        const hourlyrate = Number(myequipment.rentalrates.hour);
        const dailyrate = Number(myequipment.rentalrates.day);
        const weeklyrate = Number(myequipment.rentalrates.week);
        const monthlyrate = Number(myequipment.rentalrates.month);
        const rentalObj = getEquipmentRentalObj(timein, timeout);

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
    getTransfersbyinvoiceid(invoiceid) {
        const dynamicstyles = new DynamicStyles();
        const myinvoice = dynamicstyles.getinvoicebyid.call(this,invoiceid)
        let transfers = false;
        if(myinvoice) {
            if(myinvoice.hasOwnProperty("transfers")) {
            transfers = myinvoice.transfers.transfer;
            }
        }
        return transfers;
    }
    calculateequipmentratebyownership(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipmentid);
        const i = (Number(myequipment.ownership.loaninterest) / 100) / 12;
        const workinghours = Math.round(Number(myequipment.ownership.workinghours) / 12);
        let equipmentrate = 0;

        const P = () => {
            let P = 0;
            const costs = dynamicstyles.getequipmentcostsbyid.call(this, myequipment.equipmentid)
            if (costs) {
                // eslint-disable-next-line
                costs.map(cost => {
                    let n = calculateTotalMonths(myequipment.ownership.purchasedate, cost.timein);
                    let F = Number(cost.cost)
                    P += FutureCostPresent(i, n, F);

                })
            }
            return (P)
        }
        const Period = () => {
            let purchasedate = myequipment.ownership.purchasedate;
            let saledate = myequipment.ownership.saledate;
            if (purchasedate && saledate) {
                let totalmonths = calculateTotalMonths(purchasedate, saledate)
                return (totalmonths)
            } else {
                return 0;
            }

        }
        const AFactor = () => {
            const T = Period();
            const i = Number(myequipment.ownership.loaninterest);
            console.log(T, i)
            if (T) {
                console.log(AmmortizeFactor(i, T))
                return (AmmortizeFactor(i, T))
            } else {

                return 0;
            }

        }

        const totalworkinghours = () => {
            let annual = Number(myequipment.ownership.workinghours);
            let years = Period() / 12;

            return (Math.round(annual * years))
        }
        console.log(i)
        if (i > 0) {
            equipmentrate = (P() * AFactor()) / (workinghours);
        } else {
            console.log(P(), totalworkinghours(), Period())
            equipmentrate = P() / (totalworkinghours())
        }

        return equipmentrate;
    }
    getcostbyid(equipmentid,costid) {
        console.log(equipmentid,costid)
        const dynamicstyles = new DynamicStyles();
        let costs = false;
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this,equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    costs = cost;
                }

            })

        }

        return costs
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
    findactuallaborbyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)
        let labor = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            labor = mylabor;
                        }
                    })
                }
            })
        }
        return labor;
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
    getschedulelaborkeybyid(laborid) {
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
    getmyaccounts() {
        const dynamicstyles = new DynamicStyles();
        let myaccounts = false;
        const mycompany = dynamicstyles.getcompany.call(this);
        if (mycompany) {
            if (mycompany.office.hasOwnProperty("accounts")) {
                myaccounts = mycompany.office.accounts.account;
            }
        }
        return myaccounts;
    }

    getaccountbyid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const myaccounts = dynamicstyles.getmyaccounts.call(this);
        let myaccount = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    myaccount = account;
                }
            })
        }
        return myaccount;
    }
    getmycsicodes() {
        const dynamicstyles = new DynamicStyles();
        const mycompany = dynamicstyles.getcompany.call(this);
        let csis = false;
        if (mycompany.hasOwnProperty("construction")) {
            if (mycompany.construction.hasOwnProperty("csicodes")) {
                csis = mycompany.construction.csicodes.code;
            }
        }
        return csis;
    }
    getmaterialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        const company = dynamicstyles.getcompany.call(this);
        let key = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.mymaterial.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i;

                    }
                })
            }
        }
        return key;

    }
    getmyprojects() {
        const dynamicstyles = new DynamicStyles();
        const company = dynamicstyles.getcompany.call(this);
        let projects = false;
        if (company) {
            if (company.hasOwnProperty("projects")) {
                projects = company.projects.myproject;
            }
        }
        return projects;
    }
    getaccountkeybyid(accountid) {
        const dynamicstyles = new DynamicStyles();
        const myaccounts = dynamicstyles.getmyaccounts.call(this);
        let key = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    key = i;
                }
            })
        }
        return key;
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