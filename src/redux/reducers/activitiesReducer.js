import { ADD_ACTIVITY, DELETE_ACTIVITY } from '../actions/activitiesActions';

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
        case DELETE_ACTIVITY:
            return {
                ...state,
                activites: state.activites.filter(item => item.id !== action.id)
            }
        default:
            return state;
    }
}