import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg';
import { CreateAccount } from './functions';
import DynamicStyles from './dynamicstyles';
import MakeID from './makeids';
import { Link } from 'react-router-dom';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeaccountid: "", account: '', account_1: '', account_2: '', account_3: "", accountname: '', spinner: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

  
    handleaccountname(accountname) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();

        if (myuser) {
       

                if (this.state.activeaccountid) {
                    const account = dynamicstyles.getaccountbyid.call(this, this.state.activeaccountid)
                    if (account) {
                        let i = dynamicstyles.getaccountkeybyid.call(this, this.state.activeaccountid)
                        myuser.company.office.accounts.account[i].accountname = accountname;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }


                } else {
                    let accountid = makeID.accountid.call(this)

                    let newaccount = CreateAccount(accountid, accountname, myuser.providerid)

                    if (myuser.company.office.hasOwnProperty("accounts")) {
                        myuser.company.office.accounts.account.push(newaccount)
                    } else {
                        let accounts = { account: [newaccount] }
                        myuser.company.office.accounts = accounts;
                    }
                    this.props.reduxUser(myuser)
                    this.setState({ activeaccountid: accountid })

                }

        
        }

    }
    getaccountname() {
        if (this.state.activeaccountid) {
            let account = this.getactiveaccount();
            return (account.accountname)
        } else {
            return (this.state.accountname)
        }
    }
    makeaccountunactive() {
        this.setState({activeaccountid:false})
    }
    showaccount() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles()
        const regularFont = dynamicstyles.getRegularFont.call(this)
       
            return (
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1}}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Account Name</span> <br />
                         <input type="text"
                            onChange={event => { this.handleaccountname(event.target.value) }}
                            
                            value={this.getaccountname()}
                            style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
                    </div>
                </div>
            )
        
    }

  
    makeaccountactive(accountid) {
        if (this.state.activeaccountid !== accountid) {

            this.setState({ activeaccountid: accountid })

        } else {
            this.setState({ activeaccountid: '' })
        }


    }
    getactivebackground(accountid) {
        if (this.state.activeaccountid === accountid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return ({ backgroundColor: '#FFFFFF' })
        }

    }
    validateDeleteAccount(account) {
        const dynamicstyles = new DynamicStyles();
        let deleteaccount = true;
        let deletemessage = "";
        const accountid = account.accountid;
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const myemployees = dynamicstyles.getmyemployees.call(this);
            if (myemployees.hasOwnProperty("length")) {
                // eslint-disable-next-line
                myemployees.map(employee => {
                    if (employee.hasOwnProperty("benefits")) {
                        // eslint-disable-next-line
                        employee.benefits.benefit.map(benefit => {
                            if (benefit.accountid === accountid) {
                                deleteaccount = false;
                                deletemessage += `Account ID is associated to employee ${employee.providerid}`
                            }
                        })
                    }
                })
            }

        }
        let mymaterials = dynamicstyles.getmymaterials.call(this);
        if (mymaterials.hasOwnProperty("length")) {
            // eslint-disable-next-line
            mymaterials.map(mymaterial => {
                if (mymaterial.accountid === accountid) {
                    deleteaccount = false;
                    deletemessage += `Account ID is associated to materials ${mymaterial.material}`

                }
            })

        }
        let myequipment = dynamicstyles.getmyequipment.call(this);
        if (myequipment.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myequipment.map(equipment => {
                if (equipment.accountid === accountid) {
                    deleteaccount = false;
                    deletemessage += `Account ID is associated to equipment ${equipment.equipment}`
                }
            })
        }

        return { deleteaccount, deletemessage }
    }
    removeaccount(account) {
        let dynamicstyles = new DynamicStyles();
       
            if (window.confirm(`Are you sure you want to delete ${account.accountname}?`)) {
                let validate = this.validateDeleteAccount(account);
                if (validate.deleteaccount) {
                    const myuser = dynamicstyles.getuser.call(this);
                    if (myuser) {
                        const myaccount = dynamicstyles.getaccountbyid.call(this, account.accountid)
                        if (myaccount) {
                            const i = dynamicstyles.getaccountkeybyid.call(this, account.accountid)
                            myuser.company.office.accounts.account.splice(i, 1);
                            this.props.reduxUser(myuser)
                            this.setState({ activeaccountid: false })

                        }



                    }

                } else {
                    const message = validate.deletemessage;
                    this.setState({ message })
                }


            }
   

    }
    showmyaccounts() {
        const dynamicstyles = new DynamicStyles();
        const myaccounts = dynamicstyles.getmyaccounts.call(this);
        let accounts = [];
        let styles = MyStylesheet();
        let regularFont = dynamicstyles.getRegularFont.call(this);
        const buttonSize = dynamicstyles.getButtonSize.call(this)
        const removeIcon = dynamicstyles.getremoveicon.call(this)
        const touchtoedit = () => {

            if(this.state.width>1200) {
                return({width:'80px'})
            } else {
                return({width:'60px'})
            } 
        }

    

        if (myaccounts) {

            // eslint-disable-next-line
            myaccounts.map(account => {
                accounts.push(
                    <div style={{ ...styles.generalContainer }}>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...regularFont, ...styles.generalFont, ...this.getactivebackground(account.accountid), ...styles.bottomMargin15 }} key={account.accountid}>

                            <Link style={{ ...styles.generalLink, ...styles.addLeftMargin15 }} to={`/${this.props.match.params.providerid}/company/${this.props.match.params.companyid}/accounts/${account.accountid}`}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>{account.accountname}</span>
                                <button style={{ ...this.getactivebackground(account.accountid), ...buttonSize, ...styles.noBorder }}
                               >{goToIcon()}
                               </button>
                            </Link>
                        </div>
                        <div style={{...styles.generalFlex, ...styles.bottomMargin15}}>
                            <div style={{...styles.flex1}}>

                            <button style={{...styles.generalButton,...touchtoedit()}} 
                             onClick={()=>{this.makeaccountactive(account.accountid)}}
                            >{TouchtoEdit()}</button>

                            </div>
                            <div style={{...styles.flex1}}>
                            <button style={{...styles.generalButton,...removeIcon, ...styles.alignRight}} onClick={()=>{this.removeaccount(account)}}>{removeIconSmall()}</button>
                            </div>
                        </div>
                    </div>
                )

            })

        }
        return accounts;
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();

        const myuser = dynamicstyles.getuser.call(this);
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>


                        {this.showaccount()}

                        {this.showmyaccounts()}

                        {dynamicstyles.showsavecompany.call(this)}

                    </div>
                </div>
            )

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Accounts</span>
            </div>)
        }

    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Accounts);