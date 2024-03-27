import {
  GET_MESSAGE_INITIATED_STATUS,
  CREATE_FIRST_MESSAGE,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  GET_MESSAGES_HISTORY,
  CLEAR_MESSAGE_NOTIF,
  GET_ALL_MY_MESSAGES,
  JOIN_OR_LEAVE_CHANNEL,
} from '../../../constants/actions';

/**
 * TO get status of already messaged or not
 */
export const getMessageInitiatedStatus = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_MESSAGE_INITIATED_STATUS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const createFirstMessage = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CREATE_FIRST_MESSAGE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const sendMessage = (reqData: any) => {
  return {
    type: SEND_MESSAGE.REQUEST,
    reqData: reqData,
  };
};

export const joinOrLeaveChannel = (reqData: any) => {
  return {
    type: JOIN_OR_LEAVE_CHANNEL.REQUEST,
    reqData: reqData,
  };
};

export const receiveMessage = (newMessage: any) => {
  return {
    type: RECEIVE_MESSAGE.REQUEST,
    payload: newMessage,
  };
};

export const getMessagesHistory = (reqData: any, showLoad: Boolean = true) => {
  return {
    type: GET_MESSAGES_HISTORY.REQUEST,
    reqData: reqData,
    showLoad: showLoad,
  };
};

export const clearMessageNotif = (payload: any) => {
  return {
    type: CLEAR_MESSAGE_NOTIF.REQUEST,
    payload: payload,
  };
};

export const getMessagesHistorySuccess = (payload: any) => {
  return {
    type: GET_MESSAGES_HISTORY.SUCCESS,
    payload,
  };
};

export const getMessagesHistoryFailure = (error: any) => {
  return {
    type: GET_MESSAGES_HISTORY.FAILURE,
    error,
  };
};

export const getAllMyMessages = (userId: string) => {
  return {
    type: GET_ALL_MY_MESSAGES.REQUEST,
    userId: userId,
  };
};

export const getAllMyMessagesSuccess = (payload: any) => {
  return {
    type: GET_ALL_MY_MESSAGES.SUCCESS,
    payload,
  };
};

export const getAllMyMessagesFailure = (error: any) => {
  return {
    type: GET_ALL_MY_MESSAGES.FAILURE,
    error,
  };
};
