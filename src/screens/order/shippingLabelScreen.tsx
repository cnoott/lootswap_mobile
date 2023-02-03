/***
LootSwap - SELLER PAY SHIPPING LABEL SCREEN
***/

import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import LSInput from '../../components/commonComponents/LSInput';
import {Size, Type} from 'custom_enums';
import {
  Container,
  SubContainer,
  FullDivider,
  SubHeaderLabel,
  AddressContainer,
  AddressText,
  TipContainer,
  TipLabel,
  TipRowView,
  TipDotView,
  TipText,
  SizeRowView,
  SizeBox,
  SizeRightLabel,
  DividerText,
  Touchable,
  CalculateSizeText,
  WeightRowView,
  HorizontalSpace,
} from './shippingLabelScreenStyle';

export const ShippingLabelScreen: FC<any> = ({route}) => {
  const {shippingData} = route?.params || {};
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [sizeLength, setLength] = useState(0);
  const [sizeWidth, setWidth] = useState(0);
  const [sizeHeight, setHeight] = useState(0);
  const [lbWeight, setLBWeight] = useState(0);
  const [ozWeight, setOZWeight] = useState(0);
  const onCalculateSizePress = () => {
    //TODO
    console.log('shippingData ==', shippingData);
  };
  const onSubmitPress = () => {
    navigation?.navigate('ChooseServiceScreen');
  };
  const renderAddressView = () => {
    return (
      <AddressContainer>
        <SubHeaderLabel>Shipping To</SubHeaderLabel>
        <AddressText>
          4517 Washington Ave. Manchester, Kentucky 39495
        </AddressText>
      </AddressContainer>
    );
  };
  const renderTip = (text: string) => {
    return (
      <TipRowView>
        <TipDotView />
        <TipText>{text}</TipText>
      </TipRowView>
    );
  };
  const renderTipView = () => {
    return (
      <TipContainer>
        <TipLabel>Tip</TipLabel>
        {renderTip(
          'If you have trouble measuring the box dimensions use a measure app within your smartphone.',
        )}
        {renderTip('Estimated weight for this item is 2 lbs')}
      </TipContainer>
    );
  };
  const renderSizeInput = (
    leftVal: string,
    rightVal: string,
    onChange: Function,
  ) => {
    return (
      <SizeBox>
        <LSInput
          onChangeText={onChange}
          value={leftVal}
          placeholder={'0'}
          horizontalLeftPadding={0.1}
          topSpace={1}
          rightCustomView={<SizeRightLabel>{rightVal}</SizeRightLabel>}
          keyboardType={'numeric'}
          homeSearch={true}
          maxLength={6}
        />
      </SizeBox>
    );
  };
  const renderSizeView = () => {
    return (
      <SizeRowView>
        <SubHeaderLabel>Size</SubHeaderLabel>
        {renderSizeInput(sizeLength?.toString(), 'L', setLength)}
        <DividerText>X</DividerText>
        {renderSizeInput(sizeWidth?.toString(), 'L', setWidth)}
        <DividerText>X</DividerText>
        {renderSizeInput(sizeHeight?.toString(), 'L', setHeight)}
      </SizeRowView>
    );
  };
  const renderWeightInput = (leftVal: string, onChange: Function) => {
    return (
      <SizeBox>
        <LSInput
          onChangeText={onChange}
          value={leftVal}
          placeholder={'0'}
          horizontalLeftPadding={0.1}
          horizontalRightPadding={0.1}
          topSpace={1}
          keyboardType={'numeric'}
          homeSearch={true}
          textAlign={'right'}
          maxLength={6}
        />
      </SizeBox>
    );
  };
  const renderWeightView = () => {
    return (
      <WeightRowView>
        <SubHeaderLabel>Weight</SubHeaderLabel>
        <HorizontalSpace />
        {renderWeightInput(lbWeight?.toString(), setLBWeight)}
        <HorizontalSpace />
        <DividerText>(lb)</DividerText>
        <HorizontalSpace />
        {renderWeightInput(ozWeight?.toString(), setOZWeight)}
        <HorizontalSpace />
        <DividerText>(oz)</DividerText>
      </WeightRowView>
    );
  };
  return (
    <Container>
      <InStackHeader
        title={'Shipping Label'}
        right={false}
        onlyTitleCenterAlign={true}
      />
      <FullDivider />
      <SubContainer>
        {renderAddressView()}
        {renderTipView()}
        {renderSizeView()}
        <Touchable onPress={() => onCalculateSizePress()}>
          <CalculateSizeText>Calculate packing size</CalculateSizeText>
        </Touchable>
        {renderWeightView()}
      </SubContainer>
      <LSButton
        title={'SUBMIT'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={15}
        fitToWidth={'90%'}
        onPress={() => onSubmitPress()}
      />
    </Container>
  );
};

export default ShippingLabelScreen;
