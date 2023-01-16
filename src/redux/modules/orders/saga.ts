import {takeLatest, call, put} from 'redux-saga/effects';
import {GET_ALL_ORDERS} from '../../../constants/actions';
import {getAllOrdersCall} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {getAllOrdersSuccess, getAllOrdersFailure} from '../orders/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getAllOrders(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getAllOrdersCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getAllOrdersSuccess(response.data));
    } else {
      yield put(getAllOrdersFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* ordersSaga() {
  yield takeLatest(GET_ALL_ORDERS.REQUEST, getAllOrders);
}
