import {takeLatest, call, put} from 'redux-saga/effects';
import {FILTER_PRODUCTS} from '../../../constants/actions';
import {filterProductsCall} from '../../../services/apiEndpoints';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

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
  yield takeLatest(FILTER_PRODUCTS.REQUEST, filterProducts);
}
