import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
import MaterialCalender from './purchasedatecalender'
import { validateMonth, validateDate, validateYear } from './functions';


class PurchaseDate {


    handleyear(year) {
      
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                this.setState({ purchasedateyear: year })
                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {


                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let day = this.state.purchasedateday;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })




                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }


                }

            } else {
                alert(` Only Managers can modify year purchase date `)
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
                this.setState({ purchasedateday: day })
                if (day.length === 2) {


                    if (validateDate(day)) {

                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {


                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let year = this.state.purchasedateyear;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })




                            }

                        }



                    } else {
                        alert(`Invalid day format ${day}`)
                    }

                }

            } else {
                alert(`Only Managers can modify equipment dates`)
            }

        }
    }

    handlemonth(month) {
       
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {
                this.setState({ purchasedatemonth: month })
                if (month.length === 2) {

                    if (validateMonth(month)) {





                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {



                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                let day = this.state.purchasedateday;
                                let year = this.state.purchasedateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })




                            }

                        }



                    } else {
                        alert(`Invalid month format ${month}`)
                    }

                }

            } else {

                alert(` Only Managers can modify equipment years `)
            }
        }
    }





    showpurchasedate() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const purchasedate = new PurchaseDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Purchase Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.purchasedatemonth}
                                onChange={event => { purchasedate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.purchasedateday}
                                onChange={event => { purchasedate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.purchasedateyear}
                                onChange={event => { purchasedate.handleyear.call(this, event.target.value) }} />
                        </div>


                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default PurchaseDate;