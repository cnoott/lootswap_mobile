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
import LoadingProductCard from '../../components/productCard/loadingProductCard';
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
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    getRecentSearches();
  }, []);

  const onSubmitSearch = () => {
    const reqData = {query};
    setLoading(true);
    dispatch(
      searchProducts(
        reqData,
        (res: any) => {
          res.forEach(product => {
            console.log(product.confidenceScore);
            console.log(product.name);
          });
          setLoading(false);
          setProducts(res);
        },
        (err: any) => {
          //TODO: error handling
          setLoading(false);
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
    if (loading) {
      return <LoadingProductCard key={item} />
    }
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
      {products.length === 0 && !loading && (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      )}
      <FlatList
        data={loading ? [1, 2, 3, 4, 5, 6] : products}
        renderItem={renderItem}
        keyExtractor={item => (loading ? item : item._id)}
        //onEndReached={() => onEndReached()}
      />
    </Container>
  );
};

export default SearchScreen;
