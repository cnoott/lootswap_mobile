/***
  LootSwap - ADD_PRODUCT STEP 1
 ***/

import React, {FC, useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import LSInput from '../../../components/commonComponents/LSInput';
import {categoryList, getSizeList} from '../../../utility/utility';
import {StepOneContainer} from './styles';
import {HomeProps} from '../../../redux/modules/home/reducer';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import {SEARCH_INPUT_ICON} from 'localsvgimages';
import {StockxSearchResults} from '../../../components/loot/stockxSearchResults';
import {searchStockx} from '../../../redux/modules';
import {Animated, Dimensions} from 'react-native';
import useDebounce from '../../../utility/customHooks/useDebouncer';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepOne: FC<ProductStep> = props => {
  const homeData: HomeProps = useSelector(state => state?.home);
  const {addProductData} = homeData;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const drawerWidth = Dimensions.get('window').width * 0.5;
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, drawerWidth]
  });

  const handleDrawerAnimation = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 400,
      useNativeDriver: false
    }).start();
    setIsOpen(!isOpen);
  };

  const [categoryData, setCategoryData] = useState(
    addProductData?.stepOne?.category || null,
  );

  const [productName, setProductName] = useState(
    addProductData?.stepOne?.productName || null,
  );

  const [sizeData, setSizeData] = useState(
    addProductData?.stepOne?.size || null,
  );

  const onSelectResult = (item: any) => {

  };

  const {updateProductData} = props;
  const updateData = (newData: any = {}) => {
    updateProductData({
      ...addProductData,
      stepOne: {
        ...addProductData?.stepOne,
        ...newData,
      },
    });
  };
  const onSetCategoryData = (item: any) => {
    setCategoryData(item);
    updateData({category: item});
  };

  const onSetSizeData = (item: any) => {
    setSizeData(item);
    updateData({size: item});
  };

  const onSetProductName = (item: any) => {
    setProductName(item);
    updateData({productName: item});
  };

  const debouncedSearchTerm = useDebounce(productName, 800); //set delay
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 5) {
      fetchStockxData();
    }
  }, [debouncedSearchTerm]);

  const fetchStockxData = () => {
    if (categoryData?.value !== 'shoes') {
      return;
    }
    console.log('fetching stockx');
    handleDrawerAnimation();
    const reqData = {
      userId: userData?._id,
      query: productName,
    };
    dispatch(
      searchStockx(
        reqData,
        (res: any) => {
          console.log('response', res);
          setSearchResults(res);
          setIsLoading(false);
        },
        (err: any) => {
          console.log('ERROR', err);
        },
      ),
    );
  };

  const renderDropdown = (
    dropdownLabel: string,
    isSearch: boolean,
    dropDowndata: any,
    selectItemFunction: Function,
    selectedValue: any,
  ) => {
    return (
      <LSDropDown
        itemsList={dropDowndata}
        dropdownLabel={dropdownLabel}
        isSearch={isSearch}
        onSelectItem={selectItemFunction}
        selectedValue={selectedValue}
      />
    );
  };
  return (
    <StepOneContainer>
      {renderDropdown(
        'Category',
        false,
        categoryList,
        onSetCategoryData,
        categoryData,
      )}
      <LSInput
        //onBlurCall={() => fetchStockxData()}
        onChangeText={onSetProductName}
        horizontalSpace={'0'}
        value={productName}
        leftIcon={SEARCH_INPUT_ICON}
        placeholder={'Item Name'}
      />
      <Animated.View style={{height, overflow: 'hidden'}}>
        <StockxSearchResults
          searchResults={searchResults}
          loading={loading}
          onSelectResult={onSelectResult}
        />
      </Animated.View>

      {renderDropdown(
        'Size',
        false,
        getSizeList(categoryData ? categoryData?.value : ''),
        onSetSizeData,
        sizeData,
      )}
    </StepOneContainer>
  );
};
export default AddProductStepOne;
