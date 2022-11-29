// @flow

import { AUTH_DATA } from '../../../constants/actions';

export interface AuthProps {
  isLoading: boolean;
  error: any;
  data: any;
}

type ActionProps = {
  type: string;
  error: any;
  payload: any;
};

export const InitialState: AuthProps = {
  isLoading: false,
  error: null,
  data: null,
};

export default function auth(state = InitialState, action: ActionProps) {
  const { type, payload, error } = action;

  switch (type) {
    case AUTH_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case AUTH_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: null,
      };
    }
    case AUTH_DATA.UPDATE: {
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: null,
      };
    }
    case AUTH_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        data: [],
      };
    }
    default:
      return state;
  }
}
