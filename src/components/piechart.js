import React from 'react'
import { MyStylesheet } from './styles'
import {convertDegresstoRadians, getPieColor} from './functions'
import DynamicStyles from './dynamicstyles';

class PieChart {
  
    getChartCoordsbyDegree(degree){
        let xcoord = "";
        let ycoord = "";
        if(degree <=90) {
        
        xcoord = 602.5 + 600 * Math.sin(convertDegresstoRadians(degree))
        ycoord = 602.5 - 600 * Math.cos(convertDegresstoRadians(degree))
        
      } else if (degree<=180) {
        
        xcoord = 602.5 + 600 * Math.cos(convertDegresstoRadians(degree-90))
        ycoord = 602.5 + 600 * Math.sin(convertDegresstoRadians(degree-90))
        
      } else if (degree <=270) {
        
          xcoord = 602.5 - 600 * Math.sin(convertDegresstoRadians(degree-180))
          ycoord = 602.5 + 600 * Math.cos(convertDegresstoRadians(degree-180))
        
        
      } else if(degree <=360) {
        
        xcoord = 602.5 - 600 * Math.cos(convertDegresstoRadians(degree-270))
        ycoord =  602.5 - 600 * Math.sin(convertDegresstoRadians(degree-270))
        
        
      }
        return {xcoord,ycoord}
        
      }

    drawSlice(deg_1,deg_2, i) {
        const piechart = new PieChart();
        const coord_1 = piechart.getChartCoordsbyDegree(deg_1);
        const x_1 = coord_1.xcoord;
        const y_1 = coord_1.ycoord;
        const coord_2 =piechart.getChartCoordsbyDegree(deg_2);
        const x_2 = coord_2.xcoord;
        const y_2 = coord_2.ycoord;
        const randomColor = getPieColor(i)
        if(deg_2 - deg_1 > 180) {
            return( <path fill={randomColor} d={`M ${x_1} ${y_1} A 600 600 0 1 1 ${x_2} ${y_2} L 602.5 602.5`} />)
        } else {
            return( <path fill={randomColor} d={`M ${x_1} ${y_1} A 600 600 0 0 1 ${x_2} ${y_2} L 602.5 602.5`} />)

        }
      
    }

    getSlices(employeeid) {
        const dynamicstyles = new DynamicStyles();
        const benefits = dynamicstyles.getemployeebenefitinterval.call(this,employeeid)
        const slices = [];

        const getamountbyaccountid = (accountid) => {
            let amount = 0;
            // eslint-disable-next-line
            benefits.map(benefit=> {
                if(benefit.accountid === accountid) {
                    amount +=Number(benefit.amount)
                }
            })
            return amount;
        }
        const checkslices = (slices,accountid) => {
            let check = true;
            // eslint-disable-next-line
            slices.map(slice=> {
                if(slice.accountid === accountid) {
                    check = false;
                }
            })
            return check;

        }
        if(benefits) {
// eslint-disable-next-line
            benefits.map(benefit=> {

                if(checkslices(slices,benefit.accountid)) {
                    const account = dynamicstyles.getaccountbyid.call(this,benefit.accountid)
                    slices.push({accountid:benefit.accountid, account:account.accountname})
                }

            })

        }

        if(slices.length>0) {
// eslint-disable-next-line
            slices.map((slice,i)=> {
                let amount = getamountbyaccountid(slice.accountid)
                slices[i].amount = amount;
            })

        }

        let totalamount = 0;
        // eslint-disable-next-line
        slices.map(slice=> {
            totalamount +=Number(slice.amount)
        })

      // eslint-disable-next-line
        slices.map((slice,i)=> {
            let percentage = Number(slice.amount)/totalamount
            slices[i].percentage = percentage
        })


        let degrees =0;
        let percentage = 0;
        // eslint-disable-next-line
        slices.map((slice,i)=> {

            percentage += (100* slice.percentage)
        
            degrees = 3.6*percentage;
            slices[i].degrees = degrees
        })


        return slices;
    }

    showLegend(employeeid) {
        let getlegend = [];
        const styles = MyStylesheet();
        const dynamicstyles = new DynamicStyles();
        const regularFont = dynamicstyles.getRegularFont.call(this)

        const getBackground = (color) => {
            return {backgroundColor:color}
        }
        const legendSize = () => {
            return({width:'30px', height:'30px'})
        }

        const legend = (slice,color) => {
            return(
            <div style={{...styles.generalFlex}}>
                <div style={{...styles.flex1}}>

                    <div style={{...styles.showBorder,...styles.generalContainer,...getBackground(color), ...legendSize()}}>

                    </div>
                    
                    
                </div>
                <div style={{...styles.flex3}}>
                    <span style={{...styles.generalFont,...regularFont}}>{slice.account} {+Number(slice.percentage*100).toFixed(1)}% - ${Number(slice.amount).toFixed(2)}</span>
                    
                </div>
            </div>)

        }
        const piechart = new PieChart();
        const slices = piechart.getSlices.call(this,employeeid)
        if(slices) {
        // eslint-disable-next-line
            slices.map((slice,i)=> {
                getlegend.push(legend(slice,getPieColor(i)))
                
            })
        
    }
        return getlegend;
    }

    showslices(employeeid) {
        const piechart = new PieChart();
        const slices = piechart.getSlices.call(this,employeeid)
        let paths = [];
        let marker = 0;
        if(slices.length>0) {
            // eslint-disable-next-line
            slices.map((slice,i)=> {
                paths.push(piechart.drawSlice(marker,slice.degrees,i))
                marker = slice.degrees;
            })
        }
        return paths;
    }

    showpiechart(providerid) {
        const dynamicstyles = new DynamicStyles();
        const styles = MyStylesheet();
        const piechart = new PieChart();
        const headerFont = dynamicstyles.getHeaderFont.call(this)
        const maxWidth = () => {
            return({maxWidth:'80%'})
        }
        const showchart = (providerid) => {
            return(  
            <div style={{...styles.generalContainer, ...maxWidth(),...styles.marginAuto}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1205 1205">
                <g id="Layer_2" data-name="Layer 2">
                    <g id="hide">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <circle className="pie-1" cx="602.5" cy="602.5" r="600" />
                       
                            {piechart.showslices.call(this,providerid)}
                        
                        </g>
                    </g>

                </g>
            </svg>
            </div>
            )
        }
        
        const handlechart = () => {
            if(this.state.width>1200) {
                return(<div style={{...styles.generalFlex}}>
                    <div style={{...styles.flex2}}>
                        {showchart(providerid)}
                    </div>
                    <div style={{...styles.flex1}}>
                        {piechart.showLegend.call(this,providerid)}
                    </div>
                </div>)
            } else {

               return(<div style={{...styles.generalContainer}}>
                  <div style={{...styles.generalContainer}}>
                  {showchart(providerid)}
                    </div>
                    <div style={{...styles.generalContainer}}>
                    {piechart.showLegend.call(this,providerid)}
                    </div>

                </div>)
            }
        }
     
        return (
            <div style={{ ...styles.generalContainer}}>

                <div style={{...styles.generalContainer,...styles.topMargin15,...styles.bottomMargin15, ...styles.alignCenter}}>
                    <span style={{...styles.generalFont,...headerFont}}>
                        Employee Salary % Breakdown
                    </span>
                </div>

            
            {handlechart()}

          
            
            </div>)

        
    }
}
export default PieChart;