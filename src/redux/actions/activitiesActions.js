const ADD_ACTIVITY = "ADD_ACTIVITY";
const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export {
    ADD_ACTIVITY,
    DELETE_ACTIVITY
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