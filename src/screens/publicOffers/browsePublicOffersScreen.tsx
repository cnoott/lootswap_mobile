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
import {getPublicOffers, deletePublicOffer} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

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

  const handleDeletePublicOffer = (publicOfferId: string) => {
    const reqData = {
      userId: userData?._id,
      publicOfferId: publicOfferId,
    };
    dispatch(
      deletePublicOffer(
        reqData,
        res => {
          const newPublicOffers = publicOffers.filter(
            offer => offer._id !== publicOfferId
          );
          setPublicOffers(newPublicOffers);
        },
        err => {
          console.log('ERROR => ', err);
        },
      ),
    );

  };


  const renderPublicOfferItem = ({item}: any) => {
    return (
      <PublicOfferItem
        publicOffer={item}
        handleDelete={handleDeletePublicOffer}
      />
    );
  };
  const goToCreatePublicOfferScreen = () => {
    navigation?.navigate('CreatePublicOfferScreen');
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    analytics().logEvent('start_create_public_offer', {
      timestamp: currentEpochTime
    })
  }

  const renderBottomButtonView = () => {
    return (
      <ButtonContainer>
        <LSButton
          title={'Create Public Offer'}
          size={Size.Large}
          type={Type.Primary}
          radius={20}
          onPress={() => goToCreatePublicOfferScreen()}
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
      <InStackHeader
        title={'Public Offers'}
        onlyTitleCenterAlign={true}
        />
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
