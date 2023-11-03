// @flow
import {
  GET_ALL_ORDERS,
  SET_ORDER_NOTIF_AS_READ,
} from '../../../constants/actions';

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
    case SET_ORDER_NOTIF_AS_READ.SUCCESS: {
      const orderId = payload.orderId;
      const userId = payload.userId;
      console.log('PLD', payload);

      const updatedTradeOrders = state.tradeOrders.map(order => {
        const isReciever = order.reciever._id === userId;
        if (order._id === orderId && isReciever) {
          return {
            ...order,
            recieverNewNotif: false,
          };
        } else if (order._id === orderId && !isReciever) {
          return {
            ...order,
            senderNewNotif: false,
          };
        }
        return order;
      });
      return {
        ...state,
        tradeOrders: updatedTradeOrders,
      };
    }
    default:
      return state;
  }
}
