// @flow

import {HOME_FILTER} from '../../../constants/actions';
import {FILTER_TYPE} from 'custom_types';
import {getHomeFilterData} from '../../../utility/utility';

export interface FilterProps {
  homeFilterData: FILTER_TYPE;
}

type ActionProps = {
  type: string;
  newFilter: FILTER_TYPE;
};

export const InitialState: FilterProps = {
  homeFilterData: getHomeFilterData(),
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, newFilter} = action;

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
    default:
      return state;
  }
}
