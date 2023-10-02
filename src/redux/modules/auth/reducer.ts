// @flow

import {
  SIGN_IN_DATA,
  SIGN_UP_DATA,
  SIGN_OUT,
  PROFILE_IMG_UPLOAD,
  GET_USER_DETAILS,
  PRESELECT_CHOSEN_ITEM,
  GET_MY_DETAILS,
  SET_REG_TOKEN,
  GET_MY_DETAILS_NO_LOAD,
  GET_USER_DETAILS_W_STOCKX,
  SET_FCM_TOKEN,
  UPDATE_USER,
  DELETE_NOTIF,
  CANCEL_TRADE,
  DELETE_USER,
  NEW_NOTIF_FALSE,
  NEW_NOTIF_TRUE,
  SAVE_REFERRAL_LINK,
  SAVE_SEARCH,
} from '../../../constants/actions';
import {getCombinedRatings} from '../../../utility/utility';
//import messaging from '@react-native-firebase/messaging';
//import {setRegTokenRequest} from '../../../redux/modules';

export interface AuthProps {
  isLoading?: boolean;
  error?: any;
  data?: any;
  userData?: any;
  authToken?: any;
  imgUpload?: boolean;
  imgError?: any;
  profileImgData?: any;
  requestedUserDetails?: any;
  isLogedIn?: boolean;
  fcmToken?: any;
}

type ActionProps = {
  type: string;
  error: any;
  payload: any;
  clearOldData?: boolean;
  fcmToken?: any;
};

export const InitialState: AuthProps = {
  isLoading: false,
  error: null,
  data: null,
  userData: null,
  authToken: null,
  imgUpload: false,
  imgError: null,
  profileImgData: null,
  requestedUserDetails: null,
  isLogedIn: false,
  fcmToken: null,
};

export default function auth(state = InitialState, action: ActionProps) {
  const {type, payload, error, clearOldData = true, fcmToken} = action;

  switch (type) {
    case SIGN_IN_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SIGN_IN_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: payload?.user,
        authToken: payload?.token,
        isLogedIn: true,
        error: null,
      };
    }
    case SIGN_IN_DATA.UPDATE: {
      return {
        ...state,
        isLoading: false,
        userData: payload,
        isLogedIn: true,
        error: null,
      };
    }
    case SIGN_IN_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        userData: null,
        authToken: null,
        isLogedIn: false,
      };
    }

    case SIGN_UP_DATA.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SIGN_UP_DATA.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: payload?.user,
        authToken: payload?.token,
        isLogedIn: true,
        error: null,
      };
    }
    case SIGN_UP_DATA.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        userData: null,
        authToken: null,
        isLogedIn: false,
      };
    }
    case SIGN_OUT.REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SIGN_OUT.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: null,
        authToken: null,
        isLogedIn: false,
        error: null,
      };
    }
    case SIGN_OUT.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: error,
        data: null,
        authToken: null,
        isLogedIn: false,
      };
    }

    case PROFILE_IMG_UPLOAD.REQUEST: {
      return {
        ...state,
        imgUpload: true,
        imgError: null,
      };
    }
    case PROFILE_IMG_UPLOAD.SUCCESS: {
      return {
        ...state,
        imgUpload: false,
        imgError: null,
        profileImgData: payload,
      };
    }
    case PROFILE_IMG_UPLOAD.FAILURE: {
      return {
        ...state,
        imgUpload: false,
        imgError: error,
      };
    }
    case GET_USER_DETAILS.REQUEST: {
      return {
        ...state,
        requestedUserDetails: clearOldData ? null : state?.requestedUserDetails,
      };
    }
    case GET_USER_DETAILS.SUCCESS: {
      const combinedRatings = getCombinedRatings(payload?.ratings);
      const my_items = payload.my_items.filter(
        item => item.isVisible && item.isVirtuallyVerified,
      );
      return {
        ...state,
        requestedUserDetails: payload
          ? {...payload, combinedRatings: combinedRatings, my_items}
          : null,
      };
    }
    case GET_USER_DETAILS.FAILURE: {
      return {
        ...state,
        requestedUserDetails: null,
      };
    }
    case PRESELECT_CHOSEN_ITEM.SUCCESS: {
      let items = [...state.requestedUserDetails.my_items];
      const productId = action?.productId;
      const foundItemIndex = items?.findIndex(item => item?._id === productId);
      const foundItem = items[foundItemIndex];
      foundItem.isSelected = true;
      items = items.filter(item => item?._id !== productId);

      items.unshift(foundItem);
      return {
        ...state,
        requestedUserDetails: {
          ...state.requestedUserDetails,
          my_items: items,
        },
      };
    }
    case GET_MY_DETAILS.REQUEST: {
      return {
        ...state,
      };
    }
    case GET_MY_DETAILS.SUCCESS: {
      const my_items = payload.my_items.filter(
        item => item.isVisible && item.isVirtuallyVerified,
      );
      return {
        ...state,
        userData: {...state.userData, ...payload, my_items},
      };
    }
    case GET_MY_DETAILS.FAILURE: {
      return {
        ...state,
      };
    }
    case GET_USER_DETAILS_W_STOCKX.REQUEST:
    case GET_MY_DETAILS_NO_LOAD.REQUEST: {
      return {
        ...state,
      };
    }
    case GET_USER_DETAILS_W_STOCKX.SUCCESS:
    case GET_MY_DETAILS_NO_LOAD.SUCCESS: {
      const my_items = payload.my_items.filter(
        item => item.isVisible && item.isVirtuallyVerified,
      );
      return {
        ...state,
        userData: {...state.userData, ...payload, my_items},
      };
    }
    case GET_USER_DETAILS_W_STOCKX.FAILURE:
    case GET_MY_DETAILS_NO_LOAD.FAILURE: {
      return {
        ...state,
      };
    }
    case SET_REG_TOKEN.REQUEST: {
      return {
        ...state,
      };
    }
    case SET_REG_TOKEN.SUCCESS: {
      return {
        ...state,
      };
    }
    case SET_REG_TOKEN.FAILURE: {
      return {
        ...state,
      };
    }
    case SET_FCM_TOKEN.REQUEST: {
      return {
        ...state,
        fcmToken: fcmToken,
      };
    }
    case UPDATE_USER.REQUEST: {
      return {
        ...state,
        userData: {...state.userData, ...action?.reqData?.userData},
      };
    }
    case UPDATE_USER.SUCCESS: {
      return {
        ...state,
        userData: {...state.userData, ...payload},
      };
    }
    case UPDATE_USER.FAILURE: {
      return {
        ...state,
      };
    }
    case DELETE_NOTIF.REQUEST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          notifications: state.userData.notifications.filter(
            notif => notif._id !== action.reqData.notif._id,
          ),
        },
      };
    }
    case DELETE_NOTIF.SUCCESS: {
      return {
        ...state,
      };
    }
    case DELETE_NOTIF.FAILURE: {
      return {
        ...state,
      };
    }
    case NEW_NOTIF_FALSE.REQUEST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          newNotification: false,
        },
      };
    }
    case NEW_NOTIF_FALSE.SUCCESS: {
      return {
        ...state,
      };
    }
    case NEW_NOTIF_FALSE.FAILURE: {
      return {
        ...state,
      };
    }
    case NEW_NOTIF_TRUE.SUCCESS: {
      return {
        ...state,
        userData: {
          ...state.userData,
          newNotification: true,
        },
      };
    }
    case DELETE_USER.REQUEST: {
      return {
        ...state,
      };
    }
    case DELETE_USER.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: null,
        authToken: null,
        isLogedIn: false,
        error: null,
      };
    }
    case DELETE_USER.FAILURE: {
      return {
        ...state,
      };
    }
    case SAVE_REFERRAL_LINK.REQUEST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          referralLink: action?.payload.referralLink,
        },
      };
    }
    case SAVE_SEARCH.REQUEST: {
      return {
        ...state,
        userData: {
          ...state.userData,
          recentSearches: action?.reqData?.userData?.recentSearches,
        },
      };
    }

    default:
      return state;
  }
}
