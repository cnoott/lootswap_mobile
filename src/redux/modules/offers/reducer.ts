// @flow

import {
  GET_TRADES_HISTORY,
  GET_TRADE,
  CLEAR_TRADE_NOTIF,
  GET_TRADE_STOCKX,
  RECEIVE_TRADE_MESSAGE,
} from '../../../constants/actions';

export interface TradeProps {
  historyTrades: Array<any>;
  publicOffers: Array<any>;
  trade: any;
  tradeLoading: boolean;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: TradeProps = {
  historyTrades: [],
  publicOffers: [],
  trade: null,
  tradeLoading: false,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case GET_TRADES_HISTORY.REQUEST: {
      return {
        ...state,
        tradeLoading: true,
      };
    }
    case GET_TRADES_HISTORY.SUCCESS: {
      return {
        ...state,
        historyTrades: payload.trades,
        publicOffers: payload.publicOffers,
        tradeLoading: false,
      };
    }
    case GET_TRADES_HISTORY.FAILURE: {
      return {
        ...state,
        historyTrades: [],
      };
    }
    case GET_TRADE.REQUEST: {
      return {
        ...state,
        //trade: null,
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
        trade: InitialState.trade,
      };
    }
    case CLEAR_TRADE_NOTIF.REQUEST: {
      const {userId, tradeData} = payload;
      const tradeId = tradeData._id;
      const isReceiver = userId === tradeData.receiver._id;

      const updatedHistoryTrades = state.historyTrades.map((trade: any) => {
        if (trade._id === tradeId && isReceiver) {
          return {...trade, receiverNewMessage: false};
        } else if (trade._id === tradeId && !isReceiver) {
          return {...trade, senderNewMessage: false};
        } else {
          return trade;
        }
      });

      return {
        ...state,
        historyTrades: updatedHistoryTrades,
      };
    }
    case RECEIVE_TRADE_MESSAGE.REQUEST: {
      const newMessage = payload;
      console.log('new message', newMessage);
      return {
        ...state,
        trade: {
          ...state.trade,
          messages: [...state.trade.messages, newMessage],
        },
      };
    }
    default:
      return state;
  }
}
