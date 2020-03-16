import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import ScheduleEquipmentTimeIn from './scheduleequipmenttimein';
import ScheduleEquipmentTimeOut from './scheduleequipmenttimeout';
import DynamicStyles from './dynamicstyles';
import { CreateScheduleEquipment, inputDateObjOutputAdjString, calculatetotalhours } from './functions'
import CSI from './csi'
import MakeID from './makeids';
import MilestoneID from './milestoneid';

class ScheduleEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, activeequipmentid: '', myequipmentid: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            milestoneid: '', csiid: '', csi_1: '', csi_2: '', csi_3: '', proposalid: ''
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxProject({ activeprojectid: this.props.match.params.projectid })

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
    getSmallFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font20)
        } else {
            return (styles.font18)
        }

    }
    getproject() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let projectid = this.props.match.params.projectid;
        let projects = false;
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
        return projects;
    }
    getprojectkey() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
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

    getactiveequipment() {

        let equipment = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    if (myequipment.equipmentid === equipmentid) {
                        equipment = myequipment;
                    }
                })

            }

        }
        return equipment;
    }
    getactiveequipmentkey() {

        let key = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myproject = this.getproject();
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map((myequipment, i) => {
                    if (myequipment.equipmentid === equipmentid) {
                        key = i;
                    }
                })

            }

        }
        return key;
    }
    getcompany() {
        const dynamicstyles = new DynamicStyles();
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
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
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




    showtimes() {

        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const Timein = new ScheduleEquipmentTimeIn();
        const Timeout = new ScheduleEquipmentTimeOut();
        if (this.state.width > 1200) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {Timein.showtimein.call(this)}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {Timeout.showtimeout.call(this)}
                </div>
            </div>)
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            {Timein.showtimein.call(this)}
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            {Timeout.showtimeout.call(this)}
                        </div>
                    </div>
                </div>
            )
        }
    }

    loadcsiids() {
        let company = this.getcompany();
        let options = [];
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {

                    options.push(
                        <option
                            key={code.csiid}
                            value={code.csiid}>{code.csi}-{code.title}</option>)
                })
            }
        }
        return options;
    }
    showmilestones() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const csi = new CSI();
        const milestoneid = new MilestoneID();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {csi.showCSI.call(this)}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {milestoneid.showmilestoneid.call(this)}
                </div>
            </div>
            )
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            {csi.showCSI.call(this)}
                        </div>

                        {milestoneid.showmilestoneid.call(this)}

                    </div>
                </div>
            )
        }
    }

    getcsibyid(csiid) {
        let csi = false;
        let company = this.getcompany();
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
    loadequipment() {
        let myequipment = this.getmyequipment();
        let options = [];
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                options.push(<option value={equipment.equipmentid}>{equipment.equipment}</option>)
            })
        }
        return options;
    }
    getequipmentids() {
        let myproject = this.getproject();
        let equipmentids = false;
        if (myproject.hasOwnProperty("scheduleequipment")) {
            equipmentids = myproject.scheduleequipment.myequipment;
        }
        return equipmentids;

    }
    getequipmentfromid(equipmentid) {
        let myequipment = this.getmyequipment()
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
    makeequipmentactive(equipmentid) {
        const dynamicstyles = new DynamicStyles();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";


        if (this.state.activeequipmentid === equipmentid) {

            this.setState({ activeequipmentid: false, csi_1, csi_2, csi_3, csiid: '' })
        } else {
            let myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, equipmentid);
            let csi = dynamicstyles.getcsibyid.call(this, myequipment.csiid);
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
            }
            this.setState({ activeequipmentid: equipmentid, csi_1, csi_2, csi_3 })
        }
    }
    getmilestones() {
        let myproject = this.getproject();
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                milestones = myproject.projectmilestones.mymilestone;

            }
        }
        return milestones;

    }
    getactivematerialbackground(equipmentid) {
        if (this.state.activeequipmentid === equipmentid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }

    getmilestonebyid(milestoneid) {
        let milestones = this.getmilestones();
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
    loadequipmentids() {
        const dynamicstyles = new DynamicStyles();
        let equipmentids = this.getequipmentids();
        let ids = [];

        if (equipmentids) {
            // eslint-disable-next-line
            equipmentids.map(equipment => {

                ids.push(dynamicstyles.showequipmentid.call(this, equipment))
            })
        }
        return ids;
    }
    getequipmentid() {
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            return myequipment.myequipmentid;
        } else {
            return (this.state.myequipmentid)
        }
    }
    removeequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipment.myequipmentid)
        if (window.confirm(`Are you sure you want to remove ${myequipment.equipment}?`)) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const i = dynamicstyles.getprojectkey.call(this);
                const j = dynamicstyles.getscheduleequipmentbyid.call(this, equipment.equipmentid);
                myuser.company.projects.myproject[i].scheduleequipment.myequipment.splice(j, 1);
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: false })
            }
        }
    }
    handleequipment(myequipmentid) {

        const dynamicstyles = new DynamicStyles()
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment();
                    equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid, myequipment.timein, myequipment.timeout);
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].myequipmentid = myequipmentid;
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;
                    let profit = 0;
                    equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout);

                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid })
                }

            }

        }
    }
    handlecsiid(csiid) {
        const dynamicstyles = new DynamicStyles();

        const makeID = new MakeID();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        const csi = dynamicstyles.getcsibyid.call(this, csiid);
        if (csi) {
            csi_1 = csi.csi.substr(0, 2)
            csi_2 = csi.csi.substr(2, 2)
            csi_3 = csi.csi.substr(4, 2)
        }
        this.setState({ csi_1, csi_2, csi_3 })
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();

                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].csiid = csiid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let myequipmentid = this.state.myequipmentid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);

                    let proposalid = this.state.proposalid;
                    let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid);
                    let profit = 0;
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid })
                }

            }

        }
    }
    handlemilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();

                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].milestoneid = milestoneid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.scheduleequipmentid.call(this)
                    let providerid = myuser.providerid;
                    let myequipmentid = this.state.myequipmentid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;
                    let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid);
                    let profit = 0;
                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit)
                    if (myproject.hasOwnProperty("scheduleequipment")) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                    } else {
                        let scheduleequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;

                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeequipmentid: newEquipment.equipmentid })
                }

            }

        }
    }
    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        let csi = false;
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment) {
                csi = dynamicstyles.getcsibyid.call(this, myequipment.csiid)
            }

        } else {
            csi = dynamicstyles.getcsibyid.call(this, this.state.csiid)
        }

        if (csi) {
            return (`${csi.csi}-${csi.title}`)
        } else {
            return "";
        }

    }
    getmilestoneid() {
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            return myequipment.milestoneid;
        } else {
            return (this.state.milestoneid)
        }
    }
    gettotalhours() {
        let totalhours = "";
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            if (myequipment) {
                let timein = myequipment.timein;
                let timeout = myequipment.timeout;
                totalhours = calculatetotalhours(timeout, timein)
            }


        }
        return totalhours;
    }
    getequipmentrate() {
        let equipmentrate = 0;
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            equipmentrate = myequipment.equipmentrate;
        }
        return equipmentrate;
    }
    handleequipmentrate(equipmentrate) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (this.state.activeequipmentid) {
                let i = dynamicstyles.getprojectkey.call(this);
                let j = this.getactiveequipmentkey();
                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }

    }
    getamount() {
        let amount = 0;
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            let totalhours = calculatetotalhours(myequipment.timeout, myequipment.timein);
            let rate = Number(myequipment.equipmentrate);
            amount = totalhours * rate;
        }
        return amount;
    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const titleFont = dynamicstyles.gettitlefont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);

        const totalhours = +Number(this.gettotalhours()).toFixed(2)
        const amount = `$${Number(this.getamount()).toFixed(2)}`
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }} >

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /scheduleequipment
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Equipment ID <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                                        value={this.getequipmentid()}
                                        onChange={event => { this.handleequipment(event.target.value) }}>
                                        <option value={false}>Select Equipment</option>
                                        {this.loadequipment()}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.showtimes()}
                    {this.showmilestones()}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Total Hours <br />
                            {totalhours}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Rate <br />
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.getequipmentrate()}
                                onChange={event => { this.handleequipmentrate(event.target.value) }}
                            />

                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Amount <br />
                            {amount}
                        </div>
                    </div>


                    {dynamicstyles.showsaveproject.call(this)}

                    {this.loadequipmentids()}

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(ScheduleEquipment);