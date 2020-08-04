getactualbyproviderid(providerid) {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    let labor = [];
    if(myuser) {
        if(myuser.hasOwnProperty("company")) {
            if(myuser.company.hasOwnProperty("projects")) {
                // eslint-disable-next-line
                myuser.company.projects.myproject.map(project=> {
                   if(project.hasOwnProperty("actuallabor"))  {
                       // eslint-disable-next-line
                       project.actuallabor.mylabor.map(mylabor=> {
                           if(mylabor.providerid === providerid) {
                               labor.push(mylabor)
                           }
                       })
                   }
                })
            }
        }
    }
    return labor;
}