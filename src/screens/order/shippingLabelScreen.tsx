/***
LootSwap - SELLER PAY SHIPPING LABEL SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
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
  SizeLeftLabel,
  SizeRightLabel,
  DividerText,
  Touchable,
  CalculateSizeText,
  WeightRowView,
  HorizontalSpace,
} from './shippingLabelScreenStyle';

export const ShippingLabelScreen: FC<any> = ({route}) => {
  const {shippingData} = route?.params || {};
  const onCalculateSizePress = () => {
    //TODO
    console.log('shippingData ==', shippingData);
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
  const renderSizeBox = (leftVal: string, rightVal: string) => (
    <SizeBox>
      <SizeLeftLabel>{leftVal}</SizeLeftLabel>
      <SizeRightLabel>{rightVal}</SizeRightLabel>
    </SizeBox>
  );
  const renderSizeView = () => {
    return (
      <SizeRowView>
        <SubHeaderLabel>Size</SubHeaderLabel>
        {renderSizeBox('0', 'L')}
        <DividerText>X</DividerText>
        {renderSizeBox('0', 'L')}
        <DividerText>X</DividerText>
        {renderSizeBox('0', 'L')}
      </SizeRowView>
    );
  };
  const renderWeightBox = (val: string) => (
    <SizeBox>
      <SizeRightLabel />
      <SizeLeftLabel>{val}</SizeLeftLabel>
    </SizeBox>
  );
  const renderWeightView = () => {
    return (
      <WeightRowView>
        <SubHeaderLabel>Weight</SubHeaderLabel>
        <HorizontalSpace />
        {renderWeightBox('0')}
        <HorizontalSpace />
        <DividerText>(lb)</DividerText>
        <HorizontalSpace />
        {renderWeightBox('0')}
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
        title={'Submit'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={15}
        fitToWidth={'90%'}
        onPress={() => {}}
      />
    </Container>
  );
};

export default ShippingLabelScreen;
