import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg'
import { CreateEquipment } from './functions';
import DynamicStyles from './dynamicstyles';
import { Link } from 'react-router-dom';

import MakeID from './makeids';
class Equipment extends Component {



    getequipment() {
        const dynamicstyles = new DynamicStyles();
        let getequipment = "";
        if (this.state.activeequipmentid) {
            let equipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
            getequipment = equipment.equipment
        }
        return getequipment
    }


    handleequipment(equipment) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this);
        const makeID = new MakeID();

        if (myuser) {
            if (this.state.activeequipmentid) {
                const myequipment = dynamicstyles.getmyequipmentbyid.call(this, this.state.activeequipmentid)
                if (myequipment) {
                    let i = dynamicstyles.getequipmentkeybyid.call(this, this.state.activeequipmentid)
                    myuser.company.equipment.myequipment[i].equipment = equipment;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }

            } else {

                let equipmentid = makeID.equipmentid.call(this);

                let ownership = "";
                let accountid = this.state.accountid;


                let newEquipment = CreateEquipment(equipmentid, equipment, ownership, accountid)

                if (myuser.company.hasOwnProperty("equipment")) {
                    myuser.company.equipment.myequipment.push(newEquipment);
                } else {
                    let equipment = { myequipment: [newEquipment] };
                    myuser.company.equipment = equipment;

                }
                this.props.reduxUser(myuser);
                this.setState({ activeequipmentid: equipmentid })
            }

        }

    }

    showequipment() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
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
        const dynamicstyles = new DynamicStyles()
        let myequipment = dynamicstyles.getmyequipment.call(this)
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
        const dynamicstyles = new DynamicStyles();
        if (this.state.activeequipmentid !== equipmentid) {
            const myequipment = dynamicstyles.getmyequipmentbyid.call(this, equipmentid)
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
        const dynamicstyles = new DynamicStyles();
        const company = dynamicstyles.getcompany.call(this)
        let validate = {};
        validate.validate = true;
        validate.message = "";
        if (company.hasOwnProperty("projects")) {
            // eslint-disable-next-line
            company.projects.myproject.map(myproject => {
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
                            validate.validate = false;
                            validate.message += `Could not delete equipment. Check Schedule Equipment for Project ID ${myproject.projectid}  `;
                        }
                    })

                }
                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.myequipmentid === equipmentid) {
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
        const dynamicstyles = new DynamicStyles();
        if (window.confirm(`Are you sure you want to remove ${myequipment.equipment}?`)) {
            const myuser = dynamicstyles.getuser.call(this)
            const validate = equipment.checkremoveequipment.call(this, myequipment.equipmentid);

            if (validate.validate) {
                const i = dynamicstyles.getequipmentkeybyid.call(this, myequipment.equipmentid)
                myuser.company.equipment.myequipment.splice(i, 1);
                if (myuser.company.equipment.myequipment.length === 0) {
                    delete myuser.company.equipment.myequipment
                    delete myuser.company.equipment
                }
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', activeequipmentid: false })


            } else {
                this.setState({ message: validate.message })
            }
        }
    }
    showequipmentid(getequipment) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = dynamicstyles.getremoveicon.call(this);
        const myuser = dynamicstyles.getuser.call(this)
        const buttonSize = dynamicstyles.buttonSize.call(this)
        const touchtoedit = dynamicstyles.touchtoedit.call(this)
        const equipment = new Equipment()
        const getactiveequipmentbackground = (equipmentid) => {
            if (this.state.activeequipmentid === equipmentid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return ({ backgroundColor: '#FFFFFF' })
            }

        }
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                return (
                    <div style={{ ...styles.generalContainer }} key={getequipment.equipmentid}>

                        <div style={{ ...styles.generalContainer, ...getactiveequipmentbackground(getequipment.equipmentid), ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                                to={`/${myuser.profile}/company/${myuser.company.url}/equipment/${getequipment.equipmentid}`}>
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
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const equipment = new Equipment()
        const headerFont = dynamicstyles.getHeaderFont.call(this)

        if (myuser) {


            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.companyid}/equipment`}
                            > /equipment</Link>
                        </div>
                        {equipment.showequipment.call(this)}
                        {equipment.showequipmentids.call(this)}
                        {dynamicstyles.showsavecompany.call(this)}
                    </div>
                </div>
            )

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Equipment  </span>
            </div>)
        }

    }

}



export default Equipment;