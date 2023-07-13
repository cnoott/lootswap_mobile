/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import LSInput from '../../../components/commonComponents/LSInput';
import {
  categoryList,
  brandsList,
  getSizeList,
} from '../../../utility/utility';
import {StepOneContainer} from './styles';
import {HomeProps} from '../../../redux/modules/home/reducer';
import {SEARCH_INPUT_ICON} from 'localsvgimages';
interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepOne: FC<ProductStep> = props => {
  const homeData: HomeProps = useSelector(state => state?.home);
  const {addProductData} = homeData;

  const [categoryData, setCategoryData] = useState(
    addProductData?.stepOne?.category || null,
  );

  const [productName, setProductName] = useState(
    addProductData?.stepOne?.productName || null,
  );

  const [brandData, setBrandData] = useState(
    addProductData?.stepOne?.brand || null,
  );

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

  const onSetBrandData = (item: any) => {
    setBrandData(item);
    updateData({brand: item});
  };

  const onSetProductName = (item: any) => {
    setProductName(item);
    updateData({productName: item});
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
        onChangeText={onSetProductName}
        horizontalSpace={'0'}
        value={productName}
        leftIcon={SEARCH_INPUT_ICON}
        placeholder={'Item Name'}
      />
      {renderDropdown(
        'Search Brand/Designer',
        false,
        brandsList,
        onSetBrandData,
        brandData,
      )}
    </StepOneContainer>
  );
};
export default AddProductStepOne;
