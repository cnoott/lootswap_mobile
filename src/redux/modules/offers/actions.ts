import {GET_TRADES_HISTORY, GET_TRADE} from '../../../constants/actions';

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

export const getTrade = (reqData: any) => {
  return {
    type: GET_TRADE.REQUEST,
    reqData: reqData,
  };
};

export const getTradeSuccess = (payload: any) => {
  return {
    type: GET_TRADE.SUCCESS,
    payload,
  };
};

export const getTradeFailure = (error: any) => {
  return {
    type: GET_TRADE.FAILURE,
    error,
  };
};
