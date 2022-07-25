import React from 'react';
import { MyStylesheet } from './styles';
import { GoogleSign, AppleID, NumberLabel, GreenCheck} from './svg'
import Construction from './construction';

class ClientID {

    showclientid() {
        const styles = MyStylesheet();
        const construction = new Construction();


        const verifyclientid = () => {
            if (this.state.clientid) {
                return (<button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.greenCheck }}>
                    {GreenCheck()}
                </button>)
            }
        }

        const showids = () => {
            if(!this.state.clientid) {

                return(    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.googleWidth }}
                            onClick={() => { construction.googleSignIn.call(this) }}>

                            {GoogleSign()}

                        </button>

                    </div>


                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.appleWidth }}
                            onClick={() => { construction.appleSignIn.call(this) }}>
                            {AppleID()}
                        </button>

                    </div>

                </div>)

            } else {

                return(<div style={{...styles.generalContainer}}>
                
                    <span style={{...styles.generalFont, ...styles.regularFont}}> Your Client is {this.state.client} </span>

                </div>)

            }
        }



        return (

            <div style={{ ...styles.generalContainer }}>


                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.numberLabel }}>

                            {NumberLabel()}

                        </button>

                    </div>

                    <div style={{ ...styles.flex2 }}>

                        <span style={{ ...styles.generalFont, ...styles.headerFont }}>
                            Choose Your Client
                        </span>

                    </div>


                    <div style={{ ...styles.flex3 }}>

                        {verifyclientid()}

                    </div>

                </div>




            {showids()}

            </div>)
    }

}
export default ClientID;