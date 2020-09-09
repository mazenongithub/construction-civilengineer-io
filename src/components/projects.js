import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import DynamicStyles from './dynamicstyles';
class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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
            return (styles.font24)
        } else {
            return (styles.font20)
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
    getcompany() {
        let user = this.getuser();
        let company = false;
        if (user) {
            if (user.hasOwnProperty("company")) {
                company = user.company;
            }
        }
        return (company)
    }
    showprojectids() {
        let company = this.getcompany();
        let projectids = [];
        if (company) {
            if (company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                company.projects.myproject.map(myproject => {
                    projectids.push(this.showprojectid(myproject))
                })
            }
        }
        return projectids;
    }
    projectmenus(myproject) {
        const styles = MyStylesheet();
        const companyid = this.props.match.params.companyid;
        const regularFont = this.getRegularFont();
        const providerid = this.props.match.params.providerid;
        const projectid = myproject.projectid;
      
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myproject.projectid}>
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
    showprojectid(myproject) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont =dynamicstyles.getHeaderFont.call(this)
        //const projectid = myproject.projectid;
        const providerid = this.props.match.params.providerid;
        const companyid = this.props.match.params.companyid;

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.alignCenter }}>
                            <Link to={`/${providerid}/company/${companyid}/projects/${myproject.title}`} style={{ ...styles.generalLink, ...headerFont, ...styles.boldFont, ...styles.generalFont }}>
                              {myproject.title}
                            </Link>
                        </div>
                    </div>

                    {this.projectmenus(myproject)}
                </div>
            </div>


        )

    }
    render() {
        const styles = MyStylesheet();

        
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const company = () => {
            if(myuser.hasOwnProperty("company")) {
                return(myuser.company.url)
            }
        }
        if(myuser) {

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1,  ...styles.alignCenter }}>
                        <span style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.boldFont }}> /{company()}</span> <br/>
                        <span style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.boldFont }}> projects</span> <br/>
                         </div>
                    </div>


                    {this.showprojectids()}

                </div>
            </div>
        )
        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Projects </span>
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Projects);