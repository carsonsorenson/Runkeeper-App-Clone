import { combineReducers } from 'redux';

import locationReducer from './locationReducer';
import currentActivityReducer from './currentActivityReducer';

export default combineReducers({
    locationReducer,
    currentActivityReducer
})