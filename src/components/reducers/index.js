import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
import project from './projectreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer';
import csis from './csireducer'
import mycompany from './mycompanyreducer'
export default combineReducers({
    myusermodel,
    navigation,
    project,
    allusers,
    allcompanys,
    csis,
    mycompany
})