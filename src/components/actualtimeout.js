
import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'
import { UTCTimeStringfromTime, makeTimeString, validateMonth, validateDate, validateYear, validateMinutes } from './functions';
import CalenderTimeOut from './actualtimeoutcalender';
class TimeOut {

    
    handleminutes(minutes) {
        this.setState({ timeoutminutes: minutes })
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
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
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
                                        let day = this.state.timeoutday;
                                        let year = this.state.timeoutyear;
                                        let month = this.state.timeoutmonth;
                                        let hours = this.state.timeouthours;
                                        let time = this.state.timeoutampm;
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
        this.setState({ timeouthours: hours })
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
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {


                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this,  this.state.activeequipmentid)
                                if (myequipment) {

                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
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
        this.setState({ timeoutyear: year })
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
                                    let day = this.state.timeoutday;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {

                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this, myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let minutes = this.state.timeoutminutes;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
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
        this.setState({ timeoutday: day })
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
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)

                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let minutes = this.state.timeoutminutes;
                                    let year = this.state.timeoutyear;
                                    let month = this.state.timeoutmonth;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
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
        this.setState({ timeoutmonth: month })
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
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let hours = this.state.timeouthours;
                                    let minutes = this.state.timeoutminutes;
                                    let time = this.state.timeoutampm;
                                    let timeout = makeTimeString(year, month, day, hours, minutes, time);
                                    timeout = UTCTimeStringfromTime(timeout);
                                    myprojects[i].actual.labor[j].timeout = timeout;
                                    this.props.reduxMyProjects(myprojects)
                                    this.setState({ render: 'render' })


                                }

                            }

                        } else if (this.state.active === 'equipment') {
                            if (this.state.activeequipmentid) {
                                const myequipment = construction.getactualequipmentbyid.call(this, this.state.activeequipmentid)
                                if (myequipment) {
                                    const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                                    let day = this.state.timeoutday;
                                    let year = this.state.timeoutyear;
                                    let minutes = this.state.timeoutminutes;
                                    let hours = this.state.timeouthours;
                                    let time = this.state.timeoutampm;
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
        if (this.state.timeoutampm === 'am' && ampm === 'pm') {
            this.setState({ timeoutampm: 'pm' })
        } else if (this.state.timeoutampm === 'pm' && ampm === 'am') {
            this.setState({ timeoutampm: 'am' })
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
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let time = ampm;
                            let minutes = this.state.timeoutminutes;
                            let timeout = makeTimeString(year, month, day, hours, minutes, time);
                   
                            timeout = UTCTimeStringfromTime(timeout);

                            myprojects[i].actual.labor[j].timeout = timeout;
                            this.props.reduxMyProjects(myprojects)
                            this.setState({ render: 'render' })


                        }

                    }

                } else if (this.state.active === 'equipment') {

                    if (this.state.activeequipmentid) {
                        const myequipment = construction.getactualequipmentbyid.call(this,  this.state.activeequipmentid)
                        if (myequipment) {
                            const j = construction.getactualequipmentkeybyid.call(this,  myequipment.equipmentid)
                            let day = this.state.timeoutday;
                            let year = this.state.timeoutyear;
                            let month = this.state.timeoutmonth;
                            let hours = this.state.timeouthours;
                            let minutes = this.state.timeoutminutes;
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




        if (this.state.timeoutampm === 'am') {
            return showam()
        } else if (this.state.timeoutampm === 'pm') {
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
                            <span style={{ ...styles.generalFont, ...regularFont }}>Time In (MM-DD-YYYY HH mm) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.timeoutmonth}
                                onChange={event => { timeout.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutday}
                                onChange={event => { timeout.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex2, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutyear}
                                onChange={event => { timeout.handleyear.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeouthours}
                                onChange={event => { timeout.handlehours.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.timeoutminutes}
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