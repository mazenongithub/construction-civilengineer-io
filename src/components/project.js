import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import DynamicStyles from './dynamicstyles'
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '' }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
            
        this.updateWindowDimensions();
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid)
        if(myproject) {
       
            this.props.reduxProject({ projectid: myproject.projectid})
        }
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
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/proposals`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /proposals
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
                                    <Link to={`/${providerid}/company/${companyid}/projects/${projectid}/invoices`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /invoices
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
        const dynamicstyles = new DynamicStyles();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
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

                  

                    </div>
                </div>
            )
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