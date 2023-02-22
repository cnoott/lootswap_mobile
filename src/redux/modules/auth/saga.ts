import {takeLatest, call, put, delay, select} from 'redux-saga/effects';
import {
  PROFILE_IMG_UPLOAD,
  SIGN_IN_DATA,
  SIGN_OUT,
  SIGN_UP_DATA,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  SET_REG_TOKEN,
  GET_MY_DETAILS_NO_LOAD,
  LIKE_PRODUCT,
  UNLIKE_PRODUCT,
  EDIT_SHIPPING_ADDR,
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
  setRegTokenSuccess,
  setRegTokenFailure,
  likeProductSuccess,
  likeProductFailure,
  unlikeProductSuccess,
  unlikeProductFailure,
  setRegTokenRequest,
} from './actions';
import {
  signIn,
  signUp,
  getProfileImageSignedURL,
  uploadProfileImage,
  getRequestedUserDetailsCall,
  setRegTokenCall,
  likeProductCall,
  unlikeProductCall,
  removeRegTokenCall,
  editShippingAddrCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {resetRoute} from '../../../navigation/navigationHelper';

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
      yield put(
        setRegTokenRequest({
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
      yield put(
        setRegTokenRequest({
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
    yield put(
      setRegTokenRequest({userId: authData?.userData?._id, token: ''}, true), // Remove FCM Token Call
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
  yield put(LoadingRequest());
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
  yield put(LoadingRequest());
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

export function* setRegToken(action: any) {
  try {
    const response: APIResponseProps = yield call(
      action?.isRemoveToken ? removeRegTokenCall : setRegTokenCall,
      action?.reqData,
    );
    if (response?.success) {
      yield put(setRegTokenSuccess(response.data));
    } else {
      yield put(setRegTokenFailure(response.error));
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

export default function* authSaga() {
  yield takeLatest(SIGN_IN_DATA.REQUEST, signInAPI);
  yield takeLatest(SIGN_UP_DATA.REQUEST, signUpAPI);
  yield takeLatest(SIGN_OUT.REQUEST, signOutAPI);
  yield takeLatest(PROFILE_IMG_UPLOAD.REQUEST, uploadProfileImgAPI);
  yield takeLatest(GET_USER_DETAILS.REQUEST, getRequestedUserDetails);
  yield takeLatest(GET_MY_DETAILS.REQUEST, getMyDetails);
  yield takeLatest(GET_MY_DETAILS_NO_LOAD.REQUEST, getMyDetailsNoLoad);
  yield takeLatest(SET_REG_TOKEN.REQUEST, setRegToken);
  yield takeLatest(LIKE_PRODUCT.REQUEST, likeProduct);
  yield takeLatest(UNLIKE_PRODUCT.REQUEST, unlikeProduct);
  yield takeLatest(EDIT_SHIPPING_ADDR.REQUEST, editShippingAddr);
}
