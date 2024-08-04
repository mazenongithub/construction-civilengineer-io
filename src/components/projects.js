import React from 'react';
import { MyStylesheet } from './styles';
import { Link } from 'react-router-dom';
import { goToIcon } from './svg';
import Construction from './construction';
class Projects {


    showprojectids() {
        const construction = new Construction();
        const projects = new Projects()
        const myprojects = construction.getAllProjects.call(this)

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

        const projectid = myproject.ProjectID
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const company = construction.getcompany.call(this)
            if(company) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myproject.projectid}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${myuser.UserID}/company/${company.companyid}/projects/${projectid}/schedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /schedule
                                    </Link>
                                </div>

                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${myuser.UserID}/company/${company.companyid}/projects/${projectid}/bidschedule`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /bidschedule
                                    </Link>
                                </div>
                            </div>
                         


                        </div>

                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${myuser.UserID}/company/${company.companyid}/projects/${projectid}/actual`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /actual
                                    </Link>
                                </div>

                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${myuser.UserID}/company/${company.companyid}/projects/${projectid}/bid`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
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

    }

   

    showprojectid(myproject) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)

        const projects = new Projects();
        const myuser = construction.getuser.call(this)

        const buttonSize = () => {
            if (this.state.width > 1200) {
                return ({ width: '60px' })

            } else if (this.state.width > 600) {
                return ({ width: '50px' })

            } else {
                return ({ width: '40px' })

            }
        }


        if (myuser) {
            const company = construction.getcompany.call(this)
            if (company) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={myproject.projectid}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont}}>
                                    <Link to={`/${myuser.UserID}/company/${company.companyid}/projects/${myproject.ProjectID}`} style={{ ...styles.generalLink, ...headerFont, ...styles.boldFont, ...styles.generalFont }}>
                                       <button style={{...styles.generalButton, ...buttonSize()}}>{goToIcon()}</button> /{myproject.ProjectID} {myproject.Title}
                                    </Link>
                                </div>
                            </div>
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