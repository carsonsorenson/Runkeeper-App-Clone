import { SET_COORDS } from '../actions/locationActions';

let initialState = {
    latitude: null,
    longitude: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_COORDS:
            return {
                ...state,
                latitude: action.lat,
                longitude: action.lon
            }
        default:
            return state;
    }
}