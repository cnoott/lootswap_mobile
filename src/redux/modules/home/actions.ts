import {HOME_FILTER, GET_PRODUCT_DETAILS} from '../../../constants/actions';
import {FILTER_TYPE} from 'custom_types';

export const UpdateHomeFilter = (newFilter: FILTER_TYPE) => {
  return {
    type: HOME_FILTER.UPDATE,
    newFilter: newFilter,
  };
};

export const ResetHomeFilter = () => {
  return {
    type: HOME_FILTER.RESET,
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
