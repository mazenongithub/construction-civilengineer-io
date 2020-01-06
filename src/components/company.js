import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { registerCompanyIcon, scrollImageDown, addIcon } from './svg';
import { Link } from 'react-router-dom';
import { LoadAllUsers, RegisterNewCompany, AddExistingCompany } from './actions/api';
import { returnCompanyList, CreateCompany } from './functions';
class Company extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, companyid: '', company: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

        if (!this.props.allusers.hasOwnProperty("myuser")) {
            this.loadallusers();
        }



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
    showcompanyid() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Company ID
                    </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }}
                                    value={this.state.companyid}
                                    onChange={event => { this.setState({ companyid: event.target.value }) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>

                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Company ID <br /> <input type="text"
                        value={this.state.companyid}
                        onChange={event => { this.setState({ companyid: event.target.value }) }}
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
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }}>
                        CompanyID: {company.companyid} Company: {company.company} Manager: {company.manager}
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...addCompany }}
                            onClick={() => { this.addexistingcompany(company.companyid) }}>{addIcon()}</button>
                    </div>
                </div>
            )

        } else if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                <div style={{ ...styles.flex3, ...regularFont, ...styles.generalFont }}>
                    CompanyID: {company.companyid} Company: {company.company} Manager: {company.manager}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addexistingcompany(company.companyid) }}>{addIcon()}</button>
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                    CompanyID: {company.companyid} Company: {company.company} Manager: {company.manager}
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addexistingcompany(company.companyid) }}>{addIcon()}</button>
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
    getRegisterIcon() {
        if (this.state.width > 1200) {
            return ({
                width: '404px',
                height: '68px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '264px',
                height: '53px'
            })
        } else {
            return ({
                width: '162px',
                height: '42px'
            })
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
        const styles = MyStylesheet();
        const headerFont = this.getHeaderFont();
        const regularFont = this.getRegularFont();
        const providerid = this.props.match.params.providerid;
        const companyid = this.getcompanyid();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${companyid}`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    {providerid}/company/{companyid}
                                </Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /equipment
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /construction
                                </Link>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/office`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /office
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /employees
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /accounts
                                </Link>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /materials
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
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
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                {providerid}/company/{companyid}
                            </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/office`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /office
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /employees
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /accounts
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /construction
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /equipment
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /materials
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont, ...styles.alignCenter }}>
                                /projects
                                </Link>
                        </div>

                    </div>
                </div>)
        }

    }
    async addexistingcompany(companyid) {
        if (window.confirm(`Are you sure you want to Add Yourself to Company ID ${companyid}?`)) {
            let myuser = this.getuser();

            if (myuser) {

                let values = { providerid: myuser.providerid, companyid }

                try {
                    let response = await AddExistingCompany(values)
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                        delete response.allusers;
                    }

                    if (response.hasOwnProperty("providerid")) {
                        this.props.reduxUser(response)
                    }

                } catch (err) {
                    alert(err)
                }

            }
        }

    }
    async registernewcompany() {
        let myuser = this.getuser();
        if (window.confirm(`Are you sure you want to register CompanyID: ${this.state.companyid} Company: ${this.state.company}?`)) {
            if (myuser) {
                let companyid = this.state.companyid;
                let company = this.state.company;
                let manager = myuser.providerid;
                let address = "";
                let city = "";
                let contactstate = "";
                let zipcode = "";
                let newCompany = CreateCompany(companyid, company, manager, address, city, contactstate, zipcode)

                try {

                    let response = await RegisterNewCompany(newCompany);
                    console.log(response)
                    if (response.hasOwnProperty("allusers")) {
                        let companys = returnCompanyList(response.allusers);
                        this.props.reduxAllCompanys(companys)
                        this.props.reduxAllUsers(response.allusers);
                        delete response.allusers;

                    }
                    if (response.hasOwnProperty("providerid")) {
                        this.props.reduxUser(response)
                    }
                } catch (err) {
                    alert(err)
                }

            }
        }
    }
    showaddnewcompany() {
        const styles = MyStylesheet();
        const registerIcon = this.getRegisterIcon();
        const headerFont = this.getHeaderFont();
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

                                <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { this.registernewcompany() }}>
                                    {registerCompanyIcon()}
                                </button>

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
    getmycompany() {
        let myuser = this.getuser();
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }
        return company;
    }
    getaddress() {
        let company = this.getmycompany();
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
        let company = this.getmycompany();
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
        let company = this.getmycompany();
        if (company) {
            return company.contactstate;
        }

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
        let company = this.getmycompany();
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
    showmycompany() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const myuser = this.getuser();
        const arrowHeight = this.getArrowHeight();
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
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont, ...titleFont, ...styles.fontBold }}>
                            /company
                        </div>
                    </div>

                    {this.showaddnewcompany()}



                    {this.showmycompany()}
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

export default connect(mapStateToProps, actions)(Company);