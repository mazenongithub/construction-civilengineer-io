materialid() {
    const dynamicstyles = new DynamicStyles();
    const mymaterial = dynamicstyles.getmymaterials.call(this)
    let materialid = false;
    if (mymaterial) {
        while (materialid === false) {
            materialid = makeID(16)
            // eslint-disable-next-line
            mymaterial.map(material => {
                if (material.materialid === materialid) {
                    materialid = false;
                }
            })

        }

    }
    return materialid;

}