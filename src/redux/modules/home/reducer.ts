// @flow

import {
  GET_PRODUCT_DETAILS,
  ADD_PRODUCT,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
  SHOULD_SHOW_GIVEAWAY,
} from '../../../constants/actions';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {
  getAddProductRawData,
  findMarketDataFromSize,
} from '../../../utility/utility';

export interface HomeProps {
  selectedProductDetails: any;
  addProductData: ADD_PRODUCT_TYPE;
  shouldShowGiveaway: Boolean;
  giveawayImage: string;
  giveawayColor: string;
}

type ActionProps = {
  type: string;
  payload: any;
  newProduct: ADD_PRODUCT_TYPE;
};

export const InitialState: HomeProps = {
  selectedProductDetails: null,
  addProductData: getAddProductRawData(),
  shouldShowGiveaway: false,
  giveawayImage: '',
  giveawayColor: '#0D86D3',
};

export default function loading(state = InitialState, action: ActionProps) {
  const {type, payload, newProduct} = action;

  switch (type) {
    case ADD_PRODUCT.RESET: {
      return {
        ...state,
        addProductData: getAddProductRawData(),
      };
    }
    case ADD_PRODUCT.UPDATE: {
      return {
        ...state,
        addProductData: newProduct,
      };
    }
    case FETCH_MARKET_DATA.SUCCESS: {
      const sizeData = findMarketDataFromSize(
        payload,
        state.addProductData.stepOne.size.value,
      );
      let startRange, endRange;
      startRange = sizeData.lastSale - sizeData.lastSale * 0.1;
      endRange = sizeData.lastSale + sizeData.lastSale * 0.1;
      return {
        ...state,
        addProductData: {
          ...state.addProductData,
          stepFive: {
            ...state.addProductData.stepFive,
            median: sizeData.lastSale,
            startRange: Math.floor(startRange),
            endRange: Math.floor(endRange),
          },
          stepOne: {
            ...state.addProductData.stepOne,
            stockxId: payload._id,
          },
        },
      };
    }
    case GET_PRODUCT_DETAILS.REQUEST: {
      return {
        ...state,
        selectedProductDetails: null,
      };
    }
    case GET_PRODUCT_DETAILS.SUCCESS: {
      return {
        ...state,
        selectedProductDetails: {
          ...payload,
          product_photos: [
            payload?.primary_photo,
            ...payload?.secondary_photos,
          ],
        },
      };
    }
    case GET_PRODUCT_DETAILS.FAILURE: {
      return {
        ...state,
        selectedProductDetails: null,
      };
    }
    case CREATE_NEW_PRODUCT.SUCCESS: {
      return {
        ...state,
        selectedProductDetails: null,
      };
    }
    case CREATE_NEW_PRODUCT.FAILURE: {
      return {
        ...state,
      };
    }
    case SHOULD_SHOW_GIVEAWAY.SUCCESS: {
      return {
        ...state,
        shouldShowGiveaway: payload.showGiveaway,
        giveawayColor: payload.giveawayColor,
        giveawayImage: payload.giveawayImage,
      };
    }
    default:
      return state;
  }
}
