/***
LootSwap - TRADE CHECKOUT SUCESS SCREEN
***/

import React, {FC} from 'react';
import {Size, Type} from 'custom_enums';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {PAYMENT_SUCCESS_GIF} from '../../constants/imageConstants';
import {
  Container,
  SubContainer,
  SuccessLabel,
  PriceLabel,
  DesLabel,
  SuccessImage,
} from './tradeSuccessScreenStyle';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const TradeCheckoutSucessScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const {
    orderData = {},
    total,
    isSale = false,
    paypalOrderData = {},
  } = props?.route?.params;

  const onPressOptions = () => {
    if (isSale) {
      navigation.navigate('Profile', {
        screen: 'TrackOrderScreen',
        params: {
          isTradeOrder: true,
          item: orderData,
        },
      });
    } else {
      navigation.navigate('Profile', {
        screen: 'TrackOrderScreen',
        params: {
          isTradeOrder: false,
          item: paypalOrderData,
        },
      });
    }
  };

  return (
    <Container>
      <InHomeHeader />
      <SubContainer>
        <SuccessImage source={PAYMENT_SUCCESS_GIF} />
        <SuccessLabel>Payment Success</SuccessLabel>
        <PriceLabel>${total}</PriceLabel>
        <DesLabel>
          We have successfully received your payment of ${total}
        </DesLabel>
      </SubContainer>
      <LSButton
        title={'View Order'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'90%'}
        onPress={() => onPressOptions()}
      />
    </Container>
  );
};

export default TradeCheckoutSucessScreen;
