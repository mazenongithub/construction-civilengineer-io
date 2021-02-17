import React from 'react';
import { MyStylesheet } from './styles';
import { GoogleSignIcon, AppleSignIcon } from './svg';
import Construction from './construction';
import Spinner from './spinner'
class ClientID {

    showclientid(type) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const loginButton = () => {
            if (this.state.width > 1200) {
                return ({ width: '276px', height: 'auto' })
            } else {
                return ({ width: '181px', height: 'auto' })
            }
        } 
        const regularFont = construction.getRegularFont.call(this)
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
                    <button style={{ ...styles.generalButton, ...loginButton() }} onClick={() => { construction.appleSignIn.call(this, type) }}>
                        {AppleSignIcon()}
                    </button>
                </div>
)
            }
        }
        const google = () => {
            if(!this.state.client || !this.state.clientid) {
                return( <div style={{...styles.flex1}}>
                    <button style={{ ...styles.generalButton, ...loginButton() }} onClick={() => { construction.googleSignIn.call(this, type) }}>
                        {GoogleSignIcon()}
                    </button>
                </div>)
            }
        }
if(!this.state.spinner) {
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

        } else {
            return (<Spinner/>)
        }
    }

}
export default ClientID;