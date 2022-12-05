import {takeLatest, call, put, delay} from 'redux-saga/effects';
import {SIGN_IN_DATA, SIGN_OUT, SIGN_UP_DATA} from '../../../constants/actions';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
} from './actions';
import {signIn, signUp} from '../../../services/apiEndpoints';
import {Alert} from 'react-native';
import {LoadingRequest, LoadingSuccess} from '../loading/actions';

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
      yield put(signInSuccess(response.data));
    } else {
      if (response?.error) {
        Alert.alert(response?.error || 'Something went wrong');
      }
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
      yield put(signUpSuccess(response.data));
    } else {
      if (response?.error) {
        Alert.alert(response?.error || 'Something went wrong');
      }
      yield put(signUpFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* signOutAPI() {
  try {
    yield delay(500);
    yield put(signOutSuccess());
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(SIGN_IN_DATA.REQUEST, signInAPI);
  yield takeLatest(SIGN_UP_DATA.REQUEST, signUpAPI);
  yield takeLatest(SIGN_OUT.REQUEST, signOutAPI);
}
