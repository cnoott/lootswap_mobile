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
import {loggingService} from '../../services/loggingService';
import LoadingPublicOfferCell from '../../components/publicOffer/LoadingPublicOfferCell';

const ITEMS_PER_PAGE = 6;

export const BrowsePublicOffersScreen: FC<any> = () => {
  const [publicOffers, setPublicOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState([]);
  const [page, setPage] = useState(0);
  const [endReached, setEndReached] = useState(false);
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
      showLoad: false,
    };
    dispatch(
      getPublicOffers(
        reqData,
        res => {
          setPublicOffers([...publicOffers, ...res.publicOffers]);
          setEndReached(res.endReached);
          setLoadingItems([]); // Clear loading items once data is loaded
          setLoading(false);
        },
        err => {
          console.log('ERR => ', err);
          setLoadingItems([]); // Also clear loading items on error
          setLoading(false);
        },
      ),
    );
  }, [page]);

  useEffect(() => {
    if (loading) {
      if (publicOffers.length === 0) {
        setLoadingItems(new Array(6).fill({loading: true}));
      }
    }
  }, [loading, publicOffers.length]);

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
            offer => offer._id !== publicOfferId,
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
    if (item.loading) {
      return <LoadingPublicOfferCell />;
    } else {
      return (
        <PublicOfferItem
          publicOffer={item}
          handleDelete={handleDeletePublicOffer}
        />
      );
    }
  };
  const goToCreatePublicOfferScreen = () => {
    navigation?.navigate('CreatePublicOfferScreen');
  };

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
        <InStackHeader title={'Public Offers'} onlyTitleCenterAlign={true} />
        <PublicOffersFlatList
          data={[...publicOffers, ...loadingItems]} // Combine actual data with loading placeholders
          renderItem={renderPublicOfferItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : `loading-${index}`
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.99}
        />
      </BrowsePublicOffersContainer>
      {renderBottomButtonView()}
    </>
  );
};

export default BrowsePublicOffersScreen;
