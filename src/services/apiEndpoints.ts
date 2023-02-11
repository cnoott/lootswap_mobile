import _ from 'lodash';
import * as ApiHelper from './apiHelpers';
import {API_RESPONSE} from '../constants/stringConstants';
import {Alert} from 'custom_top_alert';

type ApiRetryTypes = {baseUrl?: string; retry: number};

let API_RETRY: ApiRetryTypes = {baseUrl: '', retry: 0};
let isTokenExpired = false;
const api = ApiHelper.createAxiosInstanceWithHeader();
api.interceptors.request.use(ApiHelper.globalUserTokenInterceptor);
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

export const getProfileImageSignedURL = (body: any) => {
  const {type} = body;
  const newName = Math.floor(Math.random() * 9999) + encodeURIComponent('test');
  return handleResponse(
    api.get(`sign-s3?file-name=${newName}&file-type=${type}`),
    API_RESPONSE.CODE200,
  );
};

export const uploadProfileImage = (signedImgData: any, imageFileData: any) => {
  const {signedRequest} = signedImgData;
  const profileImgUploadApi =
    ApiHelper.createProfileImageUploadAxiosInstanceWithHeader(
      imageFileData,
      signedRequest,
    );

  return handleResponse(
    profileImgUploadApi.put('', imageFileData),
    API_RESPONSE.CODE200,
  );
};

export const getRequestedUserDetailsCall = (userId: string) => {
  return handleResponse(api.get(`user/${userId}`), API_RESPONSE.CODE200);
};

export const getRequestedProductDetailsCall = (productId: string) => {
  return handleResponse(api.get(`product/${productId}`), API_RESPONSE.CODE200);
};

export const getMessageInitiatedstatusCall = (reqData: any) => {
  return handleResponse(
    api.post('check-if-already-messaged', reqData),
    API_RESPONSE.CODE200,
  );
};

export const createFirstMessageCall = (reqData: any) => {
  return handleResponse(
    api.post(`create-message-mobile/${reqData?.userId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const getMessageHistoryCall = (reqData: any) => {
  return handleResponse(
    api.get(`message/${reqData?.userId}/${reqData?.messageId}`),
    API_RESPONSE.CODE200,
  );
};

export const getProductListedItemsForOfferCall = (userId: string) => {
  return handleResponse(
    api.get(`user/${userId}/my-listed-items`),
    API_RESPONSE.CODE200,
  );
};

export const sendTradeOfferCall = (reqData: any) => {
  return handleResponse(
    api.post(`start-trade/${reqData?.sender}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const createNewProductCall = (reqData: any) => {
  return handleResponse(
    api.post(`/product/create/${reqData?.userId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const updateProductCall = (reqData: any) => {
  return handleResponse(
    api.put(`/product/${reqData?.productIdToUpdate}/${reqData?.userId}`, {
      product: reqData,
    }),
    API_RESPONSE.CODE200,
  );
};

export const getTradesHistoryCall = (reqData: any) => {
  return handleResponse(
    api.get(`/trades/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const getTradeCall = (reqData: any) => {
  return handleResponse(
    api.get(`/get-trade/${reqData?.tradeId}/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const acceptTradeCall = (reqData: any) => {
  return handleResponse(
    api.post(`/order/create/${reqData?.userId}/${reqData?.tradeId}`),
    API_RESPONSE.CODE200,
  );
};

export const acceptMoneyOfferTradeCall = (reqData: any) => {
  return handleResponse(
    api.put(`/accept-money-offer-trade/${reqData?.userId}/${reqData?.tradeId}`),
    API_RESPONSE.CODE200,
  );
};

export const cancelTradeCall = (reqData: any) => {
  return handleResponse(
    api.put(`/cancel-trade/${reqData?.userId}/${reqData?.tradeId}`),
    API_RESPONSE.CODE200,
  );
};

export const addItemsCall = (reqData: any) => {
  return handleResponse(
    api.put(`/add-items/${reqData?.userId}/${reqData?.tradeId}`, {
      itemIds: reqData?.itemIds,
    }),
    API_RESPONSE.CODE200,
  );
};

export const removeItemsCall = (reqData: any) => {
  return handleResponse(
    api.put(`/remove-items/${reqData?.userId}/${reqData?.tradeId}`, {
      itemIds: reqData?.itemIds,
    }),
    API_RESPONSE.CODE200,
  );
};

export const changeMoneyOfferCall = (reqData: any) => {
  return handleResponse(
    api.put(`/change-money-offer/${reqData?.userId}/${reqData?.tradeId}`, {
      moneyOffer: reqData?.moneyOffer,
    }),
    API_RESPONSE.CODE200,
  );
};

export const getAllOrdersCall = (reqData: any) => {
  return handleResponse(
    api.get(`/get-both-orders/${reqData.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const getOrderCall = (reqData: any) => {
  return handleResponse(
    api.get(`/order/mobile-get-order/${reqData?.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const getAllMyMessagesCall = (userId: string) => {
  return handleResponse(
    api.get(`/read-my-messages/${userId}`),
    API_RESPONSE.CODE200,
  );
};

export const getTradeShippingRatesCall = (reqData: any) => {
  return handleResponse(
    api.post(`/get-rates/${reqData?.userId}/${reqData?.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const fetchPaymentSheetCall = (reqData: any) => {
  return handleResponse(
    api.get(`/mobile-trade-checkout/${reqData?.userId}/${reqData?.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const getOrderFromTradeCall = (reqData: any) => {
  return handleResponse(
    api.get(`/get-order-from-trade/${reqData?.userId}/${reqData?.tradeId}`),
    API_RESPONSE.CODE200,
  );
};

export const saleGenerateCarrierRatesCall = (reqData: any) => {
  return handleResponse(
    api.post(
      `/paypal-get-rates/${reqData?.userId}/${reqData?.productId}/${reqData?.paypalOrderId}`,
      reqData?.dim,
    ),
    API_RESPONSE.CODE200,
  );
};

export const checkoutRateCall = (reqData: any) => {
  return handleResponse(
    api.post(
      `/mobile-paypal-checkout-rate/${reqData?.userId}/${reqData?.paypalOrderId}`,
      reqData?.rate,
    ),
    API_RESPONSE.CODE200,
  );
};

export const generateLinkPaypalCall = (reqData: any) => {
  const {email, redirectUrl, _id} = reqData;
  return handleResponse(
    api.post('/generate-signin', {
      email,
      redirectUrl,
      _id,
    }),
    API_RESPONSE.CODE200,
  );
};

export const savePaypalCall = (reqData: any) => {
  return handleResponse(
    api.put(`/save-paypal/${reqData?.userId}`, {
      paypalInfo: reqData?.paypalInfo,
    }),
    API_RESPONSE.CODE200,
  );
};

export const getPaypalOrderCall = (reqData: any) => {
  return handleResponse(
    api.get(`/mobile-read-paypal-order/${reqData?.paypalOrderId}`),
    API_RESPONSE.CODE200,
  );
};

export const setRegTokenCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/add-reg-token/${reqData?.userId}`, {token: reqData?.token}),
    API_RESPONSE.CODE200,
  );
};

const handleResponse = (call: any, code: any, detailErrorMsg?: any) => {
  return call
    .then((res: any) => {
      //console.log('API Response: ', res);

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
            ? ApiHelper.retrieveDetailMessageFromResponse(res)
            : ApiHelper.retrieveErrorMessageFromResponse(res),
        };
        Alert.showError(errorObj?.error || 'Something went wrong');
        return errorObj;
      } else if (res.status === 401) {
        return;
      } else if (res.status === 500) {
        var debounce_fun = _.debounce(() => {
          const err = ApiHelper.retrieveDetailMessageFromResponse(res);
          if (err === 'Token is expire!' && !isTokenExpired) {
            isTokenExpired = true;
          }
        }, 2000);
        debounce_fun();
        return;
      }
      throw {
        status: res.status,
        error: ApiHelper.retrieveErrorMessageFromResponse(res),
      };
    })
    .catch((error: any) => {
      return {error};
    });
};
