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
                        <rect className="scheduleview-8" width="149.95" height={2400-init} />
                    </g>)


                }


            }

        })
    }

    return schedule_7jsx;

}