getMonthly() {
    let monthly = "";
    const equipment = this.getequipment();
    if (equipment.hasOwnProperty("rented")) {
        monthly = equipment.rented.monthly;
    }
    return monthly;

}

handleMonthly(value) {
    const construction = new Construction();
    let company = construction.getcompany.call(this)

    if (company) {

        const equipmentid = this.props.match.params.equipmentid;

        const equipment = construction.getmyequipmentbyid.call(this, equipmentid)
        if (equipment) {
            if (equipment.hasOwnProperty("rented")) {
                const i = construction.getequipmentkeybyid.call(this, equipmentid)
                company.equipment[i].rented.monthly = value;
                this.props.reduxCompany(company)
                this.setState({render:'render'})


            }

        }

    }
}