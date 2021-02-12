import React from 'react'
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles'
import { scrollImageDown, goCheckIcon } from './svg';
import { validateCompanyID } from './functions';


class ViewCompany {

    getaddress() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.address;
        }

    }
    handleaddress(address) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.address = address;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcity() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.city;
        }

    }
    handlecity(city) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.city = city;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getcontactstate() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        let contactstate = "";
        if (company) {
            contactstate = company.contactstate;
        }
        return contactstate;

    }
    handlecontactstate(contactstate) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.contactstate = contactstate;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }
    getzipcode() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.zipcode;
        }

    }
    handlezipcode(zipcode) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.zipcode = zipcode;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmycompany() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.company;
        }

    }
    handlemycompany(company) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                myuser.company.company = company;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            }
        }
    }

    getmyurl() {
        const dynamicstyles = new DynamicStyles();
        let company = dynamicstyles.getcompany.call(this)
        if (company) {
            return company.url;
        }

    }

    handlemyurl(url) {
        const dynamicstyles = new DynamicStyles();

        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            if (myuser.hasOwnProperty("company")) {
                myuser.company.url = url;
                let validate = validateCompanyID(url);

                if (!validate) {

                    if (myuser.company.hasOwnProperty("invalid")) {
                        delete myuser.company.invalid;
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ message: '' })



                } else {
                    myuser.company.invalid = validate;
                    this.setState({ message: validate })
                }

            }

        }
    }


    showViewCompany() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const arrowHeight = dynamicstyles.getArrowHeight.call(this)
        const goIcon = dynamicstyles.getgocheckheight.call(this)
        const viewcompany = new ViewCompany()
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {

                const urlicon = () => {
                    if (!myuser.company.hasOwnProperty("invalid")) {
                        return (<button style={{ ...styles.generalButton, ...goIcon }}>{goCheckIcon()}</button>)
                    }
                }
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.bottomMargin15, ...regularFont }}>

                                    Company Info <button style={{ ...styles.generalButton, ...styles.addLeftMargin, ...arrowHeight }}>
                                        {scrollImageDown()}
                                    </button>

                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> Company </span><br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getmycompany.call(this)}
                                        onChange={event => { viewcompany.handlemycompany.call(this, event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}>URL </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getmyurl.call(this)}
                                        onChange={event => { viewcompany.handlemyurl.call(this, event.target.value) }}
                                        onBlur={event => { dynamicstyles.validatecompanyid.call(this, event.target.value) }} />

                                    {urlicon()}
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}>Address </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getaddress.call(this)}
                                        onChange={event => { viewcompany.handleaddress.call(this, event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> City </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getcity.call(this)}
                                        onChange={event => { viewcompany.handlecity.call(this, event.target.value) }} />
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> State </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getcontactstate.call(this)}
                                        onChange={event => { viewcompany.handlecontactstate.call(this, event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> Zipcode  </span><br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={viewcompany.getzipcode.call(this)}
                                        onChange={event => { viewcompany.handlezipcode.call(this, event.target.value) }} />
                                </div>
                            </div>

                            {dynamicstyles.showsavecompany.call(this)}


                        </div>
                    </div>)
            }
        }
    }

}
export default ViewCompany;