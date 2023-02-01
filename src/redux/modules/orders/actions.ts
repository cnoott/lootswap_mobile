import {GET_ALL_ORDERS, GET_ORDER} from '../../../constants/actions';

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
