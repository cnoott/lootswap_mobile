import {
  GET_MESSAGE_INITIATED_STATUS,
  CREATE_FIRST_MESSAGE,
  GET_MESSAGES_HISTORY,
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

export const getMessagesHistory = (reqData: any) => {
  return {
    type: GET_MESSAGES_HISTORY.REQUEST,
    reqData: reqData,
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
