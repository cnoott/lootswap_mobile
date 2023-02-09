import {
  SIGN_IN_DATA,
  SIGN_UP_DATA,
  SIGN_OUT,
  PROFILE_IMG_UPLOAD,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  SAVE_NOTIF_PERMISSION,
  SET_REG_TOKEN,
} from '../../../constants/actions';

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

// Profile Image Upload Actions
export const profileImgUploadRequest = (payload: any) => {
  return {
    type: PROFILE_IMG_UPLOAD.REQUEST,
    payload,
  };
};

export const profileImgUploadSuccess = (payload: any) => {
  return {
    type: PROFILE_IMG_UPLOAD.SUCCESS,
    payload,
  };
};

export const profileImgUploadFailure = (error: any) => {
  return {
    type: PROFILE_IMG_UPLOAD.FAILURE,
    error,
  };
};

// Get Other Users Actions

export const getUsersDetailsRequest = (
  userId: string,
  clearOldData: boolean = true,
) => {
  return {
    type: GET_USER_DETAILS.REQUEST,
    userId,
    clearOldData: clearOldData,
  };
};

export const getUsersDetailsSuccess = (payload: any) => {
  return {
    type: GET_USER_DETAILS.SUCCESS,
    payload,
  };
};

export const getUsersDetailsFailure = (error: any) => {
  return {
    type: GET_USER_DETAILS.FAILURE,
    error,
  };
};

export const getMyDetailsRequest = (userId: string) => {
  return {
    type: GET_MY_DETAILS.REQUEST,
    userId,
  };
};

export const getMyDetailsSuccess = (payload: any) => {
  return {
    type: GET_MY_DETAILS.SUCCESS,
    payload,
  };
};

export const getMyDetailsFailure = (error: any) => {
  return {
    type: GET_MY_DETAILS.FAILURE,
    error,
  };
};

export const saveNotifPermissions = (status: boolean) => {
  return {
    type: SAVE_NOTIF_PERMISSION.SUCCESS,
    status,
  };
};

export const setRegTokenRequest = (reqData: any) => {
  return {
    type: SET_REG_TOKEN.REQUEST,
    reqData,
  };
};

export const setRegTokenSuccess = (payload: any) => {
  return {
    type: SET_REG_TOKEN.SUCCESS,
    payload,
  };
};

export const setRegTokenFailure = (payload: any) => {
  return {
    type: SET_REG_TOKEN.FAILURE,
    payload,
  };
};
