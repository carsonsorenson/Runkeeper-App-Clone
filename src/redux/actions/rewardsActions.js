const UPDATE_BESTS = "UPDATE_BESTS";

export {
    UPDATE_BESTS
}

export function updateBests(newTime, newDistance, newPace, id) {
    console.log('time', newTime, 'distance', newDistance, 'pace', newPace);
    return {
        type: UPDATE_BESTS,
        newTime,
        newDistance,
        newPace,
        id
    }
}