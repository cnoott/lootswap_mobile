/***
LootSwap - SEARCH SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
import {
  Container,
  SearchContainer,
  EmptySearchContainer,
  EmptySearchText,
  RecentSearchesTitle,
  RecentSearchesContainer
} from './styles';
import {FlatList} from '../home/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import {EMPTY_SEARCH_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {searchProducts, saveSearchRequest} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {AuthProps} from '../../redux/modules/auth/reducer';

export const SearchScreen: FC<any> = ({route}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData: {recentSearches}, userData, isLogedIn} = auth;

//  useEffect(() => {
//  }, []);

  const handleSaveSearch = () => {
    let newRecentSearches = recentSearches;
    if (newRecentSearches.includes(query)) {
      const index = newRecentSearches.indexOf(query);
      newRecentSearches.splice(index, 1);
      newRecentSearches.unshift(query);
    } else {
      newRecentSearches.unshift(query);
    }
    const reqData = {
      userId: userData?._id,
      userData: {recentSearches: newRecentSearches},
    };
    dispatch(saveSearchRequest(reqData));
  };

  const onSubmitSearch = () => {
    if (!query) {
      return;
    }
    const reqData = {query};
    setLoading(true);
    console.log(recentSearches);

    if (isLogedIn) {
      handleSaveSearch();
    }

    dispatch(
      searchProducts(
        reqData,
        (res: any) => {
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

  const renderItem = ({item}: any) => {
    if (loading) {
      return <LoadingProductCard key={item} />
    }
    return <LSProductCard item={item} />;
  };

  const renderEmptySearch = () => {
    if (products.length) {
      return;
    }
    if (isLogedIn && !products.length && !recentSearches.length) {
      return (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      );
    }
    if (isLogedIn && recentSearches.length) {
      return (
        <RecentSearchesContainer>
          <RecentSearchesTitle>Recent Searches</RecentSearchesTitle>
        </RecentSearchesContainer>
      );
    }
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
      {renderEmptySearch()}
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
