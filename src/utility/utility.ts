/***
LOOTSWAP - UTILITY
***/

import {FILTER_TYPE} from 'custom_types';

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

export const getHomeFilterData = () => {
  const filterData: Array<FILTER_TYPE> = [
    {
      filterLabel: 'Categories',
      list: [
        {
          label: 'All',
          selected: false,
          parentId: 1,
        },
        {
          label: 'Jacket',
          selected: false,
          parentId: 1,
        },
        {
          label: 'Shoes',
          selected: false,
          parentId: 1,
        },
        {
          label: 'T-Shirt',
          selected: false,
          parentId: 1,
        },
        {
          label: 'Crewnecks',
          selected: false,
          parentId: 1,
        },
      ],
      isFilterActive: false,
      id: 1,
    },
    {
      filterLabel: 'Brand',
      list: [
        {
          label: 'Nike',
          selected: false,
          parentId: 2,
        },
        {
          label: 'Adidas',
          selected: false,
          parentId: 2,
        },
        {
          label: 'Jordan',
          selected: false,
          parentId: 2,
        },
      ],
      isFilterActive: false,
      id: 2,
    },
    {
      filterLabel: 'Price Range',
      list: [
        {
          label: '7',
          selected: false,
          parentId: 3,
        },
        {
          label: '10',
          selected: false,
          parentId: 3,
        },
      ],
      isFilterActive: false,
      id: 3,
    },
    {
      filterLabel: 'Size',
      list: [
        {
          label: 'S',
          selected: false,
          parentId: 4,
        },
        {
          label: '10.2',
          selected: false,
          parentId: 4,
        },
        {
          label: 'M',
          selected: false,
          parentId: 4,
        },
        {
          label: 'XL',
          selected: false,
          parentId: 4,
        },
      ],
      isFilterActive: false,
      id: 4,
    },
  ];
  return filterData;
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
