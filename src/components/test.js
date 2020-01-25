getlaborprofitbyid(laborid) {
    let dynamicstyles = new DynamicStyles();
    let myproject = dynamicstyles.getproject.call(this);
    let profit = 0;
    if (myproject) {
        if (myproject.hasOwnProperty("actuallabor")) {
            // eslint-disable-next-line
            myproject.actuallabor.mylabor.map(mylabor => {
                if (mylabor.laborid === laborid) {
                    profit = mylabor.profit;
                }
            })
        }
    }
    return profit;
}