declare module '@env' {
  export const API: string;
  export const AlgoliaAppId: string;
  export const AlgoliaApiKey: string;
  export const ALGOLIA_INDEX_NAME: string;
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
}
