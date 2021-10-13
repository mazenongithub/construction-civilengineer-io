import React from 'react';
import Construction from './construction';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
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

    getsearchresults() {
        const construction = new Construction();
        let csi_1 = this.state.csi_1;
        let csi_2 = this.state.csi_2;
        let csi_3 = this.state.csi_3;
        let csi_4 = this.state.csi_4;
        let searchcsi = "";
        let title = this.state.title;
        let results = [];

        if (csi_1.length === 2) {
            searchcsi = csi_1.substr(0, 2);
        }
        if (csi_2.length === 2) {
            searchcsi += csi_2.substr(0, 2);
        }
        if (csi_3.length === 2) {
            searchcsi += csi_3.substr(0, 2);
        }
        if (csi_4.length === 2) {
            searchcsi += csi_4.substr(0, 2);
        }

        const codes = construction.getcsis.call(this)
        if (codes) {



            if (codes) {

                // eslint-disable-next-line
                codes.map(code => {

                    if (searchcsi) {

                        if (code.csi.startsWith(searchcsi)) {

                            if(title.length>1) {

                                if (findString(title, code.title)) {

                                    if (validatecode(results, code)) {
                                        results.push(code)
                                    }

                                }


                            } else {

                                if (validatecode(results, code)) {
                                    results.push(code)
                                }

                            }


                        }

                    }

                    if(title.length>1) {

                        if (findString(title, code.title)) {

                            if (searchcsi) {

                                if (code.csi.startsWith(searchcsi)) {

                                    if (validatecode(results, code)) {
                                        results.push(code)
                                    }

                                }

                            } else {

                                if (validatecode(results, code)) {
                                    results.push(code)
                                }

                            }


                        }

                    }



                })

            }

            results.sort((codeb, codea) => {

                return sortcode(codeb, codea)
            })



        }

        return results;
    }
    showcsiid(csi) {

        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const removeIconWidth = construction.getremoveicon.call(this);
        const csibackground = () => {
            if (this.state.activecsiid === csi.csiid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return;
            }
        }
        const checkcsi = () => {
            let csicheck = false;
            const mycsis = construction.getcsis.call(this);

            if (mycsis.hasOwnProperty("length")) {
                // eslint-disable-next-line
                mycsis.map(mycsi => {

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
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const csi = new CSI();
        let getnumber = 0

        const csiid = () => {

            const construction = new Construction();
            let _csiid = "";

            if (this.state.activelaborid && this.state.active === 'labor') {
                const mylabor = construction.getschedulelaborbyid.call(this, this.state.activelaborid)
                if (mylabor) {
                    let csi = construction.getcsibyid.call(this, mylabor.csiid)

                    if (csi) {

                        _csiid = `${csi.csi}-${csi.title}`

                    }

                }
            } else if (this.state.activematerialid && this.state.active === 'materials') {
                const mymaterial = construction.getschedulematerialbyid.call(this, this.state.activematerialid)
                if (mymaterial) {
                    let csi = construction.getcsibyid.call(this, mymaterial.csiid);
                    if (csi) {
                        _csiid = `${csi.csi}-${csi.title}`
                    }
                }
            } else if (this.state.activeequipmentid && this.state.active === 'equipment') {
                const myequipment = construction.getscheduleequipmentbyid.call(this, this.state.activeequipmentid)

                if (myequipment) {
                    let csi = construction.getcsibyid.call(this, myequipment.csiid);
                    if (csi) {
                        _csiid = `${csi.csi}-${csi.title}`
                    }
                }

            }

            if (_csiid) {

                return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.redBorder, ...styles.generalPadding }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>{_csiid}</span>
                </div>)
            }


        }
        const heightLimit = () => {
            if (this.state.width > 1200) {
                return ({ maxHeight: '250px', overflow: 'scroll' })
            } else if (this.state.width > 800) {
                return ({ maxHeight: '200px', overflow: 'scroll' })
            } else {
                return ({ maxHeight: '150px', overflow: 'scroll' })
            }
        }

        const results = csi.getsearchresults.call(this)

        if (results) {
            getnumber = results.length;
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
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_1}
                                onChange={event => { this.setState({ csi_1: event.target.value }) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_2}
                                onChange={event => { this.setState({ csi_2: event.target.value }) }}
                            />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin, ...styles.bottomMargin15 }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_3}
                                onChange={event => { this.setState({ csi_3: event.target.value }) }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                            <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                                value={this.state.csi_4}
                                onChange={event => { this.setState({ csi_4: event.target.value }) }} />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <span style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Search By Title
                        </span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField, ...styles.showBorder }} value={this.state.title} onChange={event => { this.setState({ title: event.target.value }) }} />
                    </div>


                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <span style={{ ...regularFont, ...styles.generalFont }}>
                            Search Results: There are {getnumber} Results
                        </span>

                    </div>


                    <div style={{ ...styles.generalContainer, ...heightLimit() }} className="hidescroll">
                        {csi.showsearchresults.call(this)}
                    </div>

                    {csiid()}


                </div>
            </div>
        )

    }


}
export default CSI;