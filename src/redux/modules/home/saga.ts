import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
} from '../../../constants/actions';
import {
  getProductDetailsSuccess,
  getProductDetailsFailure,
  createNewProductSuccess,
  createNewProductFailure,
} from './actions';
import {
  getRequestedProductDetailsCall,
  getProductListedItemsForOfferCall,
  sendTradeOfferCall,
  createNewProductCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {resetRoute} from '../../../navigation/navigationHelper';
import {Alert} from 'custom_top_alert';

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
      createNewProductCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      Alert.showSuccess('Product added successfully..');
      yield put(createNewProductSuccess());
      resetRoute();
    } else {
      yield put(createNewProductFailure());
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
}
