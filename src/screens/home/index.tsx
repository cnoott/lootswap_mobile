/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
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
import {LIKE_HEART_ICON} from 'localsvgimages';
import useFCMNotifications from '../../utility/customHooks/useFCMNotifications';

const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeScreen: FC<{}> = () => {
  useFCMNotifications();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // For Loader handling
    /*
    dispatch(LoadingRequest());
    setTimeout(() => {
      dispatch(LoadingSuccess());
    }, 2500);
    */
  }, []);

  const onProductPress = (product: any) => {
    navigation.navigate('ProductDetailsScreen', {
      productData: product,
    });
  };

  const goToLikedProducts = (productsList: any) => {
    navigation.navigate('LikedProductScreen', {
      productsList: productsList,
    });
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const onEndReached = (isLastPage: boolean, showMore: Function = () => {}) => {
    if (isLastPage) {
      showMore();
    }
  };

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return <CarouselComponent height={scale(400)} isHome={true} />;
    }
    //console.log('item', item);
    return <LSProductCard item={item} onPress={() => onProductPress(item)} />;
  };
  /* TODO: Commenting out for development purposes
  const transformItems = items => {
    return items.filter(item => item.isVisible && item.isVirtuallyVerified);
  };
  */

  const InfiniteHits = ({...props}) => {
    const {hits, isLastPage, showMore} = useInfiniteHits({
      ...props,
    });
    return (
      <>
        <InHomeHeader
          isHome={true}
          rightIcon={LIKE_HEART_ICON}
          centerAligned={false}
          onRightItemPress={() => goToLikedProducts(hits)}
        />
        <FlatList
          data={hits}
          renderItem={renderItem}
          keyExtractor={item => item.objectID}
          onEndReached={() => onEndReached(isLastPage, showMore)}
          ListHeaderComponent={
            <SearchContainer>
              <LSHomeScreenSearch onRightIconPress={onRightIconPress} />
            </SearchContainer>
          }
          stickyHeaderIndices={[0]}
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
