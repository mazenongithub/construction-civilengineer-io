import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles'
import MakeID from './makeids';
import { CreateBenefit,getBenefitInterval } from './functions';
import { Link } from 'react-router-dom';
import AccountID from './accountid'
import Frequency from './frequency';
import { removeIconSmall } from './svg';
import PieChart from './piechart';

class ViewEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeemployeeid: '', spinner: false, hidebenefits:[] }
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

    handleaccountid(accountid) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                if (this.state.activebenefitid) {

                    const getbenefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = dynamicstyles.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid)

                        myuser.company.office.employees.employee[i].benefits.benefit[j].accountid = accountid;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let frequency = ""
                    let amount = 0
                    this.createNewBenefit(benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }
    getaccountid() {
        const employee = this.getemployee();
        const dynamicstyles = new DynamicStyles();
        let accountid = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)
                if (benefit) {
                    accountid = benefit.accountid;
                }

            }

        }
        return accountid
    }



    getemployee() {

        const dynamicstyles = new DynamicStyles();
        return dynamicstyles.getemployeebyprofile.call(this, this.props.match.params.employeeid)

    }

    handleAmount(amount) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                if (this.state.activebenefitid) {

                    const getbenefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = dynamicstyles.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid)

                        myuser.company.office.employees.employee[i].benefits.benefit[j].amount = amount;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let accountid = ""
                    let frequency = "";
                    this.createNewBenefit(benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }

    getamount() {
        const employee = this.getemployee();
        const dynamicstyles = new DynamicStyles();
        let getamount = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)
                if (benefit) {
                    getamount = benefit.amount;
                }

            }

        }
        return getamount;
    }

    getworkinghours() {
        let workinghours = "";

        let employee = this.getemployee();
        if (employee) {
            workinghours = employee.workinghours;
        }
        return workinghours;


    }
    handleworkinghours(workinghours) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                myuser.company.office.employees.employee[i].workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }


        }



    }

    createNewBenefit(benefitid, benefit, accountid, amount, frequency) {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount, frequency);
                if (employee.hasOwnProperty("benefits")) {
                    myuser.company.office.employees.employee[i].benefits.benefit.push(newBenefit)
                } else {
                    let benefits = { benefit: [newBenefit] }
                    myuser.company.office.employees.employee[i].benefits = benefits;

                }
                this.props.reduxUser(myuser)
                this.setState({ activebenefitid: benefitid })

            }

        }
    }

    handleBenefit(benefit) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                if (this.state.activebenefitid) {

                    const getbenefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = dynamicstyles.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid)

                        myuser.company.office.employees.employee[i].benefits.benefit[j].benefit = benefit;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let amount = 0;
                    let accountid = ""
                    let frequency = "";
                    this.createNewBenefit(benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }
    getbenefit() {
        const employee = this.getemployee();
        const dynamicstyles = new DynamicStyles();
        let getbenefit = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)
                if (benefit) {
                    getbenefit = benefit.benefit;
                }

            }

        }
        return getbenefit
    }

    getfrequency() {
        const employee = this.getemployee();
        const dynamicstyles = new DynamicStyles();
        let getfrequency = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)
                if (benefit) {
                    getfrequency = benefit.frequency;
                }

            }

        }
        return getfrequency;

    }

    handleFrequency(frequency) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {

            let employee = this.getemployee()
            if (employee) {
                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                if (this.state.activebenefitid) {

                    const getbenefit = dynamicstyles.getbenefitbyid.call(this, employee.providerid, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = dynamicstyles.getbenefitkeybyid.call(this, employee.providerid, this.state.activebenefitid)

                        myuser.company.office.employees.employee[i].benefits.benefit[j].frequency = frequency;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let accountid = ""
                    let amount = 0
                    this.createNewBenefit(benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }

    showbenefits() {
        const employee = this.getemployee();
        let showbenefit = [];
        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.benefit.map(benefit => {
                showbenefit.push(this.showbenefit(benefit))

            })
        }
        return showbenefit;

    }

    makebenefitactive(benefitid) {
        if (this.state.activebenefitid === benefitid) {
            this.setState({ activebenefitid: false })
        } else {
            this.setState({ activebenefitid: benefitid })
        }
    }

    removebenefit(benefit) {
        const dynamicstyles = new DynamicStyles();
        if (window.confirm(`Are you sure you want to remove ${benefit.benefit}?`)) {
            const myuser = dynamicstyles.getuser.call(this)

            if (myuser) {
                const employee = this.getemployee();

                if (employee) {
                    const i = dynamicstyles.getemployeekeybyid.call(this,employee.providerid)

                    const getbenefit = dynamicstyles.getbenefitbyid.call(this,employee.providerid, benefit.benefitid)

                    if(getbenefit) {
                        const j =  dynamicstyles.getbenefitkeybyid.call(this,employee.providerid, benefit.benefitid)
                    
                        myuser.company.office.employees.employee[i].benefits.benefit.splice(j,1)
                        this.props.reduxUser(myuser)
                        this.setState({activebenefitid:false})
                    }

                }

            }

        }


    }


    showbenefit(benefit) {
        const dynamicstyles = new DynamicStyles();
        const removeIcon = () => {
            if (this.state.width > 1200) {
                return ({ width: '40px' })

            } else {
                return ({ width: '30px' })

            }
        }
        const styles = MyStylesheet();
        const account = dynamicstyles.getaccountbyid.call(this, benefit.accountid)
        const regularFont = dynamicstyles.getRegularFont.call(this)

        const activebenefit = (benefitid) => {
            if (this.state.activebenefitid === benefitid) {
                return styles.activeBackground;
            } else {
                return styles.whiteBackground
            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...activebenefit(benefit.benefitid) }}
            >
                <span style={{ ...styles.generalFont, ...regularFont }} onClick={() => { this.makebenefitactive(benefit.benefitid) }}>
                    {benefit.benefit} Amount: ${+Number(benefit.amount).toFixed(2)} {benefit.frequency} Account: {account.accountname}
                    <button style={{ ...activebenefit(benefit.benefitid), ...styles.noBorder, ...removeIcon() }}
                        onClick={() => { this.removebenefit(benefit) }}>{removeIconSmall()}</button>
                </span>

            </div>
        )
    }


    calculateLaborRate() {
        const employee = this.getemployee();
        let sum = 0;
        if(employee) {
        const benefits = this.getemployeebenefitinterval();
     
        if(benefits.length>0) {
            // eslint-disable-next-line
            benefits.map(benefit=> {
                sum+=Number(benefit.amount)
            })
        }

    }
    const workinghours = Number(employee.workinghours)
    const laborrate = workinghours > 0 ? sum/workinghours : 0;
        return laborrate;
    }

    getemployeebenefitinterval() {
   
        let benefits = [];
        const employee = this.getemployee();
        if(employee) {
            if(employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map(benefit=> {
                    let interval = getBenefitInterval(benefit.frequency,Number(benefit.amount),benefit.benefit, benefit.accountid)
                    benefits = [...benefits,...interval]
                })
            }
        }

        return benefits;
    }


    showlaborRate() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const laborrate = this.calculateLaborRate();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        return(<div style={{...styles.generalContainer, ...styles.bottomMargin15}}>
            <span style={{...styles.generalFont,...regularFont}}>Calculated Labor Rate is ${Number(laborrate).toFixed(2)}</span>
        </div>)
    }


    render() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const accountid = new AccountID();
        const frequency = new Frequency();
        const piechart = new PieChart();
        if (myuser) {
            const employee = this.getemployee();
            if (employee) {
                return (

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>



                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/employees/${employee.profile}`}
                                > /{this.props.match.params.employeeid}</Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...headerFont, ...styles.generalFont }}>
                                    Employee Information
                                </span>
                            </div>


                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                   Estimated Annual Working Hours <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                        value={this.getworkinghours()}
                                        onChange={event => { this.handleworkinghours(event.target.value) }}
                                    />
                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...headerFont, ...styles.generalFont }}>
                                    Benefits
                                </span>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                {accountid.showaccountmenu.call(this)}
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Benefit</span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefit()}
                                    onChange={event => { this.handleBenefit(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Amount  </span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getamount()}
                                    onChange={event => { this.handleAmount(event.target.value) }}
                                />
                            </div>

                            {frequency.showFrequency.call(this)}


                            {this.showbenefits()}

                            {this.showlaborRate()}

                            {piechart.showpiechart.call(this,employee.providerid)}
                            

                            {dynamicstyles.showsavecompany.call(this)}

                        </div>
                    </div>
                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Employee Not Found</span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>You have to be logged in to View Employee</span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ViewEmployee);