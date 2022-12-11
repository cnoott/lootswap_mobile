// @flow

import {HOME_FILTER, GET_PRODUCT_DETAILS} from '../../../constants/actions';
import {FILTER_TYPE} from 'custom_types';
import {getHomeFilterData} from '../../../utility/utility';

export interface FilterProps {
  homeFilterData: FILTER_TYPE;
  selectedProductDetails: any;
}

type ActionProps = {
  type: string;
  newFilter: FILTER_TYPE;
  payload: any;
};

export const InitialState: FilterProps = {
  homeFilterData: getHomeFilterData(),
  selectedProductDetails: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, newFilter, payload} = action;

  switch (type) {
    case HOME_FILTER.UPDATE: {
      return {
        ...state,
        homeFilterData: newFilter,
      };
    }
    case HOME_FILTER.RESET: {
      return {
        ...state,
        homeFilterData: getHomeFilterData(),
      };
    }
    case GET_PRODUCT_DETAILS.REQUEST: {
      return {
        ...state,
        selectedProductDetails: null,
      };
    }
    case GET_PRODUCT_DETAILS.SUCCESS: {
      return {
        ...state,
        selectedProductDetails: payload,
      };
    }
    case GET_PRODUCT_DETAILS.FAILURE: {
      return {
        ...state,
        selectedProductDetails: null,
      };
    }
    default:
      return state;
  }
}
