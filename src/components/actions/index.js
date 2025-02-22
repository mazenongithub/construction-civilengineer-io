import { MYUSERMODEL, NAVIGATION, MYPROJECTS, ALLUSERS, ALLCOMPANYS, CSIS, MYCOMPANY, ALLPROJECTS, WEBSOCKETS, PROJECTSOCKETS, PROJECTNAVIGATION} from './types';

export const reduxUser = (myusermodel) => async dispatch => {

    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxWebSockets = (websockets) => async dispatch => {
    dispatch({ type: WEBSOCKETS, payload: websockets })
}

export const reduxProjectNavigation = (projectnavigation) => async dispatch => {
    dispatch({ type: PROJECTNAVIGATION, payload: projectnavigation })
}

export const reduxProjectSockets = (projectsockets) => async dispatch => {
    dispatch({ type: PROJECTSOCKETS, payload: projectsockets })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}

export const reduxMyProjects = (myprojects) => async dispatch => {
    dispatch({ type: MYPROJECTS, payload: myprojects})
}

export const reduxAllProjects = (allprojects) => async dispatch => {
    dispatch({ type: ALLPROJECTS, payload: allprojects })
}

export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}

export const reduxCompany = (mycompany) => async dispatch => {
    dispatch({ type: MYCOMPANY, payload: mycompany })
}

export const reduxCSIs = (csis) => async dispatch => {
    dispatch({ type: CSIS, payload:csis })
}