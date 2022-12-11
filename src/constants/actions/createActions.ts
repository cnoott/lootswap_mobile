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

export const PROFILE_IMG_UPLOAD = {
  ...createActionConst(actions.PROFILE_IMG_UPLOAD),
};

export const LOADING = {
  ...createActionConst(actions.LOADING),
};

export const HOME_FILTER = {
  ...createActionConst(actions.HOME_FILTER),
};

export const GET_USER_DETAILS = {
  ...createActionConst(actions.GET_USER_DETAILS),
};

export const GET_PRODUCT_DETAILS = {
  ...createActionConst(actions.GET_PRODUCT_DETAILS),
};
