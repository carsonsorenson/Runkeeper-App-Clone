const SET_COORDS = "SET_COORDS";

export {
    SET_COORDS,
}

export function setCoords(lat, lon) {
    return {
        type: SET_COORDS,
        lat,
        lon
    }
}