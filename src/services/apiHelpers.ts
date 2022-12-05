import axios from 'axios';
import _ from 'lodash';
//import {API} from '@env';

const TIME_OUT = 30000;
export const createAxiosInstanceWithHeader = () => {
  const api = axios.create({
    timeout: TIME_OUT,
    baseURL: 'http://192.168.0.105:8000/api',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
