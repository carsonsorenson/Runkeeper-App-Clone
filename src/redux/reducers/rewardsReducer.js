import { UPDATE_BESTS } from '../actions/rewardsActions';

let initialState = {
    time: {
        best: 0,
        id: null
    },
    distance: {
        best: 0,
        id: null
    },
    pace: {
        best: Infinity,
        id: null
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_BESTS:
            return {
                ...state,
                time: action.newTime > state.time.best ? { best: action.newTime, id: action.id} : state.time,
                distance: action.newDistance > state.distance.best ? { best: action.newDistance, id: action.id } : state.distance,
                pace: action.newPace < state.pace.best && action.newPace !== 0 ? { best: action.newPace, id: action.id } : state.pace
            }
        default:
            return state;
    }
}