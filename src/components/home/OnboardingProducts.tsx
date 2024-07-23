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
import {getOnboardingProducts} from '../../redux/modules';
import LoadingProductCard from '../../components/productCard/loadingProductCard';
import LSProductCard from '../../components/productCard';
import {AuthProps} from '../../redux/modules/auth/reducer';

const ITEMS_PER_PAGE = 8;

export const OnboardingProducts: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); 
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const [yourSizeProducts, setYourSizeProducts] = useState({
    products: [],
    loading: false,
    loadingItems: [],
    page: 0,
    endReached: false,
  });


  useEffect(() => {
    const reqData = {
      itemsPerPage: ITEMS_PER_PAGE,
      page: yourSizeProducts.page,
      userId: userData?._id,
    };
    setYourSizeProducts({...yourSizeProducts, loading: true});
    dispatch(
      getOnboardingProducts(
        reqData,
        (res: any) => {
          setYourSizeProducts({
            ...yourSizeProducts,
            products: [...yourSizeProducts.products, ...res.yourSizeProducts],
            loading: false,
            endReached: res.endReached,
          });
        },
        (err: any) => {
          console.log('err');
          setYourSizeProducts({...yourSizeProducts, loading: false});
        },
      ),
    );

  }, [yourSizeProducts.page, userData?.onboardingData?.yourSizes]);

  useEffect(() => {
    if (yourSizeProducts.loading && !yourSizeProducts.endReached) {
      setYourSizeProducts({
        ...yourSizeProducts,
        loadingItems: new Array(4).fill({publicOffersLoading: true}),
    });
    } else {
      setYourSizeProducts({
        ...yourSizeProducts,
        loadingItems: [],
    });
    }
  }, [yourSizeProducts.loading]);

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
      console.log('next page');
    if (!yourSizeProducts.loading && !yourSizeProducts.endReached) {
      setYourSizeProducts(prev => {
        return {...yourSizeProducts, page: prev.page + 1};
      });
    }
  };
  // TODO on end reached


  // XXX Repeating code in homescreen
  const yourSizes = () => {
    return (
    <>
      <SectionContainer>
        <SectionTopContainer>
          <SectionTitleText>In Your Size</SectionTitleText>
          <LSButton
            title={'View All'}
            size={Size.ViewSmall}
            type={Type.View}
            radius={20}
            onPress={() =>
              //TODO: Onboarding all listings screen
              navigation?.navigate('AllListingsScreen', {
                hotItems: true,
                type: 'In Your Size',
              })
            }
          />
        </SectionTopContainer>
      </SectionContainer>

      <FlatList
        data={[...yourSizeProducts.products, ...yourSizeProducts.loadingItems]}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() + index + 'onboarding' : `loading-onboarding-${index}`
        }
        onEndReached={() => onEndReached()}
        horizontal={true}
        onEndReachedThreshold={0.5}
      />
    </>

    );
  };

  return (
    <>
      {yourSizeProducts.products.length > 0 && yourSizes()}
    </>
  );
};

export default OnboardingProducts;
