import React from 'react';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';

class MaterialID {
    showmymaterials() {
        const dynamicstyles = new DynamicStyles();
        const materials = dynamicstyles.getmymaterials.call(this)

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
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const materialid = new MaterialID();
        return( <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
               <span style={{...styles.generalFont, ...regularFont}}> Material </span> 
               <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                    value={this.getmymaterialid()}
                    onChange={event => { this.handlemymaterialid(event.target.value) }}
                >
                    <option value={false}>Select A MaterialID</option>
                    {materialid.showmymaterials.call(this)}

                </select>
            </div>
        </div>)
    }
}

export default MaterialID;