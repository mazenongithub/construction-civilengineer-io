import React from 'react';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { Link } from 'react-router-dom';
import { goToIcon } from './svg';

class Employees {


    showmyemployees() {
        const construction = new Construction()
        const myuser = construction.getuser.call(this)
        const employees = new Employees();
        let myemployees = [];
        if (myuser) {

            let getemployees = construction.getmyemployees.call(this)
            console.log(getemployees)
            if (getemployees) {
                // eslint-disable-next-line
                getemployees.map(getemployee => {

                    myemployees.push(employees.showmyemployee.call(this, getemployee))


                })
            }

        }

        return (myemployees)
    }


    removeemployee(employee) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        let myemployee = construction.getemployeebyid.call(this, employee.user_id);



        if (window.confirm(`Are you sure you want to delete ${employee.firstname} ${employee.lastname} from the company?`)) {
            if (company) {
                if (company.hasOwnProperty("employees")) {

                  
                        let i = construction.getemployeekeybyid.call(this, employee.user_id);
                        company.employees.splice(i, 1)
                       
                        this.setState({ activeemployeeid: false })
                    

                }

            }
        }
    }

    handleEmployee(employee) {
        console.log("handleemployee", employee)
        this.setState({navigation:'viewemployee', activeemployeeid:employee._ID})
    }
    showmyemployee(employee) {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);
        const myuser = construction.getuser.call(this)
        const employees = new Employees();

        if (myuser) {
            const company = construction.getcompany.call(this)

            if(company) {

            if (employee) {

                const user_id = employee.user_id;

                const getemployee = construction.getuserbyID.call(this,user_id)
                console.log(getemployee)
                const buttonSize = () => {
                    if (this.state.width > 1200) {
                        return ({ width: '60px' })

                    } else if (this.state.width > 600) {
                        return ({ width: '50px' })

                    } else {
                        return ({ width: '40px' })

                    }
                }

                if(getemployee) {


                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={`myemployee${getemployee.UserID}`} >
                        <div style={{ ...styles.flex1 }}>

                            <a style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }} onClick={()=>{employees.handleEmployee.call(this,getemployee)}}
                                to={`/${myuser.UserID}/company/${company.companyid}/employees/${getemployee.UserID}`}
                            > <button style={{ ...styles.generalButton, ...buttonSize() }}>{goToIcon()}</button>  {getemployee. FirstName} {getemployee.LastName}</a>

                        </div>

                    </div>
                )

                }


            }

        }

        }
    }



    showEmployees() {
       
        const construction = new Construction();
        const styles = MyStylesheet();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const employees = new Employees();
        const headerFont = construction.getHeaderFont.call(this)
        if (myuser) {
           
            const company = construction.getcompany.call(this)
         
            if(company) {
                
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                              
                            > /employees</span>
                        </div>


                        {employees.showmyemployees.call(this)}


                    </div>
                </div>
            )

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Employees </span>
            </div>)
        }
    }
}



export default Employees;