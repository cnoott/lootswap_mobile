/***
LootSwap - ALL LISTINGS SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, FlatList} from './styles';
import {ClearFiltersButtonContainer} from '../search/styles';
import {HOME_FILTER_ICON} from 'localsvgimages';
import {
  getAvaliableSizesRequest,
  getHomeScreenProducts,
  clearFiltersRequest,
} from '../../redux/modules';
import {handleSubmitFilters} from '../../utility/filtersUtility';
import {useDispatch, useSelector} from 'react-redux';
import {SearchProps} from '../../redux/modules/search/reducer';
import LSProductCard from '../../components/productCard';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

const ITEMS_PER_PAGE = 8;

export const AllListingsScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const {hotItems = false} = route?.params ?? false;

  const [page, setPage] = useState(0);

  const search: SearchProps = useSelector(state => state.search);
  const {loading, searchProducts, endReached} = search;
  const [loadingItems, setLoadingItems] = useState([]);
  const filters: SearchProps = useSelector(state => state.search);
  const {filtersSet} = filters;

  useEffect(() => {
    handleSubmitFilters(
      dispatch,
      null,
      {...filters, page, itemsPerPage: ITEMS_PER_PAGE, hotItems},
      '',
    );
    console.log('calling submit filters', JSON.stringify(filters).length);
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(clearFiltersRequest());
    dispatch(getAvaliableSizesRequest());
    console.log('calling get sizes');
  }, [dispatch]);

  useEffect(() => {
    if (!searchProducts.length) {
      setPage(0);
    }
  }, [searchProducts]);

  useEffect(() => {
    if (loading && !endReached) {
      setLoadingItems(new Array(8).fill({loading: true}));
      console.log('now loading');
    } else {
      setLoadingItems([]);
      console.log('not loading');
    }
  }, [loading]);

  const handleClearFilters = () => {
    dispatch(clearFiltersRequest());
    setPage(0);
    handleSubmitFilters(
      dispatch,
      null,
      {page: 0, itemsPerPage: ITEMS_PER_PAGE},
      '',
    );
    console.log('clearing filters');
  };

  const renderItem = ({item, index}: any) => {
    if (item.loading) {
      return <LoadingProductCard key={`loading-${index}`} />;
    }
    return (
      <LSProductCard item={item} isHorizontalView={false} key={item._id} />
    );
  };

  const onEndReached = () => {
    if ((!loading || !filtersSet) && !endReached) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container>
      <InStackHeader
        title={'All Listings'}
        rightIcon={HOME_FILTER_ICON}
        onlyTitleCenterAlign={true}
        right={true}
        showRightText={true}
        onRightIconPress={() =>
          navigation?.navigate('FiltersScreen', {query: ''})
        }
      />
      <FlatList
        data={[...searchProducts, ...loadingItems]}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : `loading-${index}`
        }
        numColumns={2}
        onEndReached={() => onEndReached()}
        onEndReachedThreshold={0.3}
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
    </Container>
  );
};

export default AllListingsScreen;
