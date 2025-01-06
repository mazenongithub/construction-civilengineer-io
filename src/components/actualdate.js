import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './actualdatecalender'
import { validateMonth, validateDate, validateYear } from './functions';


class MaterialDate {


    handleyear(year) {



        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.actual.materialdate.materialdateyear = year;
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {
            const project_id = this.props.project_id;
            const myproject = construction.getOurProjectByID.call(this, project_id)
            if (myproject) {



                const i = construction.getOurProjectKeyById.call(this, project_id);
                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.props.projectnavigation.actual.activematerialid) {
                            const mymaterial = construction.getactualmaterialbyid.call(this, this.props.projectnavigation.actual.activematerialid);
                            if (mymaterial) {

                                const j = construction.getactualmaterialkeybyid.call(this, this.props.projectnavigation.actual.activematerialid)
                                let day = this.props.projectnavigation.actual.materialdateday;
                                let month = this.props.projectnavigation.actual.materialdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myprojects[i].actual.materials[j].timein = timein;
                                this.props.reduxMyProjects(myprojects)
                                this.setState({ render: 'render' })


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }


                }

            }
        }
    }

    handleday(day) {
        day = day.toString();
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.actual.materialdate.materialdateday = day;
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })


        const myprojects = construction.getOurProjects.call(this)

        if (myprojects) {

            const project_id = this.props.project_id

            const myproject = construction.getOurProjectByID.call(this, this.props.project_id)
            if (myproject) {




                const i = construction.getOurProjectKeyById.call(this, project_id);
                if (day.length === 2) {


                    if (validateDate(day)) {

                        if (this.props.projectnavigation.actual.activematerialid) {
                            const mymaterial = construction.getactualmaterialbyid.call(this, this.props.projectnavigation.actual.activematerialid);
                            if (mymaterial) {

                                const j = construction.getactualmaterialkeybyid.call(this, this.props.projectnavigation.actual.activematerialid)
                                let year = this.props.projectnavigation.actual.materialdateyear;
                                let month = this.props.projectnavigation.actual.materialdatemonth;
                                const timein = `${year}-${month}-${day}`
                                myprojects[i].actual.materials[j].timein = timein;
                                this.props.reduxMyProjects(myprojects)
                                this.setState({ render: 'render' })


                            }

                        }



                    } else {
                        alert(`Invalid day format ${day}`)
                    }

                }

            }
        }
    }

    handlemonth(month) {


        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.actual.materialdate.materialdatemonth = month;
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({ render: 'render' })

        const myprojects = construction.getOurProjects.call(this)
        if (myprojects) {
            const project_id = this.props.project_id
            const myproject = construction.getOurProjectByID.call(this, this.props.project_id)
            if (myproject) {



                const i = construction.getOurProjectKeyById.call(this, project_id);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (this.state.activecomponent === 'materials') {



                            if (this.props.projectnavigation.actual.activematerialid) {
                                const mymaterial = construction.getactualmaterialbyid.call(this, this.props.projectnavigation.actual.activematerialid);
                                if (mymaterial) {

                                    const j = construction.getactualmaterialkeybyid.call(this, this.props.projectnavigation.actual.activematerialid)
                                    let day = this.props.projectnavigation.actual.materialdateday;
                                    let year = this.props.projectnavigation.actual.materialdateyear;
                                    const timein = `${year}-${month}-${day}`
                                    myprojects[i].actual.materials[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        }

                    } else {
                        alert(`Invalid month format ${month}`)
                    }

                }

            }
        }
    }

    getMonth() {
        const construction = new Construction();
        let month = "";
        const projectnavigation = construction.getProjectNavigation.call(this)
        if (projectnavigation) {
            if (projectnavigation.actual) {
                if (projectnavigation.actual.materialdate) {
                    month = projectnavigation.actual.materialdate.materialdatemonth;
                }
            }
        }

        return month;


    }

    getDay() {

        const construction = new Construction();

        let day = "";
        const projectnavigation = construction.getProjectNavigation.call(this)
        if (projectnavigation) {
            if (projectnavigation.actual) {
                if (projectnavigation.actual.materialdate) {
                    day = projectnavigation.actual.materialdate.materialdateday;
                }
            }
        }

        return day;

    }

    getYear() {

        const construction = new Construction();

        let year = "";
        const projectnavigation = construction.getProjectNavigation.call(this)
        if (projectnavigation) {
            if (projectnavigation.actual) {
                if (projectnavigation.actual.materialdate) {
                    year = projectnavigation.actual.materialdate.materialdateyear;
                }
            }
        }

        return year;

    }





    showmaterialdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const materialdate = new MaterialDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Material Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={materialdate.getMonth.call(this)}
                                onChange={event => { materialdate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={materialdate.getDay.call(this)}
                                onChange={event => { materialdate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={materialdate.getYear.call(this)}
                                onChange={event => { materialdate.handleyear.call(this, event.target.value) }} />
                        </div>


                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default MaterialDate;