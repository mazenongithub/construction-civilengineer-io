import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './purchasedatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class PurchaseDate {


    handleyear(year) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            
                this.setState({ purchasedateyear: year })
                if (year.length === 4) {

                    if (validateYear(year)) {


                   
                            const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                            if (myequipment) {


                                const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                                let day = this.state.purchasedateday;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`

                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
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

                this.setState({ purchasedateday: day })
                
                    const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                    if (myequipment) {

                        const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)

                        if (day.length === 2) {


                            if (validateDate(day)) {
                               
                                let year = this.state.purchasedateyear;
                                let month = this.state.purchasedatemonth;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })



                            } else {
                                alert(`Invalid day format ${day}`)
                            }

                        } else if (day.length === 1) {

                            
                            if(Number(day)) {
                            let purchasemonth = trailingZeros(this.state.purchasedatemonth)
                            let purchaseday = trailingZeros(day);
                            let purchaseyear = this.state.purchasedateyear
                            let timein = `${purchaseyear}-${purchasemonth}-${purchaseday}`
                            myuser.company.equipment.myequipment[i].ownership.purchasedate = timein
                            this.props.reduxUser(myuser);
                            this.setState({ render: 'render', purchasedatemonth:purchasemonth })

                            }
                        }

                    }

                }


            
        
    }

    handlemonth(month) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
       
                this.setState({ purchasedatemonth: month })

               
                    const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
                    if (myequipment) {
                        const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)

                        if (month.length === 2) {

                            if (validateMonth(month)) {


                         
                                let day = this.state.purchasedateday;
                                let year = this.state.purchasedateyear;
                                const timein = `${year}-${month}-${day}`
                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser)
                                this.setState({ render: 'render' })








                            } else {
                                alert(`Invalid month format ${month}`)
                            }

                        } else if (month.length === 1) {

                            if (Number(month)) {

                                let purchasemonth = trailingZeros(month)
                                let purchaseday = trailingZeros(this.state.purchasedateday);
                                let purchaseyear = this.state.purchasedateyear
                                let timein = `${purchaseyear}-${purchasemonth}-${purchaseday}`
                                myuser.company.equipment.myequipment[i].ownership.purchasedate = timein;
                                this.props.reduxUser(myuser);
                                this.setState({ render: 'render', purchasedateday:purchaseday })

                            }
                        }


                    }

                }

           
        
    }





    showpurchasedate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
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