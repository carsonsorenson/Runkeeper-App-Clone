const uuid = require('uuid/v1');
const ADD_ACTIVITY = "ADD_ACTIVITY";

export {
    ADD_ACTIVITY
}

export function addActivity(newActivity) {
    newActivity.date = new Date();
    return {
        type: ADD_ACTIVITY,
        newActivity,
        id: uuid()
    }
}