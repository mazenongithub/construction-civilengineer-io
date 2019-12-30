import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon, goCheckIcon, signUpNowIcon } from './svg'

class Register extends Component {
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
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        }
        return (styles.font24)
    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        }
        return (styles.font30)
    }
    getloginbuttonheight() {
        if (this.state.width > 1200) {
            return ({
                width: '279px',
                height: '63px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '181px',
                height: '48px'
            })
        } else {
            return ({
                width: '148px',
                height: '40px'
            })
        }

    }
    getgocheckheight() {
        if (this.state.width > 1200) {
            return ({
                width: '69px',
                height: '69px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '59px',
                height: '59px'
            })
        } else {
            return ({
                width: '49px',
                height: '49px'
            })
        }

    }
    getsignupnow() {
        if (this.state.width > 1200) {
            return ({
                width: '335px',
                height: '65px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '216px',
                height: '51px'
            })
        } else {
            return ({
                width: '177px',
                height: '47x'
            })
        }

    }
    showproviderid() {
        let regularFont = this.getRegularFont();
        const goCheckHeight = this.getgocheckheight();
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                Create A Provider ID
                </div>
                            <div style={{ ...styles.flex3 }}>
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...goCheckHeight }}>{goCheckIcon()}</button>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Your Profile will be hosted at {process.env.REACT_APP_CLIENT_API}/
                    </div>
                        </div>


                    </div>
                </div>

            )

        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                Create A Provider ID
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...goCheckHeight }}>{goCheckIcon()}</button>
                            </div>
                        </div>


                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                                Your Profile will be hosted at {process.env.REACT_APP_CLIENT_API}/
                            </div>
                        </div>

                    </div>
                </div>
            )

        }
    }
    showloginbuttons() {
        let regularFont = this.getRegularFont();
        const loginButtonHeight = this.getloginbuttonheight();
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Secure Your Sign In
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{GoogleSignIcon()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{AppleSignIcon()}</button>
                </div>
            </div>)

        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>

                                Secure Your Sign In
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{GoogleSignIcon()}</button>

                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <button style={{ ...styles.generalButton, ...loginButtonHeight }}>{AppleSignIcon()}</button>

                            </div>
                        </div>



                    </div>
                </div>
            )

        }
    }
    render() {
        const styles = MyStylesheet();
        //const regularFont = this.getRegularFont();
        const headerFont = this.getHeaderFont();
        const regularFont = this.getRegularFont();
        const signupnow = this.getsignupnow()
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                            Registration
                        </div>
                    </div>

                    {this.showloginbuttons()}
                    {this.showproviderid()}

                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Verify Your Info <button style={{ ...styles.generalButton, ...signupnow, ...styles.addLeftMargin15 }}>{signUpNowIcon()}</button>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Email Address <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Profile URL<br />
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            First Name <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Last Name <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
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

export default connect(mapStateToProps, actions)(Register);