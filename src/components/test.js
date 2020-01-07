function getdetail() {

    let detail = this.getactiveequipmentcost();
    console.log()
    if (detail) {
        return (cost.detail)
    } else {
        return (this.state.detail)
    }

}
function handledetail(detail) {
    let myuser = this.getuser();
    if (myuser) {

        let i = this.getactiveequipmentkey();

        if (this.state.activecostid) {
            let activecost = this.getactiveequipmentcost();
            activecost.detail = detail;

            let j = this.getactiveequipmentcostkey();
            myuser.company.equipment.myequipment[i].ownership.cost[j].detail = detail;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })


        } else {
            this.setState({ detail });
            let costid = makeID(16);
            let datein = this.state.datein;
            let cost = 0;
            let newcost = CreateCostID(costid, cost, detail, datein)
            let equipment = this.getactiveequipment();
            if (equipment.hasOwnProperty("ownership")) {
                myuser.company.equipment.myequipment[i].ownership.cost.push(newcost)
            } else {
                let ownership = { cost: [newcost] }
                myuser.company.equipment.myequipment[i].ownership = ownership;
            }
            this.props.reduxUser(myuser)
            this.setState({ activecostid: costid, render: 'render' })

        }


    }

}