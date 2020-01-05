import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon, loginNowIcon } from './svg'


class Login extends Component {
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
    getTitleFont() {
        const styles = MyStylesheet();
        if (this.state.width > 1200) {
            return (styles.font72)
        } else {
            return (styles.font54)
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
    getloginbuttonheight() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '359px',
                    height: '86px'
                }
            )
        } else if (this.state.width > 800) {
            return (
                {
                    width: '287px',
                    height: '60px'
                }
            )
        } else {
            return (
                {
                    width: '165px',
                    height: '48px'
                }
            )
        }
    }
    showemailaddress() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Email Address
                </div>
                <div style={{ ...styles.flex2, ...styles.regularFont, ...regularFontHeight }}>
                    <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Email Address <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />
                </div>

            </div>)

        }

    }
    showpassword() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Password
                </div>
                <div style={{ ...styles.flex2, ...styles.regularFont, ...regularFontHeight }}>
                    <input type="password" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Password <br /> <input type="password" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />
                </div>

            </div>)

        }


    }
    getloginnow() {
        if (this.state.width > 1200) {
            return ({ width: '381px', height: '84px' })
        } else if (this.state.width > 800) {
            return ({ width: '279px', height: '72px' })
        } else {
            return ({ width: '205px', height: '60px' })
        }
    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.getTitleFont();
        const loginButtonHeight = this.getloginbuttonheight();
        const loginnow = this.getloginnow()
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMarginTop, ...styles.addMarginBottom, ...styles.alignCenter, ...titleFont }}>
                            Login
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{GoogleSignIcon()}</button>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{AppleSignIcon()}</button>
                        </div>
                    </div>
                    {this.showemailaddress()}
                    {this.showpassword()}
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...loginnow }}>
                                {loginNowIcon()}
                            </button>
                        </div>
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

export default connect(mapStateToProps, actions)(Login);