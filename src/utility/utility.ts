/***
LOOTSWAP - UTILITY
***/
import {
  BOTTOM_TAB_PROFILE,
  PROFILE_ADDRESS,
  PROFILE_MY_LOOT,
  PROFILE_ORDERS,
  PROFILE_WALLET,
  PROFILE_REFERRAL,
  PROFILE_SUPPORT,
  PROFILE_NOTIFICATION,
} from 'localsvgimages';
import {PROFILE_OPTIONS_TYPE} from 'custom_types';

/*
On Launch -
Checking if current session has expired or not. Session is set to 15 minutes
*/
export const getInitialRoute = (userData: any) => {
  let initialScreen = 'AuthScreen';
  let isLoggedIn = false;
  if (userData) {
    initialScreen = 'AppScreens';
    isLoggedIn = true;
  }
  return {initialScreen, isLoggedIn};
};

export const configureFilterData = (filterItems: any) => {
  const newFilters = filterItems?.map(category => {
    const newItem = category?.data?.map(filter => {
      filter.parentId = category?.id;
      return filter;
    });
    return {...category, data: newItem};
  });
  return newFilters;
};

export const getCombinedRatings = (ratingsArr = []) => {
  let ratingSum = 0;
  let combinedRating = 0;
  ratingsArr.forEach(rating => {
    ratingSum = ratingSum + rating;
  });
  if (ratingSum !== 0) {
    combinedRating = ratingSum / ratingsArr?.length;
  }
  return combinedRating;
};

export const getProductTags = (tagType = 'trade-sell', theme: any) => {
  const tradeItem = {
    label: 'Trade',
    labelColor: theme?.colors.tradeText,
    backColor: theme?.colors.tradeBg,
  };
  const saleItem = {
    label: 'Sale',
    labelColor: theme?.colors.sellText,
    backColor: theme?.colors.sellBg,
  };
  switch (tagType) {
    case 'trade-sell':
      return [tradeItem, saleItem];
    case 'trade-only':
      return [tradeItem];
    case 'sell-only':
      return [saleItem];
    default:
      return [tradeItem, saleItem];
  }
};

export const getProfileOptions = () => {
  const optionsList: Array<PROFILE_OPTIONS_TYPE> = [
    {
      icon: BOTTOM_TAB_PROFILE,
      title: 'Edit Profile',
      index: 1,
    },
    {
      icon: PROFILE_ADDRESS,
      title: 'Address',
      index: 2,
    },
    {
      icon: PROFILE_MY_LOOT,
      title: 'My loot',
      index: 3,
    },
    {
      icon: PROFILE_ORDERS,
      title: 'Orders/Archive',
      index: 4,
    },
    {
      icon: PROFILE_WALLET,
      title: 'Wallet',
      index: 5,
    },
    {
      icon: PROFILE_NOTIFICATION,
      title: 'Notifications',
      index: 6,
    },
    {
      icon: PROFILE_REFERRAL,
      title: 'Referral program',
      index: 7,
    },
    {
      icon: PROFILE_SUPPORT,
      title: 'Customer support/Privacy Policy',
      index: 8,
    },
  ];
  return optionsList;
};

export const getNotificationSettingsList = () => {
  const list = [
    {
      label: 'New Messages',
      status: false,
      id: 1,
    },
    {
      label: 'Offers',
      status: true,
      id: 2,
    },
    {
      label: 'Shipping updates',
      status: false,
      id: 3,
    },
    {
      label: 'Price drops',
      status: false,
      id: 4,
    },
    {
      label: 'Marketing notifications',
      status: false,
      id: 5,
    },
    {
      label: 'App Updates',
      status: false,
      id: 6,
    },
  ];
  return list;
};

export const getConfiguredMessageData = messageList => {
  const data = {
    title: '19/12/2022',
    data: messageList,
  };
  return [data];
};
