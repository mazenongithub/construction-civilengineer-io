function handleunitcost(unitcost) {
    let myuser = this.getuser();
    if (myuser) {
        let myproject = this.getproject();
        if (myproject) {
            let i = this.getprojectkey();
            if (this.state.activematerialid) {
                let j = this.getactivematerialkey();
                myuser.company.projects.myproject[i].schedulematerials.mymaterial[j].unitcost = unitcost
                this.props.reduxUser(myuser);
                this.setState({ render: 'render' })
            } else {
                let materialid = makeID(16);
                let providerid = this.state.employeeid;
                let csiid = this.state.csiid
                let mymaterialid = this.state.mymaterialid;
                let timein = this.state.timein;
                let milestoneid = this.state.milestoneid;
                let quantity = this.state.quantity;
                let unit = this.state.unit;
                let proposalid = "";
                let newMaterial = CreateMyMaterial(materialid, mymaterialid, providerid, milestoneid, csiid, timein, quantity, unit, unitcost, proposalid);
                if (myproject.hasOwnProperty("schedulematerials")) {
                    myuser.company.projects.myproject[i].schedulematerials.mymaterial.push(newMaterial)
                } else {
                    let schedulematerials = { mymaterial: [newMaterial] }
                    myuser.company.projects.myproject[i].schedulematerials = schedulematerials;
                }
                this.props.reduxUser(myuser);
                this.setState({ activematerialid: newMaterial.materialid })

            }
        }
    }
}