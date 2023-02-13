import {takeLatest, call, put, delay} from 'redux-saga/effects';
import {
  PROFILE_IMG_UPLOAD,
  SIGN_IN_DATA,
  SIGN_OUT,
  SIGN_UP_DATA,
  GET_USER_DETAILS,
  GET_MY_DETAILS,
  SET_REG_TOKEN,
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
} from './actions';
import {
  signIn,
  signUp,
  getProfileImageSignedURL,
  uploadProfileImage,
  getRequestedUserDetailsCall,
  setRegTokenCall,
} from '../../../services/apiEndpoints';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';
import {resetRoute} from '../../../navigation/navigationHelper';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};
export function* signInAPI(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(signIn, action?.reqData);
    yield put(LoadingSuccess());
    if (response?.success) {
      resetRoute();
      yield put(signInSuccess(response.data));
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

export function* setRegToken(action: any) {
  yield put(LoadingRequest());
  try {
    const response: APIResponseProps = yield call(
      setRegTokenCall,
      action?.reqData,
    );
    yield put(LoadingSuccess());
    if (response?.success) {
      yield put(setRegTokenSuccess(response.data));
    } else {
      yield put(setRegTokenFailure(response.error));
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
  yield takeLatest(SET_REG_TOKEN.REQUEST, setRegToken);
}
