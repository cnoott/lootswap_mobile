/***
LootSwap - PUBLIC OFFER CHECKOUT SCREEN
***/

import React, {FC, useState, useEffect, useCallback} from 'react';
import TradeCheckoutComponent from '../../components/offers/tradeCheckoutComponent';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useStripe} from '@stripe/stripe-react-native';
import {publicOfferCheckout} from '../../redux/modules';
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

export const CreatePublicOfferCheckoutScreen: FC<any> = ({route}) => {
  const {publicOffersData, myItems} = route.params;
  const {receivingStockxProducts, receivingMoneyOffer, sendingMoneyOffer} = 
    publicOffersData;
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
      receivingStockxProducts,
      sendingProducts: myItems.filter(item => item?.isSelected),
      receivingMoneyOffer,
      sendingMoneyOffer,
    };
    dispatch(
      publicOfferCheckout(
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
  }, [
    dispatch,
    myItems,
    receivingStockxProducts,
    receivingMoneyOffer,
    sendingMoneyOffer,
    userData?._id,
  ]);

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
        routes: [{name: 'Offers/Inbox'}],
      });

    }
  };


  return (
    <>
      <LSStartTradeHeader
        title={'Checkout and Create Offer'}
        subText={' '}
        profilePicture={''}
        showPfp={false}
        onBackPress={() => navigation?.goBack()}
      />
      <TradeCheckoutComponent
        isFromStartTrade={true}
        isFromPublicOffers={true}
        isReciever={false}
        recieverItems={publicOffersData?.receivingStockxProducts}
        senderItems={myItems.filter(item => item.isSelected)}
        loading={loading}
        paymentDetails={paymentDetails}
        openPaymentSheet={() => openPaymentSheet()}
      />
    </>
  );
};

export default CreatePublicOfferCheckoutScreen;
