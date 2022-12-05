import {createActionConst, actions} from './actions';

export const SIGN_IN_DATA = {
  ...createActionConst(actions.SIGN_IN_DATA),
};

export const SIGN_UP_DATA = {
  ...createActionConst(actions.SIGN_UP_DATA),
};

export const SIGN_OUT = {
  ...createActionConst(actions.SIGN_OUT),
};

export const LOADING = {
  ...createActionConst(actions.LOADING),
};
