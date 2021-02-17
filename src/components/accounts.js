import React from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg';
import { CreateAccount } from './functions';
import Construction from './construction';
import MakeID from './makeids';
import { Link } from 'react-router-dom';

class Accounts {

    handleaccountname(accountname) {
        const construction = new Construction();
        let myuser = construction.getuser.call(this);
        const makeID = new MakeID();

        if (myuser) {

            if (this.state.activeaccountid) {
                const account = construction.getaccountbyid.call(this, this.state.activeaccountid)
                if (account) {
                    let i = construction.getaccountkeybyid.call(this, this.state.activeaccountid)
                    myuser.company.office.accounts[i].accountname = accountname;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }


            } else {
                let accountid = makeID.accountid.call(this)

                let newaccount = CreateAccount(accountid, accountname, myuser.providerid)

                if (myuser.company.office.hasOwnProperty("accounts")) {
                    myuser.company.office.accounts.push(newaccount)
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
        const construction = new Construction()
        let accountname = "";
        if (this.state.activeaccountid) {
            let account = construction.getaccountbyid.call(this, this.state.activeaccountid)
            accountname = account.accountname;
        }
        return accountname;
    }
    makeaccountunactive() {
        this.setState({ activeaccountid: false })
    }
    showaccount() {
        const styles = MyStylesheet();
        const construction = new Construction()
        const regularFont = construction.getRegularFont.call(this)
        const accounts = new Accounts();

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Account Name</span> <br />
                    <input type="text"
                        onChange={event => { accounts.handleaccountname.call(this, event.target.value) }}

                        value={accounts.getaccountname.call(this)}
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
        const construction = new Construction();
        let deleteaccount = true;
        let deletemessage = "";
        const accountid = account.accountid;
        const myuser = construction.getuser.call(this);
        if (myuser) {
            const myemployees = construction.getmyemployees.call(this);
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
        let mymaterials = construction.getmymaterials.call(this);
        if (mymaterials.hasOwnProperty("length")) {
            // eslint-disable-next-line
            mymaterials.map(mymaterial => {
                if (mymaterial.accountid === accountid) {
                    deleteaccount = false;
                    deletemessage += `Account ID is associated to materials ${mymaterial.material}`

                }
            })

        }
        let myequipment = construction.getmyequipment.call(this);
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
        const accounts = new Accounts();
        let construction = new Construction();

        if (window.confirm(`Are you sure you want to delete ${account.accountname}?`)) {
            let validate = accounts.validateDeleteAccount.call(this, account);
            if (validate.deleteaccount) {
                const myuser = construction.getuser.call(this);
                if (myuser) {
                    const myaccount = construction.getaccountbyid.call(this, account.accountid)
                    if (myaccount) {
                        const i = construction.getaccountkeybyid.call(this, account.accountid)
                        myuser.company.office.accounts.splice(i, 1);
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
        const construction = new Construction();
        const myaccounts = construction.getmyaccounts.call(this);
        const accounts = new Accounts();
        let getaccounts = [];
        let styles = MyStylesheet();
        let regularFont = construction.getRegularFont.call(this);
        const buttonSize = construction.getButtonSize.call(this)
        const removeIcon = construction.getremoveicon.call(this)
        const touchtoedit = () => {

            if (this.state.width > 1200) {
                return ({ width: '80px' })
            } else {
                return ({ width: '60px' })
            }
        }

        const myuser = construction.getuser.call(this)


        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                if (myaccounts) {

                    // eslint-disable-next-line
                    myaccounts.map(account => {
                        getaccounts.push(
                            <div style={{ ...styles.generalContainer }} key={account.accountid}>

                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...regularFont, ...styles.generalFont, ...accounts.getactivebackground.call(this, account.accountid), ...styles.bottomMargin15 }}>

                                    <Link style={{ ...styles.generalLink, ...styles.addLeftMargin15 }} to={`/${myuser.profile}/company/${myuser.company.url}/accounts/${account.accountid}`}>
                                        <span style={{ ...styles.generalFont, ...regularFont }}>{account.accountname}</span>
                                        <button style={{ ...accounts.getactivebackground.call(this, account.accountid), ...buttonSize, ...styles.noBorder }}
                                        >{goToIcon()}
                                        </button>
                                    </Link>
                                </div>
                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1 }}>

                                        <button style={{ ...styles.generalButton, ...touchtoedit() }}
                                            onClick={() => { accounts.makeaccountactive.call(this, account.accountid) }}
                                        >{TouchtoEdit()}</button>

                                    </div>
                                    <div style={{ ...styles.flex1 }}>
                                        <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight }} onClick={() => { accounts.removeaccount.call(this, account) }}>{removeIconSmall()}</button>
                                    </div>
                                </div>
                            </div>
                        )

                    })

                }

            }

        }
        return getaccounts;
    }
    showAccounts() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const myuser = construction.getuser.call(this);
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const accounts = new Accounts();
        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.companyid}/accounts`}
                            > /accounts</Link>
                        </div>


                        {accounts.showaccount.call(this)}

                        {accounts.showmyaccounts.call(this)}

                        {construction.showsavecompany.call(this)}

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


export default Accounts;