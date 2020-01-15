handlechangeunit(unit, csiid) {
    const dynamicstyles = new DynamicStyles();
    let myuser = dynamicstyles.getuser.call(this);
    if (myuser) {
        let i = dynamicstyles.getprojectkey.call(this);
        let k = this.getproposalitemkey(csiid);
        let j = this.getproposalkey();
        myuser.company.projects.myproject[i].proposals.myproposal[j].bidschedule.biditem[k].unit = unit;
        this.props.reduxUser(myuser);
        this.setState({ render: 'render' })
    }

}