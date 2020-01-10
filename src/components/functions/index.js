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
                    console.log("adding company", myuser.company)
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