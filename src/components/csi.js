import React from 'react';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';
class CSI {

    getsearchresults() {
        const dynamicstyles = new DynamicStyles();
        let csi_1 = this.state.csi_1;
        let csi_2 = this.state.csi_2;
        let csi_3 = this.state.csi_3;
        let searchcsi = "";
        let results = [];
        if (csi_1) {
            searchcsi += csi_1.substr(0, 2)
        }
        if (csi_2) {
            searchcsi += csi_2.substr(0, 2)
        }
        if (csi_3) {
            searchcsi += csi_3.substr(0, 2)
        }
        if (searchcsi) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                if (myuser.hasOwnProperty("company")) {
                    if (myuser.company.hasOwnProperty("construction")) {
                        if (myuser.company.construction.hasOwnProperty("civilengineer")) {
                            // eslint-disable-next-line
                            myuser.company.construction.civilengineer.csicodes.code.map(code => {
                                if (code.csi.startsWith(searchcsi)) {
                                    results.push(code)
                                }
                            })
                        }

                        if (myuser.company.construction.hasOwnProperty("csicodes")) {
                            // eslint-disable-next-line
                            myuser.company.construction.csicodes.code.map(code => {
                                if (code.csi.startsWith(searchcsi)) {
                                    results.push(code)
                                }

                            })

                        }



                    }
                }
            }

        }
        return results;
    }
    showcsiid(csi) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont }} key={csi.csiid} onClick={() => { this.handlecsiid(csi.csiid) }}>
            <div style={{ ...styles.flex1 }}>
                {csi.csi} - {csi.title}
            </div>
        </div>)
    }
    showsearchresults() {
        const csi = new CSI();
        let results = csi.getsearchresults.call(this)
        let csiids = [];
        // eslint-disable-next-line
        results.map(code => {
            csiids.push(csi.showcsiid.call(this, code))

        })
        return csiids;
    }

    showCSI() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = new CSI();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Construction Specification
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_1}
                                onChange={event => { this.setState({ csi_1: event.target.value }) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_2}
                                onChange={event => { this.setState({ csi_2: event.target.value }) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_3}
                                onChange={event => { this.setState({ csi_3: event.target.value }) }} />
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                value={this.getcsiid()}
                            />
                        </div>
                    </div>

                    {csi.showsearchresults.call(this)}

                </div>
            </div>
        )

    }


}
export default CSI;