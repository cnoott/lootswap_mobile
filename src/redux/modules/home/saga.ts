import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
  GENERATE_LINK_PAYPAL,
  SAVE_PAYPAL,
} from '../../../constants/actions';
import {
  getProductDetailsSuccess,
  getProductDetailsFailure,
  createNewProductSuccess,
  createNewProductFailure,
  resetAddProductData,
} from './actions';
import {
  getRequestedProductDetailsCall,
  getProductListedItemsForOfferCall,
  sendTradeOfferCall,
  createNewProductCall,
  updateProductCall,
  generateLinkPaypalCall,
  savePaypalCall,
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
      action?.isUpdateCall ? updateProductCall : createNewProductCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      Alert.showSuccess(
        action?.isUpdateCall
          ? 'Product updated successfully..'
          : 'Product added successfully..',
      );
      yield put(createNewProductSuccess());
      yield put(resetAddProductData());
      resetRoute();
    } else {
      yield put(createNewProductFailure());
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
      action?.errorCallBack(action.error);
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
      action?.errorCallBack(action.error);
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
}
