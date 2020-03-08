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
    inputTimeDateOutputUTCString,
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
class ScheduleLaborTimeOut {
    gettimeoutminutes() {
        let minutes = "";
        let datein = {};
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));
        }
        else {
            datein = this.state.timeout;
        }
        minutes = datein.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return minutes;
    }
    checkampmtimeout(dir) {

        let validate = true;
        let timeout = this.getactivelabor().timeout;
        let ampm = AMPMfromTimeIn(timeout)
        if (ampm === "PM" && dir === "up") {
            validate = false;
        } else if (ampm === "AM" && dir === "down") {
            validate = false;
        }
        return validate;

    }
    toggletimeoutampm(dir) {
        const dynamicstyles = new DynamicStyles();
        const Timeout = new ScheduleLaborTimeOut();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let project = dynamicstyles.getproject.call(this);

            if (project) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();
                    let validate = Timeout.checkampmtimeout.call(this, dir);
                    if (validate) {
                        let mylabor = this.getactivelabor();
                        let timeout = mylabor.timeout;
                        timeout = toggleAMTimeString(mylabor.timeout)
                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })


                    } // if validate

                } else {
                    let datein = toggleAMDateObj(this.state.timeout)
                    this.setState({ timeout: datein })
                }

            }


        }


    }
    setDay(dateencoded) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let mylabor = this.getactivelabor();
                    let timeout = mylabor.timeout
                    let newtimeout = inputDateSecActiveIDTimein(dateencoded, timeout)
                    let j = this.getactivelaborkey();
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout;
                    this.props.reduxUser(myuser);
                    this.setState({ render: 'render' })

                }
                else {
                    let timeout = inputDateObjandSecReturnObj(dateencoded, this.state.timeout);

                    this.setState({ timeout, render: 'render' })
                }

            }

        }
    }
    getactivedate(dateencoded) {
        let activeclass = "";
        if (this.state.activelaborid) {


            let mylabor = this.getactivelabor()
            let timeout = mylabor.timeout;
            if (inputtimeDBoutputCalendarDaySeconds(timeout) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }
        }
        else {
            let datein = this.state.timeout;
            if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                activeclass = "active-schedule-calendar"
            }

        }
        return activeclass;
    }
    showdate(dateobj, day) {
        const Timeout = new ScheduleLaborTimeOut()
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
                className={`${Timeout.getactivedate.call(this, dateencoded)} calendar-date`}
                onClick={() => { Timeout.setDay.call(this, dateencoded) }}
            > {day}</div>)
        }
        return showday;
    }
    handlecalendartimeout() {
        const dynamicstyles = new DynamicStyles();
        let datein = {};
        const styles = MyStylesheet();
        const Timeout = new ScheduleLaborTimeOut();
        const smallFont = dynamicstyles.getSmallFont.call(this)

        if (this.state.activelaborid) {
            let timeout = this.getactivelabor().timeout;
            datein = inputDateTimeOutDateObj(timeout)
        } else {
            datein = this.state.timeout;
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
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, 2);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, 3);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 2);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, 4);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 3);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 2);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, 5);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 4);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 3);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 2);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, 6);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 5);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 4);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 3);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 2);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 1);
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
                            display = Timeout.showdate.call(this, datein, i - 6);
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, i - 7);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, i - 8);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, i - 9);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, i - 10);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, i - 11);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, i - 12);
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
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, 28);
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 27);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 26);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 25);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 24);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 23);
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
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, 28);
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 27);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 26);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 25);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 24);
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Tues":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, 28);
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 27);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 26);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 25);
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Weds":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, 28);
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 27);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 26);
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, 28);
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 27);
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Fri":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, 28);
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sat":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, check_29_feb_leapyear(datein));
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
                            break;
                        case "Sun":
                            display = Timeout.showdate.call(this, datein, check_30(datein));
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
                            display = Timeout.showdate.call(this, datein, check_31(datein));
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
        if (this.state.activetimeoutcalendar) {
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
    showtimeout() {
        let Timeout = new ScheduleLaborTimeOut();
        let timeoutheader = Timeout.gettimeoutheader.call(this);
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const maxWidth = styles.calendarContainer;
        return (<div style={{ ...styles.generalFlex, ...maxWidth }}>
            <div style={{ ...styles.flex1, ...styles.generalFont }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex3, ...regularFont, ...styles.generalFont }}>
                        {timeoutheader}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.timedisplayContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...styles.majorDownIcon }} onClick={() => { Timeout.activetimeoutcalendar.call(this) }}>{majorDownIcon()}</button>
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer, ...styles.alignCenter }}>

                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.timeoutmonthup.call(this) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeoutputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutmonth.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={event => { Timeout.timeoutmonthdown.call(this) }}> {DateArrowDown()}</button>
                        </div>

                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60 * 60 * 24)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutday.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60 * 60 * 24)) }}> {DateArrowDown()}</button>
                        </div>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex }}>
                            <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timeout.timeoutyearup.call(this) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeoutputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutyear.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.timeButton, ...styles.generalButton }} onClick={() => { Timeout.timeoutyeardown.call(this) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeouthours.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60 * 60)) }}> {DateArrowDown()}</button>
                        </div>
                    </div>

                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.timedisplayContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.increasetimeoutbyinc.call(this, (1000 * 60)) }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutminutes.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.decreasetimeoutbyinc.call(this, (1000 * 60)) }} > {DateArrowDown()}</button>
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter, ...styles.timecellContainer }}>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.toggletimeoutampm.call(this, "up") }}>{DateArrowUp()}</button>
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <input type="text" style={{ ...styles.generalField, ...styles.timeinputField, ...regularFont, ...styles.generalFont }} value={Timeout.gettimeoutampm.call(this)} />
                        </div>
                        <div style={{ ...styles.timeDisplayContainer, ...styles.generalFlex, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...styles.timeButton, ...styles.alignCenter }} onClick={() => { Timeout.toggletimeoutampm.call(this, "down") }}> {DateArrowDown()}</button>
                        </div>
                    </div>
                </div>
                {Timeout.handlecalendartimeout.call(this)}

            </div>
        </div>)
    }


    gettimeoutampm() {
        let ampm = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;

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
    gettimeoutmonth() {
        let month = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
        }

        month = datein.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        return `${month}/`;
    }
    timeoutmonthup(event) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;
                    let mylabor = this.getactivelabor()
                    let newtimeout = increaseDateStringByOneMonth(mylabor.timeout);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
                else {
                    let newDate = addoneMonthDateObj(this.state.timeout);
                    this.setState({ timeout: newDate })
                }
            }
        }
    }
    gettimeoutday() {
        let day = "";
        let datein = {};
        if (this.state.activelaborid) {
            let mylabor = this.getactivelabor();
            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));
        }
        else {
            datein = this.state.timeout;
        }
        day = datein.getDate();
        if (day < 10) {
            day = `0${day}`
        }
        return `${day}/`;
    }
    gettimeoutyear() {
        let year = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));



        }
        else {
            datein = this.state.timeout;
        }
        year = datein.getFullYear();
        let century = Math.floor(year / 100) * 100;
        year = year - century;
        return year;
    }
    gettimeouthours() {
        let hours = "";
        let datein = {};
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();

            datein = new Date(inputUTCStringAddOffsetString(mylabor.timeout).replace(/-/g, '/'));

        }
        else {
            datein = this.state.timeout;
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
    increasetimeoutbyinc(inc) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;

                    let mylabor = this.getactivelabor()
                    let newtimeout = increasedateStringbyInc(mylabor.timeout, inc);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }

                else {
                    let newDate = addincDateObj(this.state.timeout, inc)
                    this.setState({ timeout: newDate })
                }

            }

        }

    }
    decreasetimeoutbyinc(inc) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;
                    let mylabor = this.getactivelabor()
                    let newtimeout = decreasedateStringbyInc(mylabor.timeout, inc);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }
                else {
                    let newDate = subtractincDateObj(this.state.timeout, inc)
                    this.setState({ timeout: newDate })
                }
            }
        }
    }
    timeoutmonthdown(event) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;
                    let mylabor = this.getactivelabor()
                    let newtimeout = decreaseDateStringByOneMonth(mylabor.timeout);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
                else {
                    let newDate = subtractMonthDateObj(this.state.timeout);
                    this.setState({ timeout: newDate })
                }
            }

        }
    }
    timeoutyearup(event) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;
                    let mylabor = this.getactivelabor()
                    let newtimeout = increaseDateStringByOneYear(mylabor.timeout);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }
                else {
                    let newDate = addoneYearDateObj(this.state.timeout);
                    this.setState({ timeout: newDate })
                }

            }

        }
    }

    timeoutyeardown(event) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            let myproject = dynamicstyles.getproject.call(this);
            if (myproject) {
                let i = dynamicstyles.getprojectkey.call(this);
                if (this.state.activelaborid) {
                    let j = this.getactivelaborkey();;
                    let mylabor = this.getactivelabor()
                    let newtimeout = decreaseDateStringByOneYear(mylabor.timeout);
                    myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = newtimeout
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
                else {
                    let newDate = subtractoneYearDateObj(this.state.timeout);
                    this.setState({ timeout: newDate })
                }
            }
        }
    }



    gettimeout() {
        let timeout = "";
        if (this.state.activelaborid) {

            let mylabor = this.getactivelabor();
            timeout = inputTimeInDateStringforPicker(mylabor.timeout);
        }
        else {
            timeout = inputDateObjOutputString(this.state.timeout);
        }
        return timeout;
    }
    handletimeout(value) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            if (this.state.activelaborid) {
                let laborid = this.state.activelaborid;

                let timeout = inputTimeDateOutputUTCString(value);
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    let projectid = this.props.projectid.projectid;
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {

                            if (myproject.hasOwnProperty("schedulelabor")) {
                                // eslint-disable-next-line
                                myproject.schedulelabor.mylabor.map((mylabor, j) => {
                                    if (mylabor.laborid === laborid) {
                                        myuser.company.projects.myproject[i].schedulelabor.mylabor[j].timeout = timeout;
                                        this.props.reduxUser(myuser);
                                        this.setState({ render: 'render' });

                                    }
                                });
                            }

                        }
                    });
                }
            }
            else {
                let timeout = inputDateTimeOutDateObj(value);
                this.setState({ timeout })
            }

        }
    }


    activetimeoutcalendar() {
        let activetimeoutcalendar = this.state.activetimeoutcalendar;
        if (activetimeoutcalendar) {
            activetimeoutcalendar = false;
        } else {
            activetimeoutcalendar = true;
        }
        this.setState({ activetimeoutcalendar })
    }

    gettimeoutheader() {
        let timeoutheader = "";
        if (this.state.activelaborid) {
            const mylabor = this.getactivelabor();

            timeoutheader = `Time In ${inputUTCStringForLaborID(mylabor.timeout)}`
        } else {
            timeoutheader = `Time In ${inputDateObjOutputCalendarString(this.state.timeout)}`
        }
        return timeoutheader;
    }




}
export default ScheduleLaborTimeOut