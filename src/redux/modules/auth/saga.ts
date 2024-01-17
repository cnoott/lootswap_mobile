import {takeLatest, call, put, delay, select} from 'redux-saga/effects';
import {
  PROFILE_IMG_UPLOAD,
  SIGN_IN_DATA,
  SIGN_OUT,
  SIGN_UP_DATA,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  GET_USER_DETAILS_W_STOCKX,
  SET_FCM_TOKEN,
  GET_MY_DETAILS_NO_LOAD,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  EDIT_SHIPPING_ADDR,
  UPDATE_USER,
  CHECK_STRIPE_LINK,
  PAYOUT_USER,
  DELETE_NOTIF,
  NEW_NOTIF_FALSE,
  DELETE_USER,
  VERSION_CHECK,
  SAVE_REFERRAL_LINK,
  SAVE_SEARCH,
  GET_LIKED_PRODUCTS,
  SET_NOTIFS_AS_READ,
} from '../../../constants/actions';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  profileImgUploadSuccess,
  profileImgUploadFailure,
  getUsersDetailsSuccess,
  getUsersDetailsFailure,
  getMyDetailsSuccess,
  getMyDetailsFailure,
  setFCMTokenRequest,
  setFCMTokenSuccess,
  setFCMTokenFailure,
  likeProductSuccess,
  likeProductFailure,
  unlikeProductSuccess,
  unlikeProductFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteNotifRequest,
  deleteNotifSuccess,
  deleteNotifFailure,
  newNotifFalseRequest,
  newNotifFalseSuccess,
  newNotifFalseFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  saveReferralLinkRequest,
  saveReferralLinkSuccess,
  saveReferralLinkFailure,
  saveSearchSuccess,
  saveSearchFailure,
  getUserDetailsWStockxFailure,
  getUserDetailsWStockxSuccess,
  setNotifsAsReadSuccess,
  setNotifsAsReadFailure,
} from './actions';
import {
  signIn,
  signUp,
  getProfileImageSignedURL,
  uploadProfileImage,
  getRequestedUserDetailsCall,
  setFCMTokenCall,
  likeProductCall,
  unlikeProductCall,
  removeRegTokenCall,
  editShippingAddrCall,
  updateUserCall,
  checkStripeLinkCall,
  payoutUserCall,
  deleteNotifCall,
  newNotifFalseCall,
  deleteUserCall,
  versionCheckCall,
  saveReferralLinkCall,
  getLikedProductsCall,
  getUserDetailsWStockxCall,
  setNotifsAsReadCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {resetRoute} from '../../../navigation/navigationHelper';
import {Alert} from 'custom_top_alert';
import analytics from '@react-native-firebase/analytics';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

/*
 * Selector(For getting reducer data)
 */
export const getAuthData = (state: any) => state.auth;

export function* signInAPI(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(signIn, action?.reqData);
    yield put(LoadingSuccess());
    if (response?.success) {
      resetRoute();
      yield put(signInSuccess(response.data));
      let authData = yield select(getAuthData);
      analytics().setUserId(response?.data?.user?._id);
      yield put(
        setFCMTokenRequest({
          userId: response?.data?.user?._id,
          token: authData?.fcmToken,
        }),
      );
    } else {
      yield put(signInFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* signUpAPI(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(signUp, action?.reqData);
    yield put(LoadingSuccess());
    if (response?.success) {
      resetRoute();
      yield put(signUpSuccess(response.data));
      let authData = yield select(getAuthData);
      analytics().setUserId(response?.data?.user?._id);
      analytics().logSignUp({method: 'email'});
      yield put(
        setFCMTokenRequest({
          userId: response?.data?.user?._id,
          token: authData?.fcmToken,
        }),
      );
    } else {
      yield put(signUpFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* uploadProfileImgAPI(action: any) {
  try {
    const signedResponse: APIResponseProps = yield call(
      getProfileImageSignedURL,
      action?.payload,
    );

    const uploadResponse: APIResponseProps = yield call(
      uploadProfileImage,
      signedResponse.data,
      action?.payload,
    );

    if (signedResponse?.success && uploadResponse?.success) {
      yield put(profileImgUploadSuccess(signedResponse.data));
    } else {
      yield put(
        profileImgUploadFailure(signedResponse.error || uploadResponse.error),
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function* signOutAPI() {
  yield put(LoadingRequest());
  try {
    let authData = yield select(getAuthData);
    let removeToken = true;
    yield put(
      setFCMTokenRequest(
        {
          userId: authData?.userData?._id,
          token: authData?.fcmToken,
        },
        removeToken,
      ), // Remove FCM Token Call
    );
    yield delay(500);
    yield put(signOutSuccess());
    yield put(LoadingSuccess());
    resetRoute();
  } catch (e) {
    yield put(LoadingSuccess());
    console.log(e);
  }
}

export function* getRequestedUserDetails(action: any) {
  //yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getRequestedUserDetailsCall,
      action?.userId,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getUsersDetailsSuccess(response.data));
    } else {
      yield put(getUsersDetailsFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getMyDetails(action: any) {
  //yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      getRequestedUserDetailsCall,
      action?.userId,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(getMyDetailsSuccess(response.data));
    } else {
      yield put(getMyDetailsFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getMyDetailsNoLoad(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getRequestedUserDetailsCall,
      action?.userId,
    );
    if (response?.success) {
      yield put(getMyDetailsSuccess(response.data));
    } else {
      yield put(getMyDetailsFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getUserDetailsWStockx(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getUserDetailsWStockxCall,
      action?.userId,
    );
    if (response?.success) {
      yield put(getUserDetailsWStockxSuccess(response.data));
    } else {
      yield put(getUserDetailsWStockxFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setFCMToken(action: any) {
  try {
    const response: APIResponseProps = yield call(
      action?.isRemoveToken ? removeRegTokenCall : setFCMTokenCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(setFCMTokenSuccess(response.data));
    } else {
      yield put(setFCMTokenFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* likeProduct(action: any) {
  //No loading request
  try {
    const response: APIResponseProps = yield call(
      likeProductCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(likeProductSuccess(response.data));
      analytics().logAddToWishlist({
        items: [{item_id: action?.reqData?.productId}],
      });
    } else {
      yield put(likeProductFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* unlikeProduct(action: any) {
  //No loading request
  try {
    const response: APIResponseProps = yield call(
      unlikeProductCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(unlikeProductSuccess());
    } else {
      yield put(unlikeProductFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* editShippingAddr(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      editShippingAddrCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    action?.errorCallBack();
    console.log(e);
  }
}
export function* updateUser(action: any) {
  if (!action?.reqData?.noLoad) {
    yield put(LoadingRequest());
  }
  try {
    const response: APIResponseProps = yield call(
      updateUserCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(updateUserSuccess(response.data));
      if (!action?.reqData?.noLoad) {
        Alert.showSuccess('Updated successfully!');
      }
    } else {
      yield put(updateUserFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saveSearch(action: any) {
  try {
    const response: APIResponseProps = yield call(
      updateUserCall,
      action?.reqData,
    );
    if (response?.success) {
      saveSearchSuccess();
    } else {
      saveSearchFailure();
    }
  } catch(e) {
    console.log(e);
  }
}

export function* checkStripeLink(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      checkStripeLinkCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* payoutUser(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      payoutUserCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* deleteNotif(action: any) {
  try {
    const response: APIResponseProps = yield call(
      deleteNotifCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(deleteNotifSuccess(response?.data));
    } else {
      yield put(deleteNotifFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* newNotifFalse(action: any) {
  try {
    const response: APIResponseProps = yield call(
      newNotifFalseCall,
      action?.userId,
    );
    if (response?.success) {
      yield put(newNotifFalseSuccess());
    } else {
      yield put(newNotifFalseFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* deleteUser(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      deleteUserCall,
      action?.userId,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(deleteUserSuccess());
      resetRoute();
    } else {
      yield put(newNotifFalseFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export function* versionCheck(action: any) {
  try {
    const response: APIResponseProps = yield call(versionCheckCall);
    if (response?.success) {
      action?.successCallBack(response?.data?.version_num);
    } else {
      action?.errorCallBack();
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saveReferralLink(action: any) {
  try {
    const response: APIResponseProps = yield call(
      saveReferralLinkCall,
      action?.payload,
    );
    if (response?.success) {
      yield put(saveReferralLinkSuccess());
    } else {
      yield put(saveReferralLinkFailure());
    }
  } catch (e) {
    console.log(e);
    saveReferralLinkFailure();
  }
}

export function* getLikedProducts(action: any) {
  try {
    const response: APIResponseProps = yield call(
      getLikedProductsCall,
      action?.reqData,
    );
    if (response?.success) {
      action?.successCallBack(response.data);
    } else {
      action?.errorCallBack(response.error);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* setNotifsAsRead(action: any) {
  try {
    const response: APIResponseProps = yield call(
      setNotifsAsReadCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(setNotifsAsReadSuccess(response.data));
    } else {
      yield put(setNotifsAsReadFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(SIGN_IN_DATA.REQUEST, signInAPI);
  yield takeLatest(SIGN_UP_DATA.REQUEST, signUpAPI);
  yield takeLatest(SIGN_OUT.REQUEST, signOutAPI);
  yield takeLatest(PROFILE_IMG_UPLOAD.REQUEST, uploadProfileImgAPI);
  yield takeLatest(GET_USER_DETAILS.REQUEST, getRequestedUserDetails);
  yield takeLatest(GET_MY_DETAILS.REQUEST, getMyDetails);
  yield takeLatest(GET_MY_DETAILS_NO_LOAD.REQUEST, getMyDetailsNoLoad);
  yield takeLatest(SET_FCM_TOKEN.REQUEST, setFCMToken);
  yield takeLatest(LIKE_PRODUCT.REQUEST, likeProduct);
  yield takeLatest(UNLIKE_PRODUCT.REQUEST, unlikeProduct);
  yield takeLatest(EDIT_SHIPPING_ADDR.REQUEST, editShippingAddr);
  yield takeLatest(UPDATE_USER.REQUEST, updateUser);
  yield takeLatest(CHECK_STRIPE_LINK.REQUEST, checkStripeLink);
  yield takeLatest(PAYOUT_USER.REQUEST, payoutUser);
  yield takeLatest(DELETE_NOTIF.REQUEST, deleteNotif);
  yield takeLatest(NEW_NOTIF_FALSE.REQUEST, newNotifFalse);
  yield takeLatest(DELETE_USER.REQUEST, deleteUser);
  yield takeLatest(VERSION_CHECK.REQUEST, versionCheck);
  yield takeLatest(SAVE_REFERRAL_LINK.REQUEST, saveReferralLink);
  yield takeLatest(SAVE_SEARCH.REQUEST, saveSearch);
  yield takeLatest(GET_LIKED_PRODUCTS.REQUEST, getLikedProducts);
  yield takeLatest(SET_NOTIFS_AS_READ.REQUEST, setNotifsAsRead);
}
