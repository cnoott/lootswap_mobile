import {
  SELECT_CATEGORY_FILTER,
  FILTER_PRODUCTS,
} from '../../../constants/actions';

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
