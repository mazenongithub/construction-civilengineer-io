import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { goCheckIcon } from './svg';
import { validateProviderID } from './functions'
import { CheckProviderID } from './actions/api'

class ProviderID {
    handleprofile(profile) {
        profile = profile.toLowerCase();
        const errmsg = validateProviderID(profile);
        if (errmsg) {
            this.setState({ profile, profilecheck: false, message: errmsg })
        } else {
            this.setState({ profile, profilecheck: true, message: "" })
        }
    }

    async verifyProfile() {
        if (this.state.profilecheck) {
            let profile = this.state.profile;
            try {
                let response = await CheckProviderID(profile)
                console.log(response)
                if (response.hasOwnProperty("valid")) {
                    this.setState({ profilecheck: true });
                }
                else {
                    this.setState({ profilecheck: false, message: response.invalid });
                }

            } catch (err) {

                alert(err)
            }

        }


    }

    showproviderid() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this);
        const providerid = new ProviderID();
        const goCheck = () => {
            if (this.state.profile && this.state.profilecheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Create A ProviderID
                    </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="text"
                            value={this.state.profile}
                            onBlur={() => { providerid.verifyProfile.call(this) }}
                            onChange={event => { providerid.handleprofile.call(this, event.target.value) }}
                            style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }} />
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        {goCheck()}
                    </div>

                </div>
            )

        } else {

            return (

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                Create A ProviderID
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex2 }}>
                                <input type="text" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                                    value={this.state.profile}
                                    onBlur={() => { providerid.verifyProfile.call(this) }}
                                    onChange={event => { providerid.handleprofile.call(this, event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                {goCheck()}

                            </div>
                        </div>
                    </div>

                </div>
            )

        }

    }


}
export default ProviderID;