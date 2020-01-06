import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
import projectid from './projectidreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer'
export default combineReducers({
    myusermodel,
    navigation,
    projectid,
    allusers,
    allcompanys
})