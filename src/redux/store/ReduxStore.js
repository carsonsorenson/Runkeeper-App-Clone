import { createStore } from 'redux';
import masterReducer from '../reducers/masterReducer';

const store = createStore(masterReducer);
export default store;