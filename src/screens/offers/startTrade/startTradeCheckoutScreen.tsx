/* eslint-disable react-hooks/exhaustive-deps */
/***
LootSwap - START TRADE CHECKOUT SCREEN
***/

import React, {FC} from 'react';
import TradeCheckoutComponent from '../../../components/offers/tradeCheckoutComponent';

interface StartTradeCheckoutScreenProps {
  receiverItems: Array<any>;
  senderItems: Array<any>;
  paymentDetails: any;
  loading: boolean;
  openPaymentSheet: Function;
  isReceiver: boolean;
}

export const StartTradeCheckoutScreen: FC<
  StartTradeCheckoutScreenProps
> = props => {
  const {
    receiverItems,
    senderItems,
    paymentDetails,
    loading,
    openPaymentSheet,
    isReceiver,
  } = props;

  return (
    <>
      <TradeCheckoutComponent
        receiverItems={receiverItems}
        senderItems={senderItems}
        isFromStartTrade={true}
        paymentDetails={paymentDetails}
        openPaymentSheet={openPaymentSheet}
        loading={loading}
        isReceiver={isReceiver}
      />
    </>
  );
};

export default StartTradeCheckoutScreen;
