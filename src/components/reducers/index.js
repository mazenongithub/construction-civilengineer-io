import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
import myprojects from './myprojectsreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer';
import csis from './csireducer'
import mycompany from './mycompanyreducer';
import allprojects from './allprojectsreducer'
import websockets from './websocketsreducer';
import projectsockets from './projectsocketsreducer';
import projectnavigation from './projectnavigationreducer'
export default combineReducers({
    myusermodel,
    navigation,
    myprojects,
    allusers,
    allcompanys,
    csis,
    mycompany,
    allprojects,
    websockets,
    projectsockets,
    projectnavigation
})