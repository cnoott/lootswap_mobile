/***
LootSwap - ADD_PRODUCT STEP 4
***/

import React, {FC, useState, useEffect, useCallback, useRef} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {
  Container,
  HorizontalSpace,
  TradeOptionsText,
  TradeButton,
  TradeButtonText,
  RecTagContainer,
  FreeTag,
  EmptyView,
  TouchableRowTradeOptions,
  PaypalDisclaimerView,
  DisclaimerText,
  DisclaimerTextUnderlined,
} from './styles';
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE, WANTED_STOCKX_ITEM} from 'custom_types';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import {SvgXml} from 'react-native-svg';
import {SEARCH_INPUT_ICON, WARNING_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StockxSearchResults} from '../../../components/loot/stockxSearchResults';
import {searchStockx} from '../../../redux/modules';
import useDebounce from '../../../utility/customHooks/useDebouncer';
import {useDispatch} from 'react-redux';
import {FlatList, ScrollView, Animated, Dimensions} from 'react-native';
import ChosenStockxProduct from '../../../components/loot/chosenStockxProduct';

interface ProductStep {
  updateProductData: Function; 
}

export const AddProductStepFour: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const navigation: NavigationProp<any, any> = useNavigation();
  const {stepFour} = addProductData;
  const [tradeDes, setTradeDes] = useState(stepFour?.tradeDescription || '');  
  const {updateProductData} = props;
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, skippedPaypalOnboarding} = auth;

  const animation = useRef(new Animated.Value(0)).current;
  const drawerWidth = Dimensions.get('window').width * 0.30;
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, drawerWidth],
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStockxProducts, setSelectedStockxProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDrawerAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const collapseDrawer = () => {
    if (loading) {
      return;
    }
    //if (isOpen) return;
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (!userData?.paypal_onboarded && skippedPaypalOnboarding) {
      onChangeTrade(2);
    }
  }, []);

  const debouncedSearchTerm = useDebounce(searchInput, 313); //set delay
  useEffect(() => {
    if (!loading && debouncedSearchTerm && debouncedSearchTerm.length > 5) {
      fetchStockxData();
    }
  }, [debouncedSearchTerm]);

  const fetchStockxData = useCallback(() => {
    if (loading) return;
    setLoading(true);
    handleDrawerAnimation();

    const reqData = {
      userId: userData?._id,
      query: searchInput,
    };
    dispatch(
      searchStockx(
        reqData,
        (res: any) => {
          setSearchResults(res);
          setLoading(false);
        },
        (err: any) => {
          console.log('Err', err);
          setLoading(false);
        }
      ),
    );
  }, [searchInput, loading, userData?._id, dispatch]);

  const onChangeTrade = (index = 1) => {
    const newData = {
      isTradeAndSell: false,
      isTradeOnly: false,
      isSellOnly: false,
    };
    switch (index) {
      case 1:
        newData.isTradeAndSell = true;
        newData.isTradeOnly = false;
        newData.isSellOnly = false;
        break;
      case 2:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = true;
        newData.isSellOnly = false;
        break;
      case 3:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = false;
        newData.isSellOnly = true;
        break;
      default:
        break;
    }
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeOptions: {
          ...newData,
        },
      },
    });
  };
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeDescription: tradeDes,
      },
    });
  };
  const renderTradeButton = (
    label: string,
    isSelected: boolean,
    onPress: Function,
  ) => {
    const disableSellOptions =
      skippedPaypalOnboarding &&
      !userData?.paypal_onboarded &&
      label !== 'Trade Only';

    return (
      <TouchableRowTradeOptions onPress={onPress} disabled={disableSellOptions}>
        <TradeButton selected={isSelected} disabled={disableSellOptions}>
          <TradeButtonText selected={isSelected} disabled={disableSellOptions}>
            {label}
          </TradeButtonText>
        </TradeButton>
        {label === 'Trade and Sell' && (
          <RecTagContainer>
            <FreeTag>Recommended</FreeTag>
          </RecTagContainer>
        )}
      </TouchableRowTradeOptions>
    );
  };
  const renderTradeView = () => {
    return (
      <EmptyView>
        <TradeOptionsText>
          Do you want to trade or sell your item?
        </TradeOptionsText>
        {renderTradeButton(
          'Trade and Sell',
          stepFour?.tradeOptions?.isTradeAndSell,
          () => onChangeTrade(1),
        )}
        {renderTradeButton(
          'Trade Only',
          stepFour?.tradeOptions?.isTradeOnly,
          () => onChangeTrade(2),
        )}
        {renderTradeButton(
          'Sell Only',
          stepFour?.tradeOptions?.isSellOnly,
          () => onChangeTrade(3),
        )}
      </EmptyView>
    );
  };

  const onDisclaimerPress = () => {
    navigation.navigate('LinkPaypalScreen', {
      goToListLoot: false,
    });
  };

  const handleSetSize = ({_index, label, value}: any, urlKey: any) => {
    const updatedStockxProducts =
      addProductData?.stepFour?.wantedStockxItems?.map(item => {
        if (urlKey === item.urlKey) {
          return {...item, size: {label, value}};
        } else {
          return item;
        }
      });

    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        wantedStockxItems: updatedStockxProducts,
      },
    });
  };

  const deleteStockxItem = (itemId: string) => {
    const updatedStockxProducts =
      addProductData?.stepFour?.wantedStockxItems?.filter(
        item => item?._id !== itemId,
      );

    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        wantedStockxItems: updatedStockxProducts,
      },
    });
  };

  const renderStockxProduct = ({item}: any) => {
    return (
      <ChosenStockxProduct
        stockxProduct={item}
        onDeletePress={() => deleteStockxItem(item._id)}
        categoryData={addProductData?.stepOne?.category}
        onSetSizeData={sizeData => handleSetSize(sizeData, item.urlKey)}
        productName={item.name}
        chosenSize={item.size}
        isFromPublicOffers={false}
      />
    );
  };

  const handleSelectItem = (item: any) => {
    const wantedStockxItems = addProductData?.stepFour?.wantedStockxItems;
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData.stepFour,
        wantedStockxItems: [item, ...wantedStockxItems]
      },
    });
    setSearchInput('');
    collapseDrawer();
  };

  return (
    <Container>
      <ScrollView>
        <HorizontalSpace>
          {renderTradeView()}
          {skippedPaypalOnboarding && !userData?.paypal_onboarded && (
            <PaypalDisclaimerView onPress={onDisclaimerPress}>
              <SvgXml xml={WARNING_ICON} />
              <DisclaimerText>
                In order to sell your item, you need to link your PayPal.{' '}
                <DisclaimerTextUnderlined>
                  Tap here to link
                </DisclaimerTextUnderlined>
              </DisclaimerText>
            </PaypalDisclaimerView>
          )}
          <TradeOptionsText>
            Are there any particular items you wish to trade this item for? (Optional)
          </TradeOptionsText>
        </HorizontalSpace>
        <LSInput
          onChangeText={setSearchInput}
          horizontalSpace={'0'}
          value={searchInput}
          leftIcon={SEARCH_INPUT_ICON}
          placeholder={
            addProductData?.stepFour?.wantedStockxItems?.length ? 'Search again' : 'Item Name'
          }
          returnKeyType={'search'}
          onSubmitEditing={() => fetchStockxData()}
          autoCorrect={false}
          spellCheck={false}
          onFocus={handleDrawerAnimation}
        />
        <Animated.View style={{height, overflow: 'hidden'}}>
          <StockxSearchResults
            selectedUrlKey={' '}
            searchResults={searchResults.slice(0, 3)}
            loading={loading}
            onSelectResult={handleSelectItem}
            productName={'none'}
            showTitle={false}
            isFromStepFour={true}
          />
        </Animated.View>
        <FlatList
          data={addProductData?.stepFour?.wantedStockxItems}
          renderItem={renderStockxProduct}
        />
      </ScrollView>
    </Container>
  );
};

export default AddProductStepFour;
