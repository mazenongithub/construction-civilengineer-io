import { ALLPROJECTS } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ALLPROJECTS:
            return action.payload;
        default:
            return state;
    }
}