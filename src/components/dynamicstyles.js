import React from 'react'
import { MyStylesheet } from './styles';
import { updateTimes, sorttimes } from './functions'
import firebase from 'firebase/app';
import 'firebase/auth';
import { returnCompanyList, CreateUser, calculateTotalMonths, getEquipmentRentalObj, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime, validateProviderID, UTCTimefromCurrentDate, getDateInterval, getScale, calculatemonth, calculateday, calculateyear, calculateFloat, checkemptyobject, getDateTime, validateLoanPayment, getRepaymentCosts, getInterval, newCost, convertUTCTime, formatTimeString, getBenefitInterval } from './functions'
import { saveCompanyIcon, saveProjectIcon, saveProfileIcon, removeIconSmall } from './svg';
import { SaveCompany, SaveProject, CheckEmailAddress, CheckProviderID, SaveProfile, AppleLogin, LoadSpecifications, LoadCSIs, ValidateCompanyID } from './actions/api';
import Spinner from './spinner'

class DynamicStyles {
    sumOfTransfersByLaborID(laborid) {
        const dynamicstyles = new DynamicStyles();
        const transfers = dynamicstyles.getActualTransfersByLaborID.call(this, laborid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;
    }



    getActualTransfersByLaborID(laborid) {
        const dynamicstyles = new DynamicStyles();
        let gettransfers = false;
        const labor = dynamicstyles.getactuallaborbyid.call(this, laborid)
        if (labor.hasOwnProperty("actualtransfers")) {
            gettransfers = labor.actualtransfers;

        }
        return gettransfers;

    }

    sumOfTransfersByEquipmentID(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const transfers = dynamicstyles.getActualTransfersByEquipmentID.call(this, equipmentid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;

    }

    getActualTransfersByEquipmentID(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let gettransfers = false;
        const equipment = dynamicstyles.getactualequipmentbyid.call(this, equipmentid)
        if (equipment.hasOwnProperty("actualtransfers")) {
            gettransfers = equipment.actualtransfers;

        }
        return gettransfers;
    }



    sumOfTransfersByMaterialID(materialid) {
        const dynamicstyles = new DynamicStyles();
        const transfers = dynamicstyles.getActualTransfersByMaterialID.call(this, materialid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;

    }

    getActualTransfersByMaterialID(materialid) {
        const dynamicstyles = new DynamicStyles();
        let gettransfers = false;
        let material = dynamicstyles.getactualmaterialbyid.call(this, materialid)
        if (material.hasOwnProperty("actualtransfers")) {
            gettransfers = material.actualtransfers;

        }
        return gettransfers;

    }

    async loadcsis() {
        try {
            let response = await LoadCSIs();
            if (response.hasOwnProperty("csis")) {
                this.props.reduxCSIs(response.csis);

            }

        } catch (err) {
            alert(err)
        }
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
        if (this.state.width > 1200) {
            return ({ width: '77px' })
        } else if (this.state.width > 800) {
            return ({ width: '55px' })
        } else {
            return ({ width: '33px' })
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
        if (this.state.width > 1200) {
            return ({ width: '449px', height: '71px' })
        } else if (this.state.width > 800) {
            return ({ width: '376px', height: '59px' })
        } else {

            return ({ width: '302px', height: '48px' })

        }

    }
    getlogoicon() {
        if (this.state.width > 1200) {
            return ({ width: '100px', height: 'auto' })
        } else if (this.state.width > 800) {
            return ({ width: '91px', height: 'auto' })
        } else {

            return ({ width: '82px', height: 'auto' })

        }
    }

    getactuallaborbyproviderid(providerid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let labor = [];
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map(project => {
                        if (project.hasOwnProperty("labor")) {
                            // eslint-disable-next-line
                            project.actual.labor.map(mylabor => {
                                if (mylabor.providerid === providerid) {
                                    labor.push(mylabor)
                                }
                            })
                        }
                    })
                }
            }
        }
        return labor;
    }

    getschedulebyproviderid(providerid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let labor = [];
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map(project => {
                        if (project.hasOwnProperty("schedulelabor")) {
                            // eslint-disable-next-line
                            project.schedule.labor.map(mylabor => {
                                if (mylabor.providerid === providerid) {
                                    labor.push(mylabor)
                                }
                            })
                        }
                    })
                }
            }
        }
        return labor;
    }

    getNavigation() {
        let navigation = false;
        if (this.props.hasOwnProperty("navigation")) {
            navigation = this.props.navigation;
        }
        return navigation;
    }
    getnavigation() {
        let navigation = false;

        if (this.props.navigation) {
            if (this.props.navigation.hasOwnProperty("position")) {
                navigation = this.props.navigation.position;
            }


        }
        return navigation;
    }
    getbenefitbyid(providerid, benefitid) {
        const dynamicstyles = new DynamicStyles();
        const benefits = dynamicstyles.getemployeebenefitsbyid.call(this, providerid)
        let mybenefit = false;
        if (benefits) {
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.benefitid === benefitid) {
                    mybenefit = benefit;
                }
            })
        }
        return mybenefit;
    }
    getemployeebenefitsbyid(providerid) {
        const dynamicstyles = new DynamicStyles();
        let benefits = false;
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        if (employee.hasOwnProperty("benefits")) {
            benefits = employee.benefits;
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
        if (myaccounts) {
            // eslint-disable-next-line
            myaccounts.map(account => {
                if (account.stripe === stripe) {
                    myaccount = account;
                }
            })

        }
        return myaccount;
    }


    checkactive() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let check = false;
        if (myuser) {
            const employee = dynamicstyles.getemployeebyid.call(this, myuser.providerid);
            if (employee) {
                if (employee.active === 'active') {
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
        if (myuser) {
            const employee = dynamicstyles.getemployeebyid.call(this, myuser.providerid);
            if (employee) {
                if (employee.manager === 'manager') {
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

  

    getpaths() {
        const dynamicstyles = new DynamicStyles();
        const milestones = dynamicstyles.getmilestones.call(this)
        const projectinterval = dynamicstyles.getprojectinterval.call(this);
        let paths = {}


        const getmilestonebyid = (paths, milestoneid) => {
            let mymilestone = false;
            if (paths.hasOwnProperty(milestoneid)) {

                mymilestone = paths[milestoneid]
            }

            return mymilestone;

        }

        const getPathsbyMilestoneID = (milestones, milestoneid) => {

            let path = {};
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        if (predessor.predessor === milestoneid) {
                            path[`${milestone.milestoneid}`] = {};
                            path[`${milestone.milestoneid}`]['type'] = predessor.type



                        }


                    })



                }


            })

            return path;
        }
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                paths[`${milestone.milestoneid}`] = {};
                paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
                paths[`${milestone.milestoneid}`]['start'] = milestone.start
                paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
                paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(milestones, milestone.milestoneid)

            })




            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
            let mymilestones = [];

            // eslint-disable-next-line
            Object.getOwnPropertyNames(paths).map(path => {
                mymilestones.push(path)
            })

            // eslint-disable-next-line
            mymilestones.map((milestoneid, i) => {

                if ((paths[milestoneid]).hasOwnProperty("paths")) {



                    if (Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {

                        // eslint-disable-next-line
                        Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop => {

                            const milestone_2 = getmilestonebyid(paths, prop)
                            let params = {};
                            let params_2 = {};
                            if (milestone_2) {

                                if (scale === 'month') {
                                    params = calculatemonth(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculatemonth(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'year') {
                                    params = calculateyear(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateyear(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'day') {
                                    params = calculateday(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateday(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                }
                            }
                            const y1 = 80 + 100 * (dynamicstyles.getmilestonekeybyid.call(this, milestoneid));
                            const y2 = 80 + 100 * (dynamicstyles.getmilestonekeybyid.call(this, prop));
                            let x1 = "";
                            if (paths[milestoneid].paths[prop].type === 'start-to-finish') {
                                x1 = params.xo + params.width;
                            } else if (paths[milestoneid].paths[prop].type === 'start-to-start') {
                                x1 = params.xo;
                            }
                            paths[milestoneid].paths[prop]['x1'] = x1;
                            paths[milestoneid].paths[prop]['y1'] = y1
                            paths[milestoneid].paths[prop]['y2'] = y2
                            paths[milestoneid].paths[prop]['x2'] = params_2.xo
                            paths[milestoneid].paths[prop]['float'] = 'float';


                        })

                    }


                }


            })
        }


        let milestone_1 = "";
        let milestone_2 = "";
        for (let myprop in paths) {
            milestone_1 = getmilestonebyid(paths, myprop)



            for (let mypath in paths[myprop]['paths']) {
                milestone_2 = getmilestonebyid(paths, mypath)
                let float = calculateFloat(milestone_1.completion, milestone_2.start)
                paths[myprop]['paths'][mypath]['float'] = float
            }

        }

        return paths;
    }

    checkemptypathsbymilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const paths = dynamicstyles.getpaths.call(this)
        const path = paths[milestoneid];
        let empty = false;
        if (checkemptyobject(path.paths)) {
            empty = true;
        }
        return empty;
    }



    getlagbymilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const milestones = dynamicstyles.getmilestones.call(this);
        let lag = 0;

        const checklag = (startdate, enddate, i, lag) => {
            let replacelag = false;


            const check = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))


            if (i === 0 && check > 0) {
                replacelag = true;
            } else if (check < lag) {
                replacelag = true;
            }



            return replacelag;
        }

        if (milestones) {
            const mymilestone = dynamicstyles.getmilestonebyid.call(this, milestoneid);
            if (mymilestone) {

                const startdate = getDateTime(mymilestone.start);

                if (mymilestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    mymilestone.predessors.map((predessor, i) => {

                        const enddate = getDateTime(dynamicstyles.getmilestonebyid.call(this, predessor.predessor).completion)

                        if (startdate >= enddate && checklag(startdate, enddate, i, lag)) {
                            lag = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))
                        }

                    })
                }

            }
        }
        return lag;
    }

    calcTotalProjectFloat(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const paths = dynamicstyles.getpaths.call(this)
        let checkcalc = true
        let i = 0;
        let activemilestoneid = milestoneid;
        while (checkcalc) {


            window[`checkfloat_${i.toString()}`] = 0;


            let j = 0;
            checkcalc = false;
            for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {

                if (!dynamicstyles.checkemptypathsbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    checkcalc = true
                }


                if (j === 0 || window[`checkfloat_${i.toString()}`] > dynamicstyles.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    window[`checkfloat_${i.toString()}`] = dynamicstyles.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])
                    activemilestoneid = window[`mypath_${i.toString()}`]
                }
                j += 1
            }

            i += 1;

        }
        let float = dynamicstyles.getfloatbymilestoneid.call(this, milestoneid)
        let projectfloat = 0;
        for (let k = 0; k < i; k++) {
            projectfloat += Number(window[`checkfloat_${k.toString()}`])
        }
        return float + projectfloat
    }

    getfloatbymilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const paths = dynamicstyles.getpaths.call(this)
        let float = 0;
        let i = 0;
        for (let mypath in paths[milestoneid]['paths']) {

            let floatcheck = paths[milestoneid]['paths'][mypath]['float']

            if (floatcheck < float || i === 0) {
                float = floatcheck

            }

            i += 1;
        }
        return float;

    }

    getprojectinterval() {
        const dynamicstyles = new DynamicStyles();
        const milestones = dynamicstyles.getmilestones.call(this)
        let interval = false;
        if (milestones) {
            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            }
            )
            const start = milestones[0].start;
            const completion = milestones[milestones.length - 1].completion;
            interval = { start, completion }
        }
        return interval;

    }
  
    async appleSignIn(type) {
        const dynamicstyles = new DynamicStyles();
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;

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

            let profile = this.state.profile;
            this.setState({ client, clientid, profile, firstname, lastname, profileurl, phonenumber, emailaddress })
            dynamicstyles.clientlogin.call(this, type)

        } catch (err) {
            alert(err)
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

                company = myuser.company;
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
    getequipmentcostskeybyid(equipmentid, costid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)

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
 
    getbenefitkeybyid(providerid, benefitid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        let employee = dynamicstyles.getemployeebyid.call(this, providerid);
        // eslint-disable-next-line


        if (employee) {

            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.map((benefit, i) => {
                    if (benefit.benefitid === benefitid) {
                        key = i;
                    }
                })
            }
        }



        return key
    }

    calculateLaborRatebyID(providerid) {
        const dynamicstyles = new DynamicStyles();
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        let sum = 0;
        if (employee) {
            const benefits = dynamicstyles.getemployeebenefitinterval.call(this, providerid);

            if (benefits.length > 0) {
                // eslint-disable-next-line
                benefits.map(benefit => {
                    sum += Number(benefit.amount)
                })
            }

        }
        const workinghours = Number(employee.workinghours)
        const laborrate = workinghours > 0 ? sum / workinghours : 0;
        return laborrate;
    }
    getButtonSize() {
        if (this.state.width > 1200) {
            return ({ width: '60px' })

        } else if (this.state.width > 600) {
            return ({ width: '50px' })

        } else {
            return ({ width: '40px' })

        }
    }

    getemployeebenefitinterval(providerid) {
        const dynamicstyles = new DynamicStyles();
        let benefits = [];
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        if (employee) {
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.map(benefit => {
                    let interval = getBenefitInterval(benefit.frequency, Number(benefit.amount), benefit.benefit, benefit.accountid)
                    benefits = [...benefits, ...interval]
                })
            }
        }

        return benefits;
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
                        myuser.company.accounts[i].accountid = replaceids.accountid;
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
                        myuser.company.equipment[k].equipmentid = equipmentid;
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
                        let m = dynamicstyles.getequipmentcostskeybyid.call(this, equipmentid, oldcostid)

                        myuser.company.equipment[l].ownership.cost[m].costid = costid;
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
                        let o = dynamicstyles.getbenefitkeybyid.call(this, providerid, oldbenefitid)
                        myuser.company.employees[n].benefits[o].benefitid = benefitid;
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
            company.equipment.map(myequipment => {
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
        if (company.hasOwnProperty("employees")) {
            // eslint-disable-next-line
            company.employees.map(employee => {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.map(benefit => {
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
    gettransformedcostsbyequimentid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const equipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)

        let costarray = [];
        if (equipment) {

            if (equipment.hasOwnProperty("ownership")) {
                const purchase = Number(equipment.ownership.purchase);
                const purchasedate = equipment.ownership.purchasedate;
                const salvage = Number(equipment.ownership.resalevalue);
                const saledate = equipment.ownership.saledate;
                const apr = Number(equipment.ownership.loaninterest);
                // validate
                const validate = validateLoanPayment(purchase, purchasedate, salvage, saledate, apr)
                let payments = [];
                if (validate) {

                    payments = getRepaymentCosts(purchase, purchasedate, salvage, saledate, apr);
                    costarray = [...costarray, ...payments]

                } else if (purchase && !apr) {

                    payments = getInterval(saledate, purchasedate, 'monthly', ((purchase - salvage) / calculateTotalMonths(purchasedate, saledate)), 'ownership')
                    costarray = [...costarray, ...payments]

                }


                if (equipment.ownership.hasOwnProperty("cost")) {

                    // eslint-disable-next-line
                    equipment.ownership.cost.map(cost => {


                        if (cost.hasOwnProperty("reoccurring")) {



                            if (equipment.hasOwnProperty("ownership")) {


                                const reoccurringcosts = getInterval(equipment.ownership.saledate, equipment.ownership.purchasedate, cost.reoccurring.frequency, cost.cost, cost.detail)

                                costarray = [...costarray, ...reoccurringcosts]

                            }


                        } else {

                            costarray.push(newCost(cost.costid, cost.detail, cost.purchasedate, cost.cost))

                        }


                    })




                }

            }

            //

        }
        return costarray;
    }
    async saveCompany() {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this, myuser.getemployeebyproviderid);
            if (checkmanager) {
                let params = dynamicstyles.getCompanyParams.call(this)

                const validate = dynamicstyles.validateCompany(params);
                if (validate.validate) {
                    try {
                        this.setState({ spinner: true })
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
                        let message = "";
                        if (response.hasOwnProperty("message")) {
                            let dateupdated = formatTimeString(convertUTCTime(response.lastupdated))
                            message = `${response.message} Last Updated ${dateupdated}`
                        }
                        this.setState({ message, spinner: false })

                    } catch (err) {
                        alert(err)
                        this.setState({ spinner: false })
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
        try {
            let dynamicstyles = new DynamicStyles();
            let myuser = dynamicstyles.getuser.call(this)
            let user = { providerid: myuser.providerid, firstname: myuser.firstname, lastname: myuser.lastname, emailaddress: myuser.emailaddress, phonenumber: myuser.phonenumber, profileurl: myuser.profileurl, profile: myuser.profile }
            this.setState({ spinner: true })
            let response = await SaveProfile({ myuser: user })
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
                let lastupdated = formatTimeString(convertUTCTime(response.lastupdated))
                message = `${response.message} Last updated ${lastupdated}`

            }
            this.setState({ message, spinner: false })

        } catch (err) {
            alert(err)
            this.setState({ spinner: false })
        }

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

    getbidactual() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getproject.call(this)
        let actual = false;
        if (project.hasOwnProperty("actual")) {
            if (project.actual.hasOwnProperty("bid")) {
                actual = project.actual.bid;
            }

        }
        return actual;

    }

    getbidschedule() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getproject.call(this)
        let schedule = false;
        if (project.hasOwnProperty("schedule")) {

            if (project.actual.hasOwnProperty("bidschedule")) {
                schedule  = project.schedule.bidschedule;
            }

        }
        return schedule ;

    }

    getbidschedulekeybyid(csiid) {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getbidschedule.call(this)
        let key = false;
        if (schedule) {
            // eslint-disable-next-line
            schedule.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;

    }

    getbidactualkeybyid(csiid) {
        const dynamicstyles = new DynamicStyles();
        const actual = dynamicstyles.getbidactual.call(this)
        let key = false;
        if (actual) {
            // eslint-disable-next-line
            actual.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;

    }

    getbidactualbyid(csiid) {
        const dynamicstyles = new DynamicStyles();
        const actual = dynamicstyles.getbidactual.call(this)
        let myitem = false;
        if (actual) {
            // eslint-disable-next-line
            actual.map(item => {
                if (item.csiid === csiid) {
                    myitem = item;
                }
            })
        }
        return myitem;

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
                        myuser.company.projects[i].schedule.equipment[j].equipmentid = myequipment.equipmentid;
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
                        myuser.company.projects[i].schedulematerials.mymaterial[j].materialid = mymaterial.materialid;
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
                        myuser.company.projects[i].schedule.labor[k].laborid = mylabor.laborid;
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
                        myuser.company.projects[i].actual.equipment[l].equipmentid = myequipment.equipmentid;
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
                        myuser.company.projects[i].actualmaterials.mymaterial[m].materialid = mymaterial.materialid;
                        this.props.reduxUser(myuser);
                        if (this.state.activematerialid === mymaterial.oldmaterialid) {
                            this.setState({ activematerialid: mymaterial.materialid })
                        }

                    })
                }


                if (response.projectids.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    response.projectids.actuallabor.map(mylabor => {
                        const n = dynamicstyles.getactuallaborkeybyid.call(this, mylabor.oldlaborid);
                        myuser.company.projects[i].actual.labor[n].laborid = mylabor.laborid;
                        this.props.reduxUser(myuser);
                        if (this.state.activelaborid === mylabor.oldlaborid) {
                            this.setState({ activelaborid: mylabor.laborid })
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
            if (project.schedulelabor) {
                // eslint-disable-next-line
                project.schedule.labor.map(mylabor => {
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
        }

        if (project.hasOwnProperty("labor")) {

            if (project.actuallabor) {
                // eslint-disable-next-line
                project.actual.labor.map(mylabor => {
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
        }

        if (project.hasOwnProperty("schedulematerials")) {
            if (project.schedulematerials) {
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
        }

        if (project.hasOwnProperty("actualmaterials")) {
            if (project.actualmaterials) {
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
        }
        if (project.hasOwnProperty("scheduleequipment")) {
            if (project.scheduleequipment) {
                // eslint-disable-next-line
                project.schedule.equipment.map(myequipment => {
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


        }
        if (project.hasOwnProperty("actualequipment")) {
            if (project.actualequipment) {
                // eslint-disable-next-line
                project.actual.equipment.map(myequipment => {
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


        }
        return validate;
    }
    async savemyproject() {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {

            const project = dynamicstyles.getproject.call(this)
            if(project) {

                const projectid = project.projectid;
                // let validatecompany = dynamicstyles.validateCompany.call(this);
                // let validateproject = dynamicstyles.validateProject.call(this)
           
                        try {
                            this.setState({ spinner: true })
                            let response = await SaveProject({myuser, projectid})

                            // dynamicstyles.handlecompanyids.call(this, response)
                            // dynamicstyles.handleprojectids.call(this, response)
                            response = updateTimes(response)
                            console.log(response)

                            if (response.hasOwnProperty("myuser")) {


                                this.props.reduxUser(response.myuser)
                            }

                            let message = "";

                            if (response.hasOwnProperty("message")) {
                                let lastupdated = formatTimeString(convertUTCTime(response.lastupdated))
                                 message = `${response.message} Last updated ${lastupdated}`

                             }

                            this.setState({ message, spinner: false })


                        } catch (err) {
                            alert(err)
                            this.setState({ spinner: false })

                        }



                    }

                    

                } 


    }

    showsaveprofile() {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const saveprojecticon = dynamicstyles.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { dynamicstyles.savemyprofile.call(this) }}>{saveProfileIcon()}</button>
                    </div>
                </div>)

        } else {
            return (<Spinner />)
        }
    }
    showsaveproject() {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const saveprojecticon = dynamicstyles.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { dynamicstyles.savemyproject.call(this) }}>{saveProjectIcon()}</button>
                    </div>
                </div>)

        } else {
            return (<Spinner />)
        }
    }
    async loadprojectspecs(projectid) {
        const construction = new DynamicStyles();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const project = construction.getproject.call(this)

            if (project) {
                const i = construction.getprojectkeybyid.call(this, project.projectid)


                try {
                    let specifications = [];
                    let specs = await LoadSpecifications(projectid);
                    console.log(specs)
                    if (specs.hasOwnProperty("length")) {
                        // eslint-disable-next-line
                        specs.map(spec => {

                            if (spec.hasOwnProperty("specifications")) {
                                // eslint-disable-next-line
                                spec.specifications.map(myspec => {

                                    specifications.push(myspec)
                                })
                            }

                        })

                    }

                    myuser.company.projects[i].specifications = specifications;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })



                } catch (err) {
                    alert(err)
                }

            }

        }

    }

    async validatecompanyid(url) {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            try {

                let response = await ValidateCompanyID(url);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {

                    if (myuser.hasOwnProperty("company")) {
                        myuser.company.invalid = response.invalid;
                        this.props.reduxUser(myuser)
                        this.setState({ message: response.invalid })
                    } else {
                        this.setState({ urlcheck: false, message: response.invalid })
                    }



                } else if (response.hasOwnProperty("valid")) {

                    if (myuser.hasOwnProperty("company")) {
                        if (myuser.company.hasOwnProperty("invalid")) {

                            delete myuser.company.invalid;
                            this.props.reduxUser(myuser)
                            this.setState({ message: '' })

                        }
                    } else {

                        let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
                        this.setState({ urlcheck: true, message })

                    }



                }

            }

            catch (err) {
                alert(err)

            }

        }

    }

    showsavecompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const savecompanyicon = dynamicstyles.getsavecompanyicon.call(this)
        if (!this.state.spinner) {
            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                    {this.state.message}
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...savecompanyicon }} onClick={() => { dynamicstyles.saveCompany.call(this) }}>{saveCompanyIcon()}</button>
                </div>

            </div>
            )

        } else {
            return (<Spinner />)
        }
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

    async clientlogin(type) {
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let profile = this.state.profile;
        let phonenumber = this.state.phonenumber;
        let profileurl = this.state.profileurl;


        let values = { emailaddress, client, clientid, firstname, lastname, profile, phonenumber, profileurl, type }

        try {
            this.setState({ spinner: true })
            let response = await AppleLogin(values)
            this.setState({ spinner: false })
            console.log(response)

            if (response.hasOwnProperty("myuser")) {
                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '', emailaddresscheck: false, profilecheck: false, profile: '', firstname: '', lastname: '', profileurl: '' })
            } else if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }
        } catch (err) {
            alert(err)
        }
    }



    async googleSignIn(type) {
        const dynamicstyles = new DynamicStyles()


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
            let profile = this.state.profile;
            this.setState({ client, clientid, emailaddress, firstname, lastname, profileurl, phonenumber, emailaddresscheck })


            this.setState({ client, clientid, profile, firstname, lastname, profileurl, phonenumber, emailaddress })
            dynamicstyles.clientlogin.call(this, type)









        } catch (error) {
            alert(error)
        }


    }
    getAllActual() {
        const dynamicstyles = new DynamicStyles();

        let actuals = [];
        let myproject = dynamicstyles.getproject.call(this)
        if (myproject.hasOwnProperty("actual")) {

            if (myproject.actual.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                myproject.actual.labor.map(mylabor => {
                    actuals.push(mylabor)
                })
            }
            if (myproject.actual.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                myproject.actual.equipment.map(myequipment => {
                    actuals.push(myequipment)
                })
            }
            if (myproject.actual.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                myproject.actual.materials.map(mymaterial => {
                    actuals.push(mymaterial)
                })

            }

        }
        // eslint-disable-next-line
        actuals.map((myactual, i) => {
            if (myactual.hasOwnProperty("csiid")) {
                let csi = dynamicstyles.getcsibyid.call(this, myactual.csiid)
                myactual.csi = csi.csi
                actuals[i] = myactual;
            }
        })

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


            if (myproject.hasOwnProperty("schedule")) {

                if (myproject.schedule.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    myproject.schedule.labor.map(mylabor => {
                        schedules.push(mylabor)
                    })
                }

                if (myproject.schedule.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myproject.schedule.equipment.map(myequipment => {
                        schedules.push(myequipment)
                    })
                }
                if (myproject.schedule.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    myproject.schedule.materials.map(mymaterial => {
                        schedules.push(mymaterial)
                    })

                }

            }
            // eslint-disable-next-line
            schedules.map((myschedule, i) => {
                if (myschedule.hasOwnProperty("csiid")) {
                    let csi = dynamicstyles.getcsibyid.call(this, myschedule.csiid)
                    myschedule.csi = csi.csi
                    schedules[i] = myschedule;
                }
            })

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
                    myuser.company.projects.map(myproject => {

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
                    myuser.company.projects.map((myproject, i) => {

                        if (myproject.projectid === projectid) {
                            key = i;
                        }
                    })
                }
            }
        }
        return key;
    }
    getprojects() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let projects = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    projects = myuser.company.projects;

                }

            }
        }
        return projects;
    }
    getprojectbyid(projectid) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let projects = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map(myproject => {

                        if (myproject.projectid === projectid) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
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
        const dynamicstyles = new DynamicStyles();
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



    getmyemployees() {
        const dynamicstyles = new DynamicStyles()
        let myuser = dynamicstyles.getuser.call(this);
        let employees = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("employees")) {
                    employees = myuser.company.employees;
                }
            }
        }
        return employees;
    }
    getbidfield() {
        if(this.state.width>1200) {
            return({maxWidth:'100px'})

        } else if (this.state.width>600) {
            return({maxWidth:'80px'})

        } else {

            return({maxWidth:'60px'})

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


    getemployeebyprofile(profile) {
        const dynamicstyles = new DynamicStyles()
        let myemployees = dynamicstyles.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.profile === profile) {
                    employees = employee;
                }
            })
        }
        return employees;
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
            employee.benefits.map(benefit => {
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
                <table width="100%" border="1" style={{ ...regularFont, ...styles.generalFont, ...styles.generalTable }}>
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
            myproject.schedule.equipment.map((myequipment, i) => {
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
        if (myproject.hasOwnProperty("schedule")) {

            if (myproject.schedule.hasOwnProperty("materials")) {
                schedulematerials = myproject.schedule.materials;
            }

        }


        return schedulematerials;
    }
    getactualmaterials() {
        const dynamicstyles = new DynamicStyles();
        let actualmaterials = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("materials")) {
                actualmaterials = myproject.actual.materials;
            }

        }
        return actualmaterials;
    }


    getactuallabor() {
        const dynamicstyles = new DynamicStyles();
        let actuallabor = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("labor")) {
                return myproject.actual.labor;
            }


        }


        return actuallabor;
    }

    getschedulelabor() {
        const dynamicstyles = new DynamicStyles();
        let schedulelabor = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("schedule")) {
            if (myproject.schedule.hasOwnProperty("labor")) {
                return myproject.schedule.labor;
            }


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
        if (myproject.hasOwnProperty("schedule")) {
            if (myproject.schedule.hasOwnProperty("equipment")) {
                scheduleequipment = myproject.schedule.equipment;
            }

        }
        return scheduleequipment;
    }
    getactualequipment() {
        const dynamicstyles = new DynamicStyles();
        let actualequipment = false;
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("equipment")) {
                actualequipment = myproject.actual.equipment;
            }

        }
        return actualequipment;
    }

    getactualequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        let myequipments = dynamicstyles.getactualequipment.call(this);
        if (myequipments) {
            // eslint-disable-next-line
            myequipments.map((myequipment, i) => {
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
        } else if (this.state.wisth > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '37px' })
        } else {
            return ({ width: '30px' })
        }
    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
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

    getaccounts() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        let accounts = false;
        if (company.hasOwnProperty("office")) {
            let office = company;
            if (office.hasOwnProperty("accounts")) {
                accounts = company.accounts;

            }
        }
        return accounts;
    }

    getmyequipmentbyid(equipmentid) {

        const dynamicstyles = new DynamicStyles();
        let equipments = false;

        let myequipment = dynamicstyles.getmyequipment.call(this)

        // eslint-disable-next-line
        myequipment.map((equipment) => {

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


    gettransfers() {
        const dynamicstyles = new DynamicStyles();
        const projects = dynamicstyles.getmyprojects.call(this)

        let transfers = [];
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {

                if (myproject.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    myproject.actual.labor.map(mylabor => {
                        if (mylabor.hasOwnProperty("actualtransfers")) {
                            // eslint-disable-next-line
                            mylabor.actualtransfers.map(transfer => {
                                transfers.push(transfer)
                            })

                        }
                    })

                }

                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.hasOwnProperty("actualtransfers")) {
                            // eslint-disable-next-line
                            mymaterial.actualtransfers.map(transfer => {
                                transfers.push(transfer)
                            })

                        }
                    })

                }

                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actual.equipment.map(myequipment => {
                        if (myequipment.hasOwnProperty("actualtransfers")) {
                            // eslint-disable-next-line 
                            myequipment.actualtransfers.map(transfer => {
                                transfers.push(transfer)
                            })

                        }
                    })

                }


            })
        }
        return transfers;
    }


    getprojectbymilestoneid(milestoneid) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let myproject = false;
        if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.company.projects.map(project => {
                    if (project.hasOwnProperty("projectmilestones")) {
                        // eslint-disable-next-line
                        project.projectmilestones.mymilestone.map(milestone => {
                            if (milestone.milestoneid === milestoneid) {
                                myproject = project;
                            }
                        })
                    }
                })
            }
        }
        return myproject;
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

    getcsis() {
        let csis = false;
        if (this.props.csis) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }
    getcsibyid(csiid) {
        let csi = false;
        let dynamicstyles = new DynamicStyles();
        const csis = dynamicstyles.getcsis.call(this)
        if (csis) {
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
            if (myproject.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                myproject.actual.labor.map(mylabor => {
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
                myproject.actual.equipment.map(myequipment => {

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
        let mymaterials = dynamicstyles.getschedulematerials.call(this);
        let key = false;
        if (mymaterials) {

            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })


        }
        return key;
    }
    getschedulematerialbyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let material = false;
        let mymaterials = dynamicstyles.getschedulematerials.call(this)
        if (mymaterials) {
            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }

            })
        }
        return material;

    }

    getactualmaterialkeybyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let mymaterials = dynamicstyles.getactualmaterials.call(this)
        let key = false;
        if (mymaterials) {

            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })


        }
        return key
    }

    updateinvoice(invoiceid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);


        if (myuser) {
            const myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                const i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid)
                const myinvoice = dynamicstyles.getinvoicebyid.call(this, invoiceid)
                if (myinvoice) {

                  
                    myuser.company.projects[i].actual.updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    updateproposal(proposalid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {
            const myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                const i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid)
                const myproposal = dynamicstyles.getproposalbyid.call(this, proposalid)
                if (myproposal) {

                 

                    myuser.company.projects[i].schedule.updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }
    getactualmaterialbyid(materialid) {
        const dynamicstyles = new DynamicStyles();
        let material = false;
        const mymaterials = dynamicstyles.getactualmaterials.call(this)
        if (mymaterials) {
            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }
            })
        }


        return material;
    }
    getscheduleequipmentkeybyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let myequipments = dynamicstyles.getscheduleequipment.call(this)
        let key = false;
        if (myequipments) {
            // eslint-disable-next-line
            myequipments.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i
                }
            })


        }
        return key;
    }
    getscheduleequipmentbyid(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let equipment = false;
        const myequipment = dynamicstyles.getscheduleequipment.call(this)
        if (myequipment) {
// eslint-disable-next-line
            myequipment.map((myequipment, i) => {
                
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
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

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.bottomMargin15 }} key={item.equipmentid}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }}>
                    <span onClick={() => { this.addItem(item) }}>{myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}
                    Total Hours:{totalhours.toFixed(2)} x $ </span>
                    <input type="text" style={{ ...styles.generalFont, ...smallFont, ...largeField }}
                        onChange={event => { this.handleequipmentrate(event.target.value, item.equipmentid) }}
                        value={equipmentrate} />
                    <span onClick={() => { this.addItem(item) }}> = {amount} x {+Number(1 + profit).toFixed(4)}= ${Number(amount * (1 + profit)).toFixed(2)}</span>
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
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.bottomMargin15 }} key={item.materialid}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }} >
                    <span onClick={() => { this.addItem(item) }}> {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}</span>
                    <input type="text"
                        value={item.quantity}
                        onChange={event => { this.handlematerialquantity(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldLarge }} />
                    <span onClick={() => { this.addItem(item) }}> x $</span>
                    <input type="text" value={item.unitcost}
                        onChange={event => { this.handlematerialunitcost(event.target.value, item.materialid) }}
                        style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />
                    <span onClick={() => { this.addItem(item) }}> / </span>
                    <input type="text" value={item.unit} onChange={event => { this.handlematerialunit(event.target.value, item.materialid) }} style={{ ...styles.generalFont, ...smallFont, ...proposalFieldSmall }} />
                    <span onClick={() => { this.addItem(item) }}> = ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</span>
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
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.bottomMargin15 }} key={item.laborid}>

                <div style={{ ...styles.flex3, ...this.getactivebackground(item) }}>
                    <span onClick={() => { this.addItem(item) }}>{employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  $</span>
                    <input type="text" value={item.laborrate} style={{ ...styles.generalFont, ...largeField, ...smallFont }} onChange={event => { this.handlelaborrate(event.target.value, item.laborid) }} />
                    <span onClick={() => { this.addItem(item) }}>= ${amount.toFixed(2)} x {+Number(profit).toFixed(4)} = ${Number(amount * profit).toFixed(2)}</span>
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



    calculateequipmentratebyownership(equipmentid) {
        let equipmentrate = 0;
        let totalamount = 0;
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)
        if (myequipment) {
            const costs = dynamicstyles.gettransformedcostsbyequimentid.call(this, equipmentid);

            if (costs.length > 0) {

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


                const totalworkinghours = () => {
                    let annual = Number(myequipment.ownership.workinghours);
                    let years = Period() / 12;

                    return (Math.round(annual * years))
                }
                // eslint-disable-next-line
                costs.map(cost => {

                    totalamount += Number(cost.amount);
                })


                if (totalworkinghours() > 0) {
                    equipmentrate = totalamount / totalworkinghours()

                }



            }


        }




        return equipmentrate;
    }
    getcostbyid(equipmentid, costid) {

        const dynamicstyles = new DynamicStyles();
        let costs = false;
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)

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
                    myuser.company.equipment.map(myequipment => {
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
        let equipment = false;
        const myequipment = dynamicstyles.getactualequipment.call(this)
        if (myequipment) {
// eslint-disable-next-line
            myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })


        }
        return equipment;
    }


    getactuallaborbyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let mylabors = dynamicstyles.getactuallabor.call(this)
        let labor = false

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })

        }

        return labor;
    }
    getschedulelaborbyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let mylabors = dynamicstyles.getschedulelabor.call(this)
        let labor = false

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })

        }

        return labor;
    }

    getschedulelaborkeybyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let mylabors = dynamicstyles.getschedulelabor.call(this)
        let key = false;

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {

                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })

        }

        return key;
    }

    getactuallaborkeybyid(laborid) {
        const dynamicstyles = new DynamicStyles();
        let mylabors = dynamicstyles.getactuallabor.call(this)
        let key = false;

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {

                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })

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
            if (mycompany.hasOwnProperty("accounts")) {
                myaccounts = mycompany.accounts;
            }
        }
        return myaccounts;
    }

    touchtoedit() {

        if (this.state.width > 1200) {
            return ({ width: '80px' })
        } else {
            return ({ width: '60px' })
        }
    }


    buttonSize() {
        if (this.state.width > 1200) {
            return ({ width: '60px' })

        } else if (this.state.width > 600) {
            return ({ width: '50px' })

        } else {
            return ({ width: '40px' })

        }
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
                projects = company.projects
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
                    equipment = myuser.company.equipment;
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