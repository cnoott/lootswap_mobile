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
import {LIKE_HEART_ICON} from 'localsvgimages';
import useFCMNotifications from '../../utility/customHooks/useFCMNotifications';

const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeScreen: FC<{}> = () => {
  useFCMNotifications();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isModalOpen, setModalOpen] = useState(false);

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
          data={hits}
          renderItem={renderItem}
          keyExtractor={item => item.objectID}
          onEndReached={() => onEndReached(showMore)}
          ListHeaderComponent={
            <>
              <SearchContainer>
                <LSHomeScreenSearch onRightIconPress={onRightIconPress} />
              </SearchContainer>
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
