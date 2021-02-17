import React from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles';
class MilestoneID {

    loadmilestoneids() {
        const dynamicstyles = new DynamicStyles();
        let myproject = dynamicstyles.getproject.call(this)
        let options = [];
        if (myproject.hasOwnProperty("milestones")) {
            // eslint-disable-next-line
            myproject.milestones.map(mymilestone => {
                options.push(<option
                    key={mymilestone.milestoneid}
                    value={mymilestone.milestoneid}>{mymilestone.milestone}</option>)
            })

        }
        return options;
    }

    showmilestoneid() {
        const styles = MyStylesheet();
        const milestoneid = new MilestoneID();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
            MilestoneID
            <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                value={this.getmilestoneid()}
                onChange={event => { this.handlemilestoneid(event.target.value) }}>
                <option value={false}>Select A Project Milestone</option>
                {milestoneid.loadmilestoneids.call(this)}
            </select>
        </div>)
    }
}
export default MilestoneID;