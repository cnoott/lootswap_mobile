import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_TRADES_HISTORY,
  GET_TRADE,
  ACCEPT_TRADE,
  ACCEPT_MONEY_OFFER_TRADE,
  CANCEL_TRADE,
  ADD_ITEMS,
  REMOVE_ITEMS,
  CHANGE_MONEY_OFFER,
  GET_TRADE_SHIPPING_RATES,
  FETCH_PAYMENT_SHEET,
  START_TRADE_CHECKOUT,
} from '../../../constants/actions';
import {
  startTradeCheckoutCall,
  getTradesHistoryCall,
  getTradeCall,
  acceptTradeCall,
  acceptMoneyOfferTradeCall,
  cancelTradeCall,
  addItemsCall,
  removeItemsCall,
  changeMoneyOfferCall,
  getTradeShippingRatesCall,
  fetchPaymentSheetCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getTradesHistorySuccess,
  getTradesHistoryFailure,
  getTradeSuccess,
  getTradeFailure,
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
    } else {
      yield put(getTradesHistoryFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* startTradeCheckout(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      startTradeCheckoutCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getTrade(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getTradeCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getTradeSuccess(response.data));
    } else {
      yield put(getTradeFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* acceptTrade(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      acceptTradeCall,
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

export function* acceptMoneyOfferTrade(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      acceptMoneyOfferTradeCall,
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

export function* cancelTrade(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      cancelTradeCall,
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

export function* addItems(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      addItemsCall,
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

export function* removeItems(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      removeItemsCall,
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

export function* changeMoneyOffer(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      changeMoneyOfferCall,
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

export function* getTradeShippingRates(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getTradeShippingRatesCall,
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

export function* fetchPaymentSheet(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      fetchPaymentSheetCall,
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

export default function* offersSaga() {
  yield takeLatest(GET_TRADES_HISTORY.REQUEST, getTradesHistory);
  yield takeLatest(GET_TRADE.REQUEST, getTrade);
  yield takeLatest(ACCEPT_TRADE.REQUEST, acceptTrade);
  yield takeLatest(START_TRADE_CHECKOUT.REQUEST, startTradeCheckout);
  yield takeLatest(ACCEPT_MONEY_OFFER_TRADE.REQUEST, acceptMoneyOfferTrade);
  yield takeLatest(CANCEL_TRADE.REQUEST, cancelTrade);
  yield takeLatest(ADD_ITEMS.REQUEST, addItems);
  yield takeLatest(REMOVE_ITEMS.REQUEST, removeItems);
  yield takeLatest(CHANGE_MONEY_OFFER.REQUEST, changeMoneyOffer);
  yield takeLatest(GET_TRADE_SHIPPING_RATES.REQUEST, getTradeShippingRates);
  yield takeLatest(FETCH_PAYMENT_SHEET.REQUEST, fetchPaymentSheet);
}
