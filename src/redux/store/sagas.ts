/***
INSQUAD - ROOT SAGA CLASS - This class I created just for the structure
***/

import walletSaga from '../modules/wallet/saga';
import authSaga from '../modules/auth/saga';
import { spawn } from 'redux-saga/effects';

function* sagas() {
  yield spawn(walletSaga);
  yield spawn(authSaga);
}

export default sagas;
