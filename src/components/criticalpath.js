import React from 'react'
import { MyStylesheet } from './styles';
import Construction from './construction'
import { getDateInterval, trailingZeros, getOffsetDate, monthString, increaseCalendarDayOneMonth, calculatemonth, milestoneformatdatestring, getScale, calculateyear, increasedatebyoneday, calculateday,getRandomColor} from './functions'

class CriticalPath {

 


    showenddates() {

        const construction = new Construction();
        const jsx = [];
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        if (this.state.activemilestoneid) {
            const milestone = construction.getmilestonebyid.call(this, this.state.activemilestoneid);
            if (milestone.hasOwnProperty("predessors")) {
          
                // eslint-disable-next-line
                milestone.predessors.map(predessor => {
                    let milestoneid = predessor.predessor;
                    let type = predessor.type;
                    if (type === 'start-to-finish') {
                        let mymilestone = construction.getmilestonebyid.call(this, milestoneid)
                        jsx.push(<div style={{ ...styles.generalContainer }} key={`predessor${milestoneid}`}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>{mymilestone.milestone}</span> 
                        </div>)
                    }
                })
            }

        }
        return jsx;

    }

    showoptionvalues() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this);

        const validatemilestone = (milestoneid) => {
            let validate = true;
            if (this.state.activemilestoneid === milestoneid) {
                validate = false;
            } else if (this.state.activemilestoneid) {
                const milestone = construction.getmilestonebyid.call(this, this.state.activemilestoneid)
                if (milestone) {
                    if (milestone.hasOwnProperty("predessors")) {
                        // eslint-disable-next-line
                        milestone.predessors.map(predessor => {
                            if (predessor.predessor === milestoneid) {
                                validate = false;
                            }
                        })
                    }
                }
            }
            return validate;
        }

        const jsx = [];
        if (milestones) {
            // eslint-disable-next-line
            milestones.map(milestone => {
                if (validatemilestone(milestone.milestoneid)) {
                    jsx.push(<option key={`op${milestone.milestoneid}`}value={milestone.milestoneid}>{milestone.milestone}</option>)

                }
            })


        }
        return jsx;

    }
    showlineandarrow(x1,y1,x2,y2) {
        // const x1 = 0
        // const y1 = 0

        // const x2 = 200
        // const y2 = 80
        let randomcolor = getRandomColor()

        return (
            <g key={`${x1.toString()}${y1.toString()}${x2.toString()}${y2.toString()}`}id="lineandarrow">
                <polyline stroke={randomcolor} fill='none' points={`${x2 - 13} ${y2} ${x2 - 23} ${y2} ${x2 - 23} ${y1 + 3} ${x1} ${y1 + 3} ${x1} ${y1}`} />
                <polygon stroke={randomcolor} fill={randomcolor} points={`${x2 - 11.53} ${y2 + 4.12} ${x2 - 11.53} ${y2 + 1.79} ${x2 - 20.48} ${y2 + 1.79} ${x2 - 20.48} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 1.1} ${x2 - 11.53} ${y2 - 3.4} ${x2} ${y2 + 0.34} ${x2 - 11.53} ${y2 + 4.12}`} />
            </g>)
    }
   



    showmilestones() {
        const construction = new Construction();
        const milestones = construction.getmilestones.call(this);
        const projectinterval = construction.getprojectinterval.call(this)
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        let mymilestones = [];
        if (projectinterval) {
            let ypos = 40;
            let interval = getDateInterval(projectinterval.start, projectinterval.completion)
            let scale = getScale(interval)
            if (milestones) {
                // eslint-disable-next-line
                milestones.map(milestone => {
                    let params = false;
                    if (scale === 'month') {

                        params = calculatemonth(
                            projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    } else if (scale === 'year') {
                        params = calculateyear(
                            projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    } else if (scale === 'day') {
                        params = calculateday( projectinterval.start,
                            projectinterval.completion,
                            milestone.start,
                            milestone.completion)
                    }

                    mymilestones.push(
                        <g key={`texdft${milestone.milestoneid}`}>
                            <text style={{ ...regularFont, ...styles.generalFont }} x={params.xo} y={ypos - 10}> {milestone.milestone} {milestoneformatdatestring(milestone.start)} to {milestoneformatdatestring(milestone.completion)}</text>

                        </g>)

                    mymilestones.push(
                        <g key={`rdfec${milestone.milestoneid}`}>

                            <rect className="showmilestones-8" x={params.xo} y={ypos} width={params.width} height="40.03" />
                        </g>)

                    ypos += 100;


                })



            }

        }

        return mymilestones;
    }

    showpaths() {
        const construction = new Construction();
        const criticalpath = new CriticalPath();
        const paths = construction.getpaths.call(this)
        let getpaths = [];

        for(let myprop in paths) {

            for(let mypaths in paths[myprop]['paths']) {
                let x1 = paths[myprop]['paths'][mypaths]['x1'];
                let x2 =paths[myprop]['paths'][mypaths]['x2'];
                let y1 = paths[myprop]['paths'][mypaths]['y1'];
                let y2 =paths[myprop]['paths'][mypaths]['y2'];

                getpaths.push(criticalpath.showlineandarrow.call(this,x1,y1,x2,y2)); 
              
            }
            
          
          
        }
        

        return getpaths;

    }

 

    

    showpath() {
        const criticalpath = new CriticalPath();
        const construction = new Construction();
        const styles = MyStylesheet();

        const regularFont = construction.getRegularFont.call(this)
        const milestones = construction.getmilestones.call(this);
        let yext = 200;
        if (milestones) {
            if (milestones.length) {
                yext = (100 * milestones.length) + 100;
            }

        }

  


        const projectinterval = construction.getprojectinterval.call(this);
        let interval = '1202.88'
        let grid = [];
        let scale = "";
        if (projectinterval) {
            interval = getDateInterval(projectinterval.start, projectinterval.completion)
            scale = getScale(interval)
            let approxmonth = false;
            let approxyear = false;
            if (scale === 'month') {

                approxmonth = Math.round(interval / 30.41)
                interval = (approxmonth * 200) + 200;

                for (let i = 0; i <= approxmonth; i++) {
                    grid.push(<line key={`dfdgrid${i}`} className={`showmilestones-1`} x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }

            } else if (scale === 'year') {
                approxyear = Math.round(interval / 365);
                interval = (approxyear * 200) + 200;
                for (let i = 0; i <= approxyear; i++) {
                    grid.push(<line className={`showmilestones-1`} x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }
            } else if (scale === 'day') {
                for (let i = 0; i <= interval; i++) {
                    grid.push(<line className={`showmilestones-1`} x1={i * 200} x2={i * 200} y1={0} y2={yext} />)
                }
                interval = interval * 200 + 200
            }



        }

        const activemilestone = () => {
            if (this.state.activemilestoneid) {
                const milestone = construction.getmilestonebyid.call(this, this.state.activemilestoneid);
                const float = construction.getfloatbymilestoneid.call(this,this.state.activemilestoneid) 
                const projectfloat = construction.calcTotalProjectFloat.call(this,this.state.activemilestoneid)
                const lag = construction.getlagbymilestoneid.call(this,this.state.activemilestoneid)
            
                return (
                    <div style={{ ...styles.generalContainer }}>
                       <div style={{ ...styles.generalContainer }}><span style={{ ...styles.generalFont, ...regularFont }}>Active Milestone Is: {milestone.milestone}  Float is {float} days Project Float is {projectfloat} days Lag is {lag} days</span></div> 
                    </div>
                )
            }
        }



        const getLabels = (start, completion, scale) => {

           
            let offsetstart = getOffsetDate(start);
            let offsetcompletion = getOffsetDate(completion);
            let datestart = new Date(`${start.replace(/-/g, '/')} 00:00:00${offsetstart}`)
            let monthstart = trailingZeros(datestart.getMonth() + 1)
            let yearstart = datestart.getFullYear();
            let daystart = trailingZeros(datestart.getDate());
            let datestartstring = `${yearstart}-${monthstart}-${daystart}`;
            const datecompletion = new Date(`${completion.replace(/-/g, '/')} 00:00:00${offsetcompletion}`)
            let yearcompletion = datecompletion.getFullYear();
            let monthcompletion = trailingZeros(datecompletion.getMonth() + 1);
            let daycompletion = trailingZeros(datecompletion.getDate());
            let datecompletionstring = `${yearcompletion}-${monthcompletion}-${daycompletion}`
            let datecompletionstringmonth = `${yearcompletion}-${monthcompletion}-01`
          
            let x1 = 0;
            const mylabels = [];

            let intmonth = "";
            let daystartday = "";
            let int = datestartstring;
            if (scale === 'month') {



                while (intmonth !== datecompletionstringmonth) {

                    int = increaseCalendarDayOneMonth(int);
                    x1 += 200;
                    offsetstart = getOffsetDate(int);
                    let intstart = new Date(`${int.replace(/-/g, '/')} 00:00:00${offsetstart}`)
                    let month = trailingZeros(intstart.getMonth() + 1)
                    let year = intstart.getFullYear();
                    intmonth = `${year}-${month}-01`
                    mylabels.push(<text key={`cdfdrit${intstart.getTime()}`} style={{ textAnchor: 'middle', fontSize: '24pt', ...styles.generalFont }} x={x1} y={yext + 50}>{monthString(intstart.getMonth())} {intstart.getFullYear()}</text>);
                }


            } else if (scale === 'year') {

                while (yearstart !== yearcompletion) {
                    x1 += 200;
                    yearstart += 1;
                    let datestartyear = `${yearstart}-${monthstart}-${daystart}`
                    offsetstart = getOffsetDate(datestartyear)
                    datestartyear = new Date(`${datestartyear.replace(/-/g, '/')} 00:00:00${offsetstart}`)

                    mylabels.push(<text key={`crdfit${yearstart}`} style={{ textAnchor: 'middle', fontSize: '24pt', ...styles.generalFont }} x={x1} y={yext + 50}>{datestartyear.getFullYear()}</text>);


                }

            } else if (scale === 'day') {

                daystartday = datestartstring;

                while (daystartday !== datecompletionstring) {
                    x1 += 200;
                    daystartday = increasedatebyoneday(daystartday)
                    offsetstart = getOffsetDate(daystartday);
                    let intstart = new Date(`${daystartday.replace(/-/g, '/')} 00:00:00${offsetstart}`)
                    let month = trailingZeros(intstart.getMonth() + 1)
                    let year = intstart.getFullYear();
                    let day = trailingZeros(intstart.getDate());
                    daystartday = `${year}-${month}-${day}`

                    mylabels.push(<text key={`crdfdfit${day}${x1}`} style={{ textAnchor: 'middle', fontSize: '24pt', ...styles.generalFont }} x={x1} y={yext + 50}>{month}/{day}/{year}</text>);

                }



            }

            return (mylabels)

        }

        const showlabels = () => {
            if (projectinterval) {


                return getLabels(projectinterval.start, projectinterval.completion, scale)

            }
        }

   

        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>


                    {activemilestone()}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Can't Start until which milestones finish? </span>
                          
                            {criticalpath.showenddates.call(this)}
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${interval} ${yext+200}`}>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="lock">
                               
                                {showlabels()}
                                <polyline className="showmilestones-7" points={`2.5 0.38 2.5 ${yext} ${interval} ${yext}`} />
                                {criticalpath.showmilestones.call(this)}
                                {criticalpath.showpaths.call(this)}
                               
                            </g>
                        </g>
                    </svg>

                </div>
            </div>


        )
    }


}

export default CriticalPath;
