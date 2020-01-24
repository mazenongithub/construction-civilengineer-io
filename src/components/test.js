getactualequipmentbyid(equipmentid) {
    const dynamicstyles = new DynamicStyles();
    let myproject = dynamicstyles.getproject.call(this);
    let equipment = false;
    if (myproject) {


        if (myproject.hasOwnProperty("actualequipment")) {
            // eslint-disable-next-line
            myproject.actualequipment.myequipment.map((myequipment, i) => {
                if (myequipment.equipmentid === equipmentid) {
                    equipment = myequipment;
                }
            })
        }

    }
    return equipment;
}