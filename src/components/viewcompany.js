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
        const construction = new Construction();

        const myuser = construction.getuser.call(this)

        if (myuser) {

            const mycompany = construction.getcompany.call(this)

            if (mycompany) {

                const socket = new WebSocket(`ws://localhost:8081/company/${mycompany.companyid}/websocketapi`);
                this.setState({ socket })



                // const mycompany = construction.getcompany.call(this)
                // console.log(mycompany)
                // if (!mycompany) {
                //     construction.findMyCompany.call(this);
                // }





                socket.onmessage = (evt) => {

                    const response = JSON.parse(evt.data);
                    console.log(response)

                    if (response.type === "company") {

                        const company = construction.getcompany.call(this)
                        const updatecompany = response.response;
                        const accounts = updatecompany.accounts;
                        const myuser = construction.getuser.call(this)
                        const name = response.name;

                        if (updatecompany.hasOwnProperty("company")) {
                            company.companyid = updatecompany.company.companyid;
                            company.company = updatecompany.company.company;
                            company.address = updatecompany.company.address;
                            company.city = updatecompany.company.city;
                            company.contactstate = updatecompany.company.contactstate;
                            company.zipcode = updatecompany.company.zipcode;
                        }

                        if (accounts.insert.length > 0 || accounts.update.length > 0) {
                            const newaccounts = accounts.insert.concat(accounts.update)
                            for (let newaccount of newaccounts) {

                                const newaccountid = newaccount.accountid
                                const getaccount = construction.getaccountbyid.call(this, newaccountid)
                                if (getaccount) {
                                    let i = construction.getaccountkeybyid.call(this, newaccountid)
                                    company.accounts[i] = newaccount;
                                } else {
                                    company.accounts.push(newaccount)
                                }

                            }

                        } // insert/update accounts

                        if (accounts.delete.length > 0) {
                            for (let deleteaccount of accounts.delete) {
                                const deleteaccountid = deleteaccount.accountid;
                                const getdeleteaccount = construction.getaccountbyid.call(this, deleteaccountid)
                                if (getdeleteaccount) {
                                    let i = construction.getaccountkeybyid.call(this, deleteaccountid)
                                    company.accounts.splice(i, 1)
                                }

                            }
                        } // delete accounts


                        const newemployees = updatecompany.employees;
                        if (newemployees.insert.length > 0 || newemployees.update.length > 0) {
                            const getnewemployees = newemployees.insert.concat(newemployees.update)

                            for (let newemployee of getnewemployees) {

                                let user_id = newemployee.user_id;
                                const getemployee = construction.getemployeebyuserid.call(this, user_id)
                                if (getemployee) {
                                    let i = construction.getemployeekeybyuserid.call(this, user_id)
                                    company.employees[i].title = newemployee.title;
                                    company.employees[i].workinghours = newemployee.workinghours;

                                } else {
                                    company.employees.push(newemployee)
                                }


                            }

                        } // end of insert/update employees


                        if (newemployees.delete.length > 0) {

                            for (let deleteemployee of newemployees.delete) {
                                let user_id = deleteemployee.user_id;
                                const getdeleteemployee = construction.getemployeebyuserid.call(this, user_id)
                                if (getdeleteemployee) {
                                    let i = construction.getemployeekeybyuserid.call(this, user_id)
                                    company.employees.splice(i, 1)
                                }
                            }


                        } // end of delete employees


                        const newmaterials = updatecompany.materials;

                        if (newmaterials.insert.length > 0 || newmaterials.update.length > 0) {
                            const getnewmaterials = newmaterials.insert.concat(newmaterials.update)
                            for (let newmaterial of getnewmaterials) {
                                const newmaterialid = newmaterial.materialid;
                                const getnewmaterial = construction.getmymaterialfromid.call(this, newmaterialid)
                                if (getnewmaterial) {
                                    let i = construction.getmaterialkeybyid.call(this, newmaterialid)
                                    company.materials[i] = newmaterial
                                } else {
                                    company.materials.push(newmaterial)
                                }
                            }


                        } // end of insert/update material

                        if (newmaterials.delete.length > 0) {
                            for (let deletematerial of newmaterials.delete) {
                                const deletematerialid = deletematerial.materialid;
                                const getdeletematerial = construction.getmymaterialfromid.call(this, deletematerialid)
                                if (getdeletematerial) {
                                    let i = construction.getmaterialkeybyid.call(this, deletematerialid)
                                    company.materials.splice(i, 1)
                                }
                            }
                        } // end of delete material


                        const newequipment = updatecompany.equipment;

                        if (newequipment.insert.length > 0 || newequipment.update.length > 0) {
                            const newequipments = newequipment.insert.concat(newequipment.update)

                            for (let getnewequipment of newequipments) {

                                const equipmentid = getnewequipment.equipmentid;

                                const findnewequipment = construction.getmyequipmentbyid.call(this, equipmentid)
                                if (findnewequipment) {

                                    let i = construction.getequipmentkeybyid.call(this, equipmentid);
                                    company.equipment[i].equipment = getnewequipment.equipment;
                                    company.equipment[i].accountid = getnewequipment.accountid;
                                    if (getnewequipment.hasOwnProperty("ownership")) {


                                        company.equipment[i].ownership.workinghours = getnewequipment.ownership.workinghours;
                                        company.equipment[i].ownership.purchase = getnewequipment.ownership.purchase;
                                        company.equipment[i].ownership.resalevalue = getnewequipment.ownership.resalevalue;
                                        company.equipment[i].ownership.saledate = getnewequipment.ownership.saledate;
                                        company.equipment[i].ownership.purchasedate = getnewequipment.ownership.purchasedate;
                                        company.equipment[i].ownership.loaninterest = getnewequipment.ownership.loaninterest;


                                    } else if (getnewequipment.hasOwnProperty("rented")) {

                                        company.equipment[i].rented.monthly = getnewequipment.rented.monthly;
                                        company.equipment[i].rented.weekly = getnewequipment.rented.weekly;
                                        company.equipment[i].rented.hourly = getnewequipment.rented.hourly;
                                        company.equipment[i].rented.daily = getnewequipment.rented.daily;




                                    }



                                } else {

                                    company.equipment.push(getnewequipment)

                                }



                            }



                        } // end of insert/update equipment


                        if (newequipment.delete.length > 0) {

                            for (let deleteequipment of newequipment.delete) {

                                let deleteequipmentid = deleteequipment.equipmentid;
                                const getdeleteequipment = construction.getmyequipmentbyid.call(this, deleteequipmentid)
                                if (getdeleteequipment) {

                                    let i = construction.getequipmentkeybyid.call(this, deleteequipmentid)
                                    company.equipment.splice(i, 1)


                                }


                            }



                        }

                        const newcosts = updatecompany.equipment.cost;

                        if (newcosts.insert.length > 0 || newcosts.update.length > 0) {
                            const getnewcosts = newcosts.insert.concat(newcosts.update)

                            for (let newcost of getnewcosts) {

                                const newequipmentid = newcost.equipmentid;
                                const newcostid = newcost.costid;


                                let fetchequipment = construction.getmyequipmentbyid.call(this, newequipmentid)

                                if (fetchequipment) {



                                    let i = construction.getequipmentkeybyid.call(this, newequipmentid)
                                    const getcost = construction.getcostbyid.call(this, newequipmentid, newcostid)
                                    if (getcost) {

                                        let j = construction.getequipmentcostskeybyid.call(this, newequipmentid, newcostid)

                                        company.equipment[i].ownership.cost[j].timein = newcost.timein;
                                        company.equipment[i].ownership.cost[j].cost = newcost.cost;
                                        company.equipment[i].ownership.cost[j].detail = newcost.detail;
                                        if (newcost.hasOwnProperty("reoccurring")) {
                                            company.equipment[i].ownership.cost[j].reoccurring = { frequency: newcost.reoccurring.frequency }
                                        }

                                    } else {

                                        company.equipment[i].ownership.cost.push(newcost)
                                    }


                                }





                            }
                        } // end of insert update cost


                        if (newcosts.delete.length > 0) {
                            for (let deleteequipment of newcosts.delete) {

                                let deletecostid = deleteequipment.costid;
                                let deleteequipmentid = deleteequipment.equipmentid;

                                const deletecost = construction.getcostbyid.call(this, deleteequipmentid, deletecostid)

                                if (deletecost) {
                                    let i = construction.getequipmentkeybyid.call(this, deleteequipmentid);
                                    let j = construction.getequipmentcostskeybyid.call(this, deletecostid)

                                    company.equipment[i].ownership.cost.splice(j, 1)
                                }



                            }
                        }

                        if (updatecompany.employees.benefits.update.length > 0 || updatecompany.employees.benefits.insert.length > 0) {

                            let newbenefits = updatecompany.employees.benefits.update.concat(updatecompany.employees.benefits.insert)

                            for (let newbenefit of newbenefits) {

                                let employeeid = newbenefit.user_id;
                                let getbenefit = newbenefit.benefit;
                                let benefitid = newbenefit.benefitid;
                                let accountid = newbenefit.accountid;
                                let amount = newbenefit.amount;
                                let frequency = newbenefit.frequency;

                                let findemployee = construction.getemployeebyuserid.call(this, employeeid)

                                if (findemployee) {
                                    let i = construction.getemployeekeybyuserid.call(this, employeeid)

                                    let findbenefit = construction.getBenefitsByID.call(this, employeeid, benefitid)

                                    if (findbenefit) {
                                        let j = construction.getBenefitKeyByID.call(this, employeeid, benefitid)
                                        company.employees[i].benefits[j].benefit = getbenefit;
                                        company.employees[i].benefits[j].amount = amount;
                                        company.employees[i].benefits[j].frequency = frequency;
                                        company.employees[i].benefits[j].accountid = accountid;


                                    } else {
                                        company.employees[i].benefits.push({ benefitid, benefit: getbenefit, frequency, amount, accountid })
                                    }


                                }





                            }


                        } // end of insert/update benefit


                        if (updatecompany.employees.benefits.delete.length > 0) {
                            for (let deletebenefit of updatecompany.employees.benefits.delete) {
                                let employeeid = deletebenefit.user_id;
                                let benefitid = deletebenefit.benefitid;

                                let findemployee = construction.getemployeebyuserid.call(this, employeeid)
                                if (findemployee) {
                                    let i = construction.getemployeekeybyuserid.call(this, employeeid)
                                    let getdeletebenefit = construction.getBenefitsByID.call(this, employeeid, benefitid)
                                    if (getdeletebenefit) {
                                        let j = construction.getBenefitKeyByID.call(this, employeeid, benefitid)
                                        company.employees[i].benefits.splice(j, 1)
                                    }

                                }

                            }
                        }








                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })


                    }





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


                };
                console.log("I am a JS File")



                socket.onopen = (evt) => {
                    console.log("WEB SOCKET OPENED!!!");

                    construction.findMyCompany.call(this);
                    const myuser = construction.getuser.call(this)
                    const data = { type: "join", userid: myuser.UserID };
                    console.log(data)
                    socket.send(JSON.stringify(data));
                };

                socket.onerror = (evt) => {
                    console.log("SOMETHING WENT WRONG!");
                    console.log(evt);
                };

                socket.onclose = (evt) => {
                    console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
                };


            }

        }


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

        this.state.socket.send(payload)
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
        allusers: state.allusers
    }
}

export default connect(mapStateToProps, actions)(ViewCompany);
