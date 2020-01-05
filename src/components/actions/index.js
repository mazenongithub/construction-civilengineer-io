import { MYUSERMODEL, NAVIGATION, PROJECTID } from './types';

export const reduxUser = (myusermodel) => async dispatch => {
    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxNavigation = (navigation) => async dispatch => {
    dispatch({ type: NAVIGATION, payload: navigation })
}

export const projectID = (projectid) => async dispatch => {
    dispatch({ type: PROJECTID, payload: projectid })
}