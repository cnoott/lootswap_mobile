import {takeLatest, call, put} from 'redux-saga/effects';
import {AUTH_DATA, SIGN_UP_DATA} from '../../../constants/actions';
import {CommonFetch} from '../../../services/apiService';
import {authDataSuccess, authDataFailure} from './actions';
import {API_METHOD} from 'custom_enums';

type APIResponseProps = {
  success: boolean;
  data?: any;
  error?: any;
};

type OptionsProps = {
  method: string;
  endPoint?: string;
  body?: any;
  type?: any;
};

const OPTIONS: OptionsProps = {
  method: '',
  endPoint: '',
  body: null,
  type: null,
};

export function* getSignInData(action: any) {
  try {
    OPTIONS.method = API_METHOD.Post;
    OPTIONS.endPoint = '/signin';
    const response: APIResponseProps = yield call(
      CommonFetch,
      action?.reqData,
      OPTIONS,
    );
    if (response?.success) {
      yield put(authDataSuccess(response.data));
    } else {
      yield put(authDataFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* userSignupCall(action: any) {
  try {
    OPTIONS.method = API_METHOD.Post;
    OPTIONS.endPoint = '/signup';
    const response: APIResponseProps = yield call(
      CommonFetch,
      action?.reqData,
      OPTIONS,
    );
    if (response?.success) {
      yield put(authDataSuccess(response.data));
    } else {
      yield put(authDataFailure(response.error));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(AUTH_DATA.REQUEST, getSignInData);
  yield takeLatest(SIGN_UP_DATA.REQUEST, userSignupCall);
}
