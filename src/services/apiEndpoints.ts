import _ from 'lodash';
import * as utils from './apiHelpers';
import {API_RESPONSE} from '../constants/stringConstants';
import {Alert} from 'custom_top_alert';

type ApiRetryTypes = {baseUrl?: string; retry: number};

let API_RETRY: ApiRetryTypes = {baseUrl: '', retry: 0};
let isTokenExpired = false;
const api = utils.createAxiosInstanceWithHeader();

api.interceptors.response.use(
  response => {
    const originalRequest = response.config;
    if (response.status >= 300) {
      if (
        API_RETRY.baseUrl === response.config.baseURL &&
        API_RETRY.retry === 3
      ) {
        return response;
      }

      if (API_RETRY.baseUrl !== response.config.baseURL) {
        API_RETRY.retry = 0;
      }

      API_RETRY.baseUrl = response.config.baseURL;
      API_RETRY.retry = API_RETRY.retry + 1;

      return api(originalRequest);
    }
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

export const signIn = (body: any) => {
  return handleResponse(api.post('signin', body), API_RESPONSE.CODE200);
};

export const signUp = (body: any) => {
  return handleResponse(api.post('signup', body), API_RESPONSE.CODE200);
};

const handleResponse = (call: any, code: any, detailErrorMsg?: any) => {
  return call
    .then((res: any) => {
      console.log('API Response: ', res);

      if (res.status === code) {
        return {status: res.status, success: true, data: res.data};
      } else if (
        res.status === 422 ||
        res.status === 400 ||
        res.status === 409 ||
        res.status === 401
      ) {
        const errorObj = {
          status: res.status,
          error: detailErrorMsg
            ? utils.retrieveDetailMessageFromResponse(res)
            : utils.retrieveErrorMessageFromResponse(res),
        };
        Alert.showError(errorObj?.error || 'Something went wrong');
        return errorObj;
      } else if (res.status === 401) {
        return;
      } else if (res.status === 500) {
        var debounce_fun = _.debounce(() => {
          const err = utils.retrieveDetailMessageFromResponse(res);
          if (err === 'Token is expire!' && !isTokenExpired) {
            isTokenExpired = true;
          }
        }, 2000);
        debounce_fun();
        return;
      }
      throw {
        status: res.status,
        error: utils.retrieveErrorMessageFromResponse(res),
      };
    })
    .catch((error: any) => {
      return {error};
    });
};
