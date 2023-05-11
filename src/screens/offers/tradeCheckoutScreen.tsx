/* eslint-disable react-hooks/exhaustive-deps */
/***
  LootSwap - TRADE CHECKOUT SCREEN
 ***/

import React, {FC, useEffect, useState, useCallback} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import DeliveryAddressComponent from '../../components/orders/deliveryAddressComponent';
import TradeCheckoutItemCell from './offerItems/TradeCheckoutItemCell';
import {StripeApiKey, MerchantIdentifier} from '@env';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  Container,
  HorizontalBar,
  ScrollSubContainer,
  HeadingLabel,
  EmptyView,
  VerticalMargin,
  //  AppliedPromoContainer,
  //  PromoText,
  //  AppliedLabel,
  PromoContainer,
  PromoDes,
  PromoAppliedLabel,
  StretchedRowView,
  ItemSubLabel,
  SummaryText,
} from '../../components/offers/tradeCheckoutStyle';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'custom_top_alert';
import {
  getMyDetailsRequest,
  fetchPaymentSheet,
  getAllOrders,
  getTrade,
} from '../../redux/modules';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LSModal} from '../../components/commonComponents/LSModal';
import ShippingInstructionModalComponent from '../../components/orders/shippingInstructionModalComponent';


type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

export const TradeCheckoutScreen: FC<{}> = props => {
  const {
    recieverItems,
    senderItems,
    tradeData = {},
    isFromStartTrade = false,
  } = props?.route.params;

  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });
  const {platformFee, toUserRate, toWarehouseRate, total, userPayout} =
    paymentDetails;

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  //TODO INIT PAYMENT SHEET USE EFFECT

  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };

  const renderYourItems = () => {
    return (
      <EmptyView>
        {renderHeading('Item you will send')}
        <TradeCheckoutItemCell itemData={tradeData?.recieverItem} />
      </EmptyView>
    );
  };
  const renderSendersItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          `Item${tradeData?.senderItems?.length > 1 ? 's' : ''} You Receive`,
        )}
        {tradeData?.senderItems.map(item => {
          return <TradeCheckoutItemCell itemData={item} />;
        })}
      </EmptyView>
    );
  };
  /*
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
  */
  const renderSummaryDetail = (label: string, value: number) => {
    return (
      <StretchedRowView topMargin={5}>
        <ItemSubLabel>{label}</ItemSubLabel>
        <SummaryText>${value}</SummaryText>
      </StretchedRowView>
    );
  };
  const renderPurchaseSummary = () => {
    return (
      <EmptyView>
        {renderHeading('Purchase Summary')}
        <StretchedRowView>
          <ItemSubLabel>Platform fee</ItemSubLabel>
          <SummaryText>+${platformFee}</SummaryText>
        </StretchedRowView>
        {renderSummaryDetail(
          'Shipment to verification center',
          toWarehouseRate,
        )}
        {renderSummaryDetail('Shipment to trader', toUserRate)}
        {renderSummaryDetail('Additional Cash offer', userPayout)}
        {/*renderSummaryDetail('Taxes and fees', paymentDetails?.)*/}
      </EmptyView>
    );
  };
  const renderTotalView = () => {
    return (
      <StretchedRowView>
        <HeadingLabel>Total</HeadingLabel>
        <HeadingLabel isBlack={true}>${total.toFixed(2)}</HeadingLabel>
      </StretchedRowView>
    );
  };
  const renderCheckOutButton = () => {
    return (
      <LSButton
        title={'CHECK OUT'}
        disabled={!loading}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={openPaymentSheet}
      />
    );
  };
  return (
    <StripeProvider
      publishableKey={StripeApiKey}
      merchantIdentifier={MerchantIdentifier}>
      <Container>
        <InStackHeader title={'Trade Checkout'} onlyTitleCenterAlign={true} />
        <HorizontalBar />
        <ScrollSubContainer>
          <DeliveryAddressComponent
            userDetails={userData}
            onPress={() => navigation.navigate('AddressScreenCheckout')}
          />
          {renderYourItems()}
          {renderSendersItems()}
          <VerticalMargin />
          {!userData?.usedInitialPromo && (
            <PromoContainer>
              <PromoDes>50% off Platform Fee</PromoDes>
              <PromoAppliedLabel>Promo applied </PromoAppliedLabel>
            </PromoContainer>
          )}
          <HorizontalBar />
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
      {renderShippingInstructionModal()}
    </StripeProvider>
  );


};

export default TradeCheckoutScreen;
