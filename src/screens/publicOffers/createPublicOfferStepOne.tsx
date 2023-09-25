import React, {FC, useRef, useState, useCallback, useEffect} from 'react';
import {StepContainer} from './styles';
import LSInput from '../../components/commonComponents/LSInput';
import {SEARCH_INPUT_ICON} from 'localsvgimages';
import {Animated, Dimensions} from 'react-native';
import {StockxSearchResults} from '../../components/loot/stockxSearchResults';
import {useSelector, useDispatch} from 'react-redux';
import {searchStockx} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';

interface StepOneProps {
  publicOffersData: any;
  setPublicOffersData: Function;
}

export const CreatePublicOfferStepOne: FC<StepOneProps> = props => {
  const {publicOffersData, setPublicOffersData} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [stockxLoading, setStockxLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const animation = useRef(new Animated.Value(0)).current;
  const drawerWidth = Dimensions.get('window').width * 0.5;
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
    console.log('collaping');
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
          onSelectResult={() => {}}
        />
      </Animated.View>
    </StepContainer>
  );
};

export default CreatePublicOfferStepOne;
