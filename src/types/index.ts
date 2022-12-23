/***
LOOTSWAP - ALL CUSTOM TYPES
***/

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
export type FILTER_TYPE = {
  filterLabel?: string;
  list?: Array<SUB_FILTER>;
  isFilterActive?: boolean;
  id?: Number;
  FilterTitle?: string;
  data?: Array<SUB_FILTER>;
};

export type PROFILE_OPTIONS_TYPE = {
  icon: string;
  title: string;
  index: Number;
};

export type DROPDOWN_TYPE = {
  item?: string;
  value?: string;
};

export type TRADE_TYPE = {
  isTradeOnly?: boolean;
  isSellOnly?: boolean;
  isTradeAndSell?: boolean;
};

export type PRODUCT_STEP_ONE_TYPE = {
  category?: DROPDOWN_TYPE;
  brand?: DROPDOWN_TYPE;
  size?: DROPDOWN_TYPE;
  condition?: DROPDOWN_TYPE;
};

export type PRODUCT_STEP_TWO_TYPE = {
  productName?: string;
  productDescription?: string;
};

export type PRODUCT_STEP_FOUR_TYPE = {
  tradeOptions?: TRADE_TYPE;
  tradeDescription?: string;
};

export type PRODUCT_STEP_FIVE_TYPE = {
  productPrice?: Number;
  shippingCost?: Number;
  isShippingPrice?: boolean;
  isFreeShipping?: boolean;
};

export type ADD_PRODUCT_TYPE = {
  stepOne?: PRODUCT_STEP_ONE_TYPE;
  stepTwo?: PRODUCT_STEP_TWO_TYPE;
  stepThree?: Array<string>;
  stepFour?: PRODUCT_STEP_FOUR_TYPE;
  stepFive?: PRODUCT_STEP_FIVE_TYPE;
};
