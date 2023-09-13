/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useState, useEffect} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import {Container, FlatList, SearchContainer} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import HomeFiltersScreen from './homeFilters';
import {scale} from 'react-native-size-matters';
import {RefreshControl} from 'react-native';
import {LIKE_HEART_ICON} from 'localsvgimages';
import useFCMNotifications from '../../utility/customHooks/useFCMNotifications';
import {useScrollToTop} from '@react-navigation/native';
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../redux/modules/loading/actions';
import {getHomeScreenProducts, getMyDetailsNoLoadRequest} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AuthProps} from '../../redux/modules/auth/reducer';


const ITEMS_PER_PAGE = 8;

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
  const [page, setPage] = useState(0);
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

  const goToLikedProducts = (productsList: any) => {
    navigation.navigate('LikedProductScreen', {
      productsList: productsList,
    });
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const onEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
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

  return (
    <Container>
      <InHomeHeader
        isHome={true}
        rightIcon={LIKE_HEART_ICON}
        centerAligned={false}
        onRightItemPress={() => goToLikedProducts()}
      />
      <SearchContainer>
        <LSHomeScreenSearch onRightIconPress={onRightIconPress} isFromHome={true}/>
      </SearchContainer>
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
            <CarouselComponent height={scale(320)} isHome={true} />
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
