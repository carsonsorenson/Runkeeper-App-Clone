import { ADD_ACTIVITY, DELETE_ACTIVITY, SET_ACTIVITIES } from '../actions/activitiesActions';
import localStorage from '../../services/LocalStorage';

let initialState = {
    activites: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVITIES:
            return action.activites;
        case ADD_ACTIVITY:
            var newState = {
                ...state,
                activites: [...state.activites, action.newActivity]
            }
            localStorage.add('activites', newState);
            return newState;
        case DELETE_ACTIVITY:
            var newState = {
                ...state,
                activites: state.activites.filter(item => item.id !== action.id)
            }
            localStorage.add('activites', newState);
            return newState;
        default:
            return state;
    }
}