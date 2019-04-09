const ADD_ACTIVITY = "ADD_ACTIVITY";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";
const SET_ACTIVITIES = "SET_ACTIVITIES";

export {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    SET_ACTIVITIES
}

export function setActivites(activites) {
    return {
        type: SET_ACTIVITIES,
        activites
    }
}

export function addActivity(newActivity) {
    newActivity.date = new Date();
    return {
        type: ADD_ACTIVITY,
        newActivity
    }
}

export function deleteActivity(id) {
    return {
        type: DELETE_ACTIVITY,
        id
    }
}