import React from 'react'
import DynamicStyles from './dynamicstyles'
import { checkactivedate, abbMonth } from './functions'
import { MyStylesheet } from './styles'


class Diagrams {


    showbenefitlabel(benefit) {

        const hidebenefits = this.state.hidebenefits;
        let hidebenefit = true
         // eslint-disable-next-line
        hidebenefits.map(benefitstate => {

            if(benefitstate.detail === benefit.detail && benefitstate.amount === benefit.amount && benefitstate.purchasedate === benefit.purchasedate) {
                hidebenefit = false;
            }

        })
        return hidebenefit;

    }

    handlebenefitid(benefit) {
     
        const hidebenefits = this.state.hidebenefits;
        let remove = false;
        hidebenefits.map((hidebenefit,i)=> {
            if(hidebenefit.detail === benefit.detail && hidebenefit.amount === benefit.amount && benefit.purchasedate === hidebenefit.purchasedate) {
               remove = true;
                hidebenefits.splice(i, 1)
            
            }
        })

        if (!remove) {

            hidebenefits.push(benefit) 

        }
        this.setState({ hidebenefits })
    }

 

    showdiagrams(employeeid) {

        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const diagrams = new Diagrams();

        const showlabels = () => {
            return (
                <g>
                    <text className="largeexpanded-1" transform="translate(122.86 143.86)">Jan</text>
                    <text className="largeexpanded-1" transform="translate(433.02 143.86)"><tspan className="largeexpanded-8">F</tspan><tspan x="12.71" y="0">eb</tspan></text>
                    <text className="largeexpanded-1" transform="translate(737.83 143.86)">Mar</text>
                    <text className="largeexpanded-1" transform="translate(1044.14 143.86)">Apr</text>
                    <text className="largeexpanded-1" transform="translate(117.58 314.63)">M<tspan className="largeexpanded-2" x="22.32" y="0">a</tspan><tspan x="34.45" y="0">y</tspan></text>
                    <text className="largeexpanded-1" transform="translate(427.33 314.63)">June</text>
                    <text className="largeexpanded-1" transform="translate(738.45 314.63)">July</text>
                    <text className="largeexpanded-1" transform="translate(1042.79 314.63)">Aug</text>
                    <text className="largeexpanded-1" transform="translate(116.93 485.4)">Sept</text>
                    <text className="largeexpanded-1" transform="translate(432.67 489)">Oct</text>
                    <text className="largeexpanded-1" transform="translate(738.07 487.2)">N<tspan className="largeexpanded-3" x="18.14" y="0">o</tspan><tspan x="31.39" y="0">v</tspan></text>
                    <text className="largeexpanded-1" transform="translate(1043.24 489)">Dec</text>

                </g>)
        }

        const showtickmarks = () => {

            return (
                <g>

                    <line className="largeexpanded-9" x1="4.9" y1="83.27" x2="4.9" y2="43.27" />
                    <line className="largeexpanded-9" x1="4.9" y1="247.8" x2="4.9" y2="207.8" />
                    <line className="largeexpanded-9" x1="4.9" y1="412.32" x2="4.9" y2="372.32" />

                    <line className="largeexpanded-9" x1="304.94" y1="43.81" x2="304.94" y2="83.42" />
                    <line className="largeexpanded-9" x1="304.94" y1="208.33" x2="304.94" y2="247.94" />
                    <line className="largeexpanded-9" x1="304.94" y1="372.86" x2="304.94" y2="412.47" />

                    <line className="largeexpanded-9" x1="604.94" y1="43.45" x2="604.94" y2="83.45" />
                    <line className="largeexpanded-9" x1="604.94" y1="207.97" x2="604.94" y2="247.97" />
                    <line className="largeexpanded-9" x1="604.94" y1="372.5" x2="604.94" y2="412.5" />

                    <line className="largeexpanded-9" x1="904.94" y1="43.24" x2="904.94" y2="83.24" />
                    <line className="largeexpanded-9" x1="904.94" y1="207.77" x2="904.94" y2="247.77" />
                    <line className="largeexpanded-9" x1="904.94" y1="372.29" x2="904.94" y2="412.29" />

                    <line className="largeexpanded-9" x1="1204.97" y1="43.28" x2="1204.97" y2="83.28" />
                    <line className="largeexpanded-9" x1="1204.97" y1="207.8" x2="1204.97" y2="247.8" />
                    <line className="largeexpanded-9" x1="1204.97" y1="372.33" x2="1204.97" y2="412.33" />

                </g>)

        }

        const showaxis = () => {
            return (
                <g>
                    <line className="largeexpanded-9" x1="4.97" y1="63.27" x2="1204.97" y2="63.27" />
                    <line className="largeexpanded-9" x1="4.97" y1="227.8" x2="1204.97" y2="227.8" />
                    <line className="largeexpanded-9" x1="4.97" y1="392.32" x2="1204.97" y2="392.32" />

                </g>
            )
        }

        const januaryearnings = (benefit) => {

            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>
                        <path className="largeexpanded-6" d="M91.34,3.43V29.36a1.91,1.91,0,0,1-1.91,1.91H22a2.16,2.16,0,0,0-.51.07L9.08,34.81a1.91,1.91,0,0,1-2.35-2.35l3-10.72a1.86,1.86,0,0,0,.07-.52V3.43a1.91,1.91,0,0,1,1.91-1.91H89.43A1.92,1.92,0,0,1,91.34,3.43Z" />
                        <text className="largeexpanded-7" transform="translate(13.02 13.43)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }



            return (
                <g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="4.96 29.13 0.46 38.13 9.46 38.13 4.96 29.13" />
                    <line className="largeexpanded-4" x1="4.96" y1="38.13" x2="4.96" y2="64.14" />
                    {label(showlabel)}

                </g>)
        }

   

        const februaryearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>
                        <path className="largeexpanded-6" d="M392.37,2.16V28.09A1.92,1.92,0,0,1,390.46,30H323a1.81,1.81,0,0,0-.52.07l-12.36,3.47a1.91,1.91,0,0,1-2.36-2.35l3-10.73a1.75,1.75,0,0,0,.08-.51V2.16A1.91,1.91,0,0,1,312.75.25h77.71A1.92,1.92,0,0,1,392.37,2.16Z" />
                        <text className="largeexpanded-7" transform="translate(314.05 12.16)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text>
                    </g>)

                }
            }

            return (
                <g transform={`translate(${day * 10.34},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="304.94 28.27 300.44 37.27 309.44 37.27 304.94 28.27" />
                    <line className="largeexpanded-4" x1="304.94" y1="37.27" x2="304.94" y2="63.27" />
                    {label(showlabel)}

                </g>)
        }

  

        const marchearnings = (benefit) => {

            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>   <path className="largeexpanded-6" d="M692.47,4V29.88a1.9,1.9,0,0,1-1.9,1.91H623.1a2.25,2.25,0,0,0-.52.07l-12.36,3.47A1.91,1.91,0,0,1,607.86,33l3-10.72a1.86,1.86,0,0,0,.07-.52V4A1.92,1.92,0,0,1,612.85,2h77.72A1.91,1.91,0,0,1,692.47,4Z" />
                        <text className="largeexpanded-7" transform="translate(614.16 13.95)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)},</tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }

            return (<g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="604.97 28.62 600.47 37.62 609.47 37.62 604.97 28.62" />
                <line className="largeexpanded-4" x1="604.97" y1="37.62" x2="604.97" y2="63.63" />

                {label(showlabel)}

            </g>)
        }

  
        const aprilearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>   <path className="largeexpanded-6" d="M992.41,2.16V28.09A1.92,1.92,0,0,1,990.5,30H923a1.81,1.81,0,0,0-.52.07l-12.36,3.47a1.91,1.91,0,0,1-2.36-2.35l3-10.73a1.75,1.75,0,0,0,.08-.51V2.16A1.91,1.91,0,0,1,912.79.25H990.5A1.92,1.92,0,0,1,992.41,2.16Z" />
                        <text className="largeexpanded-7" transform="translate(914.09 12.16)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text>

                    </g>)

                }
            }
            return (<g transform={`translate(${day * 10},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="904.97 28.13 900.47 37.13 909.47 37.13 904.97 28.13" />
                <line className="largeexpanded-4" x1="904.97" y1="37.13" x2="904.97" y2="63.13" />
                {label(showlabel)}
            </g>)
        }

    


        const mayearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>  <path className="largeexpanded-6" d="M91.59,166.7v25.93a1.91,1.91,0,0,1-1.91,1.91H22.21a1.82,1.82,0,0,0-.52.08L9.33,198.09A1.91,1.91,0,0,1,7,195.73L10,185a1.82,1.82,0,0,0,.08-.52V166.7A1.91,1.91,0,0,1,12,164.79H89.68A1.92,1.92,0,0,1,91.59,166.7Z" />
                        <text className="largeexpanded-7" transform="translate(13.27 176.71)"> <tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (
                <g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="4.96 193.66 0.46 202.66 9.46 202.66 4.96 193.66" />
                    <line className="largeexpanded-4" x1="4.96" y1="202.66" x2="4.96" y2="228.66" />
                    
                    {label(showlabel)}
                </g>)
        }

    

        const juneearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>  <path className="largeexpanded-6" d="M393.86,166.7v25.93a1.91,1.91,0,0,1-1.91,1.91H324.48a1.75,1.75,0,0,0-.51.08l-12.37,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a1.81,1.81,0,0,0,.07-.52V166.7a1.91,1.91,0,0,1,1.91-1.91H392A1.92,1.92,0,0,1,393.86,166.7Z" />
                        <text className="largeexpanded-7" transform="translate(315.54 176.71)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (<g transform={`translate(${day * 10},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="304.94 192.79 300.44 201.79 309.44 201.79 304.94 192.79" />
                <line className="largeexpanded-4" x1="304.94" y1="201.79" x2="304.94" y2="227.8" />
                {label(showlabel)}

            </g>)
        }

 

        const julyearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>  <path className="largeexpanded-6" d="M691.84,166.7v25.93a1.91,1.91,0,0,1-1.91,1.91H622.46a1.88,1.88,0,0,0-.52.08l-12.36,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52V166.7a1.91,1.91,0,0,1,1.91-1.91h77.71A1.92,1.92,0,0,1,691.84,166.7Z" />
                        <text className="largeexpanded-7" transform="translate(613.52 176.71)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (<g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="604.97 192.65 600.47 201.65 609.47 201.65 604.97 192.65" />
                <line className="largeexpanded-4" x1="604.97" y1="201.65" x2="604.97" y2="227.66" />
                {label(showlabel)}

            </g>)
        }

        const augustearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g> <path className="largeexpanded-6" d="M992.49,166.7v25.93a1.9,1.9,0,0,1-1.91,1.91H923.11a1.81,1.81,0,0,0-.51.08l-12.36,3.47a1.91,1.91,0,0,1-2.36-2.36l3-10.72a1.81,1.81,0,0,0,.07-.52V166.7a1.92,1.92,0,0,1,1.91-1.91h77.71A1.91,1.91,0,0,1,992.49,166.7Z" />
                        <text className="largeexpanded-7" transform="translate(914.17 176.71)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (
                <g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="904.97 192.65 900.47 201.65 909.47 201.65 904.97 192.65" />
                    <line className="largeexpanded-4" x1="904.97" y1="201.65" x2="904.97" y2="227.66" />
                    {label(showlabel)}
                </g>)
        }

  


        const septemberearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g>  <path className="largeexpanded-6" d="M91.83,332.48v25.93a1.9,1.9,0,0,1-1.91,1.91H22.45a2.24,2.24,0,0,0-.51.07L9.57,363.86a1.91,1.91,0,0,1-2.35-2.35l3-10.72a1.81,1.81,0,0,0,.07-.52V332.48a1.92,1.92,0,0,1,1.91-1.91H89.92A1.91,1.91,0,0,1,91.83,332.48Z" />
                        <text className="largeexpanded-7" transform="translate(13.02 343.76)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (
                <g transform={`translate(${day * 10},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="4.96 358.18 0.46 367.18 9.46 367.18 4.96 358.18" />
                    <line className="largeexpanded-4" x1="4.96" y1="367.18" x2="4.96" y2="393.19" />
                    {label(showlabel)}
                </g>
            )
        }

    

        const octoberearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g> <path className="largeexpanded-6" d="M392,331.33v25.93a1.91,1.91,0,0,1-1.91,1.91H322.67a1.81,1.81,0,0,0-.52.07l-12.36,3.47a1.91,1.91,0,0,1-2.36-2.36l3-10.72a1.79,1.79,0,0,0,.07-.51V331.33a1.91,1.91,0,0,1,1.91-1.91h77.71A1.9,1.9,0,0,1,392,331.33Z" />
                        <text className="largeexpanded-7" transform="translate(313.72 341.33)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (
                <g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                    <polygon className="largeexpanded-4" points="304.94 357.32 300.44 366.32 309.44 366.32 304.94 357.32" />
                    <line className="largeexpanded-4" x1="304.94" y1="366.32" x2="304.94" y2="392.32" />
                    {label(showlabel)}
                </g>)
        }

      


        const novemberearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g> <path className="largeexpanded-6" d="M691.84,330.05V356a1.91,1.91,0,0,1-1.91,1.91H622.46a1.88,1.88,0,0,0-.52.08l-12.36,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52V330.05a1.91,1.91,0,0,1,1.91-1.91h77.71A1.92,1.92,0,0,1,691.84,330.05Z" />
                        <text className="largeexpanded-7" transform="translate(613.52 340.06)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (<g transform={`translate(${day * 10},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="604.97 357.18 600.47 366.18 609.47 366.18 604.97 357.18" />
                <line className="largeexpanded-4" x1="604.97" y1="366.18" x2="604.97" y2="392.18" />
                {label(showlabel)}
            </g>)
        }

     

        const decemberearnings = (benefit) => {
            const day = new Date(benefit.purchasedate).getDate()
            const showlabel = diagrams.showbenefitlabel.call(this, benefit)
            const label = (showlabel) => {
                if (showlabel) {
                    return (<g><path className="largeexpanded-6" d="M991.55,330.05V356a1.91,1.91,0,0,1-1.91,1.91H922.17a1.88,1.88,0,0,0-.52.08l-12.36,3.47a1.91,1.91,0,0,1-2.35-2.36l3-10.72a2.25,2.25,0,0,0,.07-.52V330.05a1.91,1.91,0,0,1,1.91-1.91h77.71A1.92,1.92,0,0,1,991.55,330.05Z" />
                        <text className="largeexpanded-7" transform="translate(913.23 340.06)"><tspan>{abbMonth(benefit.purchasedate)}, ${Number(benefit.amount).toFixed(2)}, </tspan><tspan x="0" y="12">{benefit.detail}</tspan></text></g>)

                }
            }
            return (<g transform={`translate(${day * 9.67},0)`} key={`svg${benefit.benefitid}`} onClick={() => { diagrams.handlebenefitid.call(this, benefit) }}>
                <polygon className="largeexpanded-4" points="904.97 357.18 900.47 366.18 909.47 366.18 904.97 357.18" />
                <line className="largeexpanded-4" x1="904.97" y1="366.18" x2="904.97" y2="392.18" />
                {label(showlabel)}
            </g>)
        }


        let earningsArrows = [];
        const benefits = dynamicstyles.getemployeebenefitinterval.call(this,employeeid)
    
        if (benefits) {
            // eslint-disable-next-line
            benefits.map(benefit => {
             
                
                const benefitdate = new Date(benefit.purchasedate)

                switch (benefitdate.getMonth() + 1) {
                    case 1:
                        earningsArrows.push(januaryearnings(benefit))
                        break;
                    case 2:
                        earningsArrows.push(februaryearnings(benefit))
                        break;
                    case 3:
                        earningsArrows.push(marchearnings(benefit))
                        break;
                    case 4:
                        earningsArrows.push(aprilearnings(benefit))
                        break;
                    case 5:
                        earningsArrows.push(mayearnings(benefit))
                        break;
                    case 6:
                        earningsArrows.push(juneearnings(benefit))
                        break;
                    case 7:
                        earningsArrows.push(julyearnings(benefit))
                        break;
                    case 8:
                        earningsArrows.push(augustearnings(benefit))
                        break;
                    case 9:
                        earningsArrows.push(septemberearnings(benefit))
                        break;
                    case 10:
                        earningsArrows.push(octoberearnings(benefit))
                        break;
                    case 11:
                        earningsArrows.push(novemberearnings(benefit))
                        break;
                    case 12:
                        earningsArrows.push(decemberearnings(benefit))
                        break;
                    default:
                        break;

                }

            })
        }

     



        return (

            <div style={{ ...styles.generalContainer, ...styles.topMargin30 }}>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1205.97 496.63">
                    <defs><style></style></defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_2-2" data-name="Layer 2">
                            {showaxis()}
                            {showtickmarks()}
                            {showlabels()}

                            {earningsArrows}
                        </g></g></svg>
            </div>)



    }

}

export default Diagrams