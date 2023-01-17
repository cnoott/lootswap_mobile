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
  ORDER_TRACK_PURCHASED,
  ORDER_TRACK_SHIPPED_SELECTED,
  ORDER_TRACK_IN_TRANSIT_UNSELECTED,
  ORDER_TRACK_DELIVERED_UNSELECTED,
} from 'localsvgimages';
import {PROFILE_OPTIONS_TYPE, GET_PRODUCT_DETAILS} from 'custom_types';
import {
  Trade_Options,
  Who_Pays_Options,
  Trade_Status,
  Order_Status,
} from 'custom_enums';
import {NavigationProp} from '@react-navigation/native';
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

export const getConfiguredMessageData = (messageList: any) => {
  const data = {
    title: '19/12/2022',
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
  {label: 'Jordan Brand', value: 'Jordan Brand'},
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
  {label: 'Other', value: 'other'},
];

export const conditionList = [
  {label: 'New with box', value: 'New with box'},
  {label: 'New without box', value: 'New without box'},
  {label: 'New with defect', value: 'New with defect'},
  {label: 'Pre-owned', value: 'Pre-owned'},
];

export const shoesSizeList = [
  {label: '3.5', value: '3.5'},
  {label: '4', value: '4'},
  {label: '4.5', value: '4.5'},
  {label: '5', value: '5'},
  {label: '5.5', value: '5.5'},
  {label: '6', value: '6'},
  {label: '6.5', value: '6.5'},
  {label: '7', value: '7'},
  {label: '7.5', value: '7.5'},
  {label: '8', value: '8'},
  {label: '8.5', value: '8.5'},
  {label: '9', value: '9'},
  {label: '9.5', value: '9.5'},
  {label: '10', value: '10'},
  {label: '10.5', value: '10.5'},
  {label: '11', value: '11'},
  {label: '11.5', value: '11.5'},
  {label: '12', value: '12'},
  {label: '12.5', value: '12.5'},
  {label: '13', value: '13'},
  {label: '13.5', value: '13.5'},
  {label: '14', value: '14'},
];

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

export const otherSize = [{label: 'other', value: 'Other'}];

export const getSizeList = (category: string = '') => {
  switch (category) {
    case 'shoes':
      return shoesSizeList;
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

export const getAddProductRawData = () => {
  const addProductData: GET_PRODUCT_DETAILS = {
    stepOne: {
      category: null,
      brand: null,
      size: null,
      condition: null,
    },
    stepTwo: {
      productName: '',
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
    },
    stepFive: {
      productPrice: 0.0,
      shippingCost: 0.0,
      isShippingPrice: true,
      isFreeShipping: false,
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
  return filteredCategory[0] || arrayData[0];
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
  const newLootData: GET_PRODUCT_DETAILS = getAddProductRawData();
  // Configure STEP 1
  newLootData.stepOne.category = getStepOneDataFromLists(
    categoryList,
    lootData?.category,
  );
  newLootData.stepOne.brand = getStepOneDataFromLists(
    brandsList,
    lootData?.brand,
  );
  newLootData.stepOne.size = getStepOneDataFromLists(
    getSizeList(lootData?.category),
    lootData?.size,
  );
  newLootData.stepOne.condition = getStepOneDataFromLists(
    conditionList,
    lootData?.condition,
  );
  // Configure STEP 2
  newLootData.stepTwo.productName = lootData?.name;
  newLootData.stepTwo.productDescription = lootData?.description;
  // Configure STEP 3
  const secPhotosList =
    lootData?.secondary_photos && lootData?.secondary_photos?.length > 0
      ? [...lootData?.secondary_photos]
      : [];
  newLootData.stepThree = [lootData?.primary_photo, ...secPhotosList];
  // Configure STEP 4
  newLootData.stepFour.tradeOptions = getTradeDataForConfigure(lootData?.type);
  newLootData.stepFour.tradeDescription = lootData?.interestedIn;
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
      const {category, brand, size, condition} = prodData?.stepOne;
      if (category && brand && size && condition) {
        canGoNext = true;
      }
      break;
    case 2:
      const {productName, productDescription} = prodData?.stepTwo;
      if (productName && productDescription) {
        canGoNext = true;
      }
      break;
    case 3:
      const {stepThree} = prodData;
      if (stepThree?.length >= 2) {
        canGoNext = true;
      }
      break;
    case 4:
      const {tradeOptions} = prodData?.stepFour;
      if (
        tradeOptions?.isTradeAndSell ||
        tradeOptions?.isTradeOnly ||
        tradeOptions?.isSellOnly
      ) {
        canGoNext = true;
      }
      break;
    case 5:
      const {productPrice, shippingCost, isShippingPrice, isFreeShipping} =
        prodData?.stepFive;
      if (productPrice) {
        if (isFreeShipping) {
          canGoNext = true;
        } else if (isShippingPrice && shippingCost) {
          canGoNext = true;
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
      label: 'Shipped',
      selectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
      unSelectedIcon: ORDER_TRACK_SHIPPED_SELECTED,
    },
    {
      index: 3,
      label: 'In Transit',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 4,
      label: 'Delivered',
      selectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
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
      selectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 3,
      label: 'Verified Center',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 4,
      label: 'Shipped to you\n(transit)',
      selectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
      unSelectedIcon: ORDER_TRACK_IN_TRANSIT_UNSELECTED,
    },
    {
      index: 5,
      label: 'Delivered',
      selectedIcon: ORDER_TRACK_DELIVERED_UNSELECTED,
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
    labelColor: '#FACC15',
  };
  switch (status) {
    case Order_Status.Shipped:
      colorData.backColor = 'rgba(250, 204, 21, 0.1)';
      colorData.labelColor = '#FACC15';
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
  if (shippingStep === -1) {
    return {text: 'CANCELED'};
  }

  switch (shippingStep) {
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
          labelColor: '#FACC15',
        };
      case 1:
        return {
          text: 'Waiting for tracking update',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#FACC15',
        };
    }
  } else {
    switch (shippingStep) {
      case 0:
        return {
          text: 'Waiting for seller to ship',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#FACC15',
        };
      case 1:
        return {
          text: 'Waiting for tracking',
          backColor: 'rgba(250, 204, 21, 0.1)',
          labelColor: '#FACC15',
        };
    }
  }
};
