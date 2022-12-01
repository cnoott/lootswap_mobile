/***
LOOTSWAP - COMMON API SERVICE
***/

import {API_METHOD} from 'custom_enums';
import {Alert} from 'react-native';

export async function CommonFetch(params: any, opt: any) {
  let result: any;
  const isInternetWorking = true;

  if (isInternetWorking) {
    try {
      const URL = 'http://lootswap.com/api' + `${opt.endPoint}`;
      const ReqOptions: any = {
        URL,
        method: opt.method,
        headers: {},
        body: params,
        timeout: 600000,
      };

      ReqOptions.headers.Accept = 'application/json';
      ReqOptions.headers['Content-Type'] = 'application/json';
      const sessionToken: any = null;

      if (sessionToken && sessionToken.user && sessionToken.user.tokens) {
        ReqOptions.headers.Authorization = `Bearer ${sessionToken.user.tokens.access.token}`;
      } else {
        ReqOptions.headers.Authorization = '';
      }

      if (ReqOptions.method === API_METHOD.Get) {
        delete ReqOptions.body;
      } else {
        ReqOptions.body = JSON.stringify(ReqOptions.body);
      }

      try {
        return new Promise((Resolve, Reject) => {
          requestTimeoutPromise(
            ReqOptions.timeout,
            fetch(ReqOptions.URL, ReqOptions),
            Resolve,
            Reject,
          );
        })
          .then(async (Response: any) => {
            if (
              Response.status === 200 ||
              Response.status === 201 ||
              Response.status === 204
            ) {
              await Response.json().then((data: any) => {
                result = {...data};
                return result;
              });
              return result;
            } else if (Response.status === 400 || Response.status === 404) {
              Response.json().then((res: any) => {
                if (res?.message) {
                  Alert.alert(res?.message);
                }
              });
            } else {
              Alert.alert('Something went wrong!');
            }
          })
          .catch();
      } catch (error) {}
    } catch (error) {}
  } else {
    Alert.alert('Something went wrong!');
  }
}

/**
 * Request Timeout Promise
 */
function requestTimeoutPromise(
  waitingTime,
  promise,
  resolveInternal,
  rejectInternal,
) {
  const timeoutId = setTimeout(() => {
    rejectInternal('TIMEOUT');
  }, waitingTime);
  try {
    promise.then(
      (res: any) => {
        clearTimeout(timeoutId);
        resolveInternal(res);
      },
      (resError: any) => {
        clearTimeout(timeoutId);
        rejectInternal('Request Timeout');
      },
    );
  } catch (error) {}
}
