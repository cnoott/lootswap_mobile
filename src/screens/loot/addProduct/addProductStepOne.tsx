/***
  LootSwap - ADD_PRODUCT STEP 1
 ***/

import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
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
import { setListener } from 'appcenter-crashes';
import ChosenStockxProduct from '../../../components/loot/chosenStockxProduct';

interface ProductStep {
  updateProductData: Function;
  stockxLoading: Boolean;
  setStockxLoading: Function;
}

export const AddProductStepOne: FC<ProductStep> = props => {
  const homeData: HomeProps = useSelector(state => state?.home);
  const {addProductData} = homeData;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const {updateProductData, stockxLoading, setStockxLoading} = props;

  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedStockxItem, setSelectedStockxItem] = useState(null);

  const [alreadySearched, setAlreadySearched] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const drawerWidth = Dimensions.get('window').width * 0.88;
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

  const reOpenDrawer = () => {
    if (searchResults.length !== 0) {
      handleDrawerAnimation();
    }
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

  const updateData = (newData: any = {}) => {
    updateProductData({
      ...addProductData,
      stepOne: {
        ...addProductData?.stepOne,
        ...newData,
      },
    });
  };

  const updateBrand = (stepOneValues: any, brand: any) => {
    updateProductData({
      ...addProductData,
      stepOne: {
        ...addProductData?.stepOne,
        ...stepOneValues,
      },
      stepTwo: {
        ...addProductData?.stepTwo,
        brand: {label: brand, value: brand},
      },
    });
  };

  const onSetCategoryData = (item: any) => {
    setCategoryData(item);
    updateData({category: item});
  };

  const handleDeleteStockxItem = () => {
    setSelectedStockxItem(null);
    reOpenDrawer();
    updateBrand({stockxUrlKey: null}, null);
  };

  const onSetSizeData = (item: any) => {
    setSizeData(item);
    updateData({size: item});
  };


  const onSetProductName = (item: any) => {
    setAlreadySearched(false);
    setProductName(item);
    updateData({productName: item});
  };

  const onSetStockxUrlKey = async (item: any) => {
    setAlreadySearched(true);
    collapseDrawer();
    setSelectedStockxItem(item);
    if (!item.urlKey) {
      return;
    }
    updateBrand(
      {productName: item.title, stockxUrlKey: item.urlKey},
      item.brand,
    );
    setProductName(item.title);
  };

  const fetchStockxData = useCallback(() => {
    setStockxLoading(true);
    handleDrawerAnimation();
    const reqData = {
      userId: userData?._id,
      query: productName,
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
  }, [
    dispatch,
    handleDrawerAnimation,
    productName,
    userData?._id,
    setStockxLoading,
  ]);
  const renderDropdown = (
    dropdownLabel: string,
    isSearch: boolean,
    dropDowndata: any,
    selectItemFunction: Function,
    selectedValue: any,
    onFocus: Function = () => {},
  ) => {
    return (
      <LSDropDown
        itemsList={dropDowndata}
        dropdownLabel={dropdownLabel}
        isSearch={isSearch}
        onSelectItem={selectItemFunction}
        selectedValue={selectedValue}
        onFocus={onFocus}
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
      {!selectedStockxItem && (
        <LSInput
          onChangeText={onSetProductName}
          horizontalSpace={'0'}
          value={productName}
          leftIcon={SEARCH_INPUT_ICON}
          placeholder={'Item Name'}
          onFocus={() => reOpenDrawer()}
          returnKeyType={'search'}
          onSubmitEditing={() => fetchStockxData()}
        />
      )}
      <Animated.View style={{height, overflow: 'hidden'}}>
        <StockxSearchResults
          selectedUrlKey={addProductData?.stepOne?.stockxUrlKey}
          searchResults={searchResults}
          loading={stockxLoading}
          onSelectResult={onSetStockxUrlKey}
          productName={productName}
        />
      </Animated.View>
      {selectedStockxItem && (
        <ChosenStockxProduct
          stockxProduct={selectedStockxItem}
          onDeletePress={handleDeleteStockxItem}
          categoryData={categoryData}
          onSetSizeData={onSetSizeData}
          productName={productName}
          chosenSize={sizeData}
        />
      )}
    </StepOneContainer>
  );
};
export default AddProductStepOne;
