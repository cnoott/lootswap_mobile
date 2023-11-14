// @flow

import {
  SELECT_FILTER,
  SEARCH_PRODUCTS,
  FILTER_PRODUCTS,
  GET_AVALIABLE_SIZES,
  CLEAR_FILTERS,
} from '../../../constants/actions';
import {Filter_Type} from '../../../enums';

export interface SearchProps {
  loading: Boolean;
  searchProducts: Array<any>
  stockxProducts: Array<any>;
  categories: Array<string>;
  sizes: Array<string>;
  productType: string;
  brands: Array<string>;
  avaliableSizes: any;
  minPrice: string;
  maxPrice: string;
  condition: Array<string>;
  sortBy: string;
  filtersSet: Boolean;
}

export const InitialState: SearchProps = {
  loading: false,
  searchProducts: [],
  stockxProducts: [],
  categories: [],
  sizes: [],
  productType: 'tradeable',
  brands: [],
  avaliableSizes: {},
  minPrice: '',
  maxPrice: '',
  condition: [],
  sortBy: 'Newly listed',
  filtersSet: false,
};

type ActionProps = {
  type: string;
  payload: any;
  filter: string;
  filterType: string;
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, filterType, filter, payload} = action;

  switch (type) {
    case SEARCH_PRODUCTS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_AVALIABLE_SIZES.SUCCESS:
      return {
        ...state,
        avaliableSizes: payload,
      };

    case SEARCH_PRODUCTS.SUCCESS:
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
      console.log('SELECT FILTER');
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
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Sizes:
          let newSelectedSizes = state.sizes;
          if (state.sizes.includes(filter)) {
            newSelectedSizes = newSelectedSizes.filter(cat => cat !== filter);
          } else {
            newSelectedSizes.push(filter);
          }
          return {
            ...state,
            sizes: newSelectedSizes,
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Product_Type:
          return {
            ...state,
            productType: filter,
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Add_Brand:
          if (state.brands.includes(filter)) {
            return {...state};
          }
          return {
            ...state,
            brands: [filter, ...state.brands],
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Remove_Brand:
          return {
            ...state,
            brands: state.brands.filter(brand => brand !== filter),
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Min_Price:
          if (!state.maxPrice) {
            return {
              ...state,
              minPrice: filter,
              maxPrice: 9999,
              filtersSet: true,
              searchProducts: [],
            };
          }
          return {
            ...state,
            minPrice: filter,
            filtersSet: true,
            searchProducts: [],
          };
        case Filter_Type.Max_Price:
          if (!state.minPrice) {
            return {
              ...state,
              maxPrice: filter,
              minPrice: 0,
              filtersSet: true,
              searchProducts: [],
            };
          }
          return {
            ...state,
            maxPrice: filter,
            filtersSet: true,
            searchProducts: [],
          };

        case Filter_Type.Condition:
          let newSelectedCondition = state.condition;
          if (state.condition.includes(filter)) {
            newSelectedCondition = newSelectedCondition.filter(cat => cat !== filter);
          } else {
            newSelectedCondition.push(filter);
          }
          return {
            ...state,
            condition: newSelectedCondition,
            filtersSet: true,
            searchProducts: [],
          };

        case Filter_Type.Sort_By:
          let newSortBy = '';
          if (filter !== state.sortBy) {
            newSortBy = filter;
          }
          return {
            ...state,
            sortBy: newSortBy,
            filtersSet: true,
            searchProducts: [],
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
      const {products, stockxProducts} = payload;
      console.log('action', filter);
      return {
        ...state,
        searchProducts: [...state.searchProducts, ...products],
        stockxProducts: stockxProducts,
        loading: false
      };

    case FILTER_PRODUCTS.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case CLEAR_FILTERS.REQUEST:
      return {
        ...state,
        categories: [],
        productType: 'tradeable',
        brands: [],
        minPrice: '',
        maxPrice: '',
        condition: [],
        sortBy: 'Newly listed',
        filtersSet: false,
        searchProducts: [],
      };
    default:
      return state;
  }
}
