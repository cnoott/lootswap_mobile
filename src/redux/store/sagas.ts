/***
INSQUAD - ROOT SAGA CLASS - This class I created just for the structure
***/

import authSaga from '../modules/auth/saga';
import homeSaga from '../modules/home/saga';
import messageSaga from '../modules/message/saga';
import offersSaga from '../modules/offers/saga';
import {spawn} from 'redux-saga/effects';

function* sagas() {
  yield spawn(authSaga);
  yield spawn(homeSaga);
  yield spawn(messageSaga);
  yield spawn(offersSaga);
}

export default sagas;
