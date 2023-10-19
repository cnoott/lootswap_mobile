import * as React from 'react';
import TradeOfferCell from '../../screens/offers/offerItems/TradeOfferCell';
import PublicOfferCell from '../../components/publicOffer/PublicOfferCell'; 
import {PurchaseCellContainer} from './styles';
import TradeOrderUserDetailView from './tradeOrderUserDetailView';

interface OrderPurchaseProps {
  item?: any;
  onCellPress?: Function;
  userData?: any;
}

function OrderTradeOrdersCell(props: OrderPurchaseProps) {
  const {item, onCellPress = () => {}, userData} = props;
  return (
    <PurchaseCellContainer onPress={() => onCellPress(true)}>
      <TradeOrderUserDetailView item={item} userData={userData} />
      {item.tradeId ? (
        <TradeOfferCell offerItem={item?.tradeId} />
      ) : (
        <PublicOfferCell
          receivingStockxProducts={item?.publicOfferId?.receivingStockxProducts}
          sendingProductIds={item?.publicOfferId?.sendingProductIds}
          receivingMoneyOffer={item?.publicOfferId?.receivingMoneyOffer}
          sendingMoneyOffer={item?.publicOfferId?.sendingMoneyOffer}
         />
      )}
    </PurchaseCellContainer>
  );
}

export default OrderTradeOrdersCell;
