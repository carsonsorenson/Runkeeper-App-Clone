import { GET_ACTIVITY, SET_ACTIVITY, START_ACTIVITY } from '../actions/currentActivityActions';

let initialState = {
    initialLatitude: null,
    initialLongitude: null,
    activity: null,
    duration: 0,
    distance: 0,
    finalLatitude: null,
    finalLongitude: null,
    paused: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ACTIVITY:
            return {
                ...state
            }
        case START_ACTIVITY:
            return {
                ...initialState,
                activity: action.activity,
                initialLatitude: action.initialLatitude,
                initialLongitude: action.initialLongitude
            }
        case SET_ACTIVITY:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}