import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { CreateAccount } from './functions';
import DynamicStyles from './dynamicstyles';
import MakeID from './makeids';
import { Link } from 'react-router-dom';

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
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();

        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this)
            if (checkmanager) {

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

        } else {
            alert(`Only Managers have access to this function `)
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
                        onChange={event => { this.handleaccountname(event.target.value) }}
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

        this.setState({ activeaccountid: accountid })

    } else {
        this.setState({ activeaccountid: '' })
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
    const checkmanager = dynamicstyles.checkmanager.call(this)
    if(checkmanager) {
    if (window.confirm(`Are you sure you want to delete ${account.accountname}?`)) {
        let validate = this.validateDeleteAccount(account);
        if (validate.deleteaccount) {
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {
                const myaccount = dynamicstyles.getaccountbyid.call(this,account.accountid)
                if(myaccount) {
                const i = dynamicstyles.getaccountkeybyid.call(this, account.accountid)
                myuser.company.office.accounts.account.splice(i, 1);
                this.props.reduxUser(myuser)
                this.setState({activeaccountid:false})

            }



            }

        } else {
            const message = validate.deletemessage;
            this.setState({ message })
        }


    }
} else {
    alert(`Only Managers have access to this function`)
}

}
showmyaccounts() {
    const dynamicstyles = new DynamicStyles();
    const myaccounts = dynamicstyles.getmyaccounts.call(this);
    let accounts = [];
    let styles = MyStylesheet();
    let regularFont = this.getRegularFont();
    const removeIcon = this.getremoveicon()

    if (myaccounts) {

        // eslint-disable-next-line
        myaccounts.map(account => {
            accounts.push(
                <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivebackground(account.accountid) }} key={account.accountid}>
                    <span onClick={() => { this.makeaccountactive(account.accountid) }}>{account.accountname}</span>

                    <Link style={{ ...styles.generalLink, ...styles.addLeftMargin15 }} to={`/${this.props.match.params.providerid}/company/${this.props.match.params.companyid}/accounts/${account.accountid}`}>View Account</Link>
                    <span style={{ ...styles.addLeftMargin15 }}> Delete Account</span> <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removeaccount(account) }}>{removeIconSmall()} </button>
                </div>
            )

        })

    }
    return accounts;
}
render() {
    const styles = MyStylesheet();
    const dynamicstyles = new DynamicStyles();
    const headerFont = dynamicstyles.getHeaderFont.call(this)
    const myuser = dynamicstyles.getuser.call(this);
    const regularFont = dynamicstyles.getRegularFont.call(this)
    if (myuser) {
        const companyurl = () => {
            if (myuser.hasOwnProperty("company")) {
                return (myuser.company.url)
            }
        }
        const checkmanager = dynamicstyles.checkmanager.call(this)
        if(checkmanager) {
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...headerFont, ...styles.boldFont, ...styles.generalFont}}>
                            /{companyurl()}
                            </span> <br/>
                            <span style={{ ...headerFont, ...styles.boldFont, ...styles.generalFont}}>
                            /accounts
                            </span>
                        </div>
                    </div>


                    {this.showaccount()}

                    {this.showmyaccounts()}

                    {dynamicstyles.showsavecompany.call(this)}

                </div>
            </div>
        )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>You have to be a manager to view this component </span>
            </div>) 
        }
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