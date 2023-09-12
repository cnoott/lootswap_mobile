import {
  GET_PRODUCT_DETAILS,
  ADD_PRODUCT,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
  GENERATE_LINK_PAYPAL,
  SAVE_PAYPAL,
  DELETE_PRODUCT,
  SEARCH_STOCKX,
  GET_HOMESCREEN_PRODUCTS,
  SEARCH_PRODUCTS,
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

export const getProductDetails = (productId: string) => {
  return {
    type: GET_PRODUCT_DETAILS.REQUEST,
    productId: productId,
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

export const searchProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: SEARCH_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
