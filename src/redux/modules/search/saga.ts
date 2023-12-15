import {takeLatest, call, put} from 'redux-saga/effects';
import {
  FILTER_PRODUCTS,
  GET_AVALIABLE_SIZES,
  FETCH_RELATED_ITEM_DATA,
} from '../../../constants/actions';
import {
  filterProductsSuccess,
  filterProductsFailure,
  getAvaliableSizesSuccess,
  getAvaliableSizesFailure,
} from './actions';
import {
  filterProductsCall,
  getAvaliableSizesCall,
  fetchRelatedItemDataCall,
} from '../../../services/apiEndpoints';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* filterProducts(action: any) {
  try {
    // I should've seperated the reducer filters with the reducer
    // search results but since I didnt, I have to make the search
    // results undefined otherwise the request size will grow with
    //the total amount of search results, resulting in a
    // REQ SIZE TOO LARGE err.
    action.reqData.searchProducts = null;
    action.reqData.stockxProducts = null;

    const response: APIResponseProps = yield call(
      filterProductsCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(filterProductsSuccess(response.data));
    } else {
      yield put(filterProductsFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getAvaliableSizes() {
  try {
    const response: APIResponseProps = yield call(getAvaliableSizesCall);
    if (response?.success) {
      yield put(getAvaliableSizesSuccess(response.data));
    } else {
      yield put(getAvaliableSizesFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* fetchRelatedItemData(action: any) {
  try {
    const response: APIResponseProps = yield call(
      fetchRelatedItemDataCall,
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

export default function* searchSaga() {
  yield takeLatest(FILTER_PRODUCTS.REQUEST, filterProducts);
  yield takeLatest(GET_AVALIABLE_SIZES.REQUEST, getAvaliableSizes);
  yield takeLatest(FETCH_RELATED_ITEM_DATA.REQUEST, fetchRelatedItemData);
}
