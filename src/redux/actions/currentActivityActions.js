const SET_ACTIVITY = "SET_ACTIVITY";
const START_ACTIVITY = "START_ACTIVITY";

export {
    SET_ACTIVITY,
    START_ACTIVITY,
}

export function setFeeling(feeling) {
    return {
        type: SET_ACTIVITY,
        payload: {
            feeling
        }
    }
}

export function updateTime(time) {
    return {
        type: SET_ACTIVITY,
        payload: {
            time
        }
    }
}

export function finalPosition(finalLatitude, finalLongitude) {
    return {
        type: SET_ACTIVITY,
        payload: {
            finalLatitude,
            finalLongitude
        }
    }
}

export function initializeActivity(initialLatitude, initialLongitude, activity, weather) {
    return {
        type: START_ACTIVITY,
        initialLatitude,
        initialLongitude,
        activity,
        weather
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
