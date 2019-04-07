const SET_ACTIVITY = "SET_ACTIVITY";
const START_ACTIVITY = "START_ACTIVITY";
const UPDATE_POSITION = "UPDATE_POSITION";
const uuid = require('uuid/v1');

export {
    SET_ACTIVITY,
    START_ACTIVITY,
    UPDATE_POSITION
}

export function saveImage(image) {
    return {
        type: SET_ACTIVITY,
        payload: {
            image
        }
    }
}

export function finalWeather(weather) {
    let finalWeather = {
        description: weather.description,
        icon: weather.getIcon(),
        temp: weather.temp
    }
    return {
        type: SET_ACTIVITY,
        payload: {
            finalWeather
        }
    }
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

export function updatePosition(latitude, longitude) {
    let position = {
        latitude,
        longitude
    }
    return {
        type: UPDATE_POSITION,
        position
    }
}

export function initializeActivity(initialLatitude, initialLongitude, activity, w) {
    let weather = {
        description: w.description,
        icon: w.getIcon(),
        temp: w.temp
    }
    let position = {
        latitude: initialLatitude,
        longitude: initialLongitude
    }
    return {
        type: START_ACTIVITY,
        position,
        activity,
        weather,
        id: uuid()
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
