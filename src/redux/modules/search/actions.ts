import {
  SELECT_CATEGORY_FILTER,
} from '../../../constants/actions';

export const selectCategoryFilter = (filter: string) => {
  return {
    type: SELECT_CATEGORY_FILTER.UPDATE,
    filter: filter,
  };
};
