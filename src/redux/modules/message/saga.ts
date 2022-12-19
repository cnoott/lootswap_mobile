import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_MESSAGE_INITIATED_STATUS,
  CREATE_FIRST_MESSAGE,
  GET_MESSAGES_HISTORY,
  SAVE_SENT_MESSAGE,
} from '../../../constants/actions';
import {
  getMessageInitiatedstatusCall,
  createFirstMessageCall,
  getMessageHistoryCall,
  saveSentMessageCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getMessagesHistorySuccess,
  getMessagesHistoryFailure,
} from '../message/actions';

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
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
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
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* getMessageHistory(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getMessageHistoryCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getMessagesHistorySuccess(response.data));
    } else {
      yield put(getMessagesHistoryFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saveSentMessage(action: any) {
  try {
    const response: APIResponseProps = yield call(
      saveSentMessageCall,
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

export default function* messageSaga() {
  yield takeLatest(
    GET_MESSAGE_INITIATED_STATUS.REQUEST,
    getMessageInitiatedstatus,
  );
  yield takeLatest(CREATE_FIRST_MESSAGE.REQUEST, createFirstMessage);
  yield takeLatest(GET_MESSAGES_HISTORY.REQUEST, getMessageHistory);
  yield takeLatest(SAVE_SENT_MESSAGE.REQUEST, saveSentMessage);
}
