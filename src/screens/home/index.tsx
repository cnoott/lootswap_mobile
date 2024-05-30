/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useState, useEffect, useCallback} from 'react';
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
  getHotProducts,
  getForYouProducts,
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
import LoadingPublicOfferCell from '../../components/publicOffer/LoadingPublicOfferCell';
import OnboardingProducts from '../../components/home/OnboardingProducts';
import RecentlyViewed from '../../components/home/RecentlyViewed';
import { isLandscape } from 'react-native-device-info';


const ITEMS_PER_PAGE = 8;
const PUBLIC_OFFERS_PER_PAGE = 5;

export const HomeScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingItems, setLoadingItems] = useState([]);
  const [hotLoadingItems, setHotLoadingItems] = useState([]);
  const [forYouLoadingItems, setForYouLoadingItems] = useState([]);
  const [loadingPublicOffersItems, setLoadingPublicOffersItems] = useState([]);

  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn, itemsViewed} = auth;

  const [products, setProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [forYouProducts, setForYouProducts] = useState([]);

  const [publicOffers, setPublicOffers] = useState([]);

  const [endReached, setEndReached] = useState(false);
  const [hotEndReached, setHotEndReached] = useState(false);
  const [forYouEndReached, setForYouEndReached] = useState(false);
  const [publicOffersEndReached, setPublicOffersEndReached] = useState(false);
  const [page, setPage] = useState(0);
  const [hotPage, setHotPage] = useState(0);
  const [forYouPage, setForYouPage] = useState(0);
  const [publicOffersPage, setPublicOffersPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hotProductsLoading, setHotProductsLoading] = useState(false);
  const [forYouLoading, setForYouLoading] = useState(false);
  const [publicOffersLoading, setPublicOffersLoading] = useState(false);

  useEffect(() => {
    if (isLogedIn) {
      fetchForYouProducts();
    }
  }, [forYouPage, isLogedIn, userData?.onboardingData]);

  useEffect(() => {
    fetchHomeScreenProducts();
    if (!isLogedIn && page === 3) {
      navigation?.navigate('CreateAccountScreen');
    }
  }, [page]);

  useEffect(() => {
    fetchHotProducts();
    if (!isLogedIn && hotPage === 3) {
      navigation?.navigate('CreateAccountScreen');
    }
  }, [hotPage]);

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
    if (forYouLoading && !forYouEndReached) {
      setForYouLoadingItems(new Array(8).fill({loading: true}));
      console.log('now loading');
    } else {
      setForYouLoadingItems([]);
      console.log('not loading');
    }
  }, [forYouLoading]);

  useEffect(() => {
    if (hotProductsLoading && !hotEndReached) {
      setHotLoadingItems(new Array(8).fill({loading: true}));
      console.log('now loading');
    } else {
      setHotLoadingItems([]);
      console.log('not loading');
    }
  }, [hotProductsLoading]);

  useEffect(() => {
    if (publicOffersLoading && !publicOffersEndReached) {
      setLoadingPublicOffersItems(
        new Array(4).fill({publicOffersLoading: true}),
      );
      console.log('now loading');
    } else {
      setLoadingPublicOffersItems([]);
      console.log('not loading public offers');
    }
  }, [publicOffersLoading]);

  useEffect(() => {
    fetchHomeScreenPublicOffers();
  }, [publicOffersPage]);

  const fetchForYouProducts = useCallback(() => {
    setForYouLoading(true);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: forYouPage,
      userId: userData?._id,
    };
    console.log('user onboarding', userData?.onboardingData);

    dispatch(
      getForYouProducts(
        reqData,
        (res: any) => {
          setForYouProducts([...forYouProducts, ...res.forYou]);
          setForYouEndReached(res.endReached);
          setForYouLoading(false);
        },
        (err: any) => {
          console.log(err);
          setForYouLoading(false);
        },
      ),
    );
  }, [forYouPage, isLogedIn, userData?.onboardingData]);

  const fetchHotProducts = useCallback(() => {
    setHotProductsLoading(true);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: hotPage,
    };
    console.log('CALLING!!!');
    dispatch(
      getHotProducts(
        reqData,
        (res: any) => {
          console.log('REZ', res.hotProducts);
          setHotProducts([...hotProducts, ...res.hotProducts]);
          setHotEndReached(res.endReached);
          setHotProductsLoading(false);
        },
        (err: any) => {
          console.log(err);
          setHotProductsLoading(false);
        },
      ),
    );
  }, [hotPage]);

  const fetchHomeScreenProducts = useCallback(() => {
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
  }, [page]);

  const fetchHomeScreenPublicOffers = useCallback(() => {
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
            setPublicOffers([...publicOffers, ...res.publicOffers]);
            setPublicOffersEndReached(res.endReached);
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
            setPublicOffers([...publicOffers, ...res.publicOffers]);
            setPublicOffersEndReached(res.endReached);
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
    if (page !== 0) {
      setPage(0);
    }
    if (publicOffersPage !== 0) {
      setPublicOffersPage(0);
    }
    setPublicOffers([]);
    setProducts([]);
    setPublicOffersEndReached(false);
    setEndReached(false);
    fetchHomeScreenPublicOffers();
    fetchHomeScreenProducts();
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

  const hotOnEndReached = () => {
    if (!hotProductsLoading && !hotEndReached) {
      setHotPage(prevPage => prevPage + 1);
    }
  };

  const forYouOnEndReached = () => {
    if (!forYouLoading && !forYouEndReached) {
      setForYouPage(prevPage => prevPage + 1);
    }
  };

  const onPublicOfferEndReached = () => {
    console.log('next', publicOffersLoading, publicOffersEndReached);
    if (!publicOffersLoading && !publicOffersEndReached) {
      console.log('setting next');
      setPublicOffersPage(prevPage => prevPage + 1);
    }
  };

  const renderPublicOfferItem = ({item, index}: any) => {
    if (item.publicOffersLoading) {
      return (
        <LoadingPublicOfferCell
          key={`publicOffersLoading-${index}`}
          isFromHome={true}
        />
      );
    }
    return (
      <PublicOfferCell
        key={index}
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
        <LoadingProductCard key={`loading-${index}`} isHorizontalView={true} />
      );
    }
    return (
      <LSProductCard
        item={item}
        isHorizontalView={true}
        key={`${item._id}${index}`}
      />
    );
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
                : navigation?.navigate('CreateAccountScreen')
            }
          />
        </SectionTopContainer>

        <PublicOffersFlatList
          data={[...publicOffers, ...loadingPublicOffersItems]}
          renderItem={renderPublicOfferItem}
          horizontal={true}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : `publicOffersLoading-${index}`
          }
          onEndReached={() => onPublicOfferEndReached()}
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

  const renderAllProductsSection = () => {
    return (
      <>
        <SectionContainer>
          <SectionTopContainer>
            <SectionTitleText>Recently Added</SectionTitleText>
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
      </>
    );
  };

  const renderForYouSection = () => {
    // TODO for you all listings
    return (
      <>
        <SectionContainer>
          <SectionTopContainer>
            <SectionTitleText>For You</SectionTitleText>
            <LSButton
              title={'View All'}
              size={Size.ViewSmall}
              type={Type.View}
              radius={20}
              onPress={() =>
                navigation?.navigate('AllListingsScreen', {
                  hotItems: true,
                  type: 'For You',
                })
              }
            />
          </SectionTopContainer>
        </SectionContainer>

        <FlatList
          data={[...forYouProducts, ...forYouLoadingItems]}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() + index + 'foru' : `loading-${index}`
          }
          onEndReached={() => forYouOnEndReached()}
          horizontal={true}
          onEndReachedThreshold={0.5}
        />
      </>

    );
  };

  const renderHotProductsSection = () => {
    return (
      <>
        <SectionContainer>
          <SectionTopContainer>
            <SectionTitleText>Popular Listings</SectionTitleText>
            <LSButton
              title={'View All'}
              size={Size.ViewSmall}
              type={Type.View}
              radius={20}
              onPress={() =>
                navigation?.navigate('AllListingsScreen', {
                  hotItems: true,
                  type: 'All Listings',
                })
              }
            />
          </SectionTopContainer>
        </SectionContainer>

        <FlatList
          data={[...hotProducts, ...hotLoadingItems]} // TODO: loading items
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() + index + 'hot' : `loading-${index}`
          }
          onEndReached={() => hotOnEndReached()}
          horizontal={true}
          onEndReachedThreshold={0.5}
        />
      </>
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
        {isLogedIn && itemsViewed > 1 && <RecentlyViewed />}
        {isLogedIn && renderForYouSection()}
        {!isLogedIn && renderHotProductsSection()}
        {isLogedIn && userData?.onboardingData?.shoeSizes?.length > 0 && (
          <OnboardingProducts />
        )}
        {renderAllProductsSection()}
        {/*renderPublicOffers()*/}
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
