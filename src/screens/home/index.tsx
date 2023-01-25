/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
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
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../redux/modules/loading/actions';

const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // For Loader handling
    dispatch(LoadingRequest());
    setTimeout(() => {
      dispatch(LoadingSuccess());
    }, 2500);
  });

  const onProductPress = (product: any) => {
    navigation.navigate('ProductDetailsScreen', {
      productData: product,
    });
  };

  const onRightIconPress = () => {
    onToggleModal();
    // navigation.navigate('HomeFiltersScreen');
  };

  const onEndReached = (isLastPage: boolean, showMore: Function = () => {}) => {
    if (isLastPage) {
      showMore();
    }
  };

  const renderItem = ({item, index}) => {
    if (index === 0) {
      return <CarouselComponent />;
    }
    return <LSProductCard item={item} onPress={() => onProductPress(item)} />;
  };
  /* Commenting out for development purposes
  const transformItems = items => {
    return items.filter(item => item.isVisible && item.isVirtuallyVerified);
  };
  */

  const InfiniteHits = ({...props}) => {
    const {hits, isLastPage, showMore} = useInfiniteHits({
      ...props,
    });
    return (
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
      />
    );
  };

  const onToggleModal = () => {
    setModalOpen(isOpen => !isOpen);
  };

  return (
    <Container>
      <InHomeHeader />
      <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <InfiniteHits />
        {isModalOpen && (
          <HomeFiltersScreen
            isModalOpen={isModalOpen}
            onToggleModal={onToggleModal}
          />
        )}
      </InstantSearch>
    </Container>
  );
};

export default HomeScreen;
