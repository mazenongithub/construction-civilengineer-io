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
    isNumeric,
    sortcode, validatecode, findString
} from './functions'
import Construction from './construction'
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
import { Link } from 'react-router-dom';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, active: '', activelaborid: false, activeequipmentid: false, activematerialid: false, providerid: '', timeinmonth: '', timeinday: '', timeinyear: '', timeinhours: '', timeinminutes: '', timeinampm: '', csi_1: '', csi_2: '', csi_3: '', csi_4: '', timeoutmonth: '', timeoutday: '', timeoutminutes: '', timeouthours: '', timeoutyear: '', timeoutampm: '', milestoneid: '', csiid: '', laborrate: 0, equipmentrate: 0, mymaterialid: '', myequipmentid: '', materialdateday: '', materialdatemonth: '', materialdateyear: '', quantity: '', unit: '', unitcost: '', calendertimein: true, calendertimeout: true, materialcalender: true, spinner: false, title: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
      
            if(!projectnavigation.schedule.hasOwnProperty("activelaborid")) {
                this.reset()
            }
           
        
        

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    uidefault() {

        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi = {csi_1:"", csi_2:"", csi_3:"", csi_4:"", title:""}
        projectnavigation.schedule.milestoneid = "";
        projectnavigation.schedule.csiid= "";

        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})

    }

    reset() {
        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        this.timeindefault()
        this.timeoutdefault();
        this.materialdatedefault();
        projectnavigation.schedule.activelaborid = '';
        projectnavigation.schedule.activematerialid = '';
        projectnavigation.schedule.activeequipmentid = '';
        projectnavigation.schedule.quantity = "";
        projectnavigation.schedule.unit = "";
        projectnavigation.schedule.unitcost = "";
        projectnavigation.schedule.equipmentrate = "";
        projectnavigation.schedule.csi = {};
        projectnavigation.schedule.csi.csi_1 = "";
        projectnavigation.schedule.csi.csi_2 = "";
        projectnavigation.schedule.csi.csi_3 = "";
        projectnavigation.schedule.csi.csi_4 = "";
        projectnavigation.schedule.csi.csiid = "";
        projectnavigation.schedule.csi.title = "";
        projectnavigation.schedule.milestoneid = "";
        projectnavigation.schedule.laborrate = "";
       


        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

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
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.materialdate = { materialdateyear: materialdateyear(), materialdatemonth: materialdatemonth(), materialdateday: materialdateday(), materialcalender:true }
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })
    }


    timeoutdefault() {
        const construction = new Construction();
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
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout = { timeoutmonth: timeoutmonth(), timeoutday: timeoutday(), timeoutyear: timeoutyear(), timeouthours: timeouthours(), timeoutminutes: timeoutminutes(), timeoutampm: timeoutampm(), calendertimeout:true }
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })
    }
    timeindefault() {
        const construction = new Construction();
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
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timein = { timeinmonth: timeinmonth(), timeinday: timeinday(), timeinyear: timeinyear(), timeinhours: timeinhours(), timeinminutes: timeinminutes(), timeinampm: timeinampm(), calendertimein: true }
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })
    }

    getcsiid() {
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;

        if (activelaborid && active === 'labor') {
            const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid)
            if (mylabor) {
                let csi = construction.getcsibyid.call(this, mylabor.csiid)
                if (csi) {

                    return `${csi.csi}-${csi.title}`
                }

            }
        } else if (activematerialid && active === 'materials') {
            const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
            if (mymaterial) {
                let csi = construction.getcsibyid.call(this, mymaterial.csiid);
                if (csi) {
                    return `${csi.csi}-${csi.title}`
                }
            }
        } else if (activeequipmentid && active === 'equipment') {
            const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)

            if (myequipment) {
                let csi = construction.getcsibyid.call(this, myequipment.csiid);
                if (csi) {
                    return `${csi.csi}-${csi.title}`
                }
            }

        } else if (this.props.projectnavigation.schedule.csi.csiid) {

            let csi = construction.getcsibyid.call(this, this.props.projectnavigation.schedule.csi.csiid);
            if (csi) {
                return `${csi.csi}-${csi.title}`
            }
        }

    }

    handleCSI_1(csi_1) {

        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi.csi_1 = csi_1
        projectnavigation.schedule.csi.title = "";
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

    }
    handleCSI_2(csi_2) {

        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi.csi_2 = csi_2
        projectnavigation.schedule.csi.title = "";
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

    }

    handleCSI_3(csi_3) {

        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi.csi_3 = csi_3
        projectnavigation.schedule.csi.title = "";
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

    }

    handleCSI_4(csi_4) {

        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi.csi_4 = csi_4
        projectnavigation.schedule.csi.title = "";
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

    }

    handleTitle(title) {
        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.csi.title = title
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

    }

    getAction() {
        
            if (this.props.projectnavigation.schedule.activelaborid || this.props.projectnavigation.schedule.activematerialid || this.props.projectnavigation.schedule.activeequipmentid) {
                return (`Update`)
            } else {
                return (`Select`)
            }
        
    }

    getCSI_1() {

        let csi_1 = "";

        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                if(this.props.projectnavigation.schedule.csi) {
                    csi_1 = this.props.projectnavigation.schedule.csi.csi_1;
                }
            }
        }


        return csi_1;

    }

    getCSI_2() {

        let csi_2 = "";

        
        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                if(this.props.projectnavigation.schedule.csi) {
                    csi_2 = this.props.projectnavigation.schedule.csi.csi_2;
                }
            }
        }


        return csi_2;

    }

    getCSI_3() {

        let csi_3 = "";

        
        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                if(this.props.projectnavigation.schedule.csi) {
                    csi_3 = this.props.projectnavigation.schedule.csi.csi_3;
                }
            }
        }


        return csi_3;

    }

    getCSI_4() {

        let csi_4 = "";

        
        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                if(this.props.projectnavigation.schedule.csi) {
                    csi_4 = this.props.projectnavigation.schedule.csi.csi_4;
                }
            }
        }


        return csi_4;

    }

    getTitle() {

        let title = "";

        
        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                if(this.props.projectnavigation.schedule.csi) {
                    title = this.props.projectnavigation.schedule.csi.title;
                }
            }
        }


        return title;

    }

    getCSIID() {
        const construction = new Construction();
        const styles = MyStylesheet();

   
        const regularFont = construction.getRegularFont.call(this);
        const csi = new CSI();
        let getnumber = 0

        const projectnavigation = construction.getProjectNavigation.call(this)
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;

        let _csiid = "";

        if (activelaborid && active === 'labor') {
            const mylabor = construction.getlaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid)
            if (mylabor) {
                let csi = construction.getcsibyid.call(this, mylabor.csiid)

                if (csi) {

                    _csiid = `${csi.csi}-${csi.title}`

                }

            }
        } else if (activematerialid && active === 'materials') {
            const mymaterial = construction.getmaterialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
            if (mymaterial) {
                let csi = construction.getcsibyid.call(this, mymaterial.csiid);
                if (csi) {
                    _csiid = `${csi.csi}-${csi.title}`
                }
            }
        } else if (activeequipmentid && active === 'equipment') {
            const myequipment = construction.getequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)

            if (myequipment) {
                let csi = construction.getcsibyid.call(this, myequipment.csiid);
                if (csi) {
                    _csiid = `${csi.csi}-${csi.title}`
                }
            }

        } else if(this.getcsiid()) {
            let getcsi = construction.getcsibyid.call(this, this.getcsiid()(this));
                if (getcsi) {
                    _csiid = `${getcsi.csi}-${getcsi.title}`
                }
        }

        if (_csiid) {

            return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.redBorder, ...styles.generalPadding }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>{_csiid}</span>
            </div>)
        }
    }

    getcsiid() {
        if(this.props.projectnavigation) {
            if(this.props.projectnavigation.schedule) {
                return this.props.projectnavigation.schedule.csiid;
            }
        }
    }


    getProject() {

        const project_id = this.props.project_id;
        const construction = new Construction();
        const ourproject = construction.getOurProjectByID.call(this, project_id)
        return ourproject;


    }

    getmilestoneid() {
        const construction = new Construction();
        const project = this.getProject();
        const projectnavigation = construction.getProjectNavigation.call(this)
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        let milestoneid = ""
        if (project) {

            if (active === 'labor') {
                if (activelaborid) {
                    const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                    milestoneid = mylabor.milestoneid;
                } else {
                    milestoneid = this.props.projectnavigation.schedule.milestoneid;
                }

            } else if (active === 'equipment') {
                if (activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid);
                    milestoneid = myequipment.milestoneid;
                } else {
                    milestoneid = this.props.projectnavigation.schedule.milestoneid;
                }

            } else if (active === 'materials') {

                if (activematerialid) {
                    const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                    milestoneid = mymaterial.milestoneid;
                } else {
                    milestoneid = this.props.projectnavigation.schedule.milestoneid;
                }

            }  else {
                milestoneid = this.props.projectnavigation.schedule.milestoneid;
            }

        }
        return milestoneid;

    }

    getsearchresults() {
        const construction = new Construction();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        let csi_4 = "";
        let title = "";
        if (this.props.projectnavigation) {
            if (this.props.projectnavigation.schedule) {

                if (this.props.projectnavigation.schedule.csi) {
                    csi_1 = this.props.projectnavigation.schedule.csi.csi_1;
                    csi_2 = this.props.projectnavigation.schedule.csi.csi_2;
                    csi_3 = this.props.projectnavigation.schedule.csi.csi_3;
                    csi_4 = this.props.projectnavigation.schedule.csi.csi_4;
                    title = this.props.projectnavigation.schedule.csi.title;

                }

            }
        }
        let searchcsi = "";

        let results = [];

        if (csi_1.length === 2) {
            searchcsi = csi_1.substr(0, 2);
        }
        if (csi_2.length === 2) {
            searchcsi += csi_2.substr(0, 2);
        }
        if (csi_3.length === 2) {
            searchcsi += csi_3.substr(0, 2);
        }
        if (csi_4.length === 2) {
            searchcsi += csi_4.substr(0, 2);
        }

      

        const codes = construction.getcsis.call(this)
        if (codes) {



            if (codes) {

                // eslint-disable-next-line
                codes.map(code => {

                    if (searchcsi) {

                        if (code.csi.replace(".", "").startsWith(searchcsi)) {


                            if (title.length > 1) {

                                if (findString(title, code.title)) {

                                    if (validatecode(results, code)) {
                                        results.push(code)
                                    }

                                }


                            } else {

                                if (validatecode(results, code)) {
                                    results.push(code)
                                }

                            }


                        }

                    }

                    if(title) {

                    if (title.length > 1) {

                        if (findString(title, code.title)) {

                            if (searchcsi) {

                                if (code.csi.startsWith(searchcsi)) {

                                    if (validatecode(results, code)) {
                                        results.push(code)
                                    }

                                }

                            } else {

                                if (validatecode(results, code)) {
                                    results.push(code)
                                }

                            }


                        }

                    }

                }



                })

            }

            results.sort((codeb, codea) => {

                return sortcode(codeb, codea)
            })



        }

        return results;
    }

    handlecsiid(csiid) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;
        const activelaborid = projectnavigation.schedule.activelaborid;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;

        if (myprojects) {
            const csi = construction.getcsibyid.call(this, csiid);
            if (csi) {

                const csi_1 = csi.csi.substring(0, 2)
                const csi_2 = csi.csi.substring(2, 4);
                const csi_3 = csi.csi.substring(4, 6);
                let csi_4 = "";
                let title = csi.title;
                if (csi.csi.length > 6) {
                    csi_4 = csi.csi.substring(7, 9);
                }
                let projectnavigation = construction.getProjectNavigation.call(this)
                projectnavigation.schedule.csi = { csi_4, csi_3, csi_2, csi_1, title }
                this.props.reduxProjectNavigation(projectnavigation)
                this.setState({ render: 'render' })
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    if (active === 'labor') {

                        if (activelaborid) {
                            const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                            if (mylabor) {
                                const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                                myprojects[i].schedule.labor[j].csiid = csiid;
                                this.props.reduxMyProjects(myprojects)
                                this.setState({ render: 'render' })
                            }

                        } else {

                            projectnavigation.schedule.csiid = csiid;
                            this.props.reduxProjectNavigation(projectnavigation)
                            this.setState({ render: 'render' })
                        }

                    } else if (active === 'materials') {

                        if (activematerialid) {
                            const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                            if (mymaterial) {
                                const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                                myprojects[i].schedule.materials[j].csiid = csiid;
                                this.props.reduxMyProjects(myprojects)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            projectnavigation.schedule.csiid = csiid;
                            this.props.reduxProjectNavigation(projectnavigation)
                            this.setState({ render: 'render' })

                        }

                    } else if (active === 'equipment') {

                        if (activeequipmentid) {
                            const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid);
                            if (myequipment) {
                                const j = construction.getscheduleequipmentkeybyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                                myprojects[i].schedule.equipment[j].csiid = csiid;
                                this.props.reduxMyProjects(myprojects)
                                this.setState({ render: 'render' })
                            }
                        } else {
                            projectnavigation.schedule.csiid = csiid;
                            this.props.reduxProjectNavigation(projectnavigation)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        projectnavigation.schedule.csiid = csiid;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render: 'render' })
                    }

                }

            }

        }

    }

    handlemilestoneid(milestoneid) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        let projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;
        const activelaborid = projectnavigation.schedule.activelaborid;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        if (myprojects) {
            const project = this.getProject()
            if (project) {
                const project_id = this.props.project_id;
                const i = construction.getOurProjectKeyById.call(this, project_id)
                if (active === 'labor') {

                    if (activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                        if (mylabor) {
                            const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                            myprojects[i].schedule.labor[j].milestoneid = milestoneid;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        projectnavigation.schedule.milestoneid = milestoneid;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render:'render' })
                     
                    }

                } else if (active === 'materials') {

                    if (activematerialid) {
                        const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                        if (mymaterial) {
                            const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                            myprojects[i].schedule.materials[j].milestoneid = milestoneid;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        projectnavigation.schedule.milestoneid = milestoneid;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render:'render' })
                  
                    }

                } else if (active === 'equipment') {

                    if (activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid);
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                            myprojects[i].schedule.equipment[j].milestoneid = milestoneid;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        projectnavigation.schedule.milestoneid = milestoneid;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render:'render' })
                    
                    }

                } else {
                    projectnavigation.schedule.milestoneid = milestoneid;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render:'render' })
               
                }

            }

        }

    }





    getequipmentid() {
        const construction = new Construction();
        const project = this.getProject()
        let equipmentid = "";
        if (project) {

            if (this.props.projectnavigation.schedule.activeequipmentid) {
                const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                if (myequipment) {
                    equipmentid = myequipment.myequipmentid;
                }
            } else {
                equipmentid = this.props.projectnavigation.schedule.myequipmentid;
            }

        }
        return equipmentid;
    }


    removelaborid(labor) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)

        const user = construction.getuserbyID.call(this, labor.user_id)
        if (window.confirm(`Are you sure you want to delete labor for ${user.UserID}`)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    const mylabor = construction.getschedulelaborbyid.call(this, labor.laborid);
                    if (mylabor) {
                        const j = construction.getschedulelaborkeybyid.call(this, mylabor.laborid);
                        myprojects[i].schedule.labor.splice(j, 1);
                        this.props.reduxMyProjects(myprojects)
                        this.reset();
                    }
                }
            }

        }

    }
    getemployeeid() {
        const construction = new Construction();
        const project = this.getProject()

        let employeeid = "";
        if (project) {

            if (this.props.projectnavigation.schedule.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                if (mylabor) {

                    employeeid = mylabor.user_id
                }
            }

        }
        return employeeid;
    }

    makematerialactive(materialid) {
        const construction = new Construction();
        const project = this.getProject()
        let projectnavigation = construction.getProjectNavigation.call(this)
        if (project) {

            if (this.props.projectnavigation.schedule.activematerialid === materialid) {
                this.materialdatedefault();

                projectnavigation.schedule.activematerialid = false;
                this.props.reduxProjectNavigation(projectnavigation)
                this.setState({ render:'render' })
                this.reset()

            } else {

                const mymaterial = construction.getschedulematerialbyid.call(this, materialid)
                if (mymaterial) {
                    const materialdateyear = mymaterial.timein.substring(0, 4)
                    const materialdatemonth = mymaterial.timein.substring(5, 7);
                    const materialdateday = mymaterial.timein.substring(8, 10);

                    const csi = construction.getcsibyid.call(this, mymaterial.csiid);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    let title = "";
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                        title = csi.title
                    }
                    projectnavigation.schedule.materialdate = { materialdatemonth, materialdateday, materialdateyear }
                    projectnavigation.schedule.activematerialid = materialid
                    projectnavigation.schedule.csi = { csi_1, csi_2, csi_3, csi_4, title }
                    this.props.reduxProjectNavigation(projectnavigation)


                    this.setState({render:'render' })

                }

            }

        }

    }

    makeequipmentactive(equipmentid) {

        const construction = new Construction();
        const project = this.getProject()
        let projectnavigation = construction.getProjectNavigation.call(this)
        if (project) {

            if (this.props.projectnavigation.schedule.activeequipmentid === equipmentid) {
                projectnavigation.schedule.activeequipmentid = false;
                this.props.reduxProjectNavigation(projectnavigation)
                this.setState({ render:'render' })
                this.reset();
            } else {

                const myequipment = construction.getscheduleequipmentbyid.call(this, equipmentid)

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

                    const csi = construction.getcsibyid.call(this, myequipment.csiid);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    let title = "";
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                        title = csi.title
                    }
                    projectnavigation.schedule.activeequipmentid = equipmentid;
                    projectnavigation.schedule.timein = { timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm }
                    projectnavigation.schedule.timeout = { timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm }
                    projectnavigation.schedule.csi = { csi_1, csi_2, csi_3, csi_4, title }
                    projectnavigation.schedule.equipmentid = equipmentid;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render:'render' })

                }
            }

        }
    }

    makelaboractive(laborid) {

        const construction = new Construction();
        const project = this.getProject()
        let projectnavigation = construction.getProjectNavigation.call(this)
        if (project) {

            if (this.props.projectnavigation.schedule.activelaborid === laborid) {
                this.reset();
                projectnavigation.schedule.activelaborid = false;
                this.props.reduxProjectNavigation(projectnavigation)
                this.setState({  render:'render' })
            } else {

                const mylabor = construction.getschedulelaborbyid.call(this, laborid)

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

                    const csi = construction.getcsibyid.call(this, mylabor.csiid);
                    let csi_1 = "";
                    let csi_2 = "";
                    let csi_3 = "";
                    let csi_4 = "";
                    let title = "";
                    if (csi) {
                        csi_1 = csi.csi.substring(0, 2)
                        csi_2 = csi.csi.substring(2, 4);
                        csi_3 = csi.csi.substring(4, 6);

                        if (csi.csi.length > 6) {
                            csi_4 = csi.csi.substring(7, 9);
                        }
                        title = csi.title
                    }

                    projectnavigation.schedule.activelaborid = laborid;
                    projectnavigation.schedule.timein = { timeinmonth, timeinday, timeinyear, timeinhours, timeinminutes, timeinampm }
                    projectnavigation.schedule.timeout = { timeoutmonth, timeoutday, timeoutyear, timeouthours, timeoutminutes, timeoutampm }
                    projectnavigation.schedule.csi = { csi_1, csi_2, csi_3, csi_4, title }
                    projectnavigation.schedule.laborid = laborid;
                    this.props.reduxProjectNavigation(projectnavigation)


                    this.setState({ render:'render' })

                }
            }

        }
    }

    getSchedule() {
        const construction = new Construction();
        const project_id = this.props.project_id;
        const schedule = construction.getAllSchedule.call(this, project_id);
        return schedule;

    }

    showlaborid(labor) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const removeIcon = construction.getremoveicon.call(this)
        const regularFont = construction.getRegularFont.call(this);
        const csi = construction.getcsibyid.call(this, labor.csiid);
        let employee = construction.getuserby_id.call(this, labor.user_id)
        let hourlyrate = labor.laborrate;
        const project = this.getProject()
        const projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;

        if (project) {

            const milestone = construction.getmilestonebyid.call(this, labor.milestoneid)



            const getbutton = () => {
                if (this.props.projectnavigation.schedule.activelaborid === labor.laborid) {
                    return (styles.activeButton);
                } else {
                    return (styles.generalButton);
                }
            }


            const getactivelaborbackground = (laborid) => {
                if (this.props.projectnavigation.schedule.activelaborid === laborid) {
                    return styles.activeBackground;
                }

            }



            if (active === 'labor') {

                return (
                    <div key={labor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin10, }}>
                        <span style={{ ...getactivelaborbackground(labor.laborid) }} onClick={() => { this.makelaboractive(labor.laborid) }}>
                            {employee.FirstName} {employee.LastName}: {labor.description} Milestone {milestone.milestone} CSI:{csi.csi}-{csi.title}<br />
                            From {inputUTCStringForLaborID(labor.timein)} to {inputUTCStringForLaborID(labor.timeout)}
                            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(labor.timeout, labor.timein)} Hrs = ${(Number(calculatetotalhours(labor.timeout, labor.timein)) * hourlyrate).toFixed(2)}
                        </span>
                        <button style={{ ...getbutton(), ...removeIcon }} onClick={() => { this.removelaborid(labor) }}>{removeIconSmall()} </button>
                    </div>)

            }

        }

    }
    showlaborids() {
        const construction = new Construction();
        const project = this.getProject()
        let laborids = [];
        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {
            if (project) {
                const labors = construction.getschedulelabor.call(this)
                if (labors) {
                    // eslint-disable-next-line
                    labors.map(labor => {


                        laborids.push(this.showlaborid(labor))


                    })
                }

            }

        }
        return laborids;

    }

    removematerial(mymaterial) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const material = construction.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        if (window.confirm(`Are you sure you want to delete material for ${material.material}`)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    const material = construction.getschedulematerialbyid.call(this, mymaterial.materialid)
                    if (material) {
                        const j = construction.getschedulematerialkeybyid.call(this, material.materialid)
                        myprojects[i].schedule.materials.splice(j, 1)
                        this.props.reduxMyProjects(myprojects)
                        this.reset();

                    }

                }

            }

        }
    }

  

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const removeIcon = construction.getremoveicon.call(this)
        const project = this.getProject()
        const csi = construction.getcsibyid.call(this, mymaterial.csiid);
        const material = construction.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        const projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;

        const getbutton = () => {
            if (this.props.projectnavigation.schedule.activematerialid === mymaterial.materialid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }


        }
        const activebackground = (materialid) => {
            if (this.props.projectnavigation.schedule.activematerialid === materialid) {
                return (styles.activeBackground)
            }

        }
        if (active === 'materials') {
            if (project) {

                const milestone = construction.getmilestonebyid.call(this, mymaterial.milestoneid)

                return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...activebackground(mymaterial.materialid), ...styles.bottomMargin10 }} key={mymaterial.materialid}>
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
        const construction = new Construction();
        const project = this.getProject()
        let materialids = [];
        if (project) {

            const materials = construction.getschedulematerials.call(this)
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
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const myequipment = construction.getmyequipmentbyid.call(this, equipment.myequipmentid)
        if (window.confirm(`Are you sure you want to delete material for ${myequipment.equipment}`)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    const myequipment = construction.getscheduleequipmentbyid.call(this, equipment.equipmentid);
                    if (myequipment) {
                        const j = construction.getscheduleequipmentkeybyid.call(this, equipment.equipmentid);
                        myprojects[i].schedule.equipment.splice(j, 1)
                        this.props.reduxMyProjects(myprojects)
                        this.reset();
                    }


                }

            }

        }


    }

    showequipmentid(equipment) {

        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const project = this.getProject()
        const csi = construction.getcsibyid.call(this, equipment.csiid)
        const totalhours = +Number(calculatetotalhours(equipment.timeout, equipment.timein)).toFixed(2)
        const equipmentrate = `$${+Number(equipment.equipmentrate).toFixed(2)}/hr`
        const removeIcon = construction.getremoveicon.call(this)
        const amount = (calculatetotalhours(equipment.timeout, equipment.timein) * Number(equipment.equipmentrate))
        const getbutton = () => {
            if (this.props.projectnavigation.schedule.activeequipmentid === equipment.equipmentid) {
                return (styles.activeButton);
            } else {
                return (styles.generalButton);
            }
        }

        const activeequipment = (equipmentid) => {
            if (this.props.projectnavigation.schedule.activeequipmentid === equipmentid) {
                return (styles.activeBackground)
            }

        }
        if (project) {

            const milestone = construction.getmilestonebyid.call(this, equipment.milestoneid)
            const myequipment = construction.getequipmentfromid.call(this, equipment.myequipmentid);
            console.log(myequipment, equipment.equipmentid)

            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin10 }} key={equipment.equipmentid}>
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
        const construction = new Construction();
        const project = this.getProject();
        let equipmentids = [];
        const projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;

        if (active === 'equipment') {
            if (project) {

                const equipments = construction.getscheduleequipment.call(this)

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
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const makeid = new MakeID();
        if (myprojects) {
            const project = this.getProject();
            if (project) {
                const project_id = this.props.project_id;
                const i = construction.getOurProjectKeyById.call(this, project_id)
                if (this.props.projectnavigation.schedule.activeequipmentid) {
                    const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                    if (myequipment) {
                        const j = construction.getscheduleequipmentkeybyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                        myprojects[i].schedule.equipment[j].myequipmentid = myequipmentid;
                        this.props.reduxMyProjects(myprojects)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const equipmentid = makeid.equipmentid.call(this)
                    const milestoneid = this.props.projectnavigation.schedule.milestoneid;
                    const csiid = this.props.projectnavigation.schedule.csiid
                    const dayin = this.props.projectnavigation.schedule.timein.timeinday;
                    const yearin = this.props.projectnavigation.schedule.timein.timeinyear;
                    const monthin = this.props.projectnavigation.schedule.timein.timeinmonth;
                    const hoursin = this.props.projectnavigation.schedule.timein.timeinhours;
                    const timetimein = this.props.projectnavigation.schedule.timein.timeinampm;
                    const minutesin = this.props.projectnavigation.schedule.timein.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.props.projectnavigation.schedule.timeout.timeoutday;
                    const yearout = this.props.projectnavigation.schedule.timeout.timeoutyear;
                    const monthout = this.props.projectnavigation.schedule.timeout.timeoutmonth;
                    const hoursout = this.props.projectnavigation.schedule.timeout.timeouthours;
                    const minutesout = this.props.projectnavigation.schedule.timeout.timeoutminutes;
                    const timetimeout = this.props.projectnavigation.schedule.timeout.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const equipmentrate = construction.calculateequipmentratebyownership.call(this, myequipmentid) > 0 ? Number(construction.calculateequipmentratebyownership.call(this, myequipmentid)).toFixed(2) : 0;



                    const newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, csiid, milestoneid, timein, timeout, equipmentrate, '', 0)

                    const equipments = construction.getscheduleequipment.call(this)
                    if (equipments) {
                        myprojects[i].schedule.equipment.push(newEquipment)
                    } else {

                        myprojects[i].schedule.equipment = [newEquipment]
                    }
                    this.props.reduxMyProjects(myprojects)
                    let projectnavigation = construction.getProjectNavigation.call(this)
                    projectnavigation.schedule.activeequipmentid = equipmentid;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render:'render' })


                }
            }
        }
    }

    handleemployeeid(user_id) {

        const construction = new Construction();
        const makeid = new MakeID();

        const myprojects = construction.getOurProjects.call(this);
        if (myprojects) {

            const project = this.getProject();
            if (project) {
                const project_id = this.props.project_id;
                const i = construction.getOurProjectKeyById.call(this, project_id)
                if (this.props.projectnavigation.schedule.activelaborid) {
                    const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                    if (mylabor) {
                        const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                        myprojects[i].schedule.labor[j].user_id = user_id;
                        this.props.reduxMyProjects(myprojects)
                        this.setState({ render: 'render' })
                    }
                } else {
                    const laborid = makeid.schedulelaborid.call(this)
                    const milestoneid = this.props.projectnavigation.schedule.milestoneid;
                    const csiid = this.props.projectnavigation.schedule.csiid
                    const dayin = this.props.projectnavigation.schedule.timein.timeinday;
                    const yearin = this.props.projectnavigation.schedule.timein.timeinyear;
                    const monthin = this.props.projectnavigation.schedule.timein.timeinmonth;
                    const hoursin = this.props.projectnavigation.schedule.timein.timeinhours;
                    const timetimein = this.props.projectnavigation.schedule.timein.timeinampm;
                    const minutesin = this.props.projectnavigation.schedule.timein.timeinminutes;
                    let timein = makeTimeString(yearin, monthin, dayin, hoursin, minutesin, timetimein);
                    timein = UTCTimeStringfromTime(timein);
                    const dayout = this.props.projectnavigation.schedule.timeout.timeoutday;
                    const yearout = this.props.projectnavigation.schedule.timeout.timeoutyear;
                    const monthout = this.props.projectnavigation.schedule.timeout.timeoutmonth;
                    const hoursout = this.props.projectnavigation.schedule.timeout.timeouthours;
                    const minutesout = this.props.projectnavigation.schedule.timeout.timeoutminutes;
                    const timetimeout = this.props.projectnavigation.schedule.timeout.timeoutampm;
                    let timeout = makeTimeString(yearout, monthout, dayout, hoursout, minutesout, timetimeout);
                    timeout = UTCTimeStringfromTime(timeout);
                    const laborrate = construction.calculateLaborRatebyID.call(this, user_id).toFixed(2)
                    const profit = 0;


                    const newLabor = CreateScheduleLabor(laborid, user_id, milestoneid, csiid, timein, timeout, laborrate, '', '', profit)

                    const labors = construction.getschedulelabor.call(this)
                    if (labors) {

                        myprojects[i].schedule.labor.push(newLabor)
                    } else {

                        myprojects[i].schedule.labor = [newLabor]
                    }
                    this.props.reduxMyProjects(myprojects)
                    let projectnavigation = construction.getProjectNavigation.call(this)
                    projectnavigation.schedule.activelaborid = laborid;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render: 'render' })
                }
            }
        }
    }

    getequipmentrate() {
        const construction = new Construction();
        const project = this.getProject()
        let equipmentrate = 0;
        if (project) {

            if (this.props.projectnavigation.schedule.activeequipmentid) {
                const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid);
                if (myequipment) {
                    equipmentrate = myequipment.equipmentrate;
                }

            }

        }


        return equipmentrate;
    }




    getlaborrate() {
        const construction = new Construction();
        const project = this.getProject()
        let laborrate = "";
        if (project) {

            if (this.props.projectnavigation.schedule.activelaborid) {
                const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                if (mylabor) {
                    laborrate = mylabor.laborrate;
                }
            } else {
                laborrate = this.props.projectnavigation.schedule.laborrate;
            }
        }
        return laborrate;
    }

    handleequipmentrate(equipmentrate) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if (isNumeric(equipmentrate)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    if (this.props.projectnavigation.schedule.activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                            myprojects[i].schedule.equipment[j].equipmentrate = equipmentrate;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        let projectnavigation = construction.getProjectNavigation.call(this)
                        projectnavigation.schedule.equipmentrate = equipmentrate;
                        this.setState({ render: 'render' })
                    }
                }
            }
        } else {
            let projectnavigation = construction.getProjectNavigation.call(this)
            projectnavigation.schedule.equipmentrate = equipmentrate
            this.setState({ render: 'render' })
            alert(`Equipment rate ${equipmentrate} must be numeric `)
        }
    }

    handlelaborrate(laborrate) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)

        if (isNumeric(laborrate)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id)
                    if (this.props.projectnavigation.schedule.activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                        if (mylabor) {
                            const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                            myprojects[i].schedule.labor[j].laborrate = laborrate;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }

                    } else {
                        let projectnavigation = construction.getProjectNavigation.call(this)
                        projectnavigation.schedule.laborrate = laborrate;
                        this.props.reduxProjectNavigation(projectnavigation);
                        this.setState({ render: 'render' })
                    }
                }
            }

        } else {
            alert(`Labor Rate ${laborrate} must be numeric`)
        }
    }
    getquantity() {
        const construction = new Construction();
        const project = this.getProject();
        let quantity = this.props.projectnavigation.schedule.quantity;
        if (project) {

            if (this.props.projectnavigation.schedule.activematerialid) {
                const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                quantity = mymaterial.quantity;

            }

        }
        return quantity;

    }
    getunit() {
        const construction = new Construction();
        const project = this.getProject();
        let unit = this.props.projectnavigation.schedule.unit;
        if (project) {

            if (this.props.projectnavigation.schedule.activematerialid) {
                const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                unit = mymaterial.unit;

            }

        }
        return unit;

    }
    getunitcost() {
        const construction = new Construction();
        const project = this.getProject();
        let unitcost = this.props.projectnavigation.schedule.unitcost;
        if (project) {

            if (this.props.projectnavigation.schedule.activematerialid) {
                const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                unitcost = mymaterial.unitcost;

            }

        }
        return unitcost;

    }
    handlequantity(quantity) {
        const construction = new Construction();
        const projects = construction.getOurProjects.call(this)
        if (isNumeric(quantity)) {
            if (projects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id);
                    if (this.props.projectnavigation.schedule.activematerialid) {
                        const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
                        if (mymaterial) {
                            const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                            projects[i].schedule.materials[j].quantity = quantity;
                            this.props.reduxMyProjects(projects)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        let projectnavigation = construction.getProjectNavigation.call(this)
                        projectnavigation.schedule.quantity = quantity;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render:'render' })
                    }
                }
            }

        } else {
            let projectnavigation = construction.getProjectNavigation.call(this)
            projectnavigation.schedule.quantity = quantity;
            this.props.reduxProjectNavigation(projectnavigation)
            this.setState({ render:'render' })
            alert(`Quantity ${quantity} must be numeric`)
        }

    }
    handleunit(unit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {
            const project = this.getProject()
            if (project) {
                const project_id = this.props.project_id;
                const i = construction.getOurProjectKeyById.call(this, project_id);
                if (this.props.projectnavigation.schedule.activematerialid) {
                    const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
                    if (mymaterial) {
                        const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                        myprojects[i].schedule.materials[j].unit = unit;
                        this.props.reduxMyProjects(myprojects)
                        this.setState({ render: 'render' })
                    }
                } else {
                    let projectnavigation = construction.getProjectNavigation.call(this)
                    projectnavigation.schedule.unit = unit;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render: 'render' })
                }
            }
        }

    }
    handleunitcost(unitcost) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if (isNumeric(unitcost)) {
            if (myprojects) {
                const project = this.getProject()
                if (project) {
                    const project_id = this.props.project_id;
                    const i = construction.getOurProjectKeyById.call(this, project_id);
                    if (this.props.projectnavigation.schedule.activematerialid) {
                        const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
                        if (mymaterial) {
                            const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                            myprojects[i].schedule.materials[j].unitcost = unitcost;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }
                    } else {
                        let projectnavigation = construction.getProjectNavigation.call(this)
                        projectnavigation.schedule.unitcost = unitcost;
                        this.props.reduxProjectNavigation(projectnavigation)
                        this.setState({ render: 'render' })

                    }
                }
            }

        } else {
            let projectnavigation = construction.getProjectNavigation.call(this)
            projectnavigation.schedule.unitcost = unitcost;
            this.props.reduxProjectNavigation(projectnavigation)
            this.setState({ render: 'render' })

            alert(`Unit cost ${unitcost} must be numeric`)
        }

    }

    handlemymaterialid(mymaterialid) {

        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const makeid = new MakeID();
        if (myprojects) {
            const project = this.getProject()
            if (project) {
                const project_id = this.props.project_id;
                const i = construction.getOurProjectKeyById.call(this, project_id)
                if (this.props.projectnavigation.schedule.activematerialid) {
                    const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid);
                    if (mymaterial) {
                        const j = construction.getschedulematerialkeybyid.call(this, this.props.projectnavigation.schedule.activematerialid)
                        myprojects[i].schedule.materials[j].mymaterialid = mymaterialid;
                        this.props.reduxMyProjects(myprojects)
                        this.setState({ render: 'render' })
                    }

                } else {

                    const calcunitcost = (mymaterial) => {
                        let getunitcost = 0;
                        if(this.props.projectnavigation) {
                            if(this.props.projectnavigation.schedule) {
                                if(this.props.projectnavigation.schedule.unitcost) {
                                    getunitcost = this.props.projectnavigation.schedule.unitcost 
                                }
                            }
                        }

                        if(getunitcost === 0) {
                            getunitcost = mymaterial.unitcost;
                        }


                        return getunitcost;
                    }


                    const calcunit = (mymaterial) => {
                        let getunit = "";
                        if(this.props.projectnavigation) {
                            if(this.props.projectnavigation.schedule) {
                                if(this.props.projectnavigation.schedule.unit) {
                                    getunit = this.props.projectnavigation.schedule.unit 
                                }
                            }
                        }
                    
                        if(!getunit) {
                            getunit = mymaterial.unit;
                        }
                    
                    
                        return getunit;
                    }
                    


                    const materialid = makeid.materialid.call(this)
                    const milestoneid = this.props.projectnavigation.schedule.milestoneid;
                    const mymaterial = construction.getmymaterialfromid.call(this, mymaterialid)
                    const csiid = this.props.projectnavigation.schedule.csiid
                    const year = this.props.projectnavigation.schedule.materialdate.materialdateyear;
                    const day = this.props.projectnavigation.schedule.materialdate.materialdateday;
                    const month = this.props.projectnavigation.schedule.materialdate.materialdatemonth;
                    const timein = `${year}-${month}-${day}`;
                    const quantity = this.props.projectnavigation.schedule.quantity;
                    const unitcost = calcunitcost(mymaterial);
                    const unit = calcunit(mymaterial)

                    const newMaterial = CreateMyMaterial(materialid, mymaterialid, milestoneid, csiid, timein, quantity, unit, unitcost, '', 0);
                    const materials = construction.getschedulematerials.call(this);
                    if (materials) {
                        myprojects[i].schedule.materials.push(newMaterial)

                    } else {

                        myprojects[i].schedule.materials = [newMaterial];
                    }

                    this.props.reduxMyProjects(myprojects)
                    let projectnavigation = construction.getProjectNavigation.call(this)
                    projectnavigation.schedule.activematerialid = materialid;
                    this.props.reduxProjectNavigation(projectnavigation)
                    this.setState({ render:'render' })

                }
            }
        }

    }

    getmymaterialid() {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        let materialid = this.stateid;
        if (myprojects) {
            const project = this.getProject()
            if (project) {


                if (this.props.projectnavigation.schedule.activematerialid) {
                    const mymaterial = construction.getschedulematerialbyid.call(this, this.props.projectnavigation.schedule.activematerialid)
                    if (mymaterial) {
                        materialid = mymaterial.mymaterialid;
                    }
                }

            }

        }
        return materialid;

    }
    handleactivecomponent(component) {

        const construction = new Construction();
        let projectnavigation = construction.getProjectNavigation.call(this)

        const checkreset = (projectnavigation) => {
            if(projectnavigation.schedule.activecomponent) {
                if(projectnavigation.schedule.activecomponent !== component) {

            
                    projectnavigation.schedule.activelaborid = '';
                    projectnavigation.schedule.activematerialid = '';
                    projectnavigation.schedule.activeequipmentid = '';
                    projectnavigation.schedule.quantity = "";
                    projectnavigation.schedule.unit = "";
                    projectnavigation.schedule.unitcost = "";
                    projectnavigation.schedule.equipmentrate = "";
                

                }
            }
        }
      
        checkreset(projectnavigation);
        projectnavigation.schedule.activecomponent = component;
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })
    }


    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this);
        const buttonheight = construction.getbuttonheight.call(this)
        const timein = new TimeIn();
        const timeout = new TimeOut();
        const milestoneid = new MilestoneID();
        const regularFont = construction.getRegularFont.call(this)
        const csi = new CSI();
        const materialdate = new MaterialDate();
        const employeeid = new EmployeeID();
        const equipmentid = new EquipmentID();
        const materialid = new MaterialID();
        const scheduleview = new ScheduleView();
        const menu = construction.getNavigation.call(this)
        const project_id = this.props.project_id;

        const projectnavigation = construction.getProjectNavigation.call(this)
        const active = projectnavigation.schedule.activecomponent;




        const equipmentrate = () => {
            if (active === 'equipment' && this.props.projectnavigation.schedule.activeequipmentid) {
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
            if (active === 'labor' && this.props.projectnavigation.schedule.activelaborid) {
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
            if (active === 'labor') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }
        const equipmentbackground = () => {
            if (active === 'equipment') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const materialbackground = () => {
            if (active === 'materials') {
                return (styles.activebutton)
            } else {
                return (styles.notactivebutton)
            }
        }

        const showmaterialquantity = () => {
            if (active === 'materials') {
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
            if (active === 'labor' || active === 'equipment') {
                return (timein.showtimein.call(this))
            }
        }
        const showtimeout = () => {
            if (active === 'labor' || active === 'equipment') {
                return (timeout.showtimeout.call(this))
            }
        }
        const showmaterialdate = () => {
            if (active === 'materials') {
                return (materialdate.showmaterialdate.call(this))
            }
        }

        const showtimes = () => {
            if (this.state.width > 1200 && menu.position === 'closed') {


                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        {showtimein()}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.addLeftMargin15 }}>
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

        const milestonescsi = (project_id) => {

            if (this.state.width > 800) {


                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this, project_id)}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {csi.showCSI.call(this)}
                    </div>
                </div>)



            } else {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {milestoneid.showmilestoneid.call(this, project_id)}
                        {csi.showCSI.call(this)}
                    </div>
                </div>)

            }



        }

        const showemployeeid = () => {
            if (active === 'labor') {
                return (employeeid.showemployeeid.call(this))
            } else {
                return;
            }

        }

        const showequipmentid = () => {
            if (active === 'equipment') {
                return (equipmentid.showEquipmentID.call(this))
            }

        }

        const showmaterialid = () => {
            if (active === 'materials') {
                return (materialid.showmaterialid.call(this))
            }

        }

        const handleScheduleView = () => {
            if(this.props.projectnavigation) {
                if(this.props.projectnavigation.hasOwnProperty("schedule")) {
                    if(this.props.projectnavigation.schedule.hasOwnProperty("timein")) {
                        return(scheduleview.showschedule.call(this, "schedule"))
                    }

                }
            }
        }
        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {

            const project = this.getProject()

            if (project) {



                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>




                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...laborbackground() }} onClick={() => { this.handleactivecomponent('labor') }}><span style={{ ...styles.specialButton }}>LABOR</span></button>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...equipmentbackground() }} onClick={() => { this.handleactivecomponent('equipment') }}><span style={{ ...styles.specialButton }}>Equipment</span></button>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                    <button style={{ ...headerFont, ...styles.headerFamily, ...styles.boldFont, ...styles.addRadius, ...buttonheight, ...materialbackground() }} onClick={() => { this.handleactivecomponent('materials') }}><span style={{ ...styles.specialButton }}>Materials</span></button>
                                </div>
                            </div>

                            {showemployeeid()}
                            {showequipmentid()}
                            {showmaterialid()}




                            {milestonescsi(project_id)}
                            {showmaterialdate()}

                            {showtimes()}

                            {laborrate()}
                            {equipmentrate()}
                            {showmaterialquantity()}


                           {handleScheduleView()}

                            {this.showlaborids()}
                            {this.showmaterialids()}
                            {this.showequipmentids()}


                        </div>
                    </div>)

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
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
        mycompany: state.mycompany,
        myprojects: state.myprojects,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        allprojects: state.allprojects,
        websockets: state.websockets,
        csis: state.csis,
        projectsockets: state.projectsockets,
        projectnavigation: state.projectnavigation
    }
}

export default connect(mapStateToProps, actions)(Schedule);
