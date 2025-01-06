
import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeOut from './scheduletimeoutcalender';
class TimeOut {

    
    handleminutes(minutes) {
     
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout.timeoutminutes = minutes
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {

      
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

              

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                
                if (minutes.length === 2) {

                    if (validateMinutes(minutes)) {


                        if (active === 'labor') {


                            if (activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this,  this.props.projectnavigation.schedule.activelaborid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }



                        } else if (active === 'equipment') {

                            if (activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this,  this.props.projectnavigation.schedule.activeequipmentid)
                                if (myequipment) {

                                    if (myequipment) {
                                        const j = construction.getscheduleequipmentkeybyid.call(this,  myequipment.equipmentid)
                                        let day = projectnavigation.schedule.timeout.timeoutday;
                                        let year = projectnavigation.schedule.timeout.timeoutyear;
                                        let month = projectnavigation.schedule.timeout.timeoutmonth;
                                        let hours = projectnavigation.schedule.timeout.timeouthours;
                                        let time = projectnavigation.schedule.timeout.timeoutampm;
                                        let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                        timeout = UTCTimeStringfromTime(timeout);
                                        myprojects[i].schedule.equipment[j].timeout = timeout;
                                        this.props.reduxMyProjects(myprojects)
                                        this.setState({ render: 'render' })
                                    }

                                }
                            }

                        }

                    } else {
                        alert(`Invalid minute format ${minutes}`)
                    }
                }
            }
        }

    }

    handlehours(hours) {
     
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout.timeouthours = hours
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (hours.length === 2) {
                    if (validateMonth(hours)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {


                            if (activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this,  this.props.projectnavigation.schedule.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getscheduleequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.equipment[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })

                                }
                            }
                        }

                    } else {
                        alert(`Invalid hours ${hours}`)

                    }

                }

            }
        }
    }

    handleyear(year) {
  
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout.timeoutyear = year
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (year.length === 4) {

                    if (validateYear(year)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, this.props.projectnavigation.schedule.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {

                            if (activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this, myequipment.equipmentid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.equipment[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Year Format ${year}`)
                    }
                }

            }
        }
    }

    handleday(day) {
        day = day.toString();

        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout.timeoutday = day
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (day.length === 2) {

                    if (validateDate(day)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this,  this.props.projectnavigation.schedule.activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let month = projectnavigation.schedule.timeout.timeoutmonth;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.equipment[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })
                                }
                            }

                        }

                    } else {
                        alert(`Invalid Date Format ${day}`)
                    }
                }

            }
        }
    }

    handlemonth(month) {
       
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.schedule.timeout.timeoutmonth = month
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getschedulelaborbyid.call(this, activelaborid);
                                if (mylabor) {

                                    const j = construction.getschedulelaborkeybyid.call(this, activelaborid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getscheduleequipmentbyid.call(this, this.props.projectnavigation.schedule.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getscheduleequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.schedule.timeout.timeoutday;
                                    let year = projectnavigation.schedule.timeout.timeoutyear;
                                    let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                                    let hours = projectnavigation.schedule.timeout.timeouthours;
                                    let time = projectnavigation.schedule.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].schedule.equipment[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })
                                }

                            }

                        }

                    } else {
                        alert(`invalid month format ${month}`)
                    }

                }

            }
        }
    }

    toggleampm(ampm) {
    

     

        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        
        const timeoutampm = projectnavigation.schedule.timeout.timeoutampm;
        if (timeoutampm === 'am' && ampm === 'pm') {

            projectnavigation.schedule.timeout.timeoutampm = 'pm'

            this.props.reduxProjectNavigation(projectnavigation)
            this.setState({render:'render'})
        } else if (timeoutampm === 'pm' && ampm === 'am') {

             projectnavigation.schedule.timeout.timeoutampm = 'am'
             this.props.reduxProjectNavigation(projectnavigation)
             this.setState({render:'render'})
          
        }

      
        const activelaborid = projectnavigation.schedule.activelaborid;
        const active = projectnavigation.schedule.activecomponent;
        const activematerialid = projectnavigation.schedule.activematerialid;
        const activeequipmentid = projectnavigation.schedule.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);

                if (active === 'labor') {



                    if (activelaborid) {
                        const mylabor = construction.getschedulelaborbyid.call(this,  this.props.projectnavigation.schedule.activelaborid);
                        if (mylabor) {

                            const j = construction.getschedulelaborkeybyid.call(this, this.props.projectnavigation.schedule.activelaborid)
                            let day = projectnavigation.schedule.timeout.timeoutday;
                            let year = projectnavigation.schedule.timeout.timeoutyear;
                            let month = projectnavigation.schedule.timeout.timeoutmonth;
                            let hours = projectnavigation.schedule.timeout.timeouthours;
                            let time = ampm;
                            let minutes =projectnavigation.schedule.timeout.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                      
                            timeout = UTCTimeStringfromTime(timeout);
                            
                            myprojects[i].schedule.labor[j].timeout = timeout;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (active === 'equipment') {

                    if (activeequipmentid) {
                        const myequipment = construction.getscheduleequipmentbyid.call(this,  this.props.projectnavigation.schedule.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getscheduleequipmentkeybyid.call(this,  myequipment.equipmentid)
                            let day = projectnavigation.schedule.timeout.timeoutday;
                            let year = projectnavigation.schedule.timeout.timeoutyear;
                            let month = projectnavigation.schedule.timeout.timeoutmonth;
                            let hours = projectnavigation.schedule.timeout.timeouthours;
                            let minutes = projectnavigation.schedule.timeout.timeoutminutes;
                            let time = ampm
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myprojects[i].schedule.equipment[j].timeout = timeout;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })
                        }
                    }

                }

            }
        }

    }

    showampm() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const timeout = new TimeOut();
        const showam = () => {
            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onClick={() => { timeout.toggleampm.call(this, 'pm') }}>AM</button>
            </div>)

        }
        const showpm = () => {

            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onClick={() => { timeout.toggleampm.call(this, 'am') }}>PM</button>
            </div>)

        }




        if (this.props.projectnavigation.schedule.timeout.timeoutampm === 'am') {
            return showam()
        } else if (this.props.projectnavigation.schedule.timeout.timeoutampm === 'pm') {
            return showpm()
        }


    }

    showtimeout() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const timeout = new TimeOut();
        const calender = new CalenderTimeOut();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Time Out (MM-DD-YYYY HH mm) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.props.projectnavigation.schedule.timeout.timeoutmonth}
                                onChange={event => { timeout.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.schedule.timeout.timeoutday}
                                onChange={event => { timeout.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.schedule.timeout.timeoutyear}
                                onChange={event => { timeout.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.schedule.timeout.timeouthours}
                                onChange={event => { timeout.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.schedule.timeout.timeoutminutes}
                                onChange={event => { timeout.handleminutes.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            {timeout.showampm.call(this)}
                        </div>
                    </div>

                    {calender.showCalenderTimeOut.call(this)}

                </div>
            </div>)
    }

}

export default TimeOut;