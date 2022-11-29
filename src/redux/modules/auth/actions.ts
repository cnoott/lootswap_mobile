import { AUTH_DATA } from '../../../constants/actions';

export const authDataRequest = () => {
  return {
    type: AUTH_DATA.REQUEST,
  };
};

export const authDataSuccess = (payload: any) => {
  return {
    type: AUTH_DATA.SUCCESS,
    payload,
  };
};

export const authDataUpdate = (payload: any) => {
  return {
    type: AUTH_DATA.UPDATE,
    payload,
  };
};

export const authDataFailure = (error: any) => {
  return {
    type: AUTH_DATA.FAILURE,
    error,
  };
};
