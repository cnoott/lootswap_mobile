/***
INSQUAD - ROOT SAGA CLASS - This class I created just for the structure
***/

import authSaga from '../modules/auth/saga';
import homeSaga from '../modules/home/saga';
import {spawn} from 'redux-saga/effects';

function* sagas() {
  yield spawn(authSaga);
  yield spawn(homeSaga);
}

export default sagas;
