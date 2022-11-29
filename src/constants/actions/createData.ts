import { createActionConst, actions } from './actions';

export const CHAIN_DATA = {
  ...createActionConst(actions.CHAIN_DATA),
};
export const WALLET_DATA = {
  ...createActionConst(actions.WALLET_DATA),
};

export const AUTH_DATA = {
  ...createActionConst(actions.AUTH_DATA),
};
