/* eslint-disable react-hooks/exhaustive-deps */
/***
  LootSwap - TRADE CHECKOUT COMPONENT
 ***/

import React, {FC} from 'react';
import DeliveryAddressComponent from '../../components/orders/deliveryAddressComponent';
import TradeCheckoutItemCell from '../../screens/offers/offerItems/TradeCheckoutItemCell';
import {StripeApiKey, MerchantIdentifier} from '@env';
import LSButton from '../commonComponents/LSButton';
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
  TradeAcceptanceContainer,
  TradeAcceptanceDesView,
  TradeAcceptanceLabel,
  TradeAcceptanceIconStyle,
} from './tradeCheckoutStyle';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useSelector} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ORDER_TRACK_PURCHASED} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import ReviewStockxItemCell from '../../components/publicOffer/reviewStockxItemCell';
import {MoneyOfferText} from '../../screens/offers/startTrade/styles';
import {isPending} from '@reduxjs/toolkit';

interface TradeCheckoutComponentProps {
  receiverItems: Array<any>;
  senderItems: Array<any>;
  receivingMoneyOffer?: Number;
  sendingMoneyOffer?: Number;
  tradeData?: any;
  isFromStartTrade: boolean;
  paymentDetails: any;
  openPaymentSheet: Function;
  loading: boolean;
  isReceiver?: boolean;
  isFromPublicOffers?: boolean;
  isFromPublicOffersCheckout?: boolean;
}
// Also used to checkout public offers
export const TradeCheckoutComponent: FC<
  TradeCheckoutComponentProps
> = props => {
  const {
    receiverItems,
    senderItems,
    tradeData = {},
    isFromStartTrade = false,
    paymentDetails = {},
    openPaymentSheet = () => {},
    loading,
    isReceiver = false,
    isFromPublicOffers = false,
    receivingMoneyOffer = 0,
    sendingMoneyOffer = 0,
    isFromPublicOffersCheckout = false,
  } = props;

  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const {
    platformFee,
    shippingCost,
    total,
    userPayout,
    discount = 0,
  } = paymentDetails;

  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };

  const renderReceiverItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          `Item${receiverItems?.length > 1 ? 's' : ''} ${
            isReceiver ? 'you will send' : 'you will receive'
          }`,
        )}
        {receiverItems.map(item => {
          return <TradeCheckoutItemCell itemData={item} />;
        })}
      </EmptyView>
    );
  };
  const renderSendersItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          `Item${senderItems.length > 1 ? 's' : ''} ${
            isReceiver ? 'you will receive' : 'you will send'
          }`,
        )}
        {senderItems.map(item => {
          return (
            <>
              <TradeCheckoutItemCell itemData={item} />
              {!isReceiver && sendingMoneyOffer > 0 && (
                <MoneyOfferText>{`+$${sendingMoneyOffer}`}</MoneyOfferText>
              )}
              {isReceiver && receivingMoneyOffer > 0 && (
                <MoneyOfferText>{`+$${receivingMoneyOffer}`}</MoneyOfferText>
              )}
            </>
          );
        })}
      </EmptyView>
    );
  };

  const renderStockxItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          isFromPublicOffersCheckout ? 'You will send' : 'You will receive',
        )}
        {receiverItems.map(item => {
          return <ReviewStockxItemCell stockxProduct={item} />;
        })}
        {receivingMoneyOffer !== 0 && (
          <MoneyOfferText>{`+$${receivingMoneyOffer}`}</MoneyOfferText>
        )}
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
          <SummaryText>${platformFee?.toFixed(2)}</SummaryText>
        </StretchedRowView>
        {renderSummaryDetail('Shipping', shippingCost?.toFixed(2))}
        {userPayout !== 0 &&
          renderSummaryDetail('Additional Cash offer', userPayout)}
        {discount !== 0 && renderSummaryDetail('Promo Discount', -discount)}
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
        title={'Checkout'}
        disabled={!loading}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
        onPress={openPaymentSheet}
      />
    );
  };
  const renderNoChargeDisclaimer = () => {
    return (
      isFromStartTrade && (
        <TradeAcceptanceContainer style={{marginHorizontal: 20}}>
          <SvgXml
            xml={ORDER_TRACK_PURCHASED}
            style={TradeAcceptanceIconStyle}
          />
          <TradeAcceptanceDesView>
            <TradeAcceptanceLabel>
              Your card will show a pending authorization but you'll only be charged if the trade is accepted.

            </TradeAcceptanceLabel>
          </TradeAcceptanceDesView>
        </TradeAcceptanceContainer>
      )
    );
  };

  return (
    <StripeProvider
      publishableKey={StripeApiKey}
      merchantIdentifier={MerchantIdentifier}>
      <Container>
        <HorizontalBar />
        <ScrollSubContainer>
          <DeliveryAddressComponent
            userDetails={userData}
            onPress={() => navigation.navigate('AddressScreenCheckout')}
          />
          {isFromPublicOffers ? renderStockxItems() : renderReceiverItems()}
          {renderSendersItems()}
          <VerticalMargin />

          {/*!userData?.usedInitialPromo && (
            <PromoContainer>
              <PromoDes>50% off Platform Fee</PromoDes>
              <PromoAppliedLabel>Promo applied </PromoAppliedLabel>
            </PromoContainer>
            )*/}

          {discount !== 0 && (
            <PromoContainer>
              <PromoDes>10% off First Trade!</PromoDes>
              <PromoAppliedLabel>Affiliate Promo</PromoAppliedLabel>
            </PromoContainer>
          )}
          <HorizontalBar />
          {renderNoChargeDisclaimer()}
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
    </StripeProvider>
  );
};

export default TradeCheckoutComponent;
