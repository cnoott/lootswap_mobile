/***
INSQUAD - ROOT REDUCER CLASS - This class I created just for the structure
***/

import auth from '../modules/auth/reducer';
import loading from '../modules/loading/reducer';
import home from '../modules/home/reducer';
import message from '../modules/message/reducer';
import offers from '../modules/offers/reducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
  auth,
  loading,
  home,
  message,
  offers,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};
export default rootReducer;
