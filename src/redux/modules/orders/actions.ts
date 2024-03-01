import {
  GET_ALL_ORDERS,
  GET_ORDER,
  SALE_GENERATE_CARRIER_RATES,
  CHECKOUT_RATE,
  GET_PAYPAL_ORDER,
  NEW_RATING,
  SET_FIRST_TIME_OPEN_FALSE,
  SET_ORDER_NOTIF_AS_READ,
  SET_PAYPAL_ORDER_NOTIF_AS_READ,
  CREATE_PAYPAL_ORDER,
} from '../../../constants/actions';

export const getAllOrders = (reqData: any) => {
  return {
    type: GET_ALL_ORDERS.REQUEST,
    reqData: reqData,
  };
};

export const getOrder = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_ORDER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getPaypalOrder = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_PAYPAL_ORDER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getAllOrdersSuccess = (payload: any) => {
  return {
    type: GET_ALL_ORDERS.SUCCESS,
    payload,
  };
};

export const getAllOrdersFailure = (error: any) => {
  return {
    type: GET_ALL_ORDERS.FAILURE,
    error,
  };
};

export const saleGenerateCarrierRates = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: SALE_GENERATE_CARRIER_RATES.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const checkoutRate = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CHECKOUT_RATE.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const newRating = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: NEW_RATING.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const setFirstTimeOpenFalseRequest = (reqData: any) => {
  return {
    type: SET_FIRST_TIME_OPEN_FALSE.REQUEST,
    reqData: reqData,
  };
};

export const setOrderNotifAsReadRequest = (reqData: any) => {
  return {
    type: SET_ORDER_NOTIF_AS_READ.REQUEST,
    reqData: reqData,
  };
};

export const setOrderNotifAsReadSuccess = (payload: any) => {
  return {
    type: SET_ORDER_NOTIF_AS_READ.SUCCESS,
    payload: payload,
  };
};

export const setPaypalNotifAsReadRequest = (reqData: any) => {
  return {
    type: SET_PAYPAL_ORDER_NOTIF_AS_READ.REQUEST,
    reqData: reqData,
  };
};

export const setPaypalNotifAsReadSuccess = (payload: any) => {
  return {
    type: SET_PAYPAL_ORDER_NOTIF_AS_READ.SUCCESS,
    payload: payload,
  };
};

export const createPaypalOrder = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CREATE_PAYPAL_ORDER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
