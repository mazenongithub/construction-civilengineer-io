import React from 'react'
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';

class AccountID {
    loadaccounts() {
        const dynamicstyles = new DynamicStyles();
        let accounts =dynamicstyles.getaccounts.call(this)
        let options = [<option key={`selectanaccount`} value=""> Select Account ID</option>];
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option key={account.accountid} value={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }

    showaccountmenu() {
        const dynamicstyles = new DynamicStyles();
        const accountid = new AccountID();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                    value={this.getaccountid()}
                    onChange={event => { this.handleaccountid(event.target.value) }}>
                    {accountid.loadaccounts.call(this)}
                </select>
            </div>)


    }
}
export default AccountID;

