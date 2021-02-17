import React from 'react';
import Construction from './construction';
import { MyStylesheet } from './styles';

class EquipmentID {
    loadequipment() {
        const construction = new Construction();
        let myequipment = construction.getmyequipment.call(this)
        let options = [];
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                options.push(<option key={equipment.equipmentid} value={equipment.equipmentid}>{equipment.equipment}</option>)
            })
        }
        return options;
    }

   
    showEquipmentID() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const equipmentid = new EquipmentID();
        return(<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
               <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Equipment ID </span>
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getequipmentid()}
                            onChange={event => { this.handleequipmentid(event.target.value) }}>
                            <option value={false}>Select An Equipment to Create Item</option>
                            {equipmentid.loadequipment.call(this)}
                        </select>
                    </div>
                </div>
            </div>
        </div>)
    }



}
export default EquipmentID;