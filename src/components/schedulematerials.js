import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { saveProjectIcon, removeIconSmall, dateYearDown, dateYearUp, dateMonthDown, dateMonthUp } from './svg';
import { inputUTCStringForMaterialIDWithTime, makeID, CreateMyMaterial } from './functions';
import DateIn from './datein';
class ScheduleMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', material: '', datein: new Date(), unit: '', quantity: '', unitcost: '', milestoneid: '', csiid: '', mymaterialid: '', calendar: 'open' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
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
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false })
        } else {
            this.setState({ activematerialid: materialid })
        }
    }
    getactivematerialbackground(materialid) {
        if (this.state.activematerialid === materialid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        const csi = this.getcsibyid(mymaterial.csiid);
        const milestone = this.getmilestonebyid(mymaterial.milestoneid)
        const material = this.getmymaterialfromid(mymaterial.mymaterialid)
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivematerialbackground(mymaterial.materialid) }} onClick={() => { this.makematerialactive(mymaterial.materialid) }} key={mymaterial.materialid}>
            {inputUTCStringForMaterialIDWithTime(mymaterial.timein)} <br />
            {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
            {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
            <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
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
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        CSI  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getcsiid()}
                            onChange={event => { this.handlecsiid(event.target.valie) }}>
                            <option value={false}>Select A CSI</option>
                            {this.loadcsiids()}
                        </select>
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
                        CSI  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getcsiid()}
                            onChange={event => { this.handlecsiid(event.target.value) }}>
                            <option value={false}>Select A CSI</option>
                            {this.loadcsiids()}
                        </select>
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
    showquantitymenus() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
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
                    Amount
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
                    let timein = this.state.timein;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
                    let timein = this.state.timein;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
                    let timein = this.state.timein;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
                    let timein = this.state.timein;
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
                    let timein = this.state.timein;
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unitcost = this.state.unitcost;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
                    let timein = this.state.timein;
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let proposalid = "";
                    let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
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
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            console.log(mymaterial)
            return mymaterial.csiid;
        } else {
            return this.state.csiid;
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
    showdatemenu() {
        const styles = MyStylesheet();
        const Datein = new DateIn();
        const smallFont = this.getSmallFont();
        if (this.state.calendar === 'open') {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont, ...styles.calendarContainer, ...styles.marginAuto }}>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.yeardown.call(this) }}> {dateYearDown()}</button>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.decreasemonth.call(this) }}>{dateMonthDown()} </button>
                            </div>
                            <div style={{ ...styles.flex2, ...styles.smallFont, ...StyleSheet.alignCenter }}>
                                {Datein.showdateforcalendar.call(this)}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.increasemonth.call(this) }}>{dateMonthUp()} </button>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                    onClick={() => { Datein.yearup.call(this) }}> {dateYearUp()}</button>
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...smallFont }}>

                                <div className="calendar-grid">
                                    {Datein.showgrid.call(this)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
        } else {
            return;
        }
    }
    showdatein() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const Datein = new DateIn();
        const smallFont = this.getSmallFont();

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.dateinContainer, ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }}>
                            Enter Date <br /> <input type="date"
                                value={Datein.getvalue.call(this)}
                                style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                onChange={event => { Datein.handleChange.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...smallFont, ...styles.generalFont }}>
                            <button style={{ ...styles.dateButton, ...styles.generalButton }}
                                onClick={() => { Datein.showCalender.call(this) }}
                                id="btn-opendatemenu">
                                {Datein.handleopendatemenu.call(this)}
                            </button>
                        </div>
                    </div>

                    {this.showdatemenu()}

                </div>
            </div>
        )

    }

    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const saveprojecticon = this.getsaveprojecticon();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                        /schedulematerials
                </div>
                </div>
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {this.showdatein()}
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

                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        &nbsp;
                        </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }}>{saveProjectIcon()}</button>
                    </div>
                </div>

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