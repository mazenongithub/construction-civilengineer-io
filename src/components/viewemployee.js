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

class ViewEmployee {



    handleaccountid(accountid) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
        const viewemployee = new ViewEmployee()
        if (company) {

            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                if (this.state.activebenefitid) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee._id, this.state.activebenefitid)

                        company.employees[i].benefits[j].accountid = accountid;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let frequency = ""
                    let amount = 0
                    viewemployee.createNewBenefit.call(this, benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }
    getaccountid() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        const construction = new Construction();
        let accountid = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)
                if (benefit) {
                    accountid = benefit.accountid;
                }

            }

        }
        return accountid
    }



    getemployee() {

        const construction = new Construction();
        const getemployee = construction.getuserbyID.call(this, this.state.activeemployeeid)
        const _id = getemployee._ID;
        return construction.getemployeebyuserid.call(this, _id)

    }

    handleAmount(amount) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
        const viewemployee = new ViewEmployee();
        if (company) {

            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                if (this.state.activebenefitid) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee._id, this.state.activebenefitid)

                        company.employees[i].benefits[j].amount = amount;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let accountid = ""
                    let frequency = "";
                    viewemployee.createNewBenefit.call(this, benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }

    getamount() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        const construction = new Construction();
        let getamount = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)
                if (benefit) {
                    getamount = benefit.amount;
                }

            }

        }
        return getamount;
    }

    getworkinghours() {
        const viewemployee = new ViewEmployee();
        let workinghours = "";

        let employee = viewemployee.getemployee.call(this);
        if (employee) {
            workinghours = employee.workinghours;
        }
        return workinghours;


    }
    handleworkinghours(workinghours) {
        const construction = new Construction();
        const viewemployee = new ViewEmployee();
        const company = construction.getcompany.call(this)

        if (company) {

            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                company.employees[i].workinghours = workinghours;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            }


        }



    }

    createNewBenefit(benefitid, benefit, accountid, amount, frequency) {
        const construction = new Construction()
        const company = construction.getcompany.call(this)
        const viewemployee = new ViewEmployee();
        if (company) {
            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount, frequency);
                if (employee.hasOwnProperty("benefits")) {
                    company.employees[i].benefits.push(newBenefit)
                } else {
                    let benefits = { benefit: [newBenefit] }
                    company.employees[i].benefits = benefits;

                }
                this.props.reduxCompany(company)
                this.setState({ activebenefitid: benefitid })

            }

        }


    }

    handleBenefit(benefit) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
        const viewemployee = new ViewEmployee();
        if (company) {

            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                if (this.state.activebenefitid) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee._id, this.state.activebenefitid)

                        company.employees[i].benefits[j].benefit = benefit;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let amount = 0;
                    let accountid = ""
                    let frequency = "";
                    viewemployee.createNewBenefit.call(this, benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }
    getbenefit() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        const construction = new Construction();
        let getbenefit = "";
        if (employee) {
     
            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)
                if (benefit) {
                    getbenefit = benefit.benefit;
                }

            }

        }
        return getbenefit
    }

    getfrequency() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        const construction = new Construction();
        let getfrequency = "";
        if (employee) {

            if (this.state.activebenefitid) {
                let benefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)
                if (benefit) {
                    getfrequency = benefit.frequency;
                }

            }

        }
        return getfrequency;

    }

    handleFrequency(frequency) {
        const construction = new Construction();
        const viewemployee = new ViewEmployee();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();
        if (company) {

            let employee = viewemployee.getemployee.call(this)
            if (employee) {
                let i = construction.getemployeekeybyid.call(this, employee._id)
                if (this.state.activebenefitid) {

                    const getbenefit = construction.getbenefitbyid.call(this, employee._id, this.state.activebenefitid)

                    if (getbenefit) {
                        let j = construction.getbenefitkeybyid.call(this, employee._id, this.state.activebenefitid)

                        company.employees[i].benefits[j].frequency = frequency;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })

                    }

                } else {


                    let benefitid = makeID.benefitid.call(this)
                    let benefit = ""
                    let accountid = ""
                    let amount = 0
                    viewemployee.createNewBenefit.call(this, benefitid, benefit, accountid, amount, frequency)

                }
            }

        }

    }

    showbenefits() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        let showbenefit = [];
        if (employee.hasOwnProperty("benefits")) {
            // eslint-disable-next-line
            employee.benefits.map(benefit => {
                showbenefit.push(viewemployee.showbenefit.call(this,benefit))

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
        const viewemployee = new ViewEmployee();
        const construction = new Construction();
        if (window.confirm(`Are you sure you want to remove ${benefit.benefit}?`)) {
            const company = construction.getcompany.call(this)

            if (company) {
                const employee = viewemployee.getemployee.call(this);

                if (employee) {
                    const i = construction.getemployeekeybyid.call(this, employee._id)

                    const getbenefit = construction.getbenefitbyid.call(this, employee._id, benefit.benefitid)

                    if (getbenefit) {
                        const j = construction.getbenefitkeybyid.call(this, employee._id, benefit.benefitid)

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
        const viewemployee = new ViewEmployee();
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
            if (this.state.activebenefitid === benefitid) {
                return styles.activeBackground;
            } else {
                return styles.whiteBackground
            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...activebenefit(benefit.benefitid) }}
                key={benefit.benefitid}>
                <span style={{ ...styles.generalFont, ...regularFont }} onClick={() => { viewemployee.makebenefitactive.call(this,benefit.benefitid) }}>
                    {benefit.benefit} Amount: ${+Number(benefit.amount).toFixed(2)} {benefit.frequency} Account: {account.accountname}
                </span>
                <button style={{ ...activebenefit(benefit.benefitid), ...styles.noBorder, ...removeIcon() }}
                    onClick={() => { viewemployee.removebenefit.call(this,benefit) }}>{removeIconSmall()}
                </button>


            </div>
        )
    }


    calculateLaborRate() {
        const viewemployee = new ViewEmployee();
        const employee = viewemployee.getemployee.call(this);
        let sum = 0;
        if (employee) {
            const benefits = viewemployee.getemployeebenefitinterval.call(this);

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
        const viewemployee = new ViewEmployee();

        let benefits = [];
        const employee = viewemployee.getemployee.call(this);
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
        const viewemployee = new ViewEmployee();
        const styles = MyStylesheet();
        const construction = new Construction();
        const laborrate = viewemployee.calculateLaborRate.call(this);
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
        const viewemployee = new ViewEmployee();
        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                    value={viewemployee.getaccountid.call(this)}
                    onChange={event => { viewemployee.handleaccountid.call(this,event.target.value) }}>
                    {viewemployee.loadaccounts.call(this)}
                </select>
            </div>)


    }

    showFrequency() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const viewemployee = new ViewEmployee();
        return(
            <div style={{...styles.generalContainer, ...styles.bottomMargin15}}>
        <select style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
            onChange={event => {viewemployee.handleFrequency.call(this,event.target.value) }}
            value={viewemployee.getfrequency.call(this)}>
            <option value={false}>Select Frequency</option>
            <option value={`daily`}>Daily</option>
            <option value={`weekly`}>Weekly</option>
            <option value={`monthly`}>Monthly</option>
            <option value={`annually`}>Annually</option>
        </select>
        </div>)
    }


    showViewEmployee() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const accountid = new AccountID();
        const frequency = new Frequency();
        const piechart = new PieChart();
        const viewemployee = new ViewEmployee();
        if (myuser) {
            const company = construction.getcompany.call(this)
            const employee = viewemployee.getemployee.call(this);
            const employeeid = this.state.activeemployeeid;
            const getemployee = construction.getuserbyID.call(this, this.state.activeemployeeid)
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
                                        value={viewemployee.getworkinghours.call(this)}
                                        onChange={event => { viewemployee.handleworkinghours.call(this, event.target.value) }}
                                    />
                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...headerFont, ...styles.generalFont }}>
                                    Benefits
                                </span>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                {viewemployee.showaccountmenu.call(this)}
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Benefit</span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={viewemployee.getbenefit.call(this)}
                                    onChange={event => { viewemployee.handleBenefit.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Amount  </span>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={viewemployee.getamount.call(this)}
                                    onChange={event => { viewemployee.handleAmount.call(this, event.target.value) }}
                                />
                            </div>

                            {viewemployee.showFrequency.call(this)}


                            {viewemployee.showbenefits.call(this)}

                            {viewemployee.showlaborRate.call(this)}

                            {piechart.showpiechart.call(this, employee._id)}


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



export default ViewEmployee;