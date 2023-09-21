import {
  SELECT_FILTER,
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

export const selectFilter = (filterType: string, filter: string) => {
  return {
    type: SELECT_FILTER.UPDATE,
    filterType: filterType,
    filter: filter,
  };
};

export const filterProductsRequest = (reqData: any) => {
  return {
    type: FILTER_PRODUCTS.REQUEST,
    reqData: reqData,
  };
};

export const filterProductsSuccess = (payload: any) => {
  return {
    type: FILTER_PRODUCTS.SUCCESS,
    payload: payload,
  };
};

export const filterProductsFailure = () => {
  return {
    type: FILTER_PRODUCTS.FAILURE,
  };
};
