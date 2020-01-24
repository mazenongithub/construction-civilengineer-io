import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import ScheduleEquipmentTimeIn from './scheduleequipmenttimein';
import ScheduleEquipmentTimeOut from './scheduleequipmenttimeout';
import DynamicStyles from './dynamicstyles';
import { CreateScheduleEquipment, makeID, inputUTCStringForLaborID, inputDateObjOutputAdjString } from './functions'
import CSI from './csi'

class ScheduleEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, activeequipmentid: '', myequipmentid: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            milestoneid: '', csiid: '', csi_1: '', csi_2: '', csi_3: ''
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)


    }
    componentDidMount() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        console.log(myuser)
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.props.reduxNavigation({ activeprojectid: this.props.match.params.projectid })

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
        let myuser = this.getuser();
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
        let myuser = this.getuser();
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
        let myuser = this.getuser();
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
        let myuser = this.getuser();
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
    loadmilestoneids() {
        let myproject = this.getproject();
        let options = [];
        if (myproject.hasOwnProperty("projectmilestones")) {
            // eslint-disable-next-line
            myproject.projectmilestones.mymilestone.map(mymilestone => {
                options.push(<option
                    key={mymilestone.milestoneid}
                    value={mymilestone.milestoneid}>{mymilestone.milestone}</option>)
            })

        }
        return options;
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
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    {csi.showCSI.call(this)}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    MilestoneID
                    <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                        value={this.getmilestoneid()}
                        onChange={event => { this.handlemilestoneid(event.target.value) }}>
                        <option value={false}>Select A Project Milestone</option>
                        {this.loadmilestoneids()}
                    </select>
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
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            MilestoneID
                            <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                                value={this.getmilestoneid()}
                                onChange={event => { this.handlemilestoneid(event.target.value) }}>
                                <option value={false}>Select A MilestoneID</option>
                                {this.loadmilestoneids()}
                            </select>
                        </div>
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
            csi_1 = csi.csi.substr(0, 2)
            csi_2 = csi.csi.substr(2, 2)
            csi_3 = csi.csi.substr(4, 2)
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
    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const myequipment = this.getequipmentfromid(equipment.myequipmentid);
        const milestone = this.getmilestonebyid(equipment.milestoneid)
        const csi = this.getcsibyid(equipment.csiid)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...this.getactivematerialbackground(equipment.equipmentid) }} key={equipment.equipmentid}
            onClick={() => { this.makeequipmentactive(equipment.equipmentid) }}>
            {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)}
            CSI: {csi.csi} - {csi.title} <br />
            Milestone: {milestone.milestone}
        </div>)
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
        let equipmentids = this.getequipmentids();
        let ids = [];

        if (equipmentids) {
            // eslint-disable-next-line
            equipmentids.map(equipment => {

                ids.push(this.showequipmentid(equipment))
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
    handleequipment(myequipmentid) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();

                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].myequipmentid = myequipmentid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID(16)
                    let providerid = myuser.provderid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;

                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid)
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
        const csi = dynamicstyles.getcsibyid.call(this, csiid);
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2)
        this.setState({ csi_1, csi_2, csi_3 })
        let myuser = this.getuser();
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
                    let equipmentid = makeID(16)
                    let providerid = myuser.provderid;
                    let myequipmentid = this.state.myequipmentid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    console.log(timein, timeout)
                    let proposalid = this.state.proposalid;

                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid)
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
        let myuser = this.getuser();
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
                    let equipmentid = makeID(16)
                    let providerid = myuser.provderid;
                    let myequipmentid = this.state.myequipmentid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let proposalid = this.state.proposalid;

                    let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid)
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
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const dynamicstyles = new DynamicStyles();
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
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Rate <br />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Amount <br />
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