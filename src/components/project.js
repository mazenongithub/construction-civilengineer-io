import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { FindProject } from './actions/api';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import Construction from './construction'
import Schedule from './schedule'
import Actual from './actual';
import BidSchedule from './bidschedule';
import Bid from './bid';
import { saveProjectIcon } from './svg';
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '', navigation: "default", schedule: Math.random(), actual: Math.random(), bidschedule: Math.random(), bid: Math.random() }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {

        window.addEventListener('resize', this.updateWindowDimensions);

        this.updateWindowDimensions();
        const construction = new Construction();
        const projectid = this.props.match.params.projectid;
        const userid = this.props.match.params.providerid;

        const projectsocket = construction.getProjectSocketByID.call(this, projectid)

        let server_api = process.env.REACT_APP_SERVER_API

        const stripHttp = (server_api) => {

            return server_api.replace(/^https?:\/\//, '')

        }


        server_api = stripHttp(server_api)


        const socket = new WebSocket(`ws://${server_api}/projects/${projectid}/websocketapi`)

        socket.onopen = (evt) => {

            const data = { type: "join", userid, application: 'construction' };
            socket.send(JSON.stringify(data));
            console.log("Project Web Socket Open", data)

        }

        socket.onmessage = (evt) => {
            const response = JSON.parse(evt.data);
            console.log(response)

            if (response.type === "join" && response.application === "construction") {



                if (response.hasOwnProperty("myproject")) {
                    let getproject = response.myproject;
                    let project_id = getproject.project_id;
                    let OurProjects = construction.getOurProjects.call(this)

                    const findproject = construction.getOurProjectByID.call(this, project_id)

                    if (findproject) {
                        let i = construction.getOurProjectKeyById.call(this, project_id)
                        OurProjects[i] = getproject;
                        this.props.reduxMyProjects(OurProjects)

                        // appending project on client

                    } else {

                        if (!OurProjects) {
                            OurProjects = [getproject];
                        } else {
                            OurProjects.push(getproject)
                        } // else condition company projects exists


                        this.props.reduxMyProjects(OurProjects)


                    } // else condition creating new project


                } // if myproject

            } else if (response.type === "construction") {



                let myprojects = construction.getOurProjects.call(this)
                let myproject = this.getOurProject();

                if (myproject) {
                    let project_id = myproject.project_id;

                    let i = construction.getOurProjectKeyById.call(this, myproject.project_id)

                    if (response.hasOwnProperty("response")) {
                        let updateobj = response.response;

                        if (updateobj.hasOwnProperty("schedule")) {

                            if (updateobj.schedule.hasOwnProperty("insert")) {
                                updateobj.schedule.insert.map(obj => {
                                    if (obj.hasOwnProperty("laborid")) {

                                        let laborid = obj.laborid;
                                        let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                        if (!mylabor) {
                                            myprojects[i].schedule.labor.push(obj)
                                        }

                                    } else if (obj.hasOwnProperty("materialid")) {

                                        let materialid = obj.materialid;
                                        let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                        if (!mymaterial) {
                                            myprojects[i].schedule.materials.push(obj)
                                        }



                                    } else if (obj.hasOwnProperty("equipmentid")) {


                                        let equipmentid = obj.equipmentid;
                                        let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)

                                        if (!myequipment) {
                                            myprojects[i].schedule.equipment.push(obj)
                                        }

                                    } else if (obj.hasOwnProperty("csiid")) {
                                        let csiid = obj.csiid;
                                        let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)

                                        if (!csi) {
                                            myprojects[i].schedule.bidschedule.push(obj)
                                        }
                                    }
                                })
                            }


                            if (updateobj.schedule.hasOwnProperty("delete")) {
                                updateobj.schedule.delete.map(deleteobj => {
                                    if (deleteobj.hasOwnProperty("laborid")) {
                                        let laborid = deleteobj.laborid;
                                        let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                        if (mylabor) {
                                            let j = construction.getprojectschedulelaborkeybyid.call(this, myproject.project_id, laborid)

                                            myprojects[i].schedule.labor.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("materialid")) {
                                        let materialid = deleteobj.materialid;
                                        let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                        if (mymaterial) {
                                            let j = construction.getprojectschedulematerialkeybyid.call(this, myproject.project_id, materialid)

                                            myprojects[i].schedule.materials.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("equipmentid")) {
                                        let equipmentid = deleteobj.equipmentid;
                                        let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)
                                        console.log(myequipment)
                                        if (myequipment) {
                                            let j = construction.getprojectscheduleequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                            myprojects[i].schedule.equipment.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("csiid")) {
                                        let csiid = deleteobj.csiid;
                                        let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)
                                        if (csi) {
                                            let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                            myprojects[i].schedule.bidschedule.splice(j, 1)
                                        }


                                    }
                                })

                            }


                            if (updateobj.schedule.hasOwnProperty("update")) {
                                updateobj.schedule.update.map(obj => {
                                    if (obj.hasOwnProperty("laborid")) {
                                        let laborid = obj.laborid;
                                        let mylabor = construction.getprojectschedulelaborbyid.call(this, myproject.project_id, laborid)

                                        if (mylabor) {
                                            let j = construction.getprojectschedulelaborkeybyid.call(this, myproject.project_id, laborid)

                                            myprojects[i].schedule.labor[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("materialid")) {
                                        let materialid = obj.materialid;
                                        let mymaterial = construction.getprojectschedulematerialbyid.call(this, myproject.project_id, materialid)

                                        if (mymaterial) {
                                            let j = construction.getprojectschedulematerialkeybyid.call(this, myproject.project_id, materialid)

                                            myprojects[i].schedule.materials[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("equipmentid")) {
                                        let equipmentid = obj.equipmentid;
                                        let myequipment = construction.getprojectscheduleequipmentbyid.call(this, myproject.project_id, equipmentid)

                                        if (myequipment) {
                                            let j = construction.getprojectscheduleequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                            myprojects[i].schedule.equipment[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("csiid")) {

                                        let csiid = obj.csiid;
                                        let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)

                                        if (csi) {
                                            let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                            myprojects[i].schedule.bidschedule[j] = obj;
                                        }

                                    }
                                })
                            }


                        } // end of schedule


                        // start of actual 
                        if (updateobj.hasOwnProperty("actual")) {

                            if (updateobj.actual.hasOwnProperty("insert")) {
                                updateobj.actual.insert.map(obj => {
                                    if (obj.hasOwnProperty("laborid")) {

                                        let laborid = obj.laborid;
                                        let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                        if (!mylabor) {
                                            myprojects[i].actual.labor.push(obj)
                                        }

                                    } else if (obj.hasOwnProperty("materialid")) {

                                        let materialid = obj.materialid;
                                        let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                        if (!mymaterial) {
                                            myprojects[i].actual.materials.push(obj)
                                        }



                                    } else if (obj.hasOwnProperty("equipmentid")) {


                                        let equipmentid = obj.equipmentid;
                                        let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)

                                        if (!myequipment) {
                                            myprojects[i].actual.equipment.push(obj)
                                        }

                                    } else if (obj.hasOwnProperty("csiid")) {
                                        let csiid = obj.csiid;
                                        let csi = construction.getprojectbidactualbyid.call(this, project_id, csiid)

                                        if (!csi) {
                                            myprojects[i].actual.bid.push(obj)
                                        }
                                    }
                                })
                            }


                            if (updateobj.actual.hasOwnProperty("delete")) {
                                updateobj.actual.delete.map(deleteobj => {
                                    if (deleteobj.hasOwnProperty("laborid")) {
                                        let laborid = deleteobj.laborid;
                                        let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                        if (mylabor) {
                                            let j = construction.getprojectactuallaborkeybyid.call(this, myproject.project_id, laborid)

                                            myprojects[i].actual.labor.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("materialid")) {
                                        let materialid = deleteobj.materialid;
                                        let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                        if (mymaterial) {
                                            let j = construction.getprojectactualmaterialkeybyid.call(this, myproject.project_id, materialid)

                                            myprojects[i].actual.materials.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("equipmentid")) {
                                        let equipmentid = deleteobj.equipmentid;
                                        let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)
                                        console.log(myequipment)
                                        if (myequipment) {
                                            let j = construction.getprojectactualequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                            myprojects[i].actual.equipment.splice(j, 1)
                                        }

                                    } else if (deleteobj.hasOwnProperty("csiid")) {
                                        let csiid = deleteobj.csiid;
                                        let csi = construction.getprojectbidschedulebyid.call(this, project_id, csiid)
                                        if (csi) {
                                            let j = construction.getprojectbidschedulekeybyid.call(this, project_id, csiid)
                                            myprojects[i].schedule.bidschedule.splice(j, 1)
                                        }


                                    }
                                })

                            }


                            if (updateobj.actual.hasOwnProperty("update")) {
                                updateobj.actual.update.map(obj => {
                                    if (obj.hasOwnProperty("laborid")) {
                                        let laborid = obj.laborid;
                                        let mylabor = construction.getprojectactuallaborbyid.call(this, myproject.project_id, laborid)

                                        if (mylabor) {
                                            let j = construction.getprojectactuallaborkeybyid.call(this, myproject.project_id, laborid)

                                            myprojects[i].actual.labor[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("materialid")) {
                                        let materialid = obj.materialid;
                                        let mymaterial = construction.getprojectactualmaterialbyid.call(this, myproject.project_id, materialid)

                                        if (mymaterial) {
                                            let j = construction.getprojectactualmaterialkeybyid.call(this, myproject.project_id, materialid)

                                            myprojects[i].actual.materials[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("equipmentid")) {
                                        let equipmentid = obj.equipmentid;
                                        let myequipment = construction.getprojectactualequipmentbyid.call(this, myproject.project_id, equipmentid)

                                        if (myequipment) {
                                            let j = construction.getprojectactualequipmentkeybyid.call(this, myproject.project_id, equipmentid)

                                            myprojects[i].actual.equipment[j] = obj
                                        }

                                    } else if (obj.hasOwnProperty("csiid")) {

                                        let csiid = obj.csiid;
                                        let csi = construction.getprojectbidactualbyid.call(this, project_id, csiid)

                                        if (csi) {
                                            let j = construction.getprojectbidactualkeybyid.call(this, project_id, csiid)
                                            myprojects[i].actual.bid[j] = obj;
                                        }

                                    }
                                })
                            }


                        } // end of actual



                    } // if there is a response
                    let message = "";
                    if (response.hasOwnProperty("text")) {
                        message = response.text;
                    }

                    this.props.reduxMyProjects(myprojects)
                    this.setState({ message, schedule: Math.random(), actual: Math.random(), bidschedule: Math.random(), bid: Math.random() })


                } // end my project



            } else if (response.type === "pm") {

                if (response.hasOwnProperty("myproject")) {



                    let myprojects = construction.getOurProjects.call(this)

                    let myproject = this.getOurProject();

                    if (myproject) {

                        let i = construction.getOurProjectKeyById.call(this, myproject.project_id)

                        myprojects[i].milestones = response.myproject.milestones;
                        myprojects[i].team = response.myproject.team
                        this.props.reduxMyProjects(myprojects)
                        this.setState({ message: response.text })


                    }





                }



            }


        } // end of socket message

        socket.onerror = (evt) => {
            console.log("SOMETHING WENT WRONG!");
            console.log(evt);
        };

        socket.onclose = (evt) => {
            console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
        };

        let websockets = construction.getProjectSockets.call(this)
        if (websockets) {

            websockets.push({ projectid, socket })
        } else {
            websockets = [{ projectid, socket }]
        }

        this.props.reduxProjectSockets(websockets)


        this.setState({ render: 'render' })






    } // end of component did mount 


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    getOurProject() {
        const construction = new Construction();
        const getproject = this.getproject();
        const project_id = getproject.Project_ID;

        const ourproject = construction.getOurProjectByID.call(this, project_id)

        return ourproject;
    }
    getproject() {
        const construction = new Construction();
        const projectid = this.props.match.params.projectid;
        const project = construction.getProjectByID.call(this, projectid)
        return project;

    }
    gettitle() {
        let myproject = this.getproject();
        if (myproject) {
            return (myproject.ProjectID)
        }
    }

    getlocation() {
        let myproject = this.getproject();
        if (myproject) {
            return (`${myproject.Address} ${myproject.City} ${myproject.ProjectState} ${myproject.Zipcode}`)
        }
    }

    getscope() {
        let myproject = this.getproject();
        if (myproject) {
            return (myproject.scope)
        }
    }

    handleNavigation(navigation) {

        if (navigation === this.state.navigation) {
            this.setState({ navigation: false })
        } else {
            this.setState({ navigation })
        }

    }


    Navigation() {
        const navigation = this.state.navigation;
        const styles = MyStylesheet();
        const ourproject = this.getOurProject();
        const project_id = ourproject.project_id;

        switch (navigation) {
            case "schedule":
                return (
                    <div style={{ ...styles.generalContainer, ...styles.addMargin }}><Schedule schedule={this.state.schedule} projectid={this.props.match.params.projectid} project_id={project_id} key={Math.random()} /> </div>)
            case "bidschedule":
                return (<div style={{ ...styles.generalContainer, ...styles.addMargin }}><BidSchedule bidschedule={this.state.bidschedule} project_id={project_id} key={Math.random()} /></div>)
            case "bid":
                return (<div style={{ ...styles.generalContainer, ...styles.addMargin }}><Bid bid={this.state.bid} project_id={project_id} key={Math.random()} /></div>)
            case "actual":
                return (<div style={{ ...styles.generalContainer, ...styles.addMargin }}><Actual actual={this.state.actual} project_id={project_id} key={Math.random()} /></div>)
            default:
                return (this.showProject())
        }
    }

    showProject() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>



            <div style={{ ...styles.generalContainer }}>
                Title: {this.gettitle()}
            </div>
            <div style={{ ...styles.generalContainer }}>
                Location: {this.getlocation()}
            </div>
            <div style={{ ...styles.generalContainer }}>
                Scope: {this.getscope()}
            </div>


            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <a onClick={() => { this.handleNavigation("schedule") }}
                                style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /schedule
                            </a>
                        </div>

                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <a onClick={() => { this.handleNavigation("bidschedule") }}>
                                /bidschedule
                            </a>
                        </div>
                    </div>






                </div>

                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <a style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}
                                onClick={() => { this.handleNavigation("actual") }}>
                                /actual
                            </a>
                        </div>

                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <a style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}
                                onClick={() => { this.handleNavigation("bid") }}>
                                /bid
                            </a>
                        </div>
                    </div>



                </div>
            </div>
        </div>)
    }

    async saveMyProject() {

        const construction = new Construction();
        try {

            let myprojects = construction.getOurProjects.call(this)

            const myproject = this.getOurProject();


            if (myproject) {
                const i = construction.getOurProjectKeyById.call(this, myproject.project_id)
                const project_id = myproject.project_id;
                const getproject = construction.getProjectBy_ID.call(this, project_id)
                const projectsocket = construction.getProjectSocketByID.call(this, getproject.ProjectID)
                const socket = projectsocket.socket;
                const payload = JSON.stringify({ type: "construction", myproject });
                socket.send(payload)
                // const savemyproject = await SaveMyProject(this.props.project_id, myproject);
                // console.log(savemyproject)
                //     if(savemyproject.hasOwnProperty("myproject")) {
                // myprojects[i]= savemyproject.myproject;
                // this.props.reduxMyProjects(myprojects)

                //  }



            }


        } catch (err) {
            alert(`Could not save my Project ${err}`)
        }
    }



    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const saveprojecticon = construction.getsaveprojecticon.call(this);
        if (myuser) {

            const company = construction.getcompany.call(this)
            if (company) {

                const project = this.getproject()
                if (project) {
                    const projectid = project.ProjectID;
                    return (

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <a style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { this.handleNavigation("default") }}
                                    > /{project.ProjectID}</a>
                                </div>


                                {this.Navigation()}

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <span style={{ ...regularFont }}>{this.state.message}</span>
                                </div>


                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <button style={{ ...styles.generalButton, ...saveprojecticon }} onClick={() => { this.saveMyProject() }}>{saveProjectIcon()}</button>
                                </div>




                            </div>
                        </div>



                    )

                } else {
                    return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found</span>
                    </div>)

                }


            } else {

                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Company Not Found </span>
                </div>)

            }





        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Project </span>
            </div>)
        }
    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        mycompany: state.mycompany,
        myprojects: state.myprojects,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        allprojects: state.allprojects,
        projectsockets: state.projectsockets
    }
}

export default connect(mapStateToProps, actions)(Project);