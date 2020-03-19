import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { CreateActualEquipment, inputDateObjOutputAdjString, calculatetotalhours } from './functions'
import ActualEquipmentTimeIn from './actualequipmenttimein';
import ActualEquipmentTimeOut from './actualequipmenttimeout';
import DynamicStyles from './dynamicstyles';
import CSI from './csi'
import MakeID from './makeids';
import MilestoneID from './milestoneid';
class ActualEquipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, activeequipmentid: '', myequipmentid: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            milestoneid: '', csiid: '', csi_1: '', csi_2: '', csi_3: '',
            invoiceid: ''
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
        const dynamicstyles = new DynamicStyles();
        let equipment = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
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
    getactiveequipmentkey() {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject.hasOwnProperty("actualequipment")) {
                // eslint-disable-next-line
                myproject.actualequipment.myequipment.map((myequipment, i) => {
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
        const Timein = new ActualEquipmentTimeIn();
        const Timeout = new ActualEquipmentTimeOut();
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
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
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
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let equipmentids = false;
        if (myproject.hasOwnProperty("actualequipment")) {
            equipmentids = myproject.actualequipment.myequipment;
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
            let myequipment = dynamicstyles.getactualequipmentbyid.call(this, equipmentid);
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
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
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
        let equipmentids = this.getequipmentids();
        const dynamicstyles = new DynamicStyles();
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
    handleequipment(myequipmentid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        const makeID = new MakeID();
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                let equipmentrate = 0;
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    const myequipment = this.getactiveequipment();
                    equipmentrate = +Number(dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid, myequipment.timein, myequipment.timeout)).toFixed(4);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].myequipmentid = myequipmentid;
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.actualequipmentid.call(this);
                    let providerid = myuser.providerid;
                    let csiid = this.state.csiid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout)
                    let invoiceid = this.state.invoiceid;
                    let profit = 0;
                    equipmentrate = +Number(dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid, timein, timeout)).toFixed(4);
                    let newEquipment = CreateActualEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit)
                    if (myproject.hasOwnProperty("actualequipment")) {
                        myuser.company.projects.myproject[i].actualequipment.myequipment.push(newEquipment)
                    } else {
                        let actualequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].actualequipment = actualequipment;

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

        let myuser = this.getuser();
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].csiid = csiid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.actualequipmentid.call(this);
                    let providerid = myuser.providerid;
                    let myequipmentid = this.state.myequipmentid;
                    let milestoneid = this.state.milestoneid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let invoiceid = this.state.invoiceid;
                    let equipmentrate = 0

                    let profit = 0;
                    let newEquipment = CreateActualEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit)
                    if (myproject.hasOwnProperty("actualequipment")) {
                        myuser.company.projects.myproject[i].actualequipment.myequipment.push(newEquipment)
                    } else {
                        let actualequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].actualequipment = actualequipment;

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
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].milestoneid = milestoneid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let equipmentid = makeID.actualequipmentid.call(this);
                    let providerid = myuser.providerid;
                    let myequipmentid = this.state.myequipmentid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let invoiceid = this.state.invoiceid;
                    let equipmentrate = +Number(dynamicstyles.calculateequipmentratebyid.call(this, myequipmentid)).toFixed(4);
                    let profit = 0;
                    let newEquipment = CreateActualEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit)
                    if (myproject.hasOwnProperty("actualequipment")) {
                        myuser.company.projects.myproject[i].actualequipment.myequipment.push(newEquipment)
                    } else {
                        let actualequipment = { myequipment: [newEquipment] }
                        myuser.company.projects.myproject[i].actualequipment = actualequipment;

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
                myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
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
    removeequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipment.myequipmentid)
        if (window.confirm(`Are you sure you want to remove ${myequipment.equipment}?`)) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const i = dynamicstyles.getprojectkey.call(this);
                const j = dynamicstyles.getactualequipmentbyid.call(this, equipment.equipmentid);
                myuser.company.projects.myproject[i].actualequipment.myequipment.splice(j, 1);
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: false })
            }
        }
    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const dynamicstyles = new DynamicStyles();
        const totalhours = +Number(this.gettotalhours()).toFixed(2)
        const amount = `$${Number(this.getamount()).toFixed(2)}`
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }} >

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /actualequipment
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
                            {this.getequipmentrate()}

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

export default connect(mapStateToProps, actions)(ActualEquipment);