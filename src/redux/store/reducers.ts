/***
INSQUAD - ROOT REDUCER CLASS - This class I created just for the structure
***/

import auth from '../modules/auth/reducer';
import loading from '../modules/loading/reducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
  auth,
  loading,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export default rootReducer;
