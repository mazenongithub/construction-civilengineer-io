import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import navigation from './navigationreducer';
export default combineReducers({
    myusermodel,
    navigation
})