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
import {useScrollToTop} from '@react-navigation/native';
import {loggingService} from '../../services/loggingService';

const ITEMS_PER_PAGE = 16;

export const SearchScreen: FC<any> = props => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const search: SearchProps = useSelector(state => state.search);
  const {loading, searchProducts, endReached} = search;
  const filters: SearchProps = useSelector(state => state.search);
  const {stockxProducts, filtersSet} = filters;

  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [triggerSearch, setTriggerSerach] = useState(false); // we use this to trigger a serach if the query stays the same
  const [recommendedResults, setRecommendedResults] = useState([]);

  const [page, setPage] = useState(0);
  const [loadingItems, setLoadingItems] = useState([]);

  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const debouncedSearchTerm = useDebounce(queryInput, 200);
  useEffect(() => {
    if (debouncedSearchTerm.length > 3) {
      handleGetRecommendedSerach();
    }
    dispatch(getAvaliableSizesRequest());
  }, [debouncedSearchTerm]);

  //TODO: end reached
  useEffect(() => {
    if (loading && !endReached) {
      setLoadingItems(new Array(8).fill({loading: true}));
      console.log('now loading');
    } else {
      setLoadingItems([]);
      console.log('not loading');
    }
  }, [loading]);

  useEffect(() => {
    console.log('query here');
    if (query) {
      onSubmitSearch(query);
    }
  }, [query, triggerSearch]);

  const handleNavigateToFilters = () => {
    swiperRef?.current?.scrollTo(2);
    loggingService().logEvent('start_filter');
    navigation?.navigate('FiltersScreen', {
      query: query,
    });
  };

  // TODO: make this apart of the search api call
  // instead of a seperate call to save the recent searches
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
    const reqData = {query: queryInput};
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

  const onSubmitQuery = () => {
    setTriggerSerach(!triggerSearch);
    setQuery(queryInput);
  };

  const onSubmitSearch = (searchQuery: string) => {
    setPage(0);
    if (isLogedIn) {
      handleSaveSearch(searchQuery);
    }
    swiperRef?.current?.scrollTo(currPage + 1);

    let searchData = {
      ...filters,
      page: 0,
      itemsPerPage: ITEMS_PER_PAGE,
    };

    if (isLogedIn) {
      searchData = {
        ...searchData,
        userId: userData?._id,
      };
    }
    handleSubmitFilters(dispatch, null, searchData, searchQuery);
    loggingService().logEvent('search', {
      search_term: searchQuery,
    });
  };

  const goBack = () => {
    dispatch(searchProductsReset());
    if (currPage === 0) {
      navigation?.navigate('HomeScreen');
    } else {
      swiperRef?.current?.scrollTo(currPage - 1);
      setRecommendedResults([]);
    }
  };

  const goBackToSearch = () => {
    dispatch(searchProductsReset());
    swiperRef?.current?.scrollTo(0);
  };

  const renderItem = ({item, index}: any) => {
    if (item.loading) {
      return <LoadingProductCard key={`loading-${index}`} />;
    }
    return (
      <LSProductCard item={item} isHorizontalView={false} key={item._id} />
    );
  };

  const handlePressRecentSearch = (recentSearch: string) => {
    setQueryInput(recentSearch);
    setQuery(recentSearch);
    setTriggerSerach(!triggerSearch);
  };

  const handleClearFilters = () => {
    dispatch(clearFiltersRequest());
    setPage(0);
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
      return renderRecommendedSearch();
    }
    if (!isLogedIn || (isLogedIn && !userData?.recentSearches?.length)) {
      return (
        <EmptySearchContainer>
          <SvgXml xml={EMPTY_SEARCH_ICON} />
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
              keyExtractor={(item, index) => `${item}+${index}`}
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
            keyExtractor={(item, index) => `${item}${index}`}
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

  const handleSearchEndReached = () => {
    if (loading || endReached) {
      return;
    }
    const searchData = {
      ...filters,
      page: page + 1,
      itemsPerPage: ITEMS_PER_PAGE,
    };
    setPage(prevPage => prevPage + 1);
    handleSubmitFilters(dispatch, null, searchData, query);
  };

  const renderSearchResults = () => {
    return (
      <>
        <FlatList
          ref={scrollRef}
          data={[...search.searchProducts, ...loadingItems]}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item._id ? item._id.toString() : `loading-${index}`
          }
          //ListHeaderComponent={renderStockxResults()} // disabled until we have more items
          numColumns={2}
          onEndReached={() => handleSearchEndReached()}
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
            query={queryInput}
            setQuery={setQueryInput}
            onSubmitSearch={onSubmitQuery}
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
