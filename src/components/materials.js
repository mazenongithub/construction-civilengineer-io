import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg';
import { CreateMaterial } from './functions';
import { Link } from 'react-router-dom';
import Construction from './construction';
import MakeID from './makeids';

class Materials  {


    makematerialactive(materialid) {
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false })
        } else {
            this.setState({ activematerialid: materialid })
        }

    }

    handlematerialid(materialid) {
        this.setState({navigation:"viewmaterial", activematerialid:materialid})
    }

    showmaterialid(material) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        const removeIcon = construction.getremoveicon.call(this);
        const myuser = construction.getuser.call(this)
        const buttonSize = construction.buttonSize.call(this)
        const touchtoedit = construction.touchtoedit.call(this)
        const materials = new Materials();
        const getactivematerialbackground = (materialid) => {
            if (this.state.activematerialid === materialid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return ({ backgroundColor: '#FFFFFF' })
            }

        }
        if (myuser) {

            const company = construction.getcompany.call(this)
            if (company) {
                return (
                    <div style={{ ...styles.generalContainer }} key={material.materialid}>

                        <div style={{ ...styles.generalContainer, ...getactivematerialbackground(material.materialid), ...styles.bottomMargin15 }} onClick={()=> {
                            materials.handlematerialid.call(this,material.materialid)
                        }}>
                            <span style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                                to={`/${myuser.UserID}/company/${company.companyid}/materials/${material.materialid}`}>
                                <button style={{ ...getactivematerialbackground(material.materialid), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button> {material.material}</span>
                        </div>

                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={material.materialid}>
                                <button style={{ ...styles.generalButton, ...touchtoedit }}
                                    onClick={() => { materials.makematerialactive.call(this, material.materialid) }}
                                >{TouchtoEdit()}</button>
                            </div>
                            <div style={{ ...styles.flex1 }} onClick={() => { materials.removematerial.call(this, material) }}> <button style={{ ...styles.generalButton, ...removeIcon, ...styles.alignRight, ...getactivematerialbackground(material.materialid) }}>{removeIconSmall()} </button></div>
                        </div>
                    </div>)

            }

        }
    }


    showmaterialids() {
        const construction = new Construction();
        const materials = new Materials();
        let mymaterial = construction.getmymaterials.call(this)
        let materialids = [];
        if (mymaterial) {
            // eslint-disable-next-line
            mymaterial.map(material => {

                materialids.push(materials.showmaterialid.call(this, material))

            })
        }

        return materialids;
    }


    createnewmaterial(newMaterial) {

        const construction = new Construction();
        const myuser = construction.getuser.call(this)
        if (myuser) {

            const company = construction.getcompany.call(this)
            if (company) {

                if (company.hasOwnProperty("materials")) {
                    company.materials.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    company.materials = materials;
                }
                this.props.reduxCompany(company)
                this.setState({ activematerialid: newMaterial.materialid })

            }

        }
    }

    handlematerial(material) {
        const construction = new Construction();
        const makeID = new MakeID();
        const company = construction.getcompany.call(this)
        const materials = new Materials();
        if (company) {

            if (this.state.activematerialid) {
                const mymaterial = construction.getmymaterialfromid.call(this, this.state.activematerialid)
                if (mymaterial) {
                    let i = construction.getmaterialkeybyid.call(this, this.state.activematerialid)
                    company.materials[i].material = material;
                    this.props.reduxCompany(company);
                    this.setState({ render: 'render', material: '' })

                }


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = "";
                let csiid = "";
                let unit = "";
                let unitcost = "";
                let providerid = "";
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                materials.createnewmaterial.call(this,newMaterial)
            }

        }
    }

    getmaterial() {
        const construction = new Construction()
        let getmaterial = "";
        if (this.state.activematerialid) {
            const material = construction.getmymaterialfromid.call(this, this.state.activematerialid)
            if (material) {

                getmaterial = material.material
            }

        }
        return getmaterial;
    }

    validatematerial(material) {
        const construction = new Construction();
        const myprojects = construction.getmyprojects.call(this);
        let validate = true;
        let validatemessage = "";
        const materialid = material.materialid;
        if (myprojects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside schedule materials Project ID ${myproject.projectid}`

                        }
                    })

                }

                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside actual materials Project ID ${myproject.projectid}`

                        }
                    })

                }
            })
        }
        return { validate, validatemessage }
    }

    removematerial(material) {
        const materials = new Materials()
        const construction = new Construction();

        if (window.confirm(`Are you sure you want to delete ${material.material}?`)) {
            const validate = materials.validatematerial.call(this, material);
            if (validate.validate) {
                let company = construction.getcompany.call(this)
                const mymaterial = construction.getmymaterialfromid.call(this, material.materialid)
                if (mymaterial) {
                    const i = construction.getmaterialkeybyid.call(this, material.materialid);
                    company.materials.splice(i, 1);
                    this.props.reduxCompany(company);
                    this.setState({ activematerialid: false, message: '' })

                }
            } else {
                this.setState({ message: validate.validatemessage })
            }

        }

    }


    showMaterials() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this)
        const maxWidth = construction.getMaxWidth.call(this)
        const myuser = construction.getuser.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const materials = new Materials();
        if (myuser) {
            const company = construction.getcompany.call(this)
            if(company) {
            
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.UserID}/company/${company.companyid}/materials`}
                            > /materials</span>
                        </div>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Create A Material </span><br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField, ...maxWidth }}
                                    value={materials.getmaterial.call(this)}
                                    onChange={event => { materials.handlematerial.call(this, event.target.value) }}
                                />
                            </div>
                        </div>


                        {materials.showmaterialids.call(this)}

                      

                    </div>
                </div>
            )


            } else {

                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Company Not Found </span>
                </div>)

            }



        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Materials </span>
            </div>)
        }
    }
}



export default Materials;