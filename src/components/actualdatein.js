import React from 'react';
import { openDateMenu, closeDateMenu } from './svg'
import {
    adjustdatefromcalendar,
    formatDateforCalendarDisplay,
    getFirstIsOn,
    check_29_feb_leapyear,
    check_30,
    check_31,
    trailingzero,
    getOffset,
    inputDatePickerOutputDateObj,
    decreaseDateStringByOneYear,
    subtractoneYearDateObj,
    increaseDateStringByOneMonth,
    addoneMonthDateObj,
    decreaseDateStringByOneMonth,
    subtractMonthDateObj,
    inputtimeDBoutputCalendarDaySeconds,
    inputDateSecActiveIDTimein,
    inputDateObjandSecReturnObj,
    increaseDateStringByOneYear,
    addoneYearDateObj,
    inputDateObjOutputCalendarDaySeconds,
    makeDatefromTimein,
    makeDatefromObj


} from './functions'
import { MyStylesheet } from './styles';
class DateIn {

    showgrid() {
        const styles = MyStylesheet();
        let showgrid = [];
        const setDay = (dateencoded) => {
            let myuser = this.getuser();
            if (myuser) {
                let myproject = this.getproject();
                if (myproject) {
                    let i = this.getprojectkey();

                    if (this.state.activematerialid) {
                        let j = this.getactivematerialkey();
                        let mymaterial = this.getactivematerial()
                        let timein = mymaterial.timein;
                        let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
                        myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].timein = newtimein;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })


                    }
                    else {
                        let datein = inputDateObjandSecReturnObj(dateencoded, this.state.datein);
                        this.setState({ datein, render: 'render' })
                    }
                }
            }
        }
        const getactivedate = (dateencoded) => {
            let activeclass = "";
            if (this.state.activematerialid) {


                let mymaterial = this.getactivematerial()
                let timein = mymaterial.timein;
                if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }
            }
            else {
                let datein = this.state.datein;
                if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }

            }
            return activeclass;
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
                    onClick={() => { setDay(dateencoded) }}
                > {day}</div>)
            }
            return showday;
        }
        const showgridcalender = (datein) => {
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Mon
							</div>)
                    }
                    else if (i === 1) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Tues
							</div>)
                    }
                    else if (i === 2) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Weds
							</div>)
                    }
                    else if (i === 3) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Thurs
							</div>)
                    }
                    else if (i === 4) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Fri
							</div>)
                    }
                    else if (i === 5) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            Sat
							</div>)
                    }
                    else if (i === 6) {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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

                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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


                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
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
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            {display}
                        </div>)
                    }
                    else {
                        gridcalender.push(<div style={{ ...styles.showBorder, ...styles.alignCenter }}>
                            &nbsp;
							</div>)
                    }
                })
            }
            return gridcalender;
        }


        // begin show grid
        if (this.state.activematerialid) {

            let mymaterial = this.getactivematerial()
            let timein = mymaterial.timein;
            let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
            showgrid.push(showgridcalender(datein))

        }
        else {
            if (this.state.datein) {

                let datein = this.state.datein;

                showgrid.push(showgridcalender(datein))
            }
        }

        return showgrid;



    }


    handleopendatemenu() {
        if (this.state.calendar === 'open') {
            return (closeDateMenu())
        } else if (this.state.calendar === 'close') {
            return (openDateMenu())
        }

    }
    showCalender() {
        if (this.state.calendar === 'open') {
            this.setState({ calendar: 'close' })
        } else if (this.state.calendar === 'close') {
            this.setState({ calendar: 'open' })
        }

    }
    handleChange(value) {
        let myuser = this.getuser();
        if (myuser) {
            let myproject = this.getproject();
            if (myproject) {
                let i = this.getprojectkey();
                if (this.state.activematerialid) {
                    let j = this.getactivematerialkey();

                    let mymaterial = this.getactivematerial();
                    let timein = mymaterial.timein;
                    let newtimein = adjustdatefromcalendar(timein, value)
                    myuser.company.projects.myproject[i].actualmaterials.mymaterial[j].timein = newtimein;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
                else {

                    this.setState({ datein: inputDatePickerOutputDateObj(value) })
                }

            }
        }

    }

    showcalendar() {

        if (this.state.calendar === 'open') {
            this.setState({ calendar: 'closed' })
        } else if (this.state.calendar === 'closed') {
            this.setState({ calendar: 'open' })
        }
    }

    yeardown() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = decreaseDateStringByOneYear(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualmaterials")) {
                            // eslint-disable-next-line
                            myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].actualmaterials.mymaterial[j].timein = newtime;
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
            let newDate = subtractoneYearDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }
    }
    yearup() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = increaseDateStringByOneYear(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualmaterials")) {
                            // eslint-disable-next-line
                            myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].actualmaterials.mymaterial[j].timein = newtime;
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
            let newDate = addoneYearDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    increasemonth(event) {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = increaseDateStringByOneMonth(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualmaterials")) {
                            // eslint-disable-next-line
                            myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].actualmaterials.mymaterial[j].timein = newtime;
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
            let newDate = addoneMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }

    }
    decreasemonth() {
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let mymaterial = this.findmymaterial(materialid);
            let timein = mymaterial.timein;
            let newtime = decreaseDateStringByOneMonth(timein);
            if (this.props.projectsprovider.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projectsprovider.map((myproject, i) => {
                    let projectid = this.props.projectid.projectid;
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualmaterials")) {
                            // eslint-disable-next-line
                            myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                if (mymaterial.materialid === materialid) {
                                    this.props.projectsprovider[i].actualmaterials.mymaterial[j].timein = newtime;
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
            let newDate = subtractMonthDateObj(this.state.datein);
            this.setState({ datein: newDate })
        }
    }
    showdate(dateobj, day) {

        const setDay = (dateencoded) => {
            if (this.state.activematerialid) {
                let materialid = this.state.activematerialid;
                let mymaterial = this.findmymaterial(materialid)
                let timein = mymaterial.timein;
                let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
                if (this.props.projectsprovider.hasOwnProperty("length")) {
                    let projectid = this.props.projectid.projectid;
                    // eslint-disable-next-line
                    this.props.projectsprovider.map((myproject, i) => {
                        if (myproject.projectid === projectid) {
                            if (myproject.hasOwnProperty("actualmaterials")) {
                                // eslint-disable-next-line
                                myproject.actualmaterials.mymaterial.map((mymaterial, j) => {
                                    if (mymaterial.materialid === materialid) {
                                        this.props.projectsprovider[i].actualmaterials.mymaterial[j].timein = newtimein;
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
                let datein = inputDateObjandSecReturnObj(dateencoded, this.state.datein);
                this.setState({ datein, render: 'render' })
            }
        }

        const getactivedate = (dateencoded) => {

            let activeclass = "";
            if (this.state.activematerialid) {
                let mymaterial = this.getactivematerial();
                let timein = mymaterial.timein;
                if (inputtimeDBoutputCalendarDaySeconds(timein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }
            }
            else {
                let datein = this.state.datein;
                if (inputDateObjOutputCalendarDaySeconds(datein) === dateencoded) {
                    activeclass = "active-actual-calendar"
                }

            }
            return activeclass;
        }

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

    getvalue() {
        let value = "";
        if (this.state.activematerialid) {

            let mymaterial = this.getactivematerial();
            let timein = mymaterial.timein;
            value = makeDatefromTimein(timein)
        }
        else {
            value = makeDatefromObj(this.state.datein)

        }
        return value;

    }
    showdateforcalendar() {
        if (this.state.activematerialid) {

            let mymaterial = this.getactivematerial()
            let timein = mymaterial.timein;
            let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
            return (formatDateforCalendarDisplay(datein))
        }
        else

            return (formatDateforCalendarDisplay(this.state.datein))


    }



}
export default DateIn;