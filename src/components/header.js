import React from 'react'
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles'
import { Link } from 'react-router-dom';

class Header {

    showactiveproject(myuser) {
        const dynamicstyles = new DynamicStyles();
        const navigation = dynamicstyles.getNavigation.call(this)
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const header = new Header()
        if (navigation.hasOwnProperty("project")) {

            const project = dynamicstyles.getprojectbyid.call(this, navigation.project.projectid)
            if (project) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                            onClick={() => { header.handleHeader.call(this, { projectid: project.projectid }) }}
                            style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{project.title}</Link>
                    </div>)
            }
        }
    }

    handleHeader(obj) {
        const dynamicstyles = new DynamicStyles();
        const navigation = dynamicstyles.getNavigation.call(this)
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
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const headerFont = dynamicstyles.getHeaderFont.call(this)

        const header = new Header();

        if (myuser) {


            const company = (myuser) => {
                if (myuser.hasOwnProperty("company")) {
                    return (
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link onClick={() => { header.handleHeader.call(this, { companyid: myuser.company.companyid }) }} to={`/${myuser.profile}/company/${myuser.company.url}`}
                                style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                            >/{myuser.company.url}</Link>
                        </div>)
                }
            }

            return (<div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <Link to={`/${myuser.profile}/profile`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{myuser.profile}</Link>
                </div>
                {company(myuser)}
                
            

            </div>)
        }
    }

}

export default Header;