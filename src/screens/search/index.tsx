/***
LootSwap - SEARCH SCREEN
***/

import React, {FC, useState, useRef, useEffect} from 'react';
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
  StockxFlatList,
  FullDivider,
  ClearFiltersButtonContainer,
} from './styles';
import {FlatList} from '../home/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LSHomeScreenSearch from '../../components/filterSearch/homeScreenSearch';
import LSProductCard from '../../components/productCard';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import {EMPTY_SEARCH_ICON, LEFT_BLACK_ARROW} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {
  searchProductsReset,
  saveSearchRequest,
  getRecommendedSearch,
  getAvaliableSizesRequest,
  clearFiltersRequest,
} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {SearchProps} from '../../redux/modules/search/reducer';
import {FlatList as DefaultFlatList} from 'react-native';
import {SwiperComponent} from '../loot/styles';
import useDebounce from '../../utility/customHooks/useDebouncer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import StockxProductCard from '../../components/search/stockxProductCard';
import {handleSubmitFilters} from '../../utility/filtersUtility';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

export const SearchScreen: FC<any> = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const search: SearchProps = useSelector(state => state.search);
  const {loading, searchProducts} = search;
  const filters: SearchProps = useSelector(state => state.search);
  const {stockxProducts, filtersSet} = filters;

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [recommendedResults, setRecommendedResults] = useState([]);

  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const debouncedSearchTerm = useDebounce(query, 200);
  useEffect(() => {
    if (!searchProducts.length && debouncedSearchTerm.length > 3) {
      handleGetRecommendedSerach();
    }
    dispatch(getAvaliableSizesRequest());
  }, [debouncedSearchTerm, searchProducts.length]);

  const handleNavigateToFilters = () => {
    swiperRef?.current?.scrollTo(2);
    navigation?.navigate('FiltersScreen', {
      query: query,
    });
  };

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

  const handleGetRecommendedSerach = () => {
    const reqData = {query: query};
    dispatch(
      getRecommendedSearch(
        reqData,
        res => {
          setRecommendedResults(res);
        },
        err => {
          console.log('ERROR => ', err);
        },
      ),
    );
  };

  const onSubmitSearch = (recentSearch: string = '') => {
    let searchQuery;
    if (recentSearch) {
      searchQuery = recentSearch;
    } else {
      searchQuery = query;
    }
    if (!searchQuery) {
      return;
    }

    if (isLogedIn) {
      handleSaveSearch(searchQuery);
    }
    swiperRef?.current?.scrollTo(currPage + 1);
    handleSubmitFilters(dispatch, null, filters, searchQuery);
  };

  const goBack = () => {
    dispatch(searchProductsReset());
    if (currPage === 0) {
      navigation?.navigate('HomeScreen');
    } else {
      swiperRef?.current?.scrollTo(currPage - 1);
    }
  };

  const goBackToSearch = () => {
    dispatch(searchProductsReset());
    swiperRef?.current?.scrollTo(0);
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

  const handleClearFilters = () => {
    dispatch(clearFiltersRequest());
    handleSubmitFilters(dispatch, null, {}, query);
  };

  const handleStockxNavigation = (stockxProduct: any) => {
    navigation?.navigate('StockxScreen', {
      stockxProduct: stockxProduct,
    });
  };

  const renderStockxSearchResult = ({item}: any) => {
    const stockxProduct = item._doc;
    const productCount = item.productCount;

    return (
      <>
        <StockxProductCard
          stockxProduct={stockxProduct}
          productCount={productCount}
          handleStockxNavigation={handleStockxNavigation}
        />
      </>
    );
  };

  const renderRecentSearch = ({item}: any) => {
    return (
      <RecentSearchesText onPress={() => handlePressRecentSearch(item)}>
        {item}
      </RecentSearchesText>
    );
  };

  const renderRecentSearches = () => {
    if (recommendedResults.length) {
      return renderRecommendedSearch()
    }
    if (
      !isLogedIn ||
      (isLogedIn && !userData?.recentSearches?.length)
    ) {
      return (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON}/>
          <EmptySearchText>{`Search for your\nnew loot`}</EmptySearchText>
        </EmptySearchContainer>
      );
    }
    if (isLogedIn && userData?.recentSearches?.length) {
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

  const renderRecommendedSearch = () => {
    return (
      <RecentSearchesContainer>
        <RecentSearchesTextContainer>
          <DefaultFlatList
            data={recommendedResults}
            renderItem={renderRecentSearch}
            keyExtractor={item => item}
          />
        </RecentSearchesTextContainer>
      </RecentSearchesContainer>
    );
  };

  const renderStockxResults = () => (
    <>
      <StockxFlatList
        data={stockxProducts}
        renderItem={renderStockxSearchResult}
      />
      <FullDivider />
    </>
  );

  const renderSearchResults = () => {
    return (
      <>
        <FlatList
          data={loading ? [1, 2, 3, 4, 5, 6] : search.searchProducts}
          renderItem={renderItem}
          keyExtractor={item => (loading ? item : item._id)}
          ListHeaderComponent={renderStockxResults()}
          //onEndReached={() => onEndReached()}
        />
        {filtersSet && (
        <ClearFiltersButtonContainer>
          <LSButton
            title={'Clear Filters'}
            size={Size.Medium}
            type={Type.Grey}
            onPress={() => handleClearFilters()}
          />
        </ClearFiltersButtonContainer>
        )}
      </>
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
        <GoBackTouchable onPress={() => goBack()}>
          <SvgXml xml={LEFT_BLACK_ARROW} />
        </GoBackTouchable>
        <SearchInputContainer>
          <LSHomeScreenSearch
            query={query}
            setQuery={setQuery}
            onSubmitSearch={onSubmitSearch}
            goBackToSearch={goBackToSearch}
            navigateToFilters={handleNavigateToFilters}
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
