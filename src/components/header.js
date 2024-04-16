import React from 'react'
import { MyStylesheet } from './styles'
import Construction from './construction'
import { Link } from 'react-router-dom';

class Header {

    showactiveproject(myuser) {
        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const header = new Header()
        if (navigation.hasOwnProperty("project")) {

            const project = construction.getprojectbyid.call(this, navigation.project.projectid)
            if (project) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link to={`/${myuser.UserID}/company/${myuser.company.url}/projects/${project.title}`}
                            onClick={() => { header.handleHeader.call(this, { projectid: project.projectid }) }}
                            style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{project.title}</Link>
                    </div>)
            }
        }
    }

    handleHeader(obj) {
        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        if (obj.hasOwnProperty("companyid")) {
            if (navigation.hasOwnProperty("project")) {
                delete navigation.project;
            }

            navigation.company = {};
            navigation.company.companyid = obj.companyid;
            if (obj.hasOwnProperty("active")) {
                navigation.company.active = obj.active
            }


        }

        if (obj.hasOwnProperty("projectid")) {
            navigation.project = {}
            navigation.project.projectid = obj.projectid;
            if (obj.hasOwnProperty("active")) {
                navigation.project.active = obj.active;
            } else {
                delete navigation.project.active
            }
        }
        this.props.reduxNavigation(navigation)
        this.setState({ render: 'render' })


    }




    showHeader() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)

        const header = new Header();

        if (myuser) {


            const company = (myuser) => {
                if (myuser.hasOwnProperty("company")) {
                    return (
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link onClick={() => { header.handleHeader.call(this, { companyid: myuser.company.companyid }) }} to={`/${myuser.UserID}/company/${myuser.company.url}`}
                                style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                            >/{myuser.company.url}</Link>
                        </div>)
                }
            }

            return (<div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <Link to={`/${myuser.UserID}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{myuser.UserID}</Link>
                </div>
                {company(myuser)}
                
            

            </div>)
        }
    }

}

export default Header;