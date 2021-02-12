import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import ClientID from './clientid';
import Profile from './profile';

class Login  {

    showLogin() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const clientid = new ClientID();
        const profile = new Profile();

        const myuser= dynamicstyles.getuser.call(this)
        if(myuser) {
     
            return(profile.showProfile.call(this))
        } else {
            return(<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>
    
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...headerFont }}>
                            Login
                        </div>
                    </div>
    
                    {clientid.showclientid.call(this, "login")}
    
    
    
                </div>
            </div>)

        }
        

    }

}


  export default Login;