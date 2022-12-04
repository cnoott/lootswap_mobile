import {takeLatest, call, put, delay} from 'redux-saga/effects';
import {SIGN_IN_DATA, SIGN_OUT, SIGN_UP_DATA} from '../../../constants/actions';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
} from './actions';
import {signIn, signUp} from '../../../services/apiEndpoints';
import {Alert} from 'react-native';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};
export function* signInAPI(action: any) {
  try {
    const response: APIResponseProps = yield call(signIn, action?.reqData);
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
  try {
    const response: APIResponseProps = yield call(signUp, action?.reqData);
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

export function* signOutAPI(action: any) {
  try {
    if (true) {
      yield delay(2000);
      yield put(signOutSuccess());
    } else {
      if (response?.error) {
        Alert.alert(response?.error || 'Something went wrong');
      }
      yield put(signOutFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(SIGN_IN_DATA.REQUEST, signInAPI);
  yield takeLatest(SIGN_UP_DATA.REQUEST, signUpAPI);
  yield takeLatest(SIGN_OUT.REQUEST, signOutAPI);
}
