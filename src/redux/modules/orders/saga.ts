import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_ALL_ORDERS,
  GET_ORDER,
  SALE_GENERATE_CARRIER_RATES,
  CHECKOUT_RATE,
  GET_PAYPAL_ORDER,
} from '../../../constants/actions';
import {
  getAllOrdersCall,
  getOrderCall,
  getPaypalOrderCall,
  saleGenerateCarrierRatesCall,
  checkoutRateCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {getAllOrdersSuccess, getAllOrdersFailure} from '../orders/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getAllOrders(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getAllOrdersCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getAllOrdersSuccess(response.data));
    } else {
      yield put(getAllOrdersFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getOrder(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getOrderCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* saleGenerateCarrierRates(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      saleGenerateCarrierRatesCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* checkoutRate(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      checkoutRateCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* getPaypalOrder(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getPaypalOrderCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response?.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export default function* ordersSaga() {
  yield takeLatest(GET_ALL_ORDERS.REQUEST, getAllOrders);
  yield takeLatest(GET_ORDER.REQUEST, getOrder);
  yield takeLatest(
    SALE_GENERATE_CARRIER_RATES.REQUEST,
    saleGenerateCarrierRates,
  );
  yield takeLatest(CHECKOUT_RATE.REQUEST, checkoutRate);
  yield takeLatest(GET_PAYPAL_ORDER.REQUEST, getPaypalOrder);
}
