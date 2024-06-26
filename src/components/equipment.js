import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg'
import { CreateEquipment } from './functions';
import Construction from './construction';
import { Link } from 'react-router-dom';

import MakeID from './makeids';
class Equipment extends Component {



    getequipment() {
        const construction = new Construction();
        let getequipment = "";
        if (this.state.activeequipmentid) {
            let equipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            getequipment = equipment.equipment
        }
        return getequipment
    }


    handleequipment(equipment) {
        const construction = new Construction();
        let company = construction.getcompany.call(this)
        const makeID = new MakeID();

        if (company) {
            if (this.state.activeequipmentid) {
                const myequipment = construction.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {
                    let i = construction.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                    company.equipment[i].equipment = equipment;
                    this.props.reduxCompany(company)
                    this.setState({ render: 'render' })

                }

            } else {

                let equipmentid = makeID.equipmentid.call(this);

      
                let accountid = this.state.accountid;


                let newEquipment = CreateEquipment(equipmentid, equipment, accountid)

                if (company.hasOwnProperty("equipment")) {
                    company.equipment.push(newEquipment);
                } else {
                    let equipment = { myequipment: [newEquipment] };
                    company.equipment = equipment;

                }
                this.props.reduxCompany(company);
                this.setState({ activeequipmentid: equipmentid })
            }

        }

    }

    showequipment() {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const equipment = new Equipment();

        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.flex1 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Equipment </span><br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                    value={equipment.getequipment.call(this)}
                    onChange={event => { equipment.handleequipment.call(this, event.target.value) }}
                />
            </div>
        </div>)

    }

    showequipmentids() {
        const construction = new Construction()
        let myequipment = construction.getmyequipment.call(this)
        let equipmentids = [];
        const equipment = new Equipment();
        if (myequipment) {
            // eslint-disable-next-line
            myequipment.map(getequipment => {
                equipmentids.push(equipment.showequipmentid.call(this, getequipment))

            })
        }
        return equipmentids;
    }

    makequipmentactive(equipmentid) {
        const construction = new Construction();
        if (this.state.activeequipmentid !== equipmentid) {
            const myequipment = construction.getmyequipmentbyid.call(this, equipmentid)
            if (myequipment) {
                if (myequipment.hasOwnProperty("ownership")) {

                    const purchasedateyear = myequipment.ownership.purchasedate.substring(0, 4)
                    const purchasedatemonth = myequipment.ownership.purchasedate.substring(5, 7);
                    const purchasedateday = myequipment.ownership.purchasedate.substring(8, 10);
                    const saledateyear = myequipment.ownership.saledate.substring(0, 4)
                    const saledatemonth = myequipment.ownership.saledate.substring(5, 7);
                    const saledateday = myequipment.ownership.saledate.substring(8, 10);
                    this.setState({ activeequipmentid: equipmentid, purchasedateyear, purchasedatemonth, purchasedateday, saledateyear, saledatemonth, saledateday })
                } else {
                    this.setState({ activeequipmentid: equipmentid })

                }
            }
        } else {


            this.setState({ activeequipmentid: false })
        }
    }
    checkremoveequipment(equipmentid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        let validate = {};
        validate.validate = true;
        validate.message = "";
        if (company.hasOwnProperty("projects")) {
            // eslint-disable-next-line
            company.projects.map(myproject => {
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.schedule.equipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Schedule Equipment for Project ID ${myproject.projectid}  `;
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actual.equipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Actual Equipment for Project ID ${myproject.projectid}  `;
                        }
                    })

                }
            })
        }
        return validate;
    }
    removeequipment(myequipment) {
        const equipment = new Equipment();
        const construction = new Construction();
        if (window.confirm(`Are you sure you want to remove ${myequipment.equipment}?`)) {
            const company = construction.getcompany.call(this)
            const validate = equipment.checkremoveequipment.call(this, myequipment.equipmentid);

            if (validate.validate) {
                const i = construction.getequipmentkeybyid.call(this, myequipment.equipmentid)
                company.equipment.splice(i, 1);
              
                this.props.reduxCompany(company);
                this.setState({ render: 'render', activeequipmentid: false })


            } else {
                this.setState({ message: validate.message })
            }
        }
    }
    showequipmentid(getequipment) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const removeIcon = construction.getremoveicon.call(this);
        const myuser = construction.getuser.call(this)
        const buttonSize = construction.buttonSize.call(this)
        const touchtoedit = construction.touchtoedit.call(this)
        const equipment = new Equipment()
        const getactiveequipmentbackground = (equipmentid) => {
            if (this.state.activeequipmentid === equipmentid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return ({ backgroundColor: '#FFFFFF' })
            }

        }
        if (myuser) {
            const company = construction.getcompany.call(this)
            if (company) {
                return (
                    <div style={{ ...styles.generalContainer }} key={getequipment.equipmentid}>

                        <div style={{ ...styles.generalContainer, ...getactiveequipmentbackground(getequipment.equipmentid), ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                                to={`/${myuser.UserID}/company/${company.companyid}/equipment/${getequipment.equipmentid}`}>
                                <button style={{ ...getactiveequipmentbackground(getequipment.equipmentid), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button> {getequipment.equipment}</Link>
                        </div>

                        <div style={{ ...styles.generalFlex }} key={getequipment.equipmentid}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={getequipment.equipmentid}>
                                <button style={{ ...styles.generalButton, ...touchtoedit }}
                                    onClick={() => { equipment.makequipmentactive.call(this, getequipment.equipmentid) }}
                                >{TouchtoEdit()}</button>
                            </div>
                            <div style={{ ...styles.flex1 }} onClick={() => { equipment.removeequipment.call(this, getequipment) }}> <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight, ...getactiveequipmentbackground(getequipment.equipmentid) }}>{removeIconSmall()} </button></div>
                        </div>
                    </div>)

            }

        }
    }

    showEquipment() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const equipment = new Equipment()
        const headerFont = construction.getHeaderFont.call(this)

        if (myuser) {

            const company = construction.getcompany.call(this)

            if(company) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.UserID}/company/${company.companyid}/equipment`}
                            > /equipment</Link>
                        </div>
                        {equipment.showequipment.call(this)}
                        {equipment.showequipmentids.call(this)}
                        {construction.showsavecompany.call(this)}
                    </div>
                </div>
            )

            } else {

                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Company Not Found  </span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Equipment  </span>
            </div>)
        }

    }

}



export default Equipment;