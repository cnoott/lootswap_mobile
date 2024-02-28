import React, {FC, useRef, useState, useCallback} from 'react';
import {StepContainer} from './styles';
import LSInput from '../../components/commonComponents/LSInput';
import {SEARCH_INPUT_ICON} from 'localsvgimages';
import {Animated, Dimensions} from 'react-native';
import {StockxSearchResults} from '../../components/loot/stockxSearchResults';
import {useSelector, useDispatch} from 'react-redux';
import {searchStockx} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {refreshStockxData} from '../../redux/modules';
import {
  LoadingRequest,
  LoadingSuccess,
} from '../../redux/modules/loading/actions'
import {Alert} from 'custom_top_alert';

interface StepOneProps {
  publicOffersData: any;
  setPublicOffersData: Function;
  handleNext: Function;
  setParentResetQuery: Function;
}

export const CreatePublicOfferStepOne: FC<StepOneProps> = props => {
  const {publicOffersData, setPublicOffersData, handleNext} =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const resetQuery = () => setQuery('');
  const [stockxLoading, setStockxLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const animation = useRef(new Animated.Value(0)).current;
  const drawerWidth = Dimensions.get('window').height;
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, drawerWidth]
  });

  const handleDrawerAnimation = useCallback(() => {
    //if (isOpen) return;
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start();
    setIsOpen(!isOpen);
  }, [animation, isOpen]);

  const collapseDrawer = useCallback(() => {
    if (stockxLoading) {
      return;
    }
    //if (isOpen) return;
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start();
    setIsOpen(!isOpen);
  }, [animation, isOpen, stockxLoading]);

  const fetchStockxData = useCallback(() => {
    setStockxLoading(true);
    handleDrawerAnimation();
    const reqData = {
      userId: userData?._id,
      query: query,
    };
    dispatch(
      searchStockx(
        reqData,
        (res: any) => {
          setSearchResults(res);
          setStockxLoading(false);
        },
        (err: any) => {
          console.log('ERROR', err);
          setStockxLoading(false);
        },
      ),
    );
  }, [dispatch, handleDrawerAnimation, query, userData?._id, setStockxLoading]);

  const handleSelectStockx = (name: string, urlKey: string) => {
    if (publicOffersData.receivingStockxProducts.length >= 3) {
      Alert.showError('You cannot add more than 3 items');
      return;
    }
    const alreadyExists = publicOffersData.receivingStockxProducts.some(
      product => product.urlKey === urlKey,
    );
    handleNext();
    setQuery('');
    if (alreadyExists) {
      return;
    }
    dispatch(LoadingRequest());
    const reqData = {
      stockxUrlKey: urlKey,
      name: name,
    };
    dispatch(
      refreshStockxData(
        reqData,
        res => {
          setPublicOffersData({
            ...publicOffersData,
            receivingStockxProducts: [
              res,
              ...publicOffersData.receivingStockxProducts,
            ],
          });
          dispatch(LoadingSuccess());
        },
        err => {
          console.log('ERR => ', err);
          dispatch(LoadingSuccess());
        },
      )
    );
  };

  return (
    <StepContainer>
      <LSInput
        onChangeText={text => setQuery(text)}
        horizontalSpace={'0'}
        value={query}
        leftIcon={SEARCH_INPUT_ICON}
        autoFocus={true}
        placeholder={'Search Item Name'}
        returnKeyType={'search'}
        onSubmitEditing={() => fetchStockxData()}
      />
      <Animated.View style={{height, overflow: 'hidden'}}>
        <StockxSearchResults
          selectedUrlKey={''}
          searchResults={
            stockxLoading ? [1, 2, 3, 4, 5, 6, 7, 8] : searchResults
          }
          loading={stockxLoading}
          onSelectResult={({name, urlKey}) => handleSelectStockx(name, urlKey)}
          showTitle={false}
        />
      </Animated.View>
    </StepContainer>
  );
};

export default CreatePublicOfferStepOne;
