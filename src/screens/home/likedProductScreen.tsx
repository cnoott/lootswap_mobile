/***
  LootSwap - LIKED PRODUCT SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  getMyDetailsRequest,
  getLikedProducts,
  updateUser,
} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSProductCard from '../../components/productCard';
import LSEmptyListComponent from '../../components/commonComponents/LSEmptyListComponent';
import {EMPTY_TRADE_OFFERS_ICON} from 'localsvgimages';
import {
  Container,
  SubContainer,
  FlatList,
  StockxFlatList,
} from './likedProductScreenStyles';
import {CustomTabBar, TabBarLabel, TopTabView} from '../offers/styles';
import {SceneMap} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import StockxProductCard from '../../components/search/stockxProductCard';
import { handleNavigation } from '../../utility/notification';

export const LikedProductScreen: FC<any> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const auth: AuthProps = useSelector(state => state.auth);
  const layout = useWindowDimensions();
  const {userData} = auth;
  const dispatch = useDispatch();
  const [likedProdList, setLikedProdList] = useState([]);
  const [likedStockxProducts, setLikedStockxProducts] = useState([]);

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Liked Listings'},
    {key: 'second', title: 'Market Wishlist'},
  ]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getMyDetailsRequest(userData?._id));
      dispatch(
        getLikedProducts(
          {userId: userData?._id},
          res => {
            setLikedStockxProducts(res);
          },
          err => {
            console.log('ERR= >', err);
          },
        ),
      );
    }
  }, []);

  const renderItem = ({item}) => {
    return <LSProductCard item={{...item, objectID: item._id}} liked={true} />;
  };

  const handleUnlikeProduct = (stockxProduct: any) => {
    const newLikedStockxProductIds = userData?.likedStockxProducts?.filter(
      productId => productId !== stockxProduct?._id
    );
    const newLikedStockxProducts = likedStockxProducts?.filter(
      product => product?._doc._id !== stockxProduct?._id
    );
    setLikedStockxProducts(newLikedStockxProducts);

    dispatch(
      updateUser({
        userId: userData?._id,
        userData: {likedStockxProducts: newLikedStockxProductIds},
        noLoad: true,
      }),
    );
  };

  const handleStockxNavigation = (
    stockxProduct: any,
    foundProducts: Array<any>,
  ) => {
    navigation?.navigate('StockxScreen', {
      stockxProduct: stockxProduct,
      foundProducts: foundProducts
    });
  };


  const stockxRenderItem = ({item}) => {
    const stockxProduct = item._doc;
    const foundProducts = item.foundProducts;

    return (
      <>
        <StockxProductCard
          stockxProduct={stockxProduct}
          foundProducts={foundProducts}
          isFromLiked={true}
          handleUnlikeProduct={handleUnlikeProduct}
          handleStockxNavigation={handleStockxNavigation}
        />
      </>
    );
  };

  const renderTabBar = (props: any) => (
    <CustomTabBar
      {...props}
      renderLabel={({route, focused}: any) => (
        <TabBarLabel focused={focused}>{route.title}</TabBarLabel>
      )}
    />
  );

  const FirstRoute = () => (
    <SubContainer>
      <FlatList
        data={userData?.likedProducts}
        renderItem={renderItem}
        keyExtractor={item => item?._id}
        ListEmptyComponent={() => (
          <LSEmptyListComponent
            emptyMsg={'Your wishlist is empty, Go & add some..'}
            svgImg={EMPTY_TRADE_OFFERS_ICON}
          />
        )}
      />
    </SubContainer>
  );
  const SecondRoute = () => (
    <SubContainer>
      <StockxFlatList
        data={likedStockxProducts}
        renderItem={stockxRenderItem}
      />
    </SubContainer>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <Container>
      <InStackHeader title={'Likes/Wishlist'} back onlyTitleCenterAlign />
      <TopTabView
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </Container>
  );
};

export default LikedProductScreen;
