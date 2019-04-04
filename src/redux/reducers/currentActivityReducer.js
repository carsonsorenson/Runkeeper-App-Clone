import {SET_ACTIVITY, START_ACTIVITY } from '../actions/currentActivityActions';

let initialState = {
    initialLatitude: null,
    initialLongitude: null,
    activity: null,
    initialWeather: null,
    duration: 0,
    distance: 0,
    pace: 0,
    time: 0,
    finalLatitude: null,
    finalLongitude: null,
    finalWeather: null,
    paused: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case START_ACTIVITY:
            return {
                ...initialState,
                initialLatitude: action.initialLatitude,
                initialLongitude: action.initialLongitude,
                activity: action.activity,
                initialWeather: action.weather
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