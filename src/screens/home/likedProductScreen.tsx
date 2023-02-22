/***
LootSwap - LIKED PRODUCT SCREEN
***/

import React, {FC, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getMyDetailsRequest} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSProductCard from '../../components/productCard';
import {Container, SubContainer, FlatList} from './likedProductScreenStyles';

export const LikedProductScreen: FC<any> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();
  const [likedProdList, setLikedProdList] = useState([]);
  const {productsList} = props.route?.params;
  useEffect(() => {
    if (userData?._id) {
      dispatch(getMyDetailsRequest(userData?._id));
    }
  }, []);

  useEffect(() => {
    if (userData?.likedProducts?.length > 0) {
      const likedList = productsList.filter(prod =>
        userData?.likedProducts?.includes(prod?.objectID),
      );
      setLikedProdList(likedList);
    }
  }, [userData?.likedProducts, productsList]);

  const renderItem = ({item}) => {
    return <LSProductCard item={{...item, objectID: item._id}} liked={true} />;
  };

  return (
    <Container>
      <InStackHeader title={'Likes/Wishlist'} back onlyTitleCenterAlign />
      <SubContainer>
        <FlatList
          data={userData?.likedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.objectID}
        />
      </SubContainer>
    </Container>
  );
};

export default LikedProductScreen;
