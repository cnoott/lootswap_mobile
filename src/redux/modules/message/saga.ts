import {takeLatest, call, put} from 'redux-saga/effects';
import {
  GET_MESSAGE_INITIATED_STATUS,
  CREATE_FIRST_MESSAGE,
  SEND_MESSAGE,
  GET_MESSAGES_HISTORY,
  GET_ALL_MY_MESSAGES,
  JOIN_OR_LEAVE_CHANNEL,
} from '../../../constants/actions';
import {
  getMessageInitiatedstatusCall,
  createFirstMessageCall,
  sendMessageCall,
  getMessageHistoryCall,
  getAllMyMessagesCall,
  joinOrLeaveChannelCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {
  getMessagesHistorySuccess,
  getMessagesHistoryFailure,
  getAllMyMessagesSuccess,
  getAllMyMessagesFailure,
} from '../message/actions';
import {loggingService} from '../../../services/loggingService';

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
      console.log('res data', response.data);
      loggingService().logEvent('new_message', {
        id: response.data.messageId,
      });
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* sendMessage(action: any) {
  try {
    const response: APIResponseProps = yield call(
      sendMessageCall,
      action?.reqData,
    );
    if (response?.success) {
      console.log('message sent');
    } else {
      console.log('err sending message');
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* joinOrLeaveChannel(action: any) {
  try {
    const response: APIResponseProps = yield call(
      joinOrLeaveChannelCall,
      action?.reqData,
    );
    if (response?.success) {
      console.log('connected to channel');
    } else {
      console.log('err connecting to channel');
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}

export function* getMessageHistory(action: any) {
  if (action.showLoad) {
    yield put(LoadingRequest());
  }
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

export function* getAllMyMessage(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getAllMyMessagesCall,
      action?.userId,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getAllMyMessagesSuccess(response.data));
    } else {
      yield put(getAllMyMessagesFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* messageSaga() {
  yield takeLatest(
    GET_MESSAGE_INITIATED_STATUS.REQUEST,
    getMessageInitiatedstatus,
  );
  yield takeLatest(CREATE_FIRST_MESSAGE.REQUEST, createFirstMessage);
  yield takeLatest(SEND_MESSAGE.REQUEST, sendMessage);
  yield takeLatest(JOIN_OR_LEAVE_CHANNEL.REQUEST, joinOrLeaveChannel);
  yield takeLatest(GET_MESSAGES_HISTORY.REQUEST, getMessageHistory);
  yield takeLatest(GET_ALL_MY_MESSAGES.REQUEST, getAllMyMessage);
}
