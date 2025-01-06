
import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeOut from './actualtimeoutcalender';
class TimeOut {

    
    handleminutes(minutes) {
     
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.actual.timeout.timeoutminutes = minutes
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {

      
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

              

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                
                if (minutes.length === 2) {

                    if (validateMinutes(minutes)) {


                        if (active === 'labor') {


                            if (activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.props.projectnavigation.actual.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this,  this.props.projectnavigation.actual.activelaborid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }



                        } else if (active === 'equipment') {

                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {

                                    if (myequipment) {
                                        const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                        let day = projectnavigation.actual.timeout.timeoutday;
                                        let year = projectnavigation.actual.timeout.timeoutyear;
                                        let month = projectnavigation.actual.timeout.timeoutmonth;
                                        let hours = projectnavigation.actual.timeout.timeouthours;
                                        let time = projectnavigation.actual.timeout.timeoutampm;
                                        let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                        timeout = UTCTimeStringfromTime(timeout);
                                        myprojects[i].actual.equipment[j].timeout = timeout;
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
        projectnavigation.actual.timeout.timeouthours = hours
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (hours.length === 2) {
                    if (validateMonth(hours)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.props.projectnavigation.actual.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.props.projectnavigation.actual.activelaborid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {


                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.equipment[j].timeout = timeout;
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
        projectnavigation.actual.timeout.timeoutyear = year
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (year.length === 4) {

                    if (validateYear(year)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.props.projectnavigation.actual.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.props.projectnavigation.actual.activelaborid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {

                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this, myequipment.equipmentid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.equipment[j].timeout = timeout;
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
        projectnavigation.actual.timeout.timeoutday = day
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (day.length === 2) {

                    if (validateDate(day)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this,  this.props.projectnavigation.actual.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.props.projectnavigation.actual.activelaborid)
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let month = projectnavigation.actual.timeout.timeoutmonth;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.equipment[j].timeout = timeout;
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
        projectnavigation.actual.timeout.timeoutmonth = month
        this.props.reduxProjectNavigation(projectnavigation)
        this.setState({render:'render'})
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activematerialid = projectnavigation.actual.activematerialid;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (active === 'labor') {



                            if (activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, activelaborid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.actual.timeout.timeoutday;
                                    let year = projectnavigation.actual.timeout.timeoutyear;
                                    let minutes = projectnavigation.actual.timeout.timeoutminutes;
                                    let hours = projectnavigation.actual.timeout.timeouthours;
                                    let time = projectnavigation.actual.timeout.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.equipment[j].timeout = timeout;
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
        
        const timeoutampm = projectnavigation.actual.timeout.timeoutampm;
        if (timeoutampm === 'am' && ampm === 'pm') {

            projectnavigation.actual.timeout.timeoutampm = 'pm'

            this.props.reduxProjectNavigation(projectnavigation)
            this.setState({render:'render'})
        } else if (timeoutampm === 'pm' && ampm === 'am') {

             projectnavigation.actual.timeout.timeoutampm = 'am'
             this.props.reduxProjectNavigation(projectnavigation)
             this.setState({render:'render'})
          
        }

      
        const activelaborid = projectnavigation.actual.activelaborid;
        const active = projectnavigation.actual.activecomponent;
        const activematerialid = projectnavigation.actual.activematerialid;
        const activeequipmentid = projectnavigation.actual.activeequipmentid;
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);

                if (active === 'labor') {



                    if (activelaborid) {
                        const mylabor = construction.getactuallaborbyid.call(this,  this.props.projectnavigation.actual.activelaborid);
                        if (mylabor) {

                            const j = construction.getactuallaborkeybyid.call(this, this.props.projectnavigation.actual.activelaborid)
                            let day = projectnavigation.actual.timeout.timeoutday;
                            let year = projectnavigation.actual.timeout.timeoutyear;
                            let month = projectnavigation.actual.timeout.timeoutmonth;
                            let hours = projectnavigation.actual.timeout.timeouthours;
                            let time = ampm;
                            let minutes =projectnavigation.actual.timeout.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                      
                            timeout = UTCTimeStringfromTime(timeout);
                            
                            myprojects[i].actual.labor[j].timeout = timeout;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (active === 'equipment') {

                    if (activeequipmentid) {
                        const myequipment = construction.getactualequipmentbyid.call(this,  this.props.projectnavigation.actual.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                            let day = projectnavigation.actual.timeout.timeoutday;
                            let year = projectnavigation.actual.timeout.timeoutyear;
                            let month = projectnavigation.actual.timeout.timeoutmonth;
                            let hours = projectnavigation.actual.timeout.timeouthours;
                            let minutes = projectnavigation.actual.timeout.timeoutminutes;
                            let time = ampm
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                            timeout = UTCTimeStringfromTime(timeout);
                            myprojects[i].actual.equipment[j].timeout = timeout;
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




        if (this.props.projectnavigation.actual.timeout.timeoutampm === 'am') {
            return showam()
        } else if (this.props.projectnavigation.actual.timeout.timeoutampm === 'pm') {
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

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.props.projectnavigation.actual.timeout.timeoutmonth}
                                onChange={event => { timeout.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timeout.timeoutday}
                                onChange={event => { timeout.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timeout.timeoutyear}
                                onChange={event => { timeout.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timeout.timeouthours}
                                onChange={event => { timeout.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timeout.timeoutminutes}
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