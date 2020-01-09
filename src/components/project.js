import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

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

    projectmenus() {
        const styles = MyStylesheet();
        const companyid = this.props.match.params.companyid;
        const regularFont = this.getRegularFont();
        const providerid = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid
        if (this.state.width > 800) {
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
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulelabor`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /schedulelabor
                                    </Link>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/scheduleequipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /scheduleequipment
                                    </Link>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulematerials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /schedulematerials
                                    </Link>
                                </div>
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
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actual
                                    </Link>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulelabor`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actuallabor
                                    </Link>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/scheduleequipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actualequipment
                                    </Link>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulematerials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actualmaterials
                                    </Link>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /bid
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>)

        } else {
            return (

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /schedule
                                    </Link>
                                </div>

                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulelabor`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /schedulelabor
                                         </Link>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/scheduleequipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /scheduleequipment
                                        </Link>
                                    </div>
                                </div>

                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulematerials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /schedulematerials
                                        </Link>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /bidschedule
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actual
                                    </Link>
                                </div>

                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulelabor`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /actuallabor
                                        </Link>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/scheduleequipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /actualequipment
                                        </Link>
                                    </div>
                                </div>

                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/schedulematerials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /actualmaterials
                                        </Link>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                        <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                            /bid
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            )

        }
    }
    getproject() {
        let projectid = this.props.match.params.projectid;
        let myprojects = false;
        let myuser = this.getuser();
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("projects")) {
                    // eslint-disable-next-line
                    myuser.company.projects.myproject.map(myproject => {
                        if (myproject.projectid === projectid) {
                            myprojects = myproject;
                        }
                    })
                }
            }
        }
        return myprojects;
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
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.projectid}
                        </div>
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

                    {this.projectmenus()}

                </div>
            </div>
        )
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

export default connect(mapStateToProps, actions)(Project);