import React from 'react';
import Construction from './construction';
import { MyStylesheet } from './styles';
import { sortcode, validatecode, findString } from './functions';


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

   
    showcsiid(csi, i) {

        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);

        const csibackground = (i) => {
            if (i % 2 === 0) {
                return ({ backgroundColor: '#E6E6E6' })
            }
        }

        return (<div style={{ ...styles.generalFlex, ...styles.generalFont, ...regularFont, ...csibackground(i), ...styles.generalRadius, ...styles.generalPadding, ...styles.bottomMargin10 }} key={csi.csiid}>
            <div style={{ ...styles.flex5 }} onClick={() => { this.handlecsiid(csi.csiid) }}>
                {csi.csi} - {csi.title}
            </div>

        </div>)
    }
    showsearchresults() {
        const csi = new CSI();
        let results = this.getsearchresults(this)

        let csiids = [];
        // eslint-disable-next-line
        results.map((code, i) => {
            csiids.push(csi.showcsiid.call(this, code, i))

        })
        return csiids;
    }

   

   
    showCSI() {


        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const csi = new CSI();
        let getnumber = 0

        const projectnavigation = construction.getProjectNavigation.call(this)

    


      
        const heightLimit = () => {
            if (this.state.width > 1200) {
                return ({ maxHeight: '250px', overflow: 'scroll' })
            } else if (this.state.width > 800) {
                return ({ maxHeight: '200px', overflow: 'scroll' })
            } else {
                return ({ maxHeight: '150px', overflow: 'scroll' })
            }
        }
        const pointer = () => {
            if (this.state.width > 1200) {
                return ({ width: '40px', height: 'auto' })
            } else if (this.state.width > 600) {
                return ({ width: '30px', height: 'auto' })
            } else {
                return ({ width: '20px', height: 'auto' })
            }

        }

        const results = this.getsearchresults()

        if (results) {
            getnumber = results.length;
        }


        const pointicon = (getnumber) => {
            if (getnumber > 0) {
                return (<img src="https://civilengineer.io/appbaseddriver/icons/pointicon.jpg" alt="touch to select" style={{ ...pointer() }} />)
            }
        }

        const action = this.getAction();
        const pointmessage = (getnumber) => {
            if (getnumber > 0) {
                return (<span style={{ ...styles.generalFont, ...regularFont }}> Touch to {action} </span>)


            }

        }


        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <span style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.topMargin15 }}>
                            Construction Specification
                        </span>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.csiWidth, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.addMargin }}
                                value={this.getCSI_1()}
                                onChange={event => { this.handleCSI_1(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.csiWidth, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.addMargin }}
                                value={this.getCSI_2()}
                                onChange={event => { this.handleCSI_2(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>
                            <input style={{ ...styles.csiWidth, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.addMargin }}
                                value={this.getCSI_3()}
                                onChange={event => { this.handleCSI_3(event.target.value) }} />
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <input style={{ ...styles.csiWidth, ...regularFont, ...styles.generalFont, ...styles.showBorder, ...styles.addMargin }}
                                value={this.getCSI_4()}
                                onChange={event => { this.handleCSI_4(event.target.value)}} />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <span style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Search By Title
                        </span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField, ...styles.showBorder }} value={this.getTitle()} onChange={event => { this.handleTitle(event.target.value) }} />
                    </div>


                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont, ...styles.generalFont }}>
                            Search Results: There are {getnumber} Results {pointicon(getnumber)} {pointmessage(getnumber)}
                        </span>

                    </div>


                    <div style={{ ...styles.generalContainer, ...heightLimit(), ...styles.bottomMargin15 }} className="hidescroll">
                        {csi.showsearchresults.call(this)}
                    </div>

                    {this.getCSIID(this)}


                </div>
            </div>
        )

    }


}
export default CSI;