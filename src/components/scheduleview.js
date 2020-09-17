import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
import { getScheduleDates, getWeekSchedule,formatDateStringDisplay, makeID} from './functions'

class ScheduleView {

    getypos() {
        const dynamicstyles = new DynamicStyles();
        const schedules = this.getSchedule();
   
        let employees = [];
        let equipment =[];

      

        const getemployeekey = (employees, providerid) => {
            let key = false;
            // eslint-disable-next-line
            employees.map((employee, i) => {
                if (employee.hasOwnProperty(providerid)) {
                    key = i;

                }
            })
            return key;
        }

        const validatenewequipment = (equipment, equipmentid) => {
            let validate = true;
            if (equipment.length > 0) {
                // eslint-disable-next-line
                equipment.map(myequipment => {
                    if (myequipment.hasOwnProperty(equipmentid)) {
                        validate = false;
                    }
                })
            }
            return validate;
        }

        

        const validatenewemployee = (employees, providerid) => {
            let validate = true;
            if (employees.length > 0) {
                // eslint-disable-next-line
                employees.map(employee => {
                    if (employee.hasOwnProperty(providerid)) {
                        validate = false;
                    }
                })
            }
            return validate;
        }
        let ypos = 80;
        if (schedules) {


            // eslint-disable-next-line
            schedules.map(schedule => {

                if (schedule.hasOwnProperty("laborid")) {

                    if (validatenewemployee(employees, schedule.providerid)) {
                        let me = {};
                        let employee = dynamicstyles.getemployeebyid.call(this, schedule.providerid)
                        me[schedule.providerid] = {};
                        me[schedule.providerid]["firstname"] = employee.firstname;
                        me[schedule.providerid]["lastname"] = employee.lastname;
                        me[schedule.providerid]["providerid"] = employee.providerid;
                        me[schedule.providerid]["schedule"] = [];
                        me[schedule.providerid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                        employees.push(me)
                    } else {
                        let i = getemployeekey(employees, schedule.providerid)
                        employees[i][schedule.providerid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })

                    }

              
                } else if (schedule.hasOwnProperty("equipmentid")) {
                
                    if (validatenewequipment(equipment, schedule.myequipmentid)) {
                        let me = {};
                        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, schedule.myequipmentid)
                        me[schedule.myequipmentid] = {};
                        me[schedule.myequipmentid]["equipmentid"] = schedule.myequipmentid;
                        me[schedule.myequipmentid]["equipment"] = myequipment.equipment;
                        me[schedule.myequipmentid]["schedule"] = [];
                        me[schedule.myequipmentid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                        equipment.push(me)
                       

                   
                    // let params = getWeekSchedule(dates.day_1, dates.day_7, schedule.timein,schedule.timeout)

                    // showschedule.push(<text className="timegraph-1" transform={`translate(0, ${ypos})`}>{equipment.equipment}</text>)
                    // showschedule.push(
                    // <rect className="timegraph-6" x={365.42 + params.init} y={ypos - 25} width={params.length} height="25" />)
                    // ypos+=50;

                    } else {
                        let i = getemployeekey(equipment, schedule.myequipmentid)
              
                        equipment[i][schedule.myequipmentid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })
                        

                    }

                }


            })



         ypos+=  equipment.length*50
         ypos += employees.length*50;


        } // end if schedule


        return ypos;


    }

    getschedule(type) {
        const dynamicstyles = new DynamicStyles();
        const schedules = this.getSchedule();
        let showschedule = [];
        let employees = [];
        let equipment =[];

        const getColorClass = (type) => {
            if(type === "schedule") {
                return("timegraph-6")
            } else if (type==="actual") {
                return("timegraph-6a")

            }
        }

        const getemployeekey = (employees, providerid) => {
            let key = false;
            // eslint-disable-next-line
            employees.map((employee, i) => {
                if (employee.hasOwnProperty(providerid)) {
                    key = i;

                }
            })
            return key;
        }

        const validatenewequipment = (equipment, equipmentid) => {
            let validate = true;
            if (equipment.length > 0) {
                // eslint-disable-next-line
                equipment.map(myequipment => {
                    if (myequipment.hasOwnProperty(equipmentid)) {
                        validate = false;
                    }
                })
            }
            return validate;
        }

        

        const validatenewemployee = (employees, providerid) => {
            let validate = true;
            if (employees.length > 0) {
                // eslint-disable-next-line
                employees.map(employee => {
                    if (employee.hasOwnProperty(providerid)) {
                        validate = false;
                    }
                })
            }
            return validate;
        }
        let ypos = 80;
        if (schedules) {



            const dates = getScheduleDates(`${this.state.timeinyear}-${this.state.timeinmonth}-${this.state.timeinday}`)

            // eslint-disable-next-line
            schedules.map(schedule => {

                if (schedule.hasOwnProperty("laborid")) {

                    if (validatenewemployee(employees, schedule.providerid)) {
                        let me = {};
                        let employee = dynamicstyles.getemployeebyid.call(this, schedule.providerid)
                        me[schedule.providerid] = {};
                        me[schedule.providerid]["firstname"] = employee.firstname;
                        me[schedule.providerid]["lastname"] = employee.lastname;
                        me[schedule.providerid]["providerid"] = employee.providerid;
                        me[schedule.providerid]["schedule"] = [];
                        me[schedule.providerid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                        employees.push(me)
                    } else {
                        let i = getemployeekey(employees, schedule.providerid)
                        employees[i][schedule.providerid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })

                    }

              
                } else if (schedule.hasOwnProperty("equipmentid")) {
                
                    if (validatenewequipment(equipment, schedule.myequipmentid)) {
                        let me = {};
                        const myequipment = dynamicstyles.getmyequipmentbyid.call(this, schedule.myequipmentid)
                        me[schedule.myequipmentid] = {};
                        me[schedule.myequipmentid]["equipmentid"] = schedule.myequipmentid;
                        me[schedule.myequipmentid]["equipment"] = myequipment.equipment;
                        me[schedule.myequipmentid]["schedule"] = [];
                        me[schedule.myequipmentid]["schedule"].push({ timein: schedule.timein, timeout: schedule.timeout })
                        equipment.push(me)
                       

                   
                    // let params = getWeekSchedule(dates.day_1, dates.day_7, schedule.timein,schedule.timeout)

                    // showschedule.push(<text className="timegraph-1" transform={`translate(0, ${ypos})`}>{equipment.equipment}</text>)
                    // showschedule.push(
                    // <rect className="timegraph-6" x={365.42 + params.init} y={ypos - 25} width={params.length} height="25" />)
                    // ypos+=50;

                    } else {
                        let i = getemployeekey(equipment, schedule.myequipmentid)
              
                        equipment[i][schedule.myequipmentid].schedule.push({ timein: schedule.timein, timeout: schedule.timeout })
                        

                    }

                }


            })





            if (employees.length > 0) {
                // eslint-disable-next-line
                employees.map(employee => {
                    let props = Object.getOwnPropertyNames(employee)
                    let firstname = employee[props[0]].firstname
                    let lastname = employee[props[0]].lastname
                    let key = employee[props[0]].providerid;
                    showschedule.push(<text key={key} className="timegraph-1" transform={`translate(0, ${ypos})`}>{firstname} {lastname}</text>)
                   

                    if (employee[props].hasOwnProperty("schedule")) {
                        // eslint-disable-next-line
                        employee[props[0]].schedule.map(myschedule => {
                        
                            let params = getWeekSchedule(dates.day_1, dates.day_7, myschedule.timein, myschedule.timeout)
        
                            if(params.init > 0 && params.init <=840) {
                            showschedule.push(<rect key={makeID(16)} className={getColorClass(type)} x={365.42 + params.init} y={ypos - 25} width={params.length} height="25" />)
                            }

                        })
                    }

                    ypos+=50;
                })

             
            } // end if employees length 



            if (equipment.length > 0) {
                // eslint-disable-next-line
                equipment.map(myequipment => {
                    let props = Object.getOwnPropertyNames(myequipment)
                    let equipment = myequipment[props[0]].equipment
                    let key = myequipment[props[0]].equipmentid;
                    showschedule.push(<text key={key} className="timegraph-1" transform={`translate(0, ${ypos})`}>{equipment}</text>)
 
            
                    if (myequipment[props].hasOwnProperty("schedule")) {
                        // eslint-disable-next-line
                        myequipment[props[0]].schedule.map(myschedule => {
                       
                            let params = getWeekSchedule(dates.day_1, dates.day_7, myschedule.timein, myschedule.timeout)
                            if(params.init > 0 && params.init <=840) {
                            showschedule.push(<rect key={makeID(16)} className={getColorClass(type)} x={365.42 + params.init} y={ypos - 25} width={params.length} height="25" />)
                            }
            
                        })
                    }
            
                    ypos+=50;
                })
            
             
            } // end if equipment length 


           


        } // end if schedule


        return showschedule;


    }

    showschedule(type) {
        const scheduleview = new ScheduleView();
        const styles = MyStylesheet();
        const dates = getScheduleDates(`${this.state.timeinyear}-${this.state.timeinmonth}-${this.state.timeinday}`)
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const getypos = scheduleview.getypos.call(this)
        const ypos = (getypos) => {
            if(getypos > 226.15) {
                return getypos;
            } else {
                return 226.15
            }

        }
        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                    <div style={{...styles.generalContainer,...styles.alignRight}}><span style={{...styles.generalFont,...regularFont}}>{formatDateStringDisplay(dates.day_1)} to {formatDateStringDisplay(dates.day_7)}</span></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1206.42 ${ypos(getypos)}`}>
                    <defs><style></style></defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="hide">
                            <g id="Layer_1-2" data-name="Layer 1">

                                <text className="timegraph-4" transform="translate(402.7 37.66) scale(1.28 1)">M</text><text className="timegraph-4" transform="translate(530.29 37.63) scale(1.28 1)">T</text><text className="timegraph-4" transform="translate(637.36 37.66) scale(1.28 1)">W</text><text className="timegraph-4" transform="translate(890.14 37.66) scale(1.28 1)">F</text><text className="timegraph-4" transform="translate(750.08 37.66) scale(1.28 1)">TH</text><text className="timegraph-4" transform="translate(990.37 37.63) scale(1.28 1)"><tspan className="timegraph-5">S</tspan><tspan x="25.07" y="0">A</tspan></text><text className="timegraph-4" transform="translate(1110.39 37.66) scale(1.28 1)">SU</text>





                                {scheduleview.getschedule.call(this,type)}


                                <rect className="timegraph-7" x="365.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="485.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="605.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="725.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="845.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="965.42" y="1" width="120" height="50" />
                                <rect className="timegraph-7" x="1085.42" y="1" width="120" height="50" />
                            </g>
                        </g>
                    </g>
                </svg>

            </div>)
    }
}
export default ScheduleView;