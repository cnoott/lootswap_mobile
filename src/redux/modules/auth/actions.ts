import {AUTH_DATA, SIGN_IN_DATA} from '../../../constants/actions';

export const authDataRequest = (reqData: any) => {
  return {
    type: AUTH_DATA.REQUEST,
    reqData: reqData,
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

export const signInRequest = () => {
  return {
    type: SIGN_IN_DATA.REQUEST,
  };
};

export const signInSuccess = (payload: any) => {
  return {
    type: SIGN_IN_DATA.SUCCESS,
    payload,
  };
};

export const signInFailure = (error: any) => {
  return {
    type: SIGN_IN_DATA.FAILURE,
    error,
  };
};
