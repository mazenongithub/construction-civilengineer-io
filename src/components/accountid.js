import React from 'react'
import Construction from './construction';
import { MyStylesheet } from './styles';


class AccountID {
    loadaccounts() {
        const construction = new Construction();
        let accounts =construction.getaccounts.call(this)
        let options = [];
        options.push(<option key={`selectanaccount`} value=""> Select Account ID</option>);
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option key={account.accountid} value={account.accountid}>{account.accountname}</option>)
            })
        }
        return options;
    }

    showaccountmenu() {
        const construction = new Construction();
        const accountid = new AccountID();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);

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

