import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { getDayfromDateString, dateStringFromUTCTime, scheduleBox, initfromtimeout, getOffsetDate, inputUTCStringForLaborID } from './functions'


class ShowSchedule extends Component {
    schedule_1() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const smallFont = dynamicstyles.getSmallFont.call(this)

        const myschedule = this.getschedule();
        let schedule_1jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {
                const csi = dynamicstyles.getcsibyid.call(this,schedule.csiid)
                const project = dynamicstyles.getprojectbymilestoneid.call(this,schedule.milestoneid) 
                console.log(project)

                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_1)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_1) {

                        let height = params.height;
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                          <rect className="scheduleview-8" width="149.95" height={height} />
                            <foreignObject x="0" y="0" width="150px" height={height}>
                                <div style={{...styles.generalContainer, ...styles.zIndex}}>
                                    <span style={{...styles.generalFont,...smallFont,...styles.zIndex}}> {inputUTCStringForLaborID(schedule.timein)} - {inputUTCStringForLaborID(schedule.timeout)} {project.title} {csi.csi} {csi.title}</span>
                                </div>
                            </foreignObject>
                          
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_2) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_3) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_4) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_5) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {
                        schedule_1jsx.push(<g transform={`translate(81,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(230.93, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_1jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                    }


                }

            })
        }

        return schedule_1jsx;



    }

    schedule_2() {

        const myschedule = this.getschedule();
        let schedule_2jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_2)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_2) {

                        let height = params.height;
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_3) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_4) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_5) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {
                        schedule_2jsx.push(<g transform={`translate(230.93,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_2jsx.push(<g transform={`translate(381.29, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_2jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)

                    }


                }

            })
        }

        return schedule_2jsx;



    }

    schedule_3() {

        const myschedule = this.getschedule();
        let schedule_3jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_3)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_3) {

                        let height = params.height;
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_4) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_3jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_5) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_3jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)



                        schedule_3jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)



                        schedule_3jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {
                        schedule_3jsx.push(<g transform={`translate(381.29,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)



                        schedule_3jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_3jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)

                    }


                }

            })
        }

        return schedule_3jsx;



    }

    schedule_4() {

        const myschedule = this.getschedule();
        let schedule_4jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_4)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_4) {

                        let height = params.height;
                        schedule_4jsx.push(<g transform={`translate(531.22,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_5) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_4jsx.push(<g transform={`translate(531.22,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_4jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_4jsx.push(<g transform={`translate(531.22,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_4jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_4jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_4jsx.push(<g transform={`translate(531.22,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_4jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_4jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_4jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {
                        schedule_4jsx.push(<g transform={`translate(531.22,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_4jsx.push(<g transform={`translate(681.09, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_4jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_4jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)

                    }


                }

            })
        }

        return schedule_4jsx;

    }

    schedule_5() {

        const myschedule = this.getschedule();
        let schedule_5jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_5)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_5) {

                        let height = params.height;
                        schedule_5jsx.push(<g transform={`translate(681.09,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_5jsx.push(<g transform={`translate(681.09,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_5jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_5jsx.push(<g transform={`translate(681.09,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_5jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_5jsx.push(<g transform={`translate(531.22, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {

                        schedule_5jsx.push(<g transform={`translate(681.09,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                        schedule_5jsx.push(<g transform={`translate(831.02, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)
                        schedule_5jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)

                    }


                }

            })
        }

        return schedule_5jsx;

    }

    schedule_6() {

        const myschedule = this.getschedule();
        let schedule_6jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_6)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_6) {

                        let height = params.height;
                        schedule_6jsx.push(<g transform={`translate(831.02,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)

                    } else if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {
                        let initout = initfromtimeout(schedule.timeout)
                        schedule_6jsx.push(<g transform={`translate(831.02,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_6jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={initout} />
                        </g>)

                    } else {
                        schedule_6jsx.push(<g transform={`translate(831.02,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)

                        schedule_6jsx.push(<g transform={`translate(980.98, 61.5)`}>
                            <rect className="scheduleview-8" width="149.95" height={2400} />
                        </g>)

                    }


                }

            })
        }

        return schedule_6jsx;

    }

    schedule_7() {

        const myschedule = this.getschedule();
        let schedule_7jsx = [];
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {


                if (
                    (dateStringFromUTCTime(schedule.timein) === this.state.day_7)
                ) {

                    let params = scheduleBox(schedule.timein, schedule.timeout)
                    let init = params.init;
                    if (dateStringFromUTCTime(schedule.timeout) === this.state.day_7) {

                        let height = params.height;
                        schedule_7jsx.push(<g transform={`translate(980.98,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={height} />
                        </g>)


                    } else {

                        schedule_7jsx.push(<g transform={`translate(980.98,${61.5 + init})`}>
                            <rect className="scheduleview-8" width="149.95" height={2400 - init} />
                        </g>)


                    }


                }

            })
        }

        return schedule_7jsx;

    }

    checkblackout() {
        const myschedule = this.getschedule();
        let schedule_7jsx = [];
        let blackout = false
        if (myschedule) {
            // eslint-disable-next-line
            myschedule.map(schedule => {

                // let timein = '2020-07-24 20:00:00'
                // let timeout = '2020-08-09 19:00:00'

                let datein = new Date(`${schedule.timein.replace(/-/g, '/')}`)
                let dateout = new Date(`${schedule.timeout.replace(/-/g, '/')}`)
                let offset_date_1 = getOffsetDate(this.state.day_1)
                let offset_date_2 = getOffsetDate(this.state.day_2)
                let date_1 = new Date(`${this.state.day_1.replace(/-/g, '/')} 00:00:00${offset_date_1}`)
                let date_2 = new Date(`${this.state.day_2.replace(/-/g, '/')} 00:00:00${offset_date_2}`)

                if (datein.getTime() <= date_1.getTime() && dateout.getTime() >= date_2.getTime()) {
                    blackout = true
                }
            })

        }
        if (blackout) {

            schedule_7jsx.push(<g transform={`translate(81,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

            schedule_7jsx.push(<g transform={`translate(230.93,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

            schedule_7jsx.push(<g transform={`translate(381.29,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)
            schedule_7jsx.push(<g transform={`translate(531.22,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

            schedule_7jsx.push(<g transform={`translate(681.09,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

            schedule_7jsx.push(<g transform={`translate(831.02,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

            schedule_7jsx.push(<g transform={`translate(980.98,${61.5})`}>
                <rect className="scheduleview-8" width="149.95" height={2400} />
            </g>)

        }

        return schedule_7jsx;


    }


    showschedule() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const myuser = dynamicstyles.getuser.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const showschedule = new ShowSchedule();


        if (myuser) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1131.93 2462.51"><defs><style></style></defs><g id="Layer_2" data-name="Layer 2">
                    <g id="hide">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <text className="scheduleview-1" transform="translate(2.72 2455.25)">12:00 am</text><rect className="scheduleview-2" x="1" y="61.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="86.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="111.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="136.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="161.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="186.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="211.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="236.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="261.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="286.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="311.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="336.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="361.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="386.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="411.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="436.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="461.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="486.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="511.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="536.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="561.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="586.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="611.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="636.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="661.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="686.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="711.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="736.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="761.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="786.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="811.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="836.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="861.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="886.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="911.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="936.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="961.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="986.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1011.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1036.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1061.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1086.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1111.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1136.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1161.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1186.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1211.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1236.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1261.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1286.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1311.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1336.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1361.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1386.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1411.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1436.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1461.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1486.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1511.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1536.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1561.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1586.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1611.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1636.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1661.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1686.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1711.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1736.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1761.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1786.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1811.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1836.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1861.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1886.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1911.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1936.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1961.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="1986.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2011.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2036.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2061.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2086.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2111.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2136.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2161.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2186.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2211.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2236.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2261.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2286.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2311.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2336.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2361.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2386.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2411.51" width="80" height="25" /><rect className="scheduleview-2" x="1" y="2436.51" width="80" height="25" /><text className="scheduleview-1" transform="translate(8.12 155.97)">1:00 am</text><text className="scheduleview-1" transform="translate(123.66 23.86)">Monday</text><text className="scheduleview-1" transform="translate(145.02 48.67)">{getDayfromDateString(this.state.day_1)}</text><text className="scheduleview-1" transform="translate(295.12 48.67)">{getDayfromDateString(this.state.day_2)}</text><text className="scheduleview-1" transform="translate(445 48.67)">{getDayfromDateString(this.state.day_3)}</text><text className="scheduleview-1" transform="translate(595.12 48.67)">{getDayfromDateString(this.state.day_4)}</text><text className="scheduleview-1" transform="translate(745.25 48.67)">{getDayfromDateString(this.state.day_5)}</text><text className="scheduleview-1" transform="translate(895.14 48.68)">{getDayfromDateString(this.state.day_6)}</text><text className="scheduleview-1" transform="translate(1044.99 48.68)">{getDayfromDateString(this.state.day_7)}</text><text className="scheduleview-1" transform="translate(272.45 23.86)"><tspan className="scheduleview-4">T</tspan><tspan x="9.45" y="0">uesday</tspan></text><text className="scheduleview-1" transform="translate(407.75 23.86)"><tspan className="scheduleview-5">W</tspan><tspan x="18.81" y="0">ednesday</tspan></text><text className="scheduleview-1" transform="translate(568.29 23.86)">Thu<tspan className="scheduleview-6" x="31.08" y="0">r</tspan><tspan x="37.35" y="0">sday</tspan></text><text className="scheduleview-1" transform="translate(731.11 23.86)"><tspan className="scheduleview-7">F</tspan><tspan x="9.85" y="0">riday</tspan></text><text className="scheduleview-1" transform="translate(869.79 23.86)">Satu<tspan className="scheduleview-7" x="36.86" y="0">r</tspan><tspan x="43.04" y="0">day</tspan></text><text className="scheduleview-1" transform="translate(1025.57 23.86)">Sunday</text><text className="scheduleview-1" transform="translate(8.12 255.98)">2:00 am</text><text className="scheduleview-1" transform="translate(8.12 356)">3:00 am</text><text className="scheduleview-1" transform="translate(8.12 455.98)">4:00 am</text><text className="scheduleview-1" transform="translate(8.12 557.92)">5:00 am</text><text className="scheduleview-1" transform="translate(8.13 652.59)">6:00 am</text><text className="scheduleview-1" transform="translate(8.12 755.98)">7:00 am</text><text className="scheduleview-1" transform="translate(8.12 855.98)">8:00 am</text><text className="scheduleview-1" transform="translate(8.12 955.98)">9:00 am</text><text className="scheduleview-1" transform="translate(2.72 1052.59)">10:00 am</text><text className="scheduleview-1" transform="translate(2.72 1155.98)">11:00 am</text><text className="scheduleview-1" transform="translate(2.25 1255.98)">12:00 pm</text><text className="scheduleview-1" transform="translate(7.65 1355.24)">1:00 pm</text>
                            <text className="scheduleview-1" transform="translate(7.65 1455.25)">2:00 pm</text><text className="scheduleview-1" transform="translate(7.65 1555.27)">3:00 pm</text><text className="scheduleview-1" transform="translate(7.65 1655.25)">4:00 pm</text><text className="scheduleview-1" transform="translate(7.65 1757.19)">5:00 pm</text><text className="scheduleview-1" transform="translate(7.66 1851.87)">6:00 pm</text><text className="scheduleview-1" transform="translate(7.65 1955.25)">7:00 pm</text><text className="scheduleview-1" transform="translate(7.65 2055.25)">8:00 pm</text><text className="scheduleview-1" transform="translate(7.65 2155.25)">9:00 pm</text><text className="scheduleview-1" transform="translate(2.25 2251.87)">10:00 pm</text><text className="scheduleview-1" transform="translate(2.25 2355.25)">11:00 pm</text>
                            <rect className="scheduleview-2" x="80.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="230.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="380.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="530.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="680.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="830.91" y="1" width="150" height="60" />
                            <rect className="scheduleview-2" x="980.91" y="1" width="150" height="60" />
                            {showschedule.checkblackout.call(this)}
                            {showschedule.schedule_1.call(this)}
                            {showschedule.schedule_2.call(this)}
                            {showschedule.schedule_3.call(this)}
                            {showschedule.schedule_4.call(this)}
                            {showschedule.schedule_5.call(this)}
                            {showschedule.schedule_6.call(this)}
                            {showschedule.schedule_7.call(this)}


                        </g></g></g></svg>
            )

        } else {
            return (<div style={{ ...styles.generalContainer }}>
                <span style={{ ...regularFont, ...styles.generalFont }}>You have to be logged in to view schedule</span>
            </div>)
        }
    }


}



export default ShowSchedule;