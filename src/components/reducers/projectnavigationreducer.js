import { PROJECTNAVIGATION } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case PROJECTNAVIGATION:
            return action.payload;
        default:
            return state;
    }
}