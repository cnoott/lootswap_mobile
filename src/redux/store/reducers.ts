/***
INSQUAD - ROOT REDUCER CLASS - This class I created just for the structure
***/

import wallet from '../modules/wallet/reducer';
import auth from '../modules/auth/reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  wallet,
  auth,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export default rootReducer;
