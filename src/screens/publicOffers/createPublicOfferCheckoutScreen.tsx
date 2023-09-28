/***
LootSwap - PUBLIC OFFER CHECKOUT SCREEN
***/

import React, {FC} from 'react';
import TradeCheckoutComponent from '../../components/offers/tradeCheckoutComponent';

export const CreatePublicOfferCheckoutScreen: FC<any> = ({route}) => {
  const {publicOffersData, myItems} = route;
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TradeCheckoutComponent
        isFromStartTrade={true}
        isFromPublicOffers={true}
        isReciever={true}
        recieverItems={publicOffersData?.receivingStockxProducts}
        senderItems={myItems.filter(item => item.isSelected)}
        loading={loading}
        paymentDetails={{}}
        openPaymentSheet={() => {}}
      />
    </>
  );
};

export default CreatePublicOfferCheckoutScreen;
