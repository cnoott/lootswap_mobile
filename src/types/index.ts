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
