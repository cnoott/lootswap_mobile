// @flow
import {GET_ALL_ORDERS} from '../../../constants/actions';

export interface OrderProps {
  tradeOrders: any;
  paypalOrders: any;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: OrderProps = {
  tradeOrders: null,
  paypalOrders: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case GET_ALL_ORDERS.REQUEST: {
      return {
        ...state,
      };
    }
    case GET_ALL_ORDERS.SUCCESS: {
      return {
        ...state,
        tradeOrders: payload.tradeOrders,
        paypalOrders: payload.paypalOrders,
      };
    }
    case GET_ALL_ORDERS.FAILURE: {
      return {
        ...state,
        tradeOrders: null,
        paypalOrders: null,
      };
    }
    default:
      return state;
  }
}
