/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useState, useEffect} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import {
  Container,
  FlatList,
  PublicOffersFlatList,
  SearchContainer,
  SectionContainer,
  SectionTopContainer,
  SectionTitleText,
} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import {scale} from 'react-native-size-matters';
import {RefreshControl} from 'react-native';
import {LIKE_HEART_ICON} from 'localsvgimages';
import useFCMNotifications from '../../utility/customHooks/useFCMNotifications';
import {useScrollToTop} from '@react-navigation/native';
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../redux/modules/loading/actions';
import {
  getHomeScreenProducts,
  getMyDetailsNoLoadRequest,
  getHomeScreenPublicOffers,
} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Size, Type} from '../../enums';
import LSButton from '../../components/commonComponents/LSButton';
import PublicOfferCell from '../../components/publicOffer/PublicOfferCell';

const ITEMS_PER_PAGE = 8;
const PUBLIC_OFFERS_PER_PAGE = 4;

export const HomeScreen: FC<{}> = () => {
  useFCMNotifications();
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const [products, setProducts] = useState([]);
  const [publicOffers, setPublicOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [publicOffersPage, setPublicOffersPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page,
    };
    dispatch(
      getHomeScreenProducts(
        reqData,
        (res: any) => {
          setProducts([...products, ...res]);
          setLoading(false);
        },
        (err: any) => {
          console.log(err);
          setLoading(false);
        },
      ),
    );
    if (isLogedIn) {
      dispatch(getMyDetailsNoLoadRequest(userData?._id));
    }
  }, [page]);

  useEffect(() => {
    const reqData = {
      itemsPerPage: PUBLIC_OFFERS_PER_PAGE,
      page: publicOffersPage,
    };
    dispatch(
      getHomeScreenPublicOffers(
        reqData,
        (res: any) => {
          setPublicOffers([...publicOffers, ...res]);
        },
        (err: any) => {
          console.log('ERR => ', err);
        },
      ),
    );
  }, [publicOffersPage]);

  const handleRefresh = async () => {
    console.log('RERESHING');
    setRefreshing(true);
    ReactNativeHapticFeedback.trigger('impactMedium');
    setPage(0);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page,
    };
    dispatch(
      getHomeScreenProducts(
        reqData,
        (res: any) => {
          setProducts(res);
        },
        (err: any) => {
          console.log(err);
        },
      ),
    );
    setRefreshing(false);
  };

  const goToLikedProducts = () => {
    navigation.navigate('LikedProductScreen');
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const onEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderPublicOfferItem = ({item}: any) => {
    console.log('ITEM', item);
    return (
      <PublicOfferCell
        receivingStockxIds={item.receivingStockxIds}
        sendingProductIds={item.sendingProductIds}
        receivingMoneyOffer={item.receivingMoneyOffer}
        sendingMoneyOffer={item.sendingMoneyOffer}
        isFromHome={true}
      />
    );
  };

  const renderItem = ({item}: any) => {
    if (loading) {
      //return <LoadingProductCard />
    }
    return <LSProductCard item={item} />;
  };

  const onToggleModal = () => {
    setModalOpen(isOpen => !isOpen);
  };

  const renderPublicOffers = () => {
    return (
      <SectionContainer>
        <SectionTopContainer>
          <SectionTitleText>Public Offers</SectionTitleText>
          <LSButton
            title={'View/Create'}
            size={Size.View}
            type={Type.View}
            radius={20}
            onPress={() => navigation?.navigate('CreatePublicOfferScreen')}
          />
        </SectionTopContainer>
        <PublicOffersFlatList
          data={publicOffers}
          renderItem={renderPublicOfferItem}
          keyExtractor={item => item?._id}
          horizontal={true}
        />
      </SectionContainer>
    );
  };

  return (
    <Container>
      <InHomeHeader
        isHome={true}
        rightIcon={LIKE_HEART_ICON}
        centerAligned={false}
        onRightItemPress={() => goToLikedProducts()}
      />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        onEndReached={() => onEndReached()}
        //refreshing={refreshing}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <>
            <SearchContainer>
              <LSHomeScreenSearch onRightIconPress={onRightIconPress} isFromHome={true}/>
            </SearchContainer>
            <CarouselComponent height={scale(320)} isHome={true} />
            {renderPublicOffers()}
          </>
        }
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
          data,
        })}
      />
    </Container>
  );
};

export default HomeScreen;
