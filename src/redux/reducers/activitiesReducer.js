import { ADD_ACTIVITY } from '../actions/activitiesActions';

let initialState = {
    activites: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                activites: [...state.activites, action.newActivity]
            }
        default:
            return state;
    }
}