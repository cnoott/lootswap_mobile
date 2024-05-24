import {
  GET_PRODUCT_DETAILS,
  ADD_PRODUCT,
  GET_PRODUCT_LISTED_ITEMS,
  GET_HOMESCREEN_PUBLIC_OFFERS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
  GENERATE_LINK_PAYPAL,
  SAVE_PAYPAL,
  DELETE_PRODUCT,
  SEARCH_STOCKX,
  GET_HOMESCREEN_PRODUCTS,
  GET_HOT_PRODUCTS,
  GET_RECOMMENDED_SEARCH,
  REFRESH_STOCKX_DATA,
  SHOULD_SHOW_GIVEAWAY,
  GET_FOR_YOU_PRODUCTS,
  GET_ONBOARDING_PRODUCTS,
} from '../../../constants/actions';
import {ADD_PRODUCT_TYPE} from 'custom_types';

export const UpdateAddProductData = (newProduct: ADD_PRODUCT_TYPE) => {
  return {
    type: ADD_PRODUCT.UPDATE,
    newProduct: newProduct,
  };
};

export const resetAddProductData = () => {
  return {
    type: ADD_PRODUCT.RESET,
  };
};

export const getProductDetails = (
  productId: string,
  callback?: (product: any) => void,
) => {
  return {
    type: GET_PRODUCT_DETAILS.REQUEST,
    productId,
    callback,
  };
};

export const getProductDetailsSuccess = (payload: any) => {
  return {
    type: GET_PRODUCT_DETAILS.SUCCESS,
    payload,
  };
};

export const getProductDetailsFailure = (error: any) => {
  return {
    type: GET_PRODUCT_DETAILS.FAILURE,
    error,
  };
};

export const getProductListedItemsForOffer = (
  userId: string,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_PRODUCT_LISTED_ITEMS.REQUEST,
    userId: userId,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const sendTradeOffer = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: SEND_TRADE_OFFER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const createNewProduct = (
  reqData: any,
  isUpdateCall: boolean,
  successCallBack: Function,
) => {
  return {
    type: CREATE_NEW_PRODUCT.REQUEST,
    reqData: reqData,
    isUpdateCall: isUpdateCall,
    successCallBack: successCallBack,
  };
};

export const createNewProductSuccess = () => {
  return {
    type: CREATE_NEW_PRODUCT.SUCCESS,
  };
};

export const createNewProductFailure = () => {
  return {
    type: CREATE_NEW_PRODUCT.FAILURE,
  };
};

export const fetchMarketData = (reqData: any, errorCallBack: Function) => {
  return {
    type: FETCH_MARKET_DATA.REQUEST,
    reqData: reqData,
    errorCallBack: errorCallBack,
  };
};

export const fetchMarketDataSuccess = (payload: any) => {
  return {
    type: FETCH_MARKET_DATA.SUCCESS,
    payload,
  };
};

export const fetchMarketDataFailure = () => {
  return {
    type: FETCH_MARKET_DATA.FAILURE,
  };
};

export const generateLinkPaypal = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GENERATE_LINK_PAYPAL.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const savePaypal = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: SAVE_PAYPAL.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const deleteProduct = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: DELETE_PRODUCT.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const searchStockx = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: SEARCH_STOCKX.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getHomeScreenProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_HOMESCREEN_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getHotProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_HOT_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getForYouProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_FOR_YOU_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getOnboardingProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_ONBOARDING_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getHomeScreenPublicOffers = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_HOMESCREEN_PUBLIC_OFFERS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const getRecommendedSearch = (
  //TODO move to search actions
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_RECOMMENDED_SEARCH.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const refreshStockxData = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: REFRESH_STOCKX_DATA.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const shouldShowGiveawayRequest = () => {
  return {
    type: SHOULD_SHOW_GIVEAWAY.REQUEST,
  };
};

export const shouldShowGiveawaySuccess = (payload: any) => {
  return {
    type: SHOULD_SHOW_GIVEAWAY.SUCCESS,
    payload: payload,
  };
};
