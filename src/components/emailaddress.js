import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { goCheckIcon } from './svg'
import { CheckEmailAddress } from './actions/api'
import { validateEmail } from './functions'

class EmailAddress {

    handleemailaddress(emailaddress) {
        emailaddress = emailaddress.toLowerCase();
        this.setState({ emailaddress })
        let errmsg = validateEmail(emailaddress)
        if (errmsg) {
            this.setState({ emailaddresscheck: false, message: errmsg })
        } else {
            this.setState({ emailaddresscheck: true, message: "" })
        }

    }


    async verifyEmailAddress() {
     
        let emailaddress = this.state.emailaddress;

        if (this.state.register) {
            if (!validateEmail(emailaddress)) {
                try {
                    let response = await CheckEmailAddress(emailaddress)
                    console.log(response)

                    if (response.hasOwnProperty("valid")) {
                        this.setState({ emailaddresscheck: true });
                    }
                    else {
                        this.setState({ emailaddresscheck: false, message: response.message });
                    }

                } catch (err) {

                    alert(err)
                }

            }

        }


    }


    showemailaddress() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const goIcon = dynamicstyles.getgocheckheight.call(this)
        const emailaddress = new EmailAddress();
        const goCheck = () => {
            if (this.state.emailaddress && this.state.emailaddresscheck) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            } else {
                return (<span>&nbsp;</span>)
            }
        }

        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex2, ...styles.generalFont, ...regularFont }}>
                        Email Address
                    </div>
                    <div style={{ ...styles.flex3 }}>
                        <input type="text" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                            onChange={event => { emailaddress.handleemailaddress.call(this, event.target.value) }}
                            value={this.state.emailaddress}
                            onBlur={() => { emailaddress.verifyEmailAddress.call(this) }}
                        />
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
                                Email Address
                            </div>
                        </div>
                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex2 }}>
                                <input type="text" style={{ ...styles.generalFont, ...styles.generalField, ...regularFont }}
                                    onChange={event => { emailaddress.handleemailaddress.call(this, event.target.value) }}
                                    value={this.state.emailaddress}
                                    onBlur={() => { emailaddress.verifyEmailAddress.call(this) }} F
                                />
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
export default EmailAddress;