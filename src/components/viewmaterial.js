import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { Link } from 'react-router-dom';
import AccountID from './accountid';


class ViewMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, activematerialid: '', message: '',spinner:false }
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

   
    getunit() {
      
            let mymaterial = this.getMaterial();
            if (mymaterial) {
                return mymaterial.unit;
            }
        
    }

    getunitcost() {
      
            let mymaterial = this.getMaterial();
            if (mymaterial) {
                return mymaterial.unitcost;
            
        } else {
            return this.state.unitcost;
        }
    }

    getaccountid() {
       
            let mymaterial = this.getMaterial();

            if (mymaterial) {

                return mymaterial.accountid;
            }
        
    }

  

    handleunitcost(unitcost) {
        const construction = new Construction();
       
        const myuser = construction.getuser.call(this)
    
        if (myuser) {
         
            
                const mymaterial = this.getMaterial()
                if(mymaterial) {
                let i = construction.getmaterialkeybyid.call(this,mymaterial.materialid)
                myuser.company.materials[i].unitcost = unitcost;
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
    
                }
            
            

        }
    }

    handleunit(unit) {
        const construction = new Construction();
    
        const myuser = construction.getuser.call(this)

        if (myuser) {
       
              
                    const mymaterial = this.getMaterial()
                    if (mymaterial) {
                        let i = construction.getmaterialkeybyid.call(this, mymaterial.materialid)
                        myuser.company.materials[i].unit = unit;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })

                    }

                

           
        }
    }

    handleaccountid(accountid) {
        const construction = new Construction();
        const myuser = construction.getuser.call(this)

        if (myuser) {
          
            
                    const mymaterial = this.getMaterial()
                    if (mymaterial) {
                        const i = construction.getmaterialkeybyid.call(this, mymaterial.materialid)
                        myuser.company.materials[i].accountid = accountid;
                        this.props.reduxUser(myuser);
                        this.setState({ render: 'render' })
                    }

                

            
        }
    }


    getMaterial() {
        const construction = new Construction();
        const material = construction.getmymaterialfromid.call(this,this.props.match.params.materialid)
        return material;
    }

    render() {
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const myuser =construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const accountid  = new AccountID()
        if(myuser) {

            const material = this.getMaterial();
            if(material) {
        return (<div style={{ ...styles.generalContainer }}>

        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.profile}/company/${myuser.company.companyid}/materials`}
                            > /materials</Link>
                        </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>

                <Link to={`/${myuser.profile}/company/${myuser.company.url}/materials/${material.materialid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{material.material}</Link>
            </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
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

                        {accountid.showaccountmenu.call(this)}

                        {construction.showsavecompany.call(this)}



        </div>)

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Material Not Found </span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Materials </span>
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
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(ViewMaterial);