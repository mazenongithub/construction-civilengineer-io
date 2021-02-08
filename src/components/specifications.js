import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles'
import { connect } from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom'

class Estimate extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid)
        if(myproject) {
    
            this.props.reduxProject({ projectid: myproject.projectid})
        }
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showspecification(spec) {
        const dynamicstyles = new DynamicStyles();
        const csiid = spec.csiid;
        const csi = dynamicstyles.getcsibyid.call(this, csiid)
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const profile = this.props.match.params.providerid;
        const projectid = this.props.match.params.projectid;
        const companyid = this.props.match.params.companyid;
        return (
            <div style={{ ...styles.generalContainer }} key={spec.specid}>
                <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }} to={`/${profile}/company/${companyid}/projects/${projectid}/specifications/${csi.csiid}`}>{csi.csi} - {csi.title}</Link>
            </div>
        )

    }

    showspecifications() {
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        let specids = [];
        if (myproject) {
            const specs = dynamicstyles.getspecficationsbyprojectid.call(this, myproject.projectid)
     
            if (specs) {
                // eslint-disable-next-line
                specs.map(spec => {
                    specids.push(this.showspecification(spec))
                })
            }
        }
        return specids;
    }

    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();

        const myuser = dynamicstyles.getuser.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const csicodes = dynamicstyles.getcsis.call(this)
        if(!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }
        if (myuser) {
            const active = dynamicstyles.checkactive.call(this)
            if (active) {
                const project = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid)
               
                if(project) {

                    if(!project.hasOwnProperty("specifications")) {
                        dynamicstyles.loadprojectspecs.call(this,project.projectid) 
                    }

                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1 }}>

                           

                            {this.showspecifications()}

                        </div>
                    </div>)

                }

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You have to be active to view Specifications </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Specifications </span>
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
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Estimate);