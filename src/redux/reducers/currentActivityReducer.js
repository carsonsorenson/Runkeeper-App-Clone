import {SET_ACTIVITY, START_ACTIVITY, UPDATE_POSITION } from '../actions/currentActivityActions';

let initialState = {
    position : [],
    activity: null,
    initialWeather: null,
    duration: 0,
    distance: 0,
    pace: 0,
    time: 0,
    finalWeather: null,
    feeling: null,
    paused: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case START_ACTIVITY:
            return {
                ...initialState,
                position: [action.position],
                activity: action.activity,
                initialWeather: action.weather
            }
        case SET_ACTIVITY:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_POSITION:
            return {
                ...state,
                position: [action.position, ...state.position]
            }
        default:
            return state;
    }
}