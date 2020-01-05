import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { saveProjectIcon } from './svg';

class ScheduleEquipment extends Component {
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
    getsaveprojecticon() {
        if (this.state.width > 1200) {
            return ({
                width: '452px',
                height: '87px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '342px',
                height: '72px'
            })
        } else {
            return ({
                width: '234px',
                height: '51px'
            })
        }

    }

    showtimes() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    Time In
            </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    TimeOut
            </div>
            </div>)
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            Time In
                </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            Time Out
            </div>
                    </div>
                </div>
            )
        }
    }
    showmilestones() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    CSI  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> </select>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    MilestoneID  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> </select>
                </div>
            </div>
            )
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            CSI  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> </select>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                            MilestoneID  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}> </select>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const regularFont = this.getRegularFont();
        const saveprojecticon = this.getsaveprojecticon();
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }} >

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.projectid}/scheduleequipment
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                            Equipment ID <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
                        </div>
                    </div>

                    {this.showtimes()}
                    {this.showmilestones()}

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Total Hours <br />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Rate <br />
                        </div>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.alignCenter, ...styles.addPadding }}>
                            Amount <br />
                        </div>
                    </div>


                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        &nbsp;
                     </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...saveprojecticon }}>{saveProjectIcon()}</button>
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

export default connect(mapStateToProps, actions)(ScheduleEquipment);