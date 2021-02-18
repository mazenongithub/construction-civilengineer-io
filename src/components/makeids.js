import { makeID } from './functions';
import DynamicStyles from './dynamicstyles';
class MakeID {
    benefitid() {
        const dynamicstyles = new DynamicStyles();
        const employees = dynamicstyles.getmyemployees.call(this);
        let benefitid = false;
        if (employees) {
            // eslint-disable-next-line
            employees.map(employee => {
                if (employee.hasOwnProperty("benefits")) {
                    while (benefitid === false) {
                        benefitid = makeID(16);
                        // eslint-disable-next-line
                        employee.benefits.map(benefit => {
                            if (benefit.benefitid === benefitid) {
                                benefitid = false;
                            }
                        })
                    }

                } else {
                    benefitid = makeID(16)
                }
            })

        } else {
            benefitid = makeID(16)
        }
        return benefitid;
    }
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

        } else {
            materialid = makeID(16);
        }
        return materialid;

    }
    costid() {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getmyequipment.call(this);
        let costid = false;
        while (!costid) {
            costid = makeID(16)
            if (myequipment) {
                // eslint-disable-next-line
                myequipment.map(equipment => {
                    if (equipment.hasOwnProperty("ownership")) {
                        if (equipment.ownership.hasOwnProperty("cost")) {
                            // eslint-disable-next-line
                            equipment.ownership.cost.map(cost => {
                                if (cost.costid === costid) {
                                    costid = false;
                                }
                            })
                        }
                    }
                })
            } else {
                costid = makeID(16)
            }
        }
        return costid;
    }
    equipmentid() {
        const dynamicstyles = new DynamicStyles();
        const myequipment = dynamicstyles.getmyequipment.call(this)
        let equipmentid = false;
        if (myequipment) {
            while (equipmentid === false) {
                equipmentid = makeID(16)
                // eslint-disable-next-line
                myequipment.map(equipment => {
                    if (equipment.equipmentid === equipmentid) {
                        equipmentid = false;
                    }
                })

            }

        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;

    }
    invoiceid() {
        const dynamicstyles = new DynamicStyles();
        const invoices = dynamicstyles.getinvoices.call(this);
        let invoiceid = false;
        if (invoices) {
            while (!invoiceid) {
                invoiceid = makeID(4);

                if (invoices) {
                    // eslint-disable-next-line
                    invoices.map(myinvoice => {
                        if (myinvoice.invoiceid === invoiceid) {
                            invoiceid = false;
                        }
                    })
                }
            }
        } else {
            invoiceid = makeID(4);
        }
        return invoiceid;
    }

    proposalid() {
        const dynamicstyles = new DynamicStyles();
        const proposals = dynamicstyles.getproposals.call(this);

        let proposalid = false;
        if (proposals) {
            while (!proposalid) {
                proposalid = makeID(4);

                if (proposals) {
                    // eslint-disable-next-line
                    proposals.map(myproposal => {
                        if (myproposal.proposalid === proposalid) {
                            proposalid = false;
                        }
                    })
                }
            }
        } else {
            proposalid = makeID(4);
        }
        return proposalid;
    }
    actualmaterialid() {
        const dynamicstyles = new DynamicStyles();
        const actualmaterials = dynamicstyles.getactualmaterials.call(this);
        let materialid = false;
        if (actualmaterials) {
            while (!materialid) {
                materialid = makeID(16);

                if (actualmaterials) {
                    // eslint-disable-next-line
                    actualmaterials.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            materialid = false;
                        }
                    })
                }
            }
        } else {
            materialid = makeID(16)
        }
        return materialid;
    }

    schedulematerialid() {
        const dynamicstyles = new DynamicStyles();
        const schedulematerials = dynamicstyles.getschedulematerials.call(this);

        let materialid = false;
        if (schedulematerials) {
            while (!materialid) {
                materialid = makeID(16);

                if (schedulematerials) {
                    // eslint-disable-next-line
                    schedulematerials.map(mymaterial => {
                        if (mymaterial.materialid === materialid) {
                            materialid = false;
                        }
                    })
                }
            }
        } else {
            materialid = makeID(16);
        }
        return materialid;
    }

    actuallaborid() {
        const dynamicstyles = new DynamicStyles();
        const actuallabor = dynamicstyles.getactuallabor.call(this);

        let laborid = false;
        if (actuallabor) {
            while (!laborid) {
                laborid = makeID(16);

                if (actuallabor) {
                    // eslint-disable-next-line
                    actuallabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            laborid = false;
                        }
                    })
                }
            }
        } else {
            laborid = makeID(16)
        }
        return laborid;
    }
    schedulelaborid() {
        const dynamicstyles = new DynamicStyles();
        const schedulelabor = dynamicstyles.getschedulelabor.call(this);

        let laborid = false;
        if (schedulelabor) {
            while (!laborid) {
                laborid = makeID(16);

                if (schedulelabor) {
                    // eslint-disable-next-line
                    schedulelabor.map(mylabor => {
                        if (mylabor.laborid === laborid) {
                            laborid = false;
                        }
                    })
                }
            }
        } else {
            laborid = makeID(16);
        }
        return laborid;
    }


    scheduleequipmentid() {
        const dynamicstyles = new DynamicStyles();
        const scheduleequipment = dynamicstyles.getscheduleequipment.call(this);

        let equipmentid = false;
        if (scheduleequipment) {
            while (!equipmentid) {
                equipmentid = makeID(16);

                if (scheduleequipment) {
                    // eslint-disable-next-line
                    scheduleequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipmentid = false;
                        }
                    })
                }
            }
        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;
    }

    actualequipmentid() {
        const dynamicstyles = new DynamicStyles();
        const actualequipment = dynamicstyles.getactualequipment.call(this);

        let equipmentid = false;
        if (actualequipment) {
            while (!equipmentid) {
                equipmentid = makeID(16);

                if (actualequipment) {
                    // eslint-disable-next-line
                    actualequipment.map(myequipment => {
                        if (myequipment.equipmentid === equipmentid) {
                            equipmentid = false;
                        }
                    })
                }
            }
        } else {
            equipmentid = makeID(16);
        }
        return equipmentid;
    }

    accountid() {
        const dynamicstyles = new DynamicStyles();
        const accounts = dynamicstyles.getmyaccounts.call(this)
        let accountid = false;
        if (accounts) {
            while (!accountid) {
                accountid = makeID(16);
                if (accounts) {
                    // eslint-disable-next-line
                    accounts.map(account => {
                        if (account.accountid === accountid) {
                            accountid = false;
                        }
                    })
                }

            }
        } else {
            accountid = makeID(16);
        }
        return accountid;

    }

}
export default MakeID;