import axios from 'axios';
import _ from 'lodash';
import ReduxStore from '../redux/store/store';
import {API, SOCKET_API} from '@env';

export const baseURL = API;
export const baseURLMessage = `${SOCKET_API}/messages`;
export const baseURLPriveteMessage = SOCKET_API;

const TIME_OUT = 30000;
export const createAxiosInstanceWithHeader = () => {
  const api = axios.create({
    timeout: TIME_OUT,
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    validateStatus: status => status >= 200 && status <= 500,
  });
  return api;
};

export const globalUserTokenInterceptor = (config: any) => {
  const {store} = ReduxStore;
  const state = store.getState();
  if (!_.has(config, 'headers.Authorization')) {
    _.merge(config, {
      headers: {Authorization: `Bearer ${state.auth.authToken}`},
    });
  }
  return config;
};

export const createProfileImageUploadAxiosInstanceWithHeader = (
  file: any,
  signedRequest: string,
) => {
  const api = axios.create({
    timeout: TIME_OUT,
    baseURL: signedRequest,
    headers: {
      'Content-Type': file.type,
    },
    validateStatus: status => status >= 200 && status <= 500,
  });
  return api;
};

export const retrieveErrorMessageFromResponse = (res: any) => {
  return _.get(res, 'data.message') || _.get(res, 'data.error');
};

export const retrieveDetailMessageFromResponse = (res: any) => {
  const errors = _.get(res, 'data.errors');
  if (!errors) {
    return retrieveErrorMessageFromResponse(res);
  }
  let message = '';
  Object.values(errors).map((element: any) => {
    message += element[0] + '\n';
  });
  return message;
};
