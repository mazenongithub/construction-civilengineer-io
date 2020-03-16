import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { CreateMaterial } from './functions';
import DynamicStyles from './dynamicstyles';
import CSI from './csi';
import AccountID from './accountid';
import MakeID from './makeids';

class Materials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '', csi_1: '', csi_2: '', csi_3: '', message: '' }
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

    gettitlefont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font60)
        } else {
            return (styles.font40)
        }

    }
    getHeaderFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font40)
        } else {
            return (styles.font30)
        }

    }
    getRegularFont() {
        const styles = MyStylesheet();
        if (this.state.width > 800) {
            return (styles.font30)
        } else {
            return (styles.font24)
        }

    }
    getuser() {
        let user = false;
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("providerid")) {
                user = this.props.myusermodel;
            }
        }
        return user;
    }

    loadaccounts() {
        let accounts = this.getaccounts();
        let options = [];
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                options.push(<option value={account.accountid} key={account.accountid}>{account.account} -{account.accountname}</option>)
            })
        }
        return options;
    }
    loadcsiids() {
        let company = this.getcompany();
        let options = [];
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    options.push(<option value={code.csiid}>{code.csi}-{code.title}</option>)
                })
            }
        }
        return options;
    }


    handleselectmenus() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this);
        const csi = new CSI();
        const accountid = new AccountID();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                {accountid.showaccountmenu.call(this)}
                            </div>

                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                {csi.showCSI.call(this)}
                            </div>

                        </div>

                    </div>
                </div>
            )
        } else {

            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont, ...styles.addMargin }}>
                                {accountid.showaccountmenu.call(this)}
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                {csi.showCSI.call(this)}
                            </div>
                        </div>


                    </div>
                </div>)

        }
    }
    getsavecompanyicon() {
        if (this.state.width > 1200) {
            return ({
                width: '413px',
                height: '79px'
            })

        } else if (this.state.width > 800) {
            return ({
                width: '309px',
                height: '67px'
            })
        } else {
            return ({
                width: '222px',
                height: '46px'
            })
        }

    }
    getmymaterial() {
        let myuser = this.getuser();
        let mymaterial = false;
        if (myuser) {
            if (myuser.company.hasOwnProperty("materials")) {
                mymaterial = myuser.company.materials.mymaterial;
            }
        }
        return mymaterial;
    }
    showmaterialids() {
        let mymaterial = this.getmymaterial();
        let materialids = [];
        if (mymaterial) {
            // eslint-disable-next-line
            mymaterial.map(material => {

                materialids.push(this.showmymaterial(material))

            })
        }

        return materialids;
    }

    getcompany() {
        let myuser = this.getuser();
        let company = false;
        if (myuser) {
            if (myuser.hasOwnProperty("company")) {
                company = myuser.company;
            }
        }

        return company;
    }
    getaccounts() {
        let company = this.getcompany();
        let accounts = false;
        if (company.hasOwnProperty("office")) {
            let office = company.office;
            if (office.hasOwnProperty("accounts")) {
                accounts = company.office.accounts.account;

            }
        }
        return accounts;
    }
    getaccountbyid(accountid) {
        let accountbyid = false;
        let accounts = this.getaccounts();
        if (accounts) {
            // eslint-disable-next-line
            accounts.map(account => {
                if (account.accountid === accountid) {
                    accountbyid = account;
                }
            })
        }

        return accountbyid;
    }
    getcsibyid(csiid) {
        let csi = false;
        let company = this.getcompany();
        if (company.hasOwnProperty("construction")) {
            if (company.construction.hasOwnProperty("csicodes")) {
                // eslint-disable-next-line
                company.construction.csicodes.code.map(code => {
                    if (code.csiid === csiid) {
                        csi = code;

                    }
                })
            }

            if (!csi) {
                if (company.construction.hasOwnProperty("civilengineer")) {
                    if (company.construction.civilengineer.hasOwnProperty("csicodes")) {
                        // eslint-disable-next-line
                        company.construction.civilengineer.csicodes.code.map(code => {
                            if (code.csiid === csiid) {
                                csi = code;

                            }
                        })
                    }
                    // eslint-disable-next-line
                }
            }

        }
        return csi;
    }
    getremoveicon() {
        if (this.state.width > 800) {
            return ({ width: '47px', height: '47px' })
        } else {
            return ({ width: '36px', height: '36px' })
        }
    }
    makematerialactive(materialid) {
        if (this.state.activematerialid === materialid) {
            this.setState({ activematerialid: false })
        } else {
            this.setState({ activematerialid: materialid })
        }

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
        const dynamicstyles = new DynamicStyles();
        if (window.confirm(`Are you sure you want to delete ${material.material}?`)) {
            const validate = this.validatematerial(material);
            if (validate.validate) {
                let myuser = dynamicstyles.getuser.call(this);
                const i = dynamicstyles.getmaterialkeybyid.call(this, material.materialid);
                myuser.company.materials.mymaterial.splice(i, 1);
                this.props.reduxUser(myuser);
                this.setState({ activematerialid: false, message: '' })
            } else {
                this.setState({ message: validate.validatemessage })
            }

        }
    }
    showmymaterial(mymaterial) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        let account = "";
        let csi = "";
        if (mymaterial.accountid) {
            let myaccount = this.getaccountbyid(mymaterial.accountid)
            account = ` ${myaccount.accountname}`

        }
        if (mymaterial.csiid) {
            let csiid = mymaterial.csiid;
            let mycsi = this.getcsibyid(csiid);
            csi = `${mycsi.csi} - ${mycsi.title}`
        }
        return (<div style={{ ...styles.generalFlex, ...this.getactivematerialbackground(mymaterial.materialid) }}>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                <span onClick={() => { this.makematerialactive(mymaterial.materialid) }}>{mymaterial.material}  {mymaterial.unitcost}/{mymaterial.unit} Account:{account} Construction:{csi}</span>
                <button style={{ ...styles.generalButton, ...removeIcon }} onClick={() => { this.removematerial(mymaterial) }}>{removeIconSmall()} </button>
            </div>
        </div>)
    }
    getactivematerialbackground(materialid) {
        if (this.state.activematerialid === materialid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    getactivematerial() {
        let material = false;
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let company = this.getcompany();
            if (company) {
                if (company.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    company.materials.mymaterial.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            material = mymaterial;
                        }
                    })
                }
            }
        }
        return material
    }
    getactivematerialkey() {
        let key = false;
        if (this.state.activematerialid) {
            let materialid = this.state.activematerialid;
            let company = this.getcompany();
            if (company) {
                if (company.hasOwnProperty("materials")) {
                    // eslint-disable-next-line
                    company.materials.mymaterial.map((mymaterial, i) => {
                        if (mymaterial.materialid === materialid) {
                            key = i;
                        }
                    })
                }
            }
        }
        return key;
    }
    getmaterial() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                return mymaterial.material;
            }
        } else {
            return this.state.materialid;
        }
    }
    getunit() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                return mymaterial.unit;
            }
        } else {
            return this.state.unit;
        }
    }

    getunitcost() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                return mymaterial.unitcost;
            }
        } else {
            return this.state.unitcost;
        }
    }

    getaccountid() {
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            if (mymaterial) {

                return mymaterial.accountid;
            }
        } else {
            return this.state.accountid;
        }
    }

    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();

            if (mymaterial) {
                let csi = dynamicstyles.getcsibyid.call(this, mymaterial.csiid)
                if (csi) {
                    return (`${csi.csi}-${csi.title}`);
                } else {
                    return;
                }

            }
        } else {
            let csi = dynamicstyles.getcsibyid.call(this, this.state.csiid)
            if (csi) {
                return (`${csi.csi}-${csi.title}`);
            } else {
                return;
            }

        }
    }

    handlematerial(material) {
        const makeID = new MakeID();
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].material = material;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render', material: '' })


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = this.state.accountid;
                let csiid = this.state.csiid;
                let unit = this.state.unit;
                let unitcost = this.state.unitcost;
                let providerid = myuser.providerid;
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)
            }
        }
    }
    handleunitcost(unitcost) {
        let myuser = this.getuser();
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].unitcost = unitcost;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {
                let materialid = makeID.materialid.call(this)
                let accountid = this.state.accountid;
                let csiid = this.state.csiid;
                let unit = this.state.unit;
                let material = this.state.material;
                let providerid = myuser.providerid;
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)
            }
        }
    }

    handleaccountid(accountid) {

        let myuser = this.getuser();
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].accountid = accountid;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {
                let materialid = makeID.materialid.call(this);
                let unitcost = this.state.unitcost;
                let csiid = this.state.csiid;
                let unit = this.state.unit;
                let material = this.state.material;
                let providerid = myuser.providerid;
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)
            }
        }
    }
    handleunit(unit) {
        let myuser = this.getuser();
        const makeID = new MakeID();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].unit = unit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {
                let materialid = makeID.materialid.call(this);
                let unitcost = this.state.unitcost;
                let csiid = this.state.csiid;
                let accountid = this.state.accountid;
                let material = this.state.material;
                let providerid = myuser.providerid;
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)
            }
        }
    }
    handlecsiid(csiid) {
        let dynamicstyles = new DynamicStyles();
        let myuser = this.getuser();
        const makeID = new MakeID();
        const csi = dynamicstyles.getcsibyid.call(this, csiid);
        let csi_1 = csi.csi.substr(0, 2)
        let csi_2 = csi.csi.substr(2, 2)
        let csi_3 = csi.csi.substr(4, 2)
        this.setState({ csi_1, csi_2, csi_3 })
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].csiid = csiid;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {

                let materialid = makeID.materialid.call(this);
                let accountid = this.state.accountid;
                let material = this.state.material;
                let unit = this.state.unit;
                let unitcost = this.state.unitcost;
                let providerid = myuser.providerid;
                let newMaterial = CreateMaterial(materialid, material, providerid, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)

            }
        }
    }
    createnewmaterial(newMaterial) {

        let myuser = this.getuser();
        let company = this.getcompany();

        if (company.hasOwnProperty("materials")) {
            myuser.company.materials.mymaterial.push(newMaterial)
        } else {
            let materials = { mymaterial: [newMaterial] }
            myuser.company.materials = materials;
        }
        this.props.reduxUser(myuser)
        this.setState({ activematerialid: newMaterial.materialid })
    }

    render() {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const titleFont = this.gettitlefont();
        const dynamicstyles = new DynamicStyles();
        const maxWidth = dynamicstyles.getMaxWidth.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/materials
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                            Create A Material <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField, ...maxWidth }}
                                value={this.getmaterial()}
                                onChange={event => { this.handlematerial(event.target.value) }}
                            />
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                            Unit <br /><input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                onChange={event => { this.handleunit(event.target.value) }}
                                value={this.getunit()} />
                        </div>

                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                            Unit Cost <br /><input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                onChange={event => { this.handleunitcost(event.target.value) }}
                                value={this.getunitcost()}
                            />
                        </div>
                    </div>
                    {this.handleselectmenus()}
                    {dynamicstyles.showsavecompany.call(this)}
                    {this.showmaterialids()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation
    }
}

export default connect(mapStateToProps, actions)(Materials);