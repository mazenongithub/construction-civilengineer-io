function handlelaborrate(laborrate) {
    let myuser = this.getuser();
    if (myuser) {
        let i = this.getprojectkey();
        if (this.state.activelaborid) {
            let j = this.getactivelaborkey();
            myuser.company.projects.myproject[i].schedulelabor.mylabor[j].laborrate = laborrate;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })


        } else {
            let laborid = makeID(16);
            let csiid = this.state.csiid;
            let description = this.state.description;
            let timein = this.state.timein;
            let timeout = this.state.timeout;
            let milestoneid = this.state.milestoneid;
            let providerid = this.state.employeeid;
            let newlabor = CreateScheduleLabor(laborid, providerid, csiid, milestoneid, timein, timeout, laborrate, description)
            this.createnewlabor(newlabor, myuser, i)
        }

    }
}