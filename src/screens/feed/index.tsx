/***
  LootSwap - FIRST TAB FEED SCREEN (HOME)
 ***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHomeScreenProducts} from '../../redux/modules';
import {ScrollView} from 'react-native';
import ProductFeedView from '../../components/feed/ProductFeedView';
import {FlatList} from './styles';

const ITEMS_PER_PAGE = 4;

export const FeedScreen: FC<{}> = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  const fetchHomeScreenProducts = useCallback(() => {
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: 0,
    };
    dispatch(
      getHomeScreenProducts(
        reqData,
        (res: any) => {
          setProducts([...products, ...res.products]);
        },
        (err: any) => {
          console.log(err);
        },
      ),
    );
  }, []);


  useEffect(() => {
    fetchHomeScreenProducts()
  }, []);

  const renderItem = ({item, index}: any) => {
    return <ProductFeedView product={item} key={index} />;
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
    />
  );
};



export default FeedScreen;
