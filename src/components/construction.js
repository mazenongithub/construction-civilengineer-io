import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { removeIconSmall } from './svg';
import { CreateCSI, makeID} from './functions';
import DynamicStyles from './dynamicstyles';
import CSI from './csi'

class Construction extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activecsiid: '', csi_1: '', csi_2: '', csi_3: '', csi_4:'', title: '' }
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
    getactivecsikey() {

        let key = false;
        if (this.props.myusermodel) {

            if (this.state.activecsiid) {
                let csiid = this.state.activecsiid;
                let mycsicodes = this.getmycsicodes();
                // eslint-disable-next-line
                mycsicodes.map((code, i) => {
                    if (code.csiid === csiid) {
                        key = i;
                    }
                })

            }

            return key;
        }
    }
    getactivecsi() {
        let activecsi = false;
        if (this.props.myusermodel) {

            if (this.state.activecsiid) {
                let csiid = this.state.activecsiid;
                let mycsicodes = this.getmycsicodes();
                // eslint-disable-next-line
                mycsicodes.map(code => {
                    if (code.csiid === csiid) {
                        activecsi = code;
                    }
                })

            }
        }
        return activecsi;
    }
    handlecsititle(title) {
        const dynamicstyles = new DynamicStyles();
        let myuser = dynamicstyles.getuser.call(this)
        if (myuser) {
            if (this.state.activecsiid) {



                let i = this.getactivecsikey();

                myuser.company.construction.csicodes.code[i].title = title;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })

            } else {
                this.setState({ title });
                let csiid = makeID(16);
                let csi_1 = (this.state.csi_1).substr(0, 2)
                let csi_2 = (this.state.csi_2).substr(0, 2)
                let csi_3 = (this.state.csi_3).substr(0, 2)
                let csi = `${csi_1}${csi_2}${csi_3}`
                let newcode = CreateCSI(csiid, csi, title);

                if (myuser.company.construction.hasOwnProperty("csicodes")) {
                    myuser.company.construction.csicodes.code.push(newcode)
                } else {
                    let csicodes = { code: [newcode] }
                    myuser.company.construction.csicodes = csicodes;
                }
                this.props.reduxUser(myuser);
                this.setState({ activecsiid: csiid })
            }

        }

    }
    getcsititle() {

        if (this.state.activecsiid) {
            let code = this.getactivecsi();
            return (code.title);

        } else {
            return (this.state.title)
        }
    }

    getmycsicodes() {
        let mycodes = false;
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;
            if (myuser.hasOwnProperty("company")) {
                if (myuser.company.hasOwnProperty("construction")) {
                    if (myuser.company.construction.hasOwnProperty("csicodes")) {
                        mycodes = myuser.company.construction.csicodes.code;
                    }
                }
            }
        }
        return mycodes;
    }
    showmycsicodes() {

        let mycodes = this.getmycsicodes();

        let csi = [];
        if (mycodes) {
            // eslint-disable-next-line
            mycodes.map(code => {
                csi.push(this.showcsiid(code))
            })
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
    getactivebackground(csiid) {
        if (this.state.activecsiid === csiid) {
            return ({ backgroundColor: '#F2C4D2' })
        } else {
            return;
        }

    }
    getcsibyid(csiid) {
        let mycodes = this.getmycsicodes();
        let csi = false;
        if (mycodes) {
            // eslint-disable-next-line
            mycodes.map(code => {
                if (code.csiid === csiid) {
                    csi = code;
                }
            })
        }
        return csi;
    }



    makecsiactive(csiid) {

        const dynamicstyles = new DynamicStyles()
        if (this.state.activecsiid !== csiid) {
            let code = dynamicstyles.getcsibyid.call(this, csiid);
            let csi = code.csi;
            let csi_1 = csi.substr(0, 2)
            let csi_2 = csi.substr(2, 2)
            let csi_3 = csi.substr(4, 2)

            this.setState({ activecsiid: csiid, csi_1, csi_2, csi_3 })

        } else {
            this.setState({ activecsiid: '', csi_1: '', csi_2: '', csi_3: '', title: '' })
        }


    }
    showcsiid(code) {
        const styles = MyStylesheet();
        const regularFont = this.getRegularFont();
        const removeIcon = this.getremoveicon()
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...this.getactivebackground(code.csiid) }} key={code.csiid}>
            <span onClick={() => { this.makecsiactive(code.csiid) }}>{code.csi}  - {code.title}</span> <button style={{ ...styles.generalButton, ...removeIcon }}>{removeIconSmall()} </button>
        </div>)
    }
    getcsiid() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        if (this.state.activecsiid) {
            let csiid = this.state.activecsiid;
            let csi = dynamicstyles.getcsibyid.call(this, csiid)
            return (<div style={{ ...styles.generalContainer, ...styles.activecsi, ...styles.showBorder }}>{csi.csi} {csi.title}</div>)
        } else {
            return;
        }


    }
    handlecsiid(csiid) {
        this.makecsiactive(csiid)

    }
    validatenewcsi() {
        const csi_1 = this.state.csi_1;
        const csi_2 = this.state.csi_2;
        const csi_3 = this.state.csi_3;
        const title = this.state.title;
        let validate = false;
        if (csi_1 && csi_2 && csi_3 && title) {
            validate = true;
        }
        return validate;

    }
    handlecsi_1(csi_1) {
        if (csi_1.length === 0) {
            csi_1 = '00';
        }
        this.setState({ csi_1 })
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            if (this.state.activecsiid) {
                let mycsi = this.getactivecsi();
                let csi = mycsi.csi;
                csi = `${csi_1.substr(0, 2)}${csi.substr(2, 2)}${csi.substr(4, 2)}`
                let i = this.getactivecsikey();
                myuser.company.construction.csicodes.code[i].csi = csi;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {
                const validate = this.validatenewcsi();
                if (validate) {
                    const csi_2 = this.state.csi_2.substring(0, 2)
                    const csi_3 = this.state.csi_3.substring(0, 2)
                    csi_1 = csi_1.substring(0, 2);
                    const csiid = makeID(16);
                    const csi = `${csi_1}${csi_2}${csi_3}`;
                    const title = this.state.title;
                    const newcsi = CreateCSI(csiid, csi, title);
                    const mycsis = dynamicstyles.getmycsicodes.call(this)
                    if (mycsis) {
                        myuser.company.construction.csicodes.code.push(newcsi);

                    } else {
                        const csicodes = { code: [newcsi] }
                        myuser.company.construction.csicodes = csicodes;


                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activecsiid: csiid })

                }
            }

        }
    }
    handlecsi_2(csi_2) {
        this.setState({ csi_2 })
        if (csi_2.length === 0) {
            csi_2 = '00';
        }
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            if (this.state.activecsiid) {
                let mycsi = this.getactivecsi();
                let csi = mycsi.csi;
                csi = `${csi.substr(0, 2)}${csi_2.substr(0, 2)}${csi.substr(4, 2)}`
                let i = this.getactivecsikey();
                myuser.company.construction.csicodes.code[i].csi = csi;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {

                const validate = this.validatenewcsi();
                if (validate) {
                    const csi_1 = this.state.csi_1.substring(0, 2)
                    const csi_3 = this.state.csi_3.substring(0, 2)
                    csi_2 = csi_2.substring(0, 2);
                    const csiid = makeID(16);
                    const csi = `${csi_1}${csi_2}${csi_3}`;
                    const title = this.state.title;
                    const newcsi = CreateCSI(csiid, csi, title);
                    const mycsis = dynamicstyles.getmycsicodes.call(this)
                    if (mycsis) {
                        myuser.company.construction.csicodes.code.push(newcsi);

                    } else {
                        const csicodes = { code: [newcsi] }
                        myuser.company.construction.csicodes = csicodes;


                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activecsiid: csiid })

                }
            }

        }
    }
    handlecsi_3(csi_3) {
        if (csi_3.length === 0) {
            csi_3 = '00';
        }
        this.setState({ csi_3 })
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this);

        if (myuser) {

            if (this.state.activecsiid) {
                let mycsi = this.getactivecsi();
                let csi = mycsi.csi;
                csi = `${csi.substr(0, 2)}${csi.substr(2, 2)}${csi_3.substr(0, 2)}`
                let i = this.getactivecsikey();
                myuser.company.construction.csicodes.code[i].csi = csi;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })


            } else {

                const validate = this.validatenewcsi();
                if (validate) {
                    const csi_1 = this.state.csi_1.substring(0, 2)
                    const csi_2 = this.state.csi_2.substring(0, 2)
                    csi_3 = csi_3.substring(0, 2);
                    const csiid = makeID(16);
                    const csi = `${csi_1}${csi_2}${csi_3}`;
                    const title = this.state.title;
                    const newcsi = CreateCSI(csiid, csi, title);
                    const mycsis = dynamicstyles.getmycsicodes.call(this)
                    if (mycsis) {
                        myuser.company.construction.csicodes.code.push(newcsi);

                    } else {
                        const csicodes = { code: [newcsi] }
                        myuser.company.construction.csicodes = csicodes;


                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activecsiid: csiid })

                }
            }

        }
    }
    getcsi_1() {
        if (this.state.activecsiid) {
            const mycsi = this.getactivecsi();
            return (mycsi.csi.substr(0, 2))


        } else {
            return (this.state.csi_1.substr(0, 2))
        }
    }
    getcsi_2() {
        if (this.state.activecsiid) {
            const mycsi = this.getactivecsi();
            return (mycsi.csi.substr(2, 2))


        } else {
            return (this.state.csi_2.substr(0, 2))
        }
    }
    getcsi_3() {
        if (this.state.activecsiid) {
            const mycsi = this.getactivecsi();
            return (mycsi.csi.substr(4, 2))
        } else {
            return (this.state.csi_3.substr(0, 2))
        }
    }
    validateremovecsi(csiid) {
        const dynamicstyles = new DynamicStyles();
        const myprojects = dynamicstyles.getmyprojects.call(this);
        let validate = {};
        validate.validate = true;
        validate.message = '';
        if (myprojects.hasOwnProperty("length")) {
            // eslint-disable-next-line
            myprojects.map(myproject => {
                if (myproject.hasOwnProperty("schedulelabor")) {
                    // eslint-disable-next-line
                    myproject.schedulelabor.mylabor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found schedule labor `
                        }
                    })
                }
                if (myproject.hasOwnProperty("schedulematerials")) {
                    // eslint-disable-next-line
                    myproject.schedulematerials.mymaterial.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found schedule material `
                        }
                    })
                }

                if (myproject.hasOwnProperty("scheduleequipment")) {
                    // eslint-disable-next-line
                    myproject.scheduleequipment.myequipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found schedule equipment `
                        }
                    })
                }

                if (myproject.hasOwnProperty("actuallabor")) {
                    // eslint-disable-next-line
                    myproject.actuallabor.mylabor.map(mylabor => {
                        if (mylabor.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found actual labor `
                        }
                    })
                }
                if (myproject.hasOwnProperty("actualmaterials")) {
                    // eslint-disable-next-line
                    myproject.actualmaterials.mymaterial.map(mymaterial => {
                        if (mymaterial.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found actual material `
                        }
                    })
                }

                if (myproject.hasOwnProperty("actualequipment")) {
                    // eslint-disable-next-line
                    myproject.actualequipment.myequipment.map(myequipment => {
                        if (myequipment.csiid === csiid) {
                            validate.validate = false;
                            validate.message += `CSI ID found actual equipment `
                        }
                    })
                }

            })
        }
        return validate;
    }
    removecsi(csi) {
        if (window.confirm(`Are you sure you want to delete CSI ${csi.csi} ${csi.title}?`)) {
            const dynamicstyles = new DynamicStyles();
            const myuser = dynamicstyles.getuser.call(this);
            if (myuser) {

                const validatecsi = this.validateremovecsi(csi.csiid)
                if (validatecsi.validate) {
                    const i = this.getactivecsikey();
                    myuser.company.construction.csicodes.code.splice(i, 1);
                    if (myuser.company.construction.csicodes.code.length === 0) {
                        delete myuser.company.construction.csicodes.code;
                        delete myuser.company.construction.csicodes
                    }
                    this.props.reduxUser(myuser);
                    this.setState({ activecsiid: false })





                } else {
                    this.setState({ message: validatecsi.message })
                }

            }
        }

    }
    createcsi() {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const myuser =dynamicstyles.getuser.call(this)
        if(myuser) {
        return (<div style={{ ...styles.generalContainer }}>
            <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                Create A Construction Specification (xx xx xx)
                    </div>

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                        value={this.getcsi_1()}
                        onChange={event => { this.handlecsi_1(event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                        value={this.getcsi_2()}
                        onChange={event => { this.handlecsi_2(event.target.value) }}
                    />
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>
                    <input style={{ ...styles.generalField, ...regularFont, ...styles.generalFont, ...styles.csiField, ...styles.addMargin }}
                        value={this.getcsi_3()}
                        onChange={event => { this.handlecsi_3(event.target.value) }} />
                </div>
            </div>


            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont }}>
                Title  <input type="text"
                    value={this.getcsititle()}
                    onChange={event => { this.handlecsititle(event.target.value) }}
                    style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.addLeftMargin15 }} />
            </div>
        </div>)

        } else {
            return(<div style={{...styles.generalContainer,...regularFont}}>
                <span style={{...styles.generalFont,...regularFont}}>Please Login to View Construction </span>
            </div>)
        }
    }
    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const titleFont = dynamicstyles.gettitlefont.call(this);
        const csi = new CSI();

        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter, ...titleFont, ...styles.fontBold }}>
                            /{this.props.match.params.companyid}/construction
                        </div>
                    </div>


                    {csi.showCSI.call(this)}





                    {dynamicstyles.showsavecompany.call(this)}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        csis:state.csis
    }
}

export default connect(mapStateToProps, actions)(Construction);