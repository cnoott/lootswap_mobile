/* eslint-disable react-hooks/exhaustive-deps */
/***
  LootSwap - START TRADE CHECKOUT SCREEN
 ***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import TradeCheckoutComponent from '../../components/offers/tradeCheckoutComponent';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useStripe} from '@stripe/stripe-react-native';
import {acceptTradeCheckout} from '../../redux/modules';
import {Alert} from 'custom_top_alert';

interface AcceptTradeCheckoutProps {
  trade: any;
}

type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

export const AcceptTradeCheckoutScreen: FC<
AcceptTradeCheckoutProps
> = props => {
  const {trade} = props.route.params;
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData} = auth;
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });

  const initializePaymentSheet = useCallback(async () => {
    const reqData = {
      userId: userData?._id,
      tradeId: trade?._id,
    };
    dispatch(
      acceptTradeCheckout(
        reqData,
        async res => {
          setPaymentDetails(res.rateData);
          const {paymentIntent, ephemeralKey, customer} = res.stripeData;
          const {error} = await initPaymentSheet({
            merchantDisplayName: 'lootswap, Inc.',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            applePay: {
              merchantCountryCode: 'US',
            },
          });
          if (!error) {
            setLoading(true);
          }
        },
        error => {
          Alert.showError('Error in checkout out');
        },
      ),
    );
  }, []);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.showError(error?.message);
      console.log('error payment sheet', error);
    } else {
      //go to success screen here
      console.log("SUCCESSSFULLL");
    }
  };


  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <>
      <InStackHeader title={'Trade Checkout'} onlyTitleCenterAlign={true} />
      <TradeCheckoutComponent
        recieverItems={trade.recieverItems}
        senderItems={trade.senderItems}
        isFromStartTrade={false}
        paymentDetails={paymentDetails}
        openPaymentSheet={openPaymentSheet}
        loading={loading}
      />
    </>
  );
};

export default AcceptTradeCheckoutScreen;
