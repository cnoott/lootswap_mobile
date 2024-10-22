import {
  SIGN_IN_DATA,
  SIGN_UP_DATA,
  SIGN_OUT,
  PROFILE_IMG_UPLOAD,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  GET_USER_DETAILS_W_STOCKX,
  SAVE_NOTIF_PERMISSION,
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
  NEW_NOTIF_TRUE,
  DELETE_USER,
  VERSION_CHECK,
  SAVE_REFERRAL_LINK,
  PRESELECT_CHOSEN_ITEM,
  SAVE_SEARCH,
  GET_LIKED_PRODUCTS,
  SET_NOTIFS_AS_READ,
  SET_NOTIF_AS_READ,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_APPLE,
  SAVE_INSTALL_PARAMS,
  SKIP_PAYPAL_ONBOARDING,
  ADD_SHARED_PRODUCT,
  INC_ITEMS_VIEWED,
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

export const signInWithGoogleRequest = (reqData: any) => {
  return {
    type: SIGNIN_WITH_GOOGLE.REQUEST,
    reqData: reqData,
  };
};

export const signInWithGoogleSuccess = (payload: any) => {
  return {
    type: SIGNIN_WITH_GOOGLE.SUCCESS,
    payload,
  };
};

export const signInWithGoogleUpdate = (payload: any) => {
  return {
    type: SIGNIN_WITH_GOOGLE.UPDATE,
    payload,
  };
};

export const signInWithGoogleFailure = (error: any) => {
  return {
    type: SIGNIN_WITH_GOOGLE.FAILURE,
    error,
  };
};

export const signInWithAppleRequest = (reqData: any) => {
  return {
    type: SIGNIN_WITH_APPLE.REQUEST,
    reqData: reqData,
  };
};

export const signInWithAppleSuccess = (payload: any) => {
  return {
    type: SIGNIN_WITH_APPLE.SUCCESS,
    payload,
  };
};

export const signInWithAppleUpdate = (payload: any) => {
  return {
    type: SIGNIN_WITH_APPLE.UPDATE,
    payload,
  };
};

export const signInWithAppleFailure = (error: any) => {
  return {
    type: SIGNIN_WITH_APPLE.FAILURE,
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

export const signOutRequest = (reqData: any) => {
  return {
    type: SIGN_OUT.REQUEST,
    reqData: reqData,
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

export const preselectChosenItem = (productId: string) => {
  return {
    type: PRESELECT_CHOSEN_ITEM.SUCCESS,
    productId,
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

export const getMyDetailsRequest = (
  userId: string,
  callback?: (userData: any) => void,
) => {
  return {
    type: GET_MY_DETAILS.REQUEST,
    userId,
    callback,
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

export const getUserDetailsWStockxRequest = (userId: string) => {
  return {
    type: GET_USER_DETAILS_W_STOCKX.REQUEST,
    userId,
  };
};

export const getUserDetailsWStockxSuccess = (payload: any) => {
  return {
    type: GET_USER_DETAILS_W_STOCKX.SUCCESS,
    payload,
  };
};

export const getUserDetailsWStockxFailure = (error: any) => {
  return {
    type: GET_USER_DETAILS_W_STOCKX.FAILURE,
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

export const setFCMTokenRequest = (
  reqData: any,
  isRemoveToken: boolean = false,
) => {
  return {
    type: SET_FCM_TOKEN.REQUEST,
    reqData: reqData,
    isRemoveToken: isRemoveToken,
  };
};

export const setFCMTokenSuccess = (payload: any) => {
  return {
    type: SET_FCM_TOKEN.SUCCESS,
    payload,
  };
};

export const setFCMTokenFailure = (payload: any) => {
  return {
    type: SET_FCM_TOKEN.FAILURE,
    payload,
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
export const deleteNotifUpdate = (reqData: any) => {
  return {
    type: DELETE_NOTIF.UPDATE,
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

export const newNotifTrueSuccess = (payload: any) => {
  return {
    type: NEW_NOTIF_TRUE.SUCCESS,
    payload: payload,
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

export const saveReferralLinkRequest = (payload: any) => {
  return {
    type: SAVE_REFERRAL_LINK.REQUEST,
    payload: payload,
  };
};

export const saveReferralLinkSuccess = () => {
  return {
    type: SAVE_REFERRAL_LINK.SUCCESS,
  };
};

export const saveReferralLinkFailure = () => {
  return {
    type: SAVE_REFERRAL_LINK.FAILURE,
  };
};

export const saveSearchRequest = (reqData: any) => {
  return {
    type: SAVE_SEARCH.REQUEST,
    reqData: reqData,
  };
};

export const saveSearchSuccess = () => {
  return {
    type: SAVE_SEARCH.SUCCESS,
  };
};

export const saveSearchFailure = () => {
  return {
    type: SAVE_SEARCH.FAILURE,
  };
};

export const getLikedProducts = (
  reqData: any,
  successCallBack: Function,
  errorCallBack: Function,
) => {
  return {
    type: GET_LIKED_PRODUCTS.REQUEST,
    reqData: reqData,
    successCallBack: successCallBack,
    errorCallBack: errorCallBack,
  };
};

export const setNotifsAsReadRequest = (reqData: any) => {
  return {
    type: SET_NOTIFS_AS_READ.REQUEST,
    reqData: reqData,
  };
};

export const setNotifAsRead = (payload: any) => {
  return {
    type: SET_NOTIF_AS_READ.REQUEST,
    payload: payload,
  };
};

export const setNotifsAsReadSuccess = (payload: Array<any>) => {
  return {
    type: SET_NOTIFS_AS_READ.SUCCESS,
    payload: payload,
  };
};

export const setNotifsAsReadFailure = () => {
  return {
    type: SET_NOTIFS_AS_READ.FAILURE,
  };
};

export const saveInstallParams = (installParams: any) => {
  return {
    type: SAVE_INSTALL_PARAMS.REQUEST,
    payload: installParams,
  };
};

export const skipPaypalOnboarding = () => {
  return {
    type: SKIP_PAYPAL_ONBOARDING.REQUEST,
  };
};

export const addSharedProductRequest = (reqData: any) => {
  return {
    type: ADD_SHARED_PRODUCT.REQUEST,
    reqData: reqData,
  };
};

export const addSharedProductSuccess = (payload: any) => {
  return {
    type: ADD_SHARED_PRODUCT.SUCCESS,
    payload: payload,
  };
};

export const addSharedProductFailure = () => {
  return {
    type: ADD_SHARED_PRODUCT.FAILURE,
  };
};

export const incTimesViewed = () => {
  return {
    type: INC_ITEMS_VIEWED.REQUEST,
  };
};
