
import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeIn from './actualtimeincalender';
class TimeIn {

    
    handleminutes(minutes) {
        this.setState({ timeinminutes: minutes })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {

      
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

              

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                
                if (minutes.length === 2) {

                    if (validateMinutes(minutes)) {


                        if (this.state.active === 'labor') {


                            if (this.state.activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this,  this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }



                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.state.activeequipmentid)
                                if (myequipment) {

                                    if (myequipment) {
                                        const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                        let day = this.state.timeinday;
                                        let year = this.state.timeinyear;
                                        let month = this.state.timeinmonth;
                                        let hours = this.state.timeinhours;
                                        let time = this.state.timeinampm;
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
        this.setState({ timeinhours: hours })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (hours.length === 2) {
                    if (validateMonth(hours)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.state.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
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
        this.setState({ timeinyear: year })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (year.length === 4) {

                    if (validateYear(year)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this, this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this, myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let minutes = this.state.timeinminutes;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
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
        this.setState({ timeinday: day })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (day.length === 2) {

                    if (validateDate(day)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this,  this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this, this.state.activelaborid)
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let minutes = this.state.timeinminutes;
                                    let year = this.state.timeinyear;
                                    let month = this.state.timeinmonth;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
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
        this.setState({ timeinmonth: month })
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (this.state.active === 'labor') {



                            if (this.state.activelaborid) {
                                const mylabor = construction.getactuallaborbyid.call(this,  this.state.activelaborid);
                                if (mylabor) {

                                    const j = construction.getactuallaborkeybyid.call(this,  this.state.activelaborid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let hours = this.state.timeinhours;
                                    let minutes = this.state.timeinminutes;
                                    let time = this.state.timeinampm;
                                    let timein = makeTimeString(year, month, day, hours, minutes, time);
                                    timein = UTCTimeStringfromTime(timein);
                                    myprojects[i].actual.labor[j].timein = timein;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = this.state.timeinday;
                                    let year = this.state.timeinyear;
                                    let minutes = this.state.timeinminutes;
                                    let hours = this.state.timeinhours;
                                    let time = this.state.timeinampm;
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
        if (this.state.timeinampm === 'am' && ampm === 'pm') {
            this.setState({ timeinampm: 'pm' })
        } else if (this.state.timeinampm === 'pm' && ampm === 'am') {
            this.setState({ timeinampm: 'am' })
        }

        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
            
            const myproject = construction.getOurProjectByID.call(this,this.props.project_id)
            if(myproject) {

                

                const i = construction.getOurProjectKeyById.call(this,this.props.project_id);

                if (this.state.active === 'labor') {



                    if (this.state.activelaborid) {
                        const mylabor = construction.getactuallaborbyid.call(this,  this.state.activelaborid);
                        if (mylabor) {

                            const j = construction.getactuallaborkeybyid.call(this, this.state.activelaborid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let time = ampm;
                            let minutes = this.state.timeinminutes;
                            let timein = makeTimeString(year, month, day, hours, minutes, time);
                            console.log(timein)
                            timein = UTCTimeStringfromTime(timein);
                            console.log(timein)
                            myprojects[i].actual.labor[j].timein = timein;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getactualequipmentbyid.call(this,  this.state.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                            let day = this.state.timeinday;
                            let year = this.state.timeinyear;
                            let month = this.state.timeinmonth;
                            let hours = this.state.timeinhours;
                            let minutes = this.state.timeinminutes;
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




        if (this.state.timeinampm === 'am') {
            return showam()
        } else if (this.state.timeinampm === 'pm') {
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

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.timeinmonth}
                                onChange={event => { timein.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeinday}
                                onChange={event => { timein.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeinyear}
                                onChange={event => { timein.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeinhours}
                                onChange={event => { timein.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeinminutes}
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