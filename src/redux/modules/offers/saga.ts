import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_TRADES_HISTORY,
  GET_TRADE,
  GET_TRADE_STOCKX,
  ACCEPT_TRADE_CHECKOUT,
  ACCEPT_MONEY_OFFER_TRADE,
  CANCEL_TRADE,
  ADD_ITEMS,
  REMOVE_ITEMS,
  CHANGE_MONEY_OFFER,
  START_TRADE_CHECKOUT,
  START_MONEY_OFFER_TRADE,
  EDIT_TRADE_CHECKOUT,
  UNDO_TRADE_CHECKOUT,
  PUBLIC_OFFER_CHECKOUT,
  GET_PUBLIC_OFFERS,
  ACCEPT_PUBLIC_OFFER,
  DELETE_PUBLIC_OFFER,
  SEND_TRADE_MESSAGE,
} from '../../../constants/actions';
import {
  startTradeCheckoutCall,
  startMoneyOfferTradeCall,
  undoTradeCheckoutCall,
  getTradesHistoryCall,
  getTradeCall,
  getTradeWithStockxCall,
  acceptTradeCheckoutCall,
  editTradeCheckoutCall,
  acceptMoneyOfferTradeCall,
  cancelTradeCall,
  addItemsCall,
  removeItemsCall,
  changeMoneyOfferCall,
  publicOfferCheckoutCall,
  getPublicOffersCall,
  acceptPublicOfferCall,
  deletePublicOfferCall,
  sendTradeMessageCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getTradesHistorySuccess,
  getTradesHistoryFailure,
  getTradeSuccess,
  getTradeFailure,
  getTradeStockxSuccess,
  getTradeStockxFailure,
} from '../offers/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getTradesHistory(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getTradesHistoryCall,
      action?.reqData,
    );
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

export function* startMoneyOfferTrade(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      startMoneyOfferTradeCall,
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

export function* editTradeCheckout(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      editTradeCheckoutCall,
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

export function* undoTradeCheckout(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      undoTradeCheckoutCall,
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
  if (action.showLoad) {
    yield put(LoadingRequest());
  }
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

export function* getTradeStockx(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getTradeWithStockxCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getTradeStockxSuccess(response.data));
    } else {
      yield put(getTradeStockxFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* acceptTradeCheckout(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      acceptTradeCheckoutCall,
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

export function* publicOfferCheckout(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      publicOfferCheckoutCall,
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

export function* acceptPublicOffer(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      acceptPublicOfferCall,
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

export function* getPublicOffers(action: any) {
  if (action?.reqData?.showLoad) {
    yield put(LoadingRequest());
  }
  try {
    const response: APIResponseProps = yield call(
      getPublicOffersCall,
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

export function* deletePublicOffer(action: any) {
  try {
    const response: APIResponseProps = yield call(
      deletePublicOfferCall,
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

export function* sendTradeMessage(action: any) {
  try {
    const response: APIResponseProps = yield call(
      sendTradeMessageCall,
      action?.reqData,
    );
    if (response?.success) {
      console.log('message sent');
    } else {
      console.log('err sending message');
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export default function* offersSaga() {
  yield takeLatest(GET_TRADES_HISTORY.REQUEST, getTradesHistory);
  yield takeLatest(GET_TRADE.REQUEST, getTrade);
  yield takeLatest(GET_TRADE_STOCKX.REQUEST, getTradeStockx);
  yield takeLatest(ACCEPT_TRADE_CHECKOUT.REQUEST, acceptTradeCheckout);
  yield takeLatest(START_TRADE_CHECKOUT.REQUEST, startTradeCheckout);
  yield takeLatest(START_MONEY_OFFER_TRADE.REQUEST, startMoneyOfferTrade);
  yield takeLatest(EDIT_TRADE_CHECKOUT.REQUEST, editTradeCheckout);
  yield takeLatest(UNDO_TRADE_CHECKOUT.REQUEST, undoTradeCheckout);
  yield takeLatest(ACCEPT_MONEY_OFFER_TRADE.REQUEST, acceptMoneyOfferTrade);
  yield takeLatest(CANCEL_TRADE.REQUEST, cancelTrade);
  yield takeLatest(ADD_ITEMS.REQUEST, addItems);
  yield takeLatest(REMOVE_ITEMS.REQUEST, removeItems);
  yield takeLatest(CHANGE_MONEY_OFFER.REQUEST, changeMoneyOffer);
  yield takeLatest(PUBLIC_OFFER_CHECKOUT.REQUEST, publicOfferCheckout);
  yield takeLatest(ACCEPT_PUBLIC_OFFER.REQUEST, acceptPublicOffer);
  yield takeLatest(GET_PUBLIC_OFFERS.REQUEST, getPublicOffers);
  yield takeLatest(DELETE_PUBLIC_OFFER.REQUEST, deletePublicOffer);
  yield takeLatest(SEND_TRADE_MESSAGE.REQUEST, sendTradeMessage);
}
