import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { FindProject } from './actions/api';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import Construction from './construction'
import Schedule from './schedule'
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '', navigation: "default" }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);

        this.updateWindowDimensions();
        const construction = new Construction();
        const projectid = this.props.match.params.projectid;
        const userid = this.props.match.params.providerid;
        const socket = new WebSocket(`ws://localhost:8081/projects/${projectid}/websocketapi`)

        socket.onopen = (evt) => {

            const data = { type: "join", userid };
            socket.send(JSON.stringify(data));
            console.log("Project Web Socket Open")

        }

        socket.onmessage = (evt) => {
            const response = JSON.parse(evt.data);
            console.log(response)
            if (response.type === "join") {



                if (response.hasOwnProperty("myproject")) {
                    let getproject = response.myproject;
                    let project_id = getproject.project_id;
                    let OurProjects = construction.getOurProjects.call(this)

                    const findproject = construction.getOurProjectByID.call(this, project_id)

                    if (findproject) {
                        const i = construction.getOurProjectKeyById.call(this, project_id)
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

            } // end if type is join

        } // end of socket message

        socket.onerror = (evt) => {
            console.log("SOMETHING WENT WRONG!");
            console.log(evt);
        };

        socket.onclose = (evt) => {
            console.log("WEB SOCKET HAS BEEN CLOSED!!!!");
        };

        this.props.reduxWebSockets({ projectid, socket })


        this.setState({ render: 'render' })



    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async loadProject() {

        const construction = new Construction();

        try {
            const projectid = this.props.match.params.projectid;
            let getproject = await FindProject(projectid)
            console.log(getproject)

            if (getproject.hasOwnProperty("myproject")) {


            }









        }

         catch(err) {
        alert(`Could not find project ${err}`)
    }


}


getOurProject() {
    const construction = new Construction();
    const getproject = this.getproject();
    const project_id = getproject._ID;
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
            <div style={{...styles.generalContainer, ...styles.addMargin}}><Schedule project_id={project_id} /> </div>)
        case "bidschedule":
            return (<div>Bid Schedule</div>)
        case "bid":
            return (<div>Bid</div>)
        case "actual":
            return (<div>Actual</div>)
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


render() {
    const styles = MyStylesheet();
    const construction = new Construction();
    const regularFont = construction.getRegularFont.call(this)
    const myuser = construction.getuser.call(this)
    const headerFont = construction.getHeaderFont.call(this)
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
        websockets:state.websockets
    }
}

export default connect(mapStateToProps, actions)(Project);