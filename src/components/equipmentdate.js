import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './equipmentdatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class EquipmentDate {


    handleyear(year) {
        this.setState({ equipmentdateyear: year })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

        

                if (year.length === 4) {

                    if (validateYear(year)) {


                        if (this.state.activeequipmentid) {
                            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                            if (myequipment) {

                                const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                                if (this.state.activecostid) {
                                    const cost = construction.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                                    if (cost) {
                                        const j = construction.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)
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

           
        }
    }

    handleday(day) {
        day = day.toString();
        this.setState({ equipmentdateday: day })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

        

                if (this.state.activeequipmentid) {
                    const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                    if (myequipment) {

                        const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (this.state.activecostid) {
                            const cost = construction.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                            if (cost) {
                                const j = construction.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)

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


          

        }
    }

    handlemonth(month) {
        this.setState({ equipmentdatemonth: month })
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

         

                if (this.state.activeequipmentid) {
                    const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
                    if (myequipment) {

                        const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                        if (this.state.activecostid) {
                            const cost = construction.getcostbyid.call(this, myequipment.equipmentid, this.state.activecostid)
                            if (cost) {
                                const j = construction.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)

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



        }
    }





    showequipmentdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
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