import { MYCOMPANY } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case MYCOMPANY:
            return action.payload;
        default:
            return state;
    }
}