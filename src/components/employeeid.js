import React from 'react';
import Construction from './construction';
import { MyStylesheet } from './styles';

class EmployeeID {

    loademployees() {

        const construction = new Construction();

        let options = [];
        const myuser = construction.getuser.call(this);
        if (myuser) {
          
                const company = construction.getcompany.call(this);
               
                if (company) {
                    if (company.hasOwnProperty("employees")) {
                        // eslint-disable-next-line
                        company.employees.map(employee => {
                           
                            let myemployee = construction.getuserbyID.call(this,employee.user_id)
                      
                            options.push(<option key={`option${myemployee.user_id}`} value={employee.user_id}>/{myemployee.UserID} {myemployee.FirstName} {myemployee.LastName}</option>)
                        })

                    }
                }

           
        } 
            return options;
        }

        showemployeeid() {
            const styles = MyStylesheet();
            const employeeid = new EmployeeID();
            const construction = new Construction();
            const regularFont = construction.getRegularFont.call(this)
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                        <span style={{...regularFont,...styles.generalFont}}>Employee ID</span> <br/>
                        <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                            value={this.getemployeeid()}
                            onChange={event => { this.handleemployeeid(event.target.value) }}>
                            <option value={""}>Select An Employee to Create Labor Item</option>
                            {employeeid.loademployees.call(this)}
                        </select>
                    </div>
                </div>)
        }
    }
    export default EmployeeID;