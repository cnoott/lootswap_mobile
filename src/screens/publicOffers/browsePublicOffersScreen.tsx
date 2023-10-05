/***
  LootSwap - BROWSE PUBLIC OFFERS
 ***/

import React, {FC, useState, useRef, useEffect} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  BrowsePublicOffersContainer,
  PublicOffersFlatList,
  ButtonContainer,
} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {getPublicOffers} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  OfferCellContainer,
  RowView,
  OwnerDetailsView,
  EmptyRowView,
} from '../offers/styles';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';


const ITEMS_PER_PAGE = 6;

export const BrowsePublicOffersScreen: FC<any> = () => {
  const [publicOffers, setPublicOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();

  useEffect(() => {
    const reqData = {
      type: 'Browse',
      userId: userData?._id,
      pagination: true,
      page: page,
      itemsPerPage: ITEMS_PER_PAGE,
      showLoad: page > 0 ? false : true,
    };
    setLoading(true);
    dispatch(
      getPublicOffers(
        reqData,
        res => {
          console.log('RESPONSE', res);
          setPublicOffers([...publicOffers, ...res]);
          setLoading(false);
        },
        err => {
          console.log('ERR => ', err);
          setLoading(false);
        },
      ),
    );
  }, [page]);

  const renderPublicOfferItem = ({item}: any) => {
    return <PublicOfferItem publicOffer={item} />
  };

  const renderBottomButtonView = () => {
    return (
      <ButtonContainer>
        <LSButton
          title={'Create Public Offer'}
          size={Size.Large}
          type={Type.Primary}
          radius={20}
          onPress={() => navigation?.navigate('CreatePublicOfferScreen')}
        />
      </ButtonContainer>
    );
  };

  const onEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  return (
    <>
      <BrowsePublicOffersContainer>
      <InStackHeader title={'Public Offers'}/>
        <PublicOffersFlatList
          data={publicOffers}
          renderItem={renderPublicOfferItem}
          keyExtractor={item => item?._id}
          onEndReached={() => onEndReached()}
          onEndReachedThreshold={0.99}
        />
      </BrowsePublicOffersContainer>
      {renderBottomButtonView()}
    </>
  );
};

export default BrowsePublicOffersScreen;
