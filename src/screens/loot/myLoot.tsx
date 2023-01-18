/***
  LootSwap - MY LOOT SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Container, SubContainer, FlatList} from './myLootStyles';
import {getProductListedItemsForOffer} from '../../redux/modules';
import {Alert} from 'custom_top_alert';
import MyLootCell from '../../components/loot/myLootItemCell';
import {UpdateAddProductData} from '../../redux/modules';
import {configureAndGetLootData} from '../../utility/utility';

export const MyLootScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (userData?._id) {
      getLootData(userData?._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?._id]);

  const getLootData = (userId: string) => {
    dispatch(
      getProductListedItemsForOffer(
        userId,
        (response: any) => {
          setUserItems(response);
        },
        () => {
          Alert.showError('Could not load items!');
        },
      ),
    );
  };

  const onMyLootRefresh = () => {
    getLootData(userData?._id);
  };

  const onEditLootPress = ({item}: any) => {
    const prodData = configureAndGetLootData(item);
    dispatch(UpdateAddProductData(prodData));
    navigation.navigate('AddProductOverviewScreen', {
      isFromEdit: true,
      productId: item?._id,
    });
  };

  return (
    <Container>
      <InStackHeader back={true} title={'My Loot'} />
      <SubContainer>
        <FlatList
          data={userItems}
          renderItem={item => (
            <MyLootCell
              item={item}
              onEditLootPress={() => onEditLootPress(item)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onMyLootRefresh} />
          }
        />
      </SubContainer>
    </Container>
  );
};

export default MyLootScreen;
