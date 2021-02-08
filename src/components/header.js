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
            if (navigation.hasOwnProperty("projectid")) {
                delete navigation.projectid;
                navigation.companyid = obj.companyid;

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

    showactiveprojectcomponent(myuser) {
        const dynamicstyles = new DynamicStyles();
        const header = new Header();
        const navigation = dynamicstyles.getNavigation.call(this)
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        if (navigation.hasOwnProperty("project")) {
            const project = dynamicstyles.getprojectbyid.call(this, navigation.project.projectid)
            if (project) {
                if (navigation.project.hasOwnProperty("active")) {
                    switch (navigation.project.active) {
                        case 'schedule':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'schedule' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/schedule`}
                                    > /schedule </Link>
                                </div>)

                        case 'actual':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'actual' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/actual`}
                                    > /actual</Link>
                                </div>)
                        case 'proposals':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'proposals' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/proposals`}
                                    > /proposals</Link>
                                </div>)
                        case 'bid':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'bid' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/bid`}
                                    > /bid</Link>
                                </div>)

                        case 'bidschedule':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'bidschedule' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/bidschedule`}
                                    > /bidschedule</Link>
                                </div>)
                        case 'invoices':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'invoices' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/invoices`}
                                    > /invoices</Link>
                                </div>)

                        case 'estimate':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'estimate' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/estimate`}
                                    > /estimate</Link>
                                </div>)

                        case 'milestones':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'milestones' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/milestones`}
                                    > /milestones</Link>
                                </div>)

                        case 'specifications':
                            return (
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                        onClick={() => { header.handleHeader.call(this, { projectid: project.projectid, active: 'specifications' }) }}
                                        to={`/${myuser.profile}/company/${myuser.company.companyid}/projects/${project.title}/specifications`}
                                    > /specifications</Link>
                                </div>)

                        default:
                            return;
                    }
                }
            }
        }
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
                {header.showactiveproject.call(this, myuser)}
                {header.showactiveprojectcomponent.call(this, myuser)}

            </div>)
        }
    }

}

export default Header;