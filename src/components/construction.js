import React from 'react'
import { MyStylesheet } from './styles';
import { updateTimes, sorttimes } from './functions'
import firebase from 'firebase/app';
import 'firebase/auth';
import { calculateTotalMonths, UTCTimefromCurrentDate, validateLoanPayment, getRepaymentCosts, getInterval, newCost, convertUTCTime, formatTimeString, getBenefitInterval, validateProviderID, getDateTime, getDateInterval, getScale, calculatemonth, calculateyear, calculateday, calculateFloat } from './functions'
import { SaveCompany, SaveProject, CheckEmailAddress, CheckProviderID, SaveProfile, AppleLogin,  LoadCSIs, ValidateCompanyID, FindMyCompany } from './actions/api';
import { saveCompanyIcon, saveProjectIcon } from './svg';
import Spinner from './spinner'

class Construction {

    getuserbyID(user_id) {
        const construction = new Construction();
        const allusers = construction.getallusers.call(this)
        let getuser = false;
        if(allusers) {
            for(let user of allusers) {
               
                if(user._ID === user_id) {
                    getuser = user;
                }

            }
        }
        return getuser;
    }

    getuserbyid(user_id) {
        const construction = new Construction();
        const allusers = construction.getallusers.call(this)
        let getuser = false;
        if(allusers) {
            for(let user of allusers) {
            
                if(user.UserID === user_id) {
                    getuser = user;
                }

            }
        }
 
        return getuser;
    }

    getallusers() {
        let allusers = false;
        if(this.props.allusers) {
            allusers = this.props.allusers;
        }

        return allusers;
    }

    getfloatbymilestoneid(milestoneid) {
        const construction = new Construction();
        const paths = construction.getpaths.call(this)
        let float = 0;
        let i = 0;
        for (let mypath in paths[milestoneid]['paths']) {

            let floatcheck = paths[milestoneid]['paths'][mypath]['float']

            if (floatcheck < float || i === 0) {
                float = floatcheck

            }

            i += 1;
        }
        return float;

    }

    getlagbymilestoneid(milestoneid) {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this);
        let lag = 0;

        const checklag = (startdate, enddate, i, lag) => {
            let replacelag = false;


            const check = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))


            if (i === 0 && check > 0) {
                replacelag = true;
            } else if (check < lag) {
                replacelag = true;
            }



            return replacelag;
        }

        if (milestones) {
            const mymilestone = construction.getmilestonebyid.call(this, milestoneid);
            if (mymilestone) {

                const startdate = getDateTime(mymilestone.start);

                if (mymilestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    mymilestone.predessors.map((predessor, i) => {

                        const enddate = getDateTime(construction.getmilestonebyid.call(this, predessor.predessor).completion)

                        if (startdate >= enddate && checklag(startdate, enddate, i, lag)) {
                            lag = Math.round((startdate - enddate) * (1 / (1000 * 60 * 60 * 24)))
                        }

                    })
                }

            }
        }
        return lag;
    }

    calcTotalProjectFloat(milestoneid) {
        const construction = new Construction();
        const paths = construction.getpaths.call(this)
        let checkcalc = true
        let i = 0;
        let activemilestoneid = milestoneid;
        while (checkcalc) {


            window[`checkfloat_${i.toString()}`] = 0;


            let j = 0;
            checkcalc = false;
            for (window[`mypath_${i.toString()}`] in paths[activemilestoneid]['paths']) {

                if (!construction.checkemptypathsbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    checkcalc = true
                }


                if (j === 0 || window[`checkfloat_${i.toString()}`] > construction.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])) {
                    window[`checkfloat_${i.toString()}`] = construction.getfloatbymilestoneid.call(this, window[`mypath_${i.toString()}`])
                    activemilestoneid = window[`mypath_${i.toString()}`]
                }
                j += 1
            }

            i += 1;

        }
        let float = construction.getfloatbymilestoneid.call(this, milestoneid)
        let projectfloat = 0;
        for (let k = 0; k < i; k++) {
            projectfloat += Number(window[`checkfloat_${k.toString()}`])
        }
        return float + projectfloat
    }


    getprojectinterval() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this)
        let interval = false;
        if (milestones) {
            milestones.sort((a, b) => {
                return sorttimes(a.start, b.start)
            }
            )
            const start = milestones[0].start;
            const completion = milestones[milestones.length - 1].completion;
            interval = { start, completion }
        }
        return interval;

    }

    getpaths() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this)
        const projectinterval = construction.getprojectinterval.call(this);
        let paths = {}


        const getmilestonebyid = (paths, milestoneid) => {
            let mymilestone = false;
            if (paths.hasOwnProperty(milestoneid)) {

                mymilestone = paths[milestoneid]
            }

            return mymilestone;

        }

        const getPathsbyMilestoneID = (milestones, milestoneid) => {

            let path = {};
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (milestone.hasOwnProperty("predessors")) {
                    // eslint-disable-next-line
                    milestone.predessors.map(predessor => {
                        if (predessor.predessor === milestoneid) {
                            path[`${milestone.milestoneid}`] = {};
                            path[`${milestone.milestoneid}`]['type'] = predessor.type



                        }


                    })



                }


            })

            return path;
        }
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                paths[`${milestone.milestoneid}`] = {};
                paths[`${milestone.milestoneid}`]['milestone'] = milestone.milestone
                paths[`${milestone.milestoneid}`]['start'] = milestone.start
                paths[`${milestone.milestoneid}`]['completion'] = milestone.completion;
                paths[`${milestone.milestoneid}`]['paths'] = getPathsbyMilestoneID(milestones, milestone.milestoneid)

            })




            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
            let mymilestones = [];

            // eslint-disable-next-line
            Object.getOwnPropertyNames(paths).map(path => {
                mymilestones.push(path)
            })

            // eslint-disable-next-line
            mymilestones.map((milestoneid, i) => {

                if ((paths[milestoneid]).hasOwnProperty("paths")) {



                    if (Object.getOwnPropertyNames(paths[milestoneid].paths).length > 0) {

                        // eslint-disable-next-line
                        Object.getOwnPropertyNames(paths[milestoneid].paths).map(prop => {

                            const milestone_2 = getmilestonebyid(paths, prop)
                            let params = {};
                            let params_2 = {};
                            if (milestone_2) {

                                if (scale === 'month') {
                                    params = calculatemonth(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculatemonth(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'year') {
                                    params = calculateyear(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateyear(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                } else if (scale === 'day') {
                                    params = calculateday(projectinterval.start, projectinterval.completion, paths[milestoneid]['start'], paths[milestoneid]['completion'])
                                    params_2 = calculateday(projectinterval.start, projectinterval.completion, milestone_2['start'], milestone_2['completion'])
                                }
                            }
                            const y1 = 80 + 100 * (construction.getmilestonekeybyid.call(this, milestoneid));
                            const y2 = 80 + 100 * (construction.getmilestonekeybyid.call(this, prop));
                            let x1 = "";
                            if (paths[milestoneid].paths[prop].type === 'start-to-finish') {
                                x1 = params.xo + params.width;
                            } else if (paths[milestoneid].paths[prop].type === 'start-to-start') {
                                x1 = params.xo;
                            }
                            paths[milestoneid].paths[prop]['x1'] = x1;
                            paths[milestoneid].paths[prop]['y1'] = y1
                            paths[milestoneid].paths[prop]['y2'] = y2
                            paths[milestoneid].paths[prop]['x2'] = params_2.xo
                            paths[milestoneid].paths[prop]['float'] = 'float';


                        })

                    }


                }


            })
        }


        let milestone_1 = "";
        let milestone_2 = "";
        for (let myprop in paths) {
            milestone_1 = getmilestonebyid(paths, myprop)



            for (let mypath in paths[myprop]['paths']) {
                milestone_2 = getmilestonebyid(paths, mypath)
                let float = calculateFloat(milestone_1.completion, milestone_2.start)
                paths[myprop]['paths'][mypath]['float'] = float
            }

        }

        return paths;
    }

    getdropicon() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '93x',
                    height: 'auto'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '78px',
                    height: 'auto'
                })

        } else {
            return (
                {
                    width: '62px',
                    height: 'auto'
                })
        }
    }

    getprojectbyid(projectid) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let projects = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map(myproject => {

                        if (myproject.projectid === projectid) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
    }


    showlinedetail() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const totallabor = `$${Number(this.getlabortotal()).toFixed(2)}`
        const totalmaterials = `$${Number(this.getmaterialtotal()).toFixed(2)}`
        const totalequipment = `$${Number(this.getequipmenttotal()).toFixed(2)}`
        const totalamount = `$${Number(this.getitemtotal()).toFixed(2)}`
        const responsiveLayouts = () => {
            if (this.state.width > 800) {
                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>

                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder }}>

                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>




                            </div>
                        </div>


                    </div>
                </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Labor
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getlaboritems()}
                                </div>

                            </div>

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Materials
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getmaterialitems()}
                                </div>


                            </div>
                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                    Equipment
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                    {this.getequipmentitems()}
                                </div>

                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Labor {totallabor}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Materials {totalmaterials}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total Equipment {totalequipment}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Total {totalamount}
                                </div>
                            </div>


                        </div>
                    </div>
                )

            }
        }
        return responsiveLayouts();

    }

    getactualmaterials() {
        const construction = new Construction();
        let actualmaterials = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("materials")) {
                actualmaterials = myproject.actual.materials;
            }

        }
        return actualmaterials;
    }

    getactualequipment() {
        const construction = new Construction();
        let actualequipment = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("equipment")) {
                actualequipment = myproject.actual.equipment;
            }

        }
        return actualequipment;
    }

    getactualequipmentkeybyid(equipmentid) {
        const construction = new Construction();
        let key = false;
        let myequipments = construction.getactualequipment.call(this);
        if (myequipments) {
            // eslint-disable-next-line
            myequipments.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i;
                }
            })

        }


        return key;
    }

    getschedulematerials() {
        const construction = new Construction();
        let schedulematerials = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
        if (myproject.hasOwnProperty("schedule")) {

            if (myproject.schedule.hasOwnProperty("materials")) {
                schedulematerials = myproject.schedule.materials;
            }

        }


        return schedulematerials;
    }

    getmilestones() {
        const construction = new Construction();
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
        let milestones = false;
        if (myproject) {
            if (myproject.hasOwnProperty("projectmilestones")) {
                milestones = myproject.projectmilestones.mymilestone;

            }
        }
        return milestones;

    }

    
    getmilestonebyid(milestoneid) {
        let construction = new Construction();
        let milestones = construction.getmilestones.call(this)
        let milestone = false;
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(mymilestone => {
                if (mymilestone.milestoneid === milestoneid) {
                    milestone = mymilestone;
                }
            })
        }
        return milestone;
    }

    getschedulelabor() {
        const construction = new Construction();
        let schedulelabor = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)

        if (myproject.hasOwnProperty("schedule")) {
            if (myproject.schedule.hasOwnProperty("labor")) {
                return myproject.schedule.labor;
            }


        }


        return schedulelabor;
    }

    async findMyCompany() {
        try {

            let response = await FindMyCompany();
            if(response.hasOwnProperty("company")) {
                this.props.reduxCompany(response.company)
                
            } 

            if(response.hasOwnProperty("allprojects")) {
                this.props.reduxAllProjects(response.allprojects)
            }

            this.setState({render:'render'})

        } catch(err) {
            alert(err)
        }
    }

    async loadMyCompany() {
        const construction = new Construction();
        try {
    
    
          await construction.findMyCompany.call(this)
          const mycompany = construction.getcompany.call(this)

          const getsocket = construction.getCompanyWebSocket.call(this)
    
          if (mycompany && !getsocket) {
    
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
                console.log(response)
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
    
            this.props.reduxWebSockets({ company: socket })
    
    
            this.props.reduxWebSockets({ company: socket })
            this.setState({ render: 'render' })
    
          }
    
          } catch (err) {
            alert(`Could not fetch company ${err}`)
          }
    
        
    
      }

    handleCompanyResponse(updatecompany) {
      
            const construction = new Construction();
            const company = construction.getcompany.call(this)
            console.log(updatecompany)
            const accounts = updatecompany.accounts;

 

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

    getCompanyWebSocket() {
        const construction = new Construction();
        const websockets = construction.getWebSockets.call(this);
        let companysocket = false;
        if(websockets.company) {
            companysocket = websockets.company;
        }

        return companysocket;
    }

    getWebSockets() {
        let websockets = false;
        if(this.props.websockets) {
            websockets = this.props.websockets;
        }
        return websockets;
    }

    getproject() {

        const construction = new Construction();
        let projectid = this.props.match.params.projectid;
        let projects = false;
        let myproject = construction.getprojectbytitle.call(this, projectid);

        if (myproject) {
            projects = myproject;
        }
        return projects;
    }

    getcompany() {
        let company = false;
        if(this.props.mycompany) {
            if(this.props.mycompany.hasOwnProperty("_id")) {
                company = this.props.mycompany;
            }
        }

        return company;
    }

    getmymaterials() {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let materials = false;
        if (company.hasOwnProperty("materials")) {
            materials = company.materials;

        }
        return materials;
    }

    getmyemployees() {
        const construction = new Construction()
        let company = construction.getcompany.call(this)
        let employees = false;
            if (company) {
                if (company.hasOwnProperty("employees")) {
                    employees = company.employees;
                }
            
        }
        return employees;
    }

    showsavecompany() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const savecompanyicon = construction.getsaveprojecticon.call(this)
        if (!this.state.spinner) {
            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                    {this.state.message}
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...savecompanyicon }} onClick={() => { construction.saveCompany.call(this) }}>{saveCompanyIcon()}</button>
                </div>

            </div>
            )

        } else {
            return (<Spinner />)
        }
    }

    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({
                width: '273px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '235px'
            })
        } else {
            return ({
                width: '197px'
            })
        }

    }

    getcompanybutton() {
        if (this.state.width > 1200) {
            return ({
                width: '221px',
                height: 'auto'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '160px',
                height: 'auto'
            })
        } else {
            return ({
                width: '110px',
                height: 'auto'
            })
        }

    }

    getgocheckheight() {
        if (this.state.width > 1200) {
            return ({
                width: '69px',
                height: 'auto'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '59px',
                height: 'auto'
            })
        } else {
            return ({
                width: '49px',
                height: 'auto'
            })
        }

    }

    async validatecompanyid(url) {
        const construction = new Construction()
        const myuser = construction.getuser.call(this)
        if (myuser) {

            try {

                let response = await ValidateCompanyID(url);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {

                    if (myuser.hasOwnProperty("company")) {
                        myuser.company.invalid = response.invalid;
                        this.props.reduxUser(myuser)
                        this.setState({ message: response.invalid })
                    } else {
                        this.setState({ urlcheck: false, message: response.invalid })
                    }



                } else if (response.hasOwnProperty("valid")) {

                    if (myuser.hasOwnProperty("company")) {
                        if (myuser.company.hasOwnProperty("invalid")) {

                            delete myuser.company.invalid;
                            this.props.reduxUser(myuser)
                            this.setState({ message: '' })

                        }
                    } else {

                        let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
                        this.setState({ urlcheck: true, message })

                    }



                }

            }

            catch (err) {
                alert(err)

            }

        }

    }

    async clientlogin() {

        const construction = new Construction();
    
        let emailaddress = this.state.emailaddress;
        let client = this.state.client;
        let clientid = this.state.clientid;
        let firstname = this.state.firstname;
        let lastname = this.state.lastname;
        let profile = this.state.profile;
        let userid = profile;
        let phonenumber = this.state.phonenumber;
        let profileurl = this.state.profileurl;
        let google = this.state.google;
        let apple = this.state.apple;

        let values = { emailaddress, client, clientid, firstname, lastname, userid, profile, phonenumber, profileurl, apple, google}
        console.log(values)
        try {
            this.setState({ spinner: true })
            let response = await AppleLogin(values)
            this.setState({ spinner: false })
           

            if (response.hasOwnProperty("myuser")) {
                construction.loadMyCompany.call(this)
                console.log(response.myuser)
                this.props.reduxUser(response.myuser)
                this.setState({ client: '', clientid: '', emailaddress: '', message: '', emailaddresscheck: false, profilecheck: false, profile: '', firstname: '', lastname: '', profileurl: '' })
            }
            if (response.hasOwnProperty("message")) {
                this.setState({ message: response.message })
            }

            if(response.hasOwnProperty("register")) {
                this.setState({register:response.register})
            }
        } catch (err) {
            alert(err)
        }
    }

    getprojects() {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let projects = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    projects = myuser.company.projects;

                }

            }
        }
        return projects;
    }

    getmyequipmentbyid(equipmentid) {

        const construction = new Construction();
        let equipments = false;

        let myequipment = construction.getmyequipment.call(this)

        // eslint-disable-next-line
        myequipment.map((equipment) => {

            if (equipment.equipmentid === equipmentid) {
                equipments = equipment
            }
        })


        return equipments;
    }

    getRadioIcon () {
        if(this.state.width>600) {
            return({width:'48px'})
        } else {
            return({width:'24px'})
        }
    }


    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '37px' })
        } else {
            return ({ width: '30px' })
        }
    }



    async googleSignIn() {
        const construction = new Construction()


        try {


            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            var user = result.user;
            let client = 'google';
            let clientid = user.providerData[0].uid;
            let google = clientid;
            let firstname = '';
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
            }

            let lastname = '';
            if (user.providerData[0].displayName) {
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let emailaddress = user.providerData[0].email;
            let emailaddresscheck = false;
            if (emailaddress) {
                emailaddresscheck = true;
            }
            let profileurl = user.providerData[0].photoURL;
            let phonenumber = user.phoneNumber;
            let profile = this.state.profile;
            let userid = profile;
           


            this.setState({ client, google, clientid, profile, userid, firstname, lastname, profileurl, phonenumber, emailaddress })
            construction.clientlogin.call(this)









        } catch (error) {
            alert(error)
        }


    }

    async verifyProviderID() {
        let profile = this.state.profile;
        let errmsg = validateProviderID(profile);
        if (errmsg) {
            this.setState({ profilecheck: false, message: errmsg })
        } else {
            this.setState({ profilecheck: true, message: "" })
        }
        if (!errmsg) {
            try {
                let response = await CheckProviderID(profile)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true });
                }
                else {
                    this.setState({ profilecheck: false, message: response.message });
                }

            } catch (err) {

                alert(err)
            }

        }


    }

    validateProject(project) {      
        let message = "";
        if(project.hasOwnProperty("schedule")) {

        if (project.schedule.hasOwnProperty("labor")) {
          
                // eslint-disable-next-line
                project.schedule.labor.map(mylabor => {
                    if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                        ;
                        if (!mylabor.csiid) {
                            message += `Schedule labor ${mylabor.laborid} is missing CSIID `
                        }
                        if (!mylabor.milestoneid) {
                            message += `Schedule labor ${mylabor.laborid} is missing MilestoneID `
                        }
                        if (!mylabor.providerid) {
                            message += `Schedule labor ${mylabor.laborid} is missing ProviderID `
                        }

                    }
                })

            
        }

        if (project.schedule.hasOwnProperty("equipment")) {

        
                // eslint-disable-next-line
                project.schedule.equipment.map(equipment => {
                    if (!equipment.csiid || !equipment.milestoneid || !equipment.myequipment) {
                        
                        if (!equipment.csiid) {
                            message += `Schedule Equipment ${equipment.equipmentid} is missing CSIID `
                        }
                        if (!equipment.milestoneid) {
                            message += `Schedule Equipment ${equipment.equipmentid} is missing MilestoneID `
                        }
                        if (!equipment.myequipmentid) {
                            message += `Schedule Equipment ${equipment.equipmentid} is missing Equipment `
                        }

                    }
                })

            }
        

        if (project.schedule.hasOwnProperty("materials")) {
         
                // eslint-disable-next-line
                project.schedule.materials.map(mymaterial => {
                    
                    let material = "";
               
                    if (!mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                        
                        if (!mymaterial.mymaterialid) {
                            message += `Schedule Material is missing materialid `
                        }
                        if (!mymaterial.csiid) {
                            message += `Schedule Material ${material} is missing csiid `
                        }
                        if (!mymaterial.milestoneid) {
                            message += `Schedule Material ${material} is missing milestoneid `
                        }

                    }
                })

            
        }

    }

    if(project.hasOwnProperty("actual")) {

        if (project.actual.hasOwnProperty("labor")) {
          
            // eslint-disable-next-line
            project.actual.labor.map(mylabor => {
                if (!mylabor.csiid || !mylabor.milestoneid || !mylabor.providerid) {
                    ;
                    if (!mylabor.csiid) {
                        message += `Schedule labor ${mylabor.laborid} is missing CSIID `
                    }
                    if (!mylabor.milestoneid) {
                        message += `Schedule labor ${mylabor.laborid} is missing MilestoneID `
                    }
                    if (!mylabor.providerid) {
                        message += `Schedule labor ${mylabor.laborid} is missing ProviderID `
                    }

                }
            })

        
    }


        if (project.actual.hasOwnProperty("materials")) {
        
                // eslint-disable-next-line
                project.actual.materials.map(mymaterial => {
                  
                    if (!mymaterial.mymaterialid || !mymaterial.csiid || !mymaterial.milestoneid) {
                        
                        if (!mymaterial.mymaterialid) {

                            message += `Actual Material is missing materialid `
                        }
                        if (!mymaterial.csiid) {

                            message += `Actual Material ${mymaterial.materialid} is missing csiid `
                        }
                        if (!mymaterial.milestoneid) {
                            message += `Actual Material ${mymaterial.materialid} is missing milestoneid `
                        }
                    }
                })

            
        }
      
        if (project.actual.hasOwnProperty("equipment")) {
        
                // eslint-disable-next-line
                project.actual.equipment.map(myequipment => {
                 
                    if (!myequipment.myequipmentid || !myequipment.csiid || !myequipment.milestoneid) {
                        
                        if (!myequipment.myequipmentid) {
                            message += `Actual Equipment is missing Equipment ID `;
                        }
                        if (!myequipment.csiid) {
                            message += `Actual Equipment ${myequipment.equipmentid} is missing CSIID `;
                        }

                        if (!myequipment.milestoneid) {
                            message += `Actual Equipment ${myequipment.equipmentid} is missing MilestoneID `;
                        }

                    }

                })

            

        


        }

    }
        return message;
    }


    async savemyproject() {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const project = construction.getproject.call(this)
            if (project) {

                const projectid = project.projectid;
                let validate = "";
                validate += construction.validateCompany.call(this, myuser);
                validate += construction.validateProject.call(this, project)
                if(!validate) {
                try {
                    this.setState({ spinner: true })
                    let response = await SaveProject({ myuser, projectid })

                    // construction.handlecompanyids.call(this, response)
                    // construction.handleprojectids.call(this, response)
                    response = updateTimes(response)
                    console.log(response)

                    if (response.hasOwnProperty("myuser")) {


                        this.props.reduxUser(response.myuser)
                    }

                    let message = "";

                    if (response.hasOwnProperty("message")) {
                        let lastupdated = formatTimeString(convertUTCTime(response.lastupdated))
                        message = `${response.message} Last updated ${lastupdated}`

                    }

                    this.setState({ message, spinner: false })


                } catch (err) {
                    alert(err)
                    this.setState({ spinner: false })

                }


            } else {
                this.setState({message:validate})
            }



            }



        }


    }


    sumOfTransfersByLaborID(laborid) {
        const construction = new Construction();
        const transfers = construction.getActualTransfersByLaborID.call(this, laborid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;
    }



    getActualTransfersByLaborID(laborid) {
        const construction = new Construction();
        let gettransfers = false;
        const labor = construction.getactuallaborbyid.call(this, laborid)
        if (labor.hasOwnProperty("actualtransfers")) {
            gettransfers = labor.actualtransfers;

        }
        return gettransfers;

    }

    sumOfTransfersByEquipmentID(equipmentid) {
        const construction = new Construction();
        const transfers = construction.getActualTransfersByEquipmentID.call(this, equipmentid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;

    }

    getActualTransfersByEquipmentID(equipmentid) {
        const construction = new Construction();
        let gettransfers = false;
        const equipment = construction.getactualequipmentbyid.call(this, equipmentid)
        if (equipment.hasOwnProperty("actualtransfers")) {
            gettransfers = equipment.actualtransfers;

        }
        return gettransfers;
    }



    sumOfTransfersByMaterialID(materialid) {
        const construction = new Construction();
        const transfers = construction.getActualTransfersByMaterialID.call(this, materialid)
        let amount = 0;
        if (transfers) {
            // eslint-disable-next-line
            transfers.map(transfer => {
                amount += Number(transfer.amount)

            })
        }
        return amount;

    }

    getActualTransfersByMaterialID(materialid) {
        const construction = new Construction();
        let gettransfers = false;
        let material = construction.getactualmaterialbyid.call(this, materialid)
        if (material.hasOwnProperty("actualtransfers")) {
            gettransfers = material.actualtransfers;

        }
        return gettransfers;

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

    getbenefitbyid(_id, benefitid) {
     
        const construction = new Construction();
        const benefits = construction.getemployeebenefitsbyid.call(this, _id)
        
        let mybenefit = false;
        if (benefits) {
       
            // eslint-disable-next-line
            benefits.map(benefit => {
                if (benefit.benefitid === benefitid) {
                    mybenefit = benefit;
                }
            })
        }
        return mybenefit;
    }

    getemployeebyid(_id) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee._id === _id) {
                    employees = employee;
                }
            })
        }
        return employees;
    }
    getemployeebenefitsbyid(_id) {
        const construction = new Construction();
        let benefits = false;
        const employee = construction.getemployeebyid.call(this, _id)

        if (employee.hasOwnProperty("benefits")) {
            benefits = employee.benefits;
        }
        return benefits;
    }

    getprojectbytitle(title) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let projects = false;

        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map(myproject => {

                        if (myproject.title === title) {
                            projects = myproject;
                        }
                    })
                }
            }
        }
        return projects;
    }
    
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("UserID") ) {
                user = this.props.myusermodel;
            }

        }
        return user;
    }

    getNavigation() {
        let navigation = false;
        if (this.props.hasOwnProperty("navigation")) {
            navigation = this.props.navigation;
        }
        return navigation;
    }

    async appleSignIn() {
        const construction = new Construction();
        let provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;

            let firstname = "";
            let lastname = "";
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let phonenumber = user.providerData[0].phoneNumber
            let profileurl = user.providerData[0].photoURL;
            let client = 'apple';
            let clientid = user.providerData[0].uid;
            let apple = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;

            let profile = this.state.profile;
            this.setState({ client, clientid, apple, profile, firstname, lastname, profileurl, phonenumber, emailaddress })
            construction.clientlogin.call(this)

        } catch (err) {
            alert(err)
        }

    }


    getequipmentcostskeybyid(equipmentid, costid) {
        const construction = new Construction();
        let key = false;
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    key = i
                }

            })

        }

        return key;
    }

    getbenefitkeybyid(providerid, benefitid) {
        const construction = new Construction();
        let key = false;
        let employee = construction.getemployeebyid.call(this, providerid);
        // eslint-disable-next-line


        if (employee) {

            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.map((benefit, i) => {
                    if (benefit.benefitid === benefitid) {
                        key = i;
                    }
                })
            }
        }



        return key
    }

    calculateLaborRatebyID(providerid) {
        const construction = new Construction();
        const employee = construction.getemployeebyid.call(this, providerid)
        let sum = 0;
        if (employee) {
            const benefits = construction.getemployeebenefitinterval.call(this, providerid);

            if (benefits.length > 0) {
                // eslint-disable-next-line
                benefits.map(benefit => {
                    sum += Number(benefit.amount)
                })
            }

        }
        const workinghours = Number(employee.workinghours)
        const laborrate = workinghours > 0 ? sum / workinghours : 0;
        return laborrate;
    }

    getButtonSize() {
        if (this.state.width > 1200) {
            return ({ width: '60px' })

        } else if (this.state.width > 600) {
            return ({ width: '50px' })

        } else {
            return ({ width: '40px' })

        }
    }


    getemployeebenefitinterval(providerid) {
        const construction = new Construction();
        let benefits = [];
        const employee = construction.getemployeebyid.call(this, providerid)
        if (employee) {
            if (employee.hasOwnProperty("benefits")) {
                // eslint-disable-next-line
                employee.benefits.map(benefit => {
                    let interval = getBenefitInterval(benefit.frequency, Number(benefit.amount), benefit.benefit, benefit.accountid)
                    benefits = [...benefits, ...interval]
                })
            }
        }

        return benefits;
    }

    getAllCompanys() {
      let allcompanys = false;
        if(this.props.allcompanys.hasOwnProperty("length")) {
           

                allcompanys = this.props.allcompanys

            
        }
        return allcompanys;
    }

    getAllActual() {
        const construction = new Construction();

        let actuals = [];
        let myproject = construction.getproject.call(this)
        if (myproject.hasOwnProperty("actual")) {

            if (myproject.actual.hasOwnProperty("labor")) {
                // eslint-disable-next-line
                myproject.actual.labor.map(mylabor => {
                    actuals.push(mylabor)
                })
            }
            if (myproject.actual.hasOwnProperty("equipment")) {
                // eslint-disable-next-line
                myproject.actual.equipment.map(myequipment => {
                    actuals.push(myequipment)
                })
            }
            if (myproject.actual.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                myproject.actual.materials.map(mymaterial => {
                    actuals.push(mymaterial)
                })

            }

        }
        // eslint-disable-next-line
        actuals.map((myactual, i) => {
            if (myactual.hasOwnProperty("csiid")) {
                let csi = construction.getcsibyid.call(this, myactual.csiid)
                myactual.csi = csi.csi
                actuals[i] = myactual;
            }
        })

        actuals.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })







        return actuals;

    }

    getAllSchedule() {
        const construction = new Construction();
        const project_id = this.props.project_id;
        const schedule = () => {
            let schedules = [];
            let myproject = construction.getOurProjectByID.call(this, this.props.project_id )


            if (myproject.hasOwnProperty("schedule")) {

                if (myproject.schedule.hasOwnProperty("labor")) {
                    // eslint-disable-next-line
                    myproject.schedule.labor.map(mylabor => {
                        schedules.push(mylabor)
                    })
                }

                if (myproject.schedule.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myproject.schedule.equipment.map(myequipment => {
                        schedules.push(myequipment)
                    })
                }
                if (myproject.schedule.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    myproject.schedule.materials.map(mymaterial => {
                        schedules.push(mymaterial)
                    })

                }

            }
            // eslint-disable-next-line
            schedules.map((myschedule, i) => {
                if (myschedule.hasOwnProperty("csiid")) {
                    let csi = construction.getcsibyid.call(this, myschedule.csiid)
                    myschedule.csi = csi.csi
                    schedules[i] = myschedule;
                }
            })

            schedules.sort((a, b) => {
                return sorttimes(a.timein, b.timein)
            })


            return schedules;

        }

        let MySchedule = schedule();

        return MySchedule

    }

    getprojectkeybyid(projectid) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        let key = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.map((myproject, i) => {

                        if (myproject.projectid === projectid) {
                            key = i;
                        }
                    })
                }
            }
        }
        return key;
    }

    gettransfers() {
        const construction = new Construction();
        const projects = construction.getmyprojects.call(this)

        let transfers = [];
        if (projects) {
            // eslint-disable-next-line
            projects.map(myproject => {
                if (myproject.hasOwnProperty("actual")) {

                    if (myproject.actual.hasOwnProperty("labor")) {
                        // eslint-disable-next-line
                        myproject.actual.labor.map(mylabor => {
                            if (mylabor.hasOwnProperty("actualtransfers")) {
                                // eslint-disable-next-line
                                mylabor.actualtransfers.map(transfer => {
                                    transfers.push(transfer)
                                })

                            }
                        })

                    }

                    if (myproject.hasOwnProperty("actualmaterials")) {
                        // eslint-disable-next-line
                        myproject.actual.materials.map(mymaterial => {
                            if (mymaterial.hasOwnProperty("actualtransfers")) {
                                // eslint-disable-next-line
                                mymaterial.actualtransfers.map(transfer => {
                                    transfers.push(transfer)
                                })

                            }
                        })

                    }

                    if (myproject.actual.hasOwnProperty("equipment")) {
                        // eslint-disable-next-line
                        myproject.actual.equipment.map(myequipment => {
                            if (myequipment.hasOwnProperty("actualtransfers")) {
                                // eslint-disable-next-line 
                                myequipment.actualtransfers.map(transfer => {
                                    transfers.push(transfer)
                                })

                            }
                        })

                    }


                }


            })
        }
        return transfers;
    }

    async checkemailaddress(emailaddress) {
        if (emailaddress) {
            try {
                let response = await CheckEmailAddress(emailaddress);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ emailcheck: false, message: response.message })
                } else if (response.hasOwnProperty("valid")) {
                    this.setState({ emailcheck: true, message: "" })
                }
            } catch (err) {
                alert(err)
            }

        }

    }

    getcsis() {
        let csis = false;
        if (this.props.csis) {
            if (this.props.csis.hasOwnProperty("length")) {
                csis = this.props.csis;
            }
        }
        return csis;
    }
    getcsibyid(csiid) {
        let csi = false;
        let construction = new Construction();
        const csis = construction.getcsis.call(this)
        if (csis) {
            // eslint-disable-next-line
            csis.map(code => {
                if (code.csiid === csiid) {
                    csi = code;

                }
            })

        }

        return csi;
    }

    getschedulematerialkeybyid(materialid) {
        const construction = new Construction();
        let mymaterials = construction.getschedulematerials.call(this);
        let key = false;
        if (mymaterials) {

            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })


        }
        return key;
    }
    getmaterialbyid(materialid) {
        const construction = new Construction();
        let material = false;
        let mymaterials = construction.getschedulematerials.call(this)
        if (mymaterials) {
            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }

            })
        }

        if(!material) {
            let actuals = construction.getactualmaterials.call(this)
            if(actuals) {
                // eslint-disable-next-line
                actuals.map(actual=> {
                    if(actual.materialid === materialid) {
                        material = actual;
                    }
                })
            }
        }
        return material;

    }
    getschedulematerialbyid(materialid) {
        const construction = new Construction();
        let material = false;
        let mymaterials = construction.getschedulematerials.call(this)
        if (mymaterials) {
            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }

            })
        }
        return material;

    }

    updateinvoice(invoiceid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);


        if (myuser) {
            const myproject = construction.getproject.call(this);
            if (myproject) {
                const i = construction.getprojectkeybyid.call(this, myproject.projectid)
                const myinvoice = construction.getinvoicebyid.call(this, invoiceid)
                if (myinvoice) {

               

                    myuser.company.projects[i].actual.updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    updateproposal(proposalid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);

        if (myuser) {
            const myproject = construction.getproject.call(this);
            if (myproject) {
                const i = construction.getprojectkeybyid.call(this, myproject.projectid)
                const myproposal = construction.getproposalbyid.call(this, proposalid)
                if (myproposal) {

                    myuser.company.projects[i].schedule.updated = UTCTimefromCurrentDate();
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
            }


        }

    }

    getactualmaterialbyid(materialid) {
        const construction = new Construction();
        let material = false;
        const mymaterials = construction.getactualmaterials.call(this)
        if (mymaterials) {
            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    material = mymaterial;
                }
            })
        }


        return material;
    }

    getscheduleequipment() {
        const construction = new Construction();
        let scheduleequipment = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
    
        if (myproject.hasOwnProperty("schedule")) {
            if (myproject.schedule.hasOwnProperty("equipment")) {
                scheduleequipment = myproject.schedule.equipment;
            }

        }
        return scheduleequipment;
    }

    getscheduleequipmentkeybyid(equipmentid) {
        const construction = new Construction();
        let myequipments = construction.getscheduleequipment.call(this)
        let key = false;
        if (myequipments) {
            // eslint-disable-next-line
            myequipments.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    key = i
                }
            })


        }
        return key;
    }
    getequipmentbyid(equipmentid) {
        const construction = new Construction();
        let equipment = false;
        const myequipment = construction.getscheduleequipment.call(this)
        if (myequipment) {
// eslint-disable-next-line
            myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
        }

        if(!equipment) {
            const actuals = construction.getactualequipment.call(this);
            if(actuals) {
                // eslint-disable-next-line
                actuals.map(actual=> {
                    if(actual.equipmentid === equipmentid) {
                        equipment = actual;
                    }
                })
            }
        }


        return equipment;
    }

    getscheduleequipmentbyid(equipmentid) {
        const construction = new Construction();
        let equipment = false;
        const myequipment = construction.getscheduleequipment.call(this)
        if (myequipment) {
// eslint-disable-next-line
            myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
        }


        return equipment;
    }

    calculateequipmentratebyownership(equipmentid) {
        let equipmentrate = 0;
        let totalamount = 0;
        const construction = new Construction();
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)
        if (myequipment) {
            const costs = construction.gettransformedcostsbyequimentid.call(this, equipmentid);
      
            if (costs.length > 0) {

                const Period = () => {
                    let purchasedate = myequipment.ownership.purchasedate;
                    let saledate = myequipment.ownership.saledate;
                    if (purchasedate && saledate) {
                        let totalmonths = calculateTotalMonths(purchasedate, saledate)
                        return (totalmonths)
                    } else {
                        return 0;
                    }
                }
               


                const totalworkinghours = () => {
                    let annual = Number(myequipment.ownership.workinghours);
                    let years = Period() / 12;

                    return (Math.round(annual * years))
                }
            
                // eslint-disable-next-line
                costs.map(cost => {

                    totalamount += Number(cost.amount);
                })


                if (totalworkinghours() > 0) {
                    equipmentrate = totalamount / totalworkinghours()

                }



            }


        }




        return equipmentrate;
    }
    getcostbyid(equipmentid, costid) {

        const construction = new Construction();
        let costs = false;
        const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)

        if (myequipment.hasOwnProperty("ownership")) {
            // eslint-disable-next-line
            myequipment.ownership.cost.map((cost, i) => {
                if (cost.costid === costid) {
                    costs = cost;
                }

            })

        }

        return costs
    }
    getequipmentcostsbyid(equipmentid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        let costs = false;
        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    myuser.company.equipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {

                            if (myequipment.hasOwnProperty("ownership")) {

                                costs = myequipment.ownership.cost
                            }

                        }
                    })

                }



            }

        }
        return costs;
    }

    getactualequipmentbyid(equipmentid) {
        const construction = new Construction();
        let equipment = false;
        const myequipment = construction.getactualequipment.call(this)

        if (myequipment) {
// eslint-disable-next-line
            myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })


        }
        return equipment;
    }
    getbidactual() {
        const construction = new Construction();
        const project = construction.getproject.call(this)
        let actual = false;
        if (project.hasOwnProperty("actual")) {
            if (project.actual.hasOwnProperty("bid")) {
                actual = project.actual.bid;
            }

        }
        return actual;

    }
    
    getbidschedule() {
        const construction = new Construction();
        const project = construction.getproject.call(this)
        let schedule = false;
        if (project.hasOwnProperty("schedule")) {

            if (project.schedule.hasOwnProperty("bidschedule")) {
                schedule  = project.schedule.bidschedule;
            }

        }
        return schedule ;

    }

    getbidschedulekeybyid(csiid) {
        const construction = new Construction();
        const schedule = construction.getbidschedule.call(this)
        let key = false;
        if (schedule) {
            // eslint-disable-next-line
            schedule.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;

    }


    getbidactualkeybyid(csiid) {
        const construction = new Construction();
        const actual = construction.getbidactual.call(this)
        let key = false;
        if (actual) {
            // eslint-disable-next-line
            actual.map((item, i) => {
                if (item.csiid === csiid) {
                    key = i;
                }
            })
        }
        return key;

    }

    showbidtable() {

        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);


        if (this.state.width > 1200) {
            return (
                <table width="100%" border="1" style={{ ...regularFont, ...styles.generalFont, ...styles.generalTable }}>
                    <tr>
                        <td width="24%" style={{ ...styles.alignCenter }}>Line ID</td>
                        <td width="12%" style={{ ...styles.alignCenter }}>Quantity</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Unit</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Direct Cost</td>
                        <td width="13%" style={{ ...styles.alignCenter }}> Overhead and Profit %</td>
                        <td width="13%" style={{ ...styles.alignCenter }}>Bid Price</td>
                        <td width="12%" style={{ ...styles.alignCenter }}>Unit Price</td>
                    </tr>
                    {this.showbiditems()}
                </table>

            )
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        {this.showbiditems()}

                    </div>
                </div>
            )
        }
    }

    getbidactualbyid(csiid) {
        const construction = new Construction();
        const actual = construction.getbidactual.call(this)
        let myitem = false;
        if (actual) {
            // eslint-disable-next-line
            actual.map(item => {
                if (item.csiid === csiid) {
                    myitem = item;
                }
            })
        }
        return myitem;

    }

    getactuallabor() {
        const construction = new Construction();
        let actuallabor = false;
        const project_id = this.props.project_id;
        let myproject = construction.getOurProjectByID.call(this,project_id)
        if (myproject.hasOwnProperty("actual")) {
            if (myproject.actual.hasOwnProperty("labor")) {
                return myproject.actual.labor;
            }


        }


        return actuallabor;
    }


    getactuallaborbyid(laborid) {
        const construction = new Construction();
        let mylabors = construction.getactuallabor.call(this)
        let labor = false

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })

        }

        return labor;
    }
    getlaborbyid(laborid) {
        const construction = new Construction();
        let mylabors = construction.getschedulelabor.call(this)
        let labor = false

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })

        }

        if(!labor) {
            const actuals = construction.getactuallabor.call(this)
            if(actuals) {
                // eslint-disable-next-line
                actuals.map(actual=> {
                    if(actual.laborid === laborid) {
                        labor = actual;
                    }
                })
            }
        }

        return labor;
    }

    getschedulelaborbyid(laborid) {
        const construction = new Construction();
        let mylabors = construction.getschedulelabor.call(this)
        let labor = false

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {
                if (mylabor.laborid === laborid) {
                    labor = mylabor;
                }
            })

        }

        return labor;
    }

    getschedulelaborkeybyid(laborid) {
        const construction = new Construction();
        let mylabors = construction.getschedulelabor.call(this)
        let key = false;

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {

                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })

        }

        return key;
    }

    getactuallaborkeybyid(laborid) {
        const construction = new Construction();
        let mylabors = construction.getactuallabor.call(this)
        let key = false;

        if (mylabors) {

            // eslint-disable-next-line
            mylabors.map((mylabor, i) => {

                if (mylabor.laborid === laborid) {
                    key = i;
                }
            })

        }

        return key;
    }

    getmymaterialfromid(materialid) {

        const construction = new Construction();
        let company = construction.getcompany.call(this);
        let material = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.map(mymaterial => {
                    if (mymaterial.materialid === materialid) {
                        material = mymaterial;
                    }
                })
            }
        }
        return material;
    }


    getmyaccounts() {
        const construction = new Construction();
        let myaccounts = false;
        const mycompany = construction.getcompany.call(this);
        if (mycompany) {
            if (mycompany.hasOwnProperty("accounts")) {
                myaccounts = mycompany.accounts;
            }
        }
        return myaccounts;
    }

    touchtoedit() {

        if (this.state.width > 1200) {
            return ({ width: '80px' })
        } else {
            return ({ width: '60px' })
        }
    }

    getaccountbyid(accountid) {
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let myaccount = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    myaccount = account;
                }
            })
        }
        return myaccount;
    }

    getmaterialkeybyid(materialid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let key = false;
        if (company) {
            if (company.hasOwnProperty("materials")) {
                // eslint-disable-next-line
                company.materials.map((mymaterial, i) => {
                    if (mymaterial.materialid === materialid) {
                        key = i;

                    }
                })
            }
        }
        return key;

    }
    getmyprojects() {
        const construction = new Construction();
        const company = construction.getcompany.call(this);
        let projects = false;
        if (company) {
            if (company.hasOwnProperty("projects")) {
                projects = company.projects
            }
        }
        return projects;
    }
    getaccountkeybyid(accountid) {
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        let key = false;
        if (myaccounts.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myaccounts.map((account, i) => {
                if (account.accountid === accountid) {
                    key = i;
                }
            })
        }
        return key;
    }


    getmyequipment() {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        let equipment = false;
        if (company) {
        
                if (company.hasOwnProperty("equipment")) {
                    equipment = company.equipment;
                }
            
        }
        return equipment;
    }

    getequipmentfromid(equipmentid) {
        let construction = new Construction();
        let myequipment = construction.getmyequipment.call(this)
        let equipment = false;
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipments => {
                if (equipments.equipmentid === equipmentid) {
                    equipment = equipments;
                }
            })
        }
        return equipment;
    }


    buttonSize() {
        if (this.state.width > 1200) {
            return ({ width: '60px' })

        } else if (this.state.width > 600) {
            return ({ width: '50px' })

        } else {
            return ({ width: '40px' })

        }
    }




    getactualmaterialkeybyid(materialid) {
        const construction = new Construction();
        let mymaterials = construction.getactualmaterials.call(this)
        let key = false;
        if (mymaterials) {

            // eslint-disable-next-line
            mymaterials.map((mymaterial, i) => {
                if (mymaterial.materialid === materialid) {
                    key = i;
                }
            })


        }
        return key
    }

    showsaveproject() {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const saveprojecticon = construction.getsaveprojecticon.call(this);
        const styles = MyStylesheet();
        if (!this.state.spinner) {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        {this.state.message}
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { construction.savemyproject.call(this) }}>{saveProjectIcon()}</button>
                    </div>
                </div>)

        } else {
            return (<Spinner />)
        }
    }

    getbuttonheight() {
        if (this.state.width > 1200) {
            return ({ height: '75px' })
        } else if (this.state.width > 800) {
            return ({ height: '58px' })
        } else {
            return ({ height: '40px' })
        }
    }

    loadaccounts() {
        const construction = new Construction();
        let accounts =construction.getaccounts.call(this)
        let options = [];
        options.push(<option key={`selectanaccount`} value=""> Select Account ID</option>);
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option key={account.accountid} value={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }


    handlecompanyids(response) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        if (myuser) {
            if (response.hasOwnProperty("replaceids")) {
                if (response.replaceids.hasOwnProperty("accounts")) {
                    // eslint-disable-next-line
                    response.replaceids.accounts.map(replaceids => {

                        let oldaccountid = replaceids.oldaccountid;

                        let i = construction.getaccountkeybyid.call(this, oldaccountid);
                        myuser.company.accounts[i].accountid = replaceids.accountid;
                        if (this.state.activeaccountid === oldaccountid) {
                            this.setState({ activeaccountid: replaceids.accountid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("mymaterial")) {
                    // eslint-disable-next-line
                    response.replaceids.mymaterial.map(material => {
                        let oldmaterialid = material.oldmaterialid;
                        let materialid = material.materialid;
                        let j = construction.getmaterialkeybyid.call(this, oldmaterialid)
                        myuser.company.materials[j].materialid = material.materialid;
                        if (this.state.activematerialid === oldmaterialid) {
                            this.setState({ activematerialid: materialid })
                        }
                    })

                }
                if (response.replaceids.hasOwnProperty("equipment")) {
                    // eslint-disable-next-line
                    response.replaceids.equipment.map(equipment => {

                        let oldequipmentid = equipment.oldequipmentid;
                        let equipmentid = equipment.equipmentid;
                        let k = construction.getequipmentkeybyid.call(this, oldequipmentid)
                        myuser.company.equipment[k].equipmentid = equipmentid;
                        if (this.state.activeequipmentid === oldequipmentid) {
                            this.setState({ activeequipmentid: equipmentid })
                        }
                    })

                }

                if (response.replaceids.hasOwnProperty("costid")) {
                    // eslint-disable-next-line
                    response.replaceids.costid.map(cost => {
                        let oldcostid = cost.oldcostid;
                        let costid = cost.costid;
                        let equipmentid = cost.equipmentid;
                        let l = construction.getequipmentkeybyid.call(this, equipmentid)
                        let m = construction.getequipmentcostskeybyid.call(this, equipmentid, oldcostid)

                        myuser.company.equipment[l].ownership.cost[m].costid = costid;
                        if (this.state.activecostid === oldcostid) {
                            this.setState({ activecostid: costid })
                        }

                    })
                }
                if (response.replaceids.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    response.replaceids.benefits.map(benefit => {
                        let providerid = benefit.providerid;
                        let oldbenefitid = benefit.oldbenefitid;
                        let benefitid = benefit.benefitid;
                        let n = construction.getemployeekeybyid.call(this, providerid);
                        let o = construction.getbenefitkeybyid.call(this, providerid, oldbenefitid)
                        myuser.company.employees[n].benefits[o].benefitid = benefitid;
                        if (this.state.activebenefitid === oldbenefitid) {
                            this.setState({ activebenefitid: benefitid })
                        }
                    })
                }
                this.props.reduxUser(myuser)
            }

        }
    }
    validateCompany(myuser) {
        let validate = "";

        if (myuser.hasOwnProperty("invalid")) {

            validate  += myuser.invalid;
        }
        if(myuser.hasOwnProperty("company")) {

        if (myuser.company.hasOwnProperty("equipment")) {
            // eslint-disable-next-line
            myuser.company.equipment.map(myequipment => {
                if (!myequipment.accountid) {
                    
                    validate += `${myequipment.equipment} is missing AccountID `
                }

            })
        }
        if (myuser.company.hasOwnProperty("materials")) {
            // eslint-disable-next-line
            myuser.company.materials.map(mymaterial => {
                if (!mymaterial.accountid) {
            
                    validate += `${mymaterial.material} is missing AccountID `
                }
            })
        }
        if (myuser.company.hasOwnProperty("employees")) {
            // eslint-disable-next-line
            myuser.company.employees.map(employee => {

                if (employee.hasOwnProperty("benefits")) {
                    // eslint-disable-next-line
                    employee.benefits.map(benefit => {
                        if (!benefit.accountid) {
                          
                            validate += `${benefit.benefit} is missing AccountID `
                        }
                    })
                }
            })
        }

    }
        return validate;

    }

    
    getampmicon() {
        if (this.state.width > 1200) {
            return ({ width: '83px', height: '48px' })
        } else if (this.state.width > 800) {
            return ({ width: '70px', height: '41px' })
        } else {
            return ({ width: '57px', height: '33px' })
        }

    }

    

    getOurProjectKeyById(project_id) {
        const construction = new Construction();
        let key = false;
        const projects = construction.getOurProjects.call(this)
        console.log(projects,project_id)
        if(projects) {
        projects.map((project,i)=> {
            if(project.project_id === project_id) {
                key = i;
            }
        })
    }
        return key;
    }

    getOurProjectByID(project_id) {
        const construction = new Construction();
        let getproject = false;
        const projects = construction.getOurProjects.call(this)
        if(projects) {
        projects.map(project=> {
            if(project.project_id === project_id) {
                getproject = project;
            }
        })

    }
        return getproject;
    }

    getOurProjects() {
        let OurProjects = false;
        if(this.props.myprojects) {
            if(this.props.myprojects.hasOwnProperty("length")) {
                OurProjects = this.props.myprojects;

            }
        }
        return OurProjects;
    }

    getProjectBy_ID(project_id) {
      
        const construction = new Construction();
        const allprojects = construction.getAllProjects.call(this)
     
        let getproject = false;
        if(allprojects) {
            allprojects.map(project => {
                if(project._ID === project_id) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }

    getProjectByID(projectid) {
      
        const construction = new Construction();
        const allprojects = construction.getAllProjects.call(this)
     
        let getproject = false;
        if(allprojects) {
            allprojects.map(project => {
                if(project.ProjectID === projectid) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }

    getAllProjects() {
        let allprojects = false;
        if(this.props.allprojects) {
        if(this.props.allprojects.hasOwnProperty("length")) {

            allprojects = this.props.allprojects;
           
        }

    }



        return allprojects;
    }

    getMyProjectByID(projectid) {
        const construction = new Construction();
        let getproject = false;
        const myprojects = construction.getMyProjects.call(this)
        if(myprojects) {
            myprojects.map(project=> {
                if(project.projectid === projectid) {
                    getproject = project;
                }
            })

        }

        return getproject;
    }

    getMyProjects() {
        let myprojects = false;
        if(this.props.myprojects) {
            myprojects = this.props.myprojects;

        }
        return myprojects;
    }

    getaccounts() {
        const construction = new Construction();
        let company = construction.getcompany.call(this);
        let accounts = false;

        if (company.hasOwnProperty("accounts")) {
            accounts = company.accounts;
        }

        return accounts;
    }


    getMaxWidth() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '900px' })
        } else if (this.state.width > 800) {
            return ({ maxWidth: '600px' })
        } else {
            return ({ maxWidth: '400px' })
        }
    }

    getBenefitKeyByID(user_id, benefitid) {
        const construction = new Construction();
        const benefits = construction.getbenefitsbyUserID.call(this,user_id)
        let key = false;
        if(benefits) {
            benefits.map((benefit,i)=> {
                if(benefit.benefitid === benefitid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getBenefitsByID(user_id, benefitid) {
        const construction = new Construction();
        const benefits = construction.getbenefitsbyUserID.call(this,user_id)
        let getbenefit = false;
        if(benefits) {
            for(let benefit of benefits) {
                if(benefit.benefitid === benefitid) {
                    getbenefit = benefit;
                }
            }
        }
        return getbenefit;
    }

    getbenefitsbyUserID(user_id) {
        const construction = new Construction();

        const employee = construction.getemployeebyuserid.call(this,user_id)
        let benefits = false;
        if(employee) {
            if(employee.hasOwnProperty("benefits")) {
                benefits = employee.benefits;
            }
        }

        return benefits;
        
    }

    getemployeebyuserid(user_id) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let employees = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map(employee => {
                if (employee.user_id === user_id) {
                    employees = employee;
                }
            })
        }
        return employees;
    }

    getemployeekeybyuserid(user_id) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let key = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map((employee,i) => {
                if (employee.user_id === user_id) {
                    key = i;
                }
            })
        }
        return key;
    }

    getemployeekeybyid(_id) {
        const construction = new Construction()
        let myemployees = construction.getmyemployees.call(this)
        let key = false;
        if (myemployees) {
            // eslint-disable-next-line
            myemployees.map((employee, i) => {
                if (employee._id === _id) {
                    key = i;
                }
            })
        }
        return key;
    }

    getbidfield() {
        if (this.state.width > 1200) {
            return ({ maxWidth: '100px' })

        } else if (this.state.width > 600) {
            return ({ maxWidth: '80px' })

        } else {

            return ({ maxWidth: '60px' })

        }
    }

    getequipmentkeybyid(equipmentid) {
        const construction = new Construction();
        let key = false;

        let myequipment = construction.getmyequipment.call(this)
        // eslint-disable-next-line
        myequipment.map((equipment, i) => {
            if (equipment.equipmentid === equipmentid) {
                key = i;
            }
        })


        return key;
    }
    gettransformedcostsbyequimentid(equipmentid) {
        const construction = new Construction();
        const equipment = construction.getmyequipmentbyid.call(this, equipmentid)

        let costarray = [];
        if (equipment) {

            if (equipment.hasOwnProperty("ownership")) {
                const purchase = Number(equipment.ownership.purchase);
                const purchasedate = equipment.ownership.purchasedate;
                const salvage = Number(equipment.ownership.resalevalue);
                const saledate = equipment.ownership.saledate;
                const apr = Number(equipment.ownership.loaninterest);
                // validate
                const validate = validateLoanPayment(purchase, purchasedate, salvage, saledate, apr)
                let payments = [];
                if (validate) {

                    payments = getRepaymentCosts(purchase, purchasedate, salvage, saledate, apr);
                    costarray = [...costarray, ...payments]

                } else if (purchase && !apr) {

                    payments = getInterval(saledate, purchasedate, 'monthly', ((purchase - salvage) / calculateTotalMonths(purchasedate, saledate)), 'ownership')
                    costarray = [...costarray, ...payments]

                }


                if (equipment.ownership.hasOwnProperty("cost")) {

                    // eslint-disable-next-line
                    equipment.ownership.cost.map(cost => {


                        if (cost.hasOwnProperty("reoccurring")) {



                            if (equipment.hasOwnProperty("ownership")) {


                                const reoccurringcosts = getInterval(equipment.ownership.saledate, equipment.ownership.purchasedate, cost.reoccurring.frequency, cost.cost, cost.detail)

                                costarray = [...costarray, ...reoccurringcosts]

                            }


                        } else {

                            costarray.push(newCost(cost.costid, cost.detail, cost.timein, cost.cost))

                        }


                    })




                }

            }

            //

        }
        return costarray;
    }

    async saveCompany() {
        const construction = new Construction()
        const company = construction.getcompany.call(this)
        if (company) {
       
        
            
                    try {
                        this.setState({ spinner: true })
                        let response = await SaveCompany({company});
                        this.setState({ spinner: false })
                        construction.handlecompanyids.call(this, response)
                     
                        if (response.hasOwnProperty("company")) {
                            this.props.reduxCompany(response.company)
                        }
                        this.setState({render:'render'})

                    } catch (err) {
                        alert(err)
                        this.setState({ spinner: false })
                    }
               

          

        }
    }
    async savemyprofile() {
        try {
            let construction = new Construction();
            let myuser = construction.getuser.call(this)
            let user = { userid:myuser.userid, _id: myuser._ID, firstname: myuser.FirstName, lastname: myuser.LastName, emailaddress: myuser.EmailAddress, phonenumber: myuser.PhoneNumber, profileurl: myuser.ProfileURL, profile: myuser.profile, userid:myuser.UserID }
            this.setState({ spinner: true })
            let response = await SaveProfile({ myuser: user })
            console.log(response)
         
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)
            }

            let message = "";
            if (response.hasOwnProperty("message")) {
                let lastupdated = formatTimeString(convertUTCTime(response.lastupdated))
                message = `${response.message} Last updated ${lastupdated}`

            }
            this.setState({ message, spinner: false })

        } catch (err) {
            alert(err)
            this.setState({ spinner: false })
        }

    }

    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (styles.font30)
        }
        if (this.state.width > 800) {
            return (styles.font24)
        } else {
            return (styles.font20)
        }

    }

    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (styles.font40)
        } else if (this.state.wisth > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }


}

export default Construction