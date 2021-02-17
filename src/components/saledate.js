import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './saledatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class SaleDate {


    handleyear(year) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            this.setState({ saledateyear: year })
            if (year.length === 4) {

                if (validateYear(year)) {



                    const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                    if (myequipment) {



                        const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                        let day = this.state.saledateday;
                        let month = this.state.saledatemonth;
                        const timein = `${year}-${month}-${day}`

                        myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })




                    }

                } else {
                    alert(`Invalid Year format ${year}`)
                }

            }


        }



    }

    handleday(day) {
        day = day.toString();

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {


            this.setState({ saledateday: day })


            const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);

            if (myequipment) {

                const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                if (day.length === 2) {


                    if (validateDate(day)) {


                        let year = this.state.saledateyear;
                        let month = this.state.saledatemonth;
                        const timein = `${year}-${month}-${day}`
                        myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })


                    } else {
                        alert(`Invalid day format ${day}`)
                    }

                } else if (day.length === 1) {

                    if (Number(day)) {
                        let salemonth = trailingZeros(this.state.saledatemonth)
                        let saleday = trailingZeros(day);
                        let saleyear = this.state.saledateyear
                        let timein = `${saleyear}-${salemonth}-${saleday}`
                        myuser.company.equipment.myequipment[i].ownership.saledate = timein
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render', saledatemonth: salemonth })

                    }
                }

            }

        }


    }

    handlemonth(month) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            this.setState({ saledatemonth: month })

            const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
            if (myequipment) {
                const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                if (month.length === 2) {

                    if (validateMonth(month)) {


                        let day = this.state.saledateday;
                        let year = this.state.saledateyear;
                        const timein = `${year}-${month}-${day}`
                        myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })





                    } else {
                        alert(`Invalid month format ${month}`)
                    }

                } else if (month.length === 1) {

                    if (Number(month)) {

                        let salemonth = trailingZeros(month)
                        let saleday = trailingZeros(this.state.saledateday);
                        let saleyear = this.state.saledateyear
                        let timein = `${saleyear}-${salemonth}-${saleday}`
                        myuser.company.equipment.myequipment[i].ownership.saledate = timein;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render', saledateday: saleday })

                    }
                }

            }

        }



    }





    showsaledate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
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