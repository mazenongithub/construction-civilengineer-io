export function CreateAccount(accountid, account, accountname) {
    return ({ accountid, account, accountname })
}
export function CreateCSI(csiid, csi, title) {
    return ({ csiid, csi, title })
}
export function CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid) {
    return ({ materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid })
}
export function CreateBenefit(benefitid, benefit, accountid, amount) {
    return ({ benefitid, benefit, accountid, amount })
}
export function CreateCompany(companyid, company, manager, address, city, contactstate, zipcode) {
    return ({ companyid, company, manager, address, city, contactstate, zipcode })
}
export function CreateRentalRate(month, week, day, hour) {
    return ({ month, week, day, hour })
}
export function CreateEquipment(equipmentid, equipment, workinghours) {
    return ({ equipmentid, equipment, workinghours })
}
export function CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid) {
    return ({ equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid })
}
export function CreateCostID(costid, cost, detail, timein) {
    return ({ costid, cost, detail, timein })
}
export function CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, description, proposalid) {
    return ({ laborid, providerid, milestoneid, csiid, timein, timeout, description, proposalid })
}
export function CreateBidScheduleItem(lineid, csiid, profit, unit, quantity) {
    return ({ lineid, csiid, profit, unit, quantity })
}
export function inputDateSecActiveIDTimein(dateencoded, timein) {
    let newDate = new Date(dateencoded)
    let offset = newDate.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();

    let hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    hours = fakedate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    month = fakedate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    year = fakedate.getFullYear();
    day = fakedate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}

export function inputDateObjandSecReturnObj(dateencoded, datein) {
    let newDate = new Date(dateencoded);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    if (year < 10) {
        year = `0${year}`
    }
    let hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let sym = "";
    let offset = new Date().getTimezoneOffset() / 60;
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }

    newDate = new Date(`${month}/${day}/${year} ${hours}:${minutes}:${seconds}${sym}${offset}:00`)
    return newDate;
}
export function getOffset() {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)

}
export function AMPMfromTimeIn(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let hours = datein.getHours();
    let ampm = "";
    if (hours >= 12) {
        ampm = "PM"
    } else {
        ampm = "AM"
    }
    return (ampm)
}
export function toggleAMDateObj(datein) {
    let hours = datein.getHours();
    let newDate = {};
    if (hours > 12) {
        newDate = new Date(datein.getTime() - (1000 * 60 * 60 * 12))
    }
    else {
        newDate = new Date(datein.getTime() + (1000 * 60 * 60 * 12))
    }
    return (newDate)

}
export function toggleAMTimeString(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let hours = datein.getHours();
    let newDate = {};
    if (hours > 12) {
        newDate = new Date(datein.getTime() - (1000 * 60 * 60 * 12))
    }
    else {
        newDate = new Date(datein.getTime() + (1000 * 60 * 60 * 12))
    }
    let year = newDate.getFullYear();

    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    hours = newDate.getHours()


    let day = newDate.getDate()
    if (day < 10) {
        day = `0${day}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let offset = 2 * new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    offset = `${sym}${offset}:00`
    let UTCDate = new Date(`${year}-${month}-${day} ${hours}:${minutes}:00${offset}`)
    hours = UTCDate.getHours()
    if (hours < 10) {
        hours = `0${hours}`
    }
    month = UTCDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    day = UTCDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    year = UTCDate.getFullYear();
    return (`${year}-${month}-${day} ${hours}:${minutes}:00`)

}
export function increaseDateStringByOneMonth(timein) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth() + 1;
    let year = datein.getFullYear();
    if (month === 12) {
        month = 1;
        year = year + 1;
    }
    else {
        month = month + 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();

    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    console.log("ONEMONTHINCREASE", `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`)
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

export function addincDateObj(datein, inc) {
    return (new Date(datein.getTime() + inc))
}
export function decreaseDateStringByOneMonth(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 0) {
        month = 11;
        year = year - 1;
    }
    else {
        month = month - 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function decreaseDateStringByOneYear(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year - 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function decreasedateStringbyInc(timein, inc) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let newdate = new Date(datein.getTime() - inc)

    let month = newdate.getMonth();
    let year = newdate.getFullYear();

    let date = newdate.getDate();
    let hours = newdate.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = newdate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = newdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = newdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = newdate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

export function increaseDateStringByOneYear(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year + 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

export function increasedateStringbyInc(timein, inc) {

    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";
        offset = -offset;
    }

    let datein = new Date(`${timein.replace(/-/g, '/')}${sym}${offset}:00`);
    let newdate = new Date(datein.getTime() + inc)

    let month = newdate.getMonth();
    let year = newdate.getFullYear();

    let date = newdate.getDate();
    let hours = newdate.getHours();
    month = month + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    date = newdate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }
    hours = newdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = newdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = newdate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function subtractMonthDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 0) {
        month = 11;
        year = year - 1;
    }
    else {
        month = month - 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}
export function subtractincDateObj(datein, inc) {
    return (new Date(datein.getTime() - inc))
}

export function subtractoneYearDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year - 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}

export function inputTimeDateOutputUTCString(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";

    if (offset > 0) {
        sym = "-";
    }
    else {
        sym = "+";

    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    let dates = timein.split('T');
    let datein = dates[0];
    timein = dates[1];

    let newDate = new Date(`${datein.replace(/-/g, '/')} ${timein}:00${sym}${offset}:00`)
    let newDatesec = newDate.getTime();
    let offsetsec = newDate.getTimezoneOffset() * (60 * 1000)
    let fakedate = new Date(newDatesec + offsetsec)
    let year = fakedate.getFullYear()
    let month = fakedate.getMonth() + 1;
    let date = fakedate.getDate();
    let hours = fakedate.getHours();
    if (month < 10) {
        month = `0${month}`;
    }

    if (date < 10) {
        date = `0${date}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = fakedate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let seconds = fakedate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}
export function inputTimeInDateStringforPicker(timein) {
    let dateobj = new Date(`${timein.replace(/-/g, '/')}-00:00`)


    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    month = trailingzero(month)
    let timestring = `${year}-${month}-${dayzero}T${hours}:${minutes}`;
    return timestring;
}

export function trailingzero(num) {
    let reg_ex = /^0\d$/;
    var test = reg_ex.test(num.toString());

    if (!test) {
        if (Number(num) < 10) {
            return `0${Number(num)}`;
        }
        else {
            return num;
        }
    }
    else {
        return num;
    }
}
export function inputDateTimeOutDateObj(timein) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "";
    if (offset > 0) {
        sym = "-"
    }
    else {
        sym = "+"
        offset = -offset;
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date(`${timein.replace(/-/g, '/')}:00${sym}${offset}:00`);
    return (newDate)
}
export function inputUTCStringAddOffsetString(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let fullyear = datein.getFullYear();
    let month = datein.getMonth() + 1
    let date = datein.getDate();
    let hours = datein.getHours();
    fullyear = datein.getFullYear();
    month = datein.getMonth() + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (`${fullyear}-${month}-${date} ${hours}:${minutes}:${seconds}`)

}
export function check_29_feb_leapyear(dateobj) {
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}
export function inputDateObjOutputCalendarDaySeconds(datein) {
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }

    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = datein.getFullYear();
    let dateinsec = new Date(`${month}/${day}/${year} 00:00:00${sym}${offset}:00`).getTime();
    return dateinsec;
}
export function inputtimeDBoutputCalendarDaySeconds(timein) {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+";
    }
    else if (offset < 10) {
        offset = `0${offset}`
        sym = "-";
    }
    else {
        sym = "-";
    }


    let dateobj = new Date(`${(timein.replace(/-/g, '/'))}${sym}${offset}:00`);
    let daymonth = dateobj.getMonth() + 1;
    if (daymonth < 10) {
        daymonth = `0${daymonth}`
    }
    let dayyear = dateobj.getFullYear();
    let calendarday = dateobj.getDate();

    let calendardateobj = new Date(`${dayyear}/${daymonth}/${calendarday} 00:00:00${sym}${offset}:00`);
    return (calendardateobj.getTime());
}
export function check_31(dateobj) {
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30(dateobj) {
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}
export function getFirstIsOn(mydate) {
    let monthdisplay = mydate.getMonth() + 1;
    let fullyear = mydate.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}
export function inputDateObjOutputString(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let hours = dateobj.getHours();
    let month = dateobj.getMonth() + 1;
    hours = trailingzero(hours);
    let minutes = dateobj.getMinutes();
    minutes = trailingzero(minutes);
    let dayzero = trailingzero(day);
    month = trailingzero(month)
    let timestring = `${year}-${month}-${dayzero}T${hours}:${minutes}`;
    return timestring;
}
export function addoneYearDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    year = year + 1;

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}
export function addoneMonthDateObj(datein) {
    let month = datein.getMonth();
    let year = datein.getFullYear();
    if (month === 11) {
        month = 0;
        year = year + 1;
    }
    else {
        month = month + 1;
    }

    let date = datein.getDate();
    let hours = datein.getHours();
    month = month + 1
    if (month < 10) {
        month = `0${month}`
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    hours = datein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = datein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }


    return (new Date(`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`))
}


export function returnCompanyList(allusers) {
    let companys = [];

    if (allusers.hasOwnProperty("myuser")) {
        // eslint-disable-next-line
        allusers.myuser.map(myuser => {

            if (myuser.hasOwnProperty("company")) {
                let checkcompany = true;
                let companyid = myuser.company.companyid;
                if (companys.length > 0) {
                    // eslint-disable-next-line
                    companys.map(company => {
                        if (company.companyid === companyid) {
                            checkcompany = false;
                        }
                    })
                }
                if (checkcompany) {

                    companys.push(myuser.company)
                }
            }

        })

    }
    return companys;
}
export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60)).toFixed(2)
    return totalhours;
}

export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes} ${ampm}`)

}
export function inputDateObjOutputAdjString(datein) {
    let offset = new Date().getTimezoneOffset() / 60
    let sym = "-";
    if (offset < 0) {
        sym = "+";
        offset = -offset;
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let year = datein.getFullYear();


    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    let hours = datein.getHours();
    let minutes = datein.getMinutes();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let newDate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:00${sym}${2 * offset}:00`)

    hours = newDate.getHours()
    month = newDate.getMonth() + 1;
    day = newDate.getDate();
    minutes = newDate.getMinutes();
    year = newDate.getFullYear();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return (`${year}-${month}-${day} ${hours}:${minutes}:00`)
}
export function inputDateObjOutputCalendarString(datein) {

    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    let hours = datein.getHours();
    let ampm = 'AM'
    if (hours > 12) {
        hours = hours - 12;
        ampm = 'PM'
    }
    let minutes = datein.getMinutes();
    let year = datein.getFullYear();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return (`${month}/${day}/${year} ${hours}:${minutes} ${ampm}`)
}

export function inputUTCStringForMaterialIDWithTime(timein) {
    let newDate = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }

    return (`${month}/${date}/${year}`);

}