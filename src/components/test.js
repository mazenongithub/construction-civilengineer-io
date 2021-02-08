handledetail(detail) {
    const dynamicstyles = new DynamicStyles();
    let myuser = dynamicstyles.getuser.call(this);
    const makeID = new MakeID();
    if (myuser) {

      const equipment = this.getequipment()
           
                if (equipment) {
                    let i = dynamicstyles.getequipmentkeybyid.call(this, equipment.equipmentid);

                    if (this.state.activecostid) {
                        const mycost = dynamicstyles.getcostbyid.call(this, equipment.equipmentid, this.state.activecostid)
                        if (mycost) {

                            let j = dynamicstyles.getequipmentcostskeybyid.call(this, equipment.equipmentid, this.state.activecostid)
                            myuser.company.equipment.myequipment[i].ownership.cost[j].detail = detail;
                            this.props.reduxUser(myuser)
                            this.setState({ render: 'render' })

                        }

                    } else {

                        let costid = makeID.costid.call(this);
                        const year = this.state.equipmentdateyear;
                        const day = this.state.equipmentdateday;
                        const month = this.state.equipmentdatemonth;
                        const datein = `${year}-${month}-${day}`;
                        let detail = "";
                        let newcost = CreateCostID(costid, cost, detail, datein)
                       

                        if (equipment.ownership.hasOwnProperty("cost")) {
                            myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
                        } else {

                            myuser.company.equipment.myequipment[i].ownership.cost = [newcost]
                        }

                        this.props.reduxUser(myuser)
                        this.setState({ activecostid: costid, render: 'render' })

                    }

                }

    
    }

}
