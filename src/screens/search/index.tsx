/***
LootSwap - SEARCH SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
import {
  Container,
  SearchContainer,
  EmptySearchContainer,
  EmptySearchText,
} from './styles';
import {FlatList} from '../home/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import {EMPTY_SEARCH_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {searchProducts} from '../../redux/modules';
import {useDispatch} from 'react-redux';
import {RefreshControl} from 'react-native';

export const SearchScreen: FC<any> = ({route}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    getRecentSearches();
  }, []);

  const onSubmitSearch = () => {
    const reqData = {query};
    dispatch(
      searchProducts(
        reqData,
        (res: any) => {
          res.forEach(product => {
            console.log(product.confidenceScore);
            console.log(product.name);
          });
          setProducts(res);
        },
        (err: any) => {
          //TODO: error handling
          console.log('ERR =>', err);
        },
      ),
    );
  };

  const storeSearchResult = async (search: string) => {
    let existingRecentSearches = await AsyncStorage.getItem('recent_searches');
    let searchesArray = existingRecentSearches
      ? JSON.parse(existingRecentSearches)
      : [];
    searchesArray.unshift(search);
    await AsyncStorage.setItem(
      'recent_searches',
      JSON.stringify(searchesArray),
    );
  };

  const getRecentSearches = async () => {
    let existingRecentSearches = await AsyncStorage.getItem('recent_searches');
    if (existingRecentSearches) {
      setRecentSearches(JSON.parse(existingRecentSearches));
    }
  };

  const renderItem = ({item}: any) => {
    return <LSProductCard item={item} />;
  };

  return (
    <Container paddingTop={paddingTop}>
      <SearchContainer>
        <LSHomeScreenSearch
          query={query}
          setQuery={setQuery}
          onSubmitSearch={onSubmitSearch}
        />
      </SearchContainer>
      {products.length === 0 && (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      )}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        //onEndReached={() => onEndReached()}
      />
    </Container>
  );
};

export default SearchScreen;
