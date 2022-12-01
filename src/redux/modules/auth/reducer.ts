// @flow

import {SIGN_IN_DATA, SIGN_UP_DATA} from '../../../constants/actions';

export interface AuthProps {
  isLoading: boolean;
  error: any;
  data: any;
  userData: any;
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
  userData: null,
};

export default function auth(state = InitialState, action: ActionProps) {
  const {type, payload, error} = action;

  switch (type) {
    case SIGN_IN_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SIGN_IN_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: null,
      };
    }
    case SIGN_IN_DATA.UPDATE: {
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: null,
      };
    }
    case SIGN_IN_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        data: null,
      };
    }

    case SIGN_UP_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SIGN_UP_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: null,
      };
    }
    case SIGN_UP_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        data: null,
      };
    }
    default:
      return state;
  }
}
