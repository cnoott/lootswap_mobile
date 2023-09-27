import React, {FC, useRef, useState, useCallback, useEffect} from 'react';
import {StepContainer} from './styles';
import LSInput from '../../components/commonComponents/LSInput';
import {SEARCH_INPUT_ICON} from 'localsvgimages';
import {Animated, Dimensions} from 'react-native';
import {StockxSearchResults} from '../../components/loot/stockxSearchResults';
import {useSelector, useDispatch} from 'react-redux';
import {searchStockx} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {refreshStockxData} from '../../redux/modules';

interface StepOneProps {
  publicOffersData: any;
  setPublicOffersData: Function;
  handleNext: Function;
}

export const CreatePublicOfferStepOne: FC<StepOneProps> = props => {
  const {publicOffersData, setPublicOffersData, handleNext} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [stockxLoading, setStockxLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

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
    // TODO handle load
    const alreadyExists = publicOffersData.receivingStockxProducts.some(
      product => product.urlKey === urlKey,
    );
    if (alreadyExists) {
      handleNext();
      return;
    }
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
          handleNext();
        },
        err => {
          console.log('ERR => ', err);
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
        placeholder={'Item Name'}
        returnKeyType={'search'}
        onSubmitEditing={() => fetchStockxData()}
      />
      <Animated.View style={{height, overflow: 'hidden'}}>
        <StockxSearchResults
          selectedUrlKey={''}
          searchResults={searchResults}
          loading={stockxLoading}
          onSelectResult={({title, urlKey}) => handleSelectStockx(title, urlKey)}
        />
      </Animated.View>
    </StepContainer>
  );
};

export default CreatePublicOfferStepOne;
