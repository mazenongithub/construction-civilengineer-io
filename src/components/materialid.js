import React from 'react';
import Construction from './construction';
import { MyStylesheet } from './styles';

class MaterialID {
    showmymaterials() {
        const construction = new Construction();
        const materials = construction.getmymaterials.call(this)

        let options = [];
        if (materials) {
            // eslint-disable-next-line
            materials.map(mymaterial => {
              

                options.push(
                    <option
                        key={mymaterial.materialid}
                        value={mymaterial.materialid}>{mymaterial.material}</option>)

            })

        }
        return options;

    }
    showmaterialid() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const materialid = new MaterialID();
        return( <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
               <span style={{...styles.generalFont, ...regularFont}}> Material </span> 
               <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                    value={this.getmymaterialid()}
                    onChange={event => { this.handlemymaterialid(event.target.value) }}
                >
                    <option value={false}>Select A MaterialID to Create Material</option>
                    {materialid.showmymaterials.call(this)}

                </select>
            </div>
        </div>)
    }
}

export default MaterialID;