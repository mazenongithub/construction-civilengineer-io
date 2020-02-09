if (myproject.hasOwnProperty("actuallabor")) {
    // eslint-disable-next-line
    myproject.actuallabor.mylabor.map(mylabor => {
        if (mylabor.csiid === csiid) {
            validate.validate = false;
            validate.message = `CSI ID found actual labor ${mylabor.description}`
        }
    })
}
if (myproject.hasOwnProperty("actualmaterials")) {
    // eslint-disable-next-line
    myproject.actualmaterials.mymaterial.map(mymaterial => {
        if (mymaterial.csiid === csiid) {
            validate.validate = false;
            validate.message = `CSI ID found actual material `
        }
    })
}

if (myproject.hasOwnProperty("actualequipment")) {
    // eslint-disable-next-line
    myproject.actualequipment.myequipment.map(myequipment => {
        if (myequipment.csiid === csiid) {
            validate.validate = false;
            validate.message = `CSI ID found actual equipment `
        }
    })
}