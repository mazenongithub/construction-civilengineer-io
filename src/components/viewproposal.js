import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment } from './functions';
import { Link } from 'react-router-dom';
class ViewProposal extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
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
    getitems() {
        const dynamicstyles = new DynamicStyles();
        let proposalid = this.props.match.params.proposalid;
        let payitems = dynamicstyles.getbiditems.call(this)

        let items = [];
        // eslint-disable-next-line
        payitems.map(item => {

            if (item.hasOwnProperty("laborid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.proposalid === proposalid) {
                    items.push(item)
                }

            }

        })

        return items;
    }

    showbiditems() {

        let biditems = this.getbiditems();
        let lineids = [];
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                lineids.push(this.showbiditem(item))
            })
        }
        return lineids;
    }
    getbiditems() {
        let items = [];
        let myproposal = this.getproposal();
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            items = myproposal.bidschedule.biditem;
        }




        return (items)

    }
    proposalitemsbycsiid(csiid) {
        const proposalid = this.props.match.params.proposalid;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        let items = [];
        if (myproject.hasOwnProperty("schedulelabor")) {
            // eslint-disable-next-line
            myproject.schedulelabor.mylabor.map(mylabor => {
                if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {
                    items.push(mylabor)
                }
            })

        }
        if (myproject.hasOwnProperty("schedulematerials")) {
            // eslint-disable-next-line
            myproject.schedulematerials.mymaterial.map(mymaterial => {
                if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                    items.push(mymaterial)
                }
            })

        }
        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    items.push(myequipment)
                }
            })

        }
        items.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })
        return items;
    }
    getprofit(csiid) {
        let profit = 0;
        let directcost = 0;
        let items = this.proposalitemsbycsiid(csiid);
        // eslint-disable-next-line
        items.map(item => {
            if (item.hasOwnProperty("laborid")) {
                directcost += DirectCostForLabor(item);
                profit += ProfitForLabor(item);
            }
            if (item.hasOwnProperty("materialid")) {
                directcost += DirectCostForMaterial(item);
                profit += ProfitForMaterial(item);
            }
            if (item.hasOwnProperty("equipmentid")) {
                directcost += DirectCostForEquipment(item);
                profit += ProfitForEquipment(item);
            }

        })

        return ((profit / directcost) * 100)

    }
    getquantity(csiid) {

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {
            return Number(scheduleitem.quantity);
        } else {
            return;
        }

    }
    getproposal() {
        let proposalid = this.props.match.params.proposalid;
        let proposal = false;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map(myproposal => {
                if (myproposal.proposalid === proposalid) {
                    proposal = myproposal;
                }
            })
        }
        return proposal;
    }
    getproposalkey() {
        let proposalid = this.props.match.params.proposalid;
        let key = false;
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this);
        if (myproject.hasOwnProperty("proposals")) {
            // eslint-disable-next-line
            myproject.proposals.myproposal.map((myproposal, i) => {
                if (myproposal.proposalid === proposalid) {
                    key = i;
                }
            })
        }
        return key;
    }
    getscheduleitems() {

        let scheduleitems = false;
        let myproposal = this.getproposal();
        if (myproposal) {
            if (myproposal.hasOwnProperty("bidschedule")) {
                scheduleitems = myproposal.bidschedule.biditem
            }
        }
        return scheduleitems;
    }
    getscheduleitem(csiid) {

        let scheduleitems = this.getscheduleitems();

        let scheduleitem = false;
        if (scheduleitems) {
            // eslint-disable-next-line
            scheduleitems.map(item => {
                if (item.csiid === csiid) {
                    scheduleitem = item;
                }
            })
        }
        return scheduleitem;
    }
    getunit(csiid) {

        let scheduleitem = this.getscheduleitem()

        if (scheduleitem) {
            return scheduleitem.unit;
        } else {
            return;
        }

    }


    getbidprice(csiid) {

        let directcost = Number(this.getdirectcost(csiid));
        let profit = Number(this.getprofit(csiid));

        if (!profit) {
            profit = 1
        } else {
            profit = 1 + (profit / 100)
        }
        let bidprice = directcost * profit;
        return bidprice;
    }
    getunitprice(csiid) {

        let quantity = Number(this.getquantity(csiid));
        let bidprice = Number(this.getbidprice(csiid));

        if (quantity > 0 && bidprice > 0) {
            return (bidprice / quantity)

        } else {
            return;
        }


    }
    getdirectcost(csiid) {
        const dynamicstyles = new DynamicStyles()
        let myproject = dynamicstyles.getproject.call(this)
        let proposalid = this.props.match.params.proposalid;
        let directcost = 0;
        if (myproject) {
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map(mylabor => {

                    if (mylabor.csiid === csiid && (mylabor.proposalid === proposalid)) {

                        directcost += DirectCostForLabor(mylabor)

                    }
                })
            }

            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map(mymaterial => {
                    if (mymaterial.csiid === csiid && (mymaterial.proposalid === proposalid)) {
                        directcost += DirectCostForMaterial(mymaterial)
                    }

                })
            }
        }

        if (myproject.hasOwnProperty("scheduleequipment")) {
            // eslint-disable-next-line
            myproject.scheduleequipment.myequipment.map(myequipment => {
                if (myequipment.csiid === csiid && (myequipment.proposalid === proposalid)) {
                    directcost += DirectCostForEquipment(myequipment)
                }

            })
        }

        return directcost;

    }

    getproposalitemkey(csiid) {
        let key = false;
        let myproposal = this.getproposal();
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i
                }

            })
        }
        return key;

    }
    handlechangequantity(quantity, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let k = this.getproposalitemkey(csiid);
            let j = this.getproposalkey();
            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].quantity = quantity;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    handlechangeunit(unit, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let k = this.getproposalitemkey(csiid);
            let j = this.getproposalkey();
            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].unit = unit;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }

    }
    showbiditem(item) {
        const dynamicstyles = new DynamicStyles();
        let providerid = this.props.match.params.providerid;
        let companyid = this.props.match.params.companyid;
        let projectid = this.props.match.params.projectid;
        let proposalid = this.props.match.params.proposalid;



        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const bidField = dynamicstyles.getbidfield.call(this)
        const csi = dynamicstyles.getcsibyid.call(this, item.csiid);
        let profit = () => {
            return (
                <input type="text"
                    value={Number(this.getprofit(item.csiid)).toFixed(4)}
                    onChange={event => { this.handlechangeprofit(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                />)
        }
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);
        let unit = item.unit;
        const quantity = () => {
            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                <input type="text"
                    value={item.quantity}
                    onChange={event => { this.handlechangequantity(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }} />
            </div>)
        }

        if (this.state.width > 1200) {
            return (
                <tr>
                    <td><Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/proposals/${proposalid}/csi/${csi.csiid}`}>{csi.csi}-{csi.title}</Link></td>
                    <td style={{ ...styles.alignCenter }}>
                        {quantity()}
                    </td>
                    <td style={{ ...styles.alignCenter }}>{unit}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}> {`$${unitprice}/${unit}`}</td>
                </tr>)


        } else {
            return (
                <div style={{ ...styles.generalFlex }} key={csi.csiid}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont, ...styles.showBorder }}>
                                <Link style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }} to={`/${providerid}/company/${companyid}/projects/${projectid}/proposals/${proposalid}/csi/${csi.csiid}`}> Line Item <br />
                                    {csi.csi}-{csi.title} </Link>
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Quantity <br />
                                <input type="text"
                                    value={quantity}
                                    onChange={event => { this.handlechangequantity(event.target.value, item.csiid) }}
                                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }} />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                <input type="text"
                                    value={unit}
                                    onChange={event => { this.handlechangeunit(event.target.value, item.csiid) }}
                                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Direct Cost <br />
                                ${directcost}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Overhead And Profit % <br />
                                <input type="text"
                                    value={profit}
                                    onChange={event => { this.handlechangeprofit(event.target.value, item.csiid) }}
                                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                                />

                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Bid Price <br />
                                ${bidprice}
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit Price
                                {`$${unitprice}/${unit}`}
                            </div>
                        </div>
                    </div>
                </div>)
        }
    }
    handlechangeprofit(profit, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        let proposalid = this.props.match.params.proposalid;
        if (myuser) {
            let i = dynamicstyles.getprojectkey.call(this);
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject.hasOwnProperty("schedulelabor")) {
                // eslint-disable-next-line
                myproject.schedulelabor.mylabor.map((mylabor, j) => {
                    if (mylabor.proposalid === proposalid && (mylabor.csiid === csiid)) {
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                    }

                })

            }
            if (myproject.hasOwnProperty("schedulematerials")) {
                // eslint-disable-next-line
                myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                    if (mymaterial.proposalid === proposalid && (mymaterial.csiid === csiid)) {
                        myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                    }

                })
            }
            if (myproject.hasOwnProperty("scheduleequipment")) {
                // eslint-disable-next-line
                myproject.scheduleequipment.myequipment.map((myequipment, j) => {
                    if (myequipment.proposalid === proposalid && (myequipment.csiid === csiid)) {
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                    }

                })
            }
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })

        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const titleFont = dynamicstyles.gettitlefont.call(this)


        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...titleFont, ...styles.alignCenter }}>
                            /viewproposal/{this.props.match.params.proposalid}
                        </div>
                    </div>

                    {dynamicstyles.showbidtable.call(this)}

                    {dynamicstyles.showsaveproject.call(this)}

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

export default connect(mapStateToProps, actions)(ViewProposal);