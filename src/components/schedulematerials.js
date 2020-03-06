import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { formatDateStringDisplay, makeID, CreateMyMaterial, makeDatefromObj } from './functions';
import ScheduleMaterialDate from './schedulematerialdate';
import DynamicStyles from './dynamicstyles';
import CSI from './csi'

class ScheduleMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', material: '', datein: new Date(), unit: '', quantity: '', unitcost: '', milestoneid: '', csiid: '', mymaterialid: '', calender: 'open', csi_1: '', csi_2: '', csi_3: '' }
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

    getSmallFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font24)
        } else {
            return (styles.font18)
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
    showmaterialids() {
        let myproject = this.getproject();
        let materials = [];
        if (myproject) {
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    materials.push(this.showmaterialid(mymaterial))
                })
            }
        }
        return materials;

    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
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
    makematerialactive(materialid) {
        const dynamicstyles = new DynamicStyles();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false, csi_1, csi_2, csi_3, csiid: '' })
        } else {
            let mymaterial = dynamicstyles.getschedulematerialbyid.call(this, materialid);
            let csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid);
            csi_1 = csi.csi.substr(0, 2)
            csi_2 = csi.csi.substr(2, 2)
            csi_3 = csi.csi.substr(4, 2)
            this.setState({ activematerialid: materialid, csi_1, csi_2, csi_3 })
        }
    }
    getactivematerialbackground(materialid) {
        if (this.state.activematerialid === materialid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    removeschedulematerial(material) {
        const dynamicstyles = new DynamicStyles();
        const mymaterial = dynamicstyles.getmymaterialfromid.call(this, material.mymaterialid)
        if (window.confirm(`Are you sure you want to delete ${mymaterial.material}?`)) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const i = dynamicstyles.getprojectkey.call(this)
                const j = dynamicstyles.getschedulematerialkeybyid.call(this, material.materialid)
                myuser.company.projects.myproject[i].schedulematerials.mymaterial.splice(j, 1)
                if (myuser.company.projects.myproject[i].schedulematerials.mymaterial.length === 0) {
                    delete myuser.company.projects.myproject[i].schedulematerials.mymaterial;
                    delete myuser.company.projects.myproject[i].schedulematerials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: false })
            }
        }
    }
    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        const csi = this.getcsibyid(mymaterial.csiid);
        const milestone = this.getmilestonebyid(mymaterial.milestoneid)
        const material = this.getmymaterialfromid(mymaterial.mymaterialid)
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivematerialbackground(mymaterial.materialid) }}>
            <span onClick={() => { this.makematerialactive(mymaterial.materialid) }} key={mymaterial.materialid}>{formatDateStringDisplay(mymaterial.timein)} <br />
                {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
                {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
            </span>
            <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeschedulematerial(mymaterial) }}>{removeIconSmall()} </button>
        </div>)

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

    showmilestonemenus() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const csi = new CSI();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {csi.showCSI.call(this)}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        MilestoneID  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getmilestoneid()}
                            onChange={event => { this.handlemilestoneid(event.target.value) }}>
                            <option value={false}>Select A MilestoneID</option>
                            {this.loadmilestoneids()}
                        </select>
                    </div>
                </div>)
        } else {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        {csi.showCSI.call(this)}
                    </div>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        MilestoneID  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getmilestoneid()}
                            onChange={event => { this.handlemilestoneid(event.target.value) }}>
                            <option value={false}>Select A MilestoneID</option>
                            {this.loadmilestoneids()}
                        </select>
                    </div>
                </div>)

        }
    }
    getamount() {
        let amount = 0;
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                amount = Number(mymaterial.quantity) * Number(mymaterial.unitcost);
            }
        }
        return amount;
    }
    showquantitymenus() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const amount = `$${this.getamount().toFixed(2)}`;
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    Quantity <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getquantity()}
                        onChange={event => { this.handlequantity(event.target.value) }}

                    />
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    Unit<br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getunit()}
                        onChange={event => { this.handleunit(event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    Unit Price <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getunitcost()}
                        onChange={event => { this.handleunitcost(event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    Amount <br />
                    {amount}
                </div>
            </div>
            )

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Quantity <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getquantity()}
                                    onChange={event => { this.handlequantity(event.target.value) }}

                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Unit<br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getunit()}
                                    onChange={event => { this.handleunit(event.target.value) }} />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Unit Price <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getunitcost()}
                                    onChange={event => { this.handleunitcost(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Amount
                   </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    getmymaterial() {
        let myuser = this.getuser();
        let mymaterial = false;
        if (myuser) {
            if (myuser.company.hasOwnProperty("materials")) {
                mymaterial = myuser.company.materials.mymaterial;
            }
        }
        return mymaterial;
    }
    handlemymaterial(mymaterialid) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].mymaterialid = mymaterialid
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

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
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].csiid = csiid
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

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
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].milestoneid = milestoneid
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    handlequantity(quantity) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    handleunit(unit) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }
    handleunitcost(unitcost) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let materialid = makeID(16);
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let proposalid = "";
                    let profit = 0;
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit);
                    if (myproject.hasOwnProperty("schedulematerials")) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                    } else {
                        let schedulematerials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
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
    getmymaterialfromid(materialid) {
        let company = this.getcompany();
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
    showmymaterials() {
        let material = this.getmymaterial();

        let options = [];
        if (material) {
            // eslint-disable-next-line
            material.map(mymaterial => {
                let materials = this.getmymaterialfromid(mymaterial.materialid)
                console.log(materials)
                options.push(
                    <option
                        key={materials.materialid}
                        value={materials.materialid}>{materials.material}</option>)

            })

        }
        return options;

    }
    getactivematerial() {
        let myproject = this.getproject();
        let material = false;
        if (myproject) {
            if (this.state.activematerialid) {
                let materialid = this.state.activematerialid;
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            material = mymaterial;
                        }
                    })
                }
            }
        }
        return material;
    }
    getactivematerialkey() {
        let myproject = this.getproject();
        let key = false;
        if (myproject) {
            if (this.state.activematerialid) {
                let materialid = this.state.activematerialid;
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map((mymaterial, i) => {
                        if (mymaterial.materialid === materialid) {
                            key = i
                        }
                    })
                }
            }
        }
        console.log("ACTIVEMATERIALKEY", key)
        return key;
    }
    getmaterial() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.mymaterialid;
        } else {
            return this.state.mymaterialid;
        }
    }
    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        let csi = false;
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid)
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
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.milestoneid;
        } else {
            return this.state.milestoneid;
        }
    }
    getquantity() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.quantity;
        } else {
            return this.state.quantity;
        }
    }
    getunit() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.unit;
        } else {
            return this.state.unit;
        }
    }
    getunitcost() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.unitcost;
        } else {
            return this.state.unitcost;
        }
    }


    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const titleFont = dynamicstyles.gettitlefont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const Datein = new ScheduleMaterialDate();

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                        /schedulematerials
                </div>
                </div>
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {Datein.showdatein.call(this)}
                    </div>
                </div>
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Material <br />  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getmaterial()}
                            onChange={event => { this.handlemymaterial(event.target.value) }}
                        >
                            <option value={false}>Select A MaterialID</option>
                            {this.showmymaterials()}

                        </select>
                    </div>
                </div>
                {this.showmilestonemenus()}


                {this.showquantitymenus()}


                {dynamicstyles.showsaveproject.call(this)}

                {this.showmaterialids()}


            </div>
        </div>)
    }
}


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(ScheduleMaterials);