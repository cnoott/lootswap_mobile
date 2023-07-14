/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {Container, StepOneContainer} from './styles';
import LSInput from '../../../components/commonComponents/LSInput';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import {useSelector} from 'react-redux';
import {
  getSizeList,
  conditionList,
  getPreOwnedConditions,
} from '../../../utility/utility';
import {ADD_PRODUCT_TYPE} from 'custom_types';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepTwo: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );

  const categoryData = addProductData?.stepOne?.category;

  const [sizeData, setSizeData] = useState(
    addProductData?.stepTwo?.size || null,
  );

  const [conditionData, setConditionData] = useState(
    addProductData?.stepTwo?.condition || null,
  );

  const [preOwnedConditionData, setPreOwnedConditionData] = useState(
    addProductData?.stepTwo?.preOwnedCondition || null,
  );

  const [productDes, setProductDes] = useState(
    addProductData?.stepTwo?.productDescription || '',
  );

  const {updateProductData} = props;
  const updateData = (newData: any = {}) => {
    updateProductData({
      ...addProductData,
      stepTwo: {
        ...addProductData?.stepTwo,
        ...newData,
      },
    });
  };

  const onSetSizeData = (item: any) => {
    setSizeData(item);
    updateData({size: item});
  };

  const onSetConditionData = (item: any) => {
    setConditionData(item);
    updateData({condition: item});
  };

  const onSetPreOwnedCondition = (item: any) => {
    setPreOwnedConditionData(item);
    updateData({preOwnedCondition: item});
  };
  //PRE OWNED CONDITION
  const onSetProductDes = (item: any) => {
    setProductDes(item);
    updateData({productDescription: item});
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
      {conditionData?.value === 'Pre-owned' && renderDropdown(
        'Rate Pre-owned Condition',
        false,
        getPreOwnedConditions(),
        onSetPreOwnedCondition,
        preOwnedConditionData,
      )}
      <LSInput
        horizontalSpace={'0'}
        onChangeText={onSetProductDes}
        value={productDes}
        placeholder={'Description'}
        multiline={true}
        height={200}
      />
    </StepOneContainer>
  );
};

export default AddProductStepTwo;
