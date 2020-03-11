import React from 'react'
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';

class AccountID {
    loadaccounts() {
        let accounts = this.getaccounts();
        let options = [<option value=""> Select Account ID</option>];
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option value={account.accountid} key={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }

    showaccountmenu() {
        const dynamicstyles = new DynamicStyles();
        const accountid = new AccountID();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        if (this.state.activeequipmentid) {
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
}
export default AccountID;

