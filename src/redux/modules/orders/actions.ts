import {GET_ALL_ORDERS} from '../../../constants/actions';

export const getAllOrders = (reqData: any) => {
  return {
    type: GET_ALL_ORDERS.REQUEST,
    reqData: reqData,
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
