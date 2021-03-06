import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay, DirectCostForMaterial, DirectCostForEquipment, DirectCostForLabor } from './functions';
import { Link } from 'react-router-dom';
class ProposalLineItem extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeproposalid: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const dynamicstyles = new DynamicStyles();
        const csicodes = dynamicstyles.getcsis.call(this)
        if(!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    getlaboritems() {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
                items.push(this.showlaborid(mylabor))
            })

        }
        return items;
    }
    getlabor() {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid) && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })


        return laboritems;
    }
    getlabortotal() {
        let items = this.getlabor();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForLabor(item)
            })
        }
        return cost;
    }
    getmaterialitems() {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(this.showmaterialid(mymaterial))
            })

        }
        return items;

    }
    getmaterial() {
        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let materialitems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                materialitems.push(item)
            }
        })


        return materialitems;

    }
    getmaterialtotal() {
        let items = this.getmaterial();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForMaterial(item)
            })
        }
        return cost;
    }
    getequipmentitems() {

        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(myequipment => {
                items.push(this.showequipmentid(myequipment))
            })

        }
        return items;

    }
    getequipment() {

        const dynamicstyles = new DynamicStyles();
        const schedule = dynamicstyles.getAllSchedule.call(this)
        let csiid = this.props.match.params.csiid;
        let proposalid = this.props.match.params.proposalid;
        let laboritems = [];
        // eslint-disable-next-line
        schedule.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid && (item.proposalid === proposalid)) {
                laboritems.push(item)
            }
        })

        return laboritems;

    }
    getequipmenttotal() {
        let items = this.getequipment();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item)
            })
        }
        return (cost)
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    getitemtotal() {
        let labortotal = this.getlabortotal();
        let materialtotal = this.getmaterialtotal();
        let equipmenttotal = this.getequipmenttotal();
        let total = labortotal + materialtotal + equipmenttotal;
        return total;
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        let employee = dynamicstyles.getemployeebyproviderid.call(this, mylabor.providerid)

        let hourlyrate = mylabor.laborrate;

        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            {employee.firstname} {employee.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            ${Number(hourlyrate).toFixed(2)}/Hr x {calculatetotalhours(mylabor.timeout, mylabor.timein)} Hrs = ${(Number(calculatetotalhours(mylabor.timeout, mylabor.timein)) * Number(hourlyrate)).toFixed(2)}

        </div>)
    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const material = dynamicstyles.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }} key={mymaterial.materialid}>
            {material.material}        {formatDateStringDisplay(mymaterial.timein)} {mymaterial.quantity}  x ${mymaterial.unitcost}/{mymaterial.unit} = ${(mymaterial.quantity * mymaterial.unitcost).toFixed(2)}
        </div>)
    }

    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const myequipment = dynamicstyles.getequipmentfromid.call(this, equipment.myequipmentid);
        const amount = Number(calculatetotalhours(equipment.timeout, equipment.timein) * (Number(equipment.equipmentrate))).toFixed(2)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={equipment.equipmentid}>
            {myequipment.equipment} From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} ${equipment.equipmentrate} x ${calculatetotalhours(equipment.timeout, equipment.timein)} = ${amount}

        </div>)
    }


    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const csiid = this.props.match.params.csiid;
        const csi = dynamicstyles.getcsibyid.call(this, csiid)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const headerFont = dynamicstyles.getHeaderFont.call(this)
       
        
        if (myuser) {
            const project = dynamicstyles.getproject.call(this)
            if(project) {
       
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                                > /{project.title}</Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    
                                        to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}/proposals`}
                                    > /proposals</Link>
                                </div>

                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}/proposals/${this.props.match.params.proposalid}`}
                                > /{this.props.match.params.proposalid}</Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}/proposals/${this.props.match.params.proposalid}/csi/${csi.csiid}`}
                                > /{csi.csi} {csi.title}</Link>
                            </div>
                        </div>

                            {dynamicstyles.showlinedetail.call(this)}


                        </div>
                    </div>)

                } else {
                    return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Project Not found</span>
                    </div>)
                }

                            

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Proposal Line Item </span>
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
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ProposalLineItem);