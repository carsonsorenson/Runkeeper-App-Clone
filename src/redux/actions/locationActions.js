const SET_COORDS = "SET_COORDS";

export {
    SET_COORDS,
}

export function setCoords(lat, lon, elevation) {
    return {
        type: SET_COORDS,
        lat,
        lon,
        elevation
    }
}