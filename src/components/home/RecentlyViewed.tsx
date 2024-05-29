import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  SectionContainer,
  SectionTopContainer,
  SectionTitleText,
  FlatList,
} from '../../screens/home/styles'
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getRecentlyViewed} from '../../redux/modules';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import LSProductCard from '../../components/productCard';
import {AuthProps} from '../../redux/modules/auth/reducer';

const ITEMS_PER_PAGE = 8;

export const RecentlyViewed: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); 

  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState([]);
  const [page, setPage] = useState(0);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: page,
      userId: userData?._id,
    };
    setLoading(true);
    dispatch(
      getRecentlyViewed(
        reqData,
        (res: any) => {
          setProducts(res.recentlyViewed);
          setLoading(false);
          setLoadingItems([]);
          setEndReached(res.endReached);
        },
        (err: any) => {
          console.log(err);
          setLoading(false);
          setLoadingItems([]);
        },
      ),
    );
  }, [page]);

  const renderItem = ({item, index}: any) => {
    if (item.loading) {
      return (
        <LoadingProductCard key={`loading-${index}`} isHorizontalView={true} />
      );
    }
    return (
      <LSProductCard
        item={item}
        isHorizontalView={true}
        key={`${item._id}${index}`}
      />
    );
  };

  const onEndReached = () => {
    if (!loading && !endReached) {
      setPage(prevPage => prevPage + 1);
    }
  };


  if (!loading && products.length === 0) {
    return(<></>);
  };

  // XXX Repeating code in homescreen
  return (
    <>
      <SectionContainer>
        <SectionTopContainer>
          <SectionTitleText>Recently Viewed</SectionTitleText>
          <LSButton
            title={'View All'}
            size={Size.ViewSmall}
            type={Type.View}
            radius={20}
            onPress={() =>
              //TODO: Onboarding all listings screen
              navigation?.navigate('AllListingsScreen', {
                hotItems: true,
                type: 'Recently Viewed',
              })
            }
          />
        </SectionTopContainer>
      </SectionContainer>

      <FlatList
        data={[...products, ...loadingItems]}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() + index + 'recent' : `loading-recent-${index}`
        }
        onEndReached={() => onEndReached()}
        horizontal={true}
        onEndReachedThreshold={0.5}
      />
    </>
  );

};

export default RecentlyViewed;
