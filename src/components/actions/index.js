import { MYUSERMODEL, NAVIGATION, PROJECTID, ALLUSERS, ALLCOMPANYS } from './types';

export const reduxUser = (myusermodel) => async dispatch => {
    console.log(myusermodel)
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}

export const projectID = (projectid) => async dispatch => {
    dispatch({ type: PROJECTID, payload: projectid })
}
export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}