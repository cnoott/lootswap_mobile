// @flow

import {LOADING} from '../../../constants/actions';

export interface LoadingProps {
  isLoading: boolean;
}

type ActionProps = {
  type: string;
  isLoading: boolean;
};

export const InitialState: LoadingProps = {
  isLoading: false,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, isLoading} = action;

  switch (type) {
    case LOADING.REQUEST:
    case LOADING.SUCCESS: {
      return {
        ...state,
        isLoading,
      };
    }
    default:
      return state;
  }
}
