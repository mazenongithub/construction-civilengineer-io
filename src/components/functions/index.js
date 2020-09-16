export function CreateUser(providerid, client, clientid, firstname, lastname, emailaddress, phonenumber, profileurl, profile) {
    return ({ providerid, client, clientid, firstname, lastname, emailaddress, phonenumber, profileurl, profile })
}
export function CreateAccount(accountid, accountname, providerid) {
    return ({ accountid, accountname, providerid })
}
export function CreateCSI(csiid, csi, title) {
    return ({ csiid, csi, title })
}

export function isNumeric(val) {

    if (val) {
        return (!isNaN(val))
    } else {
        return (true);
    }


}

export function CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost) {
    return ({ materialid, material, providerid, accountid, csiid, unit, unitcost })
}
export function CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit) {
    return ({ materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid, profit })
}
export function CreateActualMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit) {
    return ({ materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, invoiceid, profit })
}
export function CreateBenefit(benefitid, benefit, accountid, amount) {
    return ({ benefitid, benefit, accountid, amount })
}
export function CreateCompany(url, company, address, city, contactstate, zipcode) {
    return ({ url, company, address, city, contactstate, zipcode })
}
export function CreateRentalRate(month, week, day, hour) {
    return ({ month, week, day, hour })
}
export function CreateMyProposal(proposalid, providerid, updated, approved) {
    return ({ proposalid, providerid, updated, approved })
}
export function CreateInvoice(invoiceid, providerid, updated, approved) {
    return ({ invoiceid, providerid, updated, approved })
}
export function EquipmentOwnership(workinghours, purchasedate, saledate, loaninterest, resalevalue) {
    return ({ workinghours, purchasedate, saledate, loaninterest, resalevalue })
}
export function CreateEquipment(equipmentid, equipment, ownershipstatus, accountid) {
    return ({ equipmentid, equipment, ownershipstatus, accountid })
}
export function CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit) {
    return ({ equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, proposalid, profit })
}
export function CreateActualEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit) {
    return ({ equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, equipmentrate, invoiceid, profit })
}
export function CreateCostID(costid, cost, detail, timein) {
    return ({ costid, cost, detail, timein })
}
export function CreateScheduleLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit) {
    return ({ laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, proposalid, profit })
}

export function dateStringFromUTCTime(timein) {
    //const timein = `2020-04-19 16:00:00`
    let mydate = new Date(`${timein.replace(/-/g, '/')} UTC`)
    const year = mydate.getFullYear();
    let month = mydate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = mydate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
export function calculateTotalMonths(purchasedate, saledate) {
    //     let purchasedate = '2018-05-24';
    // let saledate = '2025-01-24'
    const datePurchase = new Date(`${purchasedate.replace(/-/g, '/')} UTC`);
    const saleDate = new Date(`${saledate.replace(/-/g, '/')} UTC`);
    const datePurchaseYear = datePurchase.getFullYear();
    const purchaseMonth = datePurchase.getMonth() + 1;
    const saleDateYear = saleDate.getFullYear();
    const saleMonth = saleDate.getMonth() + 1;
    const yearsinterval = saleDateYear - datePurchaseYear;
    const monthInterval = saleMonth - purchaseMonth;
    const totalMonths = (yearsinterval) * 12 + monthInterval;
    return (totalMonths)
}
export function UTCStringFormatDateforProposal(timeout) {
    let newDate = new Date(`${timeout.replace(/-/g, '/')}-00:00`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let century = Math.floor(year / 100) * 100;
    year = year - century;
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let timeofday = "";
    if (hours >= 12) {
        timeofday = "pm"
    }
    else {
        timeofday = "am"
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    return (`${month}/${day}/${year} at ${hours}:${minutes} ${timeofday}`)
}

export function initfromtimeout(timeout) {
//let timeout= '2020-04-21 01:24:32'
const dateout = new Date(`${timeout.replace(/-/g, '/')} UTC`)
const hoursout = dateout.getHours();
const minutesout = dateout.getMinutes();
const heightout = hoursout *100 - (minutesout/60)*100;
const init = heightout
return(init)
}

export function scheduleHeight(timein, timeout, scale) {
    //let timein ='09:00:00'
    timein = timein.split(':')
    //let timeout ='16:00:00'
    //let scale = 40;
    timeout = timeout.split(':')
    let timeinsec = 3600 * Number(timein[0]) + 60 * Number(timein[1]) + Number(timein[2])
    let timeoutsec = 3600 * Number(timeout[0]) + 60 * Number(timeout[1]) + Number(timeout[2])
    let height = (timeoutsec - timeinsec) / 3600 * scale * 4
    return (height)
}

export function getTimeFromUTCString(timein) {
    //const timein = `2020-04-19 19:00:00`
    let mydate = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let hours = mydate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = mydate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = mydate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return (`${hours}:${minutes}:${seconds}`)
}

export function sorttimes(timeina, timeinb) {
    timeina = new Date(timeina.replace(/-/g, '/'))
    timeinb = new Date(timeinb.replace(/-/g, '/'))
    if (timeina < timeinb) {
        return -1;
    }
    else if (timeinb > timeina) {
        return 1;
    }
    else {
        return 0;
    }
}

export function CreateActualLabor(laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit) {
    return ({ laborid, providerid, milestoneid, csiid, timein, timeout, laborrate, description, invoiceid, profit })
}
export function CreateBidScheduleItem(csiid, unit, quantity) {
    return ({ csiid, unit, quantity })
}
export function CreateBidItem(csiid, unit, quantity) {
    return ({ csiid, unit, quantity })
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
export function decreaseCalendarDaybyOneYear(timein) {
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentYear = datein.getFullYear();
    let decreaseYear = currentYear - 1;
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${decreaseYear}-${month}-${day}`
    return (newDate)
}
export function decreaseCalendarDaybyOneMonth(timein) {
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentMonth = datein.getMonth() + 1;
    let year = datein.getFullYear();
    let decreaseMonth = currentMonth;
    if (currentMonth === 1) {
        decreaseMonth = 12;
        year -= 1
    } else {
        decreaseMonth -= 1;
    }

    let day = datein.getDate();
    if (decreaseMonth < 10) {
        decreaseMonth = `0${decreaseMonth}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    let newDate = `${year}-${decreaseMonth}-${day}`
    return (newDate)
}
export function increaseCalendarDayOneMonth(timein) {
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentMonth = datein.getMonth() + 1;
    let year = datein.getFullYear();
    let increaseMonth = currentMonth;
    if (currentMonth === 12) {
        increaseMonth = 1;
        year += 1
    } else {
        increaseMonth += 1;
    }

    let day = datein.getDate();
    if (increaseMonth < 10) {
        increaseMonth = `0${increaseMonth}`
    }

    if (day < 10) {
        day = `0${day}`
    }

    let newDate = `${year}-${increaseMonth}-${day}`
    return (newDate)
}
export function increaseCalendarDaybyOneYear(timein) {
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)
    let currentYear = datein.getFullYear();
    let increaseYear = currentYear + 1;
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let newDate = `${increaseYear}-${month}-${day}`
    return (newDate)
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

export function getmonth(dateobj) {

    let month = dateobj.getMonth();
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}
export function dateStringfromobj(datein) {
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = datein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = datein.getFullYear();
    return `${year}-${month}-${day}`

}

export function getDayofWeek(firstday) {

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
export function  getDayfromDateString (date) {
    let dates = date.split('-')
   return dates[2]
  
  }
export function getScheduleDates(datestring) {
    //const datestring = `2020-04-14`
    const offset = getOffsetDate(datestring)
    const newDate = new Date(`${datestring.replace(/-/g, '/')} 00:00:00${offset}`)
    const day = newDate.getDay();
    const dayofweek = getDayofWeek(day)
    let day_1 = "";
    let day_2 = "";
    let day_3 = "";
    let day_4 = "";
    let day_5 = "";
    let day_6 = "";
    let day_7 = "";
    switch (dayofweek) {
        case "Mon":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (6 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime() + (5 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime() + (4 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime() + (3 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime() + (2 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime()))
            break;
        case "Tues":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (5 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime() + (4 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime() + (3 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime() + (2 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime()))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))

            break;
        case "Weds":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (4 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime() + (3 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime() + (2 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime()))
            day_2 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (2 * 1000 * 24 * 60 * 60)))
            break;
        case "Thurs":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (3 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime() + (2 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime()))
            day_3 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime() - (2 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (3 * 1000 * 24 * 60 * 60)))
            break;
        case "Fri":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (2 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime()))
            day_4 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime() - (2 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime() - (3 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (4 * 1000 * 24 * 60 * 60)))
            break;
        case "Sat":
            day_7 = dateStringfromobj(new Date(newDate.getTime() + (1 * 1000 * 24 * 60 * 60)))
            day_6 = dateStringfromobj(new Date(newDate.getTime()))
            day_5 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime() - (2 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime() - (3 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime() - (4 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (5 * 1000 * 24 * 60 * 60)))
            break;
        case "Sun":
            day_7 = dateStringfromobj(newDate);
            day_6 = dateStringfromobj(new Date(newDate.getTime() - (1 * 1000 * 24 * 60 * 60)))
            day_5 = dateStringfromobj(new Date(newDate.getTime() - (2 * 1000 * 24 * 60 * 60)))
            day_4 = dateStringfromobj(new Date(newDate.getTime() - (3 * 1000 * 24 * 60 * 60)))
            day_3 = dateStringfromobj(new Date(newDate.getTime() - (4 * 1000 * 24 * 60 * 60)))
            day_2 = dateStringfromobj(new Date(newDate.getTime() - (5 * 1000 * 24 * 60 * 60)))
            day_1 = dateStringfromobj(new Date(newDate.getTime() - (6 * 1000 * 24 * 60 * 60)))
            break;
        default:
            break;
    }

    return { day_1, day_2, day_3, day_4, day_5, day_6, day_7 }
}
export function checkBlackout() {
    
}

export function getWeekSchedule(day_1, day_7, timein,timeout) {
// let day_1 = '2020-07-27';
// let day_7 = '2020-08-02';
// let timein = '2020-07-28 15:00:00'
// let timeout = '2020-07-29 02:00:00'

const offset_1 = getOffsetDate(day_1)
const origin = new Date(`${day_1.replace(/-/g, '/')} 00:00:00${offset_1}`)
const t0 = origin.getTime();
const offset_2 = getOffsetDate(day_7)
const endpoint =new Date(`${day_7.replace(/-/g, '/')} 23:59:59${offset_2}`);
const tEnd = endpoint.getTime();
const point  = new Date(`${timein.replace(/-/g, '/')} UTC`)
const tX = point.getTime();

const timeoutpoint =  new Date(`${timeout.replace(/-/g, '/')} UTC`)
const toutX = timeoutpoint.getTime()
const length = (toutX -tX)/(1000*60*60*(1/5))
const init = ((tX-t0)/(tEnd-t0))*840
return({init,length})

}
export function getOffsetDate(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00 UTC`)
    let offset = datein.getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)
}
export function makeDatefromTimein(timein) {
    const offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`)

    let year = datein.getFullYear();
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }

    return (`${year}-${month}-${date}`)
}
export function makeDatefromObj(datein) {
    let year = datein.getFullYear();
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }

    return (`${year}-${month}-${date}`)
}
export function inputDatePickerOutputDateObj(value) {

    let offset = new Date().getTimezoneOffset() / 60
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }

    let newDate = new Date(`${value.replace(/-/g, '-')} 00:00:00${sym}${offset}:00`)
    return newDate;
}


export function formatDateforCalendarDisplay(datein) {
    let month = getmonth(datein);
    let year = datein.getFullYear();
    return (`${month} ${year}`)
}
export function adjustdatefromcalendar(timein, value) {

    let offset = new Date(`${timein.replace(/-/g, '/')} 00:00:00`).getTimezoneOffset() / 60;
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

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let minutes = datein.getMinutes();
    let seconds = datein.getSeconds();
    let fakedate = new Date(`${value.replace(/-/g, '/')} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
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
    let month = fakedate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = fakedate.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = fakedate.getFullYear();
    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`)
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


export function LetterCounter(num) {

    const numericAlpha = (num) => {
        switch (Number(num)) {
            case 1:
                return 'A'
            case 2:
                return 'B'
            case 3:
                return 'C'
            case 4:
                return 'D'
            case 5:
                return 'E'
            case 6:
                return 'F'
            case 7:
                return 'G'
            case 8:
                return 'H'
            case 9:
                return 'I'
            case 10:
                return 'J'
            case 11:
                return 'K'
            case 12:
                return 'L'
            case 13:
                return 'M'
            case 14:
                return 'N'
            case 15:
                return 'O'
            case 16:
                return 'P'
            case 17:
                return 'Q'
            case 18:
                return 'R'
            case 19:
                return 'S'
            case 20:
                return 'T'
            case 21:
                return 'U'
            case 22:
                return 'V'
            case 23:
                return 'W'
            case 24:
                return 'X'
            case 25:
                return 'Y'
            case 26:
                return 'Z'
            default:
                return ''

        }



    }

    let Zs = 0;
    let newnum = "";
    let Z = "";
    if (num > 26) {

        Zs = Math.floor(num / 26);

        for (let i = 0; i < Zs; i++) {

            Z += `Z`

        }
        newnum = num % 26

    } else {
        newnum = num;
    }

    return `${Z}${numericAlpha(newnum)}`

}

export function sortpart(b, a) {
    if (Number(b.part) < Number(a.part)) {
        return -1

    } else {
        return 1;
    }

}
export function toggleAMTimeString(timein) {

    //let timein = '2020-04-08 15:00:00'
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }

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
    hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }

    let newtimein = `${year}-${month}-${day} ${hours}:${minutes}:00`
    let utcdate = new Date(`${newtimein.replace(/-/g, '/')}${sym}${2 * offset}`)
    month = utcdate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }

    day = utcdate.getDate()
    if (day < 10) {
        day = `0${day}`
    }

    year = utcdate.getFullYear();

    hours = utcdate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = utcdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:00`)

}

export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
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
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
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
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}

export function scheduleBox(timein,timeout) {
const datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
const dateout = new Date(`${timeout.replace(/-/g, '/')} UTC`)

const hoursin = datein.getHours();
const minutesin = datein.getMinutes();
const heightin = hoursin *100 - (minutesin/60)*100;

const hoursout = dateout.getHours();
const minutesout = dateout.getMinutes();
const heightout = hoursout *100 - (minutesout/60)*100;

const height = heightout - heightin
const init = heightin 
return{height,init}
}

export function getOffsetTime(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let offset = datein.getTimezoneOffset() / 60;

    let sym = "+";
    if (offset > 0) {
        sym = "-";
    }
    if (Math.abs(offset) < 10) {
        offset = `0${offset}`
    }
    return (`${sym}${offset}:00`)

}

export function increaseDateStringByOneMonth(timein) {

    let offset = getOffsetTime(timein)

    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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

    return (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
}

export function addincDateObj(datein, inc) {
    return (new Date(datein.getTime() + inc))
}
export function decreaseDateStringByOneMonth(timein) {

    let offset = getOffsetTime(timein)
    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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
    let offset = getOffsetTime(timein)

    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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

    let offset = getOffsetTime(timein)

    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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
    let offset = getOffsetTime(timein)
    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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

    let offset = getOffsetTime(timein)
    let datein = new Date(`${timein.replace(/-/g, '/')}${offset}`);
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

    let newDate = new Date(`${timein.replace(/-/g, '/')} UTC`);
    return (newDate)
}

export function getDayString(day) {

    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return;
    }
}

export function getFirstIsOnDate(datein) {

    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
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


export function check_31_date(dateobj) {

    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_date(dateobj) {

    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_date(dateobj) {

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


export function check_31_time(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}


export function check_30_time(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}


export function check_29_feb_leapyear_time(timein) {
    const dateobj = new Date(`${timein.replace(/-/g, '/')} UTC`)
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
export function getFirstIsOnTime(timein) {
    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let monthdisplay = datein.getMonth() + 1;
    let fullyear = datein.getFullYear();
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
export function formatDateStringDisplay(timein) {
    timein.replace(/-/g, '/')
    timein = timein.split('-')
    let year = "";
    let month = "";
    let day = "";

    if (timein.length === 3) {
        year = timein[0]
        month = timein[1]
        day = timein[2]
    }
    return (`${month}/${day}/${year}`)
}
export function inputSecOutDateString(dateencoded) {

    const newDate = new Date(dateencoded)
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
}
export function inputDateStringOutputSeconds(timein) {
    let offset = getOffsetDate(timein)
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`);
    return (datein.getTime())
}
export function inputtimeDBoutputCalendarDaySeconds(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear();
    let offset = getOffsetTime(timein);
    let newDate = new Date(`${year}/${month}/${date} 00:00:00${offset}`)
    return (newDate.getTime())
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


export function CreateEmployee(providerid, workinghours) {
    return ({ providerid, workinghours })
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

export function ProfitForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost)) * (Number(item.profit) / 100)
}
export function DirectCostForMaterial(item) {
    return (Number(item.quantity) * Number(item.unitcost))
}
export function DirectCostForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate))
}
export function DirectCostForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate))
}
export function ProfitForEquipment(item) {

    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.equipmentrate)) * (Number(item.profit) / 100)
}
export function ProfitForLabor(item) {
    return (Number(calculatetotalhours(item.timeout, item.timein)) * Number(item.laborrate)) * (Number(item.profit) / 100)
}

export function calculatetotalhours(timeout, timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}`)
    let dateout = new Date(`${timeout.replace(/-/g, '/')}`)
    let totalhours = ((dateout.getTime() - datein.getTime()) / (1000 * 60 * 60))
    return totalhours;
}

export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
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
export function DateStringFromDateObj(datein) {
    let year = datein.getFullYear();
    let month = datein.getMonth() + 1;
    let day = datein.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return (`${year}-${month}-${day}`)
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

export function monthstring(month) {


    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}

export function getEquipmentRentalObj(timein, timeout) {
    // let timein = '2021-03-06 17:52:33';
    // let timeout = '2021-04-17 19:52:33';

    let datein = new Date(`${timein.replace(/-/g, '/')} UTC`);
    let offset = datein.getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    } else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    offset = `${sym}${offset}:00`
    let dateout = new Date(`${timeout.replace(/-/g, '/')} UTC`);
    let dateinYear = datein.getFullYear();
    let dateoutYear = dateout.getFullYear();
    let dateinMonth = datein.getMonth() + 1;
    let dateoutMonth = dateout.getMonth() + 1;
    let dateoutDate = dateout.getDate();
    let dateinDate = datein.getDate();
    let months = 0;
    let weeks = 0;
    let days = 0;
    let hours = 0;
    hours = (dateout.getTime() - datein.getTime()) / (1000 * 3600);


    if (dateoutYear !== dateinYear) {


        months += (dateoutYear - dateinYear) * 12;
        months += dateoutMonth - dateinMonth;
        if (dateoutDate < dateinDate) {
            months -= 1
        }
    } else if (dateoutMonth !== dateinMonth) {
        if (dateoutDate > dateinDate) {
            months += 1
        }
    }

    if (months > 0) {

        let monthCutoff = dateoutMonth;
        if (monthCutoff < 10) {
            monthCutoff = `0${monthCutoff}`
        }
        let dayCutoff = dateinDate
        if (dayCutoff < 10) {
            dayCutoff = `0${dayCutoff}`
        }
        let yearCutoff = dateoutYear
        let hourCutoff = datein.getHours()
        if (hourCutoff < 10) {
            hourCutoff = `0${hourCutoff}`
        }
        let minuteCutoff = datein.getMinutes();
        if (minuteCutoff < 10) {
            minuteCutoff = `0${minuteCutoff}`
        }
        let secondCutoff = datein.getSeconds();
        if (secondCutoff < 10) {
            secondCutoff = `0${secondCutoff}`
        }
        let cutDate = `${yearCutoff}-${monthCutoff}-${dayCutoff} ${hourCutoff}:${minuteCutoff}:${secondCutoff}`
        let cutOffDate = new Date(`${cutDate.replace(/-/g, '/')}${offset}`)
        let timecutoff = cutOffDate.getTime();
        hours = (dateout.getTime() - timecutoff) / (1000 * 3600)
    }


    if (hours > (24 * 7)) {
        weeks = Math.floor(hours / (24 * 7))
        hours = hours - (weeks * 24 * 7);
    }
    if (hours > 24) {
        days = Math.floor(hours / 24)
        hours = hours - (24 * days)
    }

    let obj = { hours, days, weeks, months }

    return (obj)
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

export function validatePassword(val) {
    let validate = {};
    validate.validate = true;
    validate.message = '';
    const reg_ex = /^[a-zA-Z0-9!#$%&?"]{6,}$/
    let test = reg_ex.test(val)
    if (val.length < 6) {
        validate.message = `Password min length is 6 `;
        validate.validate = false;
    } else if (!test) {
        validate.message = `Invalid Password format`;
        validate.validate = false;
    }

    return validate;
}

export function calculateFloat (day_1, day_2) {
    const date_1 =new Date(`${day_1.replace(/-/g, '/')} 00:00:00${getOffsetDate(day_1)}`)
    const date_2 =new Date(`${day_2.replace(/-/g, '/')} 00:00:00${getOffsetDate(day_2)}`)
    const time = date_2.getTime() - date_1.getTime();
    return Math.round(time/(1000*60*60*24))
    
  }

  export function calculateday(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-24'

    let xo = int.split('-');
    let x1 = xo[0];
    let x2 = xo[1];
  	let x3 = xo[2]

    let initime = `${x1}-${x2}-${x3}`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start)) * 200;
    //completion = '2020-04-20'
    const days = getDateInterval(start, completion)
    const width = (days) * 200

    return { width, xo, initime }
}

export function calculatemonth(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'



    let xo = int.split('-');
    let x1 = xo[0]
    let x2 = xo[1]

    let initime = `${x1}-${x2}-01`
    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 30.41) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion);
    const width = (days / 30.41) * 200
    return { width, xo }

}

export function calculateyear(int, compl, start, completion) {
    //int = '2020-04-18'
    //compl = '2022-04-18'

    let xo = int.split('-');
    let x1 = xo[0]

    let initime = `${x1}-01-01`


    //start = '2020-04-18'
    xo = (getDateInterval(initime, start) / 365) * 200;
    //completion = '2020-09-18'
    const days = getDateInterval(start, completion)
    const width = (days / 365) * 200

    return { width, xo }
}

export function checkemptyobject(obj) {
    let empty = true;
    // eslint-disable-next-line
    for(let x in obj) {
      empty = false;
      
    }
    
   return empty; 
  }

  export function increasedatebyoneday(timein) {

    //let timein = '2020-12-31';
    let offset = getOffsetDate(timein);
    let datein = new Date(`${timein.replace(/-/g, '/')} 00:00:00${offset}`);
    let newdate = new Date(datein.getTime())
    let day = newdate.getDate();
    let month = newdate.getMonth() + 1;
    let year = newdate.getFullYear();
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        if (day === 31) {
            day = 1;
            if (month !== 12) {
                month = month + 1;

            } else {
                month = 1;
                year = year + 1;
            }
        } else {
            day = day + 1;

        }

    }

    if (month === 4 || month === 6 || month === 9 || month === 11) {

        if (day === 30) {
            day = 1;
            month = month + 1;
        } else {
            day = day + 1;
        }
    }


    if (month === 2) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            if (day === 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day === 28) {
                day = 1;
                month = month + 1;
            }
        }

    }

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}-${month}-${day}`)
}


export function monthString(month) {


    switch (month) {
        case 0:
            return ("Jan");
        case 1:
            return ("Feb");
        case 2:
            return ("Mar");
        case 3:
            return ("Apr");
        case 4:
            return ("May");
        case 5:
            return ("Jun");
        case 6:
            return ("Jul");
        case 7:
            return ("Aug");
        case 8:
            return ("Sept");
        case 9:
            return ("Oct");
        case 10:
            return ("Nov");
        case 11:
            return ("Dec");
        default:
            break;
    }
}

export function getDateTime (datestr)  {
    let offset = getOffsetDate(datestr)
    let datein = new Date(`${datestr.replace(/-/g, '/')} 00:00:00${offset}`)
    return datein.getTime();
  }

export function trailingZeros(num) {
    if (num < 10) {
        return (`0${num}`);
    } else {
        return num;
    }

}


  export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  export function milestoneformatdatestring(datein) {

    let dateinArray = datein.split('-');
    if (dateinArray.length === 3) {
        let newDate = `${dateinArray[1]}/${dateinArray[2]}/${dateinArray[0]}`
        return newDate;
    } else {
        return datein;
    }

}

  export function getScale(interval) {

    let scale = "";
    if (interval < 180) {
        scale = "day"
    } else if (interval <= 730) {
        scale = "month"
    } else {
        scale = "year"
    }
    return scale;

}

  export function getDateInterval(start, completion) {

    const offsetstart = getOffsetDate(start);
    const datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    //const offsetcompletion= getOffsetDate(completion);
    const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetstart}`)
    const starttime = datestart.getTime();
    const endtime = datecompletion.getTime();
    const interval = (endtime - starttime) / (3600000 * 24);
    return (interval)
}

export function validateCompanyID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (!value) {
        errmsg = " Company URL is required ";

    }
    else if (value.length > 36) {
        errmsg = " Company URL should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Company URL format ${value} `;
    }

    return errmsg;
}
export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (!value) {
        errmsg = " ProviderID is required ";

    }
    else if (value.length > 36) {
        errmsg = " ProviderID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}
export function validatePhoneNumber(val) {
    let errmsg = "";

    var reg_ex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    var test = reg_ex.test(val)
    if (val.length === 0) {
        errmsg += "Phone Number is required ";

    }
    else if (!test) {
        errmsg += ` ${val} is an invalid phonenumber format `

    }

    return errmsg;
}
export function AmmortizeFactor(i, n) {
    i = ((i / 1200));
    // let n = 80;

    const num = i * Math.pow((1 + i), n)

    const deno = Math.pow((1 + i), n) - 1;

    const factor = num / deno;

    return factor;
}
export function FutureCostPresent(i, n, F) {
    // let F=540;
    // let i=(.058/12);
    // let n = 40;
    return (F * (Math.pow((1 + i), n)))

}
export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    let errmsg = ""
    if (!value) {
        errmsg += `Email Address is required `

    }


    else if (!test) {

        errmsg += ` Email Address ${value} format is invalid `;

    }
    return errmsg;
}

export function leadingZero(str) {
    if(str.indexOf('.') === str.length - 1) {
     str= `${str}0` 
      
    }
      return str;
    }

export function sortcode(codeb, codea) {

    if (Number(codea.csi) < Number(codeb.csi)) {

        return 1;
    }
    else if (Number(codeb.csi) < Number(codea.csi)) {

        return -1;
    }
    else {
        return 0;
    }
}

export function getYearfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    return newDate.getFullYear();

}

export function getAMPMfromTimeIn(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let hours = newDate.getHours();
    let ampm = "";
    if (hours > 12) {
        ampm = 'pm'

    } else {
        ampm = 'am'
    }

    return (ampm);
}
export function validateMinutes(min) {
    const reg_ex = /^[0-5][0-9]$/;
    return (reg_ex.test(min));
}
export function validateYear(year) {
    const reg_ex = /^[12][0-9]{3}$/;
    return (reg_ex.test(year));
}
export function validateDate(date) {
    const reg_ex = /^(0?[1-9]|[12][0-9]|3[01])$/;
    return (reg_ex.test(date));

}
export function validateMonth(mon) {
    const reg_ex = /^0[1-9]|1[0-2]$/;
    return (reg_ex.test(mon))
}
export function makeTimeString(year, month, day, hours, minutes, time) {
    return `${year}-${month}-${day} ${hours}:${minutes} ${time}`
}

export function UTCTimeStringfromTime(timein) {
    //let timein = '2020-06-02 04:01 pm'
    const time = timein.substring(17, 19)
    let hours = timein.substring(11, 13);
    if (time === 'pm' && hours !== '12') {
        hours = Number(hours) + 12
    } else if (time === 'am' && hours === '12') {
        hours = '00'
    }
    const sym = () => {
        let myoffset = new Date().getTimezoneOffset() / 60
        let sym = "+";
        if (myoffset > 0) {
            sym = "-"
        }
        return sym;

    }
    const extraoffset = () => {
        let myoffset = (new Date().getTimezoneOffset() / 60) * 2

        if (myoffset < 10) {
            myoffset = `0${myoffset}`
        }
        return myoffset;
    }
    let minutes = timein.substring(14, 16)
    let year = timein.substring(0, 4)
    let month = timein.substring(5, 7);
    let day = timein.substring(8, 10)

    timein = `${year}/${month}/${day} ${hours}:${minutes}:00${sym()}${extraoffset()}:00`
    const newDate = new Date(timein)
    hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    year = newDate.getFullYear();
    day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:00`);
}


export function getMinutesfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return (minutes);
}

export function getHoursfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let hours = newDate.getHours();
    if (hours > 12) {
        hours = hours - 12;

    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    return (hours);

}

export function getDayfromTimein(timein) {
    //let timein ='2020-05-13 20:00:00'
    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let date = newDate.getDate();
    if (date < 10) {
        date = `0${date}`

    }
    return date;
}

export function getMonthfromTimein(timein) {

    timein = timein.replace(/-/g, '/');
    const newDate = new Date(`${timein} UTC`)
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`

    }

    return month;
}

