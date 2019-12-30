import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { folderIcon, scrollImageDown, StripeConnectIcon } from './svg';
class Profile extends Component {
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
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        }
        return (styles.font30)
    }

    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        }
        return (styles.font24)
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
    getprofiledimensions() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '392px',
                    height: '327px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '285px',
                    height: '249px'
                })

        } else {
            return (
                {
                    width: '167px',
                    height: '145px'
                })
        }
    }
    getFolderSize() {
        if (this.state.width > 1200) {
            return (
                {
                    width: '142px',
                    height: '88px'
                })

        } else if (this.state.width > 800) {
            return (
                {
                    width: '93px',
                    height: '76px'
                })

        } else {
            return (
                {
                    width: '88px',
                    height: '61px'
                })
        }

    }
    getArrowHeight() {
        if (this.state.width > 800) {
            return (
                {
                    width: '55px',
                    height: '48px'
                })

        } else {
            return (
                {
                    width: '45px',
                    height: '34px'
                })
        }

    }
    showprofileurl() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <input type="text" style={{ ...styles.addLeftMargin, ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />

                </div>

            </div>)

        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                    Profile URL <br /> <input type="text" style={{ ...styles.regularFont, ...regularFontHeight, ...styles.generalField }} />
                </div>

            </div>)

        }
    }
    getclientmessage() {
        let user = this.getuser();
        if (user) {
            return `Your Profile is connected with ${user.client}`
        } else {
            return;
        }
    }
    showlogininfo() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        {this.getclientmessage()}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.addPadding }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Email <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                    <div style={{ ...styles.flex1, ...regularFontHeight, ...styles.regularFont, ...styles.addMargin }}>
                        Password  <br />
                        <input type="password " style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                </div>

            </div>
        </div>)

    }
    showadditional() {
        const styles = MyStylesheet();
        const regularFontHeight = this.getRegularFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        First Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Last Name <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Address <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        City <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        State <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Zipcode <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addMargin }}>
                        Phone Number <br />
                        <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFontHeight }} />
                    </div>
                </div>

            </div>
        </div>)
    }
    getstripebutton() {
        if (this.state.width > 1200) {
            return ({
                width: '427px',
                height: '82px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '265px',
                height: '64px'
            })

        } else {
            return ({
                width: '196px',
                height: '49px'
            })
        }
    }
    render() {
        const styles = MyStylesheet();
        const headerFont = this.getHeaderFont();
        const regularFontHeight = this.getRegularFont();
        let myuser = this.getuser();
        const profileDimensions = this.getprofiledimensions();
        const folderSize = this.getFolderSize();
        const arrowHeight = this.getArrowHeight();
        const stripeButton = this.getstripebutton()

        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...headerFont, ...styles.fontBold, ...styles.alignCenter }}>
                        /{myuser.providerid}
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex2 }}>
                        <div style={{ ...styles.generalContainer, ...profileDimensions, ...styles.showBorder, ...styles.margin10, ...styles.alignRight }}>
                            &nbsp;
                        </div>
                    </div>
                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignBottom, ...styles.margin10 }}>
                        <button style={{ ...styles.generalButton, ...folderSize }}>
                            {folderIcon()}
                        </button>
                    </div>
                </div>

                {this.showprofileurl()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        Login Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showlogininfo()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight }}>
                        Additional Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                            {scrollImageDown()}
                        </button>
                    </div>
                </div>

                {this.showadditional()}

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addPadding15 }}>
                        Receive Payments <button style={{ ...styles.generalButton, ...stripeButton }}>
                            {StripeConnectIcon()}
                        </button>
                    </div>
                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFontHeight, ...styles.addPadding15 }}>
                        Go To Company
                    </div>
                </div>


            </div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Profile);