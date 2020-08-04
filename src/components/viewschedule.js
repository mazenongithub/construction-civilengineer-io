import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import ShowSchedule from './showschedule';
import { getScheduleDates } from './functions'
import MaterialDate from './viewscheduledate'



class ViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, message: '', year: '', month: '', day: '', day_1: '', day_2: '', day_3: '', day_4: '', day_5: '', day_6: '', day_7: '', showcalender: true }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.datedefault()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    datedefault() {
        const datemonth = () => {
            let month = new Date().getMonth() + 1;
            if (month < 10) {
                month = `0${month}`
            }
            return month;
        }
        const dateday = () => {
            let day = new Date().getDate();
            if (day < 10) {
                day = `0${day}`
            }
            return day;
        }
        const dateyear = () => {
            let year = new Date().getFullYear();

            return year;
        }
        const dates = getScheduleDates(`${dateyear()}-${datemonth()}-${dateday()}`)
        this.setState({ day_1: dates.day_1, day_2: dates.day_2, day_3: dates.day_3, day_4: dates.day_4, day_5: dates.day_5, day_6: dates.day_6, day_7: dates.day_7 })
        this.setState({ year: dateyear(), month: datemonth(), day: dateday() })
    }
    gettitle() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const styles = MyStylesheet();

        if (myuser) {
            return (<span style={{ ...headerFont, ...styles.generalFont, ...styles.boldFont }}>/{myuser.profile}</span>)
        }
    }

    getschedule() {
        const dynamicstyles = new DynamicStyles();
        const myschedule = dynamicstyles.getmyschedule.call(this);
        return myschedule;
    }
    render() {
        const showschedule = new ShowSchedule()
        const styles = MyStylesheet();
        const materialdate = new MaterialDate();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)

        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{myuser.profile}</span><br />
                                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>View My Schedule</span>
                            </div>

                        </div>
                        {materialdate.showmaterialdate.call(this)}
                        {showschedule.showschedule.call(this,"schedule")}
                    </div>
                </div>)

        } else {
            return (
                <div style={{ ...styles.generalContainer }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}> Please Login to View Schedule</span>
                </div>)
        }



    }


}

function mapStateToProps(state) {
    return {
        csis: state.csis,
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,

    }
}

export default connect(mapStateToProps, actions)(ViewSchedule);