import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { inputUTCStringForLaborID, calculatetotalhours, CreateScheduleLabor, inputDateObjOutputAdjString } from './functions'
import ScheduleLaborTimeIn from './schedulelabortimein';
import ScheduleLaborTimeOut from './schedulelabortimeout';
import DynamicStyles from './dynamicstyles';
import CSI from './csi';
import MakeID from './makeids';
import MilestoneID from './milestoneid';

class ScheduleLabor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: '', width: 0, height: 0, employeeid: '', activelaborid: '', csiid: '', milestoneid: '', description: '',
            timein: new Date(),
            timeout: new Date(new Date().getTime() + (1000 * 60 * 60)),
            activetimeincalendar: true, activetimeoutcalendar: true,
            csi_1: '',csi_2:'',csi_3:'',csi_4:''
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
            return (styles.font48)
        } else {
            return (styles.font30)
        }

    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font36)
        } else {
            return (styles.font24)
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
            return (styles.font20)
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

    showlaborids() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let laborids = [];

        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {

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

            let mylabor = dynamicstyles.getschedulelaborbyid.call(this, laborid);
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
            const j = dynamicstyles.getschedulelaborbyid.call(this, mylabor.laborid);
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                myuser.company.projects.myproject[i].schedulelabor.mylabor.splice(j, 1);
                if (myuser.company.projects.myproject[i].schedulelabor.mylabor.length === 0) {
                    delete myuser.company.projects.myproject[i].schedulelabor.mylabor
                    delete myuser.company.projects.myproject[i].schedulelabor;
                }
                this.props.reduxUser(myuser)
                this.setState({ activelaborid: false })
            }
        }
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const removeIcon = this.getremoveicon();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid);
        let employee = dynamicstyles.getemployeebyproviderid.call(this, mylabor.providerid)

        let hourlyrate = dynamicstyles.gethourlyrate.call(this, employee.providerid)

        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            <span style={{ ...this.getactivelaborbackground(mylabor.laborid) }} onClick={() => { this.makelaboractive(mylabor.laborid) }}> {employee.firstname} {employee.lastname}: {mylabor.description} CSI:{csi.csi}-{csi.title}<br />
                From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
                ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}
            </span>
            <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removelaborid(mylabor) }}>{removeIconSmall()} </button>
        </div>)
    }
    getcsibyid(csiid) {
        const dynamicstyles = new DynamicStyles();
        let csi = false;
        let company = dynamicstyles.getcompany.call(this);
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

    loadcsiids() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
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

        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this);
        let options = [];
        if (company) {
            if (company.office.hasOwnProperty("employees")) {
                // eslint-disable-next-line
                company.office.employees.employee.map(employee => {
                    let myemployee = dynamicstyles.getemployeebyproviderid.call(this, employee.providerid)

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
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
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

            if (mylabor) {
                return (mylabor.providerid)


            }

        } else {
            return (this.state.employeeid);
        }
    }

    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        let csi = false;
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            if (mylabor) {
                csi = dynamicstyles.getcsibyid.call(this, mylabor.csiid)
            }

        } else {
            csi = dynamicstyles.getcsibyid.call(this, this.state.csiid)
        }

        if (csi) {
            return (`${csi.csi}-${csi.title}`)
        } else {
            return ""
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
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this,this.props.match.params.projectid)
           if(myproject) {

            const  i = dynamicstyles.getprojectkeybyid.call(this,this.props.match.params.projectid)
            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this,this.state.activelaborid)
                if(mylabor) {
                    const j = dynamicstyles.getschedulelaborkeybyid.call(this,mylabor.laborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].description = description;
                    this.props.reduxUser(myuser)
                    if(mylabor.proposalid) {
                        dynamicstyles.updateproposal.call(this,mylabor.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                    
                   

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let csiid = this.state.csiid;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)
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
        let csi_4 = csi.csi.substr(7,2)
        this.setState({ csi_1, csi_2, csi_3, csi_4 })
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this,this.props.match.params.projectid)
           if(myproject) {

            const  i = dynamicstyles.getprojectkeybyid.call(this,this.props.match.params.projectid)
            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this,this.state.activelaborid)
                if(mylabor) {
                    const j = dynamicstyles.getschedulelaborkeybyid.call(this,mylabor.laborid)
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].csiid = csiid
                    this.props.reduxUser(myuser)
                if(mylabor.proposalid) {
                dynamicstyles.updateproposal.call(this,mylabor.proposalid)

                } else {
                    this.setState({render:'render'})
                }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let milestoneid = this.state.milestoneid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid);
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit)
                this.createnewlabor(newlabor, myuser, i)
            }

        }

        }
    }
    handlemilestoneid(milestoneid) {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this,this.props.match.params.projectid)
           if(myproject) {

            const  i = dynamicstyles.getprojectkeybyid.call(this,this.props.match.params.projectid)
            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this,this.state.activelaborid)
                if(mylabor) {
                    const j = dynamicstyles.getschedulelaborkeybyid.call(this,mylabor.laborid)
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].milestoneid = milestoneid;
                this.props.reduxUser(myuser)
                if(mylabor.proposalid) {
                    dynamicstyles.updateproposal.call(this,mylabor.proposalid)
                } else {
                this.setState({ render: 'render' })
                }

                }


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let providerid = this.state.employeeid;
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let proposalid = "";
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, proposalid, profit)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    
}

}

    handleproviderid(providerid) {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myproject = dynamicstyles.getprojectbyid.call(this,this.props.match.params.projectid)
           if(myproject) {

            const  i = dynamicstyles.getprojectkeybyid.call(this,this.props.match.params.projectid)
            if (this.state.activelaborid) {
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this,this.state.activelaborid)
                if(mylabor) {
                    const j = dynamicstyles.getschedulelaborkeybyid.call(this,mylabor.laborid)
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].providerid = providerid;
                
                if(mylabor.proposalid) {
                    dynamicstyles.updateproposal.call(this)
                }     else {
                   this.setState({render:'render'}) 
                }

                }

            


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let milestoneid = this.state.milestoneid;
                let proposalid = "";
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                let profit = 0;
                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, proposalid, profit)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    }
    handlelaborrate(laborrate) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        const makeID = new MakeID();
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            if (this.state.activelaborid) {
                let j = this.getactivelaborkey();
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })


            } else {
                let laborid = makeID.schedulelaborid.call(this)
                let csiid = this.state.csiid;
                let description = this.state.description;
                let timein = inputDateObjOutputAdjString(this.state.timein);
                let timeout = inputDateObjOutputAdjString(this.state.timeout);
                let milestoneid = this.state.milestoneid;
                let providerid = this.state.employeeid;
                let laborrate = dynamicstyles.gethourlyrate.call(this, providerid)
                let profit = 0;
                let proposalid = "";
                let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description, proposalid, profit)
                this.createnewlabor(newlabor, myuser, i)
            }

        }
    }
    createnewlabor(newlabor, myuser, i) {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
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



    handletimes() {
        const styles = MyStylesheet();
        const Timeout = new ScheduleLaborTimeOut();
        const Timein = new ScheduleLaborTimeIn();
        if (this.props.navigation) {

            let navigation = this.props.navigation.position;

            if (this.state.width > 1200 && navigation === 'closed') {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                        {Timein.showtimein.call(this)}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                        {Timeout.showtimeout.call(this)}
                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont }}>
                                    {Timein.showtimein.call(this)}
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont }}>
                                        {Timeout.showtimeout.call(this)}
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
        const titleFont = this.gettitlefont();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = new CSI();
        const milestoneid = new MilestoneID();
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                        /schedulelabor
                </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getemployee()}
                            onChange={event => { this.handleproviderid(event.target.value) }}>
                            <option value={false}>Select An Employee</option>
                            {this.loademployees()}
                        </select>
                    </div>
                </div>


                {this.handletimes()}


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {csi.showCSI.call(this)}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        {milestoneid.showmilestoneid.call(this)}
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


                {dynamicstyles.showsaveproject.call(this)}


                {this.showlaborids()}


            </div></div>)

        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Schedule Labor </span>
            </div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allusers: state.allusers,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(ScheduleLabor);