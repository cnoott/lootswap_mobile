/***
  LootSwap - FIRST TAB SCREEN
 ***/

import React, {FC, useState} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import CarouselComponent from '../../components/Carousel';
import LSInput from '../../components/commonComponents/LSInput';
import {
  Container,
  SubContainer,
  FlatList,
  ItemContainer,
  Image,
  FreeShipingContainer,
  ShippingText,
  CellBottomView,
  BottomHeaderView,
  HeaderTextMain,
  EmptyRowView,
  HeaderDes,
} from './styles';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  useSearchBox,
  useInfiniteHits,
} from 'react-instantsearch-hooks';
import {filter} from 'lodash';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const appId = 'O616IHS8SQ';
const apiKey = '1a61d9059fcc3f918576c7aa95279846';
const ALGOLIA_INDEX_NAME = 'dev_lootswap';
const searchClient = algoliasearch(appId, apiKey);

import {SEARCH_INPUT_ICON, HOME_FILTER_ICON} from 'localsvgimages';

export const HomeScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [searchText, setSearchText] = useState('');
  const renderItem = ({item}) => {
    return (
      <ItemContainer
        onPress={() => navigation.navigate('ProductDetailsScreen')}>
        <Image source={{uri: item.primary_photo}} />
        <CellBottomView>
          <BottomHeaderView>
            <EmptyRowView>
              <HeaderTextMain>{item.brand}</HeaderTextMain>
            </EmptyRowView>
            <HeaderTextMain>${item.price}</HeaderTextMain>
          </BottomHeaderView>
          <HeaderDes>{item.name}</HeaderDes>
          <EmptyRowView>
            <HeaderTextMain>Size {item.size}</HeaderTextMain>
          </EmptyRowView>
        </CellBottomView>

        {item.who_pays === 'seller-pays' && (
          <FreeShipingContainer>
            <ShippingText>Free Shipping</ShippingText>
          </FreeShipingContainer>
        )}
      </ItemContainer>
    );
  };

  const InfiniteHits = ({...props}) => {
    const {hits, isLastPage, showMore} = useInfiniteHits(props);
    const filteredHits = hits.filter(
      hit => hit.isVisible && hit.isVirtuallyVerified,
    );
    console.log(filteredHits);

    return (
      <>
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
      </>
    );
  };

  const renderSearch = () => {
    return (
      <LSInput
        onChangeText={setSearchText}
        value={searchText}
        placeholder={'Search'}
        leftIcon={SEARCH_INPUT_ICON}
        homeSearch={true}
        rightIcon={HOME_FILTER_ICON}
        onRightIconPress={() => navigation.navigate('HomeFiltersScreen')}
      />
    );
  };
  return (
    <Container>
      <InHomeHeader />
      <CarouselComponent />
      <SubContainer>
        {renderSearch()}
        <InstantSearch
          indexName={ALGOLIA_INDEX_NAME}
          searchClient={searchClient}>
          <InfiniteHits />
        </InstantSearch>
      </SubContainer>
    </Container>
  );
};

export default HomeScreen;
