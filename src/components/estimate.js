import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles'
import { connect } from 'react-redux';
import * as actions from './actions';
import { Link } from 'react-router-dom';

class Estimate extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        const dynamicstyles = new DynamicStyles();
        
        const csicodes = dynamicstyles.getcsis.call(this)
        if (!csicodes) {
            dynamicstyles.loadcsis.call(this)
        }
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    getbiditems() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let bidschedule = false;
        if (myuser) {
            const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);

            if (project) {
                if (project.hasOwnProperty("costestimate")) {
                    if (project.costestimate.hasOwnProperty("bidschedule")) {
                        // eslint-disable-next-line
                        bidschedule = project.costestimate.bidschedule;

                    }






                }
            }
        }

        return bidschedule;


    }


    showbiditem(biditem) {

        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const csi = dynamicstyles.getcsibyid.call(this, biditem.csiid);
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid);

        const quantityfield = dynamicstyles.getquantityfield.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (project) {

                const quantity = biditem.quantity;
                const unit = biditem.unit;


                if (this.state.width > 800) {
                    return (
                        <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                            <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}>{csi.csi}-{csi.title}</span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}>
                                    {quantity}
                                </span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}>
                                    {unit}
                                </span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                <span style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}>

                                </span>
                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                            </div>
                            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                            </div>
                        </div>)

                } else {

                    return (
                        <div style={{ ...styles.generalFlex }} key={biditem.csiid}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                        <span style={{ ...styles.generalFont, ...regularFont }}>{csi.csi}-{csi.title}</span>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                        <span style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}>
                                            {quantity}
                                        </span>

                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                        <span style={{ ...styles.generalFont, ...regularFont, ...quantityfield, ...styles.alignCenter }}>
                                            {unit}
                                        </span>

                                    </div>

                                </div>


                                <div style={{ ...styles.generalFlex }}>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>



                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    </div>

                                </div>


                            </div>

                        </div>
                    )

                }

            }
        }
    }

    showbiditems() {

        const biditems = this.getbiditems();

        let items = [];
        if (biditems) {
            // eslint-disable-next-line
            biditems.map(biditem => {
                items.push(this.showbiditem(biditem))

            })
        }
        return items;

    }

    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)

        const titlerow = () => {
            if (this.state.width > 800) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                        </div>
                    </div>)

            } else {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex2, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Line Item</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Quantity</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit</span>
                                </div>

                            </div>


                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Direct Cost</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>

                                    <span style={{ ...styles.generalFont, ...regularFont }}>Profit %</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Bid Price</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.alignCenter }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Unit Price</span>
                                </div>

                            </div>




                        </div>

                    </div>
                )

            }
        }
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            const project = dynamicstyles.getproject.call(this)
            if (project) {
                return (
                    <div style={{ ...styles.generalFont }}>
                        <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}`}
                                > /{project.title}</Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                
                                    to={`/${myuser.profile}/company/${myuser.company.url}/projects/${project.title}/estimate`}
                                > /estimate</Link>
                            </div>

                            {titlerow()}

                            {this.showbiditems()}




                        </div>
                    </div>)
            }
            else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>You must be logged in to view Bid </span>
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