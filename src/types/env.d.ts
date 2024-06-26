declare module '@env' {
  export const API: string;
  export const AlgoliaAppId: string;
  export const AlgoliaApiKey: string;
  export const ALGOLIA_INDEX_NAME: string;
  export const StripeApiKey: string;
  export const WEB_APP_URL: string;
  export const GOOGLE_MAPS_KEY: string;
  export const PUSHER_API_KEY: string;
  export const META_APP_ID: string;
  export const SHARE_PRODUCT_DOMAIN: string;
  export const UXCAM_API_KEY: string;
}

declare module 'custom_types' {
  export type APIResponseProps = {
    success: boolean;
    data?: any;
    error?: any;
  };
  export type SUB_FILTER = {
    label: string;
    selected: boolean;
    parentId: Number;
  };
  export type PRICE_RANGE_FILTER = {
    min: Number;
    max: Number;
  };
  export type FILTER_TYPE = {
    filterLabel?: string;
    list?: Array<SUB_FILTER>;
    isFilterActive?: boolean;
    id?: Number;
    FilterTitle?: string;
    data?: Array<SUB_FILTER>;
    canRefine?: boolean;
    range?: PRICE_RANGE_FILTER;
    selectedBrandData?: Array<SUB_FILTER>;
  };
  export type PROFILE_OPTIONS_TYPE = {
    icon: string;
    title: string;
    index: Number;
  };
  export type DROPDOWN_TYPE = {
    item?: string;
    value?: string;
    label?: string;
  };
  export type TRADE_TYPE = {
    isTradeOnly?: boolean;
    isSellOnly?: boolean;
    isTradeAndSell?: boolean;
  };
  export type PRODUCT_STEP_ONE_TYPE = {
    category?: DROPDOWN_TYPE;
    productName?: string;
    size?: DROPDOWN_TYPE;
    stockxUrlKey?: string;
    stockxId?: string;
  };
  export type PRODUCT_STEP_TWO_TYPE = {
    brand?: DROPDOWN_TYPE;
    condition?: DROPDOWN_TYPE;
    boxCondition?: DROPDOWN_TYPE;
    productDescription?: string;
  };
  export type PRODUCT_STEP_THREE_TYPE = {
    sourceURL?: string;
    isServerImage?: boolean;
    type?: string;
    uri?: string;
  };
  export type WANTED_STOCKX_ITEM = {
    urlKey: String;
    _id: String;
    size: String;
  };
  export type PRODUCT_STEP_FOUR_TYPE = {
    tradeOptions?: TRADE_TYPE;
    tradeDescription?: string;
    wantedStockxItems?: Array<WANTED_STOCKX_ITEM>;
  };
  export type PRODUCT_STEP_FIVE_TYPE = {
    productPrice?: Number;
    shippingCost?: Number;
    isShippingPrice?: boolean;
    isFreeShipping?: boolean;
    median?: Number;
    startRange?: Number;
    endRange?: Number;
  };
  export type ADD_PRODUCT_TYPE = {
    stepOne?: PRODUCT_STEP_ONE_TYPE;
    stepTwo?: PRODUCT_STEP_TWO_TYPE;
    stepThree?: Array<PRODUCT_STEP_THREE_TYPE>;
    stepFour?: PRODUCT_STEP_FOUR_TYPE;
    stepFive?: PRODUCT_STEP_FIVE_TYPE;
  };
}

/**
 * Custom Modules declaration
 */
declare module 'react-native-searchable-dropdown';
declare module 'react-native-dots-pagination';
