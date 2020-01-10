function handlemilestoneid(milestoneid) {
    let myuser = this.getuser();
    if (myuser) {
        let myproject = this.getproject();
        if (myproject) {
            let i = this.getprojectkey();

            if (this.state.activeequipmentid) {
                let j = this.getactiveequipmentkey();
                myuser.company.projects.myproject[i].scheduleequipment.myequipment[j].milestoneid = milestoneid;
                this.props.reduxUser(myuser)
                this.setState({ render: 'render' })
            } else {
                let equipmentid = makeID(16)
                let providerid = myuser.provderid;
                let myequipmentid = this.state.myequipmentid;
                let csiid = this.state.csiid;
                let timein = this.state.timein;
                let timeout = this.state.timeout;
                let proposalid = this.state.proposalid;

                let newEquipment = CreateScheduleEquipment(equipmentid, myequipmentid, providerid, csiid, milestoneid, timein, timeout, proposalid)
                if (myproject.hasOwnProperty("scheduleequipment")) {
                    myuser.company.projects.myproject[i].scheduleequipment.myequipment.push(newEquipment)
                } else {
                    let scheduleequipment = { myequipment: [newEquipment] }
                    myuser.company.projects.myproject[i].scheduleequipment = scheduleequipment;

                }
                this.props.reduxUser(myuser)
                this.setState({ activeequipmentid: newEquipment.equipmentid })
            }

        }

    }
}