import React from 'react';
import { MyStylesheet } from './styles';
import DynamicStyles from './dynamicstyles';
import { addIcon } from './svg';
class FindEmployee {

    showemployee(employee) {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const searchProfileImage = dynamicstyles.getsearchimage.call(this)
        const addCompany = dynamicstyles.getAddCompany.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)


        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    <div style={{ ...styles.generalContainer, ...styles.showBorder, ...searchProfileImage }}></div>

                </div>
                <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }}>
                    {employee.firstname} {employee.lastname} <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addemployee(employee.providerid) }}>{addIcon()}</button>
                </div>
            </div>)
        } else {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont }}>
                    <div style={{ ...styles.generalContainer, ...styles.showBorder, ...searchProfileImage }}></div>
                </div>

                <div style={{ ...styles.flex2, ...regularFont, ...styles.generalFont }}>
                    {employee.firstname} {employee.lastname} <button style={{ ...styles.generalButton, ...addCompany }}
                        onClick={() => { this.addemployee(employee.providerid) }}>{addIcon()}</button>

                </div>
            </div>)
        }
    }
    getsearchresults() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        let avail = [];
        let search = [];
        let searchterm = this.state.search;
        let results = [];
        const findemployee = new FindEmployee();
        if (myuser) {

            const allusers = dynamicstyles.getallusers.call(this)
            // eslint-disable-next-line
            allusers.map(user => {
                if (!user.hasOwnProperty("company")) {
                    avail.push(user)
                }
            })
        }

        // eslint-disable-next-line
        avail.map(myuser => {
            if (searchterm) {
                if (myuser.firstname.toLowerCase().startsWith(searchterm.toLowerCase()) || myuser.lastname.toLowerCase().startsWith(searchterm.toLowerCase())) {
                    search.push(myuser)
                }
            }

        })

        // eslint-disable-next-line
        search.map(myuser => {
            results.push(findemployee.showemployee.call(this, myuser))
        })

        return results;
    }

    showEmployeeSearch() {
        const styles = MyStylesheet();
        const findemployee = new FindEmployee();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1, ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            Find An Employee By name  <br /> <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.addLeftMargin, ...styles.generalField }}
                                value={this.state.search}
                                onChange={event => { this.setState({ search: event.target.value }) }}
                            />
                        </div>
                    </div>

                    {findemployee.getsearchresults.call(this)}


                </div>
            </div>)

    }
}
export default FindEmployee;