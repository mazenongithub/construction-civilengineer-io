import React, {Component} from 'react'
import { MyStylesheet } from './styles'
import Construction from './construction'
import { scrollImageDown, goCheckIcon } from './svg';
import { validateCompanyID } from './functions';
import { connect } from 'react-redux';
import * as actions from './actions';

class ViewCompany extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, companyselect: 'newcompany', newcompany: '', comapnysearch: '', companycheck: true, message: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        console.log("viewcompany")
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        console.log(mycompany)
        if(!mycompany) {
            construction.findMyCompany.call(this);
        }
        
       // this.checkAllCompany();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight, });
    }


    getcompany() {
        const construction = new Construction();
        const mycompany = construction.getcompany.call(this)
        return mycompany;
    }
    getaddress() {
   
     
        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        if (company) {
            return company.address;
        }

    }
    handleaddress(address) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            
               company.address = address;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            
        }
    }
    getcity() {
 
        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        if (company) {
            return company.city;
        }

    }
    handlecity(city) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            
               company.city = city;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            
        }
    }
    getcontactstate() {
 
        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        let contactstate = "";
        if (company) {
            contactstate = company.contactstate;
        }
        return contactstate;

    }
    handlecontactstate(contactstate) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            
               company.contactstate = contactstate;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            
        }
    }
    getzipcode() {

        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        if (company) {
            return company.zipcode;
        }

    }
    handlezipcode(zipcode) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            
               company.zipcode = zipcode;
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            
        }
    }

    getmycompany() {
  
        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        if (company) {
            return company.company;
        }

    }
    handlemycompany(company) {
        const construction = new Construction();
        const getcompany = construction.getcompany.call(this)
        if (getcompany) {
            
               getcompany.company = company;
                this.props.reduxCompany(getcompany)
                this.setState({ render: 'render' })
            
        }
    }

    getmycompanyid() {
    
        const viewcompany = new ViewCompany();
const company = this.getcompany.call(this)
        if (company) {
            return company.companyid;
        }

    }

    handlemycompanyid(companyid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        if (company) {
            
               company.companyid = companyid
                this.props.reduxCompany(company)
                this.setState({ render: 'render' })
            
        }
    }


    render() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const myuser = construction.getuser.call(this)
        const arrowHeight = construction.getArrowHeight.call(this)
        const goIcon = construction.getgocheckheight.call(this)
        const viewcompany = new ViewCompany()
        if (myuser) {
            const company = construction.getcompany.call(this)
            if (company) {

              
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
                                        value={this.getmycompany.call(this)}
                                        onChange={event => { this.handlemycompany.call(this, event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}>CompanyID </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getmycompanyid.call(this)}
                                        onChange={event => { this.handlemycompanyid.call(this, event.target.value) }}
                                      />

                                  
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}>Address </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getaddress.call(this)}
                                        onChange={event => { this.handleaddress.call(this, event.target.value) }} />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> City </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getcity.call(this)}
                                        onChange={event => { this.handlecity.call(this, event.target.value) }} />
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> State </span> <br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getcontactstate.call(this)}
                                        onChange={event => { this.handlecontactstate.call(this, event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.flex1, ...styles.regularFont, ...regularFont, ...styles.addMargin }}>
                                    <span style={{ ...styles.regularFont, ...regularFont }}> Zipcode  </span><br />
                                    <input type="text" style={{ ...styles.generalField, ...styles.regularFont, ...regularFont }}
                                        value={this.getzipcode.call(this)}
                                        onChange={event => { this.handlezipcode.call(this, event.target.value) }} />
                                </div>
                            </div>

                            {construction.showsavecompany.call(this)}


                        </div>
                    </div>)
            } else {

                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Company Not Found </span>
                </div>)

            }
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Company </span>
            </div>)
        }
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allcompanys: state.allcompanys,
        mycompany:state.mycompany
    }
}

export default connect(mapStateToProps, actions)(ViewCompany);
