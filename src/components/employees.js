import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { addIcon, removeIconSmall } from './svg';
import { makeID, CreateBenefit, CreateEmployee } from './functions';
import DynamicStyles from './dynamicstyles';
import FindEmployee from './findemployee';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeemployeeid: '', search: '', activebenefitid: '', amount: "", accountid: '', benefit: '' }
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
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    getworkinghours() {
        if (this.state.activeemployeeid) {
            let employee = this.getactiveemployee();
            return employee.workinghours;
        } else {
            return "";
        }

    }
    handleworkinghours(workinghours) {
        let myuser = this.getuser();
        if (myuser) {
            let employee = this.getactiveemployee();
            if (employee) {
                let i = this.getactiveemployeekey();
                myuser.company.office.employees.employee[i].workinghours = workinghours;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            }
        }

    }
    getactiveemployeekey() {
        let key = false;
        if (this.state.activeemployeeid) {
            let user = this.getuser();
            let employeeid = this.state.activeemployeeid;

            if (user) {
                let employees = this.getemployees();
                if (employees) {
                    // eslint-disable-next-line
                    employees.map((employee, i) => {
                        if (employee.providerid === employeeid) {
                            key = i
                        }
                    })

                }
            }
        }
        return key;
    }
    getactiveemployee() {
        let activeemployee = false;
        if (this.state.activeemployeeid) {
            let user = this.getuser();
            let employeeid = this.state.activeemployeeid;

            if (user) {
                let employees = this.getemployees();
                if (employees) {
                    // eslint-disable-next-line
                    employees.map(employee => {
                        if (employee.providerid === employeeid) {
                            activeemployee = employee;
                        }
                    })

                }
            }
        }
        return activeemployee;
    }
    loadaccounts() {
        let accounts = this.getaccounts();
        let options = [];
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option value={account.accountid} key={account.accountid}>{account.account} -{account.accountname}</option>)
            })
        }
        return options;
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
    getaccounts() {
        let company = this.getcompany();
        let accounts = false;
        if (company.hasOwnProperty("office")) {
            let office = company.office;
            if (office.hasOwnProperty("accounts")) {
                accounts = company.office.accounts.account;

            }
        }
        return accounts;
    }
    getactivebenefitkey() {
        let key = false;
        if (this.state.activebenefitid) {
            let benefitid = this.state.activebenefitid;
            let employee = this.getactiveemployee();
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map((benefit, i) => {
                    if (benefit.benefitid === benefitid) {
                        key = i;
                    }
                })
            }
        }
        return key
    }
    getactivebenefit() {
        let benefits = false;
        if (this.state.activebenefitid) {
            let benefitid = this.state.activebenefitid;
            let employee = this.getactiveemployee();
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map(benefit => {
                    if (benefit.benefitid === benefitid) {
                        benefits = benefit;
                    }
                })
            }
        }
        return benefits;
    }
    handleAmount(amount) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activeemployeeid) {
                let i = this.getactiveemployeekey()
                if (this.state.activebenefitid) {

                    let j = this.getactivebenefitkey();

                    myuser.company.office.employees.employee[i].benefits.benefit[j].amount = amount;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let benefitid = makeID(16);
                    let benefit = this.state.benefit;
                    let accountid = this.state.accountid;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    let employee = this.getactiveemployee();
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

    }
    getamount() {
        if (this.state.activebenefitid) {
            let benefit = this.getactivebenefit();

            return (benefit.amount)
        } else {
            return (this.state.amount)
        }
    }

    handlebenefit(benefit) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activeemployeeid) {
                let i = this.getactiveemployeekey()
                if (this.state.activebenefitid) {

                    let j = this.getactivebenefitkey();

                    myuser.company.office.employees.employee[i].benefits.benefit[j].benefit = benefit;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let benefitid = makeID(16);
                    let amount = this.state.amount;
                    let accountid = this.state.accountid;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    let employee = this.getactiveemployee();
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

    }
    getbenefit() {
        if (this.state.activebenefitid) {
            let benefit = this.getactivebenefit();
            return (benefit.benefit)
        } else {
            return (this.state.benefit)
        }
    }

    handleaccountid(accountid) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activeemployeeid) {
                let i = this.getactiveemployeekey()
                if (this.state.activebenefitid) {

                    let j = this.getactivebenefitkey();

                    myuser.company.office.employees.employee[i].benefits.benefit[j].accountid = accountid;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                } else {
                    let benefitid = makeID(16);
                    let amount = this.state.amount;
                    let benefit = this.state.benefit;
                    let newBenefit = CreateBenefit(benefitid, benefit, accountid, amount);
                    let employee = this.getactiveemployee();
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

    }
    getaccountid() {
        if (this.state.activebenefitid) {
            let benefit = this.getactivebenefit();
            return (benefit.accountid)
        } else {
            return (this.state.accountid)
        }
    }
    getpermonth() {
        let permonth = "";
        if (this.state.activeemployeeid) {
            let employee = this.getactiveemployee();
            permonth = Math.round(Number(employee.workinghours) / 12)
        }
        return permonth;

    }
    getperweek() {
        let perweek = "";
        if (this.state.activeemployeeid) {
            let employee = this.getactiveemployee();
            perweek = Math.round(Number(employee.workinghours) / 52)
        }
        return perweek;

    }
    getbenefitmonth() {
        let benefit = this.getactivebenefit();
        if (benefit) {
            return (Math.round(Number(benefit.amount) / 12).toFixed(2))
        } else {
            return;
        }

    }
    getbenefitweek() {
        let benefit = this.getactivebenefit();
        if (benefit) {
            return (Number(benefit.amount) / 52).toFixed(2)
        } else {
            return;
        }

    }
    getbenefitday() {
        let benefit = this.getactivebenefit();
        if (benefit) {
            return (Number(benefit.amount) / 365).toFixed(2)
        } else {
            return;
        }
    }
    getbenefithour() {
        let benefit = this.getactivebenefit();
        let employee = this.getactiveemployee();

        if (benefit && employee) {
            return (Number(Number(benefit.amount) / (Number(employee.workinghours))).toFixed(2))
        } else {
            return;
        }

    }
    showworkinghours() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            Annual Working Hours <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                value={this.getworkinghours()}
                                onChange={event => { this.handleworkinghours(event.target.value) }}
                            />
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Per Month <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getpermonth()}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Per Week  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getperweek()}
                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Account   <select
                                value={this.getaccountid()}
                                onChange={event => { this.handleaccountid(event.target.value) }}
                                style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> <option value={false}> Select An Account  </option>
                                {this.loadaccounts()}</select>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Benefit <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                value={this.getbenefit()}
                                onChange={event => { this.handlebenefit(event.target.value) }} />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Amount Per Year <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                value={this.getamount()}
                                onChange={event => { this.handleAmount(event.target.value) }}
                            />
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Month <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitday()}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Week  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitweek()} />
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Day  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitday()}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Hour  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefithour()}
                                />
                            </div>
                        </div>


                    </div>
                </div>
            )

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Annual Working Hours
                            </div>
                            <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getworkinghours()}
                                    onChange={event => { this.handleworkinghours(event.target.value) }}
                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Per Month <br /><input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getpermonth()} />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Per Week <br />  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.getperweek()}
                                />
                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Account <br />
                            <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                value={this.getaccountid()}
                                onChange={event => { this.handleaccountid(event.target.value) }}>
                                <option value={false}> Select An Account  </option>
                                {this.loadaccounts()}
                            </select>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Benefit<br />  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getbenefit()}
                                onChange={event => { this.handlebenefit(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...regularFont, }}>
                            Amount Per Year<br />  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getamount()}
                                onChange={event => { this.handleAmount(event.target.value) }}
                            />
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Month <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitmonth()}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Week  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitweek()} />
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Day  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefitday()}
                                />
                            </div>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.addMargin }}>
                                Per Hour  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin }}
                                    value={this.getbenefithour()} />
                            </div>
                        </div>

                    </div>
                </div>)
        }

    }
    showbenefits() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.bottomMargin15 }}>
                        Employee Benefits
                </div>
                    {this.showworkinghours()}

                </div>
            </div>)
    }

    showemployees() {
        let employees = [];
        if (this.props.allusers) {
            if (this.props.allusers.hasOwnProperty("myuser")) {
                // eslint-disable-next-line
                this.props.allusers.myuser.map(myuser => {
                    employees.push(this.showemployee(myuser))
                })
            }
        }

        return employees;

    }

    addemployee(providerid) {
        let workinghours = 0;
        let newEmployee = CreateEmployee(providerid, workinghours);
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {
                    myuser.company.office.employees.employee.push(newEmployee);
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                } else {
                    let employees = { employee: [newEmployee] };
                    myuser.company.office.employees = employees;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })
                }
            }
        }
    }
    showemployee(employee) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const addCompany = this.getAddCompany();
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }} key={employee.providerid}>
            Employee ID : {employee.providerid}  {employee.firstname} {employee.lastname}  <button style={{ ...styles.generalButton, ...addCompany }}
                onClick={() => { this.addemployee(employee.providerid) }}>{addIcon()}</button>
        </div>)

    }
    getprofilephoto() {
        if (this.state.width > 1200) {
            return ({ width: '166px', height: '155px' })
        } else if (this.state.width > 800) {
            return ({ width: '155px', height: '130px' })
        } else {
            return ({ width: '121px', height: '100px' })
        }
    }
    getemployees() {
        let myuser = this.getuser();
        let employee = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {
                    employee = myuser.company.office.employees.employee
                }
            }
        }
        return employee;
    }
    showmyemployees() {
        let employees = this.getemployees();
        let myemployees = [];
        if (employees) {
            // eslint-disable-next-line
            employees.map(employee => {
                myemployees.push(this.showmyemployee(employee.providerid))

            })
        }
        return (myemployees)
    }

    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
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
    makeemployeeactive(employeeid) {
        if (this.state.activeemployeeid === employeeid) {
            this.setState({ activeemployeeid: false })
        } else {
            this.setState({ activeemployeeid: employeeid })
        }
    }
    showmyemployee(providerid) {
        const styles = MyStylesheet();
        const profilephoto = this.getprofilephoto();
        const removeIcon = this.getremoveicon();
        const employee = this.getemployeebyproviderid(providerid);
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={`myemployee${employee.providerid}`} >
                    <div style={{ ...styles.flex1 }}>


                        <div style={{ ...styles.generalFlex, ...this.getactiveeemployeebackground(employee.providerid) }} key={`myemployee${employee.providerid}`}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...profilephoto, ...styles.showBorder, ...styles.marginAuto }}
                                    onClick={() => { this.makeemployeeactive(employee.providerid) }}
                                >

                                </div>
                            </div>
                            <div style={{ ...styles.flex4, ...styles.generalFont, ...regularFont }}>
                                {employee.firstname}  {employee.lastname}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
                            </div>

                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...this.getactiveeemployeebackground(employee.providerid) }} key={`myemployee${employee.providerid}`} >
                    <div style={{ ...styles.flex1 }}>



                        <div style={{ ...styles.generalContainer }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <div style={{ ...styles.generalContainer, ...profilephoto, ...styles.showBorder, ...styles.marginAuto }} onClick={() => { this.makeemployeeactive(employee.providerid) }}>

                                </div>
                            </div>
                        </div>


                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex4, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                {employee.firstname} {employee.lastname}
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
                            </div>

                        </div>

                    </div>
                </div>
            )
        }
    }
    showactiveemployeebenefits() {
        let employee = this.getactiveemployee();
        let benefits = [];
        if (employee) {
            console.log(employee)
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map(benefit => {
                    benefits.push(this.showemployebenefit(benefit))
                })

            }
        }
        return benefits;
    }

    getaccountbyid(accountid) {
        let accountbyid = false;
        let accounts = this.getaccounts();
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    accountbyid = account;
                }
            })
        }

        return accountbyid;
    }
    makebenefitidactive(benefitid) {
        if (this.state.activebenefitid === benefitid) {
            this.setState({ activebenefitid: false })
        } else {
            this.setState({ activebenefitid: benefitid })
        }
    }
    showemployebenefit(benefit) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        const account = this.getaccountbyid(benefit.accountid)

        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...this.getactiveebenefitbackground(benefit.benefitid) }} onClick={() => { this.makebenefitidactive(benefit.benefitid) }}>
            {benefit.benefit}  Account:  {account.account} {account.accountname} Amount: {benefit.amount}<button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
        </div>)

    }
    getactiveeemployeebackground(employeeid) {
        if (this.state.activeemployeeid === employeeid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    getactiveebenefitbackground(benefitid) {
        if (this.state.activebenefitid === benefitid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    showactivehourlyrate() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.activeemployeeid) {
            const employee = this.getactiveemployee();
            const myemployee = this.getemployeebyproviderid(employee.providerid)
            const hourlyrate = this.getactivehourlyrate();
            return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                {myemployee.firstname} {myemployee.lastname} calculated wage rate is ${hourlyrate} per hour
            </div>)
        } else {
            return;
        }
    }
    getactivehourlyrate() {
        let hourlyrate = 0;
        if (this.state.activeemployeeid) {
            let employee = this.getactiveemployee();
            let workinghours = Number(employee.workinghours);
            let totalbenefits = 0;

            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map(benefit => {
                    totalbenefits += Number(benefit.amount);

                })
            }

            if (workinghours && totalbenefits) {
                hourlyrate = Number(totalbenefits / workinghours).toFixed(2)
            }
        }
        return hourlyrate;
    }
    handleemployeebenefits() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.activeemployeeid) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        {this.showbenefits()}

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Employee Benefits
                            </div>
                        </div>
                        {this.showactivehourlyrate()}
                        {this.showactiveemployeebenefits()}




                    </div>
                </div>)
        } else {
            return;
        }
    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const findemployee = new FindEmployee();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/employees
                        </div>
                    </div>

                    {findemployee.showEmployeeSearch.call(this)}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont, ...styles.generalFont }}>
                            My Employees
                            </div>
                    </div>
                    {this.showmyemployees()}

                    {this.handleemployeebenefits()}

                    {dynamicstyles.showsavecompany.call(this)}

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

export default connect(mapStateToProps, actions)(Employees);