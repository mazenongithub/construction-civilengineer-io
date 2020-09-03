
import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles';
import {  milestoneformatdatestring } from './functions';
import DynamicStyles from './dynamicstyles';
import CriticalPath from './criticalpath'



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
        this.props.reduxProject({ activeprojectid: this.props.match.params.projectid })
        this.updateWindowDimensions()
        


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });

    }




    loadmilestoneids() {
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);
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
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);

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
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const criticalpath = new CriticalPath();
        const myuser = dynamicstyles.getuser.call(this)
        if(myuser) {
        return (
            <div style={{ ...styles.generalFlex, ...styles.addLeftMargin15}}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{this.props.match.params.projectid} </span><br />
                            <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>Project Milestones</span>
                        </div>
                    </div>

    

                    {this.loadmilestoneids()}

                    {criticalpath.showpath.call(this)}


                </div>
            </div>

        )

        } else {
            return(<div style={{...styles.generalContainer, ...styles.alignCenter}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Milestones</span>
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