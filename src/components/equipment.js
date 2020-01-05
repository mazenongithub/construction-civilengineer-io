import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { radioOpen, radioClosed, saveCompanyIcon } from './svg'

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }
    showequipment() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Equipment  <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Equipment <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
                </div>
            </div>)
        }
    }
    getradioIcon() {
        if (this.state.width > 1200) {
            return ({ width: '83px', height: '83px' })
        } else if (this.state.width > 800) {
            return ({ width: '60px', height: '60px' })
        } else {
            return ({ width: '44px', height: '44px' })
        }

    }
    showicons() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const radioIcon = this.getradioIcon();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Owned  <button style={{ ...styles.generalButton, ...radioIcon, ...styles.addRightMargin }}>{radioOpen()}</button>  Rented <button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>
                </div>
            </div>)
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        Owned <button style={{ ...styles.generalButton, ...radioIcon }}>{radioOpen()}</button>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Rented  <button style={{ ...styles.generalButton, ...radioIcon }}>{radioClosed()}</button>
                    </div>
                </div>
            )
        }

    }
    showaccountcost() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}> </select>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Cost <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                </div>
            </div>
            )
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            Account <br />
                            <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> </select>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            Cost <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                        </div>
                    </div>
                </div>
            )
        }
    }
    showequipmentowned() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();

        return (

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            Date
            </div>
                    </div>

                    {this.showaccountcost()}

                </div>
            </div>)

    }
    showrentalrates() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                                Rental Rates
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Month <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Week <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Day <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Hour <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                            </div>

                        </div>

                    </div>

                </div>)
        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex, ...regularFont, ...styles.generalFont }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                            Rental Rates
                            </div>
                    </div>

                    <div style={{ ...styles.generalContainer }}>
                        Month <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        Week <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        Day <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        Hour <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }} />
                    </div>
                </div>
            </div>)

        }
    }
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const savecompanyicon = this.getsavecompanyicon();
        const regularFont = this.getRegularFont;

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/equipment
                        </div>
                    </div>

                    {this.showequipment()}
                    {this.showicons()}

                    {this.showequipmentowned()}
                    {this.showrentalrates()}

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        &nbsp;
                     </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...savecompanyicon }}>{saveCompanyIcon()}</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Equipment);