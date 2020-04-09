import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import Privacy from './privacy';

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
    makeprivacyactive() {
        if(this.state.privacy) {
            this.setState({privacy:false})
        } else {
            this.setState({privacy:true})
        }
    }
    render() {
        const styles = MyStylesheet();
        const generalFontHeight = this.getFontHeight();
        const getTitleFont = this.getTitleFont();
        const privacy = new Privacy();
        const privacymessage = () => {
            if(this.state.privacy) {
                return(`Hide Privacy Policy`)
            } else {
                return(`Show Privacy Policy`) 
            }
        }
        const ShowPrivacy = () => {
            if(this.state.privacy) {
                return(privacy.showprivacy.call(this))
            }
        }
        return (<div style={{ ...styles.generalFlex }}>
            <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...getTitleFont, ...styles.fontBold, ...styles.alignCenter }}>
                        Construction by CivilEngineer.io
            </div>
                </div>


                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight }}>
                                Create your Company, Adds employees, benefits, determines labor rates, adds equipment, determines rates for equipment use, sets up accounts to distribute payment upon invoice to support different accounts, construction specification institute produces unit prices for different items for contruction, contractor bid schedule adds quantities producing unit pricing, equipment, labor and material components add Direct Costs, Compare proposed versus actual, project scheduling, cost estimating design for construction project
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight }}>
                                See for yourself, most comprehensive construction management application, go ahead and join
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div className="createlink" style={{ ...styles.flex1, ...styles.generalFont, ...generalFontHeight }} onClick={()=>{this.makeprivacyactive()}}>
                               {privacymessage()}
                            </div> 
                        </div>

                        {ShowPrivacy()}


                    </div>
                </div>

            </div>
        </div>)
    }
}


export default Landing;