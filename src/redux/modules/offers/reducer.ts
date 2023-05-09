// @flow

import {GET_TRADES_HISTORY, GET_TRADE} from '../../../constants/actions';

export interface TradeProps {
  historyTrades: any;
  trade: any;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: TradeProps = {
  historyTrades: null,
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
        historyTrades: payload,
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
    case GET_TRADE.SUCCESS: {
      console.log('TRADE SUCCESS', payload[0]);
      return {
        ...state,
        trade: payload,
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
