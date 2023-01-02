/***
  LootSwap - MY LOOT SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Container, SubContainer, FlatList} from './myLootStyles';
import {getProductListedItemsForOffer} from '../../redux/modules';
import {Alert} from 'custom_top_alert';
import MyLootCell from '../../components/loot/myLootItemCell';

export const MyLootScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(
        getProductListedItemsForOffer(
          userData?._id,
          (response: any) => {
            setUserItems(response);
          },
          () => {
            Alert.showError('Could not load items!');
          },
        ),
      );
    }
  }, [userData?._id, dispatch]);

  return (
    <Container>
      <InStackHeader back={true} title={'My Loot'} />
      <SubContainer>
        <FlatList
          data={userItems}
          renderItem={item => <MyLootCell item={item} />}
        />
      </SubContainer>
    </Container>
  );
};

export default MyLootScreen;
