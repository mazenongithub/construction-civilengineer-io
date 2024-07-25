import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './purchasedatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros } from './functions';


class PurchaseDate {

    handledate(value) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if(company) {
            const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
            if (myequipment) {

                const i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                company.equipment[i].ownership.purchasedate = value
                this.props.reduxCompany(company)
                this.setState({render:'render'})



            }
        }
    
    
    }

    getpurchasedate() {
        const construction = new Construction();
        let purchasedate = "";
        const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid);
        if (myequipment) {
            if(myequipment.ownership) {
            purchasedate = myequipment.ownership.purchasedate;
            }

        }
        return purchasedate;
    }


   



    showpurchasedate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const purchasedate = new PurchaseDate();
       
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

                            <input type="date" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }} 
                                onChange={event => { purchasedate.handledate.call(this, event.target.value) }} 
                                value={purchasedate.getpurchasedate.call(this)}
                                />
                        </div>
                      


                    </div>
            


                </div>
            </div>)
    }

}

export default PurchaseDate;