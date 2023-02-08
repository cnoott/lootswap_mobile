/***
LootSwap - TRADE CHECKOUT SUCESS SCREEN
***/

import React, {FC, useEffect, useState} from 'react';
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
import {getOrder, getPaypalOrder, getAllOrders} from '../../redux/modules';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';

export const TradeCheckoutSucessScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state?.auth);
  const {userData} = auth;
  const {
    orderData = {},
    total,
    isSale = false,
    paypalOrderData = {},
  } = props?.route?.params;
  const [latestOrder, setLatestOrder] = useState({});
  const [paypalOrder, setPaypalOrder] = useState({});

  useEffect(() => {
    if (!isSale) {
      dispatch(
        getOrder(
          {orderId: orderData?._id},
          res => {
            setLatestOrder(res);
          },
          error => {
            console.log(error);
          },
        ),
      );
    } else {

      dispatch(
        getAllOrders({
          userId: userData?._id,
        }),
      );
      dispatch(
        getPaypalOrder(
          {paypalOrderId: paypalOrderData?._id},
          res => {
            console.log('RESPONSE',res);
            setPaypalOrder(res);
          },
          error => {
            //TODO Alert error handling
            console.log(error);
          },
        ),
      );
    }
  }, [orderData?._id, dispatch, isSale, userData?._id, paypalOrderData?._id]);

  const onPressOptions = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Profile'}],
    });
    navigation.navigate('Profile', {
      screen: 'TrackOrderScreen',
      params: {
        isTradeOrder: !isSale,
        item: isSale ? paypalOrder : latestOrder,
      },
    });
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
