import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { addIcon, removeIconSmall, CheckedBox, EmptyBox } from './svg';
import { CreateBenefit, CreateEmployee } from './functions';
import DynamicStyles from './dynamicstyles';
import MakeID from './makeids';
import { Link } from 'react-router-dom';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeemployeeid: '', search: '', activebenefitid: '', amount: "", accountid: '', benefit: '', month: '', week: '', day: '', hour: '' }
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



    getworkinghours() {
        if (this.state.activeemployeeid) {
            let employee = this.getactiveemployee();
            return employee.workinghours;
        } else {
            return "";
        }

    }
    handleworkinghours(workinghours) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this)
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeemployeeid) {
                    let employee = dynamicstyles.getemployeebyid.call(this, this.state.activeemployeeid)
                    if (employee) {
                        let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                        myuser.company.office.employees.employee[i].workinghours = workinghours;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }
                }

            }

        } else {
            alert(`Only Managers have access to this function `)
        }

    }
    getactiveemployeekey() {
        const dynamicstyles = new DynamicStyles();
        let key = false;
        if (this.state.activeemployeeid) {
            let user = dynamicstyles.getuser.call(this);
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
        const dynamicstyles = new DynamicStyles();
        let activeemployee = false;
        if (this.state.activeemployeeid) {
            let user = dynamicstyles.getuser.call(this);
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
                options.push(<option value={account.accountid} key={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }
    getcompany() {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
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
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

                if (this.state.activeemployeeid) {
                    let employee = dynamicstyles.getemployeebyid.call(this, this.state.activeemployeeid)
                    if (employee) {
                        let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                        if (this.state.activebenefitid) {
                            let j = dynamicstyles.getbenefitkeybyid.call(this, this.state.activebenefitid)

                            myuser.company.office.employees.employee[i].benefits.benefit[j].amount = amount;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        } else {
                            let benefitid = makeID.benefitid.call(this)
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
            } else {
                alert(` Only Managers have access to this function `)
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
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

                if (this.state.activeemployeeid) {
                    let employee = dynamicstyles.getemployeebyid.call(this, this.state.activeemployeeid)
                    if (employee) {
                        let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                        if (this.state.activebenefitid) {
                            let j = dynamicstyles.getbenefitkeybyid.call(this, this.state.activebenefitid)
                            myuser.company.office.employees.employee[i].benefits.benefit[j].benefit = benefit;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        } else {
                            let benefitid = makeID.benefitid.call(this)
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
            } else {
                alert(`Only managers can access this function `)
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
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                if (this.state.activeemployeeid) {
                    let employee = dynamicstyles.getemployeebyid.call(this, this.state.activeemployeeid)
                    if (employee) {
                        let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid)
                        if (this.state.activebenefitid) {
                            let j = dynamicstyles.getbenefitkeybyid.call(this, this.state.activebenefitid)
                            myuser.company.office.employees.employee[i].benefits.benefit[j].accountid = accountid;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        } else {
                            let benefitid = makeID.benefitid.call(this)
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
            } else {
                alert(`Only Managers have access to this function`)
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
            return this.state.month;
        }

    }
    getbenefitweek() {
        let benefit = this.getactivebenefit();
        if (benefit) {
            return (Number(benefit.amount) / 52).toFixed(2)
        } else {
            return this.state.week;
        }

    }
    getbenefitday() {
        let benefit = this.getactivebenefit();
        if (benefit) {
            return (Number(benefit.amount) / 365).toFixed(2)
        } else {
            return this.state.day;
        }
    }
    getbenefithour() {
        let benefit = this.getactivebenefit();
        let employee = this.getactiveemployee();

        if (benefit && employee) {
            return (Number(Number(benefit.amount) / (Number(employee.workinghours))).toFixed(2))
        } else {
            return this.state.hour;
        }

    }
    handleactive(type) {

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const checkmanager = dynamicstyles.checkmanager.call(this)
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeemployeeid) {
                    const employee = dynamicstyles.getemployeebyid.call(this, this.state.activeemployeeid)
                    if (employee) {
                        const i = dynamicstyles.getemployeekeybyid.call(this, this.state.activeemployeeid);
                        switch (type) {
                            case "not-active":
                                if (employee.manager) {
                                    const validate = dynamicstyles.validateremovemanager.call(this, this.state.activeemployeeid)
                                    if (validate) {
                                        if (myuser.providerid !== this.state.activeemployeeid) {
                                            myuser.company.office.employees.employee[i].active = 'not-active';
                                            this.props.reduxUser(myuser);
                                            this.setState({ render: 'render' })
                                        } else {
                                            alert(`You cannot make yourself unactive, you won't be able to undo this `)
                                        }
                                    } else {
                                        alert(`There needs to be atleast one active manager in the company `)
                                    }

                                }
                                else {
                                    myuser.company.office.employees.employee[i].active = 'not-active';
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })
                                }
                                break;
                            case "active":
                                myuser.company.office.employees.employee[i].active = 'active';
                                this.props.reduxUser(myuser);
                                this.setState({ render: 'render' })
                                break;
                            default:
                                break;
                        }

                    }

                }
            }

        } else {
            alert(`Only managers can access this function `)
        }
    }
    handlemanager(type) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this);
        if (checkmanager) {
            if (myuser) {
                if (this.state.activeemployeeid) {
                    const i = dynamicstyles.getemployeekeybyid.call(this, this.state.activeemployeeid);
                    switch (type) {
                        case "check":
                            if (dynamicstyles.validateremovemanager.call(this, this.state.activeemployeeid)) {

                                if (myuser.providerid !== this.state.activeemployeeid) {


                                    myuser.company.office.employees.employee[i].manager = '';
                                    myuser.company.office.employees.employee[i].active = 'not-active';
                                    this.props.reduxUser(myuser);
                                    this.setState({ render: 'render' })


                                } else {

                                    alert(`You cannot unset youself as Manager, you won't be able to undo this `)

                                }
                            } else {
                                alert(`There needs to be atleast one manager in your company `)
                            }
                            break;
                        case "empty":
                            myuser.company.office.employees.employee[i].manager = 'manager';
                            myuser.company.office.employees.employee[i].active = 'active';
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render' })
                            break;
                        default:
                            break;
                    }

                }
            }

        } else {
            alert(`Only Managers can access this function `)
        }
    }
    showworkinghours() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this)
        const generalCheck = () => {
            if (this.state.width > 1200) {
                return ({ width: '178px', height: '88px' })
            } else if (this.state.width > 800) {
                return ({ width: '107px', height: '70px' })
            } else {
                return ({ width: '77px', height: '55px' })
            }

        }

        const getActivebox = () => {
            if (checkmanager) {

                if (this.state.activeemployeeid) {
                    let employeeid = this.state.activeemployeeid;
                    const employee = dynamicstyles.getemployeebyid.call(this, employeeid);
                    if (employee) {
                        if (employee.active === 'active') {
                            return (
                                <div style={{ ...styles.generalContainer }}> Active <button style={{ ...styles.generalButton, ...generalCheck() }} onClick={() => { this.handleactive("not-active") }}>{CheckedBox()}</button></div>)
                        } else {
                            return (<div style={{ ...styles.generalContainer }}> Active <button style={{ ...styles.generalButton, ...generalCheck() }} onClick={() => { this.handleactive("active") }}>{EmptyBox()}</button></div>)


                        }
                    }
                }

            }


        }
        const getCheckbox = () => {
            if (checkmanager) {

                if (this.state.activeemployeeid) {
                    let employeeid = this.state.activeemployeeid;
                    const employee = dynamicstyles.getemployeebyid.call(this, employeeid);
                    if (employee) {
                        if (employee.manager === 'manager') {
                            return (
                                <div style={{ ...styles.generalContainer }}> Manager <button style={{ ...styles.generalButton, ...generalCheck() }} onClick={() => { this.handlemanager("check") }}>{CheckedBox()}</button></div>)
                        } else {
                            return (<div style={{ ...styles.generalContainer }}> Manager <button style={{ ...styles.generalButton, ...generalCheck() }} onClick={() => { this.handlemanager("empty") }}>{EmptyBox()}</button></div>)
                        }

                    }
                }
            }
        }

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            {getCheckbox()}
                        </div>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                            {getActivebox()}
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            Annual Working Hours <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                value={this.getworkinghours()}
                                onChange={event => { this.handleworkinghours(event.target.value) }}
                            />
                        </div>

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
                                value={this.getbenefithour()}
                            />
                        </div>
                    </div>


                </div>
            </div>
        )

    }
    showbenefits() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
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
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
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
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
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
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this)
        let myemployees = [];
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            let employees = dynamicstyles.getmyemployees.call(this)

            if (employees) {
                // eslint-disable-next-line
                employees.map(employee => {
                    if (checkmanager || employee.providerid === myuser.providerid) {
                        myemployees.push(this.showmyemployee(employee.providerid))
                    }

                })
            }

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
        if (allusers.hasOwnProperty("length")) {
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
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const active = dynamicstyles.checkemployeeactive.call(this, myuser.providerid);
            if (active) {
                if (this.state.activeemployeeid === employeeid) {
                    this.setState({ activeemployeeid: false })
                } else {
                    this.setState({ activeemployeeid: employeeid })
                }

            } else {
                alert(`You must be active to access this function `)
            }

        }
    }
    getprofileimage() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        const profilephoto = this.getprofilephoto();
        if (myuser.profileurl) {
            return (<img src={myuser.profileurl} style={{ ...profilephoto }} alt={`${myuser.firstname} ${myuser.lastname}}`} />)
        } else {
            return;
        }
    }

    removeemployee(employee) {
        const dynamicstyles = new DynamicStyles();
        const checkmanager = dynamicstyles.checkmanager.call(this)
        const myuser = dynamicstyles.getuser.call(this);

        let myemployee = dynamicstyles.getemployeebyid.call(this, employee.providerid);

        if (checkmanager) {

            let validate = true;
            if (myemployee.manager === 'manager') {
                validate = dynamicstyles.validateremovemanager.call(this, myemployee.providerid)
            }

            if (validate) {

                if (window.confirm(`Are you sure you want to delete ${employee.firstname} ${employee.lastname} from the company?`)) {
                    if (myuser.hasOwnProperty("company")) {
                        if (myuser.company.office.hasOwnProperty("employees")) {

                            if (myemployee.hasOwnProperty("benefits")) {
                                this.setState({ message: `${employee.firstname} ${employee.lastname} has benefits to remove prior to removing from the company` })
                            } else {
                                let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid);
                                myuser.company.office.employees.employee.splice(i, 1)
                                if (myuser.company.office.employees.employee.length === 0) {
                                    delete myuser.company.office.employees.employee
                                    delete myuser.company.office.employees
                                }
                                this.setState({ activeemployeeid: false })
                            }

                        }

                    }
                }
            } else {
                alert(`There needs to be atleast one manager in the company  `)
            }

        } else {
            alert(`Only Managers can access this function `)
        }
    }
    showmyemployee(providerid) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const profilephoto = this.getprofilephoto();
        const removeIcon = this.getremoveicon();
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const checkmanager = dynamicstyles.checkmanager.call(this);
        const myuser = dynamicstyles.getuser.call(this)
        const profileimage = () => {
            if (employee.profileurl) {
                return (<img src={myuser.profileurl} style={{ ...profilephoto }} alt={`${myuser.firstname} ${myuser.lastname}}`} />)
            }
        }
        if (myuser) {
            const remove = () => {
                if (checkmanager) {
                    return (<button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeemployee(employee) }}>{removeIconSmall()} </button>)
                }
            }
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={`myemployee${employee.providerid}`} >
                        <div style={{ ...styles.flex1 }}>


                            <div style={{ ...styles.generalFlex, ...this.getactiveeemployeebackground(employee.providerid) }} key={`myemployee${employee.providerid}`}>
                                <div style={{ ...styles.flex1 }}>
                                    <div style={{ ...styles.generalContainer, ...profilephoto, ...styles.showBorder, ...styles.marginAuto }}
                                        onClick={() => { this.makeemployeeactive(employee.providerid) }}
                                    >
                                        {profileimage()}
                                    </div>
                                </div>
                                <div style={{ ...styles.flex4, ...styles.generalFont, ...regularFont }}>
                                    {employee.firstname}  {employee.lastname}
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    {remove()}
                                </div>

                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <Link style={{ ...styles.generalLink, ...regularFont }} to={`/${myuser.profile}/company/${myuser.company.companyid}/employees/${employee.profile}/schedule`}>View Schedule </Link>
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <Link style={{ ...styles.generalLink, ...regularFont }} to={`/${myuser.profile}/company/${myuser.company.companyid}/employees/${employee.profile}/actual`}>View Actual </Link>
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
                                        {this.getprofileimage()}
                                    </div>
                                </div>
                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex4, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    {employee.firstname} {employee.lastname}
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    {remove()}
                                </div>

                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                                <div style={{ ...styles.flex1 }}>
                                    <Link style={{ ...styles.generalLink, ...regularFont }} to={`/${myuser.profile}/company/${myuser.company.companyid}/employees/${employee.profile}/schedule`}>View Schedule </Link>
                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <Link style={{ ...styles.generalLink, ...regularFont }} to={`/${myuser.profile}/company/${myuser.company.companyid}/employees/${employee.profile}/actual`}>View Actual </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }

        }
    }
    showactiveemployeebenefits() {
        let employee = this.getactiveemployee();
        let benefits = [];
        if (employee) {
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
    getbenefitkeybyid(benefitid) {
        let employee = this.getactiveemployee();
        let key = false;
        if (employee) {
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.benefit.map((benefit, i) => {
                    if (benefit.benefitid === benefitid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }
    removebenefitbyid(benefit) {

        if (window.confirm(`Are you sure you want to delete benefit ${benefit.benefit}?`)) {
            const dynamicstyles = new DynamicStyles();
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const i = this.getactiveemployeekey();
                const j = this.getbenefitkeybyid(benefit.benefitid);
                myuser.company.office.employees.employee[i].benefits.benefit.splice(j, 1)
                if (myuser.company.office.employees.employee[i].benefits.benefit.length === 0) {
                    delete myuser.company.office.employees.employee[i].benefits.benefit
                    delete myuser.company.office.employees.employee[i].benefits;
                }
                this.setState({ activebenefitid: false })
            }
        }
    }
    showemployebenefit(benefit) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const removeIcon = this.getremoveicon();
        const account = this.getaccountbyid(benefit.accountid);
        const checkmanager = dynamicstyles.checkmanager.call(this);

        const remove = () => {
            if (checkmanager) {
                return (<button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removebenefitbyid(benefit) }}>{removeIconSmall()} </button>)
            }
        }

        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15, ...this.getactiveebenefitbackground(benefit.benefitid) }} onClick={() => { this.makebenefitidactive(benefit.benefitid) }}>
            {benefit.benefit}  Account:  {account.account} {account.accountname} Amount: {benefit.amount} {remove()}
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
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
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
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
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

                        {this.showactiveemployeebenefits()}

                        {this.showactivehourlyrate()}




                    </div>
                </div>)
        } else {
            return;
        }
    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (myuser) {
            const getcompanyurl = () => {
                if (myuser.hasOwnProperty("company")) {
                    return (myuser.company.url)
                }
            }
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...headerFont, ...styles.boldFont }}> /{getcompanyurl()}</span> <br />
                                <span style={{ ...headerFont, ...styles.boldFont }}> /employees</span> <br />
                            </div>
                        </div>

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
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Employees </span>
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
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Employees);