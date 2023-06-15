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

interface TradeCheckoutComponentProps {
  recieverItems: Array<any>;
  senderItems: Array<any>;
  tradeData?: any;
  isFromStartTrade: boolean;
  paymentDetails: any;
  openPaymentSheet: Function;
  loading: boolean;
  isReciever?: boolean;
}

export const TradeCheckoutComponent: FC<
TradeCheckoutComponentProps
> = props => {
  const {
    recieverItems,
    senderItems,
    tradeData = {},
    isFromStartTrade = false,
    paymentDetails = {},
    openPaymentSheet = () => {},
    loading,
    isReciever = false,
  } = props;

  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const {platformFee, toUserRate, toWarehouseRate, total, userPayout} =
    paymentDetails;


  const renderHeading = (label: string) => {
    return <HeadingLabel>{label}</HeadingLabel>;
  };

  const renderRecieverItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          `Item${recieverItems?.length > 1 ? 's' : ''} ${isReciever ? 'you will send' : 'you will receive'}`,
        )}
        {recieverItems.map(item => {
          return <TradeCheckoutItemCell itemData={item} />;
        })}
      </EmptyView>
    );
  };
  const renderSendersItems = () => {
    return (
      <EmptyView>
        {renderHeading(
          `Item${senderItems.length > 1 ? 's' : ''} ${isReciever ? 'you will receive' : 'you will send'}`,
        )}
        {senderItems.map(item => {
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
    return isFromStartTrade && (
      <TradeAcceptanceContainer style={{marginHorizontal: 20}}>
        <SvgXml xml={ORDER_TRACK_PURCHASED} style={TradeAcceptanceIconStyle} />
        <TradeAcceptanceDesView>
          <TradeAcceptanceLabel>
            You will not be charged until the trade is accepted.
          </TradeAcceptanceLabel>
        </TradeAcceptanceDesView>
      </TradeAcceptanceContainer>
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
          {renderRecieverItems()}
          {renderSendersItems()}
          <VerticalMargin />
          {!userData?.usedInitialPromo && (
            <PromoContainer>
              <PromoDes>50% off Platform Fee</PromoDes>
              <PromoAppliedLabel>Promo applied </PromoAppliedLabel>
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
