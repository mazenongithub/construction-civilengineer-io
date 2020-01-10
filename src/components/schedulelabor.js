import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { saveProjectIcon, removeIconSmall } from './svg';
import { inputUTCStringForLaborID, calculatetotalhours, makeID, CreateScheduleLabor } from './functions'
class ScheduleLabor extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, employeeid: '', activelaborid: '', csiid: '', milestoneid: '', description: '', timein: '2019-04-30 17:34:33', timeout: '2019-04-30 20:32:33' }
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

    showlaborids() {
        let myproject = this.getproject();
        let laborids = [];

        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                console.log(mylabor)
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
        console.log(laborid)
        if (this.state.activelaborid === laborid) {
            this.setState({ activelaborid: false })
        } else {
            this.setState({ activelaborid: laborid })
        }
    }
    getactivelaborbackground(laborid) {
        if (this.state.activelaborid === laborid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }

    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const removeIcon = this.getremoveicon();
        const regularFont = this.getRegularFont();
        const csi = this.getcsibyid(mylabor.csiid);
        let employee = this.getemployeebyproviderid(mylabor.providerid)
        console.log(employee)
        let hourlyrate = this.gethourlyrate(employee.providerid)
        console.log(mylabor)
        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...this.getactivelaborbackground(mylabor.laborid) }} onClick={() => { this.makelaboractive(mylabor.laborid) }}>

            {employee.firstname} {employee.lastname}: {mylabor.description} CSI:{csi.csi}-{csi.title}<br />
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}
            <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
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
        let myuser = this.getuser();
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
    loadmilestoneids() {
        let myproject = this.getproject();
        let options = [];
        if (myproject.hasOwnProperty("projectmilestones")) {
            // eslint-disable-next-line
            myproject.projectmilestones.mymilestone.map(mymilestone => {
                options.push(<option value={mymilestone.milestoneid}>{mymilestone.milestone}</option>)
            })

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
        let myproject = this.getproject();
        let key = false;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (myproject) {
                if (myproject.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    myproject.schedulelabor.mylabor.map((mylabor, i) => {
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
        let myproject = this.getproject();
        let labor = false;
        if (this.state.activelaborid) {
            let laborid = this.state.activelaborid;
            if (myproject) {
                if (myproject.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    myproject.schedulelabor.mylabor.map(mylabor => {
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
            console.log(mylabor)
            if (mylabor) {
                return (mylabor.providerid)


            }

        } else {
            return (this.state.employeeid);
        }
    }

    getcsiid() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            console.log(mylabor)
            if (mylabor) {
                return (mylabor.csiid)


            }

        } else {
            return (this.state.csiid);
        }
    }
    getmilestoneid() {
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            console.log(mylabor)
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
            console.log(mylabor)
            if (mylabor) {
                return (mylabor.description)
            }

        } else {
            return (this.state.description);
        }
    }

    handledescription(description) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].description = description;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID(16);
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let proposalid = "";
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, description, proposalid)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    handlecsiid(csiid) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].csiid = csiid;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID(16);
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let description = this.state.description;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let proposalid = "";
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, description, proposalid)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    handlemilestoneid(milestoneid) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID(16);
                let providerid = this.state.employeeid;
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let proposalid = "";
                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, description, proposalid)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }

    handleproviderid(providerid) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].providerid = providerid;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID(16);
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let milestoneid = this.state.milestoneid;
                let proposalid = "";

                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, description, proposalid)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    handlelaborrate(laborrate) {
        let myuser = this.getuser();
        if (myuser) {
            let i = this.getprojectkey();
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID(16);
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let milestoneid = this.state.milestoneid;
                let providerid = this.state.employeeid;
                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, description)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    createnewlabor(newlabor, myuser, i) {
        let myproject = this.getproject();
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                myuser.company.projects.myproject[i].schedulelabor.mylabor.push(newlabor)
            } else {
                let schedulelabor = { mylabor: [newlabor] }
                myuser.company.projects.myproject[i].schedulelabor = schedulelabor;
            }
            this.props.reduxUser(myuser)
            this.setState({ activelaborid: newlabor.laborid })
        }
    }
    getmyemployeebyproviderid(providerid) {

        let employees = false;
        let company = this.getcompany();
        if (company) {

            if (company.office.hasOwnProperty("employees")) {

                // eslint-disable-next-line
                company.office.employees.employee.map(employee => {

                    if (employee.providerid === providerid) {
                        employees = employee;
                    }
                })
            }
        }
        return employees;
    }
    gethourlyrate(providerid) {

        let employee = this.getmyemployeebyproviderid(providerid)
        console.log(employee)
        let workinghours = Number(employee.workinghours);
        let totalbenefits = 0;
        let hourlyrate = 0;
        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                totalbenefits += Number(benefit.amount);

            })
        }

        if (workinghours && totalbenefits) {
            hourlyrate = Number(totalbenefits / workinghours).toFixed(2)
        }

        return hourlyrate;
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
                        /schedulabor
                </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getemployee()}
                            onChange={event => { this.handleproviderid(event.target.value) }}>
                            <option value={false}>Select An Employee</option>
                            {this.loademployees()}
                        </select>
                    </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Time In
                        </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        TimeOut
                        </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        CSI
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getcsiid()}
                            onChange={event => { this.handlecsiid(event.target.value) }}>
                            <option value={false}>Select A CSI</option>
                            {this.loadcsiids()}
                        </select>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        MilestoneID
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getmilestoneid()}
                            onChange={event => { this.handlemilestoneid(event.target.value) }}>
                            <option value={false}>Select A MilestoneID</option>
                            {this.loadmilestoneids()}
                        </select>
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Description <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                            value={this.getdescription()}
                            onChange={event => { this.handledescription(event.target.value) }}
                        />
                    </div>
                </div>



                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    &nbsp;
                    </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...saveprojecticon }}>{saveProjectIcon()}</button>
                </div>

                {this.showlaborids()}


            </div></div>)

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(ScheduleLabor);