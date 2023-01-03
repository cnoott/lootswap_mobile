import {takeLatest, call, put} from 'redux-saga/effects';
import {GET_TRADES_HISTORY} from '../../../constants/actions';
import {getTradesHistoryCall} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getTradesHistorySuccess,
  getTradesHistoryFailure,
} from '../offers/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getTradesHistory(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getTradesHistoryCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getTradesHistorySuccess(response.data));
    }
    else {
      yield put(getTradesHistoryFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* offersSaga() {
  yield takeLatest(GET_TRADES_HISTORY.REQUEST, getTradesHistory);
}
