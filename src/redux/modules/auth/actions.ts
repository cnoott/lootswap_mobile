import {
  SIGN_IN_DATA,
  SIGN_UP_DATA,
  SIGN_OUT,
  PROFILE_IMG_UPLOAD,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  SAVE_NOTIF_PERMISSION,
  SET_REG_TOKEN,
  GET_MY_DETAILS_NO_LOAD,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  SET_FCM_TOKEN,
  EDIT_SHIPPING_ADDR,
  UPDATE_USER,
  CHECK_STRIPE_LINK,
  PAYOUT_USER,
  DELETE_NOTIF,
  NEW_NOTIF_FALSE,
  DELETE_USER,
  VERSION_CHECK,
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

export const getMyDetailsNoLoadRequest = (userId: string) => {
  return {
    type: GET_MY_DETAILS_NO_LOAD.REQUEST,
    userId,
  };
};

export const getMyDetailsNoLoadSuccess = (payload: any) => {
  return {
    type: GET_MY_DETAILS_NO_LOAD.SUCCESS,
    payload,
  };
};

export const getMyDetailsNoLoadFailure = (error: any) => {
  return {
    type: GET_MY_DETAILS_NO_LOAD.FAILURE,
    error,
  };
};

export const saveNotifPermissions = (status: boolean) => {
  return {
    type: SAVE_NOTIF_PERMISSION.SUCCESS,
    status,
  };
};

export const setRegTokenRequest = (
  reqData: any,
  isRemoveToken: boolean = false,
) => {
  return {
    type: SET_REG_TOKEN.REQUEST,
    reqData: reqData,
    isRemoveToken: isRemoveToken,
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

export const likeProduct = (reqData: any) => {
  return {
    type: LIKE_PRODUCT.REQUEST,
    reqData: reqData,
  };
};

export const likeProductSuccess = (payload: any) => {
  return {
    type: LIKE_PRODUCT.SUCCESS,
    payload: payload,
  };
};

export const likeProductFailure = () => {
  return {
    type: LIKE_PRODUCT.FAILURE,
  };
};

export const unlikeProduct = (reqData: any) => {
  return {
    type: UNLIKE_PRODUCT.REQUEST,
    reqData: reqData,
  };
};

export const unlikeProductSuccess = () => {
  return {
    type: UNLIKE_PRODUCT.SUCCESS,
  };
};

export const unlikeProductFailure = () => {
  return {
    type: UNLIKE_PRODUCT.FAILURE,
  };
};

export const setFCMTokenRequest = (fcmToken: any) => {
  return {
    type: SET_FCM_TOKEN.REQUEST,
    fcmToken: fcmToken,
  };
};

export const editShippingAddr = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: EDIT_SHIPPING_ADDR.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const updateUser = (reqData: any) => {
  return {
    type: UPDATE_USER.REQUEST,
    reqData: reqData,
  };
};

export const updateUserSuccess = (payload: any) => {
  return {
    type: UPDATE_USER.SUCCESS,
    payload: payload,
  };
};

export const updateUserFailure = () => {
  return {
    type: UPDATE_USER.FAILURE,
  };
};

export const checkStripeLink = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: CHECK_STRIPE_LINK.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const payoutUser = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: PAYOUT_USER.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const deleteNotifRequest = (reqData: any) => {
  return {
    type: DELETE_NOTIF.REQUEST,
    reqData: reqData,
  };
};

export const deleteNotifSuccess = (payload: any) => {
  return {
    type: DELETE_NOTIF.SUCCESS,
    payload: payload,
  };
};

export const deleteNotifFailure = () => {
  return {
    type: DELETE_NOTIF.FAILURE,
  };
};

export const newNotifFalseRequest = (userId: string) => {
  return {
    type: NEW_NOTIF_FALSE.REQUEST,
    userId: userId,
  };
};

export const newNotifFalseSuccess = () => {
  return {
    type: NEW_NOTIF_FALSE.SUCCESS,
  };
};

export const newNotifFalseFailure = () => {
  return {
    type: NEW_NOTIF_FALSE.FAILURE,
  };
};

export const deleteUserRequest = (userId: string) => {
  return {
    type: DELETE_USER.REQUEST,
    userId: userId,
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER.SUCCESS,
  };
};

export const deleteUserFailure = () => {
  return {
    type: DELETE_USER.FAILURE,
  };
};

export const versionCheck = (
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: VERSION_CHECK.REQUEST,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};
