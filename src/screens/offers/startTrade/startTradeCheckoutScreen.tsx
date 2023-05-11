/* eslint-disable react-hooks/exhaustive-deps */
/***
LootSwap - START TRADE CHECKOUT SCREEN
***/

import React, {FC, useState} from 'react';
import TradeCheckoutComponent from '../../../components/offers/tradeCheckoutComponent';

interface StartTradeCheckoutScreenProps {
  recieverItems: Array<any>;
  senderItems: Array<any>;
  recieverMoneyOffer: number;
  senderMoneyOffer: number;
  paymentDetails: any;
  loading: boolean;
  openPaymentSheet: Function;
}
//TODO
// - setPaymentDetails moneyoffer
// - initializePaymentSheet
// - openPaymentSheet
export const StartTradeCheckoutScreen: FC<
  StartTradeCheckoutScreenProps
> = props => {
  const {recieverItems, senderItems, recieverMoneyOffer, senderMoneyOffer, paymentDetails, loading, openPaymentSheet} =
    props;

  return (
    <>
      <TradeCheckoutComponent
        recieverItems={recieverItems}
        senderItems={senderItems}
        isFromStartTrade={true}
        paymentDetails={paymentDetails}
        openPaymentSheet={openPaymentSheet}
        loading={loading}
      />
    </>
  );
};

export default StartTradeCheckoutScreen;
