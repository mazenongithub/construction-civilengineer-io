import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
import projectid from './projectidreducer';
export default combineReducers({
    myusermodel,
    navigation,
    projectid
})