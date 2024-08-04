import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './scheduledatecalender'
import { validateMonth, validateDate, validateYear } from './functions';


class MaterialDate {


    handleyear(year) {
        this.setState({ materialdateyear: year })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            const project_id = this.props.project_id;
            const myproject = construction.getOurProjectByID.call(this, project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,project_id);
                if (year.length === 4) {

                    if(validateYear(year)) {


                        if (this.state.activematerialid) {
                            const mymaterial = construction.getschedulematerialbyid.call(this,  this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getschedulematerialkeybyid.call(this,  this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`

                                myprojects[i].schedule.materials[j].timein = timein;
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
        this.setState({ materialdateday: day })
        const construction = new Construction();
        
        const myprojects = construction.getOurProjects.call(this)
        
        if(myprojects) {

            const project_id = this.props.project_id

            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                
                

                const i = construction.getOurProjectKeyById.call(this,project_id);
                if (day.length === 2) {

            
                        if(validateDate(day)) {

                        if (this.state.activematerialid) {
                            const mymaterial = construction.getschedulematerialbyid.call(this,  this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getschedulematerialkeybyid.call(this,this.state.activematerialid)
                                let year = this.state.materialdateyear;
                                let month = this.state.materialdatemonth;
                                const timein = `${year}-${month}-${day}`
                                myprojects[i].schedule.materials[j].timein = timein;
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
        this.setState({ materialdatemonth: month })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            const project_id = this.props.project_id
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

              

                const i = construction.getOurProjectKeyById.call(this,project_id);
                if (month.length === 2) {

                    if(validateMonth(month)) {

                    if (this.state.active === 'materials') {



                        if (this.state.activematerialid) {
                            const mymaterial = construction.getschedulematerialbyid.call(this,  this.state.activematerialid);
                            if (mymaterial) {

                                const j = construction.getschedulematerialkeybyid.call(this,  this.state.activematerialid)
                                let day = this.state.materialdateday;
                                let year = this.state.materialdateyear;
                                const timein = `${year}-${month}-${day}`
                                myprojects[i].schedule.materials[j].timein = timein;
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

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.materialdatemonth}
                                onChange={event => { materialdate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.materialdateday}
                                onChange={event => { materialdate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.materialdateyear}
                                onChange={event => { materialdate.handleyear.call(this, event.target.value) }} />
                        </div>
                        
                       
                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default MaterialDate;