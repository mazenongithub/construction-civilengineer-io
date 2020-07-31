import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
import MaterialCalender from './viewscheduledatecalender'
import { getScheduleDates } from './functions';


class MaterialDate {


    handleyear(year) {

        this.setState({ year: year })
        const dates = getScheduleDates(`${year}-${this.state.month}-${this.state.day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
     
    }

    handleday(day) {
        day = day.toString();
        this.setState({ day: day })
        const dates = getScheduleDates(`${this.state.year}-${this.state.month}-${day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
  
    }

    handlemonth(month) {
        this.setState({month: month })
        const dates = getScheduleDates(`${this.state.year}-${month}-${this.state.day}`) 
        this.setState({day_1:dates.day_1, day_2:dates.day_2, day_3:dates.day_3, day_4:dates.day_4, day_5:dates.day_5, day_6:dates.day_6, day_7:dates.day_7})
       
    }





    showmaterialdate() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const materialdate = new MaterialDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Material Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.month}
                                onChange={event => { materialdate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.day}
                                onChange={event => { materialdate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.year}
                                onChange={event => { materialdate.handleyear.call(this, event.target.value) }} />
                        </div>
                        
                       
                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default MaterialDate;