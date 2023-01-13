import * as React from 'react';
import OrderUserDetailView from './orderUserDetailView';
import TradeOfferCell from '../../screens/offers/offerItems/TradeOfferCell';
import {PurchaseCellContainer} from './styles';

interface OrderPurchaseProps {
  item?: number;
  onCellPress?: Function;
}

function OrderTradeOrdersCell(props: OrderPurchaseProps) {
  const {item, onCellPress = () => {}} = props;
  return (
    <PurchaseCellContainer onPress={() => onCellPress(true)}>
      <OrderUserDetailView item={item} />
      <TradeOfferCell offerItem={{}} />
    </PurchaseCellContainer>
  );
}

export default OrderTradeOrdersCell;
