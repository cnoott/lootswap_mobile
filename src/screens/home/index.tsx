/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useState} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import {Container, FlatList, SearchContainer} from './styles';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, useInfiniteHits} from 'react-instantsearch-hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import {AlgoliaAppId, AlgoliaApiKey, ALGOLIA_INDEX_NAME} from '@env';
import LSProductCard from '../../components/productCard';
import HomeFiltersScreen from './homeFilters';
import {scale} from 'react-native-size-matters';
import {RefreshControl} from 'react-native';
import {LIKE_HEART_ICON} from 'localsvgimages';
import useFCMNotifications from '../../utility/customHooks/useFCMNotifications';
import {useScrollToTop} from '@react-navigation/native';
import {LoadingRequest, LoadingSuccess} from '../../redux/modules/loading/actions';
import {useDispatch} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';


const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeScreen: FC<{}> = () => {
  useFCMNotifications();
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  const handleRefresh = async () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(LoadingRequest());
    searchClient.clearCache();
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 100)); // simulate async call
    setRefreshing(false);
    dispatch(LoadingSuccess());
  };

  const goToLikedProducts = (productsList: any) => {
    navigation.navigate('LikedProductScreen', {
      productsList: productsList,
    });
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const onEndReached = (showMore: Function = () => {}) => {
    showMore();
  };

  const renderItem = ({item}: any) => {
    return <LSProductCard item={item} />;
  };

  const transformItems = (items: any) => {
    return items.filter(item => item?.isVisible && item?.isVirtuallyVerified);
  };

  const InfiniteHits = ({...props}) => {
    const {hits, showMore} = useInfiniteHits({
      ...props,
      transformItems: transformItems,
    });
    return (
      <>
        <InHomeHeader
          isHome={true}
          rightIcon={LIKE_HEART_ICON}
          centerAligned={false}
          onRightItemPress={() => goToLikedProducts(hits)}
        />
        <SearchContainer>
          <LSHomeScreenSearch onRightIconPress={onRightIconPress} />
        </SearchContainer>
        <FlatList
          ref={scrollRef}
          data={hits}
          renderItem={renderItem}
          keyExtractor={item => item.objectID}
          onEndReached={() => onEndReached(showMore)}
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
      </>
    );
  };

  const onToggleModal = () => {
    setModalOpen(isOpen => !isOpen);
  };

  return (
    <Container>
      <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <InfiniteHits />
        {
          <HomeFiltersScreen
            isModalOpen={isModalOpen}
            onToggleModal={onToggleModal}
          />
        }
      </InstantSearch>
    </Container>
  );
};

export default HomeScreen;
