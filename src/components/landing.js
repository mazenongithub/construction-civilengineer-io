import React from 'react';
import { MyStylesheet } from './styles'
import Construction from './construction'

class Landing  {
    getslidebyid(id) {
        const landing = new Landing()
        const slides = landing.getslides.call(this)
        let myslide = false;
        if (slides) {
            // eslint-disable-next-line
            slides.map(slide => {
                if (slide.id === id) {
                    myslide = slide;
                }
            })
        }
        return myslide;
    }
    getmainslide() {
        const construction = new Construction();
        const navigation = construction.getNavigation.call(this)
        if (navigation) {
            if (navigation.position === 'closed') {
                if (this.state.width > 1200) {
                    return ({ width: '1087px', height: 'auto' })
                } else if (this.state.width > 800) {
                    return ({ width: '762px', height: 'auto' })
                } else {
                    return ({ width: '356px', height: 'auto' })
                }

            } else if (navigation.position === 'open') {
                if (this.state.width > 1200) {
                    return ({ width: '800px', height: 'auto' })
                } else if (this.state.width > 800) {
                    return ({ width: '600px', height: 'auto' })
                } else {
                    return ({ width: '300px', height: 'auto' })
                }

            }

        }
    }
    getslides() {
        const slides = () => {
            return ([


                {
                    title: 'Employees',
                    id: 'employees',
                    url: 'http://civilengineer.io/construction/slides/employees.png',
                    caption: `Keeps track of the Employees that are part of your company    `
                },
                {
                    title: 'View Employee',
                    id: 'viewemployee',
                    url: 'http://civilengineer.io/construction/slides/viewemployee.png',
                    caption: `Adds benefits to the Employee to determine their labor rate. Adds accounts to benefits. Shows the percent distribution for the labor rate for each account.   `
                },
                {
                    title: 'Accounts',
                    id: 'accounts',
                    url: 'http://civilengineer.io/construction/slides/accounts.png',
                    caption: `Create accounts for your employee benefits, equipment, and materials  `

                },
                {
                    title: 'View Account',
                    id: 'viewaccount',
                    url: 'http://civilengineer.io/construction/slides/viewaccount.png',
                    caption: `Shows the balance per account  `
                },

                {
                    title: 'Equipment',
                    id: 'equipment',
                    url: 'http://civilengineer.io/construction/slides/equipment.png',
                    caption: `Add your company equipment `
                },
                {
                    title: 'View Equipment',
                    id: 'viewequipment',
                    url: 'http://civilengineer.io/construction/slides/viewequipment.png',
                    caption: `Enter equipment ownership costs. Special cost formula determines the equipment rate. `
                },

                {
                    title: 'Materials',
                    id: 'materials',
                    url: 'http://civilengineer.io/construction/slides/materials.png',
                    caption: `Add your material list for your company. `
                },
                {
                    title: 'View Material',
                    id: 'viewmaterial',
                    url: 'http://civilengineer.io/construction/slides/viewmaterial.png',
                    caption: `Update the unit and unit price for each material. Update the account id for each material `
                },



                {
                    title: 'Project',
                    id: 'project',
                    url: 'http://civilengineer.io/construction/slides/project.png',
                    caption: `Shows the location and the scope of work. Has links to the other project components. `

                },


                {
                    title: 'Schedule',
                    id: 'Schedule',
                    url: 'http://civilengineer.io/construction/slides/schedule.png',
                    caption: `Enter and View project schedule. Assigns schedule to employees, determines cost. `
                },

                {
                    title: 'Actual',
                    id: 'actual',
                    url: 'http://civilengineer.io/construction/slides/actual.png',
                    caption: `Enter your actual costs for the project.    `
                },
                {
                    title: 'Proposal',
                    id: 'proposals',
                    url: 'http://civilengineer.io/construction/slides/proposals.png',
                    caption: `TAdd your schedule items to the proposal. Items can be adjusted. Add your profit for each item.    `
                },
                {
                    title: 'View Proposal',
                    id: 'viewinvoice',
                    url: 'http://civilengineer.io/construction/slides/viewproposal.png',
                    caption: `View Proposal contains an itemized breakdown for each item in your work schedule  `
                },

                {
                    title: 'Invoices',
                    id: 'invoices',
                    url: 'http://civilengineer.io/construction/slides/invoices.png',
                    caption: `Add your actual work items to the invoice. Adjust your actual costs add your profit factor for each item   `
                },


                {
                    title: 'View Invoice',
                    id: 'viewinvoice',
                    url: 'http://civilengineer.io/construction/slides/viewinvoice.png',
                    caption: `Itemized breakdown for the actual items. Add your unit and quantities to produce the unit price.   `
                },


                {
                    title: 'Proposal Line Item',
                    id: 'proposallineitem',
                    url: 'http://civilengineer.io/construction/slides/proposallineitem.png',
                    caption: `Labor, Equipment, and Materials breakdown for each line item in the proposal   `
                },
                {
                    title: 'Invoice Line Item',
                    id: 'invoicelineitem',
                    url: 'http://civilengineer.io/construction/slides/invoicelineitem.png',
                    caption: `Labor, Equipment, and Materials breakdown for each line item in the proposal.   `
                }





            ])
        }
        return slides();
    }
    showslide(slide) {
        
        const construction = new Construction();
        const styles = MyStylesheet();
        const smallslide = () => {
          
                const construction = new Construction();
                const navigation = construction.getNavigation.call(this)
                if (navigation.position === 'closed') {
                    if (this.state.width > 1200) {
                        return ({ width: '362px', height: 'auto' })
                    } else if (this.state.width > 800) {
                        return ({ width: '254px', height: 'auto' })
                    } else {
                        return ({ width: '178px', height: 'auto' })
                    }
                } else if (navigation.position === 'open') {
        
                    if (this.state.width > 1200) {
                        return ({ width: '240px', height: 'auto' })
                    } else if (this.state.width > 800) {
                        return ({ width: '180px', height: 'auto' })
                    } else {
                        return ({ width: '120px', height: 'auto' })
                    }
        
                }
        
            
        }
        const regularFont = construction.getRegularFont.call(this)
        return(
        <div style={{...styles.generalFlex}} key={slide.id}>
            <div style={{...styles.flex1}}>

        <div style={{...styles.generalContainer,...styles.showBorder,...smallslide(),...styles.marginAuto}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <img src={slide.url} alt={slide.title} style={{...smallslide()}}  />
        </div>
        <div style={{...styles.generalContainer,...styles.marginAuto,...styles.alignCenter}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <span style={{...styles.generalFont,...regularFont}}>{slide.title}</span>
        </div>


        </div>
        </div> )

    }

    showslides() {
        const landing = new Landing()
        const slides = landing.getslides.call(this);
        const styles = MyStylesheet();
        const allslides = [];
        
        if(slides) {
            // eslint-disable-next-line
            slides.map(slide=> {
                allslides.push(landing.showslide.call(this,slide))

            })
        }
        const templatecolumns = () => {
           
            if(this.state.width>800) {
            return (styles.triplegrid)
            } else {
                return (styles.doublegrid)
            }
        }
        
        return(<div style={{...styles.generalGrid,...templatecolumns(),...styles.bottomMargin15}}>
            {allslides}
        </div>)
        
        
    }

    showlanding() {
        const landing = new Landing()
        const construction = new Construction();
        const styles = MyStylesheet();
        const mainslide = landing.getmainslide.call(this)
        const headerFont = construction.getHeaderFont.call(this)
        const regularFont = construction.getRegularFont.call(this)

        const myslide = () => {
            if(this.state.activeslideid) {
            return(landing.getslidebyid.call(this,this.state.activeslideid))
            } else {
                return false;
            }
        }
        const showmainslide = () => {
 
            if(myslide()) {
                return(<div style={{...styles.generalContainer,...styles.showBorder,...mainslide,...styles.marginAuto}}>
                    <img src={myslide().url} alt={myslide().title} style={{...mainslide}}  />
                </div> )
            }

        }
        const showmaintitle = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...headerFont}}>{myslide().title}</span>)
            }

        }

        const showmaincaption = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...regularFont}}>{myslide().caption}</span>)
            }

        }
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaintitle()}

                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmainslide()}

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaincaption()}

                        </div>
                    </div>

                    {landing.showslides.call(this)}

                </div>
            </div>
        )
    }
}

export default Landing;