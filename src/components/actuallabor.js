import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { inputUTCStringForLaborID, calculatetotalhours, CreateActualLabor, inputDateObjOutputAdjString } from './functions'
import ActualLaborTimeOut from './actuallabortimeout'
import DynamicStyles from './dynamicstyles';
import ActualLaborTimeIn from './actuallabortimein';
import CSI from './csi';
import MakeID from './makeids';
import MilestoneID from './milestoneid';
class ActualLabor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, employeeid: '', activelaborid: '', csiid: '', milestoneid: '', description: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            activetimeincalendar: true, activetimeoutcalendar: true,
            csi_1: '', csi_2: '', csi_3: ''
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

    showlaborids() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let laborids = [];

        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {

                laborids.push(this.showlaborid(mylabor))
            })

        }
        return laborids;
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    makelaboractive(laborid) {

        const dynamicstyles = new DynamicStyles();
        let csi_1 = "";
        let csi_2 = "";
        let csi_3 = "";
        if (this.state.activelaborid === laborid) {

            this.setState({ activelaborid: false, csi_1, csi_2, csi_3 })
        } else {

            let mylabor = dynamicstyles.getactuallaborbyid.call(this, laborid);
            if (mylabor) {
                let csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid)
                if (csi) {
                    csi_1 = csi.csi.substr(0, 2)
                    csi_2 = csi.csi.substr(2, 2)
                    csi_3 = csi.csi.substr(4, 2)
                }
            }
            this.setState({ activelaborid: laborid, csi_1, csi_2, csi_3 })
        }
    }
    getactivelaborbackground(laborid) {
        if (this.state.activelaborid === laborid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    removelaborid(mylabor) {
        if (window.confirm(`Do you want to erase ${mylabor.description}?`)) {
            const dynamicstyles = new DynamicStyles();
            const i = dynamicstyles.getprojectkey.call(this)
            const j = dynamicstyles.getactuallaborkeybyid.call(this, mylabor.laborid);
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                myuser.company.projects.myproject[i].actuallabor.mylabor.splice(j, 1);
                if (myuser.company.projects.myproject[i].actuallabor.mylabor.length === 0) {
                    delete myuser.company.projects.myproject[i].actuallabor.mylabor
                    delete myuser.company.projects.myproject[i].actuallabor;
                }
                this.props.reduxUser(myuser)
                this.setState({ activelaborid: false })
            }
        }
    }
    showlaborid(mylabor) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const removeIcon = this.getremoveicon();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid);
        let employee = this.getemployeebyproviderid(mylabor.providerid)
        let hourlyrate = dynamicstyles.gethourlyrate.call(this, employee.providerid)


        return (
            <div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                <span style={{ ...this.getactivelaborbackground(mylabor.laborid) }} onClick={() => { this.makelaboractive(mylabor.laborid) }}>
                    {employee.firstname} {employee.lastname}: {mylabor.description} CSI:{csi.csi}-{csi.title}<br />
                    From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                    ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * hourlyrate).toFixed(2)}
                </span>
                <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removelaborid(mylabor) }}>{removeIconSmall()} </button>
            </div>)
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
    loadcsiids() {
        let company = this.getcompany();
        let options = [];
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    options.push(<option value={code.csiid}>{code.csi}-{code.title}</option>)
                })
            }
        }
        return options;
    }

    getemployeebyproviderid(providerid) {

        let allusers = this.getallusers();
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
    loademployees() {
        let company = this.getcompany();
        let options = [];
        if (company) {
            if (company.office.hasOwnProperty("employees")) {
                // eslint-disable-next-line
                company.office.employees.employee.map(employee => {
                    let myemployee = this.getemployeebyproviderid(employee.providerid)

                    options.push(<option value={myemployee.providerid}>{myemployee.firstname} {myemployee.lastname}</option>)
                })

            }
        }
        return options;
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
    getactivelaborkey() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let key = false;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
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
        }
        return key;
    }
    getactivelabor() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let labor = false;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (myproject) {
                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            labor = mylabor;
                        }
                    })
                }
            }
        }
        return labor;
    }
    getemployee() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();

            if (mylabor) {
                return (mylabor.providerid)


            }

        } else {
            return (this.state.employeeid);
        }
    }

    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();

            let csi = {};
            if (mylabor) {
                csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid)
            } else {
                csi = dynamicstyles.getcsibyid.call(this, this.state.csiid)
            }
            return (`${csi.csi}-${csi.title}`)
        } else {
            return ("")
        }
    }
    getmilestoneid() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();

            if (mylabor) {
                return (mylabor.milestoneid)
            }

        } else {
            return (this.state.milestoneid);
        }
    }
    getdescription() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();

            if (mylabor) {
                return (mylabor.description)
            }

        } else {
            return (this.state.description);
        }
    }

    handledescription(description) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const makeID = new MakeID();
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    if (mylabor) {
                        let j = dynamicstyles.getactuallaborkeybyid.call(this, this.state.activelaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].description = description;
                        this.props.reduxUser(myuser)
                        if (mylabor.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                        } else {
                            this.setState({ render: 'render' })
                        }
                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let csiid = this.state.csiid;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let invoiceid = "";
                    let profit = 0;
                    let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit)
                    this.createnewlabor(newlabor, myuser, i)
                }

            }

        }

    }
    handlecsiid(csiid) {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        let csi = dynamicstyles.getcsibyid.call(this, csiid)
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2)
        this.setState({ csi_1, csi_2, csi_3 })
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    if (mylabor) {
                        let j = dynamicstyles.getactuallaborkeybyid.call(this, this.state.activelaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].csiid = csiid;
                        this.props.reduxUser(myuser)
                        if (mylabor.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let milestoneid = this.state.milestoneid;
                    let description = this.state.description;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let invoiceid = "";
                    let profit = 0;
                    let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                    let newlabor = CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit)
                    this.createnewlabor(newlabor, myuser, i)
                }

            }

        }
    }
    handlemilestoneid(milestoneid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const makeID = new MakeID();
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    if (mylabor) {
                        let j = dynamicstyles.getactuallaborkeybyid.call(this, this.state.activelaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].milestoneid = milestoneid;
                        this.props.reduxUser(myuser)
                        if (mylabor.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let providerid = this.state.employeeid;
                    let csiid = this.state.csiid;
                    let description = this.state.description;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let invoiceid = "";
                    let profit = 0;
                    let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                    let newlabor = CreateActualLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, invoiceid, profit)
                    this.createnewlabor(newlabor, myuser, i)
                }

            }
        }
    }

    handleproviderid(providerid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const makeID = new MakeID();
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, this.props.match.params.projectid);
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    if (mylabor) {
                        let j = dynamicstyles.getactuallaborkeybyid.call(this, this.state.activelaborid);
                        myuser.company.projects.myproject[i].actuallabor.mylabor[j].providerid = providerid;
                        this.props.reduxUser(myuser)
                        if (mylabor.invoiceid) {
                            dynamicstyles.updateinvoice.call(this, mylabor.invoiceid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                } else {
                    let laborid = makeID.actuallaborid.call(this)
                    let csiid = this.state.csiid;
                    let description = this.state.description;
                    let timein = inputDateObjOutputAdjString(this.state.timein);
                    let timeout = inputDateObjOutputAdjString(this.state.timeout);
                    let milestoneid = this.state.milestoneid;
                    let invoiceid = "";
                    let profit = 0;
                    let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                    let newlabor = CreateActualLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, invoiceid, profit)
                    this.createnewlabor(newlabor, myuser, i)
                }

            }

        }
    }
    handlelaborrate(laborrate) {
        const dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        const makeID = new MakeID();
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].actuallabor.mylabor[j].laborrate = laborrate;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID.actuallaborid.call(this)
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let milestoneid = this.state.milestoneid;
                let providerid = this.state.employeeid;
                let profit = 0;
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                let newlabor = CreateActualLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, profit)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    createnewlabor(newlabor, myuser, i) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (myproject) {
            if (myproject.hasOwnProperty("actuallabor")) {
                myuser.company.projects.myproject[i].actuallabor.mylabor.push(newlabor)
            } else {
                let actuallabor = { mylabor: [newlabor] }
                myuser.company.projects.myproject[i].actuallabor = actuallabor;
            }
            this.props.reduxUser(myuser)
            this.setState({ activelaborid: newlabor.laborid })
        }
    }

    handletimes() {
        const styles = MyStylesheet();
        const Timein = new ActualLaborTimeIn();
        const Timeout = new ActualLaborTimeOut();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const checklaborid = () => {
            let check = true;
            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);

                const invoiceid = mylabor.invoiceid;
                if (invoiceid) {
                    console.log(invoiceid)
                    check = dynamicstyles.checkupdateinvoice.call(this, invoiceid)

                }
            }
            console.log(check)
            return check;
        }

        const showtimeout = () => {
            if (!this.state.activelaborid || checklaborid()) {
                return (Timeout.showtimeout.call(this))
            } else {
                let mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid)
                const timeout = mylabor.timeout;
                return (<span style={{ ...styles.generalFont, ...regularFont }}>Time Out {inputUTCStringForLaborID(timeout)}</span>)
            }
        }
        const showtimein = () => {
            if (!this.state.activelaborid || checklaborid()) {
                return (Timein.showtimein.call(this))
            } else {
                let mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid)
                const timein = mylabor.timein;
                return (<span style={{ ...styles.generalFont, ...regularFont }}>Time In {inputUTCStringForLaborID(timein)}</span>)
            }
        }
        if (this.props.navigation) {

            let navigation = this.props.navigation.position;

            if (this.state.width > 1200 && navigation === 'closed') {

                return (<div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                        {showtimein()}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                        {showtimeout()}
                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont }}>
                                    {showtimein()}
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                                        {showtimeout()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }

        }
    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const titleFont = dynamicstyles.gettitlefont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = new CSI();
        const milestoneid = new MilestoneID();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const showdescription = () => {
                if (checklaborid() || !this.state.activelaborid) {
                    return (<div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Description <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getdescription()}
                                onChange={event => { this.handledescription(event.target.value) }}
                            />
                        </div>
                    </div>)
                } else {
                    return (<div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Description <br />
                            {this.getdescription()}
                        </div>
                    </div>)
                }
            }
            const showmilestoneid = () => {
                if (checklaborid() || !this.state.activelaborid) {
                    return (milestoneid.showmilestoneid.call(this))
                } else {
                    let mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    const milestoneid = mylabor.milestoneid
                    const getmilestone = dynamicstyles.getmilestonebyid.call(this, milestoneid)
                    return (<span>Milestone <br />
                        {getmilestone.milestone} </span>)
                }
            }
            const showcsi = () => {
                if (checklaborid() || !this.state.activelaborid) {
                    return (csi.showCSI.call(this))
                } else {
                    let mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);
                    const csiid = mylabor.csiid;
                    const getcsi = dynamicstyles.getcsibyid.call(this, csiid)
                    return (<span>CSI <br />
                        {getcsi.csi} - {getcsi.title} </span>)
                }
            }
            const checklaborid = () => {
                let check = true;
                if (this.state.activelaborid) {
                    const mylabor = dynamicstyles.getactuallaborbyid.call(this, this.state.activelaborid);

                    const invoiceid = mylabor.invoiceid;
                    if (invoiceid) {
                        console.log(invoiceid)
                        check = dynamicstyles.checkupdateinvoice.call(this, invoiceid)

                    }
                }
                console.log(check)
                return check;
            }
            const showemployee = () => {
                if (checklaborid()) {
                    return (<div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                                value={this.getemployee()}
                                onChange={event => { this.handleproviderid(event.target.value) }}>
                                <option value={false}>Select An Employee</option>
                                {this.loademployees()}
                            </select>
                        </div>
                    </div>)
                } else {
                    const providerid = this.getemployee()
                    const employee = dynamicstyles.getemployeebyproviderid.call(this, providerid)
                    return (<span style={{ ...regularFont, ...styles.generalFont, ...styles.topMargin15 }}>{employee.firstname} {employee.lastname}</span>)
                }
            }
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /actuallabor
                </div>
                    </div>


                    {showemployee()}


                    {this.handletimes()}


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            {showcsi()}
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            {showmilestoneid()}
                        </div>
                    </div>


                    {showdescription()}


                    {dynamicstyles.showsaveproject.call(this)}

                    {this.showlaborids()}


                </div></div>)

        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Actual Labor </span>
            </div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(ActualLabor);