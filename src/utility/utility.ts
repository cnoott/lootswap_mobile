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
  EDIT_PROFILE_EMAIL_ICON,
  ORDER_TRACK_PURCHASED,
  ORDER_TRACK_SHIPPED_SELECTED,
  ORDER_TRACK_IN_TRANSIT_UNSELECTED,
  ORDER_TRACK_IN_TRANSIT_SELECTED,
  ORDER_TRACK_DELIVERED_UNSELECTED,
  ORDER_TRACK_DELIVERED_SELECTED,
  FILTER_ICON,
  OUTER_SIDE_ICON,
  INNER_SIDE_ICON,
  FRONT_ICON,
  BACK_ICON,
  INSOLES_ICON,
  SIZE_TAG_ICON,
  SOLES_ICON,
  BOX_LABEL_ICON,
  ADDITIONAL_ICON,
  FRONT_CLOTHES_ICON,
  LOGO_CLOTHES_ICON,
  BACK_CLOTHES_ICON,
  BRAND_CLOTHES_ICON,
} from 'localsvgimages';
import {PROFILE_OPTIONS_TYPE, GET_PRODUCT_DETAILS} from 'custom_types';
import {
  Trade_Options,
  Who_Pays_Options,
  Trade_Status,
  Order_Status,
} from 'custom_enums';
import {NavigationProp} from '@react-navigation/native';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const capitalizeFirstLetter = (stringToChange: string) => {
  return stringToChange.charAt(0).toUpperCase() + stringToChange.slice(1);
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

export const configureBrandListForDropdown = (brandData: any) => {
  const selectedBrandList = [];
  const unSelectedBrandList = [];
  brandData?.map((brand: any, index: any) => {
    brand.id = index + 1;
    brand.name = brand?.label;
    if (brand?.isRefined) {
      selectedBrandList.push(brand);
    } else {
      unSelectedBrandList.push(brand);
    }
  });
  return {selectedBrandList, unSelectedBrandList};
};

export const configureSizeList = (sizeList: any) => {
  const regex = /^[\-\+]?[\d]+\.?(\d+)?$/;
  let clothesSize: Array<any> = [];
  let otherSize: Array<any> = [];
  sizeList.map((sizeData: any) => {
    if (!regex.test(sizeData?.value)) {
      clothesSize.push(sizeData);
    } else {
      otherSize.push(sizeData);
    }
  });
  return {
    shoeSize: otherSize,
    clothingSize: clothesSize,
  };
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
    label: 'Trade Only',
    labelColor: theme?.colors.white,
    backColor: theme?.colors.tradeOnlyBg,
  };
  const saleItem = {
    label: 'Sell Only',
    labelColor: theme?.colors.white,
    backColor: theme?.colors.sellBg,
  };
  const saleAndTradeItem = {
    label: 'Trade & Sell',
    labelColor: theme?.colors.white,
    backColor: theme?.colors.tradeBg,
  };
  switch (tagType) {
    case 'trade-sell':
      return [saleAndTradeItem];
    case 'trade-only':
      return [tradeItem];
    case 'sell-only':
      return [saleItem];
    default:
      return [saleAndTradeItem];
  }
};

export const getProfileOptions = (userData: any) => {
  const optionsList: Array<PROFILE_OPTIONS_TYPE> = [
    {
      icon: PROFILE_REFERRAL,
      title: 'Referral program - $5 Per Friend!',
      index: 1,
    },
    {
      icon: BOTTOM_TAB_PROFILE,
      title: 'Edit Profile',
      index: 2,
    },
    {
      icon: FILTER_ICON,
      title: 'Sizes & Preferences',
      index: 3,
    },
    {
      icon: PROFILE_ADDRESS,
      title: 'Address',
      index: 4,
    },
    {
      icon: PROFILE_MY_LOOT,
      title: 'My loot',
      index: 5,
    },
    {
      icon: PROFILE_ORDERS,
      title: 'Orders',
      index: 6,
    },
    {
      icon: PROFILE_WALLET,
      title: 'Wallet',
      index: 7,
    },
    {
      icon: PROFILE_NOTIFICATION,
      title: 'Notification settings',
      index: 8,
    },
    {
      icon: PROFILE_WALLET,
      title: userData?.paypal_onboarded
        ? 'Link PayPal (already linked)'
        : 'Link PayPal',
      index: 9,
    },
    {
      icon: PROFILE_SUPPORT,
      title: 'Support/FAQ',
      index: 10,
    },
  ];
  return optionsList;
};
export const getConfiguredMessageData = (messageList: any) => {
  const data = {
    title: 'section 1',
    data: messageList,
  };
  return [data];
};

export const brandsList = [
  {label: 'Vintage', value: 'Vintage'},
  {label: 'Japanese Brand', value: 'Japanese Brand'},
  {label: 'Streetwear', value: 'Streetwear'},
  {label: 'Nike', value: 'Nike'},
  {label: 'Supreme', value: 'Supreme'},
  {label: 'Adidas', value: 'Adidas'},
  {label: 'Band Tees', value: 'Band Tees'},
  {label: 'Designer', value: 'Designer'},
  {label: 'Street Fashion', value: 'Street Fashion'},
  {label: 'Polo Ralph Lauren', value: 'Polo Ralph Lauren'},
  {label: 'American Vintage', value: 'American Vintage'},
  {label: 'Made In Usa', value: 'Made In Usa'},
  {label: "Levi's", value: "Levi's"},
  {label: 'Jordan', value: 'Jordan'},
  {label: 'Champion', value: 'Champion'},
  {label: 'Burberry', value: 'Burberry'},
  {label: 'Bape', value: 'Bape'},
  {label: 'Movie', value: 'Movie'},
  {label: 'Rare', value: 'Rare'},
  {label: 'Uniqlo', value: 'Uniqlo'},
  {label: 'Custom', value: 'Custom'},
  {label: 'Jewelry', value: 'Jewelry'},
  {label: 'Tommy Hilfiger', value: 'Tommy Hilfiger'},
  {label: 'Cartoon Network', value: 'Cartoon Network'},
  {label: 'Disney', value: 'Disney'},
  {label: 'Sportswear', value: 'Sportswear'},
  {label: 'The North Face', value: 'The North Face'},
  {label: 'Luxury', value: 'Luxury'},
  {label: 'Carhartt', value: 'Carhartt'},
  {label: 'Stussy', value: 'Stussy'},
  {label: 'Anti Social Social Club', value: 'Anti Social Social Club'},
  {label: 'New Era(20141)', value: 'New Era(20141)'},
  {label: 'Other', value: 'Other'},
  {label: 'Art', value: 'Art'},
  {label: 'Unbranded', value: 'Unbranded'},
  {label: 'NFL', value: 'NFL'},
  {label: "Levi's Vintage Clothing", value: "Levi's Vintage Clothing"},
  {label: 'Gucci', value: 'Gucci'},
  {label: 'Distressed Denim', value: 'Distressed Denim'},
  {label: 'Issey Miyake', value: 'Issey Miyake'},
  {label: 'Rock T Shirt', value: 'Rock T Shirt'},
  {label: 'Harley Davidson', value: 'Harley Davidson'},
  {label: 'Yves Saint Laurent', value: 'Yves Saint Laurent'},
  {label: 'Comme des Garcons', value: 'Comme des Garcons'},
  {label: 'MLB', value: 'MLB'},
  {label: 'Racing', value: 'Racing'},
  {label: 'Military', value: 'Military'},
  {label: 'Ralph Lauren', value: 'Ralph Lauren'},
  {label: 'NBA', value: 'NBA'},
  {label: 'Reebok', value: 'Reebok'},
  {label: 'Valentino', value: 'Valentino'},
  {label: 'Italian Designers', value: 'Italian Designers'},
  {label: 'Very Rare', value: 'Very Rare'},
  {label: 'Prada', value: 'Prada'},
  {label: 'Rap Tees', value: 'Rap Tees'},
  {label: 'Undercover', value: 'Undercover'},
  {label: 'Palace', value: 'Palace'},
  {label: 'Vans', value: 'Vans'},
  {label: 'Hanes', value: 'Hanes'},
  {label: 'Anima', value: 'Anima'},
  {label: 'Fruit Of The Loom', value: 'Fruit Of The Loom'},
  {label: 'Yohji Yamamoto', value: 'Yohji Yamamoto'},
  {label: 'Fila', value: 'Fila'},
  {label: 'Saint Laurent Paris', value: 'Saint Laurent Paris'},
  {label: 'Dior', value: 'Dior'},
  {label: 'Number (N)ine', value: 'Number (N)ine'},
  {label: 'Guess', value: 'Guess'},
  {label: 'Hysteric Glamour', value: 'Hysteric Glamour'},
  {label: 'Puma', value: 'Puma'},
  {label: 'Mickey Mouse', value: 'Mickey Mouse'},
  {label: 'Travis Scott', value: 'Travis Scott'},
  {label: 'Brand', value: 'Brand'},
  {label: 'Hawaiian Shirt', value: 'Hawaiian Shirt'},
  {label: 'Necklace', value: 'Necklace'},
  {label: 'Converse', value: 'Converse'},
  {label: 'Dolce & Gabbana', value: 'Dolce & Gabbana'},
  {label: 'Versace', value: 'Versace'},
  {label: 'Gildan', value: 'Gildan'},
  {label: 'Kapital', value: 'Kapital'},
  {label: 'Off-White', value: 'Off-White'},
  {label: 'Lacoste', value: 'Lacoste'},
  {label: 'Hype', value: 'Hype'},
  {label: 'Varsity Jacket', value: 'Varsity Jacket'},
  {label: 'Custom Made', value: 'Custom Made'},
  {label: 'Acne Studios', value: 'Acne Studios'},
  {label: 'Soccer Jersey', value: 'Soccer Jersey'},
  {label: 'Maison Margiela', value: 'Maison Margiela'},
  {label: 'Outdoor Life', value: 'Outdoor Life'},
  {label: 'Gap', value: 'Gap'},
  {label: 'Japanese Traditional', value: 'Japanese Traditional'},
  {label: 'Louis Vuitton', value: 'Louis Vuitton'},
  {label: 'Hat', value: 'Hat'},
  {label: 'Columbia', value: 'Columbia'},
  {label: 'HarlemBling', value: 'HarlemBling'},
  {label: 'Patagonia', value: 'Patagonia'},
  {label: 'Balenciaga', value: 'Balenciaga'},
  {label: 'Calvin Klein', value: 'Calvin Klein'},
  {label: 'Rick Owens', value: 'Rick Owens'},
  {label: 'Flannel', value: 'Flannel'},
  {label: 'Kappa', value: 'Kappa'},
  {label: 'Unknown', value: 'Unknown'},
  {label: 'Fear of God', value: 'Fear of God'},
  {label: 'Chrome Hearts', value: 'Chrome Hearts'},
  {label: 'Denim Tears', value: 'Denim Tears'},
  {label: 'New Balance', value: 'New Balance '},
  {label: 'ASICS', value: 'ASICS'},
];

export const categoryList = [
  {label: 'Shoes', value: 'shoes'},
  {label: 'Shirts', value: 'shirts'},
  {label: 'Jackets', value: 'jackets'},
  {label: 'Hoodies', value: 'hoodies'},
  {label: 'Crewnecks', value: 'crewnecks'},
  {label: 'Pants', value: 'pants'},
  {label: 'Shorts', value: 'shorts'},
  {label: 'Hats', value: 'hats'},
  {label: 'Bags', value: 'bags'},
  {label: 'Other', value: 'other'},
];

export const conditionList = [
  {label: 'New', value: 'New'},
  {label: 'Pre-owned', value: 'Pre-owned'},
];

export const boxConditionList = [
  {label: 'Good Box (Lid & Box Intact)', value: 'Good Box'},
  {label: 'Missing Lid', value: 'Missing Lid'},
  {label: 'Damaged Box (Crushed/Torn/Signs of Wear)', value: 'Damaged Box'},
  {label: 'No Original Box', value: 'No Original Box'},
];

export const conditionListClothing = [
  {label: 'New with tags', value: 'New with tags'},
  {label: 'New without tags', value: 'New without tags'},
  {label: 'New with defect', value: 'New with defect'},
  {label: 'Pre-owned', value: 'Pre-owned'},
];

export const shoesSizeList = [
  {label: '3.5M (35)', value: '3.5'},
  {label: '4M (36)', value: '4'},
  {label: '4.5M (36)', value: '4.5'},
  {label: '5M (37)', value: '5'},
  {label: '5.5M (37)', value: '5.5'},
  {label: '6M (39)', value: '6'},
  {label: '6.5M (39)', value: '6.5'},
  {label: '7M (40)  ', value: '7'},
  {label: '7.5M (40-41)', value: '7.5'},
  {label: '8M (41)', value: '8'},
  {label: '8.5M (41-42)', value: '8.5'},
  {label: '9M (42)', value: '9'},
  {label: '9.5M (42-43)', value: '9.5'},
  {label: '10M (43)', value: '10'},
  {label: '10.5M (43-44)', value: '10.5'},
  {label: '11M (44)', value: '11'},
  {label: '11.5M (44-45)', value: '11.5'},
  {label: '12M (45)', value: '12'},
  {label: '12.5M (45-46)', value: '12.5'},
  {label: '13M (46)', value: '13'},
  {label: '13.5M (46-47)', value: '13.5'},
  {label: '14M (47)', value: '14'},
  {label: '14.5M (47-48)', value: '14.5'},
  {label: '15M (48)', value: '15'},

  {label: '5W (35-36)', value: '5W'},
  {label: '5.5W (36)', value: '5.5W'},
  {label: '6W (36-37)', value: '6W'},
  {label: '6.5W (37)', value: '6.5W'},
  {label: '7W (37-38)', value: '7W'},
  {label: '7.5W (38)', value: '7.5W'},
  {label: '8W (38-39)', value: '8W'},
  {label: '8.5W (39)', value: '8.5W'},
  {label: '9W (39-40)', value: '9W'},
  {label: '9.5W (40)', value: '9.5W'},
  {label: '10W (40-41)', value: '10W'},
  {label: '10.5W (41)', value: '10.5W'},
  {label: '11W (41-42)', value: '11W'},
  {label: '11.5W (42)', value: '11.5W'},
  {label: '12W (41-43)', value: '12W'},
  {label: '13W (43-44)', value: '13W'},

  //Youth
  {label: '1Y', value: '1Y'},
  {label: '1.5Y', value: '1.5Y'},
  {label: '2Y', value: '2Y'},
  {label: '2.5Y', value: '2.5Y'},
  {label: '3Y', value: '3Y'},
  {label: '3.5Y', value: '3.5Y'},
  {label: '4Y', value: '4Y'},
  {label: '4.5Y', value: '4.5Y'},
  {label: '5Y', value: '5Y'},
  {label: '5.5Y', value: '5.5Y'},
  {label: '6Y', value: '6Y'},
  {label: '6.5Y', value: '6.5Y'},
  {label: '7Y', value: '7Y'},

  {label: '1K', value: '1K'},
  {label: '2K', value: '2K'},
  {label: '3K', value: '3K'},
  {label: '4K', value: '4K'},
  {label: '5K', value: '5K'},
  {label: '5.5K', value: '5.5K'},
  {label: '6K', value: '6K'},
  {label: '6.5K', value: '6.5K'},
  {label: '7K', value: '7K'},
  {label: '7.5K', value: '7.5K'},
  {label: '8K', value: '8K'},
  {label: '8.5K', value: '8.5K'},
  {label: '9K', value: '9K'},
  {label: '9.5K', value: '9.5K'},
  {label: '10K', value: '10K'},
  {label: '10.5K', value: '10.5K'},
  {label: '11K', value: '11K'},
  {label: '11.5K', value: '11.5K'},
  {label: '12K', value: '12K'},
  {label: '12.5K', value: '12.5K'},
  {label: '13K', value: '13K'},
  {label: '13.5K', value: '13.5K'},
  {label: '1C (16)', value: '1C'},
  {label: '2C (17)', value: '2C'},
  {label: '3C (18.5)', value: '3C'},
  {label: '4C (19.5)', value: '4C'},
  {label: '5C (21)', value: '5C'},
  {label: '6C (22)', value: '6C'},
  {label: '7C (23.5)', value: '7C'},
  {label: '8C (25)', value: '8C'},
  {label: '9C (26)', value: '9C'},
  {label: '10C (27)', value: '10C'},
  {label: '10.5C (27.5)', value: '10.5C'},
  {label: '11C (28)', value: '11C'},
  {label: '11.5C (28.5)', value: '11.5C'},
  {label: '12C (29.5)', value: '12C'},
  {label: '12.5C (30)', value: '12.5C'},
  {label: '13C (31)', value: '13C'},
  {label: '13.5C (31.5)', value: '13.5C'},
];

export const womenOnlySizes = shoesSizeList.filter(obj =>
  obj.label.includes('W'),
);

export const gsSizes = shoesSizeList.filter(obj => obj.label.includes('Y'));

export const tdSizes = shoesSizeList.filter(obj => obj.label.includes('C'));

export const psSizes = shoesSizeList.filter(
  obj => obj.label.includes('C') || obj.value.includes('Y'),
);

export const kidsSizes = shoesSizeList.filter(
  obj => obj.label.includes('K') || obj.value.includes('Y'),
);

export const convertUsSizeToEu = (usSize: string) => {
  const filteredSizes = shoesSizeList.filter(obj => obj.value === usSize);
  if (filteredSizes.length === 0) {
    return usSize;
  }
  return filteredSizes[0].label;
};

export const upperClothingSize = [
  {label: 'XS', value: 'XS'},
  {label: 'S', value: 'S'},
  {label: 'M', value: 'M'},
  {label: 'L', value: 'L'},
  {label: 'XL', value: 'XL'},
  {label: 'XXL', value: 'XXL'},
];

export const lowerClothingSize = [
  {label: 'XS', value: 'XS'},
  {label: 'S', value: 'S'},
  {label: 'M', value: 'M'},
  {label: 'L', value: 'L'},
  {label: 'XL', value: 'XL'},
  {label: 'XXL', value: 'XXL'},
  {label: '26', value: '26'},
  {label: '27', value: '27'},
  {label: '28', value: '28'},
  {label: '29', value: '29'},
  {label: '30', value: '30'},
  {label: '31', value: '31'},
  {label: '32', value: '32'},
  {label: '33', value: '33'},
  {label: '34', value: '34'},
  {label: '35', value: '35'},
  {label: '36', value: '36'},
  {label: '37', value: '37'},
  {label: '38', value: '38'},
  {label: '39', value: '39'},
  {label: '40', value: '40'},
  {label: '41', value: '41'},
  {label: '42', value: '42'},
  {label: '43', value: '43'},
  {label: '44', value: '44'},
];

export const bagSize = lowerClothingSize.slice(0, 5);

export const hatsSize = [
  {label: 'ONE SIZE', value: 'ONE SIZE'},
  {label: '6 3/4', value: '6 3/4'},
  {label: '6 7/8', value: '6 7/8'},
  {label: '7', value: '7'},
  {label: '7 1/8', value: '7 1/8'},
  {label: '7 1/4', value: '7 1/4'},
  {label: '7 3/8', value: '7 3/8'},
  {label: '7 1/2', value: '7 1/2'},
  {label: '7 5/8', value: '7 5/8'},
  {label: '7 3/4', value: '7 3/4'},
  {label: '7 7/8', value: '7 7/8'},
  {label: '8', value: '8'},
  {label: '8 1/8', value: '8 1/8'},
  {label: '8 1/4', value: '8 1/4'},
];

export const preOwnedConditions = [
  {label: 'Lightly used', value: 'Lightly used'},
  {label: 'Moderately used', value: 'Moderately used'},
  {label: 'Heavily used', value: 'Heavily used'},
];

export const otherSize = [{label: 'other', value: 'Other'}];

export const getSizeList = (category: string = '') => {
  switch (category) {
    case 'shoes':
      return shoesSizeList;
    case 'womens':
      return womenOnlySizes;
    case 'gs':
      return gsSizes;
    case 'td':
      return tdSizes;
    case 'ps':
      return psSizes;
    case 'kids':
      return kidsSizes;
    case 'shirts':
    case 'jackets':
    case 'hoodies':
    case 'crewnecks':
      return upperClothingSize;
    case 'pants':
    case 'shorts':
      return lowerClothingSize;
    case 'hats':
      return lowerClothingSize;
    case 'bags':
      return bagSize;
    case 'other':
      return otherSize;
    default:
      return [];
  }
};

export const getAddProductTitle = (step: number) => {
  switch (step) {
    case 1:
      return 'Product Type';
    case 2:
      return 'Basic Info';
    case 3:
      return 'Product Images';
    case 4:
      return 'Trade Type';
    case 5:
      return 'Product Price';
    default:
      return 'Product Type';
  }
};

export const getPreOwnedConditions = () => {
  return preOwnedConditions;
};

export const getAddProductRawData = () => {
  const addProductData: GET_PRODUCT_DETAILS = {
    stepOne: {
      category: null,
      productName: '',
      size: null,
      stockxUrlKey: null,
      stockxId: null,
    },
    stepTwo: {
      brand: null,
      condition: null,
      productDescription: '',
    },
    stepThree: {
      productImages: [],
    },
    stepFour: {
      tradeOptions: {
        isTradeOnly: false,
        isSellOnly: false,
        isTradeAndSell: false,
      },
      tradeDescription: '',
      wantedStockxItems: [],
    },
    stepFive: {
      productPrice: 0.0,
      shippingCost: 0.0,
      isShippingPrice: false,
      isFreeShipping: true,
      median: null,
      startRange: null,
      endRange: null,
    },
  };
  return addProductData;
};

export const getAllOfferItemsData = () => {
  const data = [
    {
      isSelected: true,
      item: 1,
    },
    {
      isSelected: false,
      item: 2,
    },
    {
      isSelected: false,
      item: 3,
    },
    {
      isSelected: true,
      item: 4,
    },
    {
      isSelected: false,
      item: 5,
    },
    {
      isSelected: false,
      item: 6,
    },
    {
      isSelected: true,
      item: 7,
    },
    {
      isSelected: false,
      item: 8,
    },
  ];
  return data;
};

export const getSelectedOfferItemsData = () => {
  const data = [
    {
      isSelected: true,
      item: 1,
    },
    {
      isSelected: true,
      item: 4,
    },
    {
      isSelected: true,
      item: 7,
    },
  ];
  return data;
};

export const getSelectedTradeData = (tradeOption: any) => {
  const tradeSell = {
    label: 'Trade and Sell',
    value: Trade_Options.TradeAndSell,
  };
  const tradeOnly = {
    label: 'Trade Only',
    value: Trade_Options.TradeOnly,
  };
  const sellOnly = {
    label: 'Sell Only',
    value: Trade_Options.SellOnly,
  };
  if (tradeOption?.isTradeAndSell) {
    return tradeSell;
  }
  if (tradeOption?.isTradeOnly) {
    return tradeOnly;
  }
  if (tradeOption?.isSellOnly) {
    return sellOnly;
  }
};

const getStepOneDataFromLists = (arrayData: any, catValue: string) => {
  const filteredCategory = arrayData?.filter(cat => cat?.value === catValue);
  console.log('getstep one', filteredCategory, catValue);
  return filteredCategory[0] || arrayData[0];
};

const secondaryPhotosPlaceholders = [
  {icon: INNER_SIDE_ICON, label: 'Inner Side'},
  {icon: FRONT_ICON, label: 'Front'},
  {icon: BACK_ICON, label: 'Back'},
  {icon: INSOLES_ICON, label: 'Insoles'},
  {icon: SIZE_TAG_ICON, label: 'Size Tag'},
  {icon: SOLES_ICON, label: 'Soles'},
  {icon: BOX_LABEL_ICON, label: 'Box Label'},
  {icon: ADDITIONAL_ICON, label: 'Additional'},
];

const secondaryClothingPlaceholders = [
  {icon: LOGO_CLOTHES_ICON, label: 'Logo close-up'},
  {icon: BACK_CLOTHES_ICON, label: 'Back'},
  {icon: BRAND_CLOTHES_ICON, label: 'Brand tag'},
  {icon: ADDITIONAL_ICON, label: 'Additional'},
];

export const initialImageData = (category: string, stepTwoData: any) => {
  let allPlaceholders;
  if (category === 'Shoes') {
    allPlaceholders = [
      {icon: OUTER_SIDE_ICON, label: 'Outer Side'},
      ...secondaryPhotosPlaceholders,
    ];
    if (stepTwoData?.condition?.label === 'New') {
      allPlaceholders = allPlaceholders.filter(
        img => img.label !== 'Inner Side',
      );
      allPlaceholders = allPlaceholders.filter(img => img.label !== 'Front');
      allPlaceholders = allPlaceholders.filter(img => img.label !== 'Back');
    }
    if (stepTwoData?.boxCondition?.value === 'No Original Box') {
      allPlaceholders = allPlaceholders.filter(
        img => img.label !== 'Box Label',
      );
    }
  } else {
    allPlaceholders = [
      {icon: FRONT_CLOTHES_ICON, label: 'Front side'},
      ...secondaryClothingPlaceholders,
    ];
  }
  return allPlaceholders.map((placeholder, i) => ({
    sourceURL: '',
    isServerImage: true,
    key: i,
    placeholder: placeholder.icon,
    placeholderLabel: placeholder.label,
  }));
};

const getStepThreeDataFromLists = (lootData: any) => {
  const allPhotos = lootData?.secondary_photos?.map(
    (photo: string, i: number) => {
      return {
        sourceURL: photo,
        isServerImage: true,
        key: `${Math.random() * 100}`,
        placeholder: secondaryPhotosPlaceholders[i].icon,
        placeholderLabel: secondaryPhotosPlaceholders[i].label,
      };
    },
  );
  return [
    {
      sourceURL: lootData?.primary_photo,
      isServerImage: true,
      key: `${Math.random() * 100}`,
      placeholder: OUTER_SIDE_ICON,
      placeholderLabel: 'Outer Side',
    },
    ...allPhotos,
  ];
};

const getTradeDataForConfigure = (trade: string) => {
  const tradeData = {
    isTradeAndSell: false,
    isTradeOnly: false,
    isSellOnly: false,
  };
  switch (trade) {
    case Trade_Options?.TradeAndSell:
      tradeData.isTradeAndSell = true;
      break;
    case Trade_Options?.isTradeOnly:
      tradeData.isTradeOnly = true;
      break;
    case Trade_Options?.SellOnly:
      tradeData.isSellOnly = true;
      break;
    default:
      tradeData.isTradeAndSell = true;
      break;
  }
  return tradeData;
};

export const configureAndGetLootData = (lootData: any) => {
  console.log(lootData?.condition, 'CONDITION');
  const newLootData: GET_PRODUCT_DETAILS = getAddProductRawData();
  // Configure STEP 1
  newLootData.stepOne.category = getStepOneDataFromLists(
    categoryList,
    lootData?.category,
  );
  newLootData.stepOne.productName = lootData?.name;
  newLootData.stepOne.stockxId = lootData?.stockxId;
  newLootData.stepOne.size = getStepOneDataFromLists(
    getSizeList(lootData?.category),
    lootData?.size,
  );

  // Configure STEP 2
  newLootData.stepTwo.brand = getStepOneDataFromLists(
    brandsList,
    lootData?.brand,
  );
  newLootData.stepTwo.condition = getStepOneDataFromLists(
    conditionList,
    lootData?.condition,
  );

  newLootData.stepTwo.productDescription = lootData?.description;

  // Configure STEP 3
  newLootData.stepThree = getStepThreeDataFromLists(lootData);
  // Configure STEP 4
  newLootData.stepFour.tradeOptions = getTradeDataForConfigure(lootData?.type);
  newLootData.stepFour.tradeDescription = lootData?.interestedIn;

  newLootData.stepFour.wantedStockxItems = lootData?.wantedStockxItems.map(
    item => ({...item.stockxId, size: {value: item.size, label: item.size}}),
  );

  // Configure STEP 5
  newLootData.stepFive.productPrice = parseFloat(lootData?.price);
  newLootData.stepFive.shippingCost = parseFloat(lootData?.sellerShippingCost);
  newLootData.stepFive.isShippingPrice =
    Who_Pays_Options?.BuyerPays === lootData?.who_pays;
  newLootData.stepFive.isFreeShipping =
    Who_Pays_Options?.SellerPays === lootData?.who_pays;
  return newLootData;
};

export const validateCreateProductData = (
  currStep: number,
  prodData: GET_PRODUCT_DETAILS,
) => {
  var canGoNext = false;
  switch (currStep) {
    case 1:
      const {category, productName, size} = prodData?.stepOne;
      if (category && productName && size) {
        canGoNext = true;
      }
      break;
    case 2:
      const {brand, condition, boxCondition, productDescription} =
        prodData?.stepTwo;

      if (brand.value && condition && productDescription) {
        canGoNext = true;
      }
      if (category === 'Shoes' && !boxCondition) {
        canGoNext = false;
      }
      break;
    case 3:
      const {stepOne, stepTwo, stepThree} = prodData;
      const filledImages = stepThree?.filter(img => img.sourceURL);
      let requiredLength;
      if (stepOne.category.value === 'Shoes') {
        requiredLength = stepTwo?.condition?.label === 'New' ? 4 : 7;
      } else {
        requiredLength = 4;
      }
      if (filledImages?.length >= requiredLength) {
        canGoNext = true;
      }
      break;
    case 4:
      const {tradeOptions, wantedStockxItems} = prodData?.stepFour;

      const sum = wantedStockxItems.reduce((accumulator, item) => {
        if (item?.size) {
          return (accumulator += 1);
        } else {
          return accumulator;
        }
      }, 0);

      const filledOutStockxSizes = sum === wantedStockxItems.length;

      if (
        (tradeOptions?.isTradeAndSell ||
          tradeOptions?.isTradeOnly ||
          tradeOptions?.isSellOnly) &&
        filledOutStockxSizes
      ) {
        canGoNext = true;
      }
      break;
    case 5:
      const {productPrice, floorPrice, shippingCost, isShippingPrice, isFreeShipping} =
        prodData?.stepFive;
      if (productPrice) {
        if (isFreeShipping) {
          canGoNext = true;
        } else if (isShippingPrice && shippingCost) {
          canGoNext = true;
        }
        if (floorPrice && parseFloat(floorPrice) >= parseFloat(productPrice)) {
          canGoNext = false;
        }
      }
      break;
    default:
      break;
  }
  return canGoNext;
};

export const getSingleOrderStepsList = () => {
  const stepsList = [
    {
      index: 1,
      label: 'Purchased',
      selectedIcon: ORDER_TRACK_PURCHASED,
      unSelectedIcon: ORDER_TRACK_PURCHASED,
    },
    {
      index: 2,
      label: 'Label Generated',
      selectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
      unSelectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
    },
    {
      index: 3,
      label: 'In Transit',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_SELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 4,
      label: 'Delivered',
      selectedIcon: ORDER_TRACK_DELIVERED_SELECTED,
      unSelectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
    },
  ];
  return stepsList;
};

export const getMultipleOrderStepsList = () => {
  const stepsList = [
    {
      index: 1,
      label: 'Ship\nItem(s)',
      selectedIcon: ORDER_TRACK_PURCHASED,
      unSelectedIcon: ORDER_TRACK_PURCHASED,
    },
    {
      index: 2,
      label: 'In Transit',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_SELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 3,
      label: 'Verified Center',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_SELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 4,
      label: 'Shipping to you\n(transit)',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_SELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 5,
      label: 'Delivered',
      selectedIcon: ORDER_TRACK_DELIVERED_SELECTED,
      unSelectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
    },
  ];
  return stepsList;
};

export const getTradeStatusColor = (status: string) => {
  let colorData = {
    backColor: 'rgba(30, 66, 159, 0.2)',
    labelColor: '#1E429F',
  };
  switch (status) {
    case Trade_Status.Canceled:
    case Trade_Status.Declined:
      colorData.backColor = 'rgba(240, 62, 62, 0.2)';
      colorData.labelColor = '#F03E3E';
      break;
    case Trade_Status.Pending:
      colorData.backColor = 'rgba(30, 66, 159, 0.2)';
      colorData.labelColor = '#1E429F';
      break;
    case Trade_Status.Accepted:
      colorData.backColor = 'rgba(74, 175, 87, 0.2)';
      colorData.labelColor = '#4AAF57';
      break;
    default:
      break;
  }
  return colorData;
};

export const getShippingStatusColor = (status: string) => {
  let colorData = {
    backColor: 'rgba(250, 204, 21, 0.1)',
    labelColor: '#e1b505',
  };
  switch (status) {
    case Order_Status.Shipped:
      colorData.backColor = 'rgba(250, 204, 21, 0.1)';
      colorData.labelColor = '#e1b505';
      break;
    case Trade_Status.InTransit:
      colorData.backColor = 'rgba(36, 107, 253, 0.1)';
      colorData.labelColor = '#246BFD';
      break;
    case Trade_Status.Delivered:
      colorData.backColor = 'rgba(74, 222, 128, 0.1)';
      colorData.labelColor = '#4ADE80';
      break;
    case Trade_Status.Purchased:
      colorData.backColor = 'rgba(103, 58, 179, 0.1)';
      colorData.labelColor = '#673AB3';
      break;
    default:
      break;
  }
  return colorData;
};

export const offerCellOnPress = (
  item: any,
  offerItem: any,
  inTradeScreen: boolean,
  navigation: NavigationProp<any, any>,
) => {
  if (inTradeScreen) {
    navigation.navigate('ProductDetailsScreen', {
      productData: {...item, objectID: item._id},
    });
  } else {
    navigation.navigate('OffersMessageScreen', {item: offerItem});
  }
};

export const daysPast = (createdAt: string) => {
  const timeDiff = new Date().getTime() - new Date(createdAt).getTime();
  const daysSince = Math.floor(timeDiff / (1000 * 3600 * 24));
  if (daysSince > 31) {
    return 'over a month ago';
  } else if (daysSince > 1) {
    return `${daysSince} days ago`;
  } else if (daysSince === 0) {
    return 'Today';
  } else {
    return 'One day ago';
  }
};

export const paypalOrderShippingStatus = (userId: string, paypalOrder: any) => {
  const {shippingStep} = paypalOrder;

  switch (shippingStep) {
    case -1:
      return {
        text: 'CANCELED',
        backColor: 'rgba(255, 0, 0, 0.1)',
        labelColor: '#b30000',
      };
    case 2:
      return {
        text: 'In Transit',
        backColor: 'rgba(36, 107, 253, 0.1)',
        labelColor: '#246BFD',
      };
    case 3:
      return {
        text: 'Delivered',
        backColor: 'rgba(74, 222, 128, 0.1)',
        labelColor: '#4ADE80',
      };
  }

  const isSeller = paypalOrder?.sellerId?._id === userId;
  if (isSeller) {
    switch (shippingStep) {
      case 0:
        return {
          text: 'Generate Shipping Label',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#e1b505',
        };
      case 1:
        return {
          text: 'Waiting for tracking update',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#e1b505',
        };
    }
  } else {
    switch (shippingStep) {
      case 0:
        return {
          text: 'Waiting for seller to ship',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#e1b505',
        };
      case 1:
        return {
          text: 'Waiting for tracking',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#e1b505',
        };
    }
  }
};

export const shippingStepOptions = (
  isReceiver: Boolean,
  isTradeOrder: Boolean,
  order: any,
) => {
  if (isTradeOrder) {
    // always show other users step
    return isReceiver ? order?.senderStep : order?.receiverStep;
  } else {
    return order?.shippingStep;
  }
};

export const tradeOrderShippingStatus = (
  userId: string,
  tradeOrder: any,
  showOwnTracking: boolean = false,
) => {
  const {receiverStep, senderStep, receiver} = tradeOrder;
  let isReceiver = userId === receiver?._id;
  isReceiver = showOwnTracking ? !isReceiver : isReceiver;
  if (isReceiver && tradeOrder?.receiverPaymentStatus === 'failed') {
    return {
      text: 'Payment failed, please try again',
      backColor: 'rgba(255, 0, 0, 0.1)',
      labelColor: '#b30000',
    };
  }
  if (!isReceiver && tradeOrder?.senderPaymentStatus === 'failed') {
    return {
      text: 'Payment failed, please try again',
      backColor: 'rgba(255, 0, 0, 0.1)',
      labelColor: '#b30000',
    };
  }

  if (isReceiver && tradeOrder?.receiverPaymentStatus === 'processing') {
    return {
      text: 'Processing payment',
      backColor: 'rgba(250, 204, 21, 0.1)',
      labelColor: '#e1b505',
    };
  }
  if (!isReceiver && tradeOrder?.senderPaymentStatus === 'processing') {
    return {
      text: 'Processing payment',
      backColor: 'rgba(250, 204, 21, 0.1)',
      labelColor: '#e1b505',
    };
  }

  if (isReceiver && tradeOrder?.receiverPaymentStatus !== 'paid') {
    return {
      text: 'Waiting for payment',
      backColor: 'rgba(250, 204, 21, 0.1)',
      labelColor: '#e1b505',
    };
  }
  if (!isReceiver && tradeOrder?.senderPaymentStatus !== 'paid') {
    return {
      text: 'Waiting for payment',
      backColor: 'rgba(250, 204, 21, 0.1)',
      labelColor: '#e1b505',
    };
  }

  const step = shippingStepOptions(isReceiver, true, tradeOrder);
  switch (step) {
    case -3:
    case -2:
    case -1:
      return {
        text: 'CANCELED',
        backColor: 'rgba(255, 0, 0, 0.1)',
        labelColor: '#b30000',
      };
    case 0:
      return {
        text: 'Waiting for payment',
        backColor: 'rgba(250, 204, 21, 0.1)',
        labelColor: '#e1b505',
      };
    case 1:
      return {
        text: 'Waiting for you to ship',
        backColor: 'rgba(250, 204, 21, 0.1)',
        labelColor: '#e1b505',
      };
    case 2:
      return {
        text: 'Shipping to verification center',
        backColor: 'rgba(36, 107, 253, 0.1)',
        labelColor: '#246BFD',
      };
    case 3:
      return {
        text: 'At verification center',
        backColor: 'rgba(36, 107, 253, 0.1)',
        labelColor: '#246BFD',
      };
    case 4:
      return {
        text: 'Shipping to you',
        backColor: 'rgba(36, 107, 253, 0.1)',
        labelColor: '#246BFD',
      };
    case 5:
      return {
        text: 'Delivered',
        backColor: 'rgba(74, 222, 128, 0.1)',
        labelColor: '#4ADE80',
      };
    default:
      return {
        text: 'Status error',
        backColor: 'rgba(250, 204, 21, 0.1)',
        labelColor: '#e1b505',
      };
  }
};
export const printLabel = async (base64Img: string) => {
  const htmlString = `
  <div style="display: flex; align-items: center; height: 100vh; transform: rotate(90deg); transform-origin: center center;">
    <img src="data:image/png;base64,${base64Img}" style="max-width: 80%; max-height: 80%;"/>
  </div>
`;
  RNPrint.print({
    html: htmlString,
  });
};

export const salePrintLabel = async (imgUrl: string) => {
  const htmlString = `<img src="${imgUrl}" style="width:50%"/>`;
  const results = await RNHTMLtoPDF.convert({
    html: htmlString,
    fileName: 'pdfFile',
    base64: true,
  });
  RNPrint.print({filePath: results.filePath});
};

export const getPublicProfileFilters = () => {
  return [
    {
      label: 'All',
      id: 1,
    },
    {
      label: 'Trade and Sell',
      id: 2,
    },
    {
      label: 'Sell Only',
      id: 3,
    },
    {
      label: 'Trade Only',
      id: 4,
    },
  ];
};

export const getProfileReviewsFilters = () => {
  return [
    {
      label: `${'\u2605'} All`,
      id: 1,
    },
    {
      label: `${'\u2605'} 1`,
      id: 2,
    },
    {
      label: `${'\u2605'} 2`,
      id: 3,
    },
    {
      label: `${'\u2605'} 3`,
      id: 4,
    },
    {
      label: `${'\u2605'} 4`,
      id: 5,
    },
    {
      label: `${'\u2605'} 5`,
      id: 6,
    },
  ];
};

export const isAlreadyTrading = (
  historyTrades: Array<any>,
  productId: string,
) => {
  for (const trade of historyTrades) {
    if (
      trade.receiverItems.some(receiverItem => receiverItem._id === productId)
    ) {
      if (trade.status === 'canceled' || trade.status === 'declined') {
        return false;
      }
      return trade;
    }
  }
  return false;
};

export const findMarketDataFromSize = (stockxProduct: any, size: string) => {
  console.log('finding', size);
  return stockxProduct?.sizes?.find(
    sizeMarketData => sizeMarketData.sizeUS === size,
  );
};

export const getPreownedMarketValue = (
  stockxSize: any,
  preOwnedCondition: string,
) => {
  //return an array
  // use max value when determining 30% below value
  const lightlyUsedRange = [0.2, 0.3];
  const moderatleyUsed = [0.5, 0.6];
  const heavilyUsed = [0.6, 0.8];
  const {lastSale} = stockxSize;
  let range = [];
  switch (preOwnedCondition) {
    case 'Lightly used':
      range[0] = lastSale - lastSale * lightlyUsedRange[1];
      range[1] = lastSale - lastSale * lightlyUsedRange[0];
      break;
    case 'Moderately used':
      range[0] = lastSale - lastSale * moderatleyUsed[1];
      range[1] = lastSale - lastSale * moderatleyUsed[0];
      break;
    case 'Heavily used':
      range[0] = lastSale - lastSale * heavilyUsed[1];
      range[1] = lastSale - lastSale * heavilyUsed[0];
      break;
  }
  range[0] = Math.floor(range[0]);
  range[1] = Math.floor(range[1]);
  return range;
};

const hasTradeOnly = (products: Array<any>) => {
  return products.find(
    product => product.type === 'trade-only' && !product.stockxId,
  );
};

const hasPreowned = (products: Array<any>) => {
  const preOwnedConditions = [
    'Pre-owned',
  ];
  return products.find(product =>
    preOwnedConditions.includes(product?.condition),
  );
};

const getAllPrices = (products: Array<any>) => {
  let allPrices = [];
  products.forEach(product => {
    if (product.stockxId) {
      let foundSize = findMarketDataFromSize(product.stockxId, product.size);
      if (foundSize) {
        allPrices.push(foundSize.lastSale);
      } else {
        allPrices.push(null);
      }
    } else {
      allPrices.push(product.price);
    }
  });
  return allPrices;
};

export const calculateMarketValue = (products: Array<any>) => {
  if (hasTradeOnly(products)) {
    return 'Unknown';
  }

  if (hasPreowned(products)) {
    return 'Unknown';
  }

  const allPrices = getAllPrices(products);
  console.log('aall', allPrices);
  const containsNullOrZero = allPrices.find(price => !price);
  if (containsNullOrZero !== undefined) {
    return 'Unknown';
  }

  return '$' + allPrices.reduce((partialSum, price) => partialSum + price, 0);
};

export const handleSendOfferNavigation = (
  navigation: any,
  productType: string,
  userData: any,
  requestedUserDetails: any,
  isFromMessageScreen: Boolean = false,
) => {
  switch (productType) {
    case Trade_Options.TradeAndSell:
      navigation.navigate('ChooseOfferTypeScreen', {
        isFromMessageScreen: isFromMessageScreen,
      });
      break;
    case Trade_Options.TradeOnly:
      navigation.navigate('StartTradeScreen', {
        requestedUserDetails: requestedUserDetails,
        isFromMessageScreen: isFromMessageScreen,
      });
      break;
    case Trade_Options.SellOnly:
      navigation.navigate('SendMoneyOfferScreen', {
        isFromMessageScreen: isFromMessageScreen,
      });
      break;
    default:
      navigation.navigate('ChooseOfferTypeScreen', {
        isFromMessageScreen: isFromMessageScreen,
      });
      break;
  }
};

export const shouldShowArchive = (trade: any) => {
  if (trade.status === 'accepted') {
    return true;
  }
  if (trade.status === 'canceled' || trade.status === 'declined') {
    return true;
  }
  if (trade.status === 'pending') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return new Date(trade.updatedAt) < oneWeekAgo;
  }
  return false;
};
