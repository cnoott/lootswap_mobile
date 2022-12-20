/***
LootSwap - LOOT LIST SCREEN
***/

import React, {FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, Innercontainer, ButtonContainer} from './styles';
import LSDropDown from '../../components/commonComponents/LSDropDown';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

export const LootScreen: FC<{}> = () => {
  const renderDropdown = (dropdownLabel: string, isSearch: boolean) => {
    return (
      <LSDropDown
        itemsList={data}
        dropdownLabel={dropdownLabel}
        isSearch={isSearch}
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
        {renderDropdown('Category', false)}
        {renderDropdown('Size', false)}
        {renderDropdown('Brand/Designer', true)}
        {renderDropdown('Condition', false)}
        <ButtonContainer>
          <LSButton
            title={'Next'}
            size={Size.Full}
            type={Type.Primary}
            radius={20}
            onPress={() => {}}
          />
        </ButtonContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LootScreen;
