import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { CreateProposal, activeCheckIcon } from './svg'
import { UTCStringFormatDateforProposal, CreateMyProposal, inputDateObjOutputAdjString } from './functions'
import { Link } from 'react-router-dom';
import MakeID from './makeids';

class Proposals extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeproposalid: false, updated: new Date(), approved: '' }
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
    getequipmentprofitbyid(equipmentid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map(myequipment => {
                    if (myequipment.equipmentid === equipmentid) {
                        profit = myequipment.profit;
                    }
                })
            }
        }
        return profit;
    }
    getlaborprofitbyid(laborid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {
                    if (mylabor.laborid === laborid) {
                        profit = mylabor.profit;
                    }
                })
            }
        }
        return profit;
    }
    getmaterialprofitbyid(materialid) {
        let dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let profit = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterials => {
                    if (mymaterials.materialid === materialid) {
                        profit = mymaterials.profit;
                    }
                })
            }
        }
        return profit;
    }
    getactiveproposalkey() {
        let dynamicstyles = new DynamicStyles();
        let key = false;
        if (this.state.activeproposalid) {
            let proposalid = this.state.proposalid;
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject.hasOwnProperty("proposals")) {
                // eslint-disable-next-line
                myproject.proposals.myproposal.map((myproposal, i) => {
                    if (myproposal.proposalid === proposalid) {
                        key = i;
                    }
                })

            }


        }


        return key;
    }
    getactivebackground(item) {
        if (item.proposalid === this.state.activeproposalid) {
            return ({ backgroundColor: '#93CCE5' })
        }
    }

    handleequipmentprofit(profit, equipmentid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this,equipmentid)
                if(myequipment) {
                    let j = dynamicstyles.getscheduleequipmentkeybyid.call(this,equipmentid)
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                    this.props.reduxUser(myuser);
                    if(myequipment.proposalid) {
                        dynamicstyles.updateproposal.call(this,myequipment.proposalid)
                    } else {
                        this.setState({ render: 'render' })
                    }
                    

                }
             
            }
        }
    }

    handlematerialprofit(profit, materialid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mymaterial = dynamicstyles.getschedulematerialbyid.call(this,materialid)
                if(mymaterial) {
                let j = dynamicstyles.getactivematerialkeybyid.call(this, materialid);
                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                this.props.reduxUser(myuser);
                if(mymaterial.proposalid) {
                    dynamicstyles.updateproposal.call(this,mymaterial.proposalid)

                } else {
                    this.setState({ render: 'render' })
                }

                }
              
            }
        }
    }

    handlelaborprofit(profit, laborid) {
        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const mylabor = dynamicstyles.getschedulelaborbyid.call(this,laborid)
                if(mylabor) {
                let j = dynamicstyles.getschedulelaborkeybyid.call(this, laborid);
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                this.props.reduxUser(myuser);
                if(mylabor.proposalid) {
                    dynamicstyles.updateproposal.call(this,mylabor.proposalid)
                } else {
                    this.setState({ render: 'render' })
                }
                
                }
            }
        }
    }

    checkproposalitem(item) {
        let result = 'add';
        if (item.proposalid === this.state.activeproposalid) {
            result = 'remove'
        }
        return result;
    }

    addItem(item) {



        let dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            if (this.state.activeproposalid) {


                let proposalid = this.state.activeproposalid;
                let i = dynamicstyles.getprojectkey.call(this)

                let result = this.checkproposalitem(item);
                let j = false;
                if (result === 'add') {

                    if (item.hasOwnProperty("laborid")) {
                        j = dynamicstyles.getschedulelaborkeybyid.call(this, item.laborid)
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].proposalid = proposalid;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("materialid")) {
                        j = dynamicstyles.getactivematerialkeybyid.call(this, item.materialid)
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].proposalid = proposalid;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("equipmentid")) {
                        j = dynamicstyles.getactiveequipmentkeybyid.call(this, item.equipmentid);

                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].proposalid = proposalid;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                } else if (result === 'remove') {

                    if (item.hasOwnProperty("laborid")) {
                        j = dynamicstyles.getschedulelaborbyid.call(this, item.laborid)
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].proposalid = ""
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("materialid")) {
                        j = dynamicstyles.getactivematerialkeybyid.call(this, item.materialid)
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].proposalid = ""
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else if (item.hasOwnProperty("equipmentid")) {
                        j = dynamicstyles.getactiveequipmentkeybyid.call(this, item.equipmentid);

                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].proposalid = ""
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }


                }

            }
        }


    }

    showproposalids() {
        let dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        let proposals = [];
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);

            if (myproject) {
                if (myproject.hasOwnProperty("proposals")) {
                    // eslint-disable-next-line
                    myproject.proposals.myproposal.map(myproposal => {
                        proposals.push(this.showproposalid(myproposal))
                    })
                }
            }
        }
        return proposals;
    }
    handlecheckicon(proposalid) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const checkButton = dynamicstyles.getCheckButton.call(this)
        if (this.state.activeproposalid === proposalid) {
            return (<button style={{ ...styles.generalButton, ...checkButton }}>{activeCheckIcon()}</button>)
        } else {
            return;
        }
    }
    makeproposalactive(proposalid) {
        if (this.state.activeproposalid === proposalid) {
            this.setState({ activeproposalid: false })
        } else {
            this.setState({ activeproposalid: proposalid })
        }
    }
    showproposalid(myproposal) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const proposalid = myproposal.proposalid;
        let updateinfo = "";
        if (myproposal.updated) {
            updateinfo = `Updated ${UTCStringFormatDateforProposal(myproposal.updated)}`
        }
        if (this.state.width > 1200) {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myproposal.proposalid)}
                </div>
                <div style={{ ...styles.flex5 }} onClick={() => { this.makeproposalactive(proposalid) }}>
                    Proposal ID {myproposal.proposalid} {updateinfo}
                </div>
            </div>)

        } else if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myproposal.proposalid)}
                </div>
                <div style={{ ...styles.flex3 }} onClick={() => { this.makeproposalactive(proposalid) }}>
                    Proposal ID {myproposal.proposalid} {updateinfo}
                </div>
            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }}>
                <div style={{ ...styles.flex1 }}>
                    {this.handlecheckicon(myproposal.proposalid)}
                </div>
                <div style={{ ...styles.flex2 }} onClick={() => { this.makeproposalactive(proposalid) }}>
                    Proposal ID {myproposal.proposalid} {updateinfo}
                </div>
            </div>)
        }
    }


    handlelaborrate(laborrate, laborid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            const mylabor = dynamicstyles.getschedulelaborbyid.call(this,laborid)
            if(mylabor) {
            let j = dynamicstyles.getschedulelaborkeybyid.call(this, laborid)
            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
            this.props.reduxUser(myuser);
            if(mylabor.proposalid) {
                dynamicstyles.updateproposal.call(this,mylabor.proposalid)
            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    }
    handleequipmentrate(equipmentrate, equipmentid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this,equipmentid)
            if(myequipment) {
            let j = dynamicstyles.getactiveequipmentkeybyid.call(this, equipmentid);
            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
            this.props.reduxUser(myuser);
            if(myequipment.proposalid) {
                dynamicstyles.updateproposal.call(this,myequipment.proposalid)
            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    }
    handlematerialunit(unit, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            const mymaterial = dynamicstyles.getschedulematerialbyid.call(this,materialid)
            if(mymaterial) {
            let j = dynamicstyles.getschedulematerialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unit = unit;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                dynamicstyles.updateproposal.call(this,mymaterial.proposalid)
            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    }
    handlematerialunitcost(unitcost, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            const mymaterial = dynamicstyles.getschedulematerialbyid.call(this,materialid)
            if(mymaterial) {
            let j = dynamicstyles.getschedulematerialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                dynamicstyles.updateproposal.call(this,mymaterial.proposalid)
            } else {
                this.setState({ render: 'render' })
            }

            }
        }
    }
    handlematerialquantity(quantity, materialid) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            const mymaterial = dynamicstyles.getschedulematerialbyid.call(this,materialid)
            if(mymaterial) {
            let j = dynamicstyles.getschedulematerialkeybyid.call(this, materialid)
            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].quantity = quantity;
            this.props.reduxUser(myuser)
            if(mymaterial.proposalid) {
                dynamicstyles.updateproposal.call(this,mymaterial.proposalid)
            } else {
                this.setState({ render: 'render' })
            }
            

                }
        }
    }
    showallpayitems() {
        const dynamicstyles = new DynamicStyles();
        let items = [];
        let payitems = dynamicstyles.getAllSchedule.call(this)
        if (payitems.hasOwnProperty("length")) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    items.push(dynamicstyles.showlaboritem.call(this, item))
                }
                if (item.hasOwnProperty("materialid")) {
                    items.push(dynamicstyles.showmaterialitem.call(this, item))

                }
                if (item.hasOwnProperty("equipmentid")) {
                    items.push(dynamicstyles.showequipmentitem.call(this, item))

                }


            })
        }
        return items;

    }
    showproposallink() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        if (this.state.activeproposalid) {
            let companyid = this.props.match.params.companyid;
            let projectid = this.props.match.params.projectid;
            let proposalid = this.state.activeproposalid;
            let providerid = this.props.match.params.providerid;
            return (
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/proposals/${proposalid}`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont }}>
                        View Proposal ID: {proposalid}
                    </Link>
                </div>)
        } else {
            return;
        }

    }
    createnewproposal() {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let proposalid = makeID.proposalid.call(this);
            let providerid = myuser.providerid;
            let updated = inputDateObjOutputAdjString(this.state.updated);
            let approved = this.state.approved;
            let newproposal = CreateMyProposal(proposalid, providerid, updated, approved);
            let myproject = dynamicstyles.getproject.call(this);
            let i = dynamicstyles.getprojectkey.call(this);
            if (myproject.hasOwnProperty("proposals")) {
                myuser.company.projects.myproject[i].proposals.myproposal.push(newproposal)

            } else {
                myuser.company.projects.myproject[i].proposals = { myproposal: [newproposal] }

            }
            this.props.reduxUser(myuser);
            this.setState({ activeproposalid: proposalid })
        }

    }
    render() {
        let dynamicstyles = new DynamicStyles();
        let styles = MyStylesheet();
        let titleFont = dynamicstyles.gettitlefont.call(this)
        let proposalButton = dynamicstyles.getcreateproposal.call(this)
        let headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont  = dynamicstyles.getRegularFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid);
            if(project) {
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1,  ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...titleFont}}>/proposals</span><br/>
                            <span style={{ ...styles.generalFont, ...titleFont}}>{project.title}</span>
                        </div>

                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...proposalButton }} onClick={() => { this.createnewproposal() }}>{CreateProposal()}</button>
                        </div>

                    </div>

                    {this.showproposalids()}

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Labor
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Equipment
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter, ...headerFont, ...styles.showBorder }}>
                            Materials
                        </div>

                    </div>

                    {this.showallpayitems()}
                    {this.showproposallink()}
                    {dynamicstyles.showsaveproject.call(this)}
                </div>
            </div>
        )

            } else {
                return(<span>&nbsp;</span>)
            }


        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Proposals </span>
            </div>)
        }


    }



}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        projectid: state.projectid,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(Proposals);