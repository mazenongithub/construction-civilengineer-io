import React from 'react';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';


class CSI {
    validatecsi(results, code) {
        let validate = true;
        if (results.length > 0) {
            // eslint-disable-next-line
            results.map(result => {
                if (result.csiid === code.csiid) {
                    validate = false;
                }
            })
        }
        return validate;
    }
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
        const removeIconWidth = dynamicstyles.getremoveicon.call(this);
        const csibackground = () => {
            if (this.state.activecsiid === csi.csiid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return;
            }
        }
        const checkcsi = () => {
            let csicheck = false;
            const mycsis = dynamicstyles.getmycsicodes.call(this);

            if (mycsis.hasOwnProperty("length")) {
                // eslint-disable-next-line
                mycsis.map(mycsi => {
                    console.log(mycsi, csi)
                    if (mycsi.csiid === csi.csiid) {
                        csicheck = true;
                    }
                })
            }
            return csicheck;
        }

        const removeIcon = () => {

            if (this.state.activecsiid === csi.csiid && checkcsi()) {
                return (
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...removeIconWidth }} onClick={() => { this.removecsi(csi) }}>{removeIconSmall()} </button>
                    </div>
                )
            } else {
                return;
            }

        }
        return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont, ...csibackground() }} key={csi.csiid}>
            <div style={{ ...styles.flex5 }} onClick={() => { this.handlecsiid(csi.csiid) }}>
                {csi.csi} - {csi.title}
            </div>
            {removeIcon()}
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
        const heightLimit = () => {
            if (this.state.width > 1200) {
                return ({ maxHeight: '250px', overflow: 'scroll' })
            } else if (this.state.width > 800) {
                return ({ maxHeight: '200px', overflow: 'scroll' })
            } else {
                return ({ maxHeight: '150px', overflow: 'scroll' })
            }
        }
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
                            {this.getcsiid()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalContainer, ...heightLimit() }} className="hidescroll">
                        {csi.showsearchresults.call(this)}
                    </div>


                </div>
            </div>
        )

    }


}
export default CSI;