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
import {useScrollToTop} from '@react-navigation/native';
import {
  getHomeScreenProducts,
  getMyDetailsNoLoadRequest,
  getHomeScreenPublicOffers,
  getPublicOffers,
} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Size, Type} from '../../enums';
import LSButton from '../../components/commonComponents/LSButton';
import PublicOfferCell from '../../components/publicOffer/PublicOfferCell';
import {ScrollView} from 'react-native';
import LoadingProductCard from '../../components/productCard/loadingProductCard';

const ITEMS_PER_PAGE = 8;
const PUBLIC_OFFERS_PER_PAGE = 4;

export const HomeScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);

  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const [products, setProducts] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [publicOffers, setPublicOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [publicOffersPage, setPublicOffersPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [publicOffersLoading, setPublicOffersLoading] = useState(false);

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
          setProducts([...products, ...res.products]);
          setEndReached(res.endReached);
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
    if (loading && !endReached) {
      setLoadingItems(new Array(8).fill({loading: true}));
      console.log('now loading');
    } else {
      setLoadingItems([]);
      console.log('not loading');
    }
  }, [loading]);

  useEffect(() => {
    setPublicOffersLoading(true);
    if (isLogedIn) {
      const reqData = {
        type: 'Browse',
        userId: userData?._id,
        pagination: true,
        page: publicOffersPage,
        itemsPerPage: PUBLIC_OFFERS_PER_PAGE,
        showLoad: false,
      };
      dispatch(
        getPublicOffers(
          reqData,
          (res: any) => {
            setPublicOffers([...publicOffers, ...res]);
            setPublicOffersLoading(false);
          },
          (err: any) => {
            console.log('ERR => ', err);
            setPublicOffersLoading(false);
          },
        ),
      );
    } else {
      const reqData = {
        itemsPerPage: PUBLIC_OFFERS_PER_PAGE,
        page: publicOffersPage,
      };
      dispatch(
        getHomeScreenPublicOffers(
          reqData,
          (res: any) => {
            setPublicOffers([...publicOffers, ...res]);
            setPublicOffersLoading(false);
          },
          (err: any) => {
            console.log('ERR => ', err);
            setPublicOffersLoading(false);
          },
        ),
      );
    }
  }, [publicOffersPage]);

  const handleRefresh = async () => {
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
          //setProducts(res.products);
          setEndReached(res.endReached);
        },
        (err: any) => {
          console.log(err);
        },
      ),
    );
    setPublicOffersPage(0);
    setRefreshing(false);

    if (isLogedIn) { // same code as above in the useEffect XXX 
      const publicOfferReqData = {
        type: 'Browse',
        userId: userData?._id,
        pagination: true,
        page: page,
        itemsPerPage: PUBLIC_OFFERS_PER_PAGE,
        showLoad: false,
      };
      dispatch(
        getPublicOffers(
          publicOfferReqData,
          (res: any) => {
            setPublicOffers(res);
          },
          (err: any) => {
            console.log('ERR => ', err);
          },
        ),
      );
    } else {
      const publicOfferReqData = {
        itemsPerPage: PUBLIC_OFFERS_PER_PAGE,
        page: publicOffersPage,
      };
      dispatch(
        getHomeScreenPublicOffers(
          publicOfferReqData,
          (res: any) => {
            setPublicOffers(res);
          },
          (err: any) => {
            console.log('ERR => ', err);
          },
        ),
      );
    }

  };

  const goToLikedProducts = () => {
    navigation.navigate('LikedProductScreen');
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const onEndReached = () => {
    if (!loading && !endReached) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onPublicOffersEndReached = () => {
    if (!publicOffersLoading) {
      setPublicOffersPage(prevPage => prevPage + 1);
    }
  };

  const renderPublicOfferItem = ({item, key}: any) => {
    return (
      <PublicOfferCell
        key={key}
        receivingStockxProducts={item.receivingStockxProducts}
        sendingProductIds={item.sendingProductIds}
        receivingMoneyOffer={item.receivingMoneyOffer}
        sendingMoneyOffer={item.sendingMoneyOffer}
        isFromHome={true}
        onPress={() =>
          navigation?.navigate('PublicOfferScreen', {publicOffer: item})
        }
      />
    );
  };

  const renderItem = ({item, index}: any) => {
    if (item.loading) {
      return (
        <LoadingProductCard key={`loading-${index}`} isHorizontalView={true}/>
      );
    }
    return <LSProductCard item={item} isHorizontalView={true} key={item._id} />;
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
            onPress={() =>
              isLogedIn
                ? navigation?.navigate('BrowsePublicOffersScreen')
                : navigation?.navigate('SignInScreen')
            }
          />
        </SectionTopContainer>
        <PublicOffersFlatList
          data={publicOffers}
          renderItem={renderPublicOfferItem}
          keyExtractor={item => item?._id}
          horizontal={true}
          onEndReached={() => onPublicOffersEndReached()}
        />
      </SectionContainer>
    );
  };

  const renderSearchBar = () => {
    return (
      <SearchContainer>
        <LSHomeScreenSearch
          onRightIconPress={onRightIconPress}
          isFromHome={true}
        />
      </SearchContainer>
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
      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }>
        <CarouselComponent
          height={scale(360)}
          isHome={true}
          renderSearchBar={renderSearchBar}
        />
        {renderPublicOffers()}
        <SectionContainer>
          <SectionTopContainer>
            <SectionTitleText>All Listings</SectionTitleText>
            <LSButton
              title={'View All'}
              size={Size.ViewSmall}
              type={Type.View}
              radius={20}
              onPress={() => navigation?.navigate('AllListingsScreen')}
            />

          </SectionTopContainer>
        </SectionContainer>

        <FlatList
          data={[...products, ...loadingItems]}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : `loading-${index}`
          }
          onEndReached={() => onEndReached()}
          horizontal={true}
          onEndReachedThreshold={0.5}
        />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
