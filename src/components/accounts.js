import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { CreateAccount, makeID } from './functions';
import DynamicStyles from './dynamicstyles';

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeaccountid: "", account: '', account_1: '', account_2: '', account_3: "", accountname: '' }
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

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    getaccount_1() {
        let account_1 = "";
        if (this.state.activeaccountid) {
            let accounts = this.getactiveaccount();
            let account = accounts.account;
            account_1 = account.substr(0, 2)
            return account_1;
        } else {
            return (this.state.account_1);
        }
    }
    handleaccount_3(account_3) {
        this.setState({ account_3 })

        if (account_3.length >= 2) {

            account_3 = account_3.substr(0, 2);

            let account = "";
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;


                if (this.state.activeaccountid) {

                    account = this.getactiveaccount().account;
                    let account_1 = account.substr(0, 2);
                    let account_2 = account.substr(2, 2);
                    account = `${account_1}${account_2}${account_3}`
                    let i = this.getactiveaccountkey();
                    myuser.company.office.accounts.account[i].account = account;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })




                } else {

                    console.log(account_3)


                }

            }

        }

    }

    handleaccount_2(account_2) {
        this.setState({ account_2 })

        if (account_2.length >= 2) {

            account_2 = account_2.substr(0, 2);

            let account = "";
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;


                if (this.state.activeaccountid) {

                    account = this.getactiveaccount().account;
                    let account_1 = account.substr(0, 2);
                    let account_3 = account.substr(4, 2);
                    account = `${account_1}${account_2}${account_3}`
                    let i = this.getactiveaccountkey();
                    myuser.company.office.accounts.account[i].account = account;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })




                } else {

                    console.log(account_2)


                }

            }

        }

    }
    handleaccount_1(account_1) {
        this.setState({ account_1 })

        if (account_1.length >= 2) {

            account_1 = account_1.substr(0, 2);

            let account = "";
            if (this.props.myusermodel) {
                let myuser = this.props.myusermodel;
                if (account_1.length > 2) {
                    account_1 = account_1.substr(0, 2);
                }

                if (this.state.activeaccountid) {
                    if (account_1.length >= 2) {
                        account = this.getactiveaccount().account;
                        let account_2 = account.substr(2, 2)
                        let account_3 = account.substr(4, 2)
                        account = `${account_1}${account_2}${account_3}`
                        let i = this.getactiveaccountkey();
                        myuser.company.office.accounts.account[i].account = account;
                        this.props.reduxUser(myuser)
                        this.setState({ render: 'render' })
                    }



                } else {

                    console.log(account_1)


                }

            }

        }

    }
    showaccounts() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (

                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.margin10 }}>
                        Account <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                            value={this.state.account_1}
                            onChange={event => { this.handleaccount_1(event.target.value) }} />

                    </div>

                    <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                        &nbsp;
                    </div>
                </div>)
        } else {
            return (
                <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            Account
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.margin10 }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.state.account_1}
                                    onChange={event => { this.handleaccount_1(event.target.value) }}


                                />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.margin10 }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.state.account_2}
                                    onChange={event => { this.handleaccount_2(event.target.value) }} />
                            </div>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.margin10 }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    value={this.state.account_3}
                                    onChange={event => { this.handleaccount_3(event.target.value) }} />

                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                            &nbsp;
                        </div>

                    </div>
                </div>
            )

        }
    }
    getactiveaccountkey() {
        let key = false;
        if (this.state.activeaccountid) {
            let accountid = this.state.activeaccountid;
            let myaccounts = this.getmyaccounts();

            if (myaccounts) {
                // eslint-disable-next-line
                myaccounts.map((account, i) => {
                    if (account.accountid === accountid) {
                        key = i;
                    }
                })
            }
        }
        return key;
    }
    getactiveaccount() {
        let accounts = false;
        if (this.state.activeaccountid) {
            let accountid = this.state.activeaccountid;
            let myaccounts = this.getmyaccounts();

            if (myaccounts) {
                // eslint-disable-next-line
                myaccounts.map(account => {
                    if (account.accountid === accountid) {
                        accounts = account;
                    }
                })
            }
        }
        return accounts;
    }
    handleaccountname(accountname) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activeaccountid) {

                let i = this.getactiveaccountkey();
                if (myuser.hasOwnProperty("company")) {
                    if (myuser.company.hasOwnProperty("office")) {
                        if (myuser.company.office.hasOwnProperty("accounts")) {
                            myuser.company.office.accounts.account[i].accountname = accountname;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })
                        }
                    }
                }
            } else {
                let accountid = makeID(16);
                let account = this.state.account
                let newaccount = CreateAccount(accountid, account, accountname, myuser.providerid)

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
    showaccount() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Account Name <input type="text"
                            onChange={event => { this.handleaccountname(event.target.value) }}
                            value={this.getaccountname()}
                            style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                        Account Name <br /> <input type="text"
                            onChange={event => { this.handleaccount(event.target.value) }}
                            value={this.getaccountname()}
                            style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }} />
                    </div>
                </div>
            )
        }
    }
    getmyaccounts() {
        let user = this.getuser();
        let accounts = false;
        if (user.hasOwnProperty("company")) {
            if (user.company.hasOwnProperty("office")) {
                if (user.company.office.hasOwnProperty("accounts")) {
                    accounts = user.company.office.accounts.account;
                }
            }
        }
        return accounts;
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    getaccountfromid(accountid) {
        let myaccount = this.getmyaccounts();
        let accounts = false;
        if (myaccount) {
            // eslint-disable-next-line
            myaccount.map(account => {
                if (account.accountid === accountid) {
                    accounts = account;
                }

            })
        }
        return accounts;
    }
    makeaccountactive(accountid) {
        if (this.state.activeaccountid !== accountid) {
            let myaccount = this.getaccountfromid(accountid);
            let account = myaccount.account;
            let account_1 = account.substr(0, 2)
            let account_2 = account.substr(2, 2)
            let account_3 = account.substr(4, 2)
            console.log(account, account_3)

            this.setState({ activeaccountid: accountid, account_1, account_2, account_3 })

        } else {
            this.setState({ activeaccountid: '', account_1: '', account_2: '', account_3: '', account: '', accountname: '' })
        }


    }
    getactivebackground(accountid) {
        if (this.state.activeaccountid === accountid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
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
        if (window.confirm(`Are you sure you want to delete Account ${account.account}?`)) {
            let validate = this.validateDeleteAccount(account);
            if (validate.deleteaccount) {
                const myuser = dynamicstyles.getuser.call(this);
                if (myuser) {
                    const i = dynamicstyles.getaccountkeybyid.call(this, account.accountid)
                    myuser.company.office.accounts.account.splice(i, 1);
                    if (myuser.company.office.accounts.account.length === 0) {
                        delete myuser.company.office.accounts.account;
                        delete myuser.company.office.accounts;
                    }



                }

            } else {
                const message = validate.deletemessage;
                this.setState({ message })
            }


        }

    }
    showmyaccounts() {
        let myaccounts = this.getmyaccounts();
        let accounts = [];
        let styles = MyStylesheet();
        let regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon()

        if (myaccounts) {

            // eslint-disable-next-line
            myaccounts.map(account => {
                accounts.push(
                    <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivebackground(account.accountid) }}>
                        <span onClick={() => { this.makeaccountactive(account.accountid) }}>{account.account}  - {account.accountname}</span>
                        <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeaccount(account) }}>{removeIconSmall()} </button>
                    </div>
                )

            })

        }
        return accounts;
    }
    getaccount() {
        if (this.state.activeaccountid) {
            let account = this.getactiveaccount();
            return (account.account)
        } else {
            return (this.state.account)
        }
    }
    handleaccount(account) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {

            if (this.state.activeaccountid) {
                let i = this.getactiveaccountkey();
                myuser.company.office.accounts.account[i].account = account;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })

            } else {
                let accountid = makeID(16);
                let accountname = this.state.accountname
                let newaccount = CreateAccount(accountid, account, accountname, myuser.providerid)

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
    render() {
        const styles = MyStylesheet();
        const titleFont = this.gettitlefont();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/accounts
                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex, ...styles.topMargin15, ...styles.bottomMargin15 }}>

                        <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.margin10 }}>
                            Account Number <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getaccount()}
                                onChange={event => { this.handleaccount(event.target.value) }} />
                        </div>
                    </div>











                    {this.showaccount()}
                    {this.showmyaccounts()}

                    {dynamicstyles.showsavecompany.call(this)}

                </div>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Accounts);