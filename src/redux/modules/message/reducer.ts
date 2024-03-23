// @flow

import {
  GET_MESSAGE_INITIATED_STATUS,
  GET_MESSAGES_HISTORY,
  GET_ALL_MY_MESSAGES,
  RECEIVE_MESSAGE,
} from '../../../constants/actions';

export interface MessageProps {
  historyMessages: any;
  allMyMessages: any;
}

type ActionProps = {
  type: string;
  payload: any;
};

export const InitialState: MessageProps = {
  historyMessages: {messages: []},
  allMyMessages: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case GET_MESSAGE_INITIATED_STATUS.REQUEST:
    case GET_MESSAGE_INITIATED_STATUS.SUCCESS: {
      return {
        ...state,
      };
    }
    case GET_MESSAGES_HISTORY.REQUEST: {
      return {
        ...state,
        historyMessages: InitialState.historyMessages,
      };
    }
    case GET_MESSAGES_HISTORY.SUCCESS: {
      return {
        ...state,
        historyMessages: payload,
      };
    }
    case GET_MESSAGES_HISTORY.FAILURE: {
      return {
        ...state,
        historyMessages: InitialState.historyMessages,
      };
    }
    case RECEIVE_MESSAGE.REQUEST: {
      const newMessage = payload;
      console.log('new message', action);
      return {
        ...state,
        historyMessages: {
          ...state.historyMessages,
          messages: [...state.historyMessages.messages, newMessage],
        },
      };
    }
    case GET_ALL_MY_MESSAGES.REQUEST: {
      return {
        ...state,
      };
    }
    case GET_ALL_MY_MESSAGES.SUCCESS: {
      return {
        ...state,
        allMyMessages: payload,
      };
    }
    case GET_ALL_MY_MESSAGES.FAILURE: {
      return {
        ...state,
        historyMessages: null,
      };
    }
    default:
      return state;
  }
}
