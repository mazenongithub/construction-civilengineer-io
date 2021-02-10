import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
//import { removeIconSmall } from './svg';
import DynamicStyles from './dynamicstyles';

import { Link } from 'react-router-dom';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activeemployeeid: '', search: '', activebenefitid: '', amount: "", accountid: '', benefit: '', month: '', week: '', day: '', hour: '', spinner: false }
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



    showmyemployees() {
        const dynamicstyles = new DynamicStyles()
        const myuser = dynamicstyles.getuser.call(this)
        let myemployees = [];
        if (myuser) {

            let employees = dynamicstyles.getmyemployees.call(this)

            if (employees) {
                // eslint-disable-next-line
                employees.map(employee => {

                    myemployees.push(this.showmyemployee(employee.providerid))


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


                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={`myemployee${employee.providerid}`} >
                        <div style={{ ...styles.flex1 }}>

                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.url}/employees/${employee.profile}`}
                            > {employee.firstname} {employee.lastname}</Link>

                        </div>

                    </div>
                )


            }

        }
    }

  

    render() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)

        if (myuser) {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>



                        {this.showmyemployees()}



                        {dynamicstyles.showsavecompany.call(this)}

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

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys
    }
}

export default connect(mapStateToProps, actions)(Employees);