import {LOADING} from '../../../constants/actions';

export const LoadingRequest = () => {
  return {
    type: LOADING.REQUEST,
    isLoading: true,
  };
};

export const LoadingSuccess = () => {
  return {
    type: LOADING.SUCCESS,
    isLoading: false,
  };
};
