// @flow

import {
  SELECT_CATEGORY_FILTER,
  SEARCH_PRODUCTS,
} from '../../../constants/actions';


export interface SearchProps {
  loading: Boolean;
  searchProducts: Array<any>
  categories: Array<string>;
}

export const InitialState: SearchProps = {
  loading: false,
  searchProducts: [],
  categories: [],
};

type ActionProps = {
  type: string;
  payload: any;
  filter: string;
}

export default function loading(state = InitialState, action: ActionProps) {
  const {type, filter, payload} = action;

  switch (type) {
    case SEARCH_PRODUCTS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_PRODUCTS.SUCCESS:
      console.log('PAYLOADD', payload);
      return {
        ...state,
        searchProducts: payload.products,
        loading: false,
      };
    case SEARCH_PRODUCTS.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case SEARCH_PRODUCTS.RESET:
      return {
        ...state,
        searchProducts: [],
      };

    case SELECT_CATEGORY_FILTER.UPDATE:
      let newSelectedCategories = state.categories;
      if (state.categories.includes(filter)) {
        newSelectedCategories = newSelectedCategories.filter(cat => cat !== filter);
      } else {
        newSelectedCategories.push(filter);
      }
      return {
        ...state,
        categories: newSelectedCategories,
      };

    default:
      return state;
  }
}
