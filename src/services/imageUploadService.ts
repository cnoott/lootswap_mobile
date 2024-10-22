/***
LOOTSWAP - COMMON IMAGE UPLOAD SERVICE
***/

import {API_METHOD} from 'custom_enums';
import {baseURL} from './apiHelpers';

export const getSignedRequest = (file: any) => {
  const newName =
    encodeURIComponent('mobile_upload') +
    (Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).toString();

  return fetch(
    `${baseURL}/sign-s3?file-name=${newName}&file-type=${file.type}`,
    {
      method: API_METHOD.Get,
    },
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const uploadFile = (file: any, signedRequest: string, url: string) => {
  return fetch(signedRequest, {
    method: API_METHOD.Put,
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  })
    .then(response => {
      if (response.status === 200) {
        return url;
      } else {
        return {error: 'Could not return back signed url'};
      }
    })
    .catch(err => console.log('121221 ====', err));
};
