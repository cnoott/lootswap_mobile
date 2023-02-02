/***
LootSwap - SELLER PAY CHOOSE SERVICE SCREEN
***/

import React, {FC, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {
  UNITED_STATE_POSTAL_SERVICE_ICON,
  FEDEX_ICON,
  UPS_ICON,
} from 'localsvgimages';
import {
  Container,
  SubContainer,
  FullDivider,
  ChooseRateContainer,
  TipLabel,
  WeightRowView,
  RateTouchable,
  TipContainer,
  USPSTopView,
  USPSLabel,
  PriceLabel,
  DesText,
} from './shippingLabelScreenStyle';

export const ChooseServiceScreen: FC<any> = () => {
  const [choosenRate, setChoosenRate] = useState<Number>(1);
  const rateSelectionView = (svg: string, rateId: Number) => {
    return (
      <RateTouchable
        onPress={() => setChoosenRate(rateId)}
        selected={rateId === choosenRate}>
        <SvgXml xml={svg} />
      </RateTouchable>
    );
  };
  const renderChooseRateView = () => {
    return (
      <ChooseRateContainer>
        <TipLabel>Choose Rate</TipLabel>
        <WeightRowView>
          {rateSelectionView(UNITED_STATE_POSTAL_SERVICE_ICON, 1)}
          {rateSelectionView(FEDEX_ICON, 2)}
          {rateSelectionView(UPS_ICON, 3)}
        </WeightRowView>
      </ChooseRateContainer>
    );
  };
  const renderUSPSView = (label: string, price: Number, des: string) => {
    return (
      <TipContainer>
        <USPSTopView>
          <USPSLabel>{label}</USPSLabel>
          <PriceLabel>${`${price}`}</PriceLabel>
        </USPSTopView>
        <DesText>{des}</DesText>
      </TipContainer>
    );
  };
  return (
    <Container>
      <InStackHeader
        title={'Choose service'}
        right={false}
        onlyTitleCenterAlign={true}
      />
      <FullDivider />
      <SubContainer>
        {renderChooseRateView()}
        {renderUSPSView(
          'USPS',
          22.2,
          `Priority Mail Express • Estimated days: ${'1'}`,
        )}
        {renderUSPSView('USPS', 7.3, `Priority Mail • Estimated days: ${'1'}`)}
        {renderUSPSView('USPS', 7.5, `Parcel Select • Estimated days: ${'7'}`)}
      </SubContainer>
      <LSButton
        title={'CHECKOUT'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={15}
        fitToWidth={'90%'}
        onPress={() => {}}
      />
    </Container>
  );
};

export default ChooseServiceScreen;
