import React from 'react';
import { MyStylesheet } from './styles';
import Construction from './construction';
import ClientID from './clientid';
import Profile from './profile';
import { Link } from 'react-router-dom';
import Connecting from './connecting';

class Login {

    showConnecting() {
        if(this.state.login) {
            return(<Connecting/>)
        }
    }

    showLogin() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const clientid = new ClientID();
        const profile = new Profile();
        const login = new Login()

        const myuser = construction.getuser.call(this)
        if (myuser) {
 
            return (profile.showProfile.call(this))

        } else {

            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>

                        <Link to={`/providers/login`} style={{ ...styles.generalLink, ...styles.headerFont, ...styles.generalFont, ...styles.boldFont }}>/login </Link>

                    </div>

                    {clientid.showclientid.call(this)}


                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...styles.regularFont }}>
                            {this.state.message}
                        </span>
                    </div>

                 

                    {login.showConnecting.call(this)}



                </div>
            </div>)

        }


    }

}


export default Login;