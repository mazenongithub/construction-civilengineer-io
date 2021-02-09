import React from 'react'
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles'

class Frequency {


    showFrequency() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        return(
            <div style={{...styles.generalContainer, ...styles.bottomMargin15}}>
        <select style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
            onChange={event => { this.handleFrequency(event.target.value) }}
            value={this.getfrequency()}>
            <option value={false}>Select Frequency</option>
            <option value={`daily`}>Daily</option>
            <option value={`weekly`}>Weekly</option>
            <option value={`monthly`}>Monthly</option>
            <option value={`annually`}>Annually</option>
        </select>
        </div>)
    }
}

export default Frequency;