/***
  LootSwap - SELLER PAY CHOOSE SERVICE SCREEN
 ***/

import React, {FC, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {SvgXml} from 'react-native-svg';
import {StripeApiKey, MerchantIdentifier} from '@env';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {checkoutRate} from '../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'custom_top_alert';
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
import {AuthProps} from '../../redux/modules/auth/reducer';

export const ChooseServiceScreen: FC<any> = ({route}) => {
  const {ratesDetails, paypalOrderId} = route?.params;

  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [choosenCarrier, setChoosenRate] = useState<Number>(1);
  const [chosenRate, setChosenRate] = useState({});
  const [loading, setLoading] = useState(false);

  const rateSelectionView = (svg: string, rateId: Number) => {
    return (
      <RateTouchable
        onPress={() => setChoosenRate(rateId)}
        selected={rateId === choosenCarrier}>
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

  const sortCmp = (a: any, b: any) => {
    if (a.amount < b.amount) {
      return -1;
    }
    if (a.amount > b.amount) {
      return 1;
    }
    return 0;
  };
  const handleRatePress = rate => {
    console.log('reasd', rate);
    setChosenRate(rate);
  };

  const mapRates = () => {
    let carrier: string;
    if (choosenCarrier === 1) {
      carrier = 'USPS';
    } else if (choosenCarrier === 2) {
      carrier = 'FedEx';
    } else if (choosenCarrier === 3) {
      carrier = 'UPS';
    }
    const filteredRates = ratesDetails.rates.filter(
      rate => rate.provider === carrier,
    );
    const sortedRates = filteredRates.sort(sortCmp);
    return (
      <>
        {sortedRates.map(rate => (
          <TipContainer
            onPress={() => handleRatePress(rate)}
            selected={
              rate?.servicelevel?.name === chosenRate?.servicelevel?.name
            }>
            <USPSTopView>
              <USPSLabel>{rate.servicelevel.name}</USPSLabel>
              <PriceLabel>{`${rate.amount}`}</PriceLabel>
            </USPSTopView>
            <DesText>
              {rate.provider} • Estimated days: {rate.estimated_days}
            </DesText>
          </TipContainer>
        ))}
      </>
    );
  };

  const onCheckoutPress = () => {
    console.log('yo', paypalOrderId);
    const reqData = {
      userId: userData?._id,
      paypalOrderId: paypalOrderId,
      rate: {rate: chosenRate}, //dont ask
    };
    dispatch(
      checkoutRate(
        reqData,
        async res => {
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
            console.log(loading);
          }
          const result = await presentPaymentSheet();
          console.log(result);
          if (result.error) {
            Alert.showError(`There was an error with your payment: ${error}`);
          } else {
            navigation.navigate('TradeCheckoutSuccessScreen', {
              isSale: true,
              total: chosenRate?.amount,
              paypalOrderData: res.paypalOrder,
            });
          }
        },
        error => {
          Alert.showError(
            'There was an error checking out, please try again in a moment.',
          );
          console.log(error);
        },
      ),
    );
  };

  return (
    <StripeProvider
      publishableKey={StripeApiKey}
      merchantIdentifier={MerchantIdentifier}>
      <Container>
        <InStackHeader
          title={'Choose service'}
          right={false}
          onlyTitleCenterAlign={true}
        />
        <FullDivider />
        <SubContainer>
          {renderChooseRateView()}
          {mapRates()}
        </SubContainer>
        <LSButton
          title={'CHECKOUT'}
          size={Size.Fit_To_Width}
          type={Type.Primary}
          radius={15}
          fitToWidth={'90%'}
          onPress={() => onCheckoutPress()}
        />
      </Container>
    </StripeProvider>
  );
};

export default ChooseServiceScreen;
