import { ADD_ACTIVITY } from '../actions/activitiesActions';

let initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                [action.id]: action.newActivity
            }
        default:
            return state;
    }
}