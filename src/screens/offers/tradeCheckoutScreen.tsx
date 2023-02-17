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
  //  PromoContainer,
  //  PromoDes,
  PromoAppliedLabel,
  StretchedRowView,
  ItemSubLabel,
  SummaryText,
} from './tradeCheckoutStyle';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'custom_top_alert';
import {
  getMyDetailsRequest,
  fetchPaymentSheet,
  getAllOrders,
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
  const navigation: NavigationProp<any, any> = useNavigation();
  const {tradeData, orderData} = props.route?.params;
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

  const [isShipInsModalVisible, setShipInsModalVisible] = useState(true);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const renderShippingInstructionModal = () => {
    return (
      <LSModal isVisible={isShipInsModalVisible}>
        <LSModal.Container>
          <ShippingInstructionModalComponent
            onButtonPress={() => setShipInsModalVisible(false)}
            isTradeOrder={true}
          />
          <LSModal.CloseButton
            onCloseButtonPress={() => setShipInsModalVisible(false)}
          />
        </LSModal.Container>
      </LSModal>
    );
  };

  const initializePaymentSheet = useCallback(() => {
    const reqData = {
      userId: userData?._id,
      orderId: orderData?._id,
    };
    dispatch(
      fetchPaymentSheet(
        reqData,
        async res => {
          setPaymentDetails(res.rateData);
          const {paymentIntent, ephemeralKey, customer} = res.stripeData;

          const {error} = await initPaymentSheet({
            merchantDisplayName: 'lootswap, Inc.',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
          });
          if (!error) {
            setLoading(true);
          }
        },
        error => {
          Alert.showError(
            `Error getting rates data! Please restart app and try again: ${error}`,
          );
        },
      ),
    );
  }, [dispatch, orderData?._id, userData?._id, initPaymentSheet]);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.showError(`There was an error with your payment: ${error}`);
      console.log('error payment sheet', error);
    } else {
      dispatch(
        getAllOrders({
          userId: userData?._id,
        }),
      );
      navigation.navigate('TradeCheckoutSuccessScreen', {
        orderData: orderData,
        total: total,
      });
    }
  };

  useEffect(() => {
    dispatch(getMyDetailsRequest(userData?._id));
    initializePaymentSheet();
  }, [userData?._id, dispatch, initializePaymentSheet]);

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
          <ItemSubLabel>
            Platform fee <PromoAppliedLabel>{'100'}% off!</PromoAppliedLabel>
          </ItemSubLabel>
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
        <HeadingLabel isBlack={true}>${total}</HeadingLabel>
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
          <DeliveryAddressComponent userDetails={userData} />
          {renderYourItems()}
          {renderSendersItems()}
          <VerticalMargin />
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
