handlechangeunit(unit, csiid) {
  const dynamicstyles = new DynamicStyles();
  let myuser = dynamicstyles.getuser.call(this);


  if (myuser) {
      const myproject = dynamicstyles.getprojectbyid.call(this,this.props.match.params.projectid)
      if(myproject) {
      let i = dynamicstyles.getprojectkeybyid.call(this,this.props.match.params.projectid);
      const myinvoice = dynamicstyles.getinvoicebyid.call(this,this.props.match.params.invoiceid)
      if(myinvoice) {
      let j = dynamicstyles.getinvoicekeybyid.call(this, this.props.match.params.invoiceid)
      const lineitem = dynamicstyles.getinvoiceitem.call(this, csiid)
      if (lineitem) {
          let k = dynamicstyles.getinvoiceitemkey.call(this, csiid)
          myuser.company.projects.myproject[i].invoices.myinvoice[j].bid.biditem[k].unit = unit;
          myuser.company.projects.myproject[i].invoices.myinvoice[j].updated = UTCTimefromCurrentDate()
          this.props.reduxUser(myuser);
          this.setState({ render: 'render' })
      } else {
          let quantity = 1;
          let newItem = CreateBidItem(csiid, unit, quantity)
          myuser.company.projects.myproject[i].invoices.myinvoice[j].bid = { biditem: [newItem] }
          this.props.reduxUser(myuser);
          this.setState({ render: 'render' })
      }

  }

  }
  }

}