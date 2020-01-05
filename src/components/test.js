function handlecsi_3(csi_3) {
    this.setState({ csi_3 })

    if (csi_3.length >= 2) {

        csi_3 = csi_3.substr(0, 2);

        let csi = "";
        if (this.props.myusermodel) {
            let myuser = this.props.myusermodel;

            if (this.state.activecsiid) {
                if (csi_3.length >= 2) {
                    csi = this.getactivecsi().csi;
                    let csi_2 = csi.substr(2, 2)
                    let csi_1 = csi.substr(0, 2)
                    csi = `${csi_1}${csi_2}${csi_3}`
                    let i = this.getactivecsikey();
                    myuser.company.construction.csicodes.code[i].csi = csi;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })
                }



            } else {

                console.log(csi_3)


            }

        }

    }

}