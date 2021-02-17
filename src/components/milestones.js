
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import { milestoneformatdatestring } from './functions';
import Construction from './construction';
import CriticalPath from './criticalpath'
import { Link } from 'react-router-dom';


class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: '',
            message: '',
            activemilestoneid: "",
            width: '',
            height: '',


        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }




    loadmilestoneids() {
        const construction = new Construction();
        const myproject = construction.getproject.call(this)
        let ids = [];
        if (myproject) {

            if (myproject.hasOwnProperty("projectmilestones")) {
                // eslint-disable-next-line
                myproject.projectmilestones.mymilestone.map(mymilestone => {
                    ids.push(this.showmilestone(mymilestone))
                })

            }

        }
        return ids;
    }
    makemilestoneactive(milestoneid) {

        if (this.state.activemilestoneid === milestoneid) {
            this.setState({ activemilestoneid: false })
        } else {

            this.setState({ activemilestoneid: milestoneid })
        }
    }

    showmilestone(mymilestone) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);

        const activebackground = (milestoneid) => {
            if (milestoneid === this.state.activemilestoneid) {
                return ({ backgroundColor: '#89F786' })
            } else {
                return;
            }
        }
        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...activebackground(mymilestone.milestoneid) }} key={mymilestone.milestoneid}>
                <div style={{ ...styles.flex5, ...styles.generalFont, ...regularFont }} onClick={() => { this.makemilestoneactive(mymilestone.milestoneid) }}>
                    {mymilestone.milestone} From {milestoneformatdatestring(mymilestone.start)} to {milestoneformatdatestring(mymilestone.completion)}

                </div>

            </div>
        )
    }

    render() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const headerFont = construction.getHeaderFont.call(this);
        const criticalpath = new CriticalPath();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const project = construction.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.addLeftMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                                > /{project.title}</Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}/milestones`}
                                > /milestones</Link>
                            </div>


                          


                        </div>
                    </div>

                )

            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not found </span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Milestones</span>
            </div>)

        }
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
    }
}

export default connect(mapStateToProps, actions)(Milestones)