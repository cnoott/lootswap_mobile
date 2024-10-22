import {
  GET_TRADES_HISTORY,
  CLEAR_TRADE_NOTIF,
  GET_TRADE,
  GET_TRADE_STOCKX,
  ACCEPT_TRADE_CHECKOUT,
  CANCEL_TRADE,
  ADD_ITEMS,
  REMOVE_ITEMS,
  CHANGE_MONEY_OFFER,
  ACCEPT_MONEY_OFFER_TRADE,
  START_TRADE_CHECKOUT,
  START_MONEY_OFFER_TRADE,
  EDIT_TRADE_CHECKOUT,
  PUBLIC_OFFER_CHECKOUT,
  GET_PUBLIC_OFFERS,
  ACCEPT_PUBLIC_OFFER,
  DELETE_PUBLIC_OFFER,
  SEND_TRADE_MESSAGE,
  RECEIVE_TRADE_MESSAGE,
  ARCHIVE_TRADE,
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

export const getTrade = (reqData: any, showLoad: Boolean = true) => {
  return {
    type: GET_TRADE.REQUEST,
    reqData: reqData,
    showLoad: showLoad,
  };
};

export const clearTradeNotif = (payload: any) => {
  return {
    type: CLEAR_TRADE_NOTIF.REQUEST,
    payload: payload,
  };
};
export const sendTradeMessage = (reqData: any) => {
  return {
    type: SEND_TRADE_MESSAGE.REQUEST,
    reqData: reqData,
  };
};

export const receiveTradeMessage = (newMessage: any) => {
  return {
    type: RECEIVE_TRADE_MESSAGE.REQUEST,
    payload: newMessage,
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

export const getTradeStockx = (reqData: any) => {
  return {
    type: GET_TRADE_STOCKX.REQUEST,
    reqData: reqData,
  };
};

export const getTradeStockxSuccess = (payload: any) => {
  return {
    type: GET_TRADE_STOCKX.SUCCESS,
    payload,
  };
};

export const getTradeStockxFailure = (error: any) => {
  return {
    type: GET_TRADE_STOCKX.FAILURE,
    error,
  };
};

export const acceptTradeSuccess = (payload: any) => {
  return {
    type: ACCEPT_TRADE_CHECKOUT.SUCCESS,
    payload,
  };
};

export const acceptTradeFailure = (error: any) => {
  return {
    type: ACCEPT_TRADE_CHECKOUT.FAILURE,
    error,
  };
};

export const startTradeCheckout = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: START_TRADE_CHECKOUT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const startMoneyOfferTrade = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: START_MONEY_OFFER_TRADE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const editTradeCheckout = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: EDIT_TRADE_CHECKOUT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const undoTradeCheckout = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: START_TRADE_CHECKOUT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const acceptTradeCheckout = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ACCEPT_TRADE_CHECKOUT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const acceptMoneyOfferTrade = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ACCEPT_MONEY_OFFER_TRADE.REQUEST,
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

export const publicOfferCheckout = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: PUBLIC_OFFER_CHECKOUT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const acceptPublicOffer = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ACCEPT_PUBLIC_OFFER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getPublicOffers = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_PUBLIC_OFFERS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const deletePublicOffer = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: DELETE_PUBLIC_OFFER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const archiveTrade = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: ARCHIVE_TRADE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
