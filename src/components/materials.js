import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { removeIconSmall, goToIcon, TouchtoEdit } from './svg';
import { CreateMaterial } from './functions';
import { Link } from 'react-router-dom';
import DynamicStyles from './dynamicstyles';
import MakeID from './makeids';

class Materials extends Component {


    makematerialactive(materialid) {
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false })
        } else {
            this.setState({ activematerialid: materialid })
        }

    }

    showmaterialid(material) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const removeIcon = dynamicstyles.getremoveicon.call(this);
        const myuser = dynamicstyles.getuser.call(this)
        const buttonSize = dynamicstyles.buttonSize.call(this)
        const touchtoedit = dynamicstyles.touchtoedit.call(this)
        const materials = new Materials();
        const getactivematerialbackground = (materialid) => {
            if (this.state.activematerialid === materialid) {
                return ({ backgroundColor: '#F2C4D2' })
            } else {
                return ({ backgroundColor: '#FFFFFF' })
            }

        }
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                return (
                    <div style={{ ...styles.generalContainer }} key={material.materialid}>

                        <div style={{ ...styles.generalContainer, ...getactivematerialbackground(material.materialid), ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalFont, ...regularFont, ...styles.generalLink }}
                                to={`/${myuser.profile}/company/${myuser.company.url}/materials/${material.materialid}`}>
                                <button style={{ ...getactivematerialbackground(material.materialid), ...buttonSize, ...styles.noBorder }}>{goToIcon()}</button> {material.material}</Link>
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
        const dynamicstyles = new DynamicStyles();
        const materials = new Materials();
        let mymaterial = dynamicstyles.getmymaterials.call(this)
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

        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {

                if (myuser.company.hasOwnProperty("materials")) {
                    myuser.company.materials.mymaterial.push(newMaterial)
                } else {
                    let materials = { mymaterial: [newMaterial] }
                    myuser.company.materials = materials;
                }
                this.props.reduxUser(myuser)
                this.setState({ activematerialid: newMaterial.materialid })

            }

        }
    }

    handlematerial(material) {
        const dynamicstyles = new DynamicStyles();
        const makeID = new MakeID();
        const myuser = dynamicstyles.getuser.call(this)
        if (myuser) {

            if (this.state.activematerialid) {
                const mymaterial = dynamicstyles.getmymaterialfromid.call(this, this.state.activematerialid)
                if (mymaterial) {
                    let i = dynamicstyles.getmaterialkeybyid.call(this, this.state.activematerialid)
                    myuser.company.materials.mymaterial[i].material = material;
                    this.props.reduxUser(myuser);
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
                this.createnewmaterial(newMaterial)
            }

        }
    }

    getmaterial() {
        const dynamicstyles = new DynamicStyles()
        let getmaterial = "";
        if (this.state.activematerialid) {
            const material = dynamicstyles.getmymaterialfromid.call(this, this.state.activematerialid)
            if (material) {

                getmaterial = material.material
            }

        }
        return getmaterial;
    }

    validatematerial(material) {
        const dynamicstyles = new DynamicStyles();
        const myprojects = dynamicstyles.getmyprojects.call(this);
        let validate = true;
        let validatemessage = "";
        const materialid = material.materialid;
        if (myprojects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map(mymaterial => {
                        if (mymaterial.mymaterialid === materialid) {
                            validate = false;
                            validatemessage += `Could not delete material ${material.material}, exists inside schedule materials Project ID ${myproject.projectid}`

                        }
                    })

                }

                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
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
        const dynamicstyles = new DynamicStyles();

        if (window.confirm(`Are you sure you want to delete ${material.material}?`)) {
            const validate = materials.validatematerial.call(this, material);
            if (validate.validate) {
                let myuser = dynamicstyles.getuser.call(this);
                const mymaterial = dynamicstyles.getmymaterialfromid.call(this, material.materialid)
                if (mymaterial) {
                    const i = dynamicstyles.getmaterialkeybyid.call(this, material.materialid);
                    myuser.company.materials.mymaterial.splice(i, 1);
                    this.props.reduxUser(myuser);
                    this.setState({ activematerialid: false, message: '' })

                }
            } else {
                this.setState({ message: validate.validatemessage })
            }

        }

    }


    showMaterials() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const maxWidth = dynamicstyles.getMaxWidth.call(this)
        const myuser = dynamicstyles.getuser.call(this)
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const materials = new Materials();
        if (myuser) {

            
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.companyid}/materials`}
                            > /materials</Link>
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

                        {dynamicstyles.showsavecompany.call(this)}

                    </div>
                </div>
            )



        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Materials </span>
            </div>)
        }
    }
}



export default Materials;