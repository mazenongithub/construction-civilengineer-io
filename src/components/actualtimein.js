
import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeIn from './actualtimeincalender';
class TimeIn {

    
    handleminutes(minutes) {
     
        const construction = new Construction();
        const projectnavigation = construction.getProjectNavigation.call(this)
        projectnavigation.actual.timein.timeinminutes = minutes
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
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
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
                                        let day = projectnavigation.actual.timein.timeinday;
                                        let year = projectnavigation.actual.timein.timeinyear;
                                        let month = projectnavigation.actual.timein.timeinmonth;
                                        let hours = projectnavigation.actual.timein.timeinhours;
                                        let time = projectnavigation.actual.timein.timeinampm;
                                        let timein = makeTimeString(year, month, day, hours, minutes, time);
                                        timein = UTCTimeStringfromTime(timein);
                                        myprojects[i].actual.equipment[j].timein = timein;
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
        projectnavigation.actual.timein.timeinhours = hours
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
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {


                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.equipment[j].timein = timein;
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
        projectnavigation.actual.timein.timeinyear = year
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
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {

                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this, myequipment.equipmentid)
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.equipment[j].timein = timein;
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
        projectnavigation.actual.timein.timeinday = day
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
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let month = projectnavigation.actual.timein.timeinmonth;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.equipment[j].timein = timein;
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
        projectnavigation.actual.timein.timeinmonth = month
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
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (active === 'equipment') {
                            if (activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.props.projectnavigation.actual.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = projectnavigation.actual.timein.timeinday;
                                    let year = projectnavigation.actual.timein.timeinyear;
                                    let minutes = projectnavigation.actual.timein.timeinminutes;
                                    let hours = projectnavigation.actual.timein.timeinhours;
                                    let time = projectnavigation.actual.timein.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.equipment[j].timein = timein;
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
        
        const timeinampm = projectnavigation.actual.timein.timeinampm;
        if (timeinampm === 'am' && ampm === 'pm') {

            projectnavigation.actual.timein.timeinampm = 'pm'

            this.props.reduxProjectNavigation(projectnavigation)
            this.setState({render:'render'})
        } else if (timeinampm === 'pm' && ampm === 'am') {

             projectnavigation.actual.timein.timeinampm = 'am'
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
                            let day = projectnavigation.actual.timein.timeinday;
                            let year = projectnavigation.actual.timein.timeinyear;
                            let month = projectnavigation.actual.timein.timeinmonth;
                            let hours = projectnavigation.actual.timein.timeinhours;
                            let time = ampm;
                            let minutes =projectnavigation.actual.timein.timeinminutes;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                      
                            timein = UTCTimeStringfromTime(timein);
                            
                            myprojects[i].actual.labor[j].timein = timein;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (active === 'equipment') {

                    if (activeequipmentid) {
                        const myequipment = construction.getactualequipmentbyid.call(this,  this.props.projectnavigation.actual.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                            let day = projectnavigation.actual.timein.timeinday;
                            let year = projectnavigation.actual.timein.timeinyear;
                            let month = projectnavigation.actual.timein.timeinmonth;
                            let hours = projectnavigation.actual.timein.timeinhours;
                            let minutes = projectnavigation.actual.timein.timeinminutes;
                            let time = ampm
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            timein = UTCTimeStringfromTime(timein);
                            myprojects[i].actual.equipment[j].timein = timein;
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
        const timein = new TimeIn();
        const showam = () => {
            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onClick={() => { timein.toggleampm.call(this, 'pm') }}>AM</button>
            </div>)

        }
        const showpm = () => {

            return (<div style={{ ...styles.generalContainer }}>
                <button style={{ ...styles.headerFamily, ...headerFont, ...styles.boldFont, ...styles.alignCenter, ...construction.getampmicon.call(this) }} onClick={() => { timein.toggleampm.call(this, 'am') }}>PM</button>
            </div>)

        }




        if (this.props.projectnavigation.actual.timein.timeinampm === 'am') {
            return showam()
        } else if (this.props.projectnavigation.actual.timein.timeinampm === 'pm') {
            return showpm()
        }


    }

    showtimein() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const timein = new TimeIn();
        const calender = new CalenderTimeIn();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Time In (MM-DD-YYYY HH mm) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.props.projectnavigation.actual.timein.timeinmonth}
                                onChange={event => { timein.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timein.timeinday}
                                onChange={event => { timein.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timein.timeinyear}
                                onChange={event => { timein.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timein.timeinhours}
                                onChange={event => { timein.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.props.projectnavigation.actual.timein.timeinminutes}
                                onChange={event => { timein.handleminutes.call(this, event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            {timein.showampm.call(this)}
                        </div>
                    </div>

                    {calender.showCalenderTimeIn.call(this)}

                </div>
            </div>)
    }

}

export default TimeIn;