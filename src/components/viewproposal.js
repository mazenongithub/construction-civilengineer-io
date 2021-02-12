import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { sorttimes, DirectCostForLabor, ProfitForLabor, DirectCostForMaterial, ProfitForMaterial, DirectCostForEquipment, ProfitForEquipment, CreateBidScheduleItem, CreateBidItem, UTCStringFormatDateforProposal, UTCTimefromCurrentDate, isNumeric, sortcode } from './functions';
import { Link } from 'react-router-dom';
class ViewProposal extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, spinner: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const dynamicstyles = new DynamicStyles();
        const csicodes = dynamicstyles.getcsis.call(this)
        if (!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }


    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    getamount() {
        const biditems = this.getitems();
        let amount = 0;
        if (biditems.length > 0) {
            // eslint-disable-next-line
            biditems.map(item => {
                amount += this.getbidprice(item.csiid)
            })
        }

        // 
        return amount
    }
    getallscheduleitems() {

        const dynamicstyles = new DynamicStyles();
        const proposalid = this.props.match.params.proposalid;
        const items = dynamicstyles.getAllSchedule.call(this)

        let getitems = [];
        // eslint-disable-next-line
        items.map(item => {

            if (item.hasOwnProperty("laborid")) {
                if (item.proposalid === proposalid) {
                    getitems.push(item)
                }

            }
            if (item.hasOwnProperty("materialid")) {
                if (item.proposalid === proposalid) {
                    getitems.push(item)
                }

            }
            if (item.hasOwnProperty("equipmentid")) {
                if (item.proposalid === proposalid) {
                    getitems.push(item)
                }

            }

        })

        return getitems;
    }
    getitems() {
        const dynamicstyles = new DynamicStyles();
        let proposalid = this.props.match.params.proposalid;
        let payitems = dynamicstyles.getAllSchedule.call(this)

        let items = [];
        const validateNewItem = (items, item) => {
            let validate = true;
            // eslint-disable-next-line
            items.map(myitem => {
                if (myitem.csiid === item.csiid) {
                    validate = false;
                }
            })
            return validate;
        }
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
        let csis = [];
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(lineitem => {
                if (validateNewItem(csis, lineitem)) {
                    let csi = dynamicstyles.getcsibyid.call(this, lineitem.csiid)
                    let newItem = CreateBidScheduleItem(lineitem.csiid, "", 0)
                    newItem.csi = csi.csi;
                    newItem.title = csi.title;
                    csis.push(newItem)
                }
            })
        }


        return (csis.sort((a, b) => {
            return (sortcode(a, b))
        }));
    }

    showbiditems() {

        let biditems = this.getitems();

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



        return (

            items.sort((a, b) => {

                return sortcode(a, b);

            })


        )

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
        let quantity = "";
        if (scheduleitem) {
            quantity = scheduleitem.quantity
        }
        return quantity;

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

        let scheduleitem = this.getscheduleitem(csiid);

        if (scheduleitem) {

            return scheduleitem.unit;


        } else {
            return ""
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
            return bidprice;;
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
    getproposalitem(csiid) {

        let myproposal = this.getproposal();

        let proposalitem = false;
        if (myproposal.hasOwnProperty("bidschedule")) {
            // eslint-disable-next-line
            myproposal.bidschedule.biditem.map((item) => {
                if (item.csiid === csiid) {
                    proposalitem = item
                }

            })
        }
        return proposalitem;

    }
    handlechangequantity(quantity, csiid) {

        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        console.log("change quantity")
        if (isNumeric(quantity)) {

            if (myuser) {

                const myproject = dynamicstyles.getproject.call(this)
                if (myproject) {
                    let i = dynamicstyles.getprojectkey.call(this);
                    console.log(i)
                    const myproposal = dynamicstyles.getproposalbyid.call(this, this.props.match.params.proposalid)
                    if (myproposal) {

                        let j = dynamicstyles.getproposalkeybyid.call(this, this.props.match.params.proposalid)
                        console.log(j)
                        const lineitem = this.getproposalitem(csiid)

                        if (lineitem) {

                            let k = dynamicstyles.getproposalitemkey.call(this, csiid)
                            console.log(k)
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].quantity = quantity;
                            myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        } else {
                            let unit = "";
                            let newItem = CreateBidItem(csiid, unit, quantity)

                            if (myproposal.hasOwnProperty("bidschedule")) {
                                myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem.push(newItem);
                            } else {
                                myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule = { biditem: [newItem] }
                            }

                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                        }

                    }

                }
            }

        } else {
            alert(`Quantity should be numeric `)
        }

    }

    handlechangeunit(unit, csiid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myproject = dynamicstyles.getproject.call(this)
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                const myproposal = dynamicstyles.getproposalbyid.call(this, this.props.match.params.proposalid)
                if (myproposal) {
                    let j = dynamicstyles.getproposalkeybyid.call(this, this.props.match.params.proposalid)
                    const lineitem = this.getproposalitem(csiid)
                    if (lineitem) {
                        let k = dynamicstyles.getproposalitemkey.call(this, csiid)
                        myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].unit = unit;
                        myuser.company.projects.myproject[i].proposals.myproposal[j].updated = UTCTimefromCurrentDate();
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    } else {
                        let quantity = "";
                        let newItem = CreateBidItem(csiid, unit, quantity)
                        if (myproposal.hasOwnProperty("bidschedule")) {
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem.push(newItem);
                        } else {
                            myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule = { biditem: [newItem] }
                        }
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }
                }

            }

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
                    value={Number(this.getprofit(csi.csiid)).toFixed(4)}
                    onChange={event => { this.handlechangeprofit(event.target.value, item.csiid) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                />)
        }
        let bidprice = Number(this.getbidprice(item.csiid)).toFixed(2);
        let unitprice = +Number(this.getunitprice(item.csiid)).toFixed(4);
        let directcost = Number(this.getdirectcost(item.csiid)).toFixed(2);

        const unit = () => {
            return (
                <div style={{ ...styles.generalContainer }}>
                    Unit <br />
                    <input type="text"
                        value={this.getunit(csi.csiid)}
                        onChange={event => { this.handlechangeunit(event.target.value, item.csiid) }}
                        style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }}
                    />
                </div>)
        }
        const quantity = () => {

            return (<div style={{ ...styles.generalContainer }}>
                Quantity <br />
                <input type="text"
                    value={this.getquantity(item.csiid)}
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
                    <td style={{ ...styles.alignCenter }}>{unit()}</td>
                    <td style={{ ...styles.alignCenter }}>{directcost}</td>
                    <td style={{ ...styles.alignCenter }}>{profit()}</td>
                    <td style={{ ...styles.alignCenter }}>{bidprice}</td>
                    <td style={{ ...styles.alignCenter }}>  {`$${unitprice}/${this.getunit(csi.csiid)}`}</td>
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
                                    value={this.getquantity(csi.csiid)}
                                    onChange={event => { this.handlechangequantity(event.target.value, item.csiid) }}
                                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalFont, ...bidField }} />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                                Unit <br />
                                <input type="text"
                                    value={this.getunit(csi.csiid)}
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
                                    value={Number(this.getprofit(csi.csiid)).toFixed(4)}
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
                                {`$${unitprice}/${this.getunit(csi.csiid)}`}
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
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                const i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid)
                if (myproject.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    myproject.schedulelabor.mylabor.map((mylabor, j) => {
                        if (mylabor.proposalid === proposalid && (mylabor.csiid === csiid)) {
                            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].profit = profit;
                            let k = dynamicstyles.getproposalkeybyid.call(this, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })

                }
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map((mymaterial, j) => {
                        if (mymaterial.proposalid === proposalid && (mymaterial.csiid === csiid)) {
                            myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].profit = profit;
                            let k = dynamicstyles.getproposalkeybyid.call(this, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })
                }
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map((myequipment, j) => {
                        if (myequipment.proposalid === proposalid && (myequipment.csiid === csiid)) {
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].profit = profit;
                            let k = dynamicstyles.getproposalkeybyid.call(this, proposalid)
                            myuser.company.projects.myproject[i].proposals.myproposal[k].updated = UTCTimefromCurrentDate()
                        }

                    })
                }
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            }

        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const proposal = dynamicstyles.getproposalbyid.call(this, this.props.match.params.proposalid)
        const myuser = dynamicstyles.getuser.call(this)

        const amount = Number(this.getamount()).toFixed(2)
        const getupdated = () => {
            if (proposal.updated) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                    <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                        Proposal Last Updated on {UTCStringFormatDateforProposal(proposal.updated)}
                    </div>
                </div>)
            }
        }
        const getapproved = () => {
            if (proposal.approved) {

                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin10 }}>
                    <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                        Proposal Approved on {UTCStringFormatDateforProposal(proposal.approved)}
                    </div>
                </div>)
            }
        }
        if (myuser) {

            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
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

                        {dynamicstyles.showbidtable.call(this)}

                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>The estimated proposed amount is ${amount}</span>
                        </div>

                        {getupdated()}

                        {getapproved()}

                        {dynamicstyles.showsaveproject.call(this)}



                    </div>
                </div>
            )


        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Proposal </span>
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

export default connect(mapStateToProps, actions)(ViewProposal);