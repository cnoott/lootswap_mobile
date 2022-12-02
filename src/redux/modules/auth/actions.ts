import {SIGN_IN_DATA, SIGN_UP_DATA, SIGN_OUT} from '../../../constants/actions';

export const signInRequest = (reqData: any) => {
  return {
    type: SIGN_IN_DATA.REQUEST,
    reqData: reqData,
  };
};

export const signInSuccess = (payload: any) => {
  return {
    type: SIGN_IN_DATA.SUCCESS,
    payload,
  };
};

export const signInUpdate = (payload: any) => {
  return {
    type: SIGN_IN_DATA.UPDATE,
    payload,
  };
};

export const signInFailure = (error: any) => {
  return {
    type: SIGN_IN_DATA.FAILURE,
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

export const signOutRequest = () => {
  return {
    type: SIGN_OUT.REQUEST,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT.SUCCESS,
  };
};

export const signOutFailure = (error: any) => {
  return {
    type: SIGN_OUT.FAILURE,
    error,
  };
};
