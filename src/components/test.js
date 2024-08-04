try {

    const getproject = await civilengineer.getProjectByProjectID(projectid)
    const project_id = getproject._ID;
    const myproject = await civilengineer.findProjectByID(project_id)
    let getmyproject = false;
    if(myproject) {
    if (myproject.construction) {

        for (let project of myproject.construction) {

            if (project.company_id === company_id) {
                getmyproject = project
            
            }
            
            
        }
        
        if(!getmyproject) {
             
            }
        
    }



}