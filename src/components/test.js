const newBenefit = (benefitid, benefit, accountid, amount, frequency) => {
    return ({ benefitid, benefit, accountid, amount, frequency})
}

const calculateTotalDays = (purchasedate, salvagedate) => {

    const purchaseDate = new Date(`${purchasedate} 12:00:00${getOffsetDate(purchasedate)}`)
    const salvageDate = new Date(`${salvagedate} 12:00:00${getOffsetDate(salvagedate)}`)

    const purchasetime = purchaseDate.getTime();
    const salvagetime = salvageDate.getTime();
    const interval = salvagetime - purchasetime
    const days = interval / (1000 * 60 * 60 * 24)
    return Math.round(days)

}

const calculateTotalYears = (purchasedate, salvagedate) => {
    let totalyears = 0;
    const purchaseyearstr = purchasedate.split('/')
    const purchaseyear = Number(purchaseyearstr[0]);
    const purchasemonth =Number( purchaseyearstr[1]);
    const purchaseday = Number(purchaseyearstr[2]);
    const salvageyearstr = salvagedate.split('/')
    const salvageyear = Number(salvageyearstr[0])
    const salvagemonth = Number(salvageyearstr[1])
    const salvageday = Number(salvageyearstr[2])
    
    if (purchasemonth >= salvagemonth) {

        if (purchasemonth === salvagemonth) {

            if (purchaseday > salvageday) {

                totalyears = salvageyear - purchaseyear - 1

            } else {

                totalyears = salvageyear - purchaseyear


            }


        }



    } else {
        totalyears = salvageyear - purchaseyear

    }
    return (totalyears)


}

const calculateTotalMonths = (purchasedate, salvagedate) => {
    //  let purchasedate = '2018/05/24';
    // let saledate = '2025/01/24'
    const datePurchase = new Date(`${purchasedate}`);
    const salvageDate = new Date(`${salvagedate}`);
    const datePurchaseYear = datePurchase.getFullYear();
    const purchaseMonth = datePurchase.getMonth() + 1;
    const salvageDateYear = salvageDate.getFullYear();
    const salvageMonth = salvageDate.getMonth() + 1;
    const yearsinterval = salvageDateYear - datePurchaseYear;
    const monthInterval = salvageMonth - purchaseMonth;
    const totalMonths = (yearsinterval) * 12 + monthInterval;
    return (totalMonths)

}

const calculateTotalWeeks = (purchasedate, salvagedate)=> {

    const purchaseDate = new Date(`${purchasedate} 12:00:00${getOffsetDate(purchasedate)}`)
    const salvageDate = new Date(`${salvagedate} 12:00:00${getOffsetDate(salvagedate)}`)
    const purchasetime = purchaseDate.getTime();
    const salvagetime = salvageDate.getTime();
    const interval = salvagetime - purchasetime
    const weeks = interval / (1000 * 60 * 60 * 24 * 7)
    return Math.floor(weeks)

}

const increasedatebyoneday = (timein) => {

    //let timein = '2020/12/31';

    let datein = new Date(timein);
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
            } else {
                day = day + 1
            }
        }

    }

    if (day < 10) {
        day = `0${day}`
    }

    if (month < 10) {
        month = `0${month}`
    }
    return (`${year}/${month}/${day}`)
}

const increaseDateByOneWeek =(timein) =>{
    const offset = getOffsetDate(timein);
    const TimeIn = new Date(`${timein} 12:00:00${offset}`);
    let datetime = TimeIn.getTime();
    datetime += (1000 * 60 * 60 * 24 * 7)
    const oneWeek = new Date(datetime)
    let month = oneWeek.getMonth() + 1;
    month = trailingZeros(month)
    let day = oneWeek.getDate();
    day = trailingZeros(day)
    const year = oneWeek.getFullYear();
    return (`${year}/${month}/${day}`)


}

const increaseDateStringByOneMonth =(timein) => {

    const offset = getOffsetDate(timein)

    let datein = new Date(`${timein} 12:00:00${offset}`);
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

    if (month < 10) {
        month = `0${month}`;
    }
    date = datein.getDate();
    if (date < 10) {
        date = `0${date}`;
    }

    return (`${year}/${month}/${date}`);
}

const increaseCalendarDaybyOneYear = (timein) => {

    let datein = new Date(timein)
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
    let newDate = `${increaseYear}/${month}/${day}`
    return (newDate)
}

const trailingZeros =(num) => {

    if (num.toString().length === 1) {


        if (Number(num) < 10) {

            return (`0${num}`);
        } else {
            return num;
        }

    } else {
        return num;
    }

}


const makeID = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const  getOffsetDate =(timein) => {
    let datein = new Date(`${timein} 00:00:00 UTC`)
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

const getInterval =(reoccurring, amount, detail) => {
 
  const newDate = new Date();
  const year = newDate.getFullYear();
  let purchasedate = `${year}/01/01`
  let salvagedate =`${year+1}/01/01`
   
    let period = 0;
    let x = 0;
    let benefit = {};
    let benefitArray = [];
    switch (reoccurring) {
        case 'daily':
            period = calculateTotalDays(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                benefit = newBenefit(makeID(16), detail, purchasedate, amount)
                benefitArray.push(benefit)
                console.log(purchasedate)
                purchasedate = increasedatebyoneday(purchasedate)

            }
            break;
        case 'weekly':
            period = calculateTotalWeeks(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                benefit = newBenefit(makeID(16), detail, purchasedate, amount)
                benefitArray.push(benefit)
                purchasedate = increaseDateByOneWeek(purchasedate)
            }
            break;
        case 'monthly':
            period = calculateTotalMonths(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                benefit = newBenefit(makeID(16), detail, purchasedate, amount)
                benefitArray.push(benefit)
                purchasedate = increaseDateStringByOneMonth(purchasedate)
            }

            break;
        case 'annually':
            period = calculateTotalYears(purchasedate, salvagedate)
            for (x = 0; x < period; x++) {
                benefit = newBenefit(makeID(16), detail, purchasedate, amount)
                benefitArray.push(benefit)
                purchasedate = increaseCalendarDaybyOneYear(purchasedate)
            }

            break;


        default:
            break
   

}

  return benefitArray

    }

getInterval('annually',100,'charleeneeeee')



