import React from 'react';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import Construction from './construction';
class Projects {


    showprojectids() {
        const construction = new Construction();
        const projects = new Projects()
        const myprojects = construction.getmyprojects.call(this)

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
        const construction = new Construction();

        const regularFont = construction.getRegularFont.call(this)

        const projectid = myproject.title
        const myuser = construction.getuser.call(this)
        if (myuser) {
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
                                    <Link to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /bid
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
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)

        const projects = new Projects();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myproject.projectid}>
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
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const projects = new Projects();
      
        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

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