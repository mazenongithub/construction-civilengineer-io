import React from 'react';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon } from './svg';
import DynamicStyles from './dynamicstyles';
class ClientID {

    showclientid(type) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const loginButton = dynamicstyles.getLoginButton.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const signinmessage = () => {
            if (this.state.client && this.state.clientid) {
                return `Your Signin is secure with ${this.state.client}`
            } else {
                return `Secure your Sign in`
            }
        }
        const apple = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { dynamicstyles.appleSignIn.call(this, type) }}>
                        {AppleSignIcon()}
                    </button>
                </div>
)
            }
        }
        const google = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton }} onClick={() => { dynamicstyles.googleSignIn.call(this, type) }}>
                        {GoogleSignIcon()}
                    </button>
                </div>)
            }
        }

        return (
            <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                <div style={{...styles.flex1}}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1,...styles.generalFont,...regularFont }}>
                            {signinmessage()}
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            {apple()}
                        </div>
                        <div style={{ ...styles.flex1 }}>
                            {google()}
                        </div>
                    </div>

                </div>



            </div>)
    }

}
export default ClientID;