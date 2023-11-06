/***
LootSwap - ACCEPT PUBLIC OFFER SCREEN
***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import TradeCheckoutComponent from '../../components/offers/tradeCheckoutComponent';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useStripe} from '@stripe/stripe-react-native';
import {acceptPublicOffer} from '../../redux/modules';
import {Alert} from 'custom_top_alert';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type PaymentDetails = {
  platformFee: number;
  toUserRate: number;
  toWarehouseRate: number;
  total: number;
  userPayout: number;
};

export const AcceptPublicOfferScreen: FC<any> = ({route}) => {
const {publicOffer} = route.params;

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    platformFee: 0,
    toUserRate: 0,
    toWarehouseRate: 0,
    total: 0,
    userPayout: 0,
  });

  const dispatch = useDispatch();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const navigation: NavigationProp<any, any> = useNavigation();


  const initializePaymentSheet = useCallback(() => {
    const reqData = {
      userId: userData?._id,
      publicOffer: publicOffer,
    };
    dispatch(
      acceptPublicOffer(
        reqData,
        async (res: any) => {
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
        },
        err => {
          console.log('ERRORR => ', err);
        },
      ),
    )
  }, [dispatch, userData?._id, publicOffer]);

  useEffect(() => {
    initializePaymentSheet();
  }, [dispatch, initializePaymentSheet]);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.showError(error?.message);
      console.log('error payment sheet', error);
    } else {
      console.log('SUCCESSS!!!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Inbox'}],
      });
    }
  };

  return (
    <>
      <LSStartTradeHeader
        title={'Checkout and Accept Public Offer'}
        subText={' '}
        profilePicture={''}
        showPfp={false}
        onBackPress={() => navigation?.goBack()}
      />
      <TradeCheckoutComponent
        isFromStartTrade={true}
        isFromPublicOffers={true}
        isReciever={false}
        recieverItems={publicOffer.receivingStockxProducts.map(prod => {
          return {...prod.stockxId, chosenSize: prod.chosenSize}
        })}
        senderItems={publicOffer.sendingProductIds}
        loading={loading}
        paymentDetails={paymentDetails}
        openPaymentSheet={() => openPaymentSheet()}
      />
    </>
  );
};

export default AcceptPublicOfferScreen;
