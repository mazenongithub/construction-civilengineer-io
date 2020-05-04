import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserLogin, CheckUserNode, LogoutUser, LogoutUserNode } from './components/actions/api';
import * as actions from './components/actions';
import './App.css';
import { MyStylesheet } from './components/styles'
import { Icon, Logo } from './components/svg';
import Landing from './components/landing';
import Login from './components/login';
import Profile from './components/profile';
import Register from './components/register';
import Company from './components/company';
import Projects from './components/projects';
import ScheduleLabor from './components/schedulelabor';
import ActualLabor from './components/actuallabor';
import ScheduleMaterials from './components/schedulematerials';
import ActualMaterials from './components/actualmaterials';
import ScheduleEquipment from './components/scheduleequipment';
import ActualEquipment from './components/actualequipment';
import Equipment from './components/equipment';
import Employees from './components/employees';
import Accounts from './components/accounts';
import Construction from './components/construction';
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
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';
//import { TestUser } from './components/functions/testuser'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ position: 'open' })
    firebase.initializeApp(firebaseConfig());
    this.checkuser()
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
  async checkuser() {
    try {
      //let response = TestUser();

      let response = await CheckUserLogin();

      console.log(response)
      if (response.hasOwnProperty("allusers")) {
        let companys = returnCompanyList(response.allusers);
        this.props.reduxAllCompanys(companys)
        this.props.reduxAllUsers(response.allusers);

      }
      if (response.hasOwnProperty("myuser")) {
        let myuser = response.myuser;
        let payments = await CheckUserNode();
        console.log("payments", payments)
        if (payments.hasOwnProperty("myuser")) {
          myuser.payments = true;

        }
        this.props.reduxUser(myuser)

      }



    } catch (err) {
      alert(err)
    }
  }
  showRouter() {
    return (

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/providers/register" component={Register} />
        <Route exact path="/providers/login" component={Login} />
        <Route exact path="/providers/privacy_policy" component={PrivacyPolicy} />
        <Route exact path="/:providerid/profile" component={Profile} />
        <Route exact path="/:providerid/company" component={Company} />
        <Route exact path="/:providerid/company/:companyid/accounts" component={Accounts} />
        <Route exact path="/:providerid/company/:companyid/accounts/:accountid" component={ViewAccount} />
        <Route exact path="/:providerid/company/:companyid/equipment" component={Equipment} />
        <Route exact path="/:providerid/company/:companyid/employees" component={Employees} />
        <Route exact path="/:providerid/company/:companyid/construction" component={Construction} />
        <Route exact path="/:providerid/company/:companyid/materials" component={Materials} />
        <Route exact path="/:providerid/company/:companyid/projects" component={Projects} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid" component={Project} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule" component={BidSchedule} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule/csi/:csiid" component={ScheduleLineItem} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid" component={Bid} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid/csi/:csiid" component={BidLineItem} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedulelabor" component={ScheduleLabor} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/actuallabor" component={ActualLabor} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedulematerials" component={ScheduleMaterials} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/actualmaterials" component={ActualMaterials} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/scheduleequipment" component={ScheduleEquipment} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/actualequipment" component={ActualEquipment} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals" component={Proposals} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals/:proposalid" component={ViewProposal} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals/:proposalid/csi/:csiid" component={ProposalLineItem} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices" component={Invoices} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices/:invoiceid" component={ViewInvoice} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/invoices/:invoiceid/csi/:csiid" component={InvoiceLineItem} />
      </Switch>)
  }

  showcompanylinks() {
    let myuser = this.getuser();
    const styles = MyStylesheet();
    const regularFont = this.getRegularFont();
    if (myuser) {
      if (myuser.hasOwnProperty("company")) {
        const profile = myuser.profile;
        const companyid = myuser.company.url;
        return (
          <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /employees
                            </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /accounts
                             </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /construction
                              </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /equipment
                                </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${profile}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /materials
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
  handleshowcompanylinks() {
    const dynamicstyles = new DynamicStyles();
    const styles = MyStylesheet();
    let myuser = dynamicstyles.getuser.call(this)
    if (myuser) {
      return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>
        {this.handlecompanylink()}
        {this.showcompanylinks()}
      </div>)
    }

  }
  handleregisterlink_400() {
    const dynamicstyles = new DynamicStyles();
    const styles = MyStylesheet();
    let myuser = dynamicstyles.getuser.call(this)
    const headerFont = dynamicstyles.getHeaderFont.call(this);
    if (!myuser) {
      return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>
        <Link to={`/providers/register`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont, ...styles.fontBold }}>/register </Link>
      </div>)
    }

  }
  app400open() {
    const styles = MyStylesheet();

    return (<div style={{ ...styles.generalFlex }}>
      <div style={{ ...styles.flex1 }}>

        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.thickBorder, ...styles.alignCenter, ...styles.addMargin, ...styles.addBorderRadius }}>
            <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
          </div>
          <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addMargin, ...styles.addBorderRadius }}>
            {Logo()}
          </div>
        </div>

        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin, ...styles.addPadding }}>
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>
              {this.handleprofilelink()}
            </div>
            {this.handleregisterlink_400()}
            {this.handleshowcompanylinks()}
            {this.handleshowprojectlinks()}
            {this.showactiveprojectlinks()}
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>
              {this.handleloginlink()}
            </div>


          </div>
          <div style={{ ...styles.flex1 }}>

            <div style={{ ...styles.generalFlex, ...styles.regularFont }}>
              <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>{this.handleprofilelink()}</div>
            </div>

            <div style={styles.generalContainer}>
              {this.showRouter()}
            </div>






          </div>
        </div>





      </div>

    </div>)

  }
  getRegularFont() {
    const styles = MyStylesheet();
    if (this.state.width > 800) {
      return (styles.font30)
    } else {
      return (styles.font24)
    }

  }
  handle400closed_1() {
    const dynamicstyles = new DynamicStyles();
    const styles = MyStylesheet();
    const myuser = dynamicstyles.getuser.call(this);
    const headerFont = dynamicstyles.getHeaderFont.call(this);
    if (myuser) {
      return (<Link to={`/${myuser.profile}/profile`}
        style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}
      > /{myuser.profile} </Link>)
    } else {
      return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>)
    }
  }
  app400closed() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1 }}>

          <div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin }}>
              <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.alignCenter, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
            </div>
            <div style={{ ...styles.flex2, ...styles.headerBackground, ...styles.thickBorder, ...styles.addBorderRadius, ...styles.addMargin }}>
              {Logo()}
            </div>
          </div>

          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
              {this.handle400closed_1()}
            </div>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
              {this.handleregisterlink()}
            </div>
            <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
              {this.handleloginlink()}
            </div>
          </div>

          <div style={styles.generalContainer}>
            {this.showRouter()}
          </div>

        </div>
      </div>)

  }
  getprojects() {
    let myuser = this.getuser();
    let projects = false;
    if (myuser.hasOwnProperty("company")) {
      if (myuser.company.hasOwnProperty("projects")) {
        projects = myuser.company.projects.myproject;

      }
    }
    return projects;
  }
  getHeaderFont() {
    const styles = MyStylesheet();
    if (this.state.width > 800) {
      return (styles.font40)
    } else {
      return (styles.font36)
    }
  }
  projectidlinks() {
    let myproject = this.getprojects();
    const regularFont = this.getRegularFont();
    const styles = MyStylesheet();
    let projectidlinks = [];
    const myuser = this.getuser();
    if (myuser) {
      let profile = myuser.profile;
      if (myproject) {
        const companyid = myuser.company.url
        // eslint-disable-next-line
        myproject.map(myproject => {
          let projectid = myproject.title;
          projectidlinks.push(
            <div style={{ ...styles.generalContainer }} key={`link${myproject.projectid}`}>
              <Link to={`/${profile}/company/${companyid}/projects/${projectid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}> /{myproject.title} </Link>
            </div>)

        })

      }
    }
    return projectidlinks;
  }
  handleprojectlink() {
    const dynamicstyles = new DynamicStyles();
    let myuser = this.getuser();
    const styles = MyStylesheet();
    const headerFont = dynamicstyles.getHeaderFont.call(this);

    if (myuser) {
      if (myuser.hasOwnProperty("company")) {
        if (myuser.company.hasOwnProperty("projects")) {
          return (
            <div style={{ ...styles.generalContainer }}>
              <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /projects </Link>
            </div>)
        } else {
          return (<div style={{ ...styles.generalContainer }}>
            <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>
          </div>)
        }
      } else {
        return (<div style={{ ...styles.generalContainer }}>
          <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>
        </div>)
      }
    } else {
      return (<div style={{ ...styles.generalContainer }}>
        <Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>
      </div>)
    }
  }
  handlecompanylink() {
    const dynamicstyles = new DynamicStyles();
    const user = dynamicstyles.getuser.call(this)
    const styles = MyStylesheet();
    if (user) {
      return (
        <Link to={`/${user.profile}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...styles.font40, ...styles.fontBold }}> /company </Link>)
    } else {
      return;
    }
  }
  getcompanyprojects() {
    let projects = false;
    let myuser = this.getuser();
    if (myuser.hasOwnProperty("company")) {
      if (myuser.company.hasOwnProperty("projects")) {
        projects = myuser.company.projects;
      }
    }
    return projects;
  }
  handleshowprojectlinksnomenu() {
    const styles = MyStylesheet();
    let projects = this.getcompanyprojects();
    if (projects) {
      return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.alignCenter }}>
        {this.handleprojectlink()}
      </div>)
    } else {
      return;
    }
  }
  handleshowprojectlinks() {
    const styles = MyStylesheet();
    let projects = this.getcompanyprojects();
    if (projects) {
      return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15 }}>
        {this.handleprojectlink()}
        {this.projectidlinks()}
      </div>)
    } else {
      return;
    }
  }
  handlecompanylinks_1200() {
    const styles = MyStylesheet();
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    if (myuser) {
      if (myuser.hasOwnProperty("company")) {

        return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15 }}>
          {this.handlecompanylink()}
          {this.showcompanylinks()}
        </div>)

      } else {
        return;
      }
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
    if (myuser) {
      const profile = myuser.profile;
      let companyid = false;
      if (myuser.hasOwnProperty("company")) {
        companyid = myuser.company.companyid;
      }
      if (this.props.project) {
        if (this.props.project.hasOwnProperty("activeprojectid")) {
          if (this.props.project.activeprojectid) {
            let project = dynamicstyles.getprojectbytitle.call(this, this.props.project.activeprojectid);
            const projectid = project.title;

            return (
              <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }} > /{projectid} </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /bidschedule </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/proposals`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /proposals </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/schedulelabor`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /labor </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/scheduleequipment`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /equipment </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/schedulematerials`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /materials </Link>
                </div>



                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /bid </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/invoices`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /invoices </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/actuallabor`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /labor </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/actualequipment`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /equipment </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link to={`/${profile}/company/${companyid}/projects/${projectid}/actualmaterials`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.fontBold }} > /materials </Link>
                </div>
              </div>)
          }
        }
      }
    }
  }
  app1200open() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex }}>
        <div style={{ ...styles.flex1, ...styles.extraThickBorder, ...styles.addBorderRadius, ...styles.headerBackground, ...styles.openNav, ...styles.addRightMargin, ...styles.addLeftMargin }}>

          <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground, ...styles.alignCenter, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>

          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15 }}>
            {this.handleprofilelink()}
          </div>

          {this.handleregisterlink_400()}

          {this.handlecompanylinks_1200()}
          {this.handleshowprojectlinks()}
          {this.showactiveprojectlinks()}
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>
            {this.handleloginlink()}
          </div>



        </div>
        <div style={{ ...styles.flex3 }}>

          <div style={{ ...styles.generalContainer, ...styles.headerBackground, ...styles.extraThickBorder, ...styles.addBorderRadius, ...styles.addRightMargin }}>{Logo()}</div>

          <div style={{ ...styles.generalFlex, ...styles.regularFont }}>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>{this.handleprojectlink()}</div>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}>{this.handleregisterlink()}</div>
            <div style={{ ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addMargin, ...styles.alignCenter }}> {this.handleloginlink()}</div>
          </div>

          <div style={styles.generalContainer}>
            {this.showRouter()}
          </div>


        </div>
      </div>)

  }
  app1200closed() {
    const styles = MyStylesheet();
    return (
      <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
        <div style={{ ...styles.flex1 }}>

          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1 }}>



              <div style={{ ...styles.generalFlex, ...styles.generalFont }}>

                <div style={{ ...styles.flex1, ...styles.headerBackground, ...styles.iconBorder, ...styles.alignCenter, ...styles.iconBorder, ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addLeftMargin }}>
                  <button style={{ ...styles.logoIcon, ...styles.generalButton, ...styles.headerBackground }} onClick={() => { this.toogleappmenu() }}>{Icon()}</button>
                </div>

                <div style={{ ...styles.flex3, ...styles.headerBackground, ...styles.logoBorder, ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addRightMargin }}>
                  {Logo()}
                </div>
              </div>

              <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
                  {this.handleprofilelink()}
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin }}>
                  {this.handleshowprojectlinksnomenu()}
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
                  {this.handleregisterlink()}
                </div>
                <div style={{ ...styles.flex1, ...styles.thickBorder, ...styles.navContainer, ...styles.addMargin, ...styles.alignCenter }}>
                  {this.handleloginlink()}
                </div>
              </div>

              <div style={styles.generalContainer}>
                {this.showRouter()}
              </div>

            </div>
          </div>




          <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex1, ...styles.showBorder }}>
              &nbsp;
            </div>
          </div>



        </div>
      </div>
    )

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
  handleprofilelink() {
    const dynamicstyles = new DynamicStyles();
    let user = this.getuser();
    const styles = MyStylesheet();
    const headerFont = dynamicstyles.getHeaderFont.call(this)
    if (user) {
      return (<Link to={`/${user.profile}/profile`}
        style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}
      > /{user.profile} </Link>)
    } else {
      return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>)
    }
  }
  async logoutuser() {
    try {


      let response = await LogoutUser();
      console.log(response)
      let message = "";
      if (response.hasOwnProperty("message")) {
        message += `${response.message}`
        this.props.reduxUser(response)
      }
      let payments = await LogoutUserNode();
      if (payments.hasOwnProperty("message")) {
        message += `${response.message}`
      }
      this.props.reduxUser({ message })

    } catch (err) {
      alert(err)
    }

  }
  handleloginlink() {

    const dynamicstyles = new DynamicStyles();
    const styles = MyStylesheet();
    const user = dynamicstyles.getuser.call(this);
    const headerFont = dynamicstyles.getHeaderFont.call(this);
    if (user) {
      return (<div className="createlink" style={{ ...styles.generalFont, ...headerFont, ...styles.fontBold }} onClick={() => { this.logoutuser() }}>  logout </div>)
    } else {
      return (<Link to={`/providers/login`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /login </Link>)
    }
  }

  handleregisterlink() {
    const dynamicstyles = new DynamicStyles();
    const headerFont = dynamicstyles.getHeaderFont.call(this);
    const styles = MyStylesheet();
    const user = this.getuser();
    if (user) {
      return (<Link to={`/${user.profile}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /company </Link>)
    } else {
      return (<Link to={`/providers/register`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /register </Link>)
    }
  }
  toogleappmenu() {
    if (this.props.navigation) {
      if (this.props.navigation.hasOwnProperty("position")) {
        let position = this.props.navigation.position;
        if (position === 'closed') {
          this.props.reduxNavigation({ position: 'open' })
        } else if (position === "open") {
          this.props.reduxNavigation({ position: 'closed' })
        }

      }
    }
  }
  handleapp() {
    if (this.props.navigation) {
      if (this.props.navigation.position === 'closed') {
        if (this.state.width > 800) {
          return (this.app1200closed())
        } else {
          return (this.app400closed())
        }

      } else {
        if (this.state.width > 800) {
          return (this.app1200open())
        } else {
          return (this.app400open())
        }


      }
    } else {

      if (this.state.width > 800) {
        return (this.app1200open())
      } else {
        return (this.app400open())
      }


    }
  }
  render() {
    return (<BrowserRouter>
      <div className="general-container">
        {this.handleapp()}
      </div>
    </BrowserRouter>)

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

export default connect(mapStateToProps, actions)(App);