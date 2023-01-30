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
  TransactionContainer,
  TransactionIDLabel,
  TransactionIDText,
  SuccessImage,
} from './tradeSuccessScreenStyle';

const dummyData = {
  totalPrice: '97.43',
  transId: 'TR4456C668028',
};

export const TradeCheckoutSucessScreen: FC<{}> = () => {
  return (
    <Container>
      <InHomeHeader />
      <SubContainer>
        <SuccessImage source={PAYMENT_SUCCESS_GIF} />
        <SuccessLabel>Payment Success</SuccessLabel>
        <PriceLabel>${dummyData?.totalPrice}</PriceLabel>
        <DesLabel>
          We have successfully received your payment of ${dummyData?.totalPrice}
        </DesLabel>
        <TransactionContainer>
          <TransactionIDLabel>Transaction ID:</TransactionIDLabel>
          <TransactionIDText>{dummyData?.transId}</TransactionIDText>
        </TransactionContainer>
      </SubContainer>
      <LSButton
        title={'Done'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'90%'}
      />
    </Container>
  );
};

export default TradeCheckoutSucessScreen;
