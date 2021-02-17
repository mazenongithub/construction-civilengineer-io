import React from 'react';
import { MyStylesheet } from './styles';
import Construction from './construction';
import ClientID from './clientid';
import Profile from './profile';

class Login  {

    showLogin() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this);
        const clientid = new ClientID();
        const profile = new Profile();

        const myuser= construction.getuser.call(this)
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