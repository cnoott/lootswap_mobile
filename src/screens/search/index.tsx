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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import {EMPTY_SEARCH_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SearchScreen: FC<any> = ({route}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    getRecentSearches();
  }, []);


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

  return (
    <Container paddingTop={paddingTop}>
      <SearchContainer>
        <LSHomeScreenSearch
          query={query}
          setQuery={setQuery}
        />
      </SearchContainer>
      {recentSearches.length === 0 && (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      )}
    </Container>
  );
};

export default SearchScreen;
