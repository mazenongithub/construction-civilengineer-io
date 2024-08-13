import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import Construction from './construction';
import { inputUTCStringForLaborID, calculatetotalhours, formatDateStringDisplay, DirectCostForMaterial, DirectCostForEquipment, DirectCostForLabor } from './functions';


class BidLineItem extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0, activeproposalid: false }
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
    getlaboritems() {
        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mylabor => {
                items.push(this.showlaborid(mylabor))
            })

        }
        return items;
    }
    getlabor() {
        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("laborid")) && (item.csiid === csiid)) {
                laboritems.push(item)
            }
        })


        return laboritems;
    }
    getlabortotal() {
        let items = this.getlabor();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {

                cost += DirectCostForLabor(item) * (1 + (Number(item.profit)/100))
            })
        }
        return cost;
    }
    getmaterialitems() {
        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(mymaterial => {
                items.push(this.showmaterialid(mymaterial))
            })

        }
        return items;

    }
    getmaterial() {
        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let materialitems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("materialid")) && item.csiid === csiid) {
                materialitems.push(item)
            }
        })


        return materialitems;

    }
    getmaterialtotal() {
        let items = this.getmaterial();
        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForMaterial(item) * (1 + (Number(item.profit)/100))
            })
        }
        return cost;
    }
    getequipmentitems() {

        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        let items = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                laboritems.push(item)
            }
        })

        if (laboritems.length > 0) {
            // eslint-disable-next-line
            laboritems.map(myequipment => {
                items.push(this.showequipmentid(myequipment))
            })

        }
        return items;

    }
    getequipment() {

        const construction = new Construction();
        const actual = construction.getAllActual.call(this)
        let csiid = this.props.csiid;
        let laboritems = [];
        // eslint-disable-next-line
        actual.map(item => {
            if ((item.hasOwnProperty("equipmentid")) && item.csiid === csiid) {
                laboritems.push(item)
            }
        })

        return laboritems;

    }
    getequipmenttotal() {
        let items = this.getequipment();

        let cost = 0;
        if (items.length > 0) {
            // eslint-disable-next-line
            items.map(item => {
                cost += DirectCostForEquipment(item) * (1 + (Number(item.profit)/100))
            })
        }
        return (cost)
    }

    handlematerialprofit(mymaterial,profit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
   
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {

            
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getmaterial = construction.getactualmaterialbyid.call(this,mymaterial.materialid)
            if(getmaterial) {
                const j = construction.getactualmaterialkeybyid.call(this,mymaterial.materialid)
                myprojects[i].actual.materials[j].profit = profit
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }
    
    
        }
    
    
    }
    
    }

    handlematerialquantity(mymaterial,quantity) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)

        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getmaterial = construction.getactualmaterialbyid.call(this,mymaterial.materialid)
            if(getmaterial) {
                const j = construction.getactualmaterialkeybyid.call(this,mymaterial.materialid)
                myprojects[i].actual.materials[j].quantity = quantity
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }


        }


    }

    }

    handlematerialunit(mymaterial,unit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)

        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getmaterial = construction.getactualmaterialbyid.call(this,mymaterial.materialid)
            if(getmaterial) {
                const j = construction.getactualmaterialkeybyid.call(this,mymaterial.materialid)
                myprojects[i].actual.materials[j].unit = unit
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }
    
    
        }
    
    
    }
    
    }


    handlematerialunitcost(mymaterial,unitcost) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getmaterial = construction.getactualmaterialbyid.call(this,mymaterial.materialid)
            if(getmaterial) {
                const j = construction.getactualmaterialkeybyid.call(this,mymaterial.materialid)
                myprojects[i].actual.materials[j].unitcost = unitcost
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }
    
    
        }
    
    
    }
    
    }
    
    


    handlelaborprofit(mylabor,profit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
 
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const labor = construction.getactuallaborbyid.call(this,mylabor.laborid)
            if(labor) {
                const j = construction.getactuallaborkeybyid.call(this,mylabor.laborid)
                myprojects[i].actual.labor[j].profit = profit;
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
    
            }
        }
    
    }
    
    }
   


    handlelaborrate(mylabor,laborrate) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
       
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const labor = construction.getactuallaborbyid.call(this,mylabor.laborid)
            if(labor) {
                const j = construction.getactuallaborkeybyid.call(this,mylabor.laborid)
                myprojects[i].actual.labor[j].laborrate = laborrate;
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})

            }
        }

    }

    }

    handleequipmentrate(equipment,equipmentrate) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getequipment = construction.getactualequipmentbyid.call(this,equipment.equipmentid)
            if(getequipment) {
                const j = construction.getactualequipmentkeybyid.call(this,equipment.equipmentid)
                myprojects[i].actual.equipment[j].equipmentrate = equipmentrate;
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }


        }


    }

    }
    
    handleequipmentprofit(equipment,profit) {
        const construction = new Construction();
        const myprojects = construction.getOurProjects.call(this)
     
        if(myprojects) {
        const project = construction.getproject.call(this)
        if(project) {
            const i = construction.getOurProjectKeyById.call(this,this.props.project_id)
            const getequipment = construction.getactualequipmentbyid.call(this,equipment.equipmentid)
            if(getequipment) {
                const j = construction.getactualequipmentkeybyid.call(this,equipment.equipmentid)
                myprojects[i].actual.equipment[j].profit = profit;
                this.props.reduxMyProjects(myprojects)
                this.setState({render:'render'})
            }
    
    
        }
    
    
    }
    
    }
    
    
    getitemtotal() {
        let labortotal = this.getlabortotal();
        let materialtotal = this.getmaterialtotal();
        let equipmenttotal = this.getequipmenttotal();
        let total = labortotal + materialtotal + equipmenttotal;
        return total;
    }
    showlaborid(mylabor) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this)
        let employee = construction.getemployeebyid.call(this, mylabor.providerid)
        const csi = construction.getcsibyid.call(this,mylabor.csiid)
        let hourlyrate = mylabor.laborrate;
        let profit = mylabor.profit;
        const totalhours = calculatetotalhours(mylabor.timeout, mylabor.timein)
        const bidField = construction.getbidfield.call(this)
        const bidprice = (hourlyrate * totalhours)*(1 + (Number(profit)/100)) 

        if(csi) {

        return (<div key={mylabor.laborid} style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }}>

            {employee.firstname} {employee.lastname} {mylabor.description}
            From {inputUTCStringForLaborID(mylabor.timein)} to {inputUTCStringForLaborID(mylabor.timeout)}
            $<input type="text" 
            value={hourlyrate} 
            style={{...styles.alignCenter,...styles.generalFont, ...regularFont, ...bidField}}
            onChange={(event)=>{this.handlelaborrate(mylabor,event.target.value)}} />/Hr 
            x {Number(totalhours).toFixed(2)} Hrs x 
            <span style={{...styles.generalFont, ...regularFont}}>(1 + (</span><input type="text" value={profit} 
            style={{...styles.alignCenter,...styles.generalFont, ...regularFont, ...bidField}}
            onChange={(event)=>{this.handlelaborprofit(mylabor,event.target.value)}} /><span style={{...styles.generalFont, ...regularFont}}>/100)</span>
            
            
             = ${Number(bidprice).toFixed(2)}

        </div>)

        }
    }

    showmaterialid(mymaterial) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const material = construction.getmymaterialfromid.call(this, mymaterial.mymaterialid)
        const bidField = construction.getbidfield.call(this)
        const bidprice = Number(mymaterial.quantity) * Number(mymaterial.unitcost) * (1 + (Number(mymaterial.profit)/100))
        
        
        return (<div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }} key={mymaterial.materialid}>
            {material.material}        {formatDateStringDisplay(mymaterial.timein)}
            <input type="text" 
            onChange={(event)=>{this.handlematerialquantity(mymaterial,event.target.value)}} 
            value={mymaterial.quantity}
            style={{...styles.alignCenter,...regularFont, ...styles.generalFont, ...bidField}} />
              x $<input type="text" 
              onChange={(event)=>{this.handlematerialunitcost(mymaterial,event.target.value)}}
              value={mymaterial.unitcost}
            style={{...styles.alignCenter,...regularFont, ...styles.generalFont, ...bidField}} />
                <span style={{...styles.generalFont,...regularFont}}>/</span>
             <input type="text"
            onChange={(event)=>{this.handlematerialunit(mymaterial,event.target.value)}}  
            value={mymaterial.unit}
            style={{...styles.alignCenter,...regularFont, ...styles.generalFont, ...bidField}} />
               <span style={{...styles.generalFont, ...regularFont}}> x (1 + (</span><input type="text" value={mymaterial.profit} 
            style={{...styles.generalFont, ...regularFont, ...bidField,...styles.alignCenter,}}
            onChange={(event)=>{this.handlematerialprofit(mymaterial,event.target.value)}} /><span style={{...styles.generalFont, ...regularFont}}>/100)</span> = ${Number(bidprice).toFixed(2)}
            
        </div>)
    }


    showequipmentid(equipment) {
        const styles = MyStylesheet();
        const construction = new Construction();
        const regularFont = construction.getRegularFont.call(this);
        const myequipment = construction.getequipmentfromid.call(this, equipment.myequipmentid);
        const totalhours = calculatetotalhours(equipment.timeout, equipment.timein)
        const bidprice = totalhours * Number(equipment.equipmentrate) * (1+(Number(equipment.profit)/100))
        const bidField = construction.getbidfield.call(this)
        return (<div style={{ ...styles.generalContainer}} key={equipment.equipmentid}>
           <span style={{...styles.generalFont,...regularFont}}>{myequipment.equipment} 
            From: {inputUTCStringForLaborID(equipment.timein)} to {inputUTCStringForLaborID(equipment.timeout)} 
            =  {totalhours} hrs x $</span> 
            <input type="text" value={equipment.equipmentrate} 
                style={{...styles.generalFont,...regularFont, ...styles.alignCenter,...bidField}}
                onChange={(event)=> {this.handleequipmentrate(equipment,event.target.value)}}
            />
             
             <span style={{...styles.generalFont, ...regularFont}}>/hr x (1 + (</span><input type="text" value={equipment.profit} 
            style={{...styles.generalFont, ...regularFont, ...bidField,...styles.alignCenter,}}
            onChange={(event)=>{this.handleequipmentprofit(equipment,event.target.value)}} /><span style={{...styles.generalFont, ...regularFont}}>/100)</span> = ${Number(bidprice).toFixed(2)}

        </div>)
    }


    render() {
        const construction = new Construction();
        const styles = MyStylesheet();
        const headerFont = construction.getHeaderFont.call(this)
        const csiid = this.props.csiid;
        const csi = construction.getcsibyid.call(this, csiid)
        const myuser = construction.getuser.call(this)
        const regularFont = construction.getRegularFont.call(this)

        if (myuser) {
            const project = construction.getproject.call(this)
    
            if (project) {
                return (
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        

                                    <a style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont }}
                                       
                                    > /{csi.csi} {csi.title}</a>
                                </div>
                            </div>

                            {construction.showlinedetail.call(this)}

               

                        </div>
                    </div>)

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Bid Line Item </span>
            </div>)
        }

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        mycompany: state.mycompany,
        myprojects: state.myprojects,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        allprojects: state.allprojects,
        websockets: state.websockets,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(BidLineItem);