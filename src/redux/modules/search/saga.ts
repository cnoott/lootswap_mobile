import {takeLatest, call, put} from 'redux-saga/effects';
import {
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
  GET_AVALIABLE_SIZES,
} from '../../../constants/actions';
import {
  searchProductsSuccess,
  searchProductsFailure,
  filterProductsSuccess,
  filterProductsFailure,
  getAvaliableSizesSuccess,
  getAvaliableSizesFailure,
} from './actions';
import {
  filterProductsCall,
  searchProductsCall,
  getAvaliableSizesCall,
} from '../../../services/apiEndpoints';

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
export default function* searchSaga() {
  yield takeLatest(SEARCH_PRODUCTS.REQUEST, searchProducts);
  yield takeLatest(FILTER_PRODUCTS.REQUEST, filterProducts);
  yield takeLatest(GET_AVALIABLE_SIZES.REQUEST, getAvaliableSizes);
}
