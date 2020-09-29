import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserNode, LogoutUserNode, LoadCSIs } from './components/actions/api';
import * as actions from './components/actions';
import './App.css';
import { MyStylesheet } from './components/styles'
import { cheeseburgerIcon, hamburgerIcon, Logo } from './components/svg';
import Landing from './components/landing';
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/register';
import Company from './components/company';
import Projects from './components/projects';
import Equipment from './components/equipment';
import Employees from './components/employees';
import Accounts from './components/accounts';
import BidSchedule from './components/bidschedule';
import ScheduleLineItem from './components/schedulelineitem';
import Bid from './components/bid';
import BidLineItem from './components/bidlineitem';
import Materials from './components/materials';
import Project from './components/project'
import Proposals from './components/proposals'
import ViewProposal from './components/viewproposal';
import ProposalLineItem from './components/proposallineitem'
import Invoices from './components/invoices';
import ViewInvoice from './components/viewinvoice'
import ViewAccount from './components/viewaccount'
import InvoiceLineItem from './components/invoicelineitem'
import { Link } from 'react-router-dom';
import { returnCompanyList } from './components/functions';
import DynamicStyles from './components/dynamicstyles';
import PrivacyPolicy from './components/privacypolicy';
import Estimate from './components/estimate';
import Specifications from './components/specifications';
import Specification from './components/specification';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';
import Schedule from './components/schedule';
import Actual from './components/actual';
import ViewSchedule from './components/viewschedule'
import MySchedule from './components/myschedule'
import MyActual from './components/myactual';
import Milestones from './components/milestones'
//import { TestUser } from './components/functions/testuser'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0, activeslideid: 'construction',
    profilecheck: false,
    client: '',
    clientid: '',
    firstname: '',
    lastname: '',
    emailaddress: '',
    profileurl: '',
    phonenumber: '',
    emailaddresscheck: false,
    profile: '',
    password: '',
    passwordcheck: false,
    register:true,
    login:false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    document.title ='construction.civilengineer.io'
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ position: 'open' })
    firebase.initializeApp(firebaseConfig());
    this.checkuser();
    this.loadcsis();
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getstripedashboard() {
    this.setState({ render: 'render' })
  }

  async loadcsis() {
    try {
      let response = await LoadCSIs();
      if (response.hasOwnProperty("csis")) {
        this.props.reduxCSIs(response.csis);

      }

    } catch (err) {
      alert(err)
    }
  }
  async checkuser() {
    try {
      //let response = TestUser();

      let response = await CheckUserNode();

      console.log(response)
      if (response.hasOwnProperty("allusers")) {
        let companys = returnCompanyList(response.allusers);
        this.props.reduxAllCompanys(companys)
        this.props.reduxAllUsers(response.allusers);

      }
      if (response.hasOwnProperty("myuser")) {
        let myuser = response.myuser;
        this.props.reduxUser(myuser)

      }



    } catch (err) {

      alert(err)
    }
  }
  showRouter() {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this)
    const landing = new Landing();
    const styles = MyStylesheet();
 
    
    const showlanding = () => {
      if (myuser) {
        return (<Profile/>)
      } else {
        return (landing.showlanding.call(this))
      }

    }
    return (

      <div style={{ ...styles.generalContainer }}>
        <Switch>
          <Route exact path="/" component={showlanding} />
          <Route exact path="/providers/register" component={Register} />
          <Route exact path="/providers/login" component={Login} />
          <Route exact path="/providers/privacy_policy" component={PrivacyPolicy} />
          <Route exact path="/:providerid/profile" component={Profile} />
          <Route exact path="/:providerid/viewschedule" component={ViewSchedule} />
          <Route exact path="/:providerid/company" component={Company} />
          <Route exact path="/:providerid/company/:companyid/accounts" component={Accounts} />
          <Route exact path="/:providerid/company/:companyid/accounts/:accountid" component={ViewAccount} />
          <Route exact path="/:providerid/company/:companyid/equipment" component={Equipment} />
          <Route exact path="/:providerid/company/:companyid/employees" component={Employees} />
          <Route exact path="/:providerid/company/:companyid/employees/:profile/actual" component={MyActual} />
          <Route exact path="/:providerid/company/:companyid/employees/:profile/schedule" component={MySchedule} />
          <Route exact path="/:providerid/company/:companyid/materials" component={Materials} />
          <Route exact path="/:providerid/company/:companyid/projects" component={Projects} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid" component={Project} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/milestones" component={Milestones} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedule" component={Schedule} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/actual" component={Actual} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule" component={BidSchedule} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule/csi/:csiid" component={ScheduleLineItem} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid" component={Bid} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid/csi/:csiid" component={BidLineItem} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals" component={Proposals} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/estimate" component={Estimate} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/specifications" component={Specifications} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/specifications/:csiid" component={Specification} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals/:proposalid" component={ViewProposal} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals/:proposalid/csi/:csiid" component={ProposalLineItem} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices" component={Invoices} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices/:invoiceid" component={ViewInvoice} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices/:invoiceid/csi/:csiid" component={InvoiceLineItem} />
        </Switch>
      </div>
    )
  }

  showcompanylinks() {
    const dynamicstyles = new DynamicStyles()
    let myuser = dynamicstyles.getuser.call(this)
    const styles = MyStylesheet();
    const regularFont = dynamicstyles.getRegularFont.call(this)
    if (myuser) {
      const checkmanager = dynamicstyles.checkmanager.call(this)
      if (myuser.hasOwnProperty("company")) {
        const profile = myuser.profile;
        const companyid = myuser.company.url;
        const equipment = () => {
          if (checkmanager) {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /equipment
               </Link>
            </div>)
          }

        }

        const materials = () => {
          if (checkmanager) {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /materials
               </Link>
            </div>)
          }

        }

        const accounts = () => {
          if (checkmanager) {
            return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /accounts
              </Link>
            </div>)
          }

        }



        return (
          <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /employees
              </Link>
            </div>


            {accounts()}
            {equipment()}
            {materials()}

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/employees/${profile}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /viewschedule
              </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link 
                to={`/${profile}/company/${companyid}/employees/${profile}/actual`} 
                style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /viewactual
              </Link>
            </div>
         
          </div>

          
        )
      } else {
        return;
      }
    } else {
      return;
    }
  }

  projectidlinks() {
    const dynamicstyles = new DynamicStyles()
    const regularFont = dynamicstyles.getRegularFont.call(this)
    const styles = MyStylesheet();
    let projectidlinks = [];
    const myuser = dynamicstyles.getuser.call(this)
    if (myuser) {
      let profile = myuser.profile;
      const myproject = dynamicstyles.getmyprojects.call(this)
      if (myproject) {
        const companyid = myuser.company.url
        // eslint-disable-next-line
        myproject.map(myproject => {
          let projectid = myproject.title;
          projectidlinks.push(
            <div style={{ ...styles.generalContainer }} key={`link${myproject.projectid}`} onClick={()=>{this.props.reduxProject({projectid})}}>
              <Link to={`/${profile}/company/${companyid}/projects/${projectid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}> /{myproject.title} </Link>
            </div>)

        })

      }
    }
    return projectidlinks;
  }
  handleprojectlink() {
    const dynamicstyles = new DynamicStyles();
    let myuser = dynamicstyles.getuser.call(this)
    const styles = MyStylesheet();
    const headerFont = dynamicstyles.getHeaderFont.call(this);

    if (myuser) {
      if (myuser.hasOwnProperty("company")) {
        if (myuser.company.hasOwnProperty("projects")) {
          return (
            <div style={{ ...styles.generalContainer }}>
              <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /projects </Link>
            </div>)
        } else {
          return (<div style={{ ...styles.generalContainer }}>
            <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>
          </div>)
        }
      } else {
        return (<div style={{ ...styles.generalContainer }}>
          <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>
        </div>)
      }
    } else {
      return (<div style={{ ...styles.generalContainer }}>
        <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>
      </div>)
    }
  }
  handlecompanylink() {
    const dynamicstyles = new DynamicStyles();
    const user = dynamicstyles.getuser.call(this)
    const styles = MyStylesheet();
    const headerFont = dynamicstyles.getHeaderFont.call(this)

    if (user) {
      const company = () => {
        let mycompany = "";
        if (user.hasOwnProperty("company")) {
          mycompany = user.company.url;
        } else {
          mycompany = 'company'
        }
        return mycompany;
      }
      return (
        <Link to={`/${user.profile}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{company()} </Link>)
    } else {
      return;
    }
  }


  showactiveprojectlinks() {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    const headerFont = dynamicstyles.getHeaderFont.call(this);
    const regularFont = dynamicstyles.getRegularFont.call(this);
    const styles = MyStylesheet();
    const checkmanager = dynamicstyles.checkmanager.call(this)
    const checkactive = dynamicstyles.checkactive.call(this)
    if (checkactive) {
      if (myuser) {
        const profile = myuser.profile;
        let companyid = false;
        if (myuser.hasOwnProperty("company")) {
          companyid = myuser.company.companyid;
        }
        if (this.props.project) {
          if (this.props.project.hasOwnProperty("projectid")) {
        
              let project = dynamicstyles.getprojectbyid.call(this, this.props.project.projectid);
              const projectid = project.title;

              const invoices = () => {
                if (checkmanager) {
                  return (<div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/invoices`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /invoices </Link>
                  </div>)
                }
              }

              const proposals = () => {
                if (checkmanager) {
                  return (<div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/proposals`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /proposals </Link>
                  </div>)
                }

              }

              const bid = () => {
                if (checkmanager) {
                  return (<div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /bid </Link>
                  </div>)
                }
              }

              const bidschedule = () => {
                if (checkmanager) {
                  return (<div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /bidschedule </Link>
                  </div>)
                }

              }




              return (
                <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.addMargin }}>
                  <div style={{ ...styles.generalContainer }} onClick={()=>{
                    this.props.reduxProject({projectid})
                  }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }} > /{projectid} </Link>
                  </div>

                  <div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /schedule </Link>
                  </div>
                  {proposals()}
                  {bidschedule()}

                  <div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/actual`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /actual </Link>
                  </div>
                  {invoices()}
                  {bid()}


                  <div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/estimate`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /costestimate </Link>
                  </div>
                  <div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/specifications`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /specifications </Link>
                  </div>
                  <div style={{ ...styles.generalContainer }}>
                    <Link to={`/${profile}/company/${companyid}/projects/${projectid}/milestones`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /milestones </Link>
                  </div>
                </div>)
            
          }
        }
      }
    }
  }


  async logoutuser() {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    if (myuser) {
      try {

        let response = await LogoutUserNode(myuser.providerid);
        console.log(response)
        this.props.reduxUser(response)

      } catch (err) {
        alert(err)
      }

    }


  }

  toogleappmenu() {

    if (this.props.navigation) {
      if (this.props.navigation.hasOwnProperty("position")) {
        let position = this.props.navigation.position;
        if (position === 'closed') {
          this.props.reduxNavigation({ position: 'open' })
          this.setState({ render: 'render' })
        } else if (position === "open") {
          this.props.reduxNavigation({ position: 'closed' })
          this.setState({ render: 'render' })
        }

      }
    }

  }
  render() {
    const styles = MyStylesheet();
    const dynamicstyles = new DynamicStyles();
    const position = dynamicstyles.getnavigation.call(this)
    const iconwidth = dynamicstyles.getlogoicon.call(this)
    const myuser = dynamicstyles.getuser.call(this)
    const headerFont = dynamicstyles.getHeaderFont.call(this)
    const checkactive = dynamicstyles.checkactive.call(this)
    const getflex = () => {
      if (this.state.width > 800) {
        return (styles.flex3)
      } else {
        return (styles.flex2)
      }
    }
    const getflex_1 = () => {

      if (this.state.width > 1200) {
        return ({ ...styles.flex6 })
      } else if (this.state.width > 800) {
        return ({ ...styles.flex4 })
      } else {
        return ({ ...styles.flex2 })
      }
    }

    const getflex_2 = () => {

      if (this.state.width > 800) {
        return ({ ...styles.flex1 })
      } else {
        return ({ ...styles.flex2 })
      }
    }
    const link_1 = () => {
      if (myuser) {
        return (<Link to={`/${myuser.profile}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{myuser.profile} </Link>)
      } else {
        return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>)
      }

    }
    const logoutlink = () => {
      if (myuser) {
        return (
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>
            <div className="createlink" style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }} onClick={() => { this.logoutuser() }}>  logout </div>
          </div>)
      }
    }

    const loginlink = () => {
      if (!myuser) {
        return (
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.bottomMargin15 }}>
            <Link to={`/providers/login`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /login </Link>
          </div>)
      }
    }

    const registerlink = () => {
      if (!myuser) {
        return (
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.bottomMargin15 }}>

            <Link to={`/providers/register`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/register </Link>
          </div>
        )
      }
    }
    const projectlinks = () => {
      if (checkactive) {
        if (myuser) {
          if (myuser.hasOwnProperty("company")) {
            if (myuser.company.hasOwnProperty("projects")) {
              return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.addMargin }}>
                {this.handleprojectlink()}
                {this.projectidlinks()}
              </div>)
            }
          }
        }
      }
    }
    const companylinks = () => {

      if (myuser) {
        if (myuser.hasOwnProperty("company")) {
          return (
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.bottomMargin15 }}>
              {this.handlecompanylink()}
              {this.showcompanylinks()}
            </div>)
        } else {
          return (
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.bottomMargin15 }}>
              {this.handlecompanylink()}
            </div>)
        }
      }

    }
 
    const navmenu = () => {
      if (position === 'open') {

        return (
          <div style={{ ...getflex_2(), ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin, ...styles.addPadding }}>
            
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter, ...styles.bottomMargin15 }}>
              {link_1()}
            
            </div>
            {loginlink()}
            {registerlink()}
            {companylinks()}
            {projectlinks()}
            {this.showactiveprojectlinks()}
            {logoutlink()}
          </div>
        )

      }


    }
    const extramenu = () => {
      if (myuser && this.state.width > 800 && position === 'closed') {
        return (
          <div style={{ ...styles.flex1, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>
            <div className="createlink" style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }} onClick={() => { this.logoutuser() }}>  logout </div>
          </div>)
      }
    }

    const submenulink_1 = () => {
      if (myuser) {
        return (<Link to={`/${myuser.profile}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{myuser.profile} </Link>)
      } else {
        return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>)
      }
    }

    const submenulink_2 = () => {
      if (myuser) {
        if (myuser.hasOwnProperty("company")) {
          return (<Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /projects </Link>)
        }
      } else {
        return (<Link to={`/providers/register`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/register </Link>)
      }
    }

    const submenulink_3 = () => {
      if (myuser) {
        return (<Link to={`/${myuser.profile}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /company </Link>)
      } else {
        return (<Link to={`/providers/login`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/login </Link>)
      }
    }
    const submenus = () => {
      if (position === 'closed') {

        return (<div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>
            {submenulink_1()}
          </div>
          <div style={{ ...styles.flex1, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>
            {submenulink_2()}
          </div>
          <div style={{ ...styles.flex1, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>
            {submenulink_3()}
          </div>
          {extramenu()}
        </div>)


      }
    }
    const getmainlogo = dynamicstyles.getmainlogo.call(this)

    const getIcon = () => {
      const navigation = dynamicstyles.getnavigation.call(this)
      if(navigation === 'open') {
        return(hamburgerIcon())
      } else {
        return(cheeseburgerIcon())
      }
    }

    return (
      <BrowserRouter>
        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1 }}>

            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
              <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.addMargin }}>
                <div className="createlink" style={{ ...styles.generalContainer, ...iconwidth }}>
                  <button className="createlink" style={{ ...iconwidth, ...styles.generalButton,  ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{getIcon()}</button>
                </div>
              </div>

              <div style={{ ...getflex(), ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addRightMargin }}>
                <div style={{ ...styles.generalContainer, ...getmainlogo }}>{Logo()} </div>
              </div>

            </div>


            <div style={{ ...styles.generalFlex }}>
              {navmenu()}
              <div style={{ ...getflex_1() }}>

                {submenus()}

                {this.showRouter()}



              </div>
            </div>



          </div>
        </div>
      </BrowserRouter>
    )

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

export default connect(mapStateToProps, actions)(App);