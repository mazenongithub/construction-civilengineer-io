import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { span } from 'react-router-dom';
import AccountID from './accountid';


class ViewMaterial {
 
   

   
    getunit() {
        const viewmaterial = new ViewMaterial();
            let mymaterial = viewmaterial.getMaterial.call(this);
            if (mymaterial) {
                return mymaterial.unit;
            }
        
    }

    getunitcost() {
            const viewmaterial = new ViewMaterial();
            let mymaterial = viewmaterial.getMaterial.call(this);
            if (mymaterial) {
                return mymaterial.unitcost;
            
        } else {
            return viewmaterial.state.unitcost;
        }
    }

    getaccountid() {
        const viewmaterial = new ViewMaterial();
            let mymaterial = viewmaterial.getMaterial.call(this);

            if (mymaterial) {

                return mymaterial.accountid;
            }
        
    }

  

    handleunitcost(unitcost) {
        const construction = new Construction();
        const viewmaterial = new ViewMaterial();
        const company = construction.getcompany.call(this)
    
        if (company) {
         
            
                const mymaterial = viewmaterial.getMaterial.call(this)
                if(mymaterial) {
                let i = construction.getmaterialkeybyid.call(this,mymaterial.materialid)
                company.materials[i].unitcost = unitcost;
                this.props.reduxCompany(company);
                this.setState({ render: 'render' })
    
                }
            
            

        }
    }

    handleunit(unit) {
        const construction = new Construction();
        const viewmaterial = new ViewMaterial();
        const company = construction.getcompany.call(this)

        if (company) {
       
              
                    const mymaterial = viewmaterial.getMaterial.call(this)
                    if (mymaterial) {
                        let i = construction.getmaterialkeybyid.call(this, mymaterial.materialid)
                        company.materials[i].unit = unit;
                        this.props.reduxCompany(company);
                        this.setState({ render: 'render' })

                    }

                

           
        }
    }

    handleaccountid(accountid) {
        const construction = new Construction();
        const company = construction.getcompany.call(this)
        const viewmaterial = new ViewMaterial();
        if (company) {
          
            
                    const mymaterial = viewmaterial.getMaterial.call(this)
                    if (mymaterial) {
                        const i = construction.getmaterialkeybyid.call(this, mymaterial.materialid)
                        company.materials[i].accountid = accountid;
                        this.props.reduxCompany(company);
                        this.setState({ render: 'render' })
                    }

                

            
        }
    }


    getMaterial() {
        const construction = new Construction();
        const material = construction.getmymaterialfromid.call(this,this.state.activematerialid)
        return material;
    }

    showaccountmenu() {
        const construction = new Construction();
        const viewmaterial = new ViewMaterial();
        const styles = MyStylesheet();
        const regularFont = construction.getRegularFont.call(this);

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>
                Account  <select style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin }}
                    value={viewmaterial.getaccountid.call(this)}
                    onChange={event => { viewmaterial.handleaccountid.call(this,event.target.value) }}>
                    {construction.loadaccounts.call(this)}
                </select>
            </div>)


    }

    showViewMaterial() {
        const construction = new Construction();
        const headerFont = construction.getHeaderFont.call(this)
        const styles = MyStylesheet();
        const myuser =construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)
        const accountid  = new AccountID()
        const viewmaterial = new ViewMaterial();

        if(myuser) {

            const company = construction.getcompany.call(this)

            if(company) {

            const material = viewmaterial.getMaterial.call(this);
            if(material) {
        return (<div style={{ ...styles.generalContainer }}>

        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                to={`/${myuser.UserID}/company/${company.companyid}/materials`}
                            > /materials</span>
                        </div>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>

                <span to={`/${myuser.UserID}/company/${company.companyid}/materials/${material.materialid}`} style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>/{material.material}</span>
            </div>



                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                Unit <br /><input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    onChange={event => { viewmaterial.handleunit.call(this,event.target.value) }}
                                    value={viewmaterial.getunit.call(this)} />
                            </div>

                            <div style={{ ...styles.flex1, ...styles.alignCenter, ...regularFont, ...styles.addMargin }}>
                                Unit Cost <br /><input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                    onChange={event => { viewmaterial.handleunitcost.call(this,event.target.value) }}
                                    value={viewmaterial.getunitcost.call(this)}
                                />
                            </div>
                        </div>

                        {viewmaterial.showaccountmenu.call(this)}

                



        </div>)

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Material Not Found </span>
                </div>)

            }

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


export default (ViewMaterial);