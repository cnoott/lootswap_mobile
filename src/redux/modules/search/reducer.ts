// @flow

import {
  SELECT_FILTER,
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
} from '../../../constants/actions';
import {Filter_Type} from '../../../enums';

export interface SearchProps {
  loading: Boolean;
  searchProducts: Array<any>
  categories: Array<string>;
  productType: string;
}

export const InitialState: SearchProps = {
  loading: false,
  searchProducts: [],
  categories: [],
  productType: 'tradeable',
};

type ActionProps = {
  type: string;
  payload: any;
  filter: string;
  filterType: string;
}

export default function loading(state = InitialState, action: ActionProps) {
  const {type, filterType, filter, payload} = action;

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

    case SELECT_FILTER.UPDATE:
      console.log('TYPE', filterType, filter);
      switch(filterType) {
        case Filter_Type.Category:
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
        case Filter_Type.Product_Type:
          console.log("SETTING", filter);
          return {
            ...state,
            productType: filter,
          };
        default:
          return {...state};
      }

    case FILTER_PRODUCTS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FILTER_PRODUCTS.SUCCESS:
      console.log('SUCCESS', payload);
      return {
        ...state,
        searchProducts: payload,
        loading: false
      };

    case FILTER_PRODUCTS.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
