import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { formatDateStringDisplay, CreateActualMaterial, makeDatefromObj } from './functions';
import ActualMaterialDate from './actualmaterialdate';
import DynamicStyles from './dynamicstyles';
import CSI from './csi';
import MakeID from './makeids';
import MilestoneID from './milestoneid';
class ActualMaterials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', material: '', datein: new Date(), unit: '', quantity: '', unitcost: '', milestoneid: '', csiid: '', mymaterialid: '', calender: 'open', csi_1: '', csi_2: '', csi_3: '', csi_4:'' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        this.props.reduxProject({ activeprojectid: this.props.match.params.projectid })
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

    showmaterialids() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let materials = [];
        if (myproject) {
            if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.mymaterial.map(mymaterial => {
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
            let mymaterial = dynamicstyles.getactualmaterialbyid.call(this, materialid);
            let csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid);
            if (csi) {
                csi_1 = csi.csi.substr(0, 2)
                csi_2 = csi.csi.substr(2, 2)
                csi_3 = csi.csi.substr(4, 2)
            }
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
    removeactualmaterial(material) {
        const dynamicstyles = new DynamicStyles();
        const mymaterial = dynamicstyles.getmymaterialfromid.call(this, material.mymaterialid)
        if (window.confirm(`Are you sure you want to delete ${mymaterial.material}?`)) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const i = dynamicstyles.getprojectkey.call(this)
                const j = dynamicstyles.getactualmaterialkeybyid.call(this, material.materialid)
                myuser.company.projects.myproject[i].actualmaterials.mymaterial.splice(j, 1)
                if (myuser.company.projects.myproject[i].actualmaterials.mymaterial.length === 0) {
                    delete myuser.company.projects.myproject[i].actualmaterials.mymaterial;
                    delete myuser.company.projects.myproject[i].actualmaterials;
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
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivematerialbackground(mymaterial.materialid) }} key={mymaterial.materialid}>
            <span onClick={() => { this.makematerialactive(mymaterial.materialid) }} >{formatDateStringDisplay(mymaterial.timein)} <br />
                {material.material} CSI: {csi.csi}-{csi.title} Milestone: {milestone.milestone} <br />
                {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
            </span>
            <button style={{ ...styles.generalButton, ...removeIcon }}
                onClick={() => { this.removeactualmaterial(mymaterial) }}>{removeIconSmall()} </button>
        </div>)

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
        const milestoneid = new MilestoneID();
        const dynamicstyles = new DynamicStyles();
        const checkmaterialid = () => {
            let check = true;
            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                
                if (mymaterial.settlementid) {
                    check = false;
                }

            }
            return check;
        }
        const showcsi = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (csi.showCSI.call(this))
            } else {
                let mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                const csiid = mymaterial.csiid;
                const getcsi = dynamicstyles.getcsibyid.call(this, csiid)
                return (<span>CSI <br />
                    {getcsi.csi} - {getcsi.title} </span>)
            }
        }
        const showmilestoneid = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (milestoneid.showmilestoneid.call(this))
            } else {
                let mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                const milestoneid = mymaterial.milestoneid
                const getmilestone = dynamicstyles.getmilestonebyid.call(this, milestoneid)
                return (<span>Milestone <br />
                    {getmilestone.milestone} </span>)
            }
        }
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {showcsi()}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {showmilestoneid()}
                    </div>
                </div>)
        } else {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        {showcsi()}
                    </div>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        {showmilestoneid()}
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
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const amount = () => {
            let getamount = 0;
            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid)
                getamount = Number(mymaterial.quantity) * Number(mymaterial.unitcost);
                getamount = Number(getamount).toFixed(2)
                return (`$${getamount}`)
            }
        }
        const checkmaterialid = () => {
            let check = true;
            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                
                if (mymaterial.settlementid) {
                    check = false;
                }

            }
            return check;
        }

        const showquantity = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (<div style={{ ...styles.generalContainer }}>
                    Quantity <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getquantity()}
                        onChange={event => { this.handlequantity(event.target.value) }}

                    />
                </div>)
            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    Quantity <br />
                    {this.getquantity()}
                </div>)
            }
        }
        const showunit = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (<div style={{ ...styles.generalContainer }}>
                    Unit<br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getunit()}
                        onChange={event => { this.handleunit(event.target.value) }}
                    />
                </div>)
            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    Unit<br />
                    {this.getunit()}

                </div>)
            }
        }

        const showunitprice = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (<div style={{ ...styles.generalContainer }}>
                    Unit Price <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getunitcost()}
                        onChange={event => { this.handleunitcost(event.target.value) }}
                    />
                </div>)
            } else {
                return (<div style={{ ...styles.generalContainer }}>
                    Unit Price <br />
                    {this.getunitcost()}

                </div>)
            }
        }


        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    {showquantity()}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    {showunit()}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    {showunitprice()}
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                    Amount <br />
                    {amount()}
                </div>
            </div>
            )

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                {showquantity()}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                {showunit()}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                {showunitprice()}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Amount <br />
                                {amount()}
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
        const makeID = new MakeID();
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].mymaterialid = mymaterialid
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })

                        }
                    }
                } else {

                    let materialid = makeID.actualmaterialid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

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
        let csi_4 = ""
        const csi = dynamicstyles.getcsibyid.call(this, csiid);
        if (csi) {
            csi_1 = csi.csi.substr(0, 2)
            csi_2 = csi.csi.substr(2, 2)
            csi_3 = csi.csi.substr(4, 2)
            csi_4 = csi.csi.substr(7,2)
        }
        this.setState({ csi_1, csi_2, csi_3, csi_4 })

        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].csiid = csiid
                        this.props.reduxUser(myuser);
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })

                        }

                    }
                } else {
                    let materialid = makeID.actualmaterialid.call(this);
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    handlemilestoneid(milestoneid) {
        const makeID = new MakeID();
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].milestoneid = milestoneid
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })

                        }


                    }
                } else {
                    let materialid = makeID.actualmaterialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    handlequantity(quantity) {
        const makeID = new MakeID();
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].quantity = quantity
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }
                    }
                } else {
                    let materialid = makeID.actualmaterialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let unit = this.state.unit;
                    let unitcost = this.state.unitcost;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }

    handleunit(unit) {
        const makeID = new MakeID();
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unit = unit
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }
                    }

                } else {
                    let materialid = makeID.actualmaterialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unitcost = this.state.unitcost;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: newMaterial.materialid })

                }
            }
        }
    }
    handleunitcost(unitcost) {
        const makeID = new MakeID();
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);
                if (this.state.activematerialid) {
                    const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                    if (mymaterial) {
                        let j = dynamicstyles.getactualmaterialkeybyid.call(this, this.state.activematerialid)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].unitcost = unitcost
                        this.props.reduxUser(myuser);
                        if (mymaterial.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mymaterial.invoiceid)

                        } else {
                            this.setState({ render: 'render' })
                        }

                    }
                } else {
                    let materialid = makeID.actualmaterialid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid
                    let mymaterialid = this.state.mymaterialid;
                    let timein = makeDatefromObj(this.state.datein);
                    let milestoneid = this.state.milestoneid;
                    let quantity = this.state.quantity;
                    let unit = this.state.unit;
                    let invoiceid = "";
                    let profit = 0;
                    let newMaterial = CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit);
                    if (myproject.hasOwnProperty("actualmaterials")) {
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial.push(newMaterial)
                    } else {
                        let actualmaterials = { mymaterial: [newMaterial] }
                        myuser.company.projects.myproject[i].actualmaterials = actualmaterials;
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

                options.push(
                    <option
                        key={materials.materialid}
                        value={materials.materialid}>{materials.material}</option>)

            })

        }
        return options;

    }
    getactivematerial() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let material = false;
        if (myproject) {
            if (this.state.activematerialid) {
                let materialid = this.state.activematerialid;
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
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
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
        let key = false;
        if (myproject) {
            if (this.state.activematerialid) {
                let materialid = this.state.activematerialid;
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map((mymaterial, i) => {
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

            return mymaterial.milestoneid;
        } else {
            return this.state.milestoneid;
        }
    }
    getquantity() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            return mymaterial.quantity;
        } else {
            return this.state.quantity;
        }
    }
    getunit() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            return mymaterial.unit;
        } else {
            return this.state.unit;
        }
    }
    getunitcost() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            return mymaterial.unitcost;
        } else {
            return this.state.unitcost;
        }
    }

    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const Datein = new ActualMaterialDate();
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const checkmaterialid = () => {
            let check = true;
            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid);
                 
                if (mymaterial.settlementid) {
                    check = false;
                }

            }
            return check;
        }

        const showmaterialdate = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (Datein.showdatein.call(this))
            } else {
                const mymaterial = dynamicstyles.getactualmaterialbyid.call(this, this.state.activematerialid)
                return (<span style={{ ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                    Actual Material Date <br />
                    {formatDateStringDisplay(mymaterial.timein)}</span>)
            }
        }
        const showmaterial = () => {
            if (!this.state.activematerialid || checkmaterialid()) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Material <br />  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getmaterial()}
                            onChange={event => { this.handlemymaterial(event.target.value) }}
                        >
                            <option value={false}>Select A MaterialID</option>
                            {this.showmymaterials()}

                        </select>
                    </div>
                </div>)
            } else {
                const mymaterialid = this.getmaterial();
                const material = dynamicstyles.getmymaterialfromid.call(this, mymaterialid);
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Material <br />
                        {material.material}
                    </div>
                </div>
                )
            }
        }

        if (myuser) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /actualmaterials
                </div>
                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            {showmaterialdate()}
                        </div>
                    </div>
                    {showmaterial()}
                    {this.showmilestonemenus()}


                    {this.showquantitymenus()}

                    {dynamicstyles.showsaveproject.call(this)}

                    {this.showmaterialids()}

                </div>
            </div>)
        }
        else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Actual ,aterials </span>
            </div>)
        }
    }
    
    }


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(ActualMaterials);