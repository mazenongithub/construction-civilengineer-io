import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
import MaterialCalender from './saledatecalender'
import { validateMonth, validateDate, validateYear } from './functions';


class SaleDate {


    handleyear(year) {
      
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                this.setState({ saledateyear: year })
                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {



                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let day = this.state.saledateday;
                                let month = this.state.saledatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })




                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }


                }

            } else {
                alert(`Only Manager can change sale date year `)
            }
        }
    }

    handleday(day) {
        day = day.toString();
      
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                this.setState({ saledateday: day })
                if (day.length === 2) {


                    if (validateDate(day)) {

                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {



                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let year = this.state.saledateyear;
                                let month = this.state.saledatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })




                            }

                        }



                    } else {
                        alert(`Invalid day format ${day}`)
                    }

                }

            } else {
                alert(` Only Manager can modify equipment dates `)
            }
        }
    }

    handlemonth(month) {
      
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                this.setState({ saledatemonth: month })
                if (month.length === 2) {

                    if (validateMonth(month)) {

                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {


                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let day = this.state.saledateday;
                                let year = this.state.saledateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })


                            }

                        }



                    } else {
                        alert(`Invalid month format ${month}`)
                    }

                }

            } else {
                alert(` Only Manager can change equipment month`)
            }
        }
    }





    showsaledate() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const saledate = new SaleDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Sale Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.saledatemonth}
                                onChange={event => { saledate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.saledateday}
                                onChange={event => { saledate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.saledateyear}
                                onChange={event => { saledate.handleyear.call(this, event.target.value) }} />
                        </div>


                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default SaleDate;