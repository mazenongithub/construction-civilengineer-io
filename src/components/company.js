import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { LoadAllCompanies, SendRequest } from './actions/api';
import { MyStylesheet } from './styles';
import { registerCompanyIcon, goToIcon, radioOpen, radioClosed, addCompanyButton, sentIcon, unsendIcon } from './svg';
import { Link } from 'react-router-dom';
import { RegisterNewCompany, FindMyCompany } from './actions/api';
import { validateCompanyID, createRequest, UTCTimefromCurrentDate } from './functions';
import Construction from './construction';

class Company extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, companyselect: 'newcompany', newcompany: '', comapnysearch: '', companycheck: true, message: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        this.findMyCompany();
       // this.checkAllCompany();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight, });
    }

    async findMyCompany() {
        try {

            let response = await FindMyCompany();
            if(response.hasOwnProperty("company")) {
                this.props.reduxCompany(response.company)
                this.setState({render:'render'})
            }

        } catch(err) {
            alert(err)
        }
    }

    async checkAllCompany() {
        const construction = new Construction();
        let mycompany = construction.getcompany.call(this);
        if (!mycompany) {
            if (this.props.allcompanys) {
                if (!this.props.allcompanys.hasOwnProperty("companies")) {
                    const allcompanys = await LoadAllCompanies();
                    console.log(allcompanys)
                    this.props.reduxAllCompanys(allcompanys);
                    this.setState({ render: 'render' })

                }
            }

        }
    }


    validatenewcompany() {
        let validate = {};
        validate.validate = true;
        validate.message = ""
        if (this.state.companycheck) {
            validate.validate = false;
            validate.message += this.state.companycheck;
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
        console.log(validate)
        if (myuser) {
         
                if (window.confirm(`Are you sure you want to register Company: ${this.state.newcompany} ?`)) {
                    if (myuser) {

                        let newcompany = this.state.newcompany;
                        let values = { companyid:newcompany, userid: myuser.UserID }
                        try {
                           console.log(values)

                             let response = await RegisterNewCompany(values);
                             console.log(response)

                            if (response.hasOwnProperty("myuser")) {

                                this.props.reduxUser(response.myuser);
                                
                            }

                            if(response.hasOwnProperty("company")) {
                                this.props.reduxCompany(response.company)
                            }

                            this.setState({ render: 'render' })

                        } catch (err) {
                            alert(err)
                        }

                    }
                }
   
        }
    }

    handleNewCompanyIcon() {
        if (this.state.companyselect === 'newcompany') {
            return (radioClosed())
        } else {
            return (radioOpen())
        }

    }

    handleJoinCompanyIcon() {

        if (this.state.companyselect === 'joincompany') {
            return (radioClosed())
        } else {
            return (radioOpen())
        }

    }

    handleNewCompany(newcompany) {
console.log(newcompany)
        this.setState({ newcompany })
        let companycheck = validateCompanyID(newcompany)
        console.log(companycheck)
        this.setState({ companycheck, message: companycheck })
    }


    handleRegisterCompanyIcon() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const registerIcon = construction.getRegisterIcon.call(this);
        if (!this.state.companycheck) {
            return (<button style={{ ...styles.generalButton, ...registerIcon }}
            onClick={()=>{this.registernewcompany()}}>
                {registerCompanyIcon()}
            </button>)
        } else {
            return (<div style={{ ...styles.generalContainer }}>&nbsp;</div>)
        }
    }

    async sendRequest(companyid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {
            const providerid = myuser.UserID;
            const datesent = UTCTimefromCurrentDate();
            const requestid = ''
            const request = createRequest(requestid, providerid, companyid, datesent);
            const response = await SendRequest(request)
            if (response.hasOwnProperty("myuser")) {

                this.props.reduxUser(response.myuser)

            }
            this.setState({ message: response.message })

        }


    }
    getRequests() {
        const construction = new Construction();
        let requests = false;
        const myuser = construction.getuser.call(this)
        if(myuser) {
            if(myuser.hasOwnProperty("requests")) {
                requests = myuser.requests;
            }
        }

        return requests;
    }
    getRequestID(companyid) {
        const requests = this.getRequests();
        let requestid = false;
        if(requests) {
            // eslint-disable-next-line
            requests.map(request=>{
                if(request.companyid === companyid) {
                    requestid = request.requestid;
                }


            })
        }
        return requestid;
        
    }
   async removeRequest(companyid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if(myuser) {
        const requestid = this.getRequestID(companyid)
        const providerid = myuser.UserID
        const request = createRequest(requestid, providerid, companyid, "");
        const response = await SendRequest(request)
        if (response.hasOwnProperty("myuser")) {

            this.props.reduxUser(response.myuser)

        }
        this.setState({ message: response.message })


        }

    }

    handleCompanyIcons(companyid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const styles = MyStylesheet();
        const buttonWidth = construction.getcompanybutton.call(this)
       
        let icons = [];

        const add = () => {
            return (<div style={{ ...styles.generalContainer }} key={companyid}>
                <button style={{ ...styles.generalButton, ...buttonWidth }}
                    onClick={() => { this.sendRequest(companyid) }}>
                    {addCompanyButton()}
                </button>
            </div>)
        }

        const remove = () => {
            return (<div style={{ ...styles.generalContainer }} key={companyid}>

                <div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }}>
                        {sentIcon()}
                    </button>
                </div>

                <div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }}
                    onClick={()=>{this.removeRequest(companyid)}}>
                        {unsendIcon()}
                    </button>
                </div>


            </div>)
        }

        if (myuser) {
         
              
                        icons.push(add());
                    
                

                

            } 

            

        
        
        return icons;
    }

    showCompanyID(company) {
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const styles = MyStylesheet();
 
        return (<div style={{ ...styles.generalFlex }} key={company.companyid}>
            <div style={{ ...styles.flex4 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>
                    {company.company}
                </span>

            </div>

            <div style={{ ...styles.flex1 }}>

               {this.handleCompanyIcons(company.companyid)}

            </div>


        </div>)

    }

    showCompanyIDs() {
        const construction = new Construction();
        const allcompanys = construction.getAllCompanys.call(this)
        console.log(allcompanys)
        const companys = [];
        if (allcompanys) {
            // eslint-disable-next-line
            allcompanys.map(company => {
                companys.push(this.showCompanyID(company))

            })
        }
        return companys;
    }


    handleCompany() {
        const construction = new Construction();
        const styles = MyStylesheet()
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const buttonSize = construction.buttonSize.call(this)
        const radioIcon = construction.getRadioIcon.call(this)


        const newCompanyLarge = () => {

            return (
                <div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...radioIcon }}
                                onClick={() => { this.setState({ companyselect: 'newcompany' }) }}>
                                {this.handleNewCompanyIcon()}
                            </button>

                        </div>
                        <div style={{ ...styles.flex5, ...styles.generalFont }}>
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>
                                    Create New A Company
                                </span>

                            </div>
                        </div>
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                            value={this.state.newcompany}
                            onChange={(event) => { this.handleNewCompany(event.target.value) }} />

                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.addMarginTop, ...styles.alignCenter }}>

                        {this.handleRegisterCompanyIcon()}

                    </div>

        


                    <div style={{ ...styles.generalFlex, ...styles.topMargin15 }}>
                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...radioIcon }}
                                onClick={() => { this.setState({ companyselect: 'joincompany' }) }}>
                                {this.handleJoinCompanyIcon()}
                            </button>

                        </div>
                        <div style={{ ...styles.flex5, ...styles.generalFont }}>
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>
                                    Join An Existing Company
                                </span>

                            </div>
                        </div>

                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                            value={this.state.comapanysearch}
                            onChange={(event) => { this.setState({ companysearch: event.target.value }) }} />

                    </div>

                    {this.showCompanyIDs()}

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.addMarginTop }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}> {this.state.message}</span>
                    </div>



                </div>)



        }

        if (myuser) {
            const mycompany = construction.getcompany.call(this)
            

            if (!mycompany) {

                return (
                    <div style={{ ...styles.generalContainer }}>

                        {newCompanyLarge()}


                    </div>)

            } else {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <button style={{ ...styles.generalButton, ...buttonSize }}>{goToIcon()}</button>
                        <Link to={`/${myuser.UserID}/company/${mycompany.companyid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}> {mycompany.companyid} </Link>
                    </div>)
            }

        }
    }




    render() {
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

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        allcompanys: state.allcompanys,
        mycompany:state.mycompany
    }
}

export default connect(mapStateToProps, actions)(Company);