import {
  GET_PRODUCT_DETAILS,
  ADD_PRODUCT,
  GET_PRODUCT_LISTED_ITEMS,
  SEND_TRADE_OFFER,
} from '../../../constants/actions';
import {ADD_PRODUCT_TYPE} from 'custom_types';

export const UpdateAddProductData = (newProduct: ADD_PRODUCT_TYPE) => {
  return {
    type: ADD_PRODUCT.UPDATE,
    newProduct: newProduct,
  };
};

export const ResetAddProductData = () => {
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
