import { CHAIN_DATA, WALLET_DATA } from '../../../constants/actions';

export const chainData = () => {
  return {
    type: CHAIN_DATA.REQUEST,
  };
};

export const chainDataSuccess = (payload: any) => {
  return {
    type: CHAIN_DATA.SUCCESS,
    payload,
  };
};

export const chainDataUpdate = (payload: any) => {
  return {
    type: CHAIN_DATA.UPDATE,
    payload,
  };
};

export const chainDataFailure = (error: any) => {
  return {
    type: CHAIN_DATA.FAILURE,
    error,
  };
};

export const walletData = () => {
  return {
    type: WALLET_DATA.REQUEST,
  };
};

export const walletDataSuccess = (payload: any) => {
  return {
    type: WALLET_DATA.SUCCESS,
    payload,
  };
};

export const walletDataUpdate = (payload: any) => {
  return {
    type: WALLET_DATA.UPDATE,
    payload,
  };
};

export const walletDataFailure = (error: any) => {
  return {
    type: WALLET_DATA.FAILURE,
    error,
  };
};

export const walletDataReset = () => {
  return {
    type: WALLET_DATA.RESET,
  };
};
