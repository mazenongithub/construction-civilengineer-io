import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg'
import { CreateEquipment } from './functions';
import Construction from './construction';
import { Link } from 'react-router-dom';
import ViewEquipment from './viewequipment'

import MakeID from './makeids';
class Equipment {



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


                let accountid = this.state.accountid


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

                this.setState({ activeequipmentid: equipmentid })


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
    viewEquipment(activeequipmentid) {
        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        navigation.company.active = "viewequipment"
        navigation.company.equipment = { activeequipmentid, equipmentdate: false, activecostid: false, purchase: false, sale: false }
        this.props.reduxNavigation(navigation)
        this.setState({ render: 'render' })
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
                            <a style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                                onClick={() => { equipment.viewEquipment.call(this, getequipment.equipmentid) }}>
                                {getequipment.equipment}</a>
                            <button
                                onClick={() => { equipment.viewEquipment.call(this, getequipment.equipmentid) }}
                                style={{ ...getactiveequipmentbackground(getequipment.equipmentid), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button>

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

    handeShowEquipment() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const equipment = new Equipment()

        const navigation = construction.getNavigation.call(this)
        if (navigation.company.active === 'equipment') {

           return( <div style={{ ...styles.generalContainer }}>

                {equipment.showequipment.call(this)}
                {equipment.showequipmentids.call(this)}

            </div>)


        } else if (navigation.company.active === 'viewequipment') {

            return(<ViewEquipment/>)


        }

    }

    equipmentNavigation() {
        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        navigation.company.active = "equipment"
        this.props.reduxNavigation(navigation)
        this.setState({render:'render'})
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

            if (company) {

                const navigation = construction.getNavigation.call(this)

         
                    return (
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }} 
                                  onClick={()=>{equipment.equipmentNavigation.call(this)}}>
                                    <span style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}

                                    > /equipment</span>
                                </div>
                                
                                {equipment.handeShowEquipment.call(this)}


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