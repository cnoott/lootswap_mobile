// @flow

import {GET_TRADES_HISTORY, GET_TRADE, GET_TRADE_STOCKX} from '../../../constants/actions';

export interface TradeProps {
  historyTrades: Array<any>;
  publicOffers: Array<any>
  trade: any;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: TradeProps = {
  historyTrades: [],
  publicOffers: [],
  trade: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case GET_TRADES_HISTORY.REQUEST: {
      return {
        ...state,
      };
    }
    case GET_TRADES_HISTORY.SUCCESS: {
      return {
        ...state,
        historyTrades: payload.trades,
        publicOffers: payload.publicOffers,
      };
    }
    case GET_TRADES_HISTORY.FAILURE: {
      return {
        ...state,
        historyTrades: null,
      };
    }
    case GET_TRADE.REQUEST: {
      return {
        ...state,
        trade: null,
      };
    }
    case GET_TRADE_STOCKX.SUCCESS:
    case GET_TRADE.SUCCESS: {
      const filteredReceiverItems = payload?.receiver?.my_items.filter(
        item => item.isVisible && item.isVirtuallyVerified,
      );
      const filteredSenderItems = payload?.sender?.my_items.filter(
        item => item.isVisible && item.isVirtuallyVerified,
      );
      return {
        ...state,
        trade: {
          ...payload,
          receiver: {
            ...payload.receiver,
            my_items: filteredReceiverItems,
          },
          sender: {
            ...payload.sender,
            my_items: filteredSenderItems,
          },
        },
      };
    }
    case GET_TRADE.FAILURE: {
      return {
        ...state,
        trade: null,
      };
    }
    default:
      return state;
  }
}
