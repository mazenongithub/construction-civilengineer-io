import React from 'react';
import {
    increaseDateStringByOneMonth,
    addoneMonthDateObj,
    decreaseDateStringByOneMonth,
    subtractMonthDateObj,
    increaseDateStringByOneYear,
    addoneYearDateObj,
    decreaseDateStringByOneYear,
    subtractoneYearDateObj,
    decreasedateStringbyInc,
    subtractincDateObj,
    increasedateStringbyInc,
    addincDateObj,
    inputTimeInDateStringforPicker,
    inputDateObjOutputString,
    inputDateTimeOutDateObj,
    inputUTCStringForLaborID,
    inputDateObjOutputCalendarString,
    inputUTCStringAddOffsetString,
    getFirstIsOn,
    check_29_feb_leapyear,
    check_30,
    check_31,
    inputtimeDBoutputCalendarDaySeconds,
    inputDateObjOutputCalendarDaySeconds,
    inputDateSecActiveIDTimein,
    inputDateObjandSecReturnObj,
    trailingzero,
    getOffset,
    toggleAMTimeString,
    toggleAMDateObj,
    AMPMfromTimeIn
} from './functions';
import { majorDownIcon, DateArrowDown, DateArrowUp } from './svg';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
class ScheduleEquipmentTimeIn {
    gettimeinminutes() {
        let minutes = "";
        let datein = {};
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));
        }
        else {
            datein = this.state.timein;
        }
        minutes = datein.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return minutes;
    }
    checkampmtimein(dir) {

        let validate = true;
        let timein = this.getactiveequipment().timein;
        let ampm = AMPMfromTimeIn(timein)
        if (ampm === "PM" && dir === "up") {
            validate = false;
        } else if (ampm === "AM" && dir === "down") {
            validate = false;
        }
        return validate;

    }
    toggletimeinampm(dir) {

        const Timein = new ScheduleEquipmentTimeIn();
        const dynamicstyles = new DynamicStyles();

        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let validate = Timein.checkampmtimein.call(this, dir);
                        if (validate) {
                            let myequipment = this.getactiveequipment();
                            let timein = myequipment.timein;
                            timein = toggleAMTimeString(myequipment.timein)
                            let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, timein, myequipment.timeout)
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = timein;
                            myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                            this.props.reduxUser(myuser)
                            if (myequipment.proposalid) {
                                dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                            } else {
                                this.setState({ render: 'render' })
                            }


                        } // if validate

                    }

                } else {
                    let datein = toggleAMDateObj(this.state.timein)
                    this.setState({ timein: datein })
                }

            }




        }


    }
    setDay(dateencoded) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let timein = myequipment.timein
                        let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein;
                        this.props.reduxUser(myuser);
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }

                }
                else {
                    let timein = inputDateObjandSecReturnObj(dateencoded, this.state.timein);

                    this.setState({ timein, render: 'render' })
                }

            }


        }
    }
    getactivedate(dateencoded) {
        let activeclass = "";
        if (this.state.activeequipmentid) {


            let myequipment = this.getactiveequipment()
            let timein = myequipment.timein;
            if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }
        }
        else {
            let datein = this.state.timein;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }

        }
        return activeclass;
    }
    showdate(dateobj, day) {
        const Timein = new ScheduleEquipmentTimeIn()
        let showday = [];
        if (day) {

            let month = dateobj.getMonth() + 1;
            month = trailingzero(month)
            let year = dateobj.getFullYear();
            let dayzero = trailingzero(day);
            let offset = getOffset()
            let timestring = `${year}/${month}/${dayzero} 00:00:00${offset}`;

            let calendardate = new Date(timestring);

            let dateencoded = calendardate.getTime();

            showday.push(<div
                className={`${Timein.getactivedate.call(this, dateencoded)} calendar-date`}
                onClick={() => { Timein.setDay.call(this, dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }
    handlecalendartimein() {
        const dynamicstyles = new DynamicStyles();
        let datein = {};
        const styles = MyStylesheet();
        const Timein = new ScheduleEquipmentTimeIn();
        const smallFont = dynamicstyles.getSmallFont.call(this)

        if (this.state.activeequipmentid) {
            let timein = this.getactiveequipment().timein;
            datein = inputDateTimeOutDateObj(timein)
        } else {
            datein = this.state.timein;
        }

        let gridcalender = [];
        if (Object.prototype.toString.call(datein) === "[object Date]") {

            let firstison = getFirstIsOn(datein);
            let days = [];
            let numberofcells = 49;
            for (let i = 1; i < numberofcells + 1; i++) {
                days.push(i);
            }
            // eslint-disable-next-line
            days.map((day, i) => {
                if (i === 0) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Mon
							</div>)
                }
                else if (i === 1) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Tues
							</div>)
                }
                else if (i === 2) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Weds
							</div>)
                }
                else if (i === 3) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Thurs
							</div>)
                }
                else if (i === 4) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Fri
							</div>)
                }
                else if (i === 5) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Sat
							</div>)
                }
                else if (i === 6) {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        Sun
							</div>)
                }
                else if (i === 7) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}&nbsp;
							</div>)

                }
                else if (i === 8) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 2);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }

                else if (i === 9) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 3);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 2);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)

                }
                else if (i === 10) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 4);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 3);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 2);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)


                }
                else if (i === 11) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 5);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 4);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 3);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 2);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)

                }
                else if (i === 12) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, 6);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 5);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 4);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 3);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 2);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 1);
                            break;
                        default:
                            break;
                    }

                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)


                }
                else if (i >= 13 && i <= 34) {
                    let display = " "
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, i - 6);
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, i - 7);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, i - 8);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, i - 9);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, i - 10);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, i - 11);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, i - 12);
                            break;
                        default:
                            break;
                    }


                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)

                }


                else if (i === 35) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 27);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 26);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 25);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 24);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 23);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 36) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 27);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 26);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 25);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 24);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 37) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 27);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 26);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 25);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 38) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 27);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 26);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 39) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 27);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 40) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, 28);
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 41) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 42) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            break;
                        case "Sat":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, check_30(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else if (i === 43) {
                    let display = " ";
                    switch (firstison) {
                        case "Mon":
                            break;
                        case "Tues":
                            break;
                        case "Weds":
                            break;
                        case "Thurs":
                            break;
                        case "Fri":
                            break;
                        case "Sat":
                            break;
                        case "Sun":
                            display = Timein.showdate.call(this, datein, check_31(datein));
                            break;
                        default:
                            break;
                    }
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        {display}
                    </div>)
                }
                else {
                    gridcalender.push(<div style={{ ...styles.alignCenter, ...styles.showBorder, ...smallFont }}>
                        &nbsp;
							</div>)
                }
            })
        }
        if (this.state.activetimeincalendar) {
            return (<div className="general-flex">
                <div className="flex-1 calendar-container">
                    <div className="laborcalendar-grid">
                        {gridcalender}
                    </div>


                </div>
            </div>)
        } else {
            return;
        }
    }
    showtimein() {
        let Timein = new ScheduleEquipmentTimeIn();
        let timeinheader = Timein.gettimeinheader.call(this);
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const maxWidth = styles.calendarContainer;
        return (<div style={{ ...styles.generalFlex, ...maxWidth }}>
            <div style={{ ...styles.flex1, ...styles.generalFont }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex3, ...regularFont, ...styles.generalFont }}>
                        {timeinheader}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.timedisplayContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.majorDownIcon }} onClick={() => { Timein.activetimeincalendar.call(this) }}>{majorDownIcon()}</button>
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer, ...styles.alignCenter }}>

                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timein.timeinmonthup.call(this) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinmonth.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={event => { Timein.timeinmonthdown.call(this) }}> {DateArrowDown()}</button>
                        </div>

                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timein.increasetimeinbyinc.call(this, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinday.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timein.decreasetimeinbyinc.call(this, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                        </div>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                            <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timein.timeinyearup.call(this) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinyear.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timein.timeinyeardown.call(this) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.increasetimeinbyinc.call(this, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinhours.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.decreasetimeinbyinc.call(this, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.increasetimeinbyinc.call(this, (1000 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinminutes.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.decreasetimeinbyinc.call(this, (1000 * 60)) }} > {DateArrowDown()}</button>
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.toggletimeinampm.call(this, "up") }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timein.gettimeinampm.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timein.toggletimeinampm.call(this, "down") }}> {DateArrowDown()}</button>
                        </div>
                    </div>
                </div>
                {Timein.handlecalendartimein.call(this)}

            </div>
        </div>)
    }


    gettimeinampm() {
        let ampm = "";
        let datein = {};
        if (this.state.activeequipmentid) {

            let myequipment = this.getactiveequipment();

            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timein;

        }
        let hours = datein.getHours();
        if (hours >= 12) {
            ampm = "PM"
        }
        else {
            ampm = "AM"
        }
        return ampm;
    }
    gettimeinmonth() {
        let month = "";
        let datein = {};
        if (this.state.activeequipmentid) {

            let myequipment = this.getactiveequipment();
            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timein;
        }

        month = datein.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        return `${month}/`;
    }
    timeinmonthup(event) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = increaseDateStringByOneMonth(myequipment.timein);
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein

                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)

                        } else {
                            this.setState({ render: 'render' })
                        }
                    }

                }
                else {
                    let newDate = addoneMonthDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }
            }

        }
    }
    gettimeinday() {
        let day = "";
        let datein = {};
        if (this.state.activeequipmentid) {
            let myequipment = this.getactiveequipment();
            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));
        }
        else {
            datein = this.state.timein;
        }
        day = datein.getDate();
        if (day < 10) {
            day = `0${day}`
        }
        return `${day}/`;
    }
    gettimeinyear() {
        let year = "";
        let datein = {};
        if (this.state.activeequipmentid) {

            let myequipment = this.getactiveequipment();

            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timein;
        }
        year = datein.getFullYear();
        let century = Math.floor(year / 100) * 100;
        year = year - century;
        return year;
    }
    gettimeinhours() {
        let hours = "";
        let datein = {};
        if (this.state.activeequipmentid) {

            let myequipment = this.getactiveequipment();

            datein = new Date(inputUTCStringAddOffsetString(myequipment.timein).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timein;
        }
        hours = datein.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }
        else if (hours === 0) {
            hours = 12;
        }


        return `${hours}:`;
    }
    increasetimeinbyinc(inc) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = increasedateStringbyInc(myequipment.timein, inc);
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                }

                else {
                    let newDate = addincDateObj(this.state.timein, inc)
                    this.setState({ timein: newDate })
                }

            }

        }



    }
    decreasetimeinbyinc(inc) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = decreasedateStringbyInc(myequipment.timein, inc);
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein
                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                }
                else {
                    let newDate = subtractincDateObj(this.state.timein, inc)
                    this.setState({ timein: newDate })
                }
            }

        }
    }
    timeinmonthdown(event) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = decreaseDateStringByOneMonth(myequipment.timein);
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein

                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {


                            this.setState({ render: 'render' })
                        }

                    }

                }
                else {
                    let newDate = subtractMonthDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }
            }



        }
    }
    timeinyearup(event) {
        const dynamicstyles = new DynamicStyles();

        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = increaseDateStringByOneYear(myequipment.timein);
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein
                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {
                            this.setState({ render: 'render' })
                        }

                    }


                }
                else {
                    let newDate = addoneYearDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }

            }


        }
    }

    timeinyeardown(event) {
        const dynamicstyles = new DynamicStyles();

        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getprojectbyid.call(this, this.props.match.params.projectid);
            if (myproject) {
                let i = dynamicstyles.getprojectkeybyid.call(this, myproject.projectid);

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)
                    if (myequipment) {
                        const j = dynamicstyles.getscheduleequipmentkeybyid.call(this, this.state.activeequipmentid)
                        let newtimein = decreaseDateStringByOneYear(myequipment.timein);
                        let equipmentrate = dynamicstyles.calculateequipmentratebyid.call(this, myequipment.myequipmentid, newtimein, myequipment.timeout)
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].equipmentrate = equipmentrate;
                        myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].timein = newtimein
                        this.props.reduxUser(myuser)
                        if (myequipment.proposalid) {
                            dynamicstyles.updateproposal.call(this, myequipment.proposalid)
                        } else {
                            this.setState({ render: 'render' })
                        }
                    }
                }
                else {
                    let newDate = subtractoneYearDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }
            }

        }
    }



    gettimein() {
        let timein = "";
        if (this.state.activeequipmentid) {

            let myequipment = this.getactiveequipment();
            timein = inputTimeInDateStringforPicker(myequipment.timein);
        }
        else {
            timein = inputDateObjOutputString(this.state.timein);
        }
        return timein;
    }



    activetimeincalendar() {
        let activetimeincalendar = this.state.activetimeincalendar;
        if (activetimeincalendar) {
            activetimeincalendar = false;
        } else {
            activetimeincalendar = true;
        }
        this.setState({ activetimeincalendar })
    }

    gettimeinheader() {
        let timeinheader = "";
        if (this.state.activeequipmentid) {
            const myequipment = this.getactiveequipment();

            timeinheader = `Time In ${inputUTCStringForLaborID(myequipment.timein)}`
        } else {
            timeinheader = `Time In ${inputDateObjOutputCalendarString(this.state.timein)}`
        }
        return timeinheader;
    }




}
export default ScheduleEquipmentTimeIn