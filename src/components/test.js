gettotalhours() {
    let totalhours = "";
    if (this.state.activeequipmentid) {
        let myequipment = this.getactiveequipment();
        if (myequipment) {
            let timein = myequipment.timein;
            let timeout = myequipment.timeout;
            totalhours = calculatetotalhours(timeout, timein)
        }


    }
    return totalhours;
}
getequipmentrate() {
    let equipmentrate = 0;
    if (this.state.activeequipmentid) {
        let myequipment = this.getactiveequipment();
        equipmentrate = myequipment.equipmentrate;
    }
    return equipmentrate;
}
handleequipmentrate(equipmentrate) {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    if (myuser) {
        if (this.state.activeequipmentid) {
            let i = dynamicstyles.getprojectkey.call(this);
            let j = this.getactiveequipmentkey();
            myuser.company.projects.myproject[i].actualequipment.myequipment[j].equipmentrate = equipmentrate;
            this.props.reduxUser(myuser);
            this.setState({ render: 'render' })
        }
    }

}
getamount() {
    let amount = 0;
    if (this.state.activeequipmentid) {
        let myequipment = this.getactiveequipment();
        let totalhours = calculatetotalhours(myequipment.timeout, myequipment.timein);
        let rate = Number(myequipment.equipmentrate);
        amount = totalhours * rate;
    }
    return amount;
}