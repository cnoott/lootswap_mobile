// @flow

import {HOME_FILTER, GET_PRODUCT_DETAILS} from '../../../constants/actions';
import {FILTER_TYPE} from 'custom_types';

export interface FilterProps {
  selectedProductDetails: any;
}

type ActionProps = {
  type: string;
  newFilter: FILTER_TYPE;
  payload: any;
};

export const InitialState: FilterProps = {
  selectedProductDetails: null,
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload} = action;

  switch (type) {
    case HOME_FILTER.RESET: {
      return {
        ...state,
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
