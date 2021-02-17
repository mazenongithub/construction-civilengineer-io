import React from 'react';
import { MyStylesheet } from './styles';
import { registerCompanyIcon, goCheckIcon, goToIcon } from './svg';
import { Link } from 'react-router-dom';
import { RegisterNewCompany } from './actions/api';
import { validateCompanyID } from './functions';
import Construction from './construction';

class Company {


   


    validatenewcompany() {
        let validate = {};
        validate.validate = true;
        validate.message = ""
        if (!this.state.urlcheck) {
            validate.validate = false;
            validate.message += this.state.message;
        }
     
        return validate;

    }
    handleurl(url) {
        this.setState({ url });
        let validate = validateCompanyID(url);
        if (validate) {
            this.setState({ urlcheck: false, message: validate })
        } else {
            let message = `Your Company Will be Hosted at ${process.env.REACT_APP_CLIENT_API}/company/${url}`
            this.setState({ urlcheck: true, message })
        }
    }

    async registernewcompany() {
        const company = new Company();
        const construction = new Construction();
        let myuser = construction.getuser.call(this)
        let validate = company.validatenewcompany.call(this);
        if (myuser) {
            if (validate.validate) {
                if (window.confirm(`Are you sure you want to register Company: ${this.state.url} ?`)) {
                    if (myuser) {

                        let url = this.state.url;
                        let values = {url,providerid:myuser.providerid}
                        try {

                            let response = await RegisterNewCompany(values);
                            console.log(response)

                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser);
                                this.setState({ message: '' })
                            }

                        } catch (err) {
                            alert(err)
                        }

                    }
                }
            } else {
                this.setState({ message: validate.message })
            }

        }
    }

    handleCompany() {
        const construction = new Construction();
        const styles = MyStylesheet()
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const company = new Company()
        const goIcon = construction.getgocheckheight.call(this)
        const registerIcon = construction.getRegisterIcon.call(this);
        const buttonSize = construction.buttonSize.call(this)

        const urlicon = (myuser) => {
            if (this.state.urlcheck && !myuser.hasOwnProperty("company")) {
                return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
            }
        }

        const registericon = (myuser) => {
            if (this.state.urlcheck && !myuser.hasOwnProperty("company")) {
                return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                    <button style={{ ...styles.generalButton, ...registerIcon }} onClick={() => { company.registernewcompany.call(this) }}>
                        {registerCompanyIcon()}
                    </button> <br />
                    {this.state.message}
                </div>)
            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                    {this.state.message}
                </div>)
            }
        }

        if (myuser) {

            if (!myuser.hasOwnProperty("company")) {

                return (
                    <div style={{ ...styles.generalContainer }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>
                                <span style={{ ...styles.generalFont, ...headerFont }}> Create A New Company</span>
                            </div>
                        </div>

                        <div style={{ ...styles.flex1 }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>Company URL</span>
                            <br />
                            <input type="text"
                                value={this.state.url}
                                onChange={event => { company.handleurl.call(this, event.target.value) }}
                                onBlur={event => { construction.validatecompanyid.call(this, event.target.value) }}
                                style={{ ...styles.addLeftMargin, ...regularFont, ...styles.generalFont, ...styles.generalField }} />
                            {urlicon(myuser)}
                        </div>

                        {registericon(myuser)}
                    </div>)

            } else {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                       <button style={{...styles.generalButton, ...buttonSize}}>{goToIcon()}</button> 
                       <Link to={`/${myuser.profile}/company/${myuser.company.url}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> {myuser.company.url} </Link>
                    </div>)
            }

        }
    }




    showCompany() {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const styles = MyStylesheet();
        const myuser = construction.getuser.call(this)
        const company = new Company();


        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        {company.handleCompany.call(this)}

                    </div>
                </div>

            )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Company </span>
            </div>)
        }

    }


}



export default Company;