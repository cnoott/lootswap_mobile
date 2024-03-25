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

export const signOut = (body: any) => {
  return handleResponse(api.post('signout', body), API_RESPONSE.CODE200);
};

export const signInWithGoogleCall = (body: any) => {
  return handleResponse(
    api.post('signin-with-google', body),
    API_RESPONSE.CODE200,
  );
};

export const signInWithAppleCall = (body: any) => {
  return handleResponse(
    api.post('signin-with-apple', body),
    API_RESPONSE.CODE200,
  );
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

export const getUserDetailsWStockxCall = (userId: string) => {
  return handleResponse(
    api.get(`user-with-stockx/${userId}`),
    API_RESPONSE.CODE200,
  );
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

export const sendMessageCall = (reqData: any) => {
  return handleResponse(
    api.post(`message/${reqData?.userId}/${reqData?.messageId}`, reqData),
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

export const getHomeScreenProductsCall = (reqData: any) => {
  return handleResponse(
    api.get(
      `products/?skip=${reqData.page * reqData.itemsPerPage}&limit=${
        reqData.itemsPerPage
      }`,
    ),
    API_RESPONSE.CODE200,
  );
};

export const getHotProductsCall = (reqData: any) => {
  return handleResponse(
    api.get(
      `hot-products/?skip=${reqData.page * reqData.itemsPerPage}&limit=${
        reqData.itemsPerPage
      }`,
    ),
    API_RESPONSE.CODE200,
  );
};

export const sendTradeOfferCall = (reqData: any) => {
  return handleResponse(
    api.post(`start-trade/${reqData?.sender}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const sendTradeMessageCall = (reqData: any) => {
  return handleResponse(
    api.post(`trade/message/${reqData?.userId}/${reqData?.messageId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const startTradeCheckoutCall = (reqData: any) => {
  return handleResponse(
    api.post(`start-trade-checkout/${reqData?.userId}`, reqData.tradeData),
    API_RESPONSE.CODE200,
  );
};

export const startMoneyOfferTradeCall = (reqData: any) => {
  return handleResponse(
    api.post(`start-money-offer-trade/${reqData?.userId}`, reqData.tradeData),
    API_RESPONSE.CODE200,
  );
};

export const editTradeCheckoutCall = (reqData: any) => {
  return handleResponse(
    api.put(
      `/trade/edit-checkout/${reqData?.userId}/${reqData?.tradeId}`,
      reqData,
    ),
    API_RESPONSE.CODE200,
  );
};

export const undoTradeCheckoutCall = (reqData: any) => {
  return handleResponse(
    api.delete(
      `undo-trade-checkout/${reqData?.userId}/${reqData?.tradeId}`,
      reqData,
    ),
    API_RESPONSE.CODE200,
  );
};

export const createNewProductCall = (reqData: any) => {
  return handleResponse(
    api.post(`/product/create/${reqData?.userId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const fetchMarketDataCall = (reqData: any) => {
  return handleResponse(
    api.post(`/market-data/`, reqData),
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
    api.get(`/trade/${reqData?.tradeId}/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const getTradeWithStockxCall = (reqData: any) => {
  return handleResponse(
    api.get(`/trade-stockx/${reqData?.tradeId}/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const acceptTradeCheckoutCall = (reqData: any) => {
  return handleResponse(
    api.post(
      `/trade/accept-trade-checkout/${reqData?.userId}/${reqData?.tradeId}`,
    ),
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
    api.get(`/populated-order/${reqData?.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const getAllMyMessagesCall = (userId: string) => {
  return handleResponse(
    api.get(`/read-my-messages/${userId}`),
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

export const setNotifsAsReadCall = (reqData: any) => {
  const {notifType} = reqData;
  return handleResponse(
    api.post(`/set-notifs-as-read/${reqData?.userId}`, {notifType}),
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

export const setFCMTokenCall = (reqData: any) => {
  return handleResponse(
    api.post('/save-fcm-token', reqData),
    API_RESPONSE.CODE200,
  );
};

export const likeProductCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/like-product/${reqData?.userId}`, {
      productId: reqData?.productId,
    }),
    API_RESPONSE.CODE200,
  );
};

export const unlikeProductCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/unlike-product/${reqData?.userId}`, {
      productId: reqData?.productId,
    }),
    API_RESPONSE.CODE200,
  );
};

export const removeRegTokenCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/remove-reg-token/${reqData?.userId}`, {
      token: reqData?.fcmToken,
    }),
    API_RESPONSE.CODE200,
  );
};

export const editShippingAddrCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/${reqData?.userId}/update-shipping`, {
      addr: {...reqData?.address, country: 'US'},
    }),
    API_RESPONSE.CODE200,
  );
};

export const updateUserCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/${reqData?.userId}`, {
      userData: reqData?.userData,
    }),
    API_RESPONSE.CODE200,
  );
};

export const checkStripeLinkCall = (reqData: any) => {
  return handleResponse(
    api.get(`/user/check-stripe/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const payoutUserCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/payout/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const deleteNotifCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/delete-notification/${reqData?.userId}`, {
      notifs: reqData?.notifs,
    }),
    API_RESPONSE.CODE200,
  );
};

export const newNotifFalseCall = (userId: string) => {
  return handleResponse(
    api.put(`/user/new-notif-false/${userId}`),
    API_RESPONSE.CODE200,
  );
};

export const deleteUserCall = (userId: string) => {
  return handleResponse(
    api.put(`/user/delete-account/${userId}`),
    API_RESPONSE.CODE200,
  );
};

export const deleteProductCall = (reqData: any) => {
  return handleResponse(
    api.delete(`/product/${reqData?.productId}/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const versionCheckCall = () => {
  return handleResponse(api.get('/get-latest-version'), API_RESPONSE.CODE200);
};

export const saveReferralLinkCall = (payload: any) => {
  return handleResponse(
    api.post(`/save-referral-link/${payload?.userId}`, {
      referralLink: payload?.referralLink,
    }),
    API_RESPONSE.CODE200,
  );
};

export const newRatingCall = (reqData: any) => {
  return handleResponse(
    api.put(`/user/new-rating/${reqData?.userId}`, {
      otherUserId: reqData?.otherUserId,
      orderId: reqData?.orderId,
      ratingData: reqData?.ratingData,
    }),
    API_RESPONSE.CODE200,
  );
};

export const setFirstTimeOpenFalseCall = (reqData: any) => {
  return handleResponse(
    api.put(`/set-first-time-open-false/${reqData.userId}/${reqData.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const searchStockxCall = (reqData: any) => {
  return handleResponse(
    api.post(`/search-stockx/${reqData.userId}`, {query: reqData.query}),
    API_RESPONSE.CODE200,
  );
};

export const getAvaliableSizesCall = () => {
  return handleResponse(api.get('/avaliable-sizes/'), API_RESPONSE.CODE200);
};

export const filterProductsCall = (reqData: any) => {
  const {page, itemsPerPage} = reqData;
  return handleResponse(
    api.post(
      `/products/filter/?skip=${page * itemsPerPage}&limit=${itemsPerPage}`,
      reqData,
    ),
    API_RESPONSE.CODE200,
  );
};

export const getRecommendedSearchCall = (reqData: any) => {
  const query = encodeURIComponent(reqData.query);
  return handleResponse(
    api.get(`/recommended-search/?query=${query}`),
    API_RESPONSE.CODE200,
  );
};

export const getLikedProductsCall = (reqData: any) => {
  return handleResponse(
    api.get(`/user/liked-products/${reqData?.userId}`),
    API_RESPONSE.CODE200,
  );
};

export const publicOfferCheckoutCall = (reqData: any) => {
  return handleResponse(
    api.post(`/create-public-offer/${reqData?.userId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const acceptPublicOfferCall = (reqData: any) => {
  return handleResponse(
    api.post(
      `/accept-public-offer/${reqData?.userId}/${reqData?.publicOffer._id}`,
      reqData,
    ),
    API_RESPONSE.CODE200,
  );
};

export const getHomeScreenPublicOffersCall = (reqData: any) => {
  return handleResponse(
    api.get(
      `/home-public-offers/?skip=${reqData.page * reqData.itemsPerPage}&limit=${
        reqData.itemsPerPage
      }`,
    ),
    API_RESPONSE.CODE200,
  );
};

export const deletePublicOfferCall = (reqData: any) => {
  return handleResponse(
    api.delete(`/public-offer/${reqData?.userId}/${reqData?.publicOfferId}`),
    API_RESPONSE.CODE200,
  );
};

export const getPublicOffersCall = (reqData: any) => {
  const type = encodeURIComponent(reqData.type);
  const skipLimit = reqData?.pagination
    ? `&skip=${reqData.page * reqData.itemsPerPage}&limit=${
        reqData.itemsPerPage
      }`
    : '';
  return handleResponse(
    api.get(`/public-offers/${reqData?.userId}/?type=${type}${skipLimit}`),
    API_RESPONSE.CODE200,
  );
};

export const fetchRelatedItemDataCall = (reqData: any) => {
  return handleResponse(
    api.post(`/fetch-related-item-data`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const setOrderNotifAsReadCall = (reqData: any) => {
  return handleResponse(
    api.put(`/order/new-notif-false/${reqData?.userId}/${reqData?.orderId}`),
    API_RESPONSE.CODE200,
  );
};

export const setPaypalOrderNotifAsReadCall = (reqData: any) => {
  return handleResponse(
    api.put(
      `/paypal/new-notif-false/${reqData?.paypalOrderId}/${reqData?.userId}`,
    ),
    API_RESPONSE.CODE200,
  );
};

export const createPaypalOrderCall = (reqData: any) => {
  return handleResponse(
    api.post(`/create-order/${reqData?.productId}/${reqData?.userId}`, reqData),
    API_RESPONSE.CODE200,
  );
};

export const capturePaypalOrderCall = (reqData: any) => {
  return handleResponse(
    api.post(
      `/capture-order/${reqData?.paypalId}/${reqData?.productId}/${reqData?.userId}`,
      reqData,
    ),
    API_RESPONSE.CODE200,
  );
};

export const joinOrLeaveChannelCall = (reqData: any) => {
  return handleResponse(
    api.post(`/join-or-leave-channel/${reqData?.userId}`, reqData),
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
        res.status === 401 ||
        res.status === 403 ||
        res.status === 500
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
        //XXX not being called
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
