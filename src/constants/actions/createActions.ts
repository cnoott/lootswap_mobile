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

export const GET_MY_DETAILS = {
  ...createActionConst(actions.GET_MY_DETAILS),
};

export const GET_MY_DETAILS_NO_LOAD = {
  ...createActionConst(actions.GET_MY_DETAILS_NO_LOAD),
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

export const GET_TRADE = {
  ...createActionConst(actions.GET_TRADE),
};

export const CREATE_NEW_PRODUCT = {
  ...createActionConst(actions.CREATE_NEW_PRODUCT),
};

export const ACCEPT_TRADE = {
  ...createActionConst(actions.ACCEPT_TRADE),
};

export const ACCEPT_MONEY_OFFER_TRADE = {
  ...createActionConst(actions.ACCEPT_MONEY_OFFER_TRADE),
};

export const CANCEL_TRADE = {
  ...createActionConst(actions.CANCEL_TRADE),
};

export const ADD_ITEMS = {
  ...createActionConst(actions.ADD_ITEMS),
};

export const REMOVE_ITEMS = {
  ...createActionConst(actions.REMOVE_ITEMS),
};

export const CHANGE_MONEY_OFFER = {
  ...createActionConst(actions.CHANGE_MONEY_OFFER),
};

export const GET_ALL_ORDERS = {
  ...createActionConst(actions.GET_ALL_ORDERS),
};

export const GET_ORDER = {
  ...createActionConst(actions.GET_ORDER),
};

export const GET_ALL_MY_MESSAGES = {
  ...createActionConst(actions.GET_ALL_MY_MESSAGES),
};

export const GET_TRADE_SHIPPING_RATES = {
  ...createActionConst(actions.GET_TRADE_SHIPPING_RATES),
};

export const FETCH_PAYMENT_SHEET = {
  ...createActionConst(actions.FETCH_PAYMENT_SHEET),
};

export const GET_ORDER_FROM_TRADE = {
  ...createActionConst(actions.GET_ORDER_FROM_TRADE),
};

export const SALE_GENERATE_CARRIER_RATES = {
  ...createActionConst(actions.SALE_GENERATE_CARRIER_RATES),
};

export const CHECKOUT_RATE = {
  ...createActionConst(actions.CHECKOUT_RATE),
};

export const GENERATE_LINK_PAYPAL = {
  ...createActionConst(actions.GENERATE_LINK_PAYPAL),
};

export const SAVE_PAYPAL = {
  ...createActionConst(actions.SAVE_PAYPAL),
};

export const GET_PAYPAL_ORDER = {
  ...createActionConst(actions.GET_PAYPAL_ORDER),
};

export const SAVE_NOTIF_PERMISSION = {
  ...createActionConst(actions.SAVE_NOTIF_PERMISSION),
};

export const SET_REG_TOKEN = {
  ...createActionConst(actions.SET_REG_TOKEN),
};

export const LIKE_PRODUCT = {
  ...createActionConst(actions.LIKE_PRODUCT),
};

export const UNLIKE_PRODUCT = {
  ...createActionConst(actions.UNLIKE_PRODUCT),
};

export const SET_FCM_TOKEN = {
  ...createActionConst(actions.SET_FCM_TOKEN),
};
