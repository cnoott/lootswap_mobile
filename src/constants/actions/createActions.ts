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

export const GET_MESSAGE_INITIATED_STATUS = {
  ...createActionConst(actions.GET_MESSAGE_INITIATED_STATUS),
};

export const CREATE_FIRST_MESSAGE = {
  ...createActionConst(actions.CREATE_FIRST_MESSAGE),
};

export const GET_MESSAGES_HISTORY = {
  ...createActionConst(actions.GET_MESSAGES_HISTORY),
};

export const SAVE_SENT_MESSAGE = {
  ...createActionConst(actions.SAVE_SENT_MESSAGE),
};

export const ADD_PRODUCT = {
  ...createActionConst(actions.ADD_PRODUCT),
};

export const GET_PRODUCT_LISTED_ITEMS = {
  ...createActionConst(actions.GET_PRODUCT_LISTED_ITEMS),
};

export const SEND_TRADE_OFFER = {
  ...createActionConst(actions.SEND_TRADE_OFFER),
};

export const GET_TRADES_HISTORY = {
  ...createActionConst(actions.GET_TRADES_HISTORY),
};

export const CREATE_NEW_PRODUCT = {
  ...createActionConst(actions.CREATE_NEW_PRODUCT),
};
