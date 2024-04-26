import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction';
import MaterialCalender from './equipmentdatecalender'
import { validateMonth, validateDate, validateYear, trailingZeros, CreateCostID } from './functions';
import MakeID from './makeids';

class EquipmentDate {



    handledate(value) {

        const construction = new Construction();
        const company = construction.getcompany.call(this)
        const makeid = new MakeID();
        if (company) {

            const equipmentid = this.props.match.params.equipmentid;


            const myequipment = construction.getmyequipmentbyid.call(this, equipmentid);
            if (myequipment) {

                const i = construction.getequipmentkeybyid.call(this, equipmentid)
                if (this.state.activecostid) {
                    const cost = construction.getcostbyid.call(this, equipmentid, this.state.activecostid)
                    if (cost) {
                        const j = construction.getequipmentcostskeybyid.call(this, myequipment.equipmentid, cost.costid)

                        company.equipment[i].ownership.cost[j].timein = value;
                        this.props.reduxCompany(company)
                        this.setState({ render: 'render' })


                    }



                }  else {

                    let costid = makeid.costid.call(this);
                 
                    let newcost = CreateCostID(costid, 0, "", value)

                    if (myequipment.ownership.hasOwnProperty("cost")) {
                        company.equipment[i].ownership.cost.push(newcost)
                    } else {

                        company.equipment[i].ownership.cost = [newcost]
                    }

                    this.props.reduxCompany(company)
                    this.setState({ activecostid: costid, render: 'render' })

                }


            }







        }
    }

    getDate() {
        console.log("getdate")
        const construction = new Construction();
        let getdate = "";
        const equipmentid = this.props.match.params.equipmentid;
   
        const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
   
        if (equipment) {
      
            if (this.state.activecostid) {
                const cost = construction.getcostbyid.call(this, equipmentid, this.state.activecostid)
                console.log(cost)
                if (cost) {
                    getdate = cost.timein;
                }
            } else {
              const currentdate = new Date();
              let month = currentdate.getMonth() + 1;
              month = trailingZeros(month)
              let date = currentdate.getDate();
              date = trailingZeros(date)
              let year = currentdate.getFullYear();
              getdate = `${year}-${month}-${date}`
            }

        }
        return getdate;

    }





    showequipmentdate() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const equipmentdate = new EquipmentDate();

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.calenderContainer }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Date of Cost (MM-DD-YYYY) </span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>

                            <input type="date" style={{ ...styles.generalFont, ...headerFont, ...styles.generalField, ...styles.alignCenter }}
                                onChange={event => { equipmentdate.handledate.call(this, event.target.value) }}
                                value={equipmentdate.getDate.call(this)} />
                        </div>



                    </div>



                </div>
            </div>)
    }

}

export default EquipmentDate;