// @flow

import {GET_TRADES_HISTORY} from '../../../constants/actions';

export interface TradeProps {
  historyTrades: any;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: TradeProps = {
  historyTrades: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case GET_TRADES_HISTORY.REQUEST: {
      return {
        ...state,
        historyTrades: null,
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
    default:
      return state;
  }
}
