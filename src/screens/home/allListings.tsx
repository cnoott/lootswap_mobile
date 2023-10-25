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
import {useDispatch, useSelector} from 'react-redux';
import {SearchProps} from '../../redux/modules/search/reducer';
import LSProductCard from '../../components/productCard';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

const ITEMS_PER_PAGE = 8;

export const AllListingsScreen: FC<any> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const search: SearchProps = useSelector(state => state.search);
  const {loading, searchProducts} = search;
  const filters: SearchProps = useSelector(state => state.search);
  const {filtersSet} = filters;

  useEffect(() => {
    dispatch(clearFiltersRequest());
    dispatch(getAvaliableSizesRequest());
    //handleSubmitFilters(dispatch, null, {sortBy: 'Newly listed'}, '');
  }, [dispatch]);


  useEffect(() => {
    setInitialLoad(true);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page,
    };
    dispatch(
      getHomeScreenProducts(
        reqData,
        (res: any) => {
          setProducts([...products, ...res]);
          setInitialLoad(false);
        },
        (err: any) => {
          console.log(err);
          setInitialLoad(false);
        },
      ),
    );

  }, [page]);

  useEffect(() => {
    setProducts(searchProducts);
  }, [searchProducts]);

  const handleClearFilters = () => {
    dispatch(clearFiltersRequest());
    setInitialLoad(true);
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page,
    };
    dispatch(
      getHomeScreenProducts(
        reqData,
        (res: any) => {
          setProducts([...products, ...res]);
          setInitialLoad(false);
        },
        (err: any) => {
          console.log(err);
          setInitialLoad(false);
        },
      ),
    );
  };

  const renderItem = ({item}: any) => {
    if ((loading || initialLoad) && !page) {
      return <LoadingProductCard key={item} />
    }
    return <LSProductCard item={item} isHorizontalView={false} />;
  };

  const onEndReached = () => {
    if (!loading || !filtersSet) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container>
      <InStackHeader
        title={'All Listings'}
        rightIcon={HOME_FILTER_ICON}
        right={true}
        onRightIconPress={() =>
          navigation?.navigate('FiltersScreen', {query: ''})
        }
      />
      <FlatList
        data={
          (loading || initialLoad) && !page
            ? [1, 2, 3, 4, 5, 6]
            : products
        }
        renderItem={renderItem}
        keyExtractor={item => ((loading || initialLoad) ? item : item._id)}
        numColumns={2}
        onEndReached={() => onEndReached()}
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
