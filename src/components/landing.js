import React, { Component } from 'react';
import { MyStylesheet } from './styles';


class Landing extends Component {
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
    getFontHeight() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font20)
        }
    }
    getTitleFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }
    }
    render() {
        const styles = MyStylesheet();
        const generalFontHeight = this.getFontHeight();
        const getTitleFont = this.getTitleFont();
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...getTitleFont, ...styles.fontBold, ...styles.alignCenter }}>
                        Construction by CivilEngineer.io
            </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight }}>
                                Free Construction Management Accounting Program for Joining. The Benefits of using this program are:
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight, ...styles.addPadding15 }}>
                                Office Management: Add Your Employees. Create Company Account Codes to Automate Employee Benefits, Custom Payroll Accounting:
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight, ...styles.addLeftMargin15, ...styles.addPadding15 }}>
                                Add your Equipment. Determines equipment rates based on the costs of owning the equipment. This will help those financing and owning their own equipment. In addition, add your own rental rentals and set your own rental rates.
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight, ...styles.addLeftMargin15, ...styles.addPadding15 }}>
                                Easy Construction Project Scheduling and Management. Just schedule your labor and equipment, add your materials. Construction Specification Institute codes for construction distribute costs to the correct pay items. Simply enter your quanitity amounts in your pay table to create unit prices for construction.
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight, ...styles.addLeftMargin15, ...styles.addPadding15 }}>
                                Work on a team with a predefined roled. Receive payments for labor, equipment, materials, and profit.  Enter your Direct Costs as they occur for live payment tracking.
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight, ...styles.addLeftMargin15, ...styles.addPadding15 }}>
                                Live up to the mintue cost tracking for your project. Free work labor, material, equipment time working sheets. Easy proposals, easy invoicing, collecting payments, routing payments to the service provider. Full construction administration from A to Z.
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>)
    }
}


export default Landing;