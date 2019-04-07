import { UPDATE_BESTS } from '../actions/rewardsActions';

let initialState = {}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_BESTS:
            return action.payload
        default:
            return state;
    }
}