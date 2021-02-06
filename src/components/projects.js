import React from 'react';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import DynamicStyles from './dynamicstyles';
class Projects {

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
        const dynamicstyles = new DynamicStyles();
        const projects = new Projects()
        const myprojects = dynamicstyles.getmyprojects.call(this)

        let projectids = [];
        if (myprojects) {

            // eslint-disable-next-line
            myprojects.map(myproject => {
                projectids.push(projects.showprojectid.call(this, myproject))
            })

        }
        return projectids;
    }
    projectmenus(myproject) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
  
        const regularFont = dynamicstyles.getRegularFont.call(this)
     
        const projectid = myproject.title
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {
        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myproject.projectid}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /schedule
                                    </Link>
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/proposals`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /proposals
                                    </Link>
                            </div>
                        </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bidschedule
                                 </Link>
                            </div>
                        </div>

                    </div>

                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/actual`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /actual
                                    </Link>
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/invoices`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /invoices
                                    </Link>
                            </div>
                        </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /bid
                                    </Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/milestones`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    /milestones
                                    </Link>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>)

        }

    }
    showprojectid(myproject) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
    
        const projects = new Projects();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if(myuser.hasOwnProperty("company")) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.alignCenter }}>
                                <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${myproject.title}`} style={{ ...styles.generalLink, ...headerFont, ...styles.boldFont, ...styles.generalFont }}>
                                    {myproject.title}
                                </Link>
                            </div>
                        </div>

                        {projects.projectmenus.call(this, myproject)}
                    </div>
                </div>


            )

            }

        }

    }
    showprojects() {
        const styles = MyStylesheet();


        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const projects = new Projects();
        const company = () => {
            if (myuser.hasOwnProperty("company")) {
                return (myuser.company.url)
            }
        }
        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.boldFont }}> /{company()}</span> <br />
                                <span style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.boldFont }}> projects</span> <br />
                            </div>
                        </div>


                        {projects.showprojectids.call(this)}

                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Projects </span>
            </div>)
        }
    }
}


export default Projects