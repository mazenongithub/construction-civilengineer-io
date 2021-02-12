import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { Link } from 'react-router-dom';
import { goToIcon } from './svg';

class Employees {


    showmyemployees() {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this)
        const employees = new Employees();
        let myemployees = [];
        if (myuser) {

            let getemployees = dynamicstyles.getmyemployees.call(this)

            if (getemployees) {
                // eslint-disable-next-line
                getemployees.map(getemployee => {

                    myemployees.push(employees.showmyemployee.call(this, getemployee.providerid))


                })
            }

        }

        return (myemployees)
    }


    removeemployee(employee) {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);
        let myemployee = dynamicstyles.getemployeebyid.call(this, employee.providerid);



        if (window.confirm(`Are you sure you want to delete ${employee.firstname} ${employee.lastname} from the company?`)) {
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.office.hasOwnProperty("employees")) {

                    if (myemployee.hasOwnProperty("benefits")) {
                        this.setState({ message: `${employee.firstname} ${employee.lastname} has benefits to remove prior to removing from the company` })
                    } else {
                        let i = dynamicstyles.getemployeekeybyid.call(this, employee.providerid);
                        myuser.company.office.employees.employee.splice(i, 1)
                        if (myuser.company.office.employees.employee.length === 0) {
                            delete myuser.company.office.employees.employee
                            delete myuser.company.office.employees
                        }
                        this.setState({ activeemployeeid: false })
                    }

                }

            }
        }

    }
    showmyemployee(providerid) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const employee = dynamicstyles.getemployeebyid.call(this, providerid)
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const myuser = dynamicstyles.getuser.call(this)


        if (myuser) {

            if (employee) {

                const buttonSize = () => {
                    if (this.state.width > 1200) {
                        return ({ width: '60px' })

                    } else if (this.state.width > 600) {
                        return ({ width: '50px' })

                    } else {
                        return ({ width: '40px' })

                    }
                }


                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={`myemployee${employee.providerid}`} >
                        <div style={{ ...styles.flex1 }}>

                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont }}
                                to={`/${myuser.profile}/company/${myuser.company.url}/employees/${employee.profile}`}
                            > <button style={{ ...styles.generalButton, ...buttonSize() }}>{goToIcon()}</button> {employee.firstname} {employee.lastname}</Link>

                        </div>

                    </div>
                )


            }

        }
    }



    showEmployees() {
        const dynamicstyles = new DynamicStyles();

        const styles = MyStylesheet();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const employees = new Employees();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.companyid}/employees`}
                            > /employees</Link>
                        </div>


                        {employees.showmyemployees.call(this)}


                    </div>
                </div>
            )
        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Employees </span>
            </div>)
        }
    }
}



export default Employees;