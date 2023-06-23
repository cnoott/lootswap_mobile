/* eslint-disable react-hooks/exhaustive-deps */
/***
LootSwap - START TRADE CHECKOUT SCREEN
***/

import React, {FC} from 'react';
import TradeCheckoutComponent from '../../../components/offers/tradeCheckoutComponent';

interface StartTradeCheckoutScreenProps {
  recieverItems: Array<any>;
  senderItems: Array<any>;
  paymentDetails: any;
  loading: boolean;
  openPaymentSheet: Function;
  isReciever: boolean;
}

export const StartTradeCheckoutScreen: FC<
  StartTradeCheckoutScreenProps
> = props => {
  const {
    recieverItems,
    senderItems,
    paymentDetails,
    loading,
    openPaymentSheet,
    isReciever,
  } = props;

  return (
    <>
      <TradeCheckoutComponent
        recieverItems={recieverItems}
        senderItems={senderItems}
        isFromStartTrade={true}
        paymentDetails={paymentDetails}
        openPaymentSheet={openPaymentSheet}
        loading={loading}
        isReciever={isReciever}
      />
    </>
  );
};

export default StartTradeCheckoutScreen;
