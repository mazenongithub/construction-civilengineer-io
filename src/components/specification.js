import React, { Component } from 'react';
import { MyStylesheet } from './styles'
import DynamicStyles from './dynamicstyles'
import { connect } from 'react-redux';
import * as actions from './actions';
import { sortpart, LetterCounter, getListNumber} from './functions'

class Specification extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showpart(section) {
        const dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)

        const extra = () => {
            switch (Number(section.part)) {
                case 1:
                    return ("GENERAL INFORMATION")
                case 2:
                    return ('MATERIALS')
                case 3:
                    return ('EXECUTION')
                default:
                    break;
            }
        }

        return (<div style={{ ...styles.generalFont, ...headerFont }} key={`${section.sectionid}part`}>Part {section.part} {extra()}</div>)
    }

    showcontent(content, i) {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const styles = MyStylesheet();
        const counter = LetterCounter(i + 1)


        return (
            <div style={{ ...styles.generalContainer, ...styles.marginLeft30 }} key={content.contentid}>
                <span style={{ ...styles.generalFont, ...regularFont }}> {counter}. {content.content}</span>
            </div>
        )


    }

    showspecsection(section, i) {

        const dynamicstyles = new DynamicStyles()
        const styles = MyStylesheet();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const project = dynamicstyles.getprojectbytitle.call(this, this.props.match.params.projectid)
        const projectid = project.projectid;
        const csiid = this.props.match.params.csiid;
        const sectionnumber = dynamicstyles.getsectionnumberbyid.call(this, projectid, csiid, section.sectionid);


        return (<div style={{ ...styles.generalContainer }} key={`${section.sectionid}section`} ><span style={{ ...styles.generalFont, ...headerFont }}>{section.part}.{sectionnumber} {section.title} </span></div>)
    }

    showsubcontent(subcontent, j) {
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const styles = MyStylesheet();

        return (<div style={{ ...styles.generalContainer, ...styles.marginLeft60 }} key={subcontent.subcontentid}
        ><span style={{ ...styles.generalFont, ...regularFont }}
        >{j + 1}. {subcontent.subcontent} </span>
        </div>
        )

    }

    getspeckeybyid(spec, contentid) {

        let key = [];
        if (spec.hasOwnProperty("paragraph")) {
    
            if (spec.paragraph.hasOwnProperty("list")) {
    
                spec.paragraph.list.map((list, i) => {
                    if (list.contentid === contentid) {
                        key = [i]
    
                    }
    
                    if (list.hasOwnProperty("sublist")) {
                        if (list.sublist.hasOwnProperty("list")) {
    
                            list.sublist.list.map((sublist, j) => {
    
                                if (sublist.contentid === contentid) {
    
                                    key = [i, j]
                                }
    
    
                                if (sublist.hasOwnProperty("sublist")) {
                                    if (sublist.sublist.hasOwnProperty("list")) {
    
                                        sublist.sublist.list.map((sublist_1, k) => {
    
                                            if (sublist_1.contentid === contentid) {
    
                                                key = [i, j, k]
                                            }
    
    
    
    
                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                if (sublist_1.sublist.hasOwnProperty("list")) {
    
                                                    sublist_1.sublist.list.map((sublist_2, l) => {
    
                                                        if (sublist_2.contentid === contentid) {
                                                            key = [i, j, k, l]
                                                        }
    
                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                            if (sublist_2.sublist.hasOwnProperty("list")) {
    
                                                                sublist_2.sublist.list.map((sublist_3, m) => {
    
                                                                    if (sublist_3.contentid === contentid) {
    
                                                                        key = [i, j, k, l, m]
                                                                    }
    
                                                                })
    
                                                            }
    
                                                        }
    
                                                    })
    
                                                }
    
                                            }
    
                                        })
    
    
                                    }
    
    
                                }
    
    
                            })
    
    
                        }
    
    
                    }
    
    
    
                })
            }
    
    
    
        }
        return key
    
    
    }
    
    
    
        getlisttype(spec, contentid) {
    
            let listtype = spec;
    
    
            if (spec.hasOwnProperty("paragraph")) {
    
    
                if (spec.paragraph.hasOwnProperty("list")) {
    
                    spec.paragraph.list.map(list => {
    
                        if (list.contentid === contentid) {
    
                            listtype = spec.paragraph.listType
    
                        }
    
                        if (list.hasOwnProperty("sublist")) {
    
    
                            if (list.sublist.hasOwnProperty("list")) {
    
                                list.sublist.list.map(sublist => {
    
                                    if (sublist.contentid === contentid) {
                                        listtype = list.sublist.listType
                                    }
    
    
                                    if (sublist.hasOwnProperty("sublist")) {
    
                                        if (sublist.sublist.hasOwnProperty("list")) {
    
                                            sublist.sublist.list.map(sublist_1 => {
    
                                                if (sublist_1.contentid === contentid) {
                                                    listtype = sublist.sublist.listType
                                                }
    
    
    
    
                                                if (sublist_1.hasOwnProperty("sublist")) {
    
                                                    if (sublist_1.sublist.hasOwnProperty("list")) {
    
                                                        sublist_1.sublist.list.map(sublist_2 => {
    
                                                            if (sublist_2.contentid === contentid) {
                                                                listtype = sublist_1.sublist.listType
                                                            }
    
                                                            if (sublist_2.hasOwnProperty("sublist")) {
    
                                                                if (sublist_2.sublist.hasOwnProperty("list")) {
    
                                                                    sublist_2.sublist.list.map(sublist_3 => {
                                                                        if (sublist_3.contentid === contentid) {
                                                                            listtype = sublist_2.sublist.listType
    
                                                                        }
    
                                                                    })
    
    
                                                                }
    
    
                                                            }
    
    
    
    
    
                                                        })
    
    
                                                    }
    
    
                                                }
    
    
    
    
    
                                            })
    
    
                                        }
    
    
                                    }
    
    
                                })
    
    
                            }
    
    
                        }
    
    
    
                    })
                }
    
    
    
            }
            return listtype
    
    
    
        }
    
     showspecification() {
        const dynamicstyles = new DynamicStyles();
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        const styles = MyStylesheet();
        const getremoveicon = dynamicstyles.getremoveicon.call(this)
        if (myuser) {
    
            const project = dynamicstyles.getproject.call(this);
    
    
            if (project) {
                const projectid = project.projectid;
                const spec = dynamicstyles.getspecficationbycsi.call(this, projectid, this.props.match.params.csiid)
                console.log(spec)
                if (spec) {
    
                    const activebackground = (contentid) => {
                        if (this.state.activecontentid === contentid) {
    
                            return { backgroundColor: '#D7A22A' }
                        }
                    }
    
               
    
    
                    const showparagraph = () => {
                        let paragraphs = [];
    
                        if (spec.hasOwnProperty("paragraph")) {
    
                            if (spec.paragraph.hasOwnProperty("list")) {
                                // eslint-disable-next-line
                                spec.paragraph.list.map((list, i) => {
    
                                    const listtype_1 = () => {
    
                                        return (` ${getListNumber(spec.paragraph.listType, i + 1, false)} `)
    
                                    }
    
                                    paragraphs.push(<div style={{ ...styles.generalContainer }} key={list.contentid}>
                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}> {listtype_1()}</span>
                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(list.contentid) }} onClick={() => { this.makelistactive(list.contentid) }}>{list.content}</span>
                                       
                                    </div>)
    
    
    
                                    if (list.hasOwnProperty("sublist")) {
                                        if (list.sublist.hasOwnProperty("list")) {
                                            // eslint-disable-next-line
                                            list.sublist.list.map((sublist, j) => {
    
                                                const listtype_2 = () => {
    
                                                    return (` ${getListNumber(list.sublist.listType, j + 1, i + 1)} `)
                                                }
    
                                                paragraphs.push(<div style={{ ...styles.generalContainer, ...styles.marginLeft30 }} key={sublist.contentid}>
                                                    <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}> {listtype_2()}</span>
                                                    <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist.contentid) }} onClick={() => { this.makelistactive(sublist.contentid) }}>{sublist.content}</span>
                                                
                                                </div>)
    
    
                                                if (sublist.hasOwnProperty("sublist")) {
                                                    if (sublist.sublist.hasOwnProperty("list")) {
                                                        // eslint-disable-next-line
                                                        sublist.sublist.list.map((sublist_1, k) => {
    
                                                            const listtype_3 = () => {
    
                                                                return (` ${getListNumber(sublist.sublist.listType, k + 1, j + 1)} `)
                                                            }
    
                                
                                                            paragraphs.push(<div style={{ ...styles.generalContainer, ...styles.marginLeft60 }} key={sublist_1.contentid}>
                                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}> {listtype_3()}</span>
                                                                <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_1.contentid) }} onClick={() => { this.makelistactive(sublist_1.contentid) }}>{sublist_1.content}</span>
                                                              
                                                            </div>)
    
    
                                                            if (sublist_1.hasOwnProperty("sublist")) {
                                                                if (sublist_1.sublist.hasOwnProperty("list")) {
                                                                    // eslint-disable-next-line
                                                                    sublist_1.sublist.list.map((sublist_2, l) => {
    
                                                                        const listtype_4 = () => {
    
                                                                            return (` ${getListNumber(sublist_1.sublist.listType, l + 1, k + 1)} `)
                                                                        }
    
                                                                        paragraphs.push(<div style={{ ...styles.generalContainer, ...styles.marginLeft90 }} key={sublist_2.contentid}>
                                                                            <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}> {listtype_4()}</span>
                                                                            <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_2.contentid) }} onClick={() => { this.makelistactive(sublist_2.contentid) }}>{sublist_2.content}</span>
                                                                       
                                                                        </div>)
    
    
                                                                        if (sublist_2.hasOwnProperty("sublist")) {
                                                                            if (sublist_2.sublist.hasOwnProperty("list")) {
                                                                                // eslint-disable-next-line
                                                                                sublist_2.sublist.list.map((sublist_3, m) => {
    
                                                                                    const listtype_5 = () => {
    
                                                                                        return (` ${getListNumber(sublist_2.sublist.listType, m + 1, k + 1)} `)
                                                                                    }
    
                                                                                  
    
    
                                                                                    paragraphs.push(<div style={{ ...styles.generalContainer, ...styles.marginLeft120 }} key={sublist_3.contentid}>
                                                                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid) }} onClick={() => { this.makelistactive(sublist_3.contentid) }}> {listtype_5()}</span>
                                                                                        <span style={{ ...styles.generalFont, ...regularFont, ...activebackground(sublist_3.contentid) }} onClick={() => { this.makelistactive(sublist_3.contentid) }}>{sublist_3.content}</span>
                                                                                       
                                                                                    </div>)
    
                                                                                })
    
    
                                                                            }
                                                                        }
    
    
    
                                                                    })
    
    
    
    
                                                                }
                                                            }
    
    
    
    
                                                        })
    
    
    
    
                                                    }
                                                }
    
    
    
                                            })
    
                                        }
    
    
    
    
    
                                    }
    
    
                                })
    
    
    
    
                            }
    
                        }
    
    
    
    
                        return paragraphs;
                    }
    
    
    
    
                    return (
                        <div style={{ ...styles.generalFlex }}>
                            <div style={{ ...styles.flex1 }}>
    
                                {showparagraph()}
                            </div>
                        </div>
                    )
    
                }
    
            }
        }
    
    }

    render() {
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const headerFont = dynamicstyles.getHeaderFont.call(this);
        const csi = dynamicstyles.getcsibyid.call(this, this.props.match.params.csiid)
        const myuser = dynamicstyles.getuser.call(this)
        const regularFont = dynamicstyles.getRegularFont.call(this)
        if (myuser) {
            const active = dynamicstyles.checkactive.call(this)
            if (active) {
                const project = dynamicstyles.getprojectbytitle.call(this,this.props.match.params.projectid);
                if(project) {


                    if(!project.hasOwnProperty("specifications")) {
                        dynamicstyles.loadprojectspecs.call(this,project.projectid) 
                    }

                return (<div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...headerFont, ...styles.alignCenter, ...styles.boldFont }}>
                                /{project.title} <br />
                            Specifications <br />
                            CSI {this.props.match.params.csiid} <br />
                                {csi.title}

                            </div>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>

                                {this.showspecification()}

                            </div>
                        </div>


                    </div>
                </div>
                )

                }

            } else {
                return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>You have to be active to view Specification </span>
                </div>)
            }

        } else {
            return (<div style={{ ...styles.generalContainer, ...regularFont }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Please Login to View Specification </span>
            </div>)
        }



    }



}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        navigation: state.navigation,
        project: state.project,
        allusers: state.allusers,
        allcompanys: state.allcompanys,
        csis: state.csis
    }
}

export default connect(mapStateToProps, actions)(Specification);