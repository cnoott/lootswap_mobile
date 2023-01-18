import * as React from 'react';
import TradeOfferCell from '../../screens/offers/offerItems/TradeOfferCell';
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
      <TradeOfferCell offerItem={item?.tradeId} />
    </PurchaseCellContainer>
  );
}

export default OrderTradeOrdersCell;
