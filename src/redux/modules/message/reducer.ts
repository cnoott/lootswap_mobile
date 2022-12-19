// @flow

import {GET_MESSAGE_INITIATED_STATUS} from '../../../constants/actions';

export interface LoadingProps {
  messageData: any;
}

type ActionProps = {
  type: string;
};

export const InitialState: LoadingProps = {
  messageData: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type} = action;

  switch (type) {
    case GET_MESSAGE_INITIATED_STATUS.REQUEST:
    case GET_MESSAGE_INITIATED_STATUS.SUCCESS: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
