import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
import MaterialCalender from './equipmentdatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class EquipmentDate {


    handleyear(year) {
        this.setState({ equipmentdateyear: year })
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {

                                const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                if (this.state.activecostid) {
                                    const cost = dynamicstyles.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                                    if (cost) {
                                        const j = dynamicstyles.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)
                                        let day = this.state.equipmentdateday;
                                        let month = this.state.equipmentdatemonth;
                                        const timein = `${year}-${month}-${day}`

                                        myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                        this.props.reduxUser(myuser)
                                        this.setState({ render: 'render' })

                                    }


                                } else {
                                    this.setState({ equipmentdateyear: year })
                                }


                            }

                        }

                    } else {
                        alert(`Invalid Year format ${year}`)
                    }


                }

            } else {
                alert(`Only Managers can modify equipment year `)
            }
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ equipmentdateday: day })
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                    if (myequipment) {

                        const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (this.state.activecostid) {
                            const cost = dynamicstyles.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                            if (cost) {
                                const j = dynamicstyles.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)

                                if (day.length === 2) {


                                    if (validateDate(day)) {


                                        let year = this.state.equipmentdateyear;
                                        let month = this.state.equipmentdatemonth;
                                        const timein = `${year}-${month}-${day}`

                                        myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                        this.props.reduxUser(myuser)
                                        this.setState({ render: 'render' })

                                    } else {
                                        alert(`Invalid day format ${day}`)
                                    }


                                } else if (day.length === 1) {

                                    if (Number(day)) {


                                        let equipmentdateday = trailingZeros(day)
                                        let equipmentdatemonth = trailingZeros(this.state.equipmentdatemonth);
                                        let equipmentdateyear = this.state.equipmentdateyear;
                                        let timein = `${equipmentdateyear}-${equipmentdatemonth}-${equipmentdateday}`
                                        myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                        this.props.reduxUser(myuser);
                                        this.setState({ render: 'render', equipmentdatemonth })

                                    }

                                }

                            }

                        }


                    }
                }


            } else {
                alert(`Only managers can modify equipment day `)
            }

        }
    }

    handlemonth(month) {
        this.setState({ equipmentdatemonth: month })
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

                if (this.state.activeequipmentid) {
                    const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                    if (myequipment) {

                        const i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (this.state.activecostid) {
                            const cost = dynamicstyles.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                            if (cost) {
                                const j = dynamicstyles.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)

                                if (month.length === 2) {

                                    if (validateMonth(month)) {

                                       
                                        let day = this.state.equipmentdateday;
                                        let year = this.state.equipmentdateyear;
                                        const timein = `${year}-${month}-${day}`

                                        myuser.company.equipment.myequipment[i].ownership.cost[j].timein = timein;
                                        this.props.reduxUser(myuser)
                                        this.setState({ render: 'render' })


                                    } else {
                                        alert(`Invalid month format ${month}`)
                                    }


                                } else if (month.length === 1) {

                                    if (Number(month)) {
            
                                       
                                        let equipmentdatemonth = trailingZeros(month)
                                        let equipmentdateday = trailingZeros(this.state.equipmentdateday);
                                        let equipmentdateyear = this.state.equipmentdateyear;
                                        let timein = `${equipmentdateyear}-${equipmentdatemonth}-${equipmentdateday}`
                                        myuser.company.equipment.myequipment[i].ownership.cost[j].timein= timein;
                                        this.props.reduxUser(myuser);
                                        this.setState({ render: 'render', equipmentdateday })
                                    }
                                }
                            }

                        }


                    }



                }

            } else {
                alert(`Only managers can update equipment month `)
            }


        }
    }





    showequipmentdate() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();
        const calender = new MaterialCalender();
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Equipment Date (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} value={this.state.equipmentdatemonth}
                                onChange={event => { equipmentdate.handlemonth.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.equipmentdateday}
                                onChange={event => { equipmentdate.handleday.call(this, event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="text" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                value={this.state.equipmentdateyear}
                                onChange={event => { equipmentdate.handleyear.call(this, event.target.value) }} />
                        </div>


                    </div>
                    {calender.showMaterialCalender.call(this)}


                </div>
            </div>)
    }

}

export default EquipmentDate;