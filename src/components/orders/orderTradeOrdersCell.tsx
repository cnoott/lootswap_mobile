import * as React from 'react';
import TradeOfferCell from '../../screens/offers/offerItems/TradeOfferCell';
import PublicOfferCell from '../../components/publicOffer/PublicOfferCell'; 
import {PurchaseCellContainer} from './styles';
import TradeOrderUserDetailView from './tradeOrderUserDetailView';
import CellBadge from '../../components/offers/cellBadge';

interface OrderPurchaseProps {
  item?: any;
  onCellPress?: Function;
  userData?: any;
}

function OrderTradeOrdersCell(props: OrderPurchaseProps) {
  const {item, onCellPress = () => {}, userData} = props;
  const isReciever = item.reciever._id === userData?._id;
  const showNotifBadge =
    (isReciever && item?.recieverNewNotif) ||
    (!isReciever && item?.senderNewNotif)
  return (
    <PurchaseCellContainer onPress={() => onCellPress(true)}>
      <TradeOrderUserDetailView item={item} userData={userData} />
      {showNotifBadge && <CellBadge top={15} left={8}/>}
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
