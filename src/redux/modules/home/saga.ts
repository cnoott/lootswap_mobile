import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_PRODUCT_DETAILS,
  GET_MESSAGE_INITIATED_STATUS,
} from '../../../constants/actions';
import {getProductDetailsSuccess, getProductDetailsFailure} from './actions';
import {getRequestedProductDetailsCall} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getSelectedProductDetails(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getRequestedProductDetailsCall,
      action?.productId,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getProductDetailsSuccess(response.data));
    } else {
      yield put(getProductDetailsFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getMessageInitiatedstatus(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getRequestedProductDetailsCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack();
    } else {
      action?.errorCallBack();
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(GET_PRODUCT_DETAILS.REQUEST, getSelectedProductDetails);
  yield takeLatest(
    GET_MESSAGE_INITIATED_STATUS.REQUEST,
    getMessageInitiatedstatus,
  );
}
