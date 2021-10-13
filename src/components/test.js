const sortcode = (codeb, codea) => {

    if (Number(codea.csi) < Number(codeb.csi)) {

        return 1;
    }
    else if (Number(codeb.csi) < Number(codea.csi)) {

        return -1;
    }
    else {
        return 0;
    }
}

const findString = (search,string) => {
  string = string.toLowerCase().replace(/\s/g, "");
  search = search.toLowerCase().replace(/\s/g, "");
  let result = false;
  if(string.length>0) {
  if(string.indexOf(search)>=0) {
    result = true;
  }
    
  }
  
  return result;
}


  const validatecode = (results, code) => {

            let validate = true;
            if (results.length>0) {
              
                // eslint-disable-next-line
                results.map(result => {
                  validate =code.csiid
                    if (result.csiid === code.csiid) {
                        validate = false;
                    }
                })
            }
            return validate;
        }


const getsearchresults = () => {  
        let csi_1 = '00'
        let csi_2 ='69'
        let csi_3 = '19'
        let csi_4 = ''
        let searchcsi = "";
  			let title = "clarification";
        let results = [];

        if (csi_1.length === 2) {
            searchcsi = csi_1.substr(0,2);
        }
        if (csi_2.length === 2) {
            searchcsi += csi_2.substr(0,2);
        }
        if (csi_3.length === 2) {
            searchcsi += csi_3.substr(0,2);
        }
        if(csi_4.length === 2) {
            searchcsi += csi_4.substr(0,2);    
        }
   
        const codes = [{csi:'006319',csiid:'006319',title:'Clarification Form'},{csi:'006319',csiid:'006319',title:'Clarification Form'},{csi:'016400',csiid:'016400',title:'Owner-Furnished Products'},{csi:'096723',csiid:'096723',title:'Resinous Flooring'}]

        if (searchcsi) {

            if (codes) {
           
                    // eslint-disable-next-line
                    codes.map(code => {

                        if (code.csi.startsWith(searchcsi)) {

                            if (validatecode(results, code)) {
                                results.push(code)
                            }


                        }
                      
                      if(findString(title,code.title)) {
                        
                          if (validatecode(results, code)) {
                                results.push(code)
                            }
                        
                      }
                      
                      
                      
                      

                    })

            }

            results.sort((codeb, codea) => {

                return sortcode(codeb, codea)
            })

        }
   
        return results;
    }

const results = [{"csi":"006319","csiid":"006319","title":"Clarification Form"}];
const code = [{"csi":"006319","csiid":"006319","title":"Clarification Form"}]
getsearchresults()
