// @flow
import {
  GET_ALL_ORDERS,
  SET_ORDER_NOTIF_AS_READ,
  SET_PAYPAL_ORDER_NOTIF_AS_READ,
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

    case SET_PAYPAL_ORDER_NOTIF_AS_READ.SUCCESS: {
      const paypalOrderId = payload.paypalOrderId;
      const userId = payload.userId;

      const updatedTradeOrders = state.paypalOrders.map(order => {
        const isBuyer = order.buyerId._id === userId;
        if (order._id === paypalOrderId && isBuyer) {
          return {
            ...order,
            buyerNewNotif: false,
          };
        } else if (order._id === paypalOrderId && !isBuyer) {
          return {
            ...order,
            sellerNewNotif: false,
          };
        }
        return order;
      });
      return {
        ...state,
        paypalOrders: updatedTradeOrders,
      };
    }

    default:
      return state;
  }
}
