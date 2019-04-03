const GET_ACTIVITY = "GET_ACTIVITY";
const SET_ACTIVITY = "SET_ACTIVITY";
const START_ACTIVITY = "START_ACTIVITY";

export {
    GET_ACTIVITY,
    SET_ACTIVITY,
    START_ACTIVITY,
}

export function getActivity() {
    return {
        type: GET_ACTIVITY
    }
}

export function initializeActivity(initialLatitude, initialLongitude, activity) {
    return {
        type: START_ACTIVITY,
        initialLatitude,
        initialLongitude,
        activity
    }
}

export function updateDistance(distance) {
    return {
        type: SET_ACTIVITY,
        payload: {
            distance
        }
    }
}

export function pause(isPaused) {
    return {
        type: SET_ACTIVITY,
        payload: {
            paused: !isPaused
        }
    }
}

export function updatePace(pace) {
    return {
        type: SET_ACTIVITY,
        payload: {
            pace
        }
    }
}
