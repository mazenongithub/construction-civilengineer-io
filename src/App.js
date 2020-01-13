import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserLogin } from './components/actions/api';
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
import Equipment from './components/equipment';
import Employees from './components/employees';
import Accounts from './components/accounts';
import Construction from './components/construction';
import BidSchedule from './components/bidschedule';
import Materials from './components/materials';
import Project from './components/project'
import { Link } from 'react-router-dom';
import { returnCompanyList } from './components/functions';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { render: '', width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ position: 'open' })
    this.checkuser()
    this.updateWindowDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  async checkuser() {
    try {
      let response = await CheckUserLogin();
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
  showRouter() {
    return (

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/providers/register" component={Register} />
        <Route exact path="/providers/login" component={Login} />
        <Route exact path="/:providerid/profile" component={Profile} />
        <Route exact path="/:providerid/company" component={Company} />
        <Route exact path="/:providerid/company/:companyid/accounts" component={Accounts} />
        <Route exact path="/:providerid/company/:companyid/equipment" component={Equipment} />
        <Route exact path="/:providerid/company/:companyid/employees" component={Employees} />
        <Route exact path="/:providerid/company/:companyid/construction" component={Construction} />
        <Route exact path="/:providerid/company/:companyid/materials" component={Materials} />
        <Route exact path="/:providerid/company/:companyid/projects" component={Projects} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid" component={Project} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule" component={BidSchedule} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedulelabor" component={ScheduleLabor} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/actuallabor" component={ActualLabor} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedulematerials" component={ScheduleMaterials} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/actualmaterials" component={ActualMaterials} />
        <Route exact path="/:providerid/company/:companyid/projects/:projectid/scheduleequipment" component={ScheduleEquipment} />
      </Switch>)
  }

  showcompanylinks() {
    let myuser = this.getuser();
    const styles = MyStylesheet();
    const regularFont = this.getRegularFont();
    if (myuser) {
      if (myuser.hasOwnProperty("company")) {
        const providerid = myuser.providerid;
        const companyid = myuser.company.companyid;
        return (
          <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${providerid}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /employees
                            </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${providerid}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /accounts
                             </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${providerid}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /construction
                              </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${providerid}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /equipment
                                </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link to={`/${providerid}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
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
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>{this.handleprofilelink()}</div>
            <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.flex1, ...styles.navContainer, ...styles.thickBorder, ...styles.addBottomMargin, ...styles.alignCenter }}>{this.handlecompanylink()}
              {this.showcompanylinks()}</div>



            {this.handleshowprojectlinks()}
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
              {this.handleprojectlink()}
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
      let providerid = myuser.providerid;
      if (myproject) {
        const companyid = myuser.company.companyid
        // eslint-disable-next-line
        myproject.map(myproject => {
          let projectid = myproject.projectid;
          projectidlinks.push(
            <div style={{ ...styles.generalContainer }} key={`link${myproject.projectid}`}>
              <Link to={`/${providerid}/company/${companyid}/projects/${projectid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}> /{myproject.projectid} </Link>
            </div>)

        })

      }
    }
    return projectidlinks;
  }
  handleprojectlink() {
    let myuser = this.getuser();
    const styles = MyStylesheet();
    const headerFont = this.getHeaderFont();

    if (myuser) {
      if (myuser.hasOwnProperty("company")) {
        if (myuser.company.hasOwnProperty("projects")) {
          return (
            <div style={{ ...styles.generalContainer }}>
              <Link to={`/${myuser.providerid}/company/${myuser.company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /projects </Link>
            </div>)
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
  handlecompanylink() {
    let user = this.getuser();
    const styles = MyStylesheet();
    if (user) {
      return (
        <Link to={`/${user.providerid}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...styles.font40, ...styles.fontBold }}> /company </Link>)
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
      return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter }}>
        {this.handleprojectlink()}
        {this.projectidlinks()}
      </div>)
    } else {
      return;
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
          <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15 }}>
            {this.handlecompanylink()}
            {this.showcompanylinks()}
          </div>

          {this.handleshowprojectlinks()}


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
    let user = this.getuser();
    const styles = MyStylesheet();
    const headerFont = this.getHeaderFont()
    if (user) {
      return (<Link to={`/${user.providerid}/profile`}
        style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}
      > /{user.providerid} </Link>)
    } else {
      return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> / </Link>)
    }
  }
  handleloginlink() {

    const styles = MyStylesheet();
    const user = this.getuser();
    const headerFont = this.getHeaderFont();
    if (user) {
      return;
    } else {
      return (<Link to={`/providers/login`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /login </Link>)
    }
  }

  handleregisterlink() {
    const headerFont = this.getHeaderFont();
    const styles = MyStylesheet();
    const user = this.getuser();
    if (user) {
      return (<Link to={`/${user.providerid}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.fontBold }}> /company </Link>)
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
    projectid: state.projectid,
    allusers: state.allusers,
    allcompanys: state.allcompanys
  }
}

export default connect(mapStateToProps, actions)(App);