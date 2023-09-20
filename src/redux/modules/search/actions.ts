import {
  SELECT_CATEGORY_FILTER,
  FILTER_PRODUCTS,
  SEARCH_PRODUCTS,
} from '../../../constants/actions';

export const searchProductsRequest = (reqData: any) => {
  return {
    type: SEARCH_PRODUCTS.REQUEST,
    reqData: reqData,
  };
};

export const searchProductsReset = () => {
  return {
    type: SEARCH_PRODUCTS.RESET,
  };
};

export const searchProductsSuccess = (payload: any) => {
  return {
    type: SEARCH_PRODUCTS.SUCCESS,
    payload: payload,
  };
};

export const searchProductsFailure = () => {
  return {
    type: SEARCH_PRODUCTS.FAILURE
  };
};

export const selectCategoryFilter = (filter: string) => {
  return {
    type: SELECT_CATEGORY_FILTER.UPDATE,
    filter: filter,
  };
};

export const filterProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: FILTER_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
