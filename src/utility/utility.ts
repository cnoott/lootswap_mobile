/***
LOOTSWAP - UTILITY
***/

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
