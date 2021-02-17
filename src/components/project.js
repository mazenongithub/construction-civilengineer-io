import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import Construction from './construction'
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);

        this.updateWindowDimensions();
        const construction = new Construction();
        const myproject = construction.getprojectbytitle.call(this, this.props.match.params.projectid)
        if (myproject) {

            this.props.reduxProject({ projectid: myproject.projectid })
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    projectmenus() {
        const styles = MyStylesheet();
        const companyid = this.props.match.params.companyid;
        const regularFont = this.getRegularFont();
        const providerid = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid

        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /schedule
                                    </Link>
                            </div>

                        </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bidschedule
                                    </Link>
                            </div>
                        </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bidschedule
                                 </Link>
                            </div>
                        </div>

                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/actual`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /actual
                                    </Link>
                            </div>

                        </div>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bid
                                    </Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bid
                                    </Link>
                            </div>
                        </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/milestones`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /milestones
                                    </Link>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>)



    }
    getproject() {
        const construction = new Construction();
        return construction.getprojectbytitle.call(this, this.props.match.params.projectid)

    }
    gettitle() {
        let myproject = this.getproject();
        if (myproject) {
            return (myproject.title)
        }
    }

    getlocation() {
        let myproject = this.getproject();
        if (myproject) {
            return (`${myproject.address} ${myproject.city} ${myproject.projectstate} ${myproject.zipcode}`)
        }
    }

    getscope() {
        let myproject = this.getproject();
        if (myproject) {
            return (myproject.scope)
        }
    }


    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        if (myuser) {
            const project = this.getproject()
            if (project) {
                const projectid = project.title
                return (

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                                > /{project.title}</Link>
                            </div>


                            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                <div style={{ ...styles.generalContainer }}>
                                    Title: {this.gettitle()}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Location: {this.getlocation()}
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    Scope: {this.getscope()}
                                </div>
                            </div>




                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>

                                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                            <Link to={`/${myuser.profile}/company/${myuser.company.url}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                                /schedule
                                    </Link>
                                        </div>

                                    </div>

                                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                            <Link to={`/${myuser.profile}/company/${myuser.company.url}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                                /bidschedule
                                    </Link>
                                        </div>
                                    </div>

                    




                                </div>

                                <div style={{ ...styles.flex1 }}>

                                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                            <Link to={`/${myuser.profile}/company/${myuser.company.url}/projects/${projectid}/actual`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                                /actual
                                    </Link>
                                        </div>

                                    </div>

                                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                            <Link to={`/${myuser.profile}/company/${myuser.company.url}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                                /bid
                                    </Link>
                                        </div>
                                    </div>

                

                                </div>
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
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Project </span>
            </div>)
        }
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

export default connect(mapStateToProps, actions)(Project);