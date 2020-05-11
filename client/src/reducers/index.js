// Root reducer is to Bring together all the other reducers. Item is all we have, but if we were to add auth and errors,
//     would need more reducers.

import { combineReducers } from "redux";
import itemReducer from './itemReducer';
import errorReducer from './errReducer';
import authReducer from './authReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
});