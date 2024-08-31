import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CheckUserNode, LogoutUserNode, LoadCSIs, LoadAllUsers } from './components/actions/api';
import * as actions from './components/actions';
import { Link } from 'react-router-dom';
import { firebaseConfig } from './firebaseconfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import { updateTimes } from './components/functions';
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
import Materials from './components/materials';
import Project from './components/project';
import ViewAccount from './components/viewaccount';
import Schedule from './components/schedule';
import Actual from './components/actual';
import Header from './components/header';
import ViewEquipment from './components/viewequipment';
import ViewEmployee from './components/viewemployee'
import ViewMaterial from './components/viewmaterial'
import { MyStylesheet } from './components/styles'
import './App.css';
import ViewCompany from './components/viewcompany';
import Bid from './components/bid'
import BidSchedule from './components/bidschedule'
import BidLineItem from './components/bidlineitem'
import BidScheduleLineItem from './components/schedulelineitem'
import Construction from './components/construction'
import Proposals from './components/proposals'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      render: '', width: 0, height: 0, activeslideid: 'project',
      profilecheck: false,
      client: '',
      clientid: '',
      firstname: '',
      lastname: '',
      emailaddress: '',
      profileurl: '',
      phonenumber: '',
      profile: '',
      company: '',
      urlcheck: false,
      spinner: false,
      activeaccountid: false,
      activematerialid: false,
      activeequipmentid: false,
      activeemployeeid: false,
      register: false,
      apple: '',
      google: ''
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    document.title = 'construction.civilengineer.io'
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.reduxNavigation({ position: 'open' })
    firebase.initializeApp(firebaseConfig());
    this.checkuser();
    this.loadMyCompany();
    
    this.loadAllUsers();
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

  async loadMyCompany() {
    const construction = new Construction();
    try {


      await construction.findMyCompany.call(this)
      const mycompany = construction.getcompany.call(this)

      if (mycompany) {

        const companyid = mycompany._id;

        const socket = new WebSocket(`ws://localhost:8081/company/${companyid}/websocketapi`)

        socket.onopen = (evt) => {
          let myuser = construction.getuser.call(this)
          console.log("WEB SOCKET OPENED!!!");
          const userid = myuser.UserID;
          const data = { type: "join", userid };
          socket.send(JSON.stringify(data));
        }


        socket.onmessage = (evt) => {

          const response = JSON.parse(evt.data);
          console.log(response)

          if (response.type === "join") {
            console.log(response.text)
          } else if
            (response.type === "company") {
           
            const updatecompany = response.response;
            construction.handleCompanyResponse.call(this, updatecompany)
          }

        }

        socket.onerror = (evt) => {
          console.log("SOMETHING WENT WRONG!");
          console.log(evt);
        };

        socket.onclose = (evt) => {
          console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
        };


        let websockets =  {};
        websockets.company = socket
        this.props.reduxWebSockets(websockets)

        this.setState({ render: 'render' })

      }

      } catch (err) {
        alert(`Could not fetch company ${err}`)
      }

    

  }



  async loadAllUsers() {
    try {


      const allusers = await LoadAllUsers();
      if(allusers.hasOwnProperty("allusers")) {
        this.props.reduxAllUsers(allusers.allusers)
      }
     

    } catch (err) {
      alert(err)
    }

  }

  async checkuser() {
    try {
      //let response = TestUser();

      let response = CheckUserNode();
      response = await response;

      console.log("checkuser", response)

      if (response.hasOwnProperty("myuser")) {
        this.props.reduxUser(response.myuser)
      }




    } catch (err) {

      alert(err)
    }
  }
  showRouter() {
    const construction = new Construction();
    const myuser = construction.getuser.call(this)
    const landing = new Landing();
    const styles = MyStylesheet();
    const projects = new Projects();
    const register = new Register()
    const login = new Login()
    const profile = new Profile()
    const accounts = new Accounts();
    const equipment = new Equipment()
    const employees = new Employees();
    const materials = new Materials();
    const showlanding = () => {
      if (myuser) {
        return (profile.showProfile.call(this))
      } else {
        return (landing.showlanding.call(this))
      }

    }

    const showprojects = () => {
      return (projects.showprojects.call(this))
    }

    const showregister = () => {
      return (register.showRegister.call(this))
    }

    const showlogin = () => {
      return (login.showLogin.call(this))
    }

    // const showcompany = () => {
    //   return (company.showCompany.call(this))
    // }

    const showprofile = () => {
      return (profile.showProfile.call(this))
    }

    const showaccounts = () => {
      return (accounts.showAccounts.call(this))
    }

    const showequipment = () => {
      return (equipment.showEquipment.call(this))
    }

    const showemployees = () => {
      return (employees.showEmployees.call(this))
    }

    const showmaterials = () => {
      return (materials.showMaterials.call(this))

    }

    return (

      <div style={{ ...styles.generalContainer }}>
        <Switch>
          <Route exact path="/" render={showlanding} />
          <Route exact path="/providers/register" render={showregister} />
          <Route exact path="/providers/login" render={showlogin} />
          <Route exact path="/company/:companyid" component={Company} />
          <Route exact path="/:providerid/profile" render={showprofile} />
          <Route exact path="/:providerid/company" component={Company} />
          <Route exact path="/:providerid/company/:companyid" component={ViewCompany} />
          <Route exact path="/:providerid/company/:companyid/accounts" render={showaccounts} />
          <Route exact path="/:providerid/company/:companyid/accounts/:accountid" component={ViewAccount} />
          <Route exact path="/:providerid/company/:companyid/equipment" render={showequipment} />
          <Route exact path="/:providerid/company/:companyid/equipment/:equipmentid" component={ViewEquipment} />
          <Route exact path="/:providerid/company/:companyid/employees" render={showemployees} />
          <Route exact path="/:providerid/company/:companyid/employees/:employeeid" component={ViewEmployee} />
          <Route exact path="/:providerid/company/:companyid/materials" render={showmaterials} />
          <Route exact path="/:providerid/company/:companyid/materials/:materialid" component={ViewMaterial} />
          <Route exact path="/:providerid/company/:companyid/projects" render={showprojects} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid" component={Project} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/schedule" component={Schedule} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/actual" component={Actual} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/proposals" component={Proposals} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule" component={BidSchedule} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bidschedule/:csiid" component={BidScheduleLineItem} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid" component={Bid} />
          <Route exact path="/:providerid/company/:companyid/projects/:projectid/bid/:csiid" component={BidLineItem} />
        </Switch>
      </div>
    )
  }

  showcompanylinks() {
    const construction = new Construction()
    let myuser = construction.getuser.call(this)
    const styles = MyStylesheet();
    const regularFont = construction.getRegularFont.call(this)
    if (myuser) {

      const company = construction.getcompany.call(this)
      if (company) {

        const profile = myuser.UserID;
        const companyid = company.companyid;




        return (
          <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link onClick={() => { this.handlenavigation({ companyid, active: 'employees' }) }}
                to={`/${profile}/company/${companyid}`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /employees
              </Link>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link onClick={() => { this.handlenavigation({ companyid, active: 'accounts' }) }}
                to={`/${profile}/company/${companyid}`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /accounts
              </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link onClick={() => { this.handlenavigation({ companyid, active: 'equipment' }) }}
                to={`/${profile}/company/${companyid}`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                /equipment
              </Link>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
              <Link onClick={() => { this.handlenavigation({ companyid, active: 'materials' }) }}
                to={`/${profile}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
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

  handlenavigation(obj) {

    const construction = new Construction();
    const navigation = construction.getNavigation.call(this)
    if (obj.hasOwnProperty("projectid")) {
      navigation.project = {}
      navigation.project.projectid = obj.projectid;
      if (obj.hasOwnProperty("active")) {
        navigation.project.active = obj.active;
      }
    }

    else if (obj.hasOwnProperty("companyid")) {

      if (navigation.hasOwnProperty("project")) {
        delete navigation.project;

      }
      navigation.company = {}
      navigation.company.companyid = obj.companyid;

      if (obj.hasOwnProperty("active")) {
        navigation.company.active = obj.active
      }


    }

    this.props.reduxNavigation(navigation)
    this.setState({ render: 'render' })
  }

  projectidlinks() {
    const construction = new Construction()
    const regularFont = construction.getRegularFont.call(this)
    const styles = MyStylesheet();
    let projectidlinks = [];
    const myuser = construction.getuser.call(this)
    if (myuser) {
      const company = construction.getcompany.call(this)
      if (company) {

        const allprojects = construction.getAllProjects.call(this)
        if (allprojects) {
    
          const companyid = company.companyid
          // eslint-disable-next-line
          allprojects.map(myproject => {
            let projectid = myproject.ProjectID;
            projectidlinks.push(
              <div style={{ ...styles.generalContainer }} key={`link${myproject.projectid}`}>
                <Link  to={`/${myuser.UserID}/company/${companyid}/projects/${myproject.ProjectID
                }`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}> /{myproject.ProjectID} </Link>
              </div>)

          })


        }


      }


    }
    return projectidlinks;
  }
  handleprojectlink() {
    const construction = new Construction();
    let myuser = construction.getuser.call(this)
    const styles = MyStylesheet();
    const headerFont = construction.getHeaderFont.call(this);

    if (myuser) {
      const company = construction.getcompany.call(this)
      if (company) {

        const allprojects = construction.getAllProjects.call(this)
        if (allprojects) {
          return (
            <div style={{ ...styles.generalContainer }}>
              <Link to={`/${myuser.UserID}/company/${company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /projects </Link>
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
    const construction = new Construction();


    const styles = MyStylesheet();
    const headerFont = construction.getHeaderFont.call(this)
    const user = construction.getuser.call(this)

    if (user) {
      const company = construction.getcompany.call(this)

      if (company) {
        return (<Link onClick={() => { this.handlenavigation({ companyid: company.companyid }) }}
          to={`/${user.UserID}/company/${company.companyid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{company.companyid} </Link>)
      } else {
        return (<Link
          to={`/${user.UserID}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /company </Link>)
      }

    }



  }


  showactiveprojectlinks() {
    const construction = new Construction();
    const myuser = construction.getuser.call(this);
    const headerFont = construction.getHeaderFont.call(this);
    const regularFont = construction.getRegularFont.call(this);
    const styles = MyStylesheet();
    const navigation = construction.getNavigation.call(this)


    if (myuser) {

      const company = construction.getcompany.call(this)

      if (company) {

        if (navigation.hasOwnProperty("project")) {

          const project = construction.getprojectbyid.call(this, navigation.project.projectid)

          if (project) {

            return (
              <div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.addMargin }}>
                <div style={{ ...styles.generalContainer }}>
                  <Link
                    to={`/${myuser.UserID}/company/${company.companyid}/projects/${project.title}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }} > /{project.title} </Link>
                </div>

                <div style={{ ...styles.generalContainer }}>
                  <Link


                    to={`/${myuser.UserID}/company/${company.companyid}/projects/${project.title}/schedule`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /schedule </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link

                    to={`/${myuser.UserID}/company/${company.companyid}/projects/${project.title}/bidschedule`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /bidschedule </Link>
                </div>


                <div style={{ ...styles.generalContainer }}>
                  <Link
                    onClick={() => { this.handlenavigation({ projectid: project.projectid, active: 'actual' }) }}
                    to={`/${myuser.UserID}/company/${company.companyid}/projects/${project.title}/actual`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /actual </Link>
                </div>
                <div style={{ ...styles.generalContainer }}>
                  <Link
                    to={`/${myuser.UserID}/company/${company.companyid}/projects/${project.title}/bid`} style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }} > /bid </Link>
                </div>



              </div>)


          }

        }

      }

    }


  }


  async logoutuser() {
    const construction = new Construction();
    const myuser = construction.getuser.call(this);
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
    const construction = new Construction();
    const navigation = construction.getNavigation.call(this)
    let position = 'closed'
    if (navigation) {
      if (navigation.hasOwnProperty("position")) {
        position = navigation.position;
      }
    }
    const iconwidth = () => {
      if (this.state.width > 1200) {

        return ({ width: '100px', height: 'auto' })
      } else if (this.state.width > 800) {

        return ({ width: '91px', height: 'auto' })

      } else {

        return ({ width: '82px', height: 'auto' })

      }
    }
    const myuser = construction.getuser.call(this)
    const company = construction.getcompany.call(this)
    const headerFont = construction.getHeaderFont.call(this)


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
        return (<Link to={`/${myuser.UserID}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{myuser.UserID} </Link>)
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
    const allprojects = construction.getAllProjects.call(this)
    const projectlinks = () => {


      if (allprojects) {
        return (<div style={{ ...styles.generalContainer, ...styles.width90, ...styles.navContainer, ...styles.thickBorder, ...styles.alignCenter, ...styles.bottomMargin15, ...styles.addMargin }}>
          {this.handleprojectlink()}
          {this.projectidlinks()}
        </div>)
      }



    }
    const companylinks = () => {

      if (company) {
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
        return (<Link to={`/${myuser.UserID}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /{myuser.UserID} </Link>)
      } else {
        return (<Link to={`/`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> / </Link>)
      }
    }

    const submenulink_2 = () => {
      if (myuser) {
        if (myuser.hasOwnProperty("company")) {
          return (<Link to={`/${myuser.UserID}/company/${company.companyid}/projects`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /projects </Link>)
        }
      } else {
        return (<Link to={`/providers/register`} style={{ ...styles.generalLink, ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/register </Link>)
      }
    }

    const submenulink_3 = () => {
      if (myuser) {
        return (<Link to={`/${myuser.UserID}/company`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> /company </Link>)
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
    const getmainlogo = () => {
      if (this.state.width > 1200) {

        return ({ width: '449px', height: '71px' })
      } else if (this.state.width > 800) {
        return ({ width: '376px', height: '59px' })
      } else {

        return ({ width: '302px', height: '48px' })

      }

    }

    const getIcon = () => {
      let position = 'open'
      const navigation = construction.getNavigation.call(this)
      if (navigation) {
        if (navigation.hasOwnProperty("position")) {
          position = navigation.positon;
        }
      }
      if (position === 'open') {
        return (hamburgerIcon())
      } else {
        return (cheeseburgerIcon())
      }
    }
    const header = new Header();


    return (
      <BrowserRouter>
        <div style={{ ...styles.generalFlex }}>
          <div style={{ ...styles.flex1 }}>

            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
              <div style={{ ...styles.flex1, ...styles.alignCenter, ...styles.addMargin }}>
                <div className="createlink" style={{ ...styles.generalContainer, ...iconwidth() }}>
                  <button className="createlink" style={{ ...iconwidth(), ...styles.generalButton, ...styles.addBorderRadius }} onClick={() => { this.toogleappmenu() }}>{getIcon()}</button>
                </div>
              </div>

              <div style={{ ...getflex(), ...styles.addMarginTop, ...styles.addBottomMargin, ...styles.addRightMargin }}>
                <div style={{ ...styles.generalContainer, ...getmainlogo() }}>{Logo()} </div>
              </div>

            </div>


            <div style={{ ...styles.generalFlex }}>
              {navmenu()}
              <div style={{ ...getflex_1() }}>

                {submenus()}
                {header.showHeader.call(this)}

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
    csis: state.csis,
    mycompany: state.mycompany,
    allusers: state.allusers,
    allprojects: state.allprojects,
    websockets: state.websockets
  }
}

export default connect(mapStateToProps, actions)(App);