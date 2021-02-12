import React from 'react'
import Profile from './profile';
import ProviderID from './providerid';
import ClientID from './clientid';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles'
class Register  {

   

    showRegister() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const clientid = new ClientID();
        const providerid = new ProviderID();
        const profile = new Profile();

        const showclientid = () => {

        if(this.state.profilecheck && this.state.profile) {
            return(clientid.showclientid.call(this, 'register'))
        }

    }
     
        const Register = () => {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.alignCenter }}>
                            Register
                        </div>
                    </div>
                    {providerid.showproviderid.call(this)}
                    {showclientid()}
                   
                 
             
             

                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.alignCenter }}>
                        {this.state.message}
                    </div>


                </div>
            </div>)
        }
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
             return(profile.showProfile.call(this))
        } else {
            return (Register())
        }


    }
}


export default Register;