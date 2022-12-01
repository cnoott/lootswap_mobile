import {AUTH_DATA, SIGN_UP_DATA} from '../../../constants/actions';

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

export const signUpRequest = (reqData: any) => {
  return {
    type: SIGN_UP_DATA.REQUEST,
    reqData: reqData,
  };
};

export const signUpSuccess = (payload: any) => {
  return {
    type: SIGN_UP_DATA.SUCCESS,
    payload,
  };
};

export const signUpFailure = (error: any) => {
  return {
    type: SIGN_UP_DATA.FAILURE,
    error,
  };
};
