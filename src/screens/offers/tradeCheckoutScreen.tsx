/***
LootSwap - TRADE CHECKOUT SCREEN
***/

import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import TradeCheckoutItemCell from './offerItems/TradeCheckoutItemCell';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {EDIT_PRIMARY_ICON_BOTTOM_LINE} from '../../assets/images/svgs';
import {
  Container,
  HorizontalBar,
  ScrollSubContainer,
  DeliveryAddContainer,
  DeliveryAddressLabel,
  DeliveryAddressText,
  EditLabelContainer,
  EditLabel,
  DeliveryAddSubContainer,
  HeadingLabel,
  EmptyView,
  VerticalMargin,
  AppliedPromoContainer,
  PromoText,
  AppliedLabel,
  PromoContainer,
  PromoDes,
  PromoAppliedLabel,
  StretchedRowView,
  ItemSubLabel,
  SummaryText,
} from './tradeCheckoutStyle';

export const TradeCheckoutScreen: FC<{}> = () => {
  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };
  const renderDeliveryAddressContainer = () => {
    return (
      <DeliveryAddContainer>
        <DeliveryAddSubContainer>
          <DeliveryAddressLabel>Delivery Address</DeliveryAddressLabel>
          <DeliveryAddressText>
            42 Fairhaven Commons, Golden Street Way, Fairhaven, MA 2719
          </DeliveryAddressText>
        </DeliveryAddSubContainer>
        <EditLabelContainer>
          <SvgXml xml={EDIT_PRIMARY_ICON_BOTTOM_LINE} />
          <EditLabel>Edit</EditLabel>
        </EditLabelContainer>
      </DeliveryAddContainer>
    );
  };
  const renderYourItems = () => {
    return (
      <EmptyView>
        {renderHeading('Items You Have')}
        <TradeCheckoutItemCell itemData={{}} />
      </EmptyView>
    );
  };
  const renderReceiversItems = () => {
    return (
      <EmptyView>
        {renderHeading('Items You Receive')}
        {[1, 2, 3, 4].map(() => {
          return <TradeCheckoutItemCell itemData={{}} />;
        })}
      </EmptyView>
    );
  };
  const renderPromoCodeView = () => {
    return (
      <EmptyView>
        {renderHeading('Promocode')}
        <AppliedPromoContainer>
          <PromoText>PROMOCODE50</PromoText>
          <AppliedLabel>Applied</AppliedLabel>
        </AppliedPromoContainer>
        <PromoContainer>
          <PromoDes>50% off Platform Fee</PromoDes>
          <PromoAppliedLabel>Promo code Applied</PromoAppliedLabel>
        </PromoContainer>
      </EmptyView>
    );
  };

  const renderSummaryDetail = (label: string, value: string) => {
    return (
      <StretchedRowView topMargin={5}>
        <ItemSubLabel>{label}</ItemSubLabel>
        <SummaryText>{value}</SummaryText>
      </StretchedRowView>
    );
  };
  const renderPurchaseSummary = () => {
    return (
      <EmptyView>
        {renderHeading('Purchase Summary')}
        <StretchedRowView>
          <ItemSubLabel>
            Platform fee <PromoAppliedLabel>{'50'}% off</PromoAppliedLabel>
          </ItemSubLabel>
          <SummaryText>+$5.00</SummaryText>
        </StretchedRowView>
        {renderSummaryDetail('Shipment to verification center', '+$15.00')}
        {renderSummaryDetail('Shipment to trader', '+$15.00')}
        {renderSummaryDetail('Additional Cash offer', '+$50.00')}
        {renderSummaryDetail('Taxes and fees', '+$7.43')}
      </EmptyView>
    );
  };
  const renderTotalView = () => {
    return (
      <StretchedRowView>
        <HeadingLabel>Total</HeadingLabel>
        <HeadingLabel isBlack={true}>{'$97.43'}</HeadingLabel>
      </StretchedRowView>
    );
  };
  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'CHECK OUT'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={() => {}}
      />
    );
  };
  return (
    <Container>
      <InStackHeader title={'Trade Checkout'} onlyTitleCenterAlign={true} />
      <HorizontalBar />
      <ScrollSubContainer>
        {renderDeliveryAddressContainer()}
        {renderYourItems()}
        {renderReceiversItems()}
        <VerticalMargin />
        <HorizontalBar />
        {renderPromoCodeView()}
        <VerticalMargin />
        <HorizontalBar />
        {renderPurchaseSummary()}
        <VerticalMargin />
        <HorizontalBar />
        <VerticalMargin />
        {renderTotalView()}
        <VerticalMargin />
        {renderCheckOutButton()}
        <VerticalMargin margin={20} />
      </ScrollSubContainer>
    </Container>
  );
};

export default TradeCheckoutScreen;
