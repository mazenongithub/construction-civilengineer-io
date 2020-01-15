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

import { MyStylesheet } from './styles';
class TimeIn {
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

    toggletimeinampm(dir) {
        const checkampmtimein = (dir) => {

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
        let myuser = this.getuser();
        if (myuser) {
            let project = this.getproject();

            if (project) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey()
                    let validate = checkampmtimein(dir);
                    if (validate) {
                        let myequipment = this.getactiveequipment();
                        let timein = myequipment.timein;
                        timein = toggleAMTimeString(myequipment.timein)
                        myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = timein;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })


                    } // if validate

                } else {
                    let datein = toggleAMDateObj(this.state.timein)
                    this.setState({ timein: datein })
                }

            }


        }


    }
    handlecalendartimein() {
        let datein = {};
        const styles = MyStylesheet();
        const smallFont = this.getSmallFont()
        const getactivedate = (dateencoded) => {
            let activeclass = "";
            if (this.state.activeequipmentid) {


                let myequipment = this.getactiveequipment()
                let timein = myequipment.timein;
                if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }
            }
            else {
                let datein = this.state.timein;
                if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }

            }
            return activeclass;
        }
        const setDay = (dateencoded) => {
            let myuser = this.getmyuser();
            if (myuser) {
                let myproject = this.getproject();
                if (myproject) {
                    let i = this.getprojectkey();
                    if (this.state.activeequipmentid) {
                        let myequipment = this.getactiveequipment();
                        let timein = myequipment.timein
                        let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
                        let j = this.getactiveequipmentkey();
                        myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein;
                        let obj = this.props.projectsprovider;
                        this.props.projectsProvider(obj);
                        this.setState({ render: 'render' })

                    }
                    else {
                        let timein = inputDateObjandSecReturnObj(dateencoded, this.state.timein);

                        this.setState({ timein, render: 'render' })
                    }

                }

            }
        }
        const showdate = (dateobj, day) => {

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
                    className={`${getactivedate(dateencoded)} calendar-date`}
                    onClick={event => { setDay(dateencoded) }}
                > {day}</div>)
            }
            return showday;
        }

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
                            display = showdate(datein, 1);
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
                            display = showdate(datein, 2);
                            break;
                        case "Tues":
                            display = showdate(datein, 1);
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
                            display = showdate(datein, 3);
                            break;
                        case "Tues":
                            display = showdate(datein, 2);
                            break;
                        case "Weds":
                            display = showdate(datein, 1);
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
                            display = showdate(datein, 4);
                            break;
                        case "Tues":
                            display = showdate(datein, 3);
                            break;
                        case "Weds":
                            display = showdate(datein, 2);
                            break;
                        case "Thurs":
                            display = showdate(datein, 1);
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
                            display = showdate(datein, 5);
                            break;
                        case "Tues":
                            display = showdate(datein, 4);
                            break;
                        case "Weds":
                            display = showdate(datein, 3);
                            break;
                        case "Thurs":
                            display = showdate(datein, 2);
                            break;
                        case "Fri":
                            display = showdate(datein, 1);
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
                            display = showdate(datein, 6);
                            break;
                        case "Tues":
                            display = showdate(datein, 5);
                            break;
                        case "Weds":
                            display = showdate(datein, 4);
                            break;
                        case "Thurs":
                            display = showdate(datein, 3);
                            break;
                        case "Fri":
                            display = showdate(datein, 2);
                            break;
                        case "Sat":
                            display = showdate(datein, 1);
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
                            display = showdate(datein, i - 6);
                            break;
                        case "Tues":
                            display = showdate(datein, i - 7);
                            break;
                        case "Weds":
                            display = showdate(datein, i - 8);
                            break;
                        case "Thurs":
                            display = showdate(datein, i - 9);
                            break;
                        case "Fri":
                            display = showdate(datein, i - 10);
                            break;
                        case "Sat":
                            display = showdate(datein, i - 11);
                            break;
                        case "Sun":
                            display = showdate(datein, i - 12);
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
                            display = showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Tues":
                            display = showdate(datein, 28);
                            break;
                        case "Weds":
                            display = showdate(datein, 27);
                            break;
                        case "Thurs":
                            display = showdate(datein, 26);
                            break;
                        case "Fri":
                            display = showdate(datein, 25);
                            break;
                        case "Sat":
                            display = showdate(datein, 24);
                            break;
                        case "Sun":
                            display = showdate(datein, 23);
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
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Tues":
                            display = showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Weds":
                            display = showdate(datein, 28);
                            break;
                        case "Thurs":
                            display = showdate(datein, 27);
                            break;
                        case "Fri":
                            display = showdate(datein, 26);
                            break;
                        case "Sat":
                            display = showdate(datein, 25);
                            break;
                        case "Sun":
                            display = showdate(datein, 24);
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Tues":
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Weds":
                            display = showdate(datein, check_29_feb_leapyear(datein))
                            break;
                        case "Thurs":
                            display = showdate(datein, 28);
                            break;
                        case "Fri":
                            display = showdate(datein, 27);
                            break;
                        case "Sat":
                            display = showdate(datein, 26);
                            break;
                        case "Sun":
                            display = showdate(datein, 25);
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Weds":
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Thurs":
                            display = showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Fri":
                            display = showdate(datein, 28);
                            break;
                        case "Sat":
                            display = showdate(datein, 27);
                            break;
                        case "Sun":
                            display = showdate(datein, 26);
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Thurs":
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Fri":
                            display = showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sat":
                            display = showdate(datein, 28);
                            break;
                        case "Sun":
                            display = showdate(datein, 27);
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Fri":
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Sat":
                            display = showdate(datein, check_29_feb_leapyear(datein));
                            break;
                        case "Sun":
                            display = showdate(datein, 28);
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Sat":
                            display = showdate(datein, check_30(datein));
                            break;
                        case "Sun":
                            display = showdate(datein, check_29_feb_leapyear(datein));
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
                            display = showdate(datein, check_31(datein));
                            break;
                        case "Sun":
                            display = showdate(datein, check_30(datein));
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
                            display = showdate(datein, check_31(datein));
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
    showcalendartimein() {





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
            console.log("MONTHTIMEIN", datein)
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
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment()
                    let newtimein = increaseDateStringByOneMonth(myequipment.timein);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

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
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();

                    let myequipment = this.getactiveequipment()
                    let newtimein = increasedateStringbyInc(myequipment.timein, inc);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }

                else {
                    let newDate = addincDateObj(this.state.timein, inc)
                    this.setState({ timein: newDate })
                }

            }

        }

    }
    decreasetimeinbyinc(inc) {
        let myuser = this.getuser()
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment()
                    let newtimein = decreasedateStringbyInc(myequipment.timein, inc);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }
                else {
                    let newDate = subtractincDateObj(this.state.timein, inc)
                    this.setState({ timein: newDate })
                }
            }
        }
    }
    timeinmonthdown(event) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment()
                    let newtimein = decreaseDateStringByOneMonth(myequipment.timein);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein

                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
                else {
                    let newDate = subtractMonthDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }
            }

        }
    }
    timeinyearup(event) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment()
                    let newtimein = increaseDateStringByOneYear(myequipment.timein);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })


                }
                else {
                    let newDate = addoneYearDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }

            }

        }
    }

    timeinyeardown(event) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activeequipmentid) {
                    let j = this.getactiveequipmentkey();
                    let myequipment = this.getactiveequipment()
                    let newtimein = decreaseDateStringByOneYear(myequipment.timein);
                    myuser.company.projects.myproject[i].actualequipment.myequipment[j].timein = newtimein
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }
                else {
                    let newDate = subtractoneYearDateObj(this.state.timein);
                    this.setState({ timein: newDate })
                }
            }
        }
    }



    timeoutyeardown(event) {
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myequipment = this.getactiveequipment()
            let newtimeout = decreaseDateStringByOneYear(myequipment.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("actualequipment")) {
                            // eslint-disable-next-line
                            myproject.actualequipment.myequipment.map((myequipment, j) => {
                                if (myequipment.equipmentid === equipmentid) {
                                    this.props.projectsprovider[i].actualequipment.myequipment[j].timeout = newtimeout
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })

                                }
                            })
                        }

                    }
                })
            }
        }
        else {
            let newDate = subtractoneYearDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
        }
    }
    timeoutyearup(event) {
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;
            let myequipment = this.getactiveequipment()
            let newtimeout = increaseDateStringByOneYear(myequipment.timeout);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("actualequipment")) {
                            // eslint-disable-next-line
                            myproject.actualequipment.myequipment.map((myequipment, j) => {
                                if (myequipment.equipmentid === equipmentid) {
                                    this.props.projectsprovider[i].actualequipment.myequipment[j].timeout = newtimeout
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' })

                                }
                            })
                        }

                    }
                })
            }
        }
        else {
            let newDate = addoneYearDateObj(this.state.timeout);
            this.setState({ timeout: newDate })
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
    handletimein(value) {
        if (this.state.activeequipmentid) {
            let equipmentid = this.state.activeequipmentid;

            let timein = inputTimeDateOutputUTCString(value);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                let projectid = this.props.projectid.projectid;
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("actualequipment")) {
                            // eslint-disable-next-line
                            myproject.actualequipment.myequipment.map((myequipment, j) => {
                                if (myequipment.equipmentid === equipmentid) {
                                    this.props.projectsprovider[i].actualequipment.myequipment[j].timein = timein;
                                    let obj = this.props.projectsprovider;
                                    this.props.projectsProvider(obj);
                                    this.setState({ render: 'render' });

                                }
                            });
                        }

                    }
                });
            }
        }
        else {
            let timein = inputDateTimeOutDateObj(value);
            this.setState({ timein })
        }

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
export default TimeIn