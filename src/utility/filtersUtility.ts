/***
  LOOTSWAP - FILTER UTILITY
 ***/

import {selectFilter, filterProductsRequest} from '../redux/modules';
import {loggingService} from '../services/loggingService';

export const onSetFilter = (
  dispatch: any,
  filterType: string,
  filter: string,
) => {
  loggingService().logEvent(`select_${filterType}_filter`);
  console.log('filtertpye', filterType);
  dispatch(selectFilter(filterType, filter));
};

export const handleSubmitFilters = (
  dispatch: any,
  navigation: any,
  filters: any,
  query: string,
) => {
  //Check if filters are empty
  const filtersWithQuery = {...filters, querySearch: query};
  dispatch(filterProductsRequest(filtersWithQuery));
  loggingService().logEvent('submit_filter');
  if (navigation) {
    navigation?.goBack();
  }
};

export const filterIsSelected = (filters: any, value: string) => {
  let foundValue = false;
  for (let key in filters) {
    if (key === 'minPrice' || key === 'maxPrice') {
      continue;
    }
    if (Array.isArray(filters[key]) && filters[key].includes(value)) {
      foundValue = true;
    } else if (typeof filters[key] === 'string') {
      if (filters[key] === value) {
        foundValue = true;
      }
    }
  }
  return foundValue;
};
