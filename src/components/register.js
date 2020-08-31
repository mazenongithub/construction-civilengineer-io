import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import 'firebase/auth';
import Profile from './profile';
import ProviderID from './providerid';
import ClientID from './clientid';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles'
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilecheck: false,
            client: '',
            clientid: '',
            firstname: '',
            lastname: '',
            emailaddress: '',
            profileurl: '',
            phonenumber: '',
            emailaddresscheck: false,
            profile: '',
            password: '',
            passwordcheck: false,
            register:true,
            login:false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const clientid = new ClientID();
        const providerid = new ProviderID();

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
            return (<Profile/>)
        } else {
            return (Register())
        }


    }
}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Register);