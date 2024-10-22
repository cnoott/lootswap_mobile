/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import {Container, StepOneContainer} from './styles';
import LSInput from '../../../components/commonComponents/LSInput';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import {useSelector} from 'react-redux';
import {
  brandsList,
  conditionList,
  conditionListClothing,
  boxConditionList,
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

  const [brandData, setBrandData] = useState(
    addProductData?.stepTwo?.brand || null,
  );

  const [conditionData, setConditionData] = useState(
    addProductData?.stepTwo?.condition || null,
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

  const onSetBrandData = (item: any) => {
    setBrandData(item);
    updateData({brand: item});
  };

  const onSetBoxCondition = (item: any) => {
    updateData({
      boxCondition: item,
      productDescription: productDes + `\nBox Condition: ${item.value}`,
    });
    setProductDes(productDes + `\nBox Condition: ${item.value}`);
  };

  const onSetConditionData = (item: any) => {
    if (
      addProductData?.stepOne?.stockxUrlKey &&
      (item.label === 'New' || item.label === 'New with tags')
    ) {
      const {productName, size} = addProductData.stepOne;
      const prodDesc = `${item.label},\n${productName},\nSize: ${size.value}`;
      updateData({
        condition: item,
        productDescription: prodDesc,
      });
      setProductDes(prodDesc);
      return;
    } else if (addProductData?.stepOne?.stockxUrlKey) {
      setProductDes('');
    }
    setConditionData(item);
    updateData({condition: item});
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
    disabled: boolean = false,
  ) => {
    return (
      <LSDropDown
        itemsList={dropDowndata}
        dropdownLabel={dropdownLabel}
        isSearch={isSearch}
        onSelectItem={selectItemFunction}
        selectedValue={selectedValue}
        disabled={disabled}
      />
    );
  };

  return (
    <StepOneContainer>
      {renderDropdown(
        'Search Brand/Designer',
        true,
        brandsList,
        onSetBrandData,
        addProductData?.stepTwo?.brand,
      )}
      {renderDropdown(
        'Condition',
        false,
        addProductData?.stepOne?.category?.value === 'shoes'
          ? conditionList
          : conditionListClothing,
        onSetConditionData,
        conditionData,
      )}
      {addProductData?.stepOne?.category?.value === 'shoes' &&
        renderDropdown(
          'Box Condition',
          false,
          boxConditionList,
          onSetBoxCondition,
          addProductData?.stepTwo?.boxCondition,
        )
      }

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
