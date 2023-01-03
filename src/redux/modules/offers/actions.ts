import {GET_TRADES_HISTORY} from '../../../constants/actions';

export const getTradesHistory = (reqData: any) => {
  return {
    type: GET_TRADES_HISTORY.REQUEST,
    reqData: reqData,
  };
};

export const getTradesHistorySuccess = (payload: any) => {
  return {
    type: GET_TRADES_HISTORY.SUCCESS,
    payload,
  };
};

export const getTradesHistoryFailure = (error: any) => {
  return {
    type: GET_TRADES_HISTORY.FAILURE,
    error,
  };
};
