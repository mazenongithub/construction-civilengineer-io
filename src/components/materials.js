import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { CreateMyMaterial, makeID } from './functions';
import DynamicStyles from './dynamicstyles';

class Materials extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', materialid: '', material: '', accountid: '', csiid: '', unit: '', unitcost: '' }
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
        const regularFont = this.getRegularFont();
        if (this.state.width > 800) {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                Account <br />
                                <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    onChange={event => { this.handleaccountid(event.target.value) }}
                                    value={this.getaccountid()}>
                                    <option value={false}>Select An Account</option>
                                    {this.loadaccounts()}
                                </select>
                            </div>

                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                CSI <br />
                                <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    onChange={event => { this.handlecsiid(event.target.value) }}
                                    value={this.getcsiid()}>
                                    <option value={false}>Select An CSI</option>
                                    {this.loadcsiids()}
                                </select>
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
                                Account <br />
                                <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                                    onChange={event => { this.handleaccountid(event.target.value) }}
                                    value={this.getaccountid()}>
                                    <option value={false}>Select An Account</option>
                                    {this.loadaccounts()}
                                </select>
                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                                CSI <br />
                                <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.addMargin }}
                                    onChange={event => { this.handlecsiid(event.target.value) }}
                                    value={this.getcsiid()}>
                                    <option value={false}>Select An CSI</option>
                                    {this.loadcsiids()}
                                </select>
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
    showmymaterial(mymaterial) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon();
        let account = "";
        let csi = "";
        if (mymaterial.accountid) {
            let myaccount = this.getaccountbyid(mymaterial.accountid)
            account = `${myaccount.account} ${myaccount.accountname}`

        }
        if (mymaterial.csiid) {
            let csiid = mymaterial.csiid;
            let mycsi = this.getcsibyid(csiid);
            csi = `${mycsi.csi} - ${mycsi.title}`
        }
        return (<div style={{ ...styles.generalFlex, ...this.getactivematerialbackground(mymaterial.materialid) }}>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }} onClick={() => { this.makematerialactive(mymaterial.materialid) }}>
                {mymaterial.material}  {mymaterial.unitcost}/{mymaterial.unit} Account:{account} Construction:{csi}
                <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
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
        if (this.state.activematerialid) {
            let mymaterial = this.getactivematerial();
            if (mymaterial) {
                return mymaterial.csiid;
            }
        } else {
            return this.state.csiid;
        }
    }

    handlematerial(material) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].material = material;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {
                let materialid = makeID(16);
                let accountid = this.state.accountid;
                let csiid = this.state.csiid;
                let unit = this.state.unit;
                let unitcost = this.state.unitcost;
                let newMaterial = CreateMyMaterial(materialid, material, accountid, csiid, unit, unitcost)
                this.createnewmaterial(newMaterial)
            }
        }
    }
    handleunitcost(unitcost) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].unitcost = unitcost;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            }
        }
    }

    handleaccountid(accountid) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].accountid = accountid;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            }
        }
    }
    handleunit(unit) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].unit = unit;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            }
        }
    }
    handlecsiid(csiid) {
        let myuser = this.getuser();
        if (myuser) {
            if (this.state.activematerialid) {
                let i = this.getactivematerialkey();
                myuser.company.materials.mymaterial[i].csiid = csiid;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


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
                            Material <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
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