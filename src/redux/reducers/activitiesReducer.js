let initialState = []

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state
            }
        case ADD_ACTIVITY:
            return {
                state: [...state, action.newActivity]
            }
        default:
            return state;
    }
}