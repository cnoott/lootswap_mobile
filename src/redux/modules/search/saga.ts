import {takeLatest, call, put} from 'redux-saga/effects';
import {
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
} from '../../../constants/actions';
import {
  searchProductsSuccess,
  searchProductsFailure,
} from './actions';
import {filterProductsCall, searchProductsCall} from '../../../services/apiEndpoints';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* searchProducts(action: any) {
  try {
    const response: APIResponseProps = yield call(
      searchProductsCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(searchProductsSuccess(response.data));
    } else {
      yield put(searchProductsFailure());
    }
  } catch (err) {
    console.log(err);
  }
}

export function* filterProducts(action: any) {
  try {
    const response: APIResponseProps = yield call(
      filterProductsCall,
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

export default function* searchSaga() {
  yield takeLatest(SEARCH_PRODUCTS.REQUEST, searchProducts);
  yield takeLatest(FILTER_PRODUCTS.REQUEST, filterProducts);
}
