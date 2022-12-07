import {HOME_FILTER} from '../../../constants/actions';
import {FILTER_TYPE} from 'custom_types';

export const UpdateHomeFilter = (newFilter: FILTER_TYPE) => {
  return {
    type: HOME_FILTER.UPDATE,
    newFilter: newFilter,
  };
};

export const ResetHomeFilter = () => {
  return {
    type: HOME_FILTER.RESET,
  };
};
