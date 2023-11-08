// @flow

import {
  GET_PRODUCT_DETAILS,
  ADD_PRODUCT,
  CREATE_NEW_PRODUCT,
  FETCH_MARKET_DATA,
} from '../../../constants/actions';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {
  getAddProductRawData,
  findMarketDataFromSize,
  getPreownedMarketValue,
} from '../../../utility/utility';

export interface HomeProps {
  selectedProductDetails: any;
  addProductData: ADD_PRODUCT_TYPE;
}

type ActionProps = {
  type: string;
  payload: any;
  newProduct: ADD_PRODUCT_TYPE;
};

export const InitialState: HomeProps = {
  selectedProductDetails: null,
  addProductData: getAddProductRawData(),
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
      console.log(state?.addProductData?.stepTwo?.condition?.value);
      if (state?.addProductData?.stepTwo?.condition?.value === 'Pre-owned') {
        const range = getPreownedMarketValue(
          sizeData,
          state?.addProductData?.stepTwo?.preOwnedCondition?.value,
        );
        startRange = parseFloat(range[0]);
        endRange = parseFloat(range[1]);
      } else {
        startRange = sizeData.lastSale - sizeData.lastSale * 0.1;
        endRange = sizeData.lastSale + sizeData.lastSale * 0.1;
      }
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
          product_photos: [payload.primary_photo, ...payload.secondary_photos],
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
    default:
      return state;
  }
}
