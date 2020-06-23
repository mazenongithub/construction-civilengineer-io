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
        this.props.reduxProject({ activeprojectid: this.props.match.params.projectid })
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
        <div style={{ ...styles.generalContainer }}>
        <Link style={{...styles.generalFont, ...regularFont,...styles.generalLink}} to={`/${profile}/company/${companyid}/projects/${projectid}/specifications/${csi.csiid}`}>{csi.csi} - {csi.title}</Link>
        </div>
        )

    }

    showspecifications() {
        const dynamicstyles = new DynamicStyles();
        const myproject = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid)
        let specids = [];
        if(myproject) {
        const specs = dynamicstyles.getspecficationsbyprojectid.call(this, myproject.projectid)
        console.log(specs)
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
        const headerFont = dynamicstyles.getHeaderFont.call(this)

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter }}>
                            /{this.props.match.params.projectid} <br />
                            Specifications
                        </div>
                    </div>

                    {this.showspecifications()}
               
                </div>
            </div>)
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(Estimate);