import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { CreateProposal, activeCheckIcon } from './svg'
import { UTCStringFormatDateforProposal, calculatetotalhours, inputUTCStringForLaborID, inputUTCStringForMaterialIDWithTime } from './functions'
import { Link } from 'react-router-dom';

class Proposals extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeproposalid: false }
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
    getactiveproposalbackground(item) {
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
                let j = dynamicstyles.getactiveequipmentkeybyid.call(this, equipmentid);
                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
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
                let j = dynamicstyles.getactivematerialkeybyid.call(this, materialid);
                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
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
                let j = dynamicstyles.getactivelaborkeybyid.call(this, laborid);
                myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    showlaboritem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const smallFont = dynamicstyles.getSmallFont.call(this)
        const amount = (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
        const employee = dynamicstyles.getemployeebyproviderid.call(this, item.providerid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();


        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveproposalbackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {employee.firstname} {employee.lastname} TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)} CSI {csi.csi}-{csi.title}  Total Hours {totalhours.toFixed(2)} Hrs at  ${item.laborrate} =  ${amount.toFixed(2)}  x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getlaborprofitbyid.call(this, item.laborid)}
                            onChange={event => { this.handlelaborprofit(event.target.value, item.laborid) }}
                        />
                    </div>
                </div>
            </div>
        )


    }
    checkproposalitem(item) {
        let result = 'add';
        if (item.proposalid === this.state.activeproposalid) {
            result = 'remove'
        }
        return result;
    }
    addItemtoProposal(item) {



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
                        j = dynamicstyles.getactivelaborkeybyid.call(this, item.laborid)
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
                        j = dynamicstyles.getactivelaborkeybyid.call(this, item.laborid)
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
        console.log(myuser)
        let proposals = [];
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            console.log(myproject)
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
    showequipmentitem(item) {
        let dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const smallFont = dynamicstyles.getSmallFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, item.myequipmentid);
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const totalhours = Number(calculatetotalhours(item.timeout, item.timein))
        const profitField = dynamicstyles.getprofitfield.call(this)
        return (

            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveproposalbackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {myequipment.equipment} CSI: {csi.csi} - {csi.title}   TimeIn{inputUTCStringForLaborID(item.timein)}  TimeOut {inputUTCStringForLaborID(item.timeout)}  Total Hours:{totalhours.toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getequipmentprofitbyid.call(this, item.equipmentid)}
                            onChange={event => { this.handleequipmentprofit(event.target.value, item.equipmentid) }}
                        />
                    </div>
                </div>
            </div>
        )

    }
    showmaterialitem(item) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const profitField = dynamicstyles.getprofitfield.call(this)
        const getprofit = () => {
            if (item.profit) {
                return Number(1 + (item.profit / 100))
            } else {
                return 1;
            }
        }
        const profit = getprofit();
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid)
        const material = dynamicstyles.getmymaterialfromid.call(this, item.mymaterialid)
        const amount = Number(item.quantity * item.unitcost);
        const smallFont = dynamicstyles.getSmallFont.call(this)
        return (
            <div style={{ ...styles.generalFlex, ...styles.generalFont, ...smallFont }}>

                <div style={{ ...styles.flex3, ...this.getactiveproposalbackground(item) }} onClick={() => { this.addItemtoProposal(item) }}>
                    {inputUTCStringForMaterialIDWithTime(item.timein)} {material.material} CSI: {csi.csi}-{csi.title}
                    {item.quantity}  x ${item.unitcost}/{item.unit} = ${amount.toFixed(2)} x {profit} = ${Number(amount * profit).toFixed(2)}
                </div>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer }}>
                        Profit <input type="text" style={{ ...styles.generalField, ...smallFont, ...styles.generalFont, ...profitField }}
                            value={dynamicstyles.getmaterialprofitbyid.call(this, item.materialid)}
                            onChange={event => { this.handlematerialprofit(event.target.value, item.materialid) }} />
                    </div>
                </div>
            </div>
        )

    }
    showallpayitems() {
        const dynamicstyles = new DynamicStyles();
        let items = [];
        let payitems = dynamicstyles.getAllSchedule.call(this)
        if (payitems.hasOwnProperty("length")) {
            // eslint-disable-next-line
            payitems.map(item => {
                if (item.hasOwnProperty("laborid")) {
                    items.push(this.showlaboritem(item))
                }
                if (item.hasOwnProperty("materialid")) {
                    items.push(this.showmaterialitem(item))

                }
                if (item.hasOwnProperty("equipmentid")) {
                    items.push(this.showequipmentitem(item))

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
    render() {
        let dynamicstyles = new DynamicStyles();
        let styles = MyStylesheet();
        let titleFont = dynamicstyles.gettitlefont.call(this)
        let proposalButton = dynamicstyles.getcreateproposal.call(this)
        let headerFont = dynamicstyles.getHeaderFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...titleFont, ...styles.alignCenter }}>
                            /proposals
                </div>

                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...proposalButton }}>{CreateProposal()}</button>
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
                </div>
            </div>
        )


    }



}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        projectid: state.projectid,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Proposals);