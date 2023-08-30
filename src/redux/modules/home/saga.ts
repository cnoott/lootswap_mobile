import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
  GENERATE_LINK_PAYPAL,
  SAVE_PAYPAL,
  DELETE_PRODUCT,
  SEARCH_STOCKX,
} from '../../../constants/actions';
import {
  getProductDetailsSuccess,
  getProductDetailsFailure,
  createNewProductSuccess,
  fetchMarketDataSuccess,
  fetchMarketDataFailure,
  createNewProductFailure,
  resetAddProductData,
} from './actions';
import {
  getRequestedProductDetailsCall,
  getProductListedItemsForOfferCall,
  sendTradeOfferCall,
  createNewProductCall,
  fetchMarketDataCall,
  updateProductCall,
  generateLinkPaypalCall,
  savePaypalCall,
  deleteProductCall,
  searchStockxCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {Alert} from 'custom_top_alert';
import {resetRoute} from '../../../navigation/navigationHelper';

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

export function* getProductListedItemsForOffer(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getProductListedItemsForOfferCall,
      action?.userId,
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

export function* sendTradeOffer(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      sendTradeOfferCall,
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

export function* createNewProduct(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      action?.isUpdateCall ? updateProductCall : createNewProductCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      if (!action?.isUpdateCall) {
        action?.successCallBack();
        yield put(resetAddProductData());
      }
      Alert.showSuccess(
        action?.isUpdateCall
          ? 'Product updated successfully..'
          : 'Product added successfully..',
      );
      yield put(createNewProductSuccess());
    } else {
      yield put(createNewProductFailure());
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* fetchMarketData(action: any) {
  try {
    const response: APIResponseProps = yield call(
      fetchMarketDataCall,
      action?.reqData,
    );
    if (response.success) {
      yield put(fetchMarketDataSuccess());
    } else {
      action?.errorCallBack();
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* generateLinkPaypal(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      generateLinkPaypalCall,
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

export function* savePaypal(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      savePaypalCall,
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

export function* deleteProduct(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      deleteProductCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
      resetRoute();
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* searchStockx(action: any) {
  //TODO: handle loading
  try {
    const response: APIResponseProps = yield call(
      searchStockxCall,
      action?.reqData,
    );
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

export default function* authSaga() {
  yield takeLatest(GET_PRODUCT_DETAILS.REQUEST, getSelectedProductDetails);
  yield takeLatest(
    GET_PRODUCT_LISTED_ITEMS.REQUEST,
    getProductListedItemsForOffer,
  );
  yield takeLatest(SEND_TRADE_OFFER.REQUEST, sendTradeOffer);
  yield takeLatest(CREATE_NEW_PRODUCT.REQUEST, createNewProduct);
  yield takeLatest(GENERATE_LINK_PAYPAL.REQUEST, generateLinkPaypal);
  yield takeLatest(SAVE_PAYPAL.REQUEST, savePaypal);
  yield takeLatest(DELETE_PRODUCT.REQUEST, deleteProduct);
  yield takeLatest(SEARCH_STOCKX.REQUEST, searchStockx);
}
