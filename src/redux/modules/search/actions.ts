import {
  SELECT_FILTER,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  SEARCH_PRODUCTS,
  SET_PRODUCTS,
  CLEAR_PRODUCTS,
  GET_AVALIABLE_SIZES,
  FETCH_RELATED_ITEM_DATA,
} from '../../../constants/actions';

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

export const setProducts = (
  newProducts: Array<any>,
  newLoading: Boolean,
  newEndReached: Boolean,
) => {
  console.log('set products called');
  return {
    type: SET_PRODUCTS.SUCCESS,
    payload: {newProducts, newLoading, newEndReached},
  };
};

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS.SUCCESS,
  };
};

export const searchProductsReset = () => {
  return {
    type: SEARCH_PRODUCTS.RESET,
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

export const getAvaliableSizesRequest = () => {
  return {
    type: GET_AVALIABLE_SIZES.REQUEST,
  };
};

export const getAvaliableSizesSuccess = (payload: any) => {
  return {
    type: GET_AVALIABLE_SIZES.SUCCESS,
    payload: payload,
  };
};

export const getAvaliableSizesFailure = () => {
  return {
    type: GET_AVALIABLE_SIZES.FAILURE,
  };
};

export const clearFiltersRequest = () => {
  return {
    type: CLEAR_FILTERS.REQUEST,
  };
};

export const fetchRelatedItemData = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: FETCH_RELATED_ITEM_DATA.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
