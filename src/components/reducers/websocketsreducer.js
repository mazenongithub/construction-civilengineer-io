import { WEBSOCKETS } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case WEBSOCKETS:
            return action.payload;
        default:
            return state;
    }
}