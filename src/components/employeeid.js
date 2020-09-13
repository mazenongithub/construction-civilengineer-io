import React from 'react';
import DynamicStyles from './dynamicstyles';
import { MyStylesheet } from './styles';

class EmployeeID {

    loademployees() {

        const dynamicstyles = new DynamicStyles();

        let options = [];
        const myuser = dynamicstyles.getuser.call(this);
        if (myuser) {
            const checkmanager = dynamicstyles.checkmanager.call(this);
            if (checkmanager) {
                const company = dynamicstyles.getcompany.call(this);
                if (company) {
                    if (company.office.hasOwnProperty("employees")) {
                        // eslint-disable-next-line
                        company.office.employees.employee.map(employee => {
                            let myemployee = dynamicstyles.getemployeebyid.call(this, employee.providerid)
                      
                            options.push(<option value={myemployee.providerid}>{myemployee.firstname} {myemployee.lastname}</option>)
                        })

                    }
                }

            } else {
                options.push(<option value={myuser.providerid}>{myuser.firstname} {myuser.lastname}</option>) 
            }

        } 
            return options;
        }

        showemployeeid() {
            const styles = MyStylesheet();
            const employeeid = new EmployeeID();
            const dynamicstyles = new DynamicStyles();
            const regularFont = dynamicstyles.getRegularFont.call(this)
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        <span style={{...regularFont,...styles.generalFont}}>Employee ID</span> <br/>
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getemployeeid()}
                            onChange={event => { this.handleemployeeid(event.target.value) }}>
                            <option value={false}>Select An Employee to Create Labor Item</option>
                            {employeeid.loademployees.call(this)}
                        </select>
                    </div>
                </div>)
        }
    }
    export default EmployeeID;