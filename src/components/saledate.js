import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './saledatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class SaleDate {


    handledate(value) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if(company) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
            if (myequipment) {

                const i = construction.getequipmentkeybyid.call(this, this.props.match.params.equipmentid)
                company.equipment[i].ownership.saledate = value
                this.props.reduxCompany(company)
                this.setState({render:'render'})



            }
        }
    
    
    }

    getsaledate() {
        const construction = new Construction();
        let saledate = "";
        const myequipment = construction.getmyequipmentbyid.call(this, this.props.match.params.equipmentid);
        if (myequipment) {
            saledate = myequipment.ownership.saledate;

        }
        return saledate;
    }


   



    showsaledate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const saledate = new SaleDate();
       
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

                            <input type="date" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} 
                                onChange={event => { saledate.handledate.call(this, event.target.value) }} 
                                value={saledate.getsaledate.call(this)}
                                />
                        </div>
                      


                    </div>
            


                </div>
            </div>)
    }

}



export default SaleDate;