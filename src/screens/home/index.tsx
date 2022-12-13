/***
  LootSwap - FIRST TAB HOME SCREEN
 ***/

import React, {FC, useState} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import {Container, SubContainer, FlatList} from './styles';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, useInfiniteHits} from 'react-instantsearch-hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSSearch from '../../components/filterSearch';
import {AlgoliaAppId, AlgoliaApiKey, ALGOLIA_INDEX_NAME} from '@env';
import LSProductCard from '../../components/productCard';
import HomeFiltersScreen from './homeFilters';

const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);

  const onProductPress = (product: any) => {
    navigation.navigate('ProductDetailsScreen', {
      productData: product,
    });
  };

  const renderItem = ({item}) => {
    return <LSProductCard item={item} onPress={() => onProductPress(item)} />;
  };

  const onRightIconPress = () => {
    onToggleModal();
  };

  const InfiniteHits = ({...props}) => {
    const {hits, isLastPage, showMore} = useInfiniteHits(props);
    const filteredHits = hits.filter(
      hit => hit.isVisible && hit.isVirtuallyVerified,
    );
    return (
      <FlatList
        data={filteredHits}
        renderItem={renderItem}
        keyExtractor={item => item.objectID}
        onEndReached={() => {
          if (isLastPage) {
            showMore();
          }
        }}
      />
    );
  };

  const onToggleModal = () => {
    setModalOpen(isOpen => !isOpen);
  };

  return (
    <Container>
      <InHomeHeader />
      <CarouselComponent />
      <SubContainer>
        <InstantSearch
          indexName={ALGOLIA_INDEX_NAME}
          searchClient={searchClient}>
          <LSSearch onRightIconPress={onRightIconPress} />
          <InfiniteHits />
          <HomeFiltersScreen
            isModalOpen={isModalOpen}
            onToggleModal={onToggleModal}
          />
        </InstantSearch>
      </SubContainer>
    </Container>
  );
};

export default HomeScreen;
