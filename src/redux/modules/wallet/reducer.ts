// @flow

import { CHAIN_DATA, WALLET_DATA } from '../../../constants/actions';
import { chainData, currenciesData, walletData } from '../../../mock';

export interface WalletProps {
  isLoading: boolean;
  error: any;
  currenciesData: any;
  chainData: any;
  walletData: any;
}

type ActionProps = {
  type: string;
  error: any;
  payload: any;
};

export const InitialState: WalletProps = {
  isLoading: false,
  error: null,
  currenciesData: currenciesData,
  chainData: chainData,
  walletData: walletData,
};

export default function wallet(state = InitialState, action: ActionProps) {
  const { type, payload, error } = action;

  switch (type) {
    case CHAIN_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case CHAIN_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chainData: payload,
        error: null,
      };
    }
    case CHAIN_DATA.UPDATE: {
      return {
        ...state,
        isLoading: false,
        chainData: payload,
        error: null,
      };
    }
    case CHAIN_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        chainData: [],
      };
    }
    case WALLET_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case WALLET_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        walletData: payload,
      };
    }
    case WALLET_DATA.UPDATE: {
      return {
        ...state,
        isLoading: false,
        error: null,
        walletData: payload,
      };
    }
    case WALLET_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        walletData: [],
      };
    }
    case WALLET_DATA.RESET: {
      return {
        ...InitialState,
      };
    }
    default:
      return state;
  }
}
