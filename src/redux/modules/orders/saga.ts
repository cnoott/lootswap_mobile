import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_ALL_ORDERS,
  GET_ORDER,
  SALE_GENERATE_CARRIER_RATES,
  CHECKOUT_RATE,
  GET_PAYPAL_ORDER,
  NEW_RATING,
  SET_FIRST_TIME_OPEN_FALSE,
  SET_ORDER_NOTIF_AS_READ,
  SET_PAYPAL_ORDER_NOTIF_AS_READ,
  CREATE_PAYPAL_ORDER,
} from '../../../constants/actions';
import {
  getAllOrdersCall,
  getOrderCall,
  getPaypalOrderCall,
  saleGenerateCarrierRatesCall,
  checkoutRateCall,
  newRatingCall,
  setFirstTimeOpenFalseCall,
  setOrderNotifAsReadCall,
  setPaypalOrderNotifAsReadCall,
  createPaypalOrderCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getAllOrdersSuccess,
  getAllOrdersFailure,
  setOrderNotifAsReadSuccess,
  setPaypalNotifAsReadSuccess,
} from '../orders/actions';

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

export function* newRating(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      newRatingCall,
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

export function* setFirstTimeOpenFalse(action: any) {
  try {
    const response: APIResponseProps = yield call(
      setFirstTimeOpenFalseCall,
      action?.reqData,
    );
    if (response?.success) {
      console.log('Successfully set first time open false');
    } else {
      console.log('Error first time open false');
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setOrderNotifAsRead(action: any) {
  try {
    const response: APIResponseProps = yield call(
      setOrderNotifAsReadCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(setOrderNotifAsReadSuccess(response.data));
    } else {
      console.log('Set order as read fail');
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setPaypalOrderNotifAsRead(action: any) {
  try {
    const response: APIResponseProps = yield call(
      setPaypalOrderNotifAsReadCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(setPaypalNotifAsReadSuccess(response.data));
    } else {
      console.log('Set order as read fail');
    }
  } catch (e) {
    console.log(e);
  }
}

export function* createPaypalOrder(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      createPaypalOrderCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack();
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
  yield takeLatest(NEW_RATING.REQUEST, newRating);
  yield takeLatest(SET_FIRST_TIME_OPEN_FALSE.REQUEST, setFirstTimeOpenFalse);
  yield takeLatest(SET_ORDER_NOTIF_AS_READ.REQUEST, setOrderNotifAsRead);
  yield takeLatest(
    SET_PAYPAL_ORDER_NOTIF_AS_READ.REQUEST,
    setPaypalOrderNotifAsRead,
  );
  yield takeLatest(CREATE_PAYPAL_ORDER.REQUEST, createPaypalOrder);
}
