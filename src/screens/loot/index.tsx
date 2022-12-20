/***
LootSwap - LOOT LIST SCREEN
***/

import React, {FC, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, Innercontainer, ButtonContainer} from './styles';
import LSDropDown from '../../components/commonComponents/LSDropDown';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  categoryList,
  brandsList,
  conditionList,
  getSizeList,
} from '../../utility/utility';

export const LootScreen: FC<{}> = () => {
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
    <Container>
      <InStackHeader back={false} title={'List loot'} centerAligned={true} />
      <KeyboardAwareScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Innercontainer}
        keyboardShouldPersistTaps={'handled'}>
        {renderDropdown('Category', false, categoryList, setCategoryData)}
        {renderDropdown(
          'Size',
          false,
          getSizeList(categoryData ? categoryData?.value : ''),
          setSizeData,
        )}
        {renderDropdown('Brand/Designer', true, brandsList, setBrandData)}
        {renderDropdown('Condition', false, conditionList, setConditionData)}
        <ButtonContainer>
          <LSButton
            title={'Next'}
            size={Size.Full}
            type={Type.Primary}
            radius={20}
            onPress={handleNext}
          />
        </ButtonContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LootScreen;
