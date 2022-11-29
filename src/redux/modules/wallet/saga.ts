/*
import { takeLatest, call, put } from 'redux-saga/effects';
import { WALLET_DATA } from '../../../constants/actions';
import { App_Service } from '../../../services';
import {
  walletDataSuccess,
  walletDataFailure,
} from './actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getWalletData() {
  try {
    const response: APIResponseProps = yield call(App_Service, {
      endPoint: '/wallet',
      method: 'GET',
    });

    if (response.success) {
      yield put(walletDataSuccess(response.data));
    } else {
      yield put(walletDataFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}
*/

export default function* walletSaga() {
  //yield takeLatest(WALLET_DATA.REQUEST, getWalletData);
}
