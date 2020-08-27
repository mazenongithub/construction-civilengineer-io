import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import ClientID from './clientid';
import EmailAddress from './emailaddress';
import Profile from './profile';

class Login {

 
    showlogin() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const clientid = new ClientID();
        const emailaddress = new EmailAddress();
        const profile = new Profile();
        const myuser= dynamicstyles.getuser.call(this)
        if(myuser) {
     
            return(profile.showprofile.call(this))
        } else {
            return(<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
    
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                            Login
                        </div>
                    </div>
    
                    {clientid.showclientid.call(this)}
    
                    {emailaddress.showemailaddress.call(this)}
    
    
                </div>
            </div>)

        }
        

    }

}

export default Login