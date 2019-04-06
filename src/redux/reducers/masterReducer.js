import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import currentActivityReducer from './currentActivityReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
    locationReducer,
    currentActivityReducer,
    activitiesReducer
})