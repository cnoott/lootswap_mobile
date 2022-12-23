/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import {
  categoryList,
  brandsList,
  conditionList,
  getSizeList,
} from '../../../utility/utility';
import {StepOneContainer} from './styles';
import {HomeProps} from '../../../redux/modules/home/reducer';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepOne: FC<ProductStep> = props => {
  const homeData: HomeProps = useSelector(state => state?.home);
  const [categoryData, setCategoryData] = useState(null);
  const [sizeData, setSizeData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [conditionData, setConditionData] = useState(null);
  const {addProductData} = homeData;
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
  const onSetBrandData = (item: any) => {
    setBrandData(item);
    updateData({brand: item});
  };
  const onSetConditionData = (item: any) => {
    setConditionData(item);
    updateData({condition: item});
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
      {renderDropdown(
        'Search Brand/Designer',
        true,
        brandsList,
        onSetBrandData,
        brandData,
      )}
      {renderDropdown(
        'Size',
        false,
        getSizeList(categoryData ? categoryData?.value : ''),
        onSetSizeData,
        sizeData,
      )}
      {renderDropdown(
        'Condition',
        false,
        conditionList,
        onSetConditionData,
        conditionData,
      )}
    </StepOneContainer>
  );
};

export default AddProductStepOne;
