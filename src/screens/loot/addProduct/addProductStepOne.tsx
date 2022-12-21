/***
LootSwap - ADD_PRODUCT STEP 1
***/

import React, {FC, useState} from 'react';
import LSDropDown from '../../../components/commonComponents/LSDropDown';
import {
  categoryList,
  brandsList,
  conditionList,
  getSizeList,
} from '../../../utility/utility';
import {StepOneContainer} from './styles';

export const AddProductStepOne: FC<{}> = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [sizeData, setSizeData] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [conditionData, setConditionData] = useState(null);
  const handleNext = () => {
    const data = {
      category: categoryData?.value,
      size: sizeData?.value,
      brand: brandData?.value,
      condition: conditionData?.value,
    };
    console.log('Data ===', data);
  };
  const onSetConditionData = (item: any) => {
    setConditionData(item);
    handleNext();
  };
  const renderDropdown = (
    dropdownLabel: string,
    isSearch: boolean,
    dropDowndata: any,
    selectItemFunction: Function,
  ) => {
    return (
      <LSDropDown
        itemsList={dropDowndata}
        dropdownLabel={dropdownLabel}
        isSearch={isSearch}
        onSelectItem={selectItemFunction}
      />
    );
  };
  return (
    <StepOneContainer>
      {renderDropdown('Category', false, categoryList, setCategoryData)}
      {renderDropdown('Search Brand/Designer', true, brandsList, setBrandData)}
      {renderDropdown(
        'Size',
        false,
        getSizeList(categoryData ? categoryData?.value : ''),
        setSizeData,
      )}
      {renderDropdown('Condition', false, conditionList, onSetConditionData)}
    </StepOneContainer>
  );
};

export default AddProductStepOne;
