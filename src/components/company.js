import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { registerCompanyIcon, scrollImageDown, addIcon } from './svg';
import { Link } from 'react-router-dom';
import { LoadAllUsers, RegisterNewCompany, AddExistingCompany, ValidateCompanyID } from './actions/api';
import { returnCompanyList, CreateCompany, validateCompanyID } from './functions';
import DynamicStyles from './dynamicstyles';
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, url: '', company: '', urlcheck: true, message: '' }
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
    async loadallusers() {
        console.log("loadallusers")

        try {
            let response = await LoadAllUsers();
            console.log(response)
            if (response.hasOwnProperty("allusers")) {
                let companys = returnCompanyList(response.allusers);
                this.props.reduxAllCompanys(companys)
                this.props.reduxAllUsers(response.allusers);
            }
        } catch (err) {
            alert(err)
        }

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
        if (this.state.width > 1200) {
            return (styles.font30)
        } else if (this.state.width > 800) {
            return (styles.font24)
        } else {
            return (styles.font20)
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
    showuserid() {
        let user = this.getuser();
        if (user) {
            return (`/${user.providerid}`)
        }
    }
    async validatecompanyid(url) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let response = await ValidateCompanyID(url);
            console.log(response)
            if (response.hasOwnProperty("invalid")) {
                this.setState({ urlcheck: false, message: response.message })
            } else if (response.hasOwnProperty("valid")) {
                let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
                this.setState({ urlcheck: true, message })
            }

        }
    }
    showcompanyid() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Company URL
                             </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }}
                                    value={this.state.url}
                                    onChange={event => { this.handleurl(event.target.value) }}
                                    onBlur={event => { this.validatecompanyid(event.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>

                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Company URL <br /> <input type="text"
                        value={this.state.url}
                        onChange={event => { this.setState({ url: event.target.value }) }}
                        onBlur={event => { this.validatecompanyid(event.target.value) }}
                        style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />

                </div>
            </div>)
        }
    }
    showcompany() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Company

                    </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }}
                                    value={this.state.company}
                                    onChange={event => { this.setState({ company: event.target.value }) }}
                                />

                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Company <br /> <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }}
                        value={this.state.company}
                        onChange={event => { this.setState({ company: event.target.value }) }} />

                </div>
            </div>)
        }
    }
    showcompanysearch() {
        let companysearch = [];
        if (this.props.allcompanys) {
            if (this.props.allcompanys.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.allcompanys.map(company => {
                    companysearch.push(this.showcompanyidsearch(company))
                })
            }
        }
        return companysearch;
    }
    getAddCompany() {
        if (this.state.width > 1200) {
            return ({ width: '138px', height: '85px' })
        } else if (this.state.width > 800) {
            return ({ width: '112px', height: '64px' })
        } else {
            return ({ width: '63px', height: '37px' })
        }
    }
    showcompanyidsearch(company) {

        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const addCompany = this.getAddCompany()

        if (this.state.width > 1200) {

            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }} key={company.companyid}>
                    <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }}>
                        Company URL: {company.url} Company: {company.company}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...addCompany }}
                            onClick={() => { this.addexistingcompany(company) }}>{addIcon()}</button>
                    </div>
                </div>
            )

        } else if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }} key={company.companyid}>
                <div style={{ ...styles.flex3, ...regularFont, ...styles.generalFont }}>
                    Company URL: {company.url} Company: {company.company}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addexistingcompany(company) }}>{addIcon()}</button>
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }} key={company.companyid}>
                <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                    Company: {company.url} Company: {company.company}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addexistingcompany(company) }}>{addIcon()}</button>
                </div>
            </div>)
        }
    }
    chooseacompany() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Find Your Company

                         </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }} />

                            </div>
                        </div>

                        {this.showcompanysearch()}


                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    Find Your Company  <br />
                    <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />

                    {this.showcompanysearch()}
                </div>
            </div>)
        }
    }

    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55px',
                    height: '48px'
                })

        } else {
            return (
                {
                    width: '45px',
                    height: '34px'
                })
        }

    }
    getcompanyid() {
        let myuser = this.getuser();
        let companyid = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                companyid = myuser.company.companyid;
            }

        }
        return companyid;
    }
    showcompanymenus() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)

        const company = dynamicstyles.getcompany.call(this)
        const myuser = dynamicstyles.getuser.call(this);
        const providerid = myuser.profile;
        if (myuser) {
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1 }}>



                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, }}>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        <Link to={`/${providerid}/company/${company.url}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /equipment
                                </Link>
                                    </div>

                                </div>
                                <div style={{ ...styles.flex1, }}>

                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        <Link to={`/${providerid}/company/${company.url}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /employees
                                </Link>
                                    </div>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        <Link to={`/${providerid}/company/${company.url}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /accounts
                                </Link>
                                    </div>
                                </div>
                                <div style={{ ...styles.flex1, }}>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        <Link to={`/${providerid}/company/${company.url}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /materials
                                </Link>
                                    </div>
                                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                        <Link to={`/${providerid}/company/${company.url}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /projects
                                </Link>
                                    </div>


                                </div>
                            </div>



                        </div>
                    </div>
                )
            } else {
                return (
                    <div style={styles.generalFlex}>
                        <div style={styles.flex1}>

                       
                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${company.url}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                    /employees
                                </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${company.url}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                    /accounts
                                </Link>
                            </div>
                         
                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${company.url}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                    /equipment
                                </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${company.url}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                    /materials
                                </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${company.url}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                    /projects
                                </Link>
                            </div>

                        </div>
                    </div>)
            }

        }

    }
    async addexistingcompany(company) {

        if (window.confirm(`Are you sure you want to Add Yourself to Company ID ${company.company}?`)) {
            let myuser = this.getuser();

            if (myuser) {

                let values = { providerid: myuser.providerid, companyid: company.companyid }

                try {
                    let response = await AddExistingCompany(values)
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);

                    }
                    if (response.hasOwnProperty("myuser")) {
                        console.log(response.myuser)
                        this.props.reduxUser(response.myuser)
                    }
                    if(response.hasOwnProperty("message")) {
                        this.setState({message:response.message})
                    }


                } catch (err) {
                    alert(err)
                }

            }
        }

    }
    validatenewcompany() {
        let validate = {};
        validate.validate = true;
        validate.message = ""
        if (!this.state.urlcheck) {
            validate.validate = false;
            validate.message += this.state.message;
        }
        if (!this.state.company) {
            validate.validate = false;
            validate.message += `Company Name is required `
        }
        return validate;

    }
    handleurl(url) {
        this.setState({ url });
        let validate = validateCompanyID(url);
        if (validate) {
            this.setState({ urlcheck: false, message: validate })
        } else {
            let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
            this.setState({ message })
        }
    }

    async registernewcompany() {

        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        let validate = this.validatenewcompany();
        if (myuser) {
            if (validate.validate) {
                if (window.confirm(`Are you sure you want to register CompanyID: ${this.state.url} Company: ${this.state.company}?`)) {
                    if (myuser) {

                        let url = this.state.url;
                        let company = this.state.company;
                        let address = "";
                        let city = "";
                        let contactstate = "";
                        let zipcode = "";
                        let newCompany = CreateCompany(url, company, address, city, contactstate, zipcode)
                        newCompany.providerid = myuser.providerid;
                        try {

                            let response = await RegisterNewCompany(newCompany);
                            console.log(response)
                            if (response.hasOwnProperty("allusers")) {
                                let companys = returnCompanyList(response.allusers);
                                this.props.reduxAllCompanys(companys)
                                this.props.reduxAllUsers(response.allusers);

                            }
                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser)
                            }

                        } catch (err) {
                            alert(err)
                        }

                    }
                }
            } else {
                this.setState({ message: validate.message })
            }

        }
    }
    handleregisternewcompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const registerIcon = dynamicstyles.getRegisterIcon.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (this.state.urlcheck) {
            return (
                <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                    <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { this.registernewcompany() }}>
                        {registerCompanyIcon()}
                    </button> <br />
                    {this.state.message}
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                {this.state.message}
            </div>)
        }
    }
    showaddnewcompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        let myuser = this.getuser();
        if (myuser) {
            if (!myuser.hasOwnProperty("company")) {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont, ...headerFont }}>
                                Create A New Company
                    </div>
                        </div>

                        {this.showcompanyid()}
                        {this.showcompany()}






                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>

                                {this.handleregisternewcompany()}

                            </div>
                        </div>

                        {this.chooseacompany()}

                    </div>
                </div>)
            } else {
                return;
            }
        } else {
            return;
        }
    }

    getaddress() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.address;
        }

    }
    handleaddress(address) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.address = address;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcity() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.city;
        }

    }
    handlecity(city) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.city = city;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcontactstate() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        let contactstate = "";
        if (company) {
            contactstate = company.contactstate;
        }
        return contactstate;

    }
    handlecontactstate(contactstate) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.contactstate = contactstate;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getzipcode() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.zipcode;
        }

    }
    handlezipcode(zipcode) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.zipcode = zipcode;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmycompany() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.company;
        }

    }
    handlemycompany(company) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.company = company;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmyurl() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.url;
        }

    }
    handlemyurl(url) {
        let myuser = this.getuser()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.url = url;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    showmycompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const arrowHeight = dynamicstyles.getArrowHeight.call(this)

        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...regularFont }}>

                                    Company Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                        {scrollImageDown()}
                                    </button>

                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    Company <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getmycompany()}
                                        onChange={event => { this.handlemycompany(event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    URL <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getmyurl()}
                                        onChange={event => { this.handlemyurl(event.target.value) }} />
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    Address <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getaddress()}
                                        onChange={event => { this.handleaddress(event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    City <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getcity()}
                                        onChange={event => { this.handlecity(event.target.value) }} />
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    State <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getcontactstate()}
                                        onChange={event => { this.handlecontactstate(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    Zipcode <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getzipcode()}
                                        onChange={event => { this.handlezipcode(event.target.value) }} />
                                </div>
                            </div>

                            {this.showcompanymenus()}
                        </div>
                    </div>)
            }
        }
    }
    handlesavecompany() {
        const dynamicstyles = new DynamicStyles();
        const mycompany = dynamicstyles.getcompany.call(this);

        if (mycompany) {
            return (dynamicstyles.showsavecompany.call(this))
        }
    }
    render() {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)

        if (myuser) {
            const companyurl = () => {
                if(myuser.hasOwnProperty("company")) {
                    return(  
                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{myuser.company.url} </span>)
                }
            }
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/company </span> <br />
                                {companyurl()}
                            </div>
                        </div>

                        {this.showaddnewcompany()}

                        {this.showmycompany()}
                        {this.handlesavecompany()}
                    </div>
                </div>

            )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Company </span>
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
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Company);