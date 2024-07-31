import React, { Component } from 'react'
import { MyStylesheet } from './styles'
import Construction from './construction'
import { scrollImageDown, goCheckIcon } from './svg';
import { validateCompanyID } from './functions';
import { connect } from 'react-redux';
import * as actions from './actions';
import Accounts from './accounts';
import Employees from './employees';
import Materials from './materials';
import { Link } from 'react-router-dom';
import Equipment from './equipment';
import ViewAccount from './viewaccount';
import ViewMaterial from './viewmaterial'
import ViewEmployee from './viewemployee';
import ViewEquipment from './viewequipment';


class ViewCompany extends Component {



    constructor(props) {
        super(props);

        const equipmentdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const equipmentdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const equipmentdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }



        this.state = {

            render: '', width: 0, height: 0, message: '', navigation: "home", activeaccountid: false, activeemployeeid: false, activecostid: '', purchasecalender: true, purchasedateday: '', purchasedatemonth: '', purchasedateyear: '', saledateday: '', saledatemonth: '', saledateyear: '', salecalender: true, equipmentcalender: true, equipmentdateday: equipmentdateday(), equipmentdateyear: equipmentdateyear(), equipmentdatemonth: equipmentdatemonth(), spinner: false

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {

        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
       
       





                    // const messages = this.state.messages;

                    // if(msg.type === "chat") {
                    // messages.push(msg)
                    // this.setState({render:'render', messages})
                    // }
                    // if (msg.type === "note") {
                    //   const item = document.createElement("li");
                    //   const text = document.createElement("i");
                    //   text.textContent = msg.text;
                    //   item.appendChild(text);
                    //   document.querySelector("#messages").appendChild(item);
                    // } else if (msg.type === "chat") {
                    //   const item = document.createElement("li");
                    //   item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
                    //   document.querySelector("#messages").appendChild(item);
                    // }


                
                console.log("I am a JS File")




             


            }

        


    



    // this.checkAllCompany();

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight, });
    }

   

    equipmentdatedefault() {
        const equipmentdatemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const equipmentdateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const equipmentdateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        this.setState({ equipmentdateyear: equipmentdateyear(), equipmentdatemonth: equipmentdatemonth(), equipmentdateday: equipmentdateday() })
    }

    async loadMyCompany() {
        const construction = new Construction();
        try {
    
          const mycompany = await construction.findMyCompany.call(this)
    
    
        } catch(err) {
          alert (`Could not fetch company ${err}`)
        }
      }


    getcompany() {
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        return mycompany;
    }
    getaddress() {


        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        if (company) {
            return company.address;
        }

    }
    handleaddress(address) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            company.address = address;
            this.props.reduxCompany(company)
            this.setState({ render: 'render' })

        }
    }
    getcity() {

        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        if (company) {
            return company.city;
        }

    }
    handlecity(city) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            company.city = city;
            this.props.reduxCompany(company)
            this.setState({ render: 'render' })

        }
    }
    getcontactstate() {

        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        let contactstate = "";
        if (company) {
            contactstate = company.contactstate;
        }
        return contactstate;

    }
    handlecontactstate(contactstate) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            company.contactstate = contactstate;
            this.props.reduxCompany(company)
            this.setState({ render: 'render' })

        }
    }
    getzipcode() {

        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        if (company) {
            return company.zipcode;
        }

    }
    handlezipcode(zipcode) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            company.zipcode = zipcode;
            this.props.reduxCompany(company)
            this.setState({ render: 'render' })

        }
    }

    getmycompany() {

        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        if (company) {
            return company.company;
        }

    }
    handlemycompany(company) {
        const construction = new Construction();
        const getcompany = construction.getcompany.call(this)
        if (getcompany) {

            getcompany.company = company;
            this.props.reduxCompany(getcompany)
            this.setState({ render: 'render' })

        }
    }

    getmycompanyid() {

        const viewcompany = new ViewCompany();
        const company = this.getcompany.call(this)
        if (company) {
            return company.companyid;
        }

    }

    handlemycompanyid(companyid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {

            company.companyid = companyid
            this.props.reduxCompany(company)
            this.setState({ render: 'render' })

        }
    }

    showmycompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const arrowHeight = construction.getArrowHeight.call(this)
        if (this.state.navigation === "home") {
            return (

                <div style={{ ...styles.generalContainer }}>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...regularFont }}>

                            Company Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}> Company </span><br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getmycompany.call(this)}
                                onChange={event => { this.handlemycompany.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}>CompanyID </span> <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getmycompanyid.call(this)}
                                onChange={event => { this.handlemycompanyid.call(this, event.target.value) }}
                            />


                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}>Address </span> <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getaddress.call(this)}
                                onChange={event => { this.handleaddress.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}> City </span> <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getcity.call(this)}
                                onChange={event => { this.handlecity.call(this, event.target.value) }} />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}> State </span> <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getcontactstate.call(this)}
                                onChange={event => { this.handlecontactstate.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            <span style={{ ...styles.regularFont, ...regularFont }}> Zipcode  </span><br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                value={this.getzipcode.call(this)}
                                onChange={event => { this.handlezipcode.call(this, event.target.value) }} />
                        </div>
                    </div>


                </div>)

        }

    }

    handlenavigation(navigation) {
        this.setState({ navigation })
    }

    handledisplay() {
        const accounts = new Accounts();
        const employees = new Employees();
        const materials = new Materials();
        const equipment = new Equipment();
        const viewaccount = new ViewAccount();
        const viewmaterial = new ViewMaterial();
        const viewemployee = new ViewEmployee();
        const viewequipment = new ViewEquipment();
        switch (this.state.navigation) {
            case "home":
                return (this.showmycompany())
            case "accounts":
                return (accounts.showAccounts.call(this))
            case "employees":
                return (employees.showEmployees.call(this))
            case "materials":
                return (materials.showMaterials.call(this))
            case "equipment":
                return (equipment.showEquipment.call(this))
            case "viewaccount":
                return (viewaccount.showViewAccount.call(this))
            case "viewmaterial":
                return (viewmaterial.showViewMaterial.call(this))
            case "viewemployee":
                return (viewemployee.showViewEmployee.call(this))
            case "viewequipment":
                return (viewequipment.showViewEquipment.call(this))

            default:
                return ("")
        }
    }

    async saveCompany() {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        const payload = JSON.stringify({ type: "company", company });
        const socket = construction.getCompanyWebSocket.call(this)
        socket.send(payload)
    }


    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)

        const goIcon = construction.getgocheckheight.call(this)
        const viewcompany = new ViewCompany()


        if (myuser) {
            const company = construction.getcompany.call(this)
            if (company) {

                const activemenu = (menu) => {
                    if (this.state.navigation === menu) {
                        return styles.activeBackground;
                    } else if (this.state.navigation === "viewemployee" && menu === "employees") {
                        return styles.activeBackground;
                    } else if (this.state.navigation === "viewaccount" && menu === "accounts") {
                        return styles.activeBackground;
                    } else if (this.state.navigation === "viewmaterial" && menu === "materials") {
                        return styles.activeBackground;
                    } else if (this.state.navigation === "viewequipment" && menu === "equipment") {
                        return styles.activeBackground;
                    }
                    else {
                        return "";
                    }
                }




                return (


                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.UserID}/company/${company.companyid}/`}
                            > /{company.companyid}</Link>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter, ...activemenu("home") }} onClick={() => { this.handlenavigation("home") }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Info</span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter, ...activemenu("accounts") }} onClick={() => { this.handlenavigation("accounts") }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Accounts</span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter, ...activemenu("employees") }} onClick={() => { this.handlenavigation("employees") }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Employees</span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter, ...activemenu("materials") }} onClick={() => { this.handlenavigation("materials") }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Materials</span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter, ...activemenu("equipment") }} onClick={() => { this.handlenavigation("equipment") }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Equipment</span>
                            </div>
                        </div>

                        {this.handledisplay()}

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} onClick={() => { this.saveCompany() }}>
                            <button style={{ ...regularFont, ...styles.generalFont, ...styles.addPadding15 }}>Save Company</button>
                        </div>




                        {construction.showsavecompany.call(this)}

                    </div>


                )



            } else {

                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Company Not Found </span>
                </div>)

            }
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
        allcompanys: state.allcompanys,
        mycompany: state.mycompany,
        allusers: state.allusers,
        allprojects:state.allprojects,
        websockets:state.websockets
    }
}

export default connect(mapStateToProps, actions)(ViewCompany);
