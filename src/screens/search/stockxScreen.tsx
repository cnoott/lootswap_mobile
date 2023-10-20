/***
  LootSwap - StockxScreen
 ***/

import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  TitleText,
  MiddleContainer,
  ImageContainer,
  StockxImage,
  ProductDetailsContainer,
  SelectSizeText,
  SizeDropdownStyle,
  SelectedTextStyle,
  ItemTextStyle,
  SectionContainer,
  MarketRangeText,
  BottomContainer,
  BottomTitle,
  DataContainer,
  DataRowContainer,
  NumberDataText,
  DataLabelText,
} from './stockxScreenStyles';
import {ButtonContainer} from '../publicOffers/styles';

import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {SvgXml} from 'react-native-svg';
import {ScrollView} from 'react-native';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  STOCKX_SEARCH_DROP_DOWN_ARROW,
  RIGHT_ARROW_DATA_ROW,
} from 'localsvgimages';
import {
  refreshStockxData,
  updateUser,
  fetchRelatedItemData,
} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {Animated} from 'react-native';
import {AuthProps} from '../../redux/modules/auth/reducer';

export const StockxScreen: FC<any> = ({route}) => {
  const {stockxProduct} = route.params;
  const [marketData, setMarketData] = useState([]);
  const [itemData, setItemData] = useState({
    foundPublicOffers: [],
    foundProducts: [],
    foundTrades: [],
  });
  const {foundPublicOffers, foundProducts, foundTrades} = itemData;
  const [selectedSize, setSelectedSize] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [opacity] = useState(new Animated.Value(1));
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const navigation: NavigationProp<any, any> = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(blink);
    loop.start();

    return () => loop.stop();
  }, []);

  useEffect(() => {
    setLoadingData(true);
    const reqData = {
      stockxId: stockxProduct._id,
      stockxUrlKey: stockxProduct.urlKey,
      name: stockxProduct.name,
    };
    dispatch(
      refreshStockxData(
        reqData,
        res => {
          setMarketData(res.sizes);
          setLoadingData(false);
          console.log('ISES', {...stockxProduct, sizes: res.sizes});
        },
        err => {
          console.log('ERR => ', err);
          setMarketData(stockxProduct.sizes);
          setLoadingData(false);
        },
      )
    );

    dispatch(
      fetchRelatedItemData(
        reqData,
        res => {
          setItemData(res);
        },
        error => {
          console.log('ERR => ', err);
        },
      ),
    );
  }, [dispatch, stockxProduct.name, stockxProduct.urlKey]);

  const calcMarketRange = (lastSale: number) => {
    if (!lastSale) {
      return ' ';
    }
    const startRange = Math.floor(lastSale - lastSale * 0.1);
    const endRange = Math.floor(lastSale + lastSale * 0.1);

    return `$${startRange} - $${endRange}`
  };

  const LoadingMarketData = () => {
    return (
      <Animated.Text
        style={{
          borderRadius: 20,
          fontSize: 16,
          opacity,
          marginTop: 5,
          fontFamily: 'Urbanist-SemiBold',
          color: '#6267FE',
        }}>
        Loading
      </Animated.Text>
    );
  };

  const handleHasItNavigation = () => {
    navigation?.navigate('HasItScreen', {
      stockxProduct: stockxProduct,
      foundProducts: foundProducts,
    });
  };

  const handleTradedItNavigation = () => {
    navigation?.navigate('TradedItScreen', {
      foundTrades: foundTrades,
    });
  };

  const handleFoundPublicOffersNavigation = () => {
    navigation?.navigate('FoundPublicOffersScreen', {
      stockxProduct: stockxProduct,
      foundPublicOffers: foundPublicOffers,
    });
  };

  const isProductLiked = () => {
    if (!isLogedIn) {
      return false;
    }
    return userData?.likedStockxProducts?.some(productId => {
      return productId === stockxProduct?._id;
    });
  };

  const handleLikeProduct = () => {
    if (!isLogedIn) {
      return;
    }
    let likedStockxProducts = [];
    if (isProductLiked()) {
      likedStockxProducts = userData?.likedStockxProducts?.filter(
        productId => productId !== stockxProduct?._id
      );
    } else {
      likedStockxProducts = [
        stockxProduct?._id,
        ...userData?.likedStockxProducts,
      ];
    }
    dispatch(
      updateUser({
        userId: userData?._id,
        userData: {likedStockxProducts: likedStockxProducts},
        noLoad: true,
      }),
    );
  };

  return (
    <>
      <InStackHeader
        title={''}
        heartIconRight={true}
        heartIsRed={isProductLiked()}
        onRightIconPress={() => handleLikeProduct()}
      />
      <Container>
        <ScrollView>
          <TitleText>{stockxProduct.name}</TitleText>
          <MiddleContainer>
            <ImageContainer>
              <StockxImage source={{uri: stockxProduct?.image}}/>
            </ImageContainer>
            <ProductDetailsContainer>
              <SectionContainer>
                <SelectSizeText>Size:</SelectSizeText>
                {loadingData ? (
                  <LoadingMarketData />
                ) : (
                  <Dropdown
                    style={[SizeDropdownStyle]}
                    selectedTextStyle={SelectedTextStyle}
                    placeholderStyle={SelectedTextStyle}
                    itemTextStyle={ItemTextStyle}
                    placeholder={'Select Size'}
                    labelField={'sizeUS'}
                    valueField={'sizeUS'}
                    onChange={item => setSelectedSize(item)}
                    data={marketData}
                    value={selectedSize}
                    maxHeight={300}
                    renderRightIcon={() => <SvgXml xml={STOCKX_SEARCH_DROP_DOWN_ARROW} />}
                  />
                )}
              </SectionContainer>
              <SectionContainer>
                <SelectSizeText>Estimated Market Value:</SelectSizeText>
                {!selectedSize && <MarketRangeText>...</MarketRangeText>}
                {selectedSize &&
                  <MarketRangeText>{calcMarketRange(selectedSize?.lastSale)}</MarketRangeText>
                }
              </SectionContainer>
            </ProductDetailsContainer>
          </MiddleContainer>
          <BottomContainer>
            <BottomTitle>Item data:</BottomTitle>
            <DataContainer>
              <DataRowContainer onPress={() => handleFoundPublicOffersNavigation()}>
                <NumberDataText>{foundPublicOffers?.length}</NumberDataText>
                <DataLabelText>
                  Public Offers
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>

              <DataRowContainer onPress={() => handleHasItNavigation()}>
                <NumberDataText>{foundProducts?.length}</NumberDataText>
                <DataLabelText>
                  Has It
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>
              <DataRowContainer onPress={() => handleTradedItNavigation()}>
                <NumberDataText>{foundTrades.length}</NumberDataText>
                <DataLabelText>
                  Traded It
                  <SvgXml xml={RIGHT_ARROW_DATA_ROW} />
                </DataLabelText>
              </DataRowContainer>
            </DataContainer>
            <LSButton
              title={'Create an offer'}
              size={Size.Full}
              type={loadingData ? Type.Grey : Type.Primary}
              disabled={loadingData}
              radius={20}
              onPress={() =>
                navigation?.navigate('CreatePublicOfferScreen', {
                  preselectedStockxItem: {...stockxProduct, sizes: marketData},
                  skipFirstScreen: true,
                })}
            />
          </BottomContainer>
        </ScrollView>
      </Container>
    </>
  );
};

export default StockxScreen;
