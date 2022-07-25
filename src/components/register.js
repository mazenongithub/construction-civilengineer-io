
import React from 'react';
import Construction from './construction';
import { Link } from 'react-router-dom';
import { MyStylesheet } from './styles'
import { NumberLabel_2, NumberLabel_3, GreenCheck,  RegisterNow } from './svg'
import Profile from './profile'
import { validateProviderID } from './functions';
import Spinner from './spinner'
import ClientID from './clientid';
class Register {

    handleProfile(profile) {
        let errmsg = "";
        this.setState({ profile })
        errmsg += validateProviderID(profile)
        if (errmsg) {
            this.setState({ profilecheck: profile, message: errmsg })
        } else {
            this.setState({ profilecheck: false, message: errmsg })
        }
    }


    showRegister() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        const profile = new Profile();
        const register = new Register();
        const clientid = new ClientID();

        const showprofile = () => {
            if (this.state.clientid && this.state.register) {
                return (

                    <div style={{ ...styles.generalContainer }}>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1 }}>

                                <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.numberLabel }}>

                                    {NumberLabel_2()}

                                </button>

                            </div>

                            <div style={{ ...styles.flex2 }}>

                                <span style={{ ...styles.generalFont, ...styles.headerFont }}>
                                    Create a Profile ID
                                </span>

                            </div>


                            <div style={{ ...styles.flex3 }}>

                                {showprofilecheck()}

                            </div>

                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <input type="text"
                                style={{ ...styles.generalField, ...styles.generalFont, ...styles.regularFont }} value={this.state.profile}
                                onChange={event => { register.handleProfile.call(this, event.target.value) }}
                            />
                        </div>

                    </div>
                )
            }
        }

      

     
        const showprofilecheck = () => {
            if (this.state.profile && !this.state.profilecheck) {
                return (<button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.greenCheck }}>
                    {GreenCheck()}
                </button>)
            }
        }

        const showregisternow = () => {
            if (this.state.clientid && this.state.profile && !this.state.profilecheck) {
                return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.numberLabel }}
                        >

                            {NumberLabel_3()}

                        </button>

                    </div>

                    <div style={{ ...styles.flex2 }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...styles.registerNow }}
                            onClick={() => { construction.clientlogin.call(this) }}>
                            {RegisterNow()}
                        </button>

                    </div>



                </div>)
            }
        }

        const showspinner = () => {
            if(this.state.spinner) {
                return(<Spinner/>)
            }
        }

        if (!myuser) {

            return (

                <div style={{ ...styles.generalContainer }}>

                    <div style={{...styles.generalContainer ,...styles.alignCenter}}>

                    <Link to={`/providers/register`} style={{ ...styles.generalLink, ...styles.headerFont, ...styles.generalFont, ...styles.boldFont }}>/register </Link>

                    </div>

                

                    {clientid.showclientid.call(this)}



                    {showprofile()}



                    {showregisternow()}

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...styles.regularFont }}>
                            {this.state.message}
                        </span>
                    </div>

                    {showspinner()}





                </div>)


        } else {
            return (profile.showProfile.call(this))
        }
    }


}

export default Register;