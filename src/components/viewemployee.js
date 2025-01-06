import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import Construction from './construction';
import { MyStylesheet } from './styles'
import MakeID from './makeids';
import { CreateBenefit, getBenefitInterval } from './functions';
import { Link } from 'react-router-dom';
import AccountID from './accountid'
import Frequency from './frequency';
import { removeIconSmall } from './svg';
import PieChart from './piechart';
import EmployeeID from './employeeid';

class ViewEmployee extends Component {
    

    constructor(props) {
        super(props);

              this.state = {

            render: '', width: 0, height: 0 

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {

        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    


    }


    // this.checkAllCompany();

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight, });
    }




    handleaccountid(accountid) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
       
        if (company) {

            let employee = this.getemployee()
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                if (this.getActiveBenefitID()) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee.user_id, this.getActiveBenefitID())

                        company.employees[i].benefits[j].accountid = accountid;
                        this.props.reduxCompany(company)
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
        const construction = new Construction();
        let accountid = "";
        if (employee) {

            if (this.getActiveBenefitID()) {
                let benefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())
                if (benefit) {
                    accountid = benefit.accountid;
                }

            }

        }
        return accountid
    }



    getemployee() {

        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        const employeeid = navigation.company.employee.activeemployeeid;
        return construction.getemployeebyuserid.call(this, employeeid)

    }

    handleAmount(amount) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
       
        if (company) {

            let employee = this.getemployee()
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                if (this.getActiveBenefitID()) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee.user_id, this.getActiveBenefitID())

                        company.employees[i].benefits[j].amount = amount;
                        this.props.reduxCompany(company)
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
        const construction = new Construction();
        let getamount = "";
        if (employee) {

            if (this.getActiveBenefitID()) {
                let benefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())
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
        const construction = new Construction();
    
        const company = construction.getcompany.call(this)

        if (company) {

            let employee = this.getemployee()
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                company.employees[i].workinghours = workinghours;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            }


        }



    }

    createNewBenefit(benefitid, benefit, accountid, amount, frequency) {
        const construction = new Construction()
        const company = construction.getcompany.call(this)
        const navigation = construction.getNavigation.call(this)
      
        if (company) {
            let employee = this.getemployee(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount, frequency);
                if (employee.hasOwnProperty("benefits")) {
                    company.employees[i].benefits.push(newBenefit)
                } else {
                    let benefits = { benefit: [newBenefit] }
                    company.employees[i].benefits = benefits;

                }
                navigation.company.employee.activebenefitid = benefitid;
                this.props.reduxCompany(company)
                this.props.reduxNavigation(navigation)
                this.setState({ render:'render' })

            }

        }


    }

    handleBenefit(benefit) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
      
        if (company) {

            let employee = this.getemployee()
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                if (this.getActiveBenefitID()) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee.user_id, this.getActiveBenefitID())

                        company.employees[i].benefits[j].benefit = benefit;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let amount = 0;
                    let accountid = ""
                    let frequency = "";
                    this.createNewBenefit( benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }
    getbenefit() {
        
        const employee = this.getemployee();
        const construction = new Construction();
        let getbenefit = "";
        if (employee) {
     
            if (this.getActiveBenefitID()) {
                let benefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())
                console.log(employee.user_id, )
                if (benefit) {
                    getbenefit = benefit.benefit;
                }

            }

        }
        return getbenefit
    }

    getfrequency() {
        
        const employee = this.getemployee();
        const construction = new Construction();
        let getfrequency = "";
        if (employee) {

            if (this.getActiveBenefitID()) {
                let benefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())
                if (benefit) {
                    getfrequency = benefit.frequency;
                }

            }

        }
        return getfrequency;

    }

    handleFrequency(frequency) {
        const construction = new Construction();
        
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
        if (company) {

            let employee = this.getemployee()
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee.user_id)
                if (this.getActiveBenefitID()) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee.user_id, this.getActiveBenefitID())

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee.user_id, this.getActiveBenefitID())

                        company.employees[i].benefits[j].frequency = frequency;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let accountid = ""
                    let amount = 0
                    this.createNewBenefit( benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }

    showbenefits() {
        
        const employee = this.getemployee();
        let showbenefit = [];
        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.map(benefit => {
                showbenefit.push(this.showbenefit(benefit))

            })
        }
        return showbenefit;

    }

    getActiveBenefitID() {
        const construction = new Construction();
        let activebenefitid = "";
        const navigation = construction.getNavigation.call(this)
        activebenefitid = navigation.company.employee.activebenefitid;
        return activebenefitid;
    }

    makebenefitactive(benefitid) {
        const construction = new Construction();
        const activebenefitid = this.getActiveBenefitID();
        const navigation = construction.getNavigation.call(this)
  
        if (activebenefitid === benefitid) {
            navigation.company.employee.activebenefitid = false
           
        } else {
            navigation.company.employee.activebenefitid = benefitid;
        
        }
        this.props.reduxNavigation(navigation)
        this.setState({render:'render'})
    }

    removebenefit(benefit) {
        
        const construction = new Construction();
        if (window.confirm(`Are you sure you want to remove ${benefit.benefit}?`)) {
            const company = construction.getcompany.call(this)

            if (company) {
                const employee = this.getemployee();

                if (employee) {
                    const i = construction.getemployeekeybyid.call(this, employee.user_id)

                    const getbenefit = construction.getbenefitbyid.call(this, employee.user_id, benefit.benefitid)

                    if (getbenefit) {
                        const j = construction.getbenefitkeybyid.call(this, employee.user_id, benefit.benefitid)

                        company.employees[i].benefits.splice(j, 1)
                        this.props.reduxCompany(company)
                        this.setState({ activebenefitid: false })
                    }

                }

            }

        }


    }


    showbenefit(benefit) {
        const construction = new Construction();
        
        const removeIcon = () => {
            if (this.state.width > 1200) {
                return ({ width: '40px' })

            } else {
                return ({ width: '30px' })

            }
        }
        const styles = MyStylesheet();
        const account = construction.getaccountbyid.call(this, benefit.accountid)
        const regularFont = construction.getRegularFont.call(this)

        const activebenefit = (benefitid) => {
            if (this.getActiveBenefitID() === benefitid) {
                return styles.activeBackground;
            } else {
                return styles.whiteBackground
            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...activebenefit(benefit.benefitid) }}
                key={benefit.benefitid}>
                <span style={{ ...styles.generalFont, ...regularFont }} onClick={() => { this.makebenefitactive(benefit.benefitid) }}>
                    {benefit.benefit} Amount: ${+Number(benefit.amount).toFixed(2)} {benefit.frequency} Account: {account.accountname}
                </span>
                <button style={{ ...activebenefit(benefit.benefitid), ...styles.noBorder, ...removeIcon() }}
                    onClick={() => { this.removebenefit(benefit) }}>{removeIconSmall()}
                </button>


            </div>
        )
    }


    calculateLaborRate() {
        
        const employee = this.getemployee();
        let sum = 0;
        if (employee) {
            const benefits = this.getemployeebenefitinterval();

            if (benefits.length > 0) {
                // eslint-disable-next-line
                benefits.map(benefit => {
                    sum += Number(benefit.amount)
                })
            }

        }
        const workinghours = Number(employee.workinghours)
        const laborrate = workinghours > 0 ? sum / workinghours : 0;
        return laborrate;
    }

    getemployeebenefitinterval() {
        

        let benefits = [];
        const employee = this.getemployee();
        if (employee) {
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.map(benefit => {
                    let interval = getBenefitInterval(benefit.frequency, Number(benefit.amount), benefit.benefit, benefit.accountid)
                    benefits = [...benefits, ...interval]
                })
            }
        }

        return benefits;
    }


    showlaborRate() {
        
        const styles = MyStylesheet();
        const construction = new Construction();
        const laborrate = this.calculateLaborRate();
        const regularFont = construction.getRegularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <span style={{ ...styles.generalFont, ...regularFont }}>Calculated Labor Rate is ${Number(laborrate).toFixed(2)}</span>
        </div>)
    }


    loadaccounts() {
        const construction = new Construction();
        let accounts =construction.getaccounts.call(this)
        let options = [];
        options.push(<option key={`selectanaccount`} value=""> Select Account ID</option>);
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option key={account.accountid} value={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }

    showaccountmenu() {
        const construction = new Construction();
        const accountid = new AccountID();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        
        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                    value={this.getaccountid()}
                    onChange={event => { this.handleaccountid(event.target.value) }}>
                    {this.loadaccounts()}
                </select>
            </div>)


    }

    showFrequency() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        
        return(
            <div style={{...styles.generalContainer, ...styles.bottomMargin15}}>
        <select style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
            onChange={event => {this.handleFrequency(event.target.value) }}
            value={this.getfrequency()}>
            <option value={false}>Select Frequency</option>
            <option value={`daily`}>Daily</option>
            <option value={`weekly`}>Weekly</option>
            <option value={`monthly`}>Monthly</option>
            <option value={`annually`}>Annually</option>
        </select>
        </div>)
    }


    render() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const accountid = new AccountID();
        const frequency = new Frequency();
        const piechart = new PieChart();
        
        if (myuser) {
            const company = construction.getcompany.call(this)
            const employee = this.getemployee();
            const navigation = construction.getNavigation.call(this)
            const employeeid = navigation.company.employee.activeemployeeid
            const getemployee = construction.getuserbyID.call(this, employeeid)
            if (getemployee) {
                return (

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>



                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <a style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}

                                > /{getemployee.FirstName} {getemployee.LastName}</a>
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
                                        onChange={event => { this.handleworkinghours( event.target.value) }}
                                    />
                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...headerFont, ...styles.generalFont }}>
                                    Benefits
                                </span>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                {this.showaccountmenu()}
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Benefit</span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefit()}
                                    onChange={event => { this.handleBenefit( event.target.value) }} />
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Amount  </span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getamount()}
                                    onChange={event => { this.handleAmount( event.target.value) }}
                                />
                            </div>

                            {this.showFrequency()}


                            {this.showbenefits()}

                            {this.showlaborRate()}

                            {piechart.showpiechart.call( this, employee.user_id)}


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
        allcompanys: state.allcompanys,
        mycompany: state.mycompany,
        allusers: state.allusers,
        allprojects: state.allprojects,
        websockets: state.websockets
    }
}

export default connect(mapStateToProps, actions)(ViewEmployee);



