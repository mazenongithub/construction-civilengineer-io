import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles'
import {
    inputUTCStringForLaborID,
    calculatetotalhours,
    formatDateStringDisplay,
    getMonthfromTimein,
    getDayfromTimein,
    getYearfromTimein,
    getHoursfromTimein,
    getMinutesfromTimein,
    getAMPMfromTimeIn,
    makeTimeString,
    UTCTimeStringfromTime,
    CreateScheduleLabor,
    CreateScheduleEquipment,
    CreateMyMaterial,
    isNumeric
} from './functions'
import DynamicStyles from './dynamicstyles'
import TimeIn from './scheduletimein';
import TimeOut from './scheduletimeout'
import MaterialDate from './scheduledate'
import { removeIconSmall } from './svg'
import MilestoneID from './milestoneid';
import CSI from './csi'
import MakeID from './makeids';
import EmployeeID from './employeeid'
import EquipmentID from './equipmentid';
import MaterialID from './materialid';
import ScheduleView from './scheduleview'

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, active: '', activelaborid: false, activeequipmentid: false, activematerialid: false, providerid: '', timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', csi_1: '', csi_2: '', csi_3: '', csi_4: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', milestoneid: '', csiid: '', laborrate: 0, equipmentrate: 0, mymaterialid: '', myequipmentid: '', materialdateday: '', materialdatemonth: '', materialdateyear: '', quantity: '', unit: '', unitcost: '', calendertimein: true, calendertimeout: true, materialcalender: true }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid)
        if(myproject) {
        
            this.props.reduxProject({ projectid: myproject.projectid})
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    materialdatedefault() {
        const materialdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const materialdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const materialdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ materialdateyear: materialdateyear(), materialdatemonth: materialdatemonth(), materialdateday: materialdateday() })
    }


    timeoutdefault() {
        const timeoutmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeoutday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeoutyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeouthours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeoutminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeoutampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeoutmonth: timeoutmonth(), timeoutday: timeoutday(), timeoutyear: timeoutyear(), timeouthours: timeouthours(), timeoutminutes: timeoutminutes(), timeoutampm: timeoutampm() })
    }
    timeindefault() {
        const timeinmonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const timeinday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const timeinyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const timeinhours = () => {
            let hours = new Date().getHours();
            if (hours > 12) {
                hours = hours - 12;
            }
            if (hours < 10) {
                hours = `0${hours}`
            }
            return hours;
        }
        const timeinminutes = () => {
            let minutes = new Date().getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            return minutes;
        }
        const timeinampm = () => {
            const hours = new Date().getHours();
            if (hours < 12) {
                return 'am'
            } else {
                return 'pm'
            }
        }
        this.setState({ timeinmonth: timeinmonth(), timeinday: timeinday(), timeinyear: timeinyear(), timeinhours: timeinhours(), timeinminutes: timeinminutes(), timeinampm: timeinampm() })
    }

    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activelaborid && this.state.active === 'labor') {
            const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid)
            if (mylabor) {
                let csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid)
                if (csi) {

                    return `${csi.csi}-${csi.title}`
                }

            }
        } else if (this.state.activematerialid && this.state.active === 'materials') {
            const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid)
            if (mymaterial) {
                let csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid);
                if (csi) {
                    return `${csi.csi}-${csi.title}`
                }
            }
        } else if (this.state.activeequipmentid && this.state.active === 'equipment') {
            const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)

            if (myequipment) {
                let csi = dynamicstyles.getcsibyid.call(this, myequipment.csiid);
                if (csi) {
                    return `${csi.csi}-${csi.title}`
                }
            }

        } else if (this.state.csiid) {

            let csi = dynamicstyles.getcsibyid.call(this, this.state.csiid);
            if (csi) {
                return `${csi.csi}-${csi.title}`
            }
        }

    }

    getmilestoneid() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let milestoneid = this.state.milestoneid;
        if (project) {

            if (this.state.active === 'labor') {
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid);
                    milestoneid = mylabor.milestoneid;
                } else {
                    milestoneid = this.state.milestoneid;
                }

            } else if (this.state.active === 'equipment') {
                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid);
                    milestoneid = myequipment.milestoneid;
                }

            } else if (this.state.active === 'materials') {

                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                    milestoneid = mymaterial.milestoneid;
                }

            }

        }
        return milestoneid;

    }

    handlecsiid(csiid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const csi = dynamicstyles.getcsibyid.call(this, csiid);
            if (csi) {

                const csi_1 = csi.csi.substring(0, 2)
                const csi_2 = csi.csi.substring(2, 4);
                const csi_3 = csi.csi.substring(4, 6);
                let csi_4 = "";
                if (csi.csi.length > 6) {
                    csi_4 = csi.csi.substring(7, 9);
                }
                this.setState({ csi_4, csi_3, csi_2, csi_1 })
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    if (this.state.active === 'labor') {

                        if (this.state.activelaborid) {
                            const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid);
                            if (mylabor) {
                                const j = dynamicstyles.getschedulelaborkeybyid.call(this, this.state.activelaborid)
                                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            this.setState({ csiid })
                        }

                    } else if (this.state.active === 'materials') {

                        if (this.state.activematerialid) {
                            const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                            if (mymaterial) {
                                const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid);
                                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            this.setState({ csiid })
                        }

                    } else if (this.state.active === 'equipment') {

                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {
                                const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].csiid = csiid;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            this.setState({ csiid })
                        }

                    } else {
                        this.setState({ csiid })
                    }

                }

            }

        }

    }

    handlemilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                if (this.state.active === 'labor') {

                    if (this.state.activelaborid) {
                        const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid);
                        if (mylabor) {
                            const j = dynamicstyles.getschedulelaborkeybyid.call(this, this.state.activelaborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ milestoneid })
                    }

                } else if (this.state.active === 'materials') {

                    if (this.state.activematerialid) {
                        const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                        if (mymaterial) {
                            const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ milestoneid })
                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid);
                        if (myequipment) {
                            const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].milestoneid = milestoneid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ milestoneid })
                    }

                } else {
                    this.setState({ milestoneid })
                }

            }

        }

    }





    getequipmentid() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let equipmentid = "";
        if (project) {

            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {
                    equipmentid = myequipment.myequipmentid;
                }
            } else {
                equipmentid = this.state.myequipmentid;
            }

        }
        return equipmentid;
    }


    removelaborid(labor) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (window.confirm(`Are you sure you want to delete labor for ${labor.providerid}`)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    const mylabor = dynamicstyles.getschedulelaborbyid.call(this, labor.laborid);
                    if (mylabor) {
                        const j = dynamicstyles.getschedulelaborkeybyid.call(this, mylabor.laborid);
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.splice(j, 1);
                        this.props.reduxUser(myuser)
                        this.reset();
                    }
                }
            }

        }

    }
    getemployeeid() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (project) {

            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid)
                if (mylabor) {

                    return mylabor.providerid;
                }
            } else {
                return this.state.providerid;
            }

        }
    }

    makematerialactive(materialid) {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (project) {

            if (this.state.activematerialid === materialid) {
                this.materialdatedefault();
                this.setState({ activematerialid: false })
                this.reset()

            } else {

                const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, materialid)
                if (mymaterial) {
                    const materialdateyear = mymaterial.timein.substring(0, 4)
                    const materialdatemonth = mymaterial.timein.substring(5, 7);
                    const materialdateday = mymaterial.timein.substring(8, 10);

                    const csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid);
                    const csi_1 = csi.csi.substring(0, 2)
                    const csi_2 = csi.csi.substring(2, 4);
                    const csi_3 = csi.csi.substring(4, 6);
                    let csi_4 = "";
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }

                    this.setState({ materialdatemonth, materialdateday, materialdateyear, activematerialid: materialid, csi_1, csi_2, csi_3, csi_4 })

                }

            }

        }

    }

    makeequipmentactive(equipmentid) {

        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (project) {

            if (this.state.activeequipmentid === equipmentid) {

                this.setState({ activeequipmentid: false })
                this.reset();
            } else {

                const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, equipmentid)

                if (myequipment) {

                    const timeinmonth = getMonthfromTimein(myequipment.timein);
                    const timeinday = getDayfromTimein(myequipment.timein);
                    const timeinyear = getYearfromTimein(myequipment.timein)
                    const timeinhours = getHoursfromTimein(myequipment.timein)
                    const timeinminutes = getMinutesfromTimein(myequipment.timein)
                    const timeinampm = getAMPMfromTimeIn(myequipment.timein)

                    const timeoutmonth = getMonthfromTimein(myequipment.timeout);
                    const timeoutday = getDayfromTimein(myequipment.timeout);
                    const timeoutyear = getYearfromTimein(myequipment.timeout)
                    const timeouthours = getHoursfromTimein(myequipment.timeout)
                    const timeoutminutes = getMinutesfromTimein(myequipment.timeout)
                    const timeoutampm = getAMPMfromTimeIn(myequipment.timeout);

                    const csi = dynamicstyles.getcsibyid.call(this, myequipment.csiid);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                    }
                    this.setState({ activeequipmentid: equipmentid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, csi_1, csi_2, csi_3, csi_4 })

                }
            }

        }
    }

    makelaboractive(laborid) {

        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (project) {

            if (this.state.activelaborid === laborid) {
                this.reset();
                this.setState({ activelaborid: false })
            } else {

                const mylabor = dynamicstyles.getschedulelaborbyid.call(this, laborid)

                if (mylabor) {

                    const timeinmonth = getMonthfromTimein(mylabor.timein);
                    const timeinday = getDayfromTimein(mylabor.timein);
                    const timeinyear = getYearfromTimein(mylabor.timein)
                    const timeinhours = getHoursfromTimein(mylabor.timein)
                    const timeinminutes = getMinutesfromTimein(mylabor.timein)
                    const timeinampm = getAMPMfromTimeIn(mylabor.timein)

                    const timeoutmonth = getMonthfromTimein(mylabor.timeout);
                    const timeoutday = getDayfromTimein(mylabor.timeout);
                    const timeoutyear = getYearfromTimein(mylabor.timeout)
                    const timeouthours = getHoursfromTimein(mylabor.timeout)
                    const timeoutminutes = getMinutesfromTimein(mylabor.timeout)
                    const timeoutampm = getAMPMfromTimeIn(mylabor.timeout);

                    const csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid);
                    let csi_1 = "";
                    let csi_2= "";
                    let csi_3 = "";
                    let csi_4 = "";
                    if(csi) {
                     csi_1 = csi.csi.substring(0, 2)
                     csi_2 = csi.csi.substring(2, 4);
                     csi_3 = csi.csi.substring(4, 6);
              
                    if (csi.csi.length > 6) {
                        csi_4 = csi.csi.substring(7, 9);
                    }
                }


                    this.setState({ activelaborid: laborid, timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm, timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm, csi_1, csi_2, csi_3, csi_4 })

                }
            }

        }
    }

    getSchedule() {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this);
        return schedule;

    }

    showlaborid(labor) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const removeIcon = dynamicstyles.getremoveicon.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, labor.csiid);
        let employee = dynamicstyles.getemployeebyid.call(this, labor.providerid)
        let hourlyrate = labor.laborrate;
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (project) {

            const milestone = dynamicstyles.getmilestonebyid.call(this, labor.milestoneid)


            const getbutton = () => {
                if (this.state.activelaborid === labor.laborid) {
                    return (styles.activeButton);
                } else {
                    return (styles.generalButton);
                }
            }
         

            const getactivelaborbackground = (laborid) => {
                if (this.state.activelaborid === laborid) {
                    return styles.activeBackground;
                }

            }

            if (this.state.active === 'labor') {

                return (
                    <div key={labor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                        <span style={{ ...getactivelaborbackground(labor.laborid) }} onClick={() => { this.makelaboractive(labor.laborid) }}>
                            {employee.firstname} {employee.lastname}: {labor.description} Milestone {milestone.milestone} CSI:{csi.csi}-{csi.title}<br />
                From {inputUTCStringForLaborID(labor.timein)} to {inputUTCStringForLaborID(labor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(labor.timeout, labor.timein)} Hrs = ${(Number(calculatetotalhours(labor.timeout, labor.timein)) * hourlyrate).toFixed(2)}
                        </span>
                        <button style={{ ...getbutton(), ...removeIcon }} onClick={() => { this.removelaborid(labor) }}>{removeIconSmall()} </button>
                    </div>)

            }

        }

    }
    showlaborids() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let laborids = [];
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (project) {
                const labors = dynamicstyles.getschedulelabor.call(this)
                if (labors) {
                    // eslint-disable-next-line
                    labors.map(labor => {
                        const checkmanager = dynamicstyles.checkmanager.call(this)
                        if (checkmanager || labor.providerid === myuser.providerid) {
                            laborids.push(this.showlaborid(labor))
                        }


                    })
                }

            }

        }
        return laborids;

    }

    removematerial(mymaterial) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const material = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        if (window.confirm(`Are you sure you want to delete material for ${material.material}`)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    const material = dynamicstyles.getschedulematerialbyid.call(this, mymaterial.materialid)
                    if (material) {
                        const j = dynamicstyles.getschedulematerialkeybyid.call(this, material.materialid)
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.splice(j, 1)
                        this.props.reduxUser(myuser)
                        this.reset();

                    }

                }

            }

        }
    }

    reset() {
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
        this.setState({ quantity: '', unit: '', unitcost: '', laborrate: '', equipmentrate: '', activeequipmentid:'', activematerialid:'', activelaborid:'' })

    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = dynamicstyles.getremoveicon.call(this)
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        const csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid);
        const material = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        const getbutton = () => {
            if (this.state.activematerialid === mymaterial.materialid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }


        }
        const activebackground = (materialid) => {
            if (this.state.activematerialid === materialid) {
                return (styles.activeBackground)
            }

        }
        if (this.state.active === 'materials') {
            if (project) {

                const milestone = dynamicstyles.getmilestonebyid.call(this, mymaterial.milestoneid)

                return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground(mymaterial.materialid) }} key={mymaterial.materialid}>
                    <span onClick={() => { this.makematerialactive(mymaterial.materialid) }} key={mymaterial.materialid}>{formatDateStringDisplay(mymaterial.timein)} <br />
                        {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
                        {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
                    </span>
                    <button style={{ ...getbutton(), ...removeIcon }} onClick={() => { this.removematerial(mymaterial) }}>{removeIconSmall()} </button>
                </div>)

            }
        }

    }

    showmaterialids() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let materialids = [];
        if (project) {

            const materials = dynamicstyles.getschedulematerials.call(this)
            if (materials) {
                // eslint-disable-next-line
                materials.map(material => {
                    materialids.push(this.showmaterialid(material))
                })
            }

        }
        return materialids;

    }
    removeequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipment.myequipmentid)
        if (window.confirm(`Are you sure you want to delete material for ${myequipment.equipment}`)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, equipment.equipmentid);
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, equipment.equipmentid);
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.splice(j, 1)
                        this.props.reduxUser(myuser)
                        this.reset();
                    }


                }

            }

        }


    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        const csi = dynamicstyles.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const removeIcon = dynamicstyles.getremoveicon.call(this)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        const getbutton = () => {
            if (this.state.activeequipmentid === equipment.equipmentid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }
        }

        const activeequipment = (equipmentid) => {
            if (this.state.activeequipmentid === equipmentid) {
                return (styles.activeBackground)
            }

        }
        if (project) {

            const milestone = dynamicstyles.getmilestonebyid.call(this, equipment.milestoneid)
            const myequipment = dynamicstyles.getequipmentfromid.call(this, equipment.myequipmentid);

            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
                <span style={{ ...activeequipment(equipment.equipmentid) }} onClick={() => { this.makeequipmentactive(equipment.equipmentid) }}>
                    {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
                 CSI: {csi.csi} - {csi.title} Milestone: {milestone.milestone}
                Total Hours: {totalhours} x  {equipmentrate} = ${amount.toFixed(2)}
                </span>
                <button style={{ ...getbutton(), ...removeIcon }}
                    onClick={() => { this.removeequipment(equipment) }}>{removeIconSmall()} </button>
            </div>
            )

        }
    }

    showequipmentids() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let equipmentids = [];
        if (this.state.active === 'equipment') {
            if (project) {

                const equipments = dynamicstyles.getscheduleequipment.call(this)

                if (equipments) {
                    // eslint-disable-next-line
                    equipments.map(equipment => {
                        equipmentids.push(this.showequipmentid(equipment))
                    })
                }

            }


        }
        return equipmentids;

    }
    handleequipmentid(myequipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const makeid = new MakeID();
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (project) {
                const projectid = project.projectid;
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].myequipmentid = myequipmentid;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const equipmentid = makeid.equipmentid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)
                    const engineerid = myuser.providerid;


                    const newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, engineerid, csiid, milestoneid, timein, timeout, equipmentrate, '', 0)

                    const equipments = dynamicstyles.getscheduleequipment.call(this)
                    if (equipments) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        const scheduleequipment = {myequipment:[newEquipment]}
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: equipmentid })


                }
            }
        }
    }

    handleemployeeid(providerid) {
        const dynamicstyles = new DynamicStyles();
        const makeid = new MakeID();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (project) {
                const projectid = project.projectid;
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid)
                    if (mylabor) {
                        const j = dynamicstyles.getschedulelaborkeybyid.call(this, this.state.activelaborid)
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].providerid = providerid;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }
                } else {
                    const laborid = makeid.schedulelaborid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const csiid = this.state.csiid;
                    const dayin = this.state.timeinday;
                    const yearin = this.state.timeinyear;
                    const monthin = this.state.timeinmonth;
                    const hoursin = this.state.timeinhours;
                    const timetimein = this.state.timeinampm;
                    const minutesin = this.state.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                   console.log(timein)
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.state.timeoutday;
                    const yearout = this.state.timeoutyear;
                    const monthout = this.state.timeoutmonth;
                    const hoursout = this.state.timeouthours;
                    const minutesout = this.state.timeoutminutes;
                    const timetimeout = this.state.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const laborrate = dynamicstyles.gethourlyrate.call(this, providerid).toFixed(2)
                    const profit = 0;
                    const engineerid = providerid;

                    const newLabor = CreateScheduleLabor(laborid, engineerid, milestoneid, csiid, timein, timeout, laborrate, '', '', profit)

                    const labors = dynamicstyles.getschedulelabor.call(this)
                    if (labors) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newLabor)
                    } else {
                        const schedulelabor = {mylabor:[newLabor]}
                        myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activelaborid: laborid })
                }
            }
        }
    }

    getequipmentrate() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let equipmentrate = "";
        if (project) {

            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid);
                if (myequipment) {
                    equipmentrate = myequipment.equipmentrate;
                }
            } else {
                equipmentrate = this.state.equipmentrate;
            }

        }


        return equipmentrate;
    }




    getlaborrate() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let laborrate = "";
        if (project) {

            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid);
                if (mylabor) {
                    laborrate = mylabor.laborrate;
                }
            } else {
                laborrate = this.state.laborrate;
            }
        }
        return laborrate;
    }

    handleequipmentrate(equipmentrate) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (isNumeric(equipmentrate)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    if (this.state.activeequipmentid) {
                        const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                        if (myequipment) {
                            const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ equipmentrate })
                    }
                }
            }
        } else {
            this.setState({ equipmentrate })
            alert(`Equipment rate ${equipmentrate} must be numeric `)
        }
    }

    handlelaborrate(laborrate) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (isNumeric(laborrate)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                    if (this.state.activelaborid) {
                        const mylabor = dynamicstyles.getschedulelaborbyid.call(this, this.state.activelaborid)
                        if (mylabor) {
                            const j = dynamicstyles.getschedulelaborkeybyid.call(this, this.state.activelaborid)
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        this.setState({ laborrate })
                    }
                }
            }

        } else {
            alert(`Labor Rate ${laborrate} must be numeric`)
        }
    }
    getquantity() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let quantity = this.state.quantity;
        if (project) {

            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                quantity = mymaterial.quantity;

            }

        }
        return quantity;

    }
    getunit() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let unit = this.state.unit;
        if (project) {

            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                unit = mymaterial.unit;

            }

        }
        return unit;

    }
    getunitcost() {
        const dynamicstyles = new DynamicStyles();
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let unitcost = this.state.unitcost;
        if (project) {

            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                unitcost = mymaterial.unitcost;

            }

        }
        return unitcost;

    }
    handlequantity(quantity) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (isNumeric(quantity)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid)
                        if (mymaterial) {
                            const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ quantity })
                    }
                }
            }

        } else {
            this.setState({ quantity })
            alert(`Quantity ${quantity} must be numeric`)
        }

    }
    handleunit(unit) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid)
                    if (mymaterial) {
                        const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid);
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }
                } else {
                    this.setState({ unit })
                }
            }
        }

    }
    handleunitcost(unitcost) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (isNumeric(unitcost)) {
            if (myuser) {
                const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
                if (project) {
                    const projectid = project.projectid;
                    const i = dynamicstyles.getprojectkeybyid.call(this, projectid);
                    if (this.state.activematerialid) {
                        const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid)
                        if (mymaterial) {
                            const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid);
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        this.setState({ unitcost })
                    }
                }
            }

        } else {
            this.setState({ unitcost })
            alert(`Unit cost ${unitcost} must be numeric`)
        }

    }

    handlemymaterialid(mymaterialid) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const makeid = new MakeID();
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (project) {
                const projectid = project.projectid;
                const i = dynamicstyles.getprojectkeybyid.call(this, projectid)
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        const j = dynamicstyles.getschedulematerialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].mymaterialid = mymaterialid;
                        this.reduxUser({ myuser })
                        this.setState({ render: 'render' })
                    }

                } else {
                    const materialid = makeid.materialid.call(this)
                    const milestoneid = this.state.milestoneid;
                    const mymaterial = dynamicstyles.getmymaterialfromid.call(this, mymaterialid)
                    const csiid = this.state.csiid;
                    const year = this.state.materialdateyear;
                    const day = this.state.materialdateday;
                    const month = this.state.materialdatemonth;
                    const timein = `${year}-${month}-${day}`;
                    const quantity = this.state.quantity;
                    const unitcost = mymaterial.unitcost;
                    const unit = mymaterial.unit;
                    const engineerid = myuser.providerid;
                    const newMaterial = CreateMyMaterial(materialid, mymaterialid, engineerid, milestoneid, csiid, timein, quantity, unit, unitcost, '', 0);
                    const materials = dynamicstyles.getschedulematerials.call(this);
                    if (materials) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)

                    } else {
                        const schedulematerials = {mymaterial:[newMaterial]}
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }

                    this.props.reduxUser(myuser)
                    this.setState({ activematerialid: materialid })

                }
            }
        }

    }

    getmymaterialid() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let materialid = this.state.mymaterialid;
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
            if (project) {


                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getschedulematerialbyid.call(this, this.state.activematerialid)
                    if (mymaterial) {
                        materialid = mymaterial.mymaterialid;
                    }
                }

            }

        }
        return materialid;

    }


    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const buttonheight = dynamicstyles.getbuttonheight.call(this)
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const milestoneid = new MilestoneID();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const csi = new CSI();
        const materialdate = new MaterialDate();
        const employeeid = new EmployeeID();
        const equipmentid = new EquipmentID();
        const materialid = new MaterialID();
        const scheduleview = new ScheduleView();
        const menu = dynamicstyles.getnavigation.call(this)

        const csicodes = dynamicstyles.getcsis.call(this)
        if(!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }
        
        const equipmentrate = () => {
            if (this.state.active === 'equipment' && this.state.activeequipmentid) {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Equipment Rate</span>
                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                value={this.getequipmentrate()}
                                onChange={event => { this.handleequipmentrate(event.target.value) }}

                            />
                        </div>

                    </div>
                )
            }
        }
        const laborrate = () => {
            if (this.state.active === 'labor' && this.state.activelaborid) {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Labor Rate</span>
                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                value={this.getlaborrate()}
                                onChange={event => { this.handlelaborrate(event.target.value) }}

                            />
                        </div>

                    </div>
                )
            }
        }
        const laborbackground = () => {
            if (this.state.active === 'labor') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }
        const equipmentbackground = () => {
            if (this.state.active === 'equipment') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const materialbackground = () => {
            if (this.state.active === 'materials') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const showmaterialquantity = () => {
            if (this.state.active === 'materials') {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getquantity()}
                                    onChange={event => { this.handlequantity(event.target.value) }}
                                />
                            </div>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getunit()}
                                    onChange={event => { this.handleunit(event.target.value) }}
                                />
                            </div>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Unit Cost</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.getunitcost()}
                                    onChange={event => { this.handleunitcost(event.target.value) }}
                                />
                            </div>

                        </div>

                    </div>
                )

            }
        }

        const showtimein = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timein.showtimein.call(this))
            }
        }
        const showtimeout = () => {
            if (this.state.active === 'labor' || this.state.active === 'equipment') {
                return (timeout.showtimeout.call(this))
            }
        }
        const showmaterialdate = () => {
            if (this.state.active === 'materials') {
                return (materialdate.showmaterialdate.call(this))
            }
        }
        const showtimes = () => {
            if (this.state.width > 1200 && menu.open) {


                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {showtimein()}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{...styles.addLeftMargin15}}>
                        {showtimeout()}
                        </div>
                    </div>
                </div>)



            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {showtimein()}
                        {showtimeout()}
                    </div>
                </div>)

            }
        }

        const milestonescsi = () => {

            if (this.state.width > 800) {


                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this)}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {csi.showCSI.call(this)}
                    </div>
                </div>)



            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this)}
                        {csi.showCSI.call(this)}
                    </div>
                </div>)

            }



        }

        const showemployeeid = () => {
            if (this.state.active === 'labor') {
                return (employeeid.showemployeeid.call(this))
            } else {
                return;
            }

        }

        const showequipmentid = () => {
            if (this.state.active === 'equipment') {
                return (equipmentid.showEquipmentID.call(this))
            } else {
                return;
            }

        }

        const showmaterialid = () => {
            if (this.state.active === 'materials') {
                return (materialid.showmaterialid.call(this))
            } else {
                return;
            }

        }
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const active = dynamicstyles.checkactive.call(this)
            if (active) {
                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...styles.generalContainer }}><span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/{this.props.match.params.projectid} </span></div>
                                    <div style={{ ...styles.generalContainer }}><span style={{ ...headerFont, ...styles.boldFont, ...styles.headerFamily }}>/schedule </span></div>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...laborbackground() }} onClick={() => { this.setState({ active: 'labor' }) }}><span style={{ ...styles.specialButton }}>LABOR</span></button>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...equipmentbackground() }} onClick={() => { this.setState({ active: 'equipment' }) }}><span style={{ ...styles.specialButton }}>Equipment</span></button>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...materialbackground() }} onClick={() => { this.setState({ active: 'materials' }) }}><span style={{ ...styles.specialButton }}>Materials</span></button>
                                </div>
                            </div>

                            {showemployeeid()}
                            {showequipmentid()}
                            {showmaterialid()}




                            {milestonescsi()}
                            {showmaterialdate()}

                            {showtimes()}

                            {laborrate()}
                            {equipmentrate()}
                            {showmaterialquantity()}


                            {dynamicstyles.showsaveproject.call(this)}


                            {scheduleview.showschedule.call(this, "schedule")}

                            {this.showlaborids()}
                            {this.showmaterialids()}
                            {this.showequipmentids()}

                           

                            




                        </div>
                    </div>)

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You have to be active to view Schedule </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Schedule </span>
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
export default connect(mapStateToProps, actions)(Schedule);
