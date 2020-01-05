import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { registerCompanyIcon, scrollImageDown } from './svg';
import { Link } from 'react-router-dom';
class Company extends Component {
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
    showuserid() {
        let user = this.getuser();
        if (user) {
            return (`/${user.providerid}`)
        }
    }
    showcompanyid() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Company ID
                    </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>

                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Company ID <br /> <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />

                </div>
            </div>)
        }
    }
    showcompany() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Company

                    </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }} />

                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Company <br /> <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />

                </div>
            </div>)
        }
    }

    chooseacompany() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                                Find Your Company

                    </div>
                            <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                                <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont }} />

                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    Find Your <br /> <input type="text" style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />

                </div>
            </div>)
        }
    }
    getRegisterIcon() {
        if (this.state.width > 1200) {
            return ({
                width: '404px',
                height: '68px'
            })
        } else if (this.state.width > 800) {
            return ({
                width: '264px',
                height: '53px'
            })
        } else {
            return ({
                width: '162px',
                height: '42px'
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
    getcompanyid() {
        let myuser = this.getuser();
        let companyid = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                companyid = myuser.company.companyid;
            }

        }
        return companyid;
    }
    showcompanymenus() {
        const styles = MyStylesheet();
        const headerFont = this.getHeaderFont();
        const regularFont = this.getRegularFont();
        const providerid = this.props.match.params.providerid;
        const companyid = this.getcompanyid();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.generalFont, ...styles.alignCenter }}>
                                <Link to={`/${providerid}/company/${companyid}`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                    {providerid}/company/{companyid}
                                </Link>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /equipment
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /construction
                                </Link>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/office`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /office
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /employees
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /accounts
                                </Link>
                                </div>
                            </div>
                            <div style={{ ...styles.flex1, }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /materials
                                </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                                    <Link to={`/${providerid}/company/${companyid}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                        /projects
                                </Link>
                                </div>


                            </div>
                        </div>



                    </div>
                </div>
            )
        } else {
            return (
                <div style={styles.generalFlex}>
                    <div style={styles.flex1}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...headerFont }}>
                            <Link to={`/${providerid}/company`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                {providerid}/company/{companyid}
                            </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/office`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /office
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/employees`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /employees
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/accounts`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /accounts
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/construction`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /construction
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/equipment`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /equipment
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/materials`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /materials
                                </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            <Link to={`/${providerid}/company/${companyid}/projects`} style={{ ...styles.generalLink, ...regularFont, ...styles.generalFont }}>
                                /projects
                                </Link>
                        </div>
                    </div>
                </div>)
        }

    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const headerFont = this.getHeaderFont();
        const regularFont = this.getRegularFont();
        const registerIcon = this.getRegisterIcon();
        const arrowHeight = this.getArrowHeight();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont, ...titleFont, ...styles.fontBold }}>
                            /company
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter, ...styles.generalFont, ...headerFont }}>
                                    Create A New Company
                                </div>
                            </div>

                            {this.showcompanyid()}
                            {this.showcompany()}



                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...styles.alignCenter }}>

                            <button style={{ ...styles.generalButton, ...registerIcon }}>
                                {registerCompanyIcon()}
                            </button>

                        </div>
                    </div>

                    {this.chooseacompany()}


                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...regularFont }}>

                            Company Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                {scrollImageDown()}
                            </button>

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            Address <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            City <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }} />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            State <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }} />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                            Zipcode <br />
                            <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }} />
                        </div>
                    </div>

                    {this.showcompanymenus()}
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

export default connect(mapStateToProps, actions)(Company);