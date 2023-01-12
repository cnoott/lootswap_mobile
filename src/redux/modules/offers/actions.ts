import {
  GET_TRADES_HISTORY,
  GET_TRADE,
  ACCEPT_TRADE,
  CANCEL_TRADE,
  ADD_ITEMS,
  REMOVE_ITEMS,
  CHANGE_MONEY_OFFER,
} from '../../../constants/actions';

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

export const acceptTradeSuccess = (payload: any) => {
  return {
    type: ACCEPT_TRADE.SUCCESS,
    payload,
  };
};

export const acceptTradeFailure = (error: any) => {
  return {
    type: ACCEPT_TRADE.FAILURE,
    error,
  };
};

export const acceptTrade = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ACCEPT_TRADE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const cancelTrade = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CANCEL_TRADE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const addItems = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ADD_ITEMS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const removeItems = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: REMOVE_ITEMS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const changeMoneyOffer = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CHANGE_MONEY_OFFER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
