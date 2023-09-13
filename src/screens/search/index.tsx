/***
LootSwap - SEARCH SCREEN
***/

import React, {FC, useState, useEffect, useRef} from 'react';
import {
  Container,
  SearchContainer,
  EmptySearchContainer,
  EmptySearchText,
  RecentSearchesTitle,
  RecentSearchesText,
  RecentSearchesContainer,
  RecentSearchesTextContainer,
  GoBackTouchable,
  SearchInputContainer,
  ClearRecentSearchesText,
} from './styles';
import {FlatList} from '../home/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import {EMPTY_SEARCH_ICON, LEFT_BLACK_ARROW} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {searchProducts, saveSearchRequest} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {FlatList as DefaultFlatList} from 'react-native';
import {SwiperComponent} from '../loot/styles';

export const SearchScreen: FC<any> = ({route}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

//  useEffect(() => {
//  }, []);

  const handleSaveSearch = (search: string) => {
    let newRecentSearches = userData?.recentSearches;
    if (newRecentSearches.includes(search)) {
      const index = newRecentSearches.indexOf(search);
      newRecentSearches.splice(index, 1);
      newRecentSearches.unshift(search);
    } else {
      newRecentSearches.unshift(search);
    }
    const reqData = {
      userId: userData?._id,
      userData: {recentSearches: newRecentSearches},
    };
    dispatch(saveSearchRequest(reqData));
  };

  const handleClearSearches = () => {
    const reqData = {
      userId: userData?._id,
      userData: {recentSearches: []},
    };
    dispatch(saveSearchRequest(reqData));
  };

  const onSubmitSearch = (recentSearch: string = '') => { 
    let search;
    if (recentSearch) {
      search = recentSearch;
    } else {
      search = query;
    }
    if (!search) {
      return;
    }
    const reqData = {query: search};
    setLoading(true);

    if (isLogedIn) {
      handleSaveSearch(search);
    }
    swiperRef?.current?.scrollTo(currPage + 1);
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

  const goBack = () => {
    swiperRef?.current?.scrollTo(currPage - 1);
  };

  const renderItem = ({item}: any) => {
    if (loading) {
      return <LoadingProductCard key={item} />
    }
    return <LSProductCard item={item} />;
  };

  const handlePressRecentSearch = (recentSearch: string) => {
    setQuery(recentSearch);
    onSubmitSearch(recentSearch);
  };

  const renderRecentSearch = ({item}: any) => {
    return (
      <RecentSearchesText onPress={() => handlePressRecentSearch(item)}>
        {item}
      </RecentSearchesText>
    );
  };

  const renderRecentSearches = () => {
    if (
      !isLogedIn ||
      (isLogedIn && !userData?.recentSearches.length)
    ) {
      return (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      );
    }
    if (isLogedIn && userData?.recentSearches.length) {
      return (
        <RecentSearchesContainer>
          <RecentSearchesTitle>Recent Searches</RecentSearchesTitle>
          <RecentSearchesTextContainer>
            <DefaultFlatList
              data={userData?.recentSearches}
              renderItem={renderRecentSearch}
              keyExtractor={item => item}
              ListFooterComponent={
                <ClearRecentSearchesText onPress={() => handleClearSearches()}>
                  Clear All
                </ClearRecentSearchesText>
              }
            />
          </RecentSearchesTextContainer>
        </RecentSearchesContainer>
      );
    }
  };

  const renderSearchResults = () => {
    return (
      <FlatList
        data={loading ? [1, 2, 3, 4, 5, 6] : products}
        renderItem={renderItem}
        keyExtractor={item => (loading ? item : item._id)}
        //onEndReached={() => onEndReached()}
      />
    );
  };

  const renderSteps = () => {
    return [1, 2].map(data => {
      switch (data) {
        case 1:
          return renderRecentSearches();
        case 2:
          return renderSearchResults();
      }
    });
  };

  return (
    <Container paddingTop={paddingTop}>
      <SearchContainer>
      {currPage === 1 && (
      <GoBackTouchable onPress={() => goBack()}>
        <SvgXml xml={LEFT_BLACK_ARROW} />
      </GoBackTouchable>
      )}
        <SearchInputContainer>
          <LSHomeScreenSearch
            query={query}
            setQuery={setQuery}
            onSubmitSearch={onSubmitSearch}
          />
        </SearchInputContainer>
      </SearchContainer>
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrPage}>
        {renderSteps()}
      </SwiperComponent>
    </Container>
  );
};

export default SearchScreen;
