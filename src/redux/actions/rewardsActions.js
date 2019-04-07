const UPDATE_BESTS = "UPDATE_BESTS";

export {
    UPDATE_BESTS
}

export function updateBests(newTime, newDistance, newPace, id) {
    return {
        type: UPDATE_BESTS,
        newTime,
        newDistance,
        newPace,
        id
    }
}