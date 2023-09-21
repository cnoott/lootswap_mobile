/***
  LOOTSWAP - FILTER UTILITY
 ***/

import {selectCategoryFilter, filterProductsRequest} from '../redux/modules';

export const onSetFilter = (dispatch: any, filter: string) => {
  dispatch(selectCategoryFilter(filter));
};

export const handleSubmitFilters = (
  dispatch: any,
  navigation: any,
  filters: any,
) => {
  //Check if filters are empty
  dispatch(filterProductsRequest(filters));
  navigation?.goBack();
};

export const filterIsSelected = (filters: any, value: string) => {
  let foundValue = false;
  for (let key in filters) {
    if (Array.isArray(filters[key]) && filters[key].includes(value)) {
      foundValue = true;
    }
  }
  return foundValue;
};
