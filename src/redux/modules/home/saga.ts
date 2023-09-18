import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_PRODUCT_DETAILS,
  GET_HOMESCREEN_PRODUCTS,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
  GENERATE_LINK_PAYPAL,
  SAVE_PAYPAL,
  DELETE_PRODUCT,
  SEARCH_STOCKX,
  SEARCH_PRODUCTS,
  GET_RECOMMENDED_SEARCH,
  REFRESH_STOCKX_DATA,
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
  getHomeScreenProductsCall,
  searchProductsCall,
  getRecommendedSearchCall,
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

export function* getHomeScreenProducts(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getHomeScreenProductsCall,
      action?.reqData,
    );
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack(e);
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
      yield put(fetchMarketDataSuccess(response.data));
    } else {
      action?.errorCallBack(response);
    }
  } catch (e) {
    action?.errorCallBack(e);
    console.log(e);
  }
}

export function* refreshStockxData(action: any) {
  try {
    const response: APIResponseProps = yield call(
      fetchMarketDataCall,
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

export function* searchProducts(action: any) {
  try {
    const response: APIResponseProps = yield call(
      searchProductsCall,
      action?.reqData,
    );
    if (response.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack(e);
    console.log(e);
  }
}

export function* getRecommendedSearch(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getRecommendedSearchCall,
      action?.reqData,
    );
    if (response.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack(e);
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(GET_PRODUCT_DETAILS.REQUEST, getSelectedProductDetails);
  yield takeLatest(GET_HOMESCREEN_PRODUCTS.REQUEST, getHomeScreenProducts);
  yield takeLatest(
    GET_PRODUCT_LISTED_ITEMS.REQUEST,
    getProductListedItemsForOffer,
  );
  yield takeLatest(SEND_TRADE_OFFER.REQUEST, sendTradeOffer);
  yield takeLatest(CREATE_NEW_PRODUCT.REQUEST, createNewProduct);
  yield takeLatest(FETCH_MARKET_DATA.REQUEST, fetchMarketData);
  yield takeLatest(REFRESH_STOCKX_DATA.REQUEST, refreshStockxData);
  yield takeLatest(GENERATE_LINK_PAYPAL.REQUEST, generateLinkPaypal);
  yield takeLatest(SAVE_PAYPAL.REQUEST, savePaypal);
  yield takeLatest(DELETE_PRODUCT.REQUEST, deleteProduct);
  yield takeLatest(SEARCH_STOCKX.REQUEST, searchStockx);
  yield takeLatest(SEARCH_PRODUCTS.REQUEST, searchProducts);
  yield takeLatest(GET_RECOMMENDED_SEARCH.REQUEST, getRecommendedSearch);
}
