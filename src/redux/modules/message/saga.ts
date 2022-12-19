import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_MESSAGE_INITIATED_STATUS,
  CREATE_FIRST_MESSAGE,
} from '../../../constants/actions';
import {
  getMessageInitiatedstatusCall,
  createFirstMessageCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

export function* getMessageInitiatedstatus(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getMessageInitiatedstatusCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack();
    } else {
      action?.errorCallBack();
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* createFirstMessage(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      createFirstMessageCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack();
    } else {
      action?.errorCallBack();
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export default function* messageSaga() {
  yield takeLatest(
    GET_MESSAGE_INITIATED_STATUS.REQUEST,
    getMessageInitiatedstatus,
  );
  yield takeLatest(CREATE_FIRST_MESSAGE.REQUEST, createFirstMessage);
}
