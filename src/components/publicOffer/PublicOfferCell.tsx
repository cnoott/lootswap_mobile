/***
  LootSwap - TRADE OFFER ITEM
 ***/

import React, {FC} from 'react';
import TradeOfferItem from '../../screens/offers/offerItems/TradeOfferItem';
import {
  BottomRowView,
  EmptyView,
  SwapLine,
  SwapButtonContainer,
} from '../../screens/offers/styles';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON} from 'localsvgimages';

interface PublicOfferProps {
  receivingStockxIds: Array<any>;
  sendingProductIds: Array<any>;
  receivingMoneyOffer: Number;
  sendingMoneyOffer: Number;
}

export const PublicOfferCell: FC<PublicOfferProps> = props => {
  const {
    receivingStockxIds,
    sendingProductIds,
    receivingMoneyOffer,
    sendingMoneyOffer,
  } = props;
  const renderSwapView = () => {
    return (
      <EmptyView>
        <SwapLine />
        <SwapButtonContainer>
          <SvgXml xml={SWAP_ICON} />
        </SwapButtonContainer>
      </EmptyView>
    );
  };


  return (
    <BottomRowView topMargin={5}>
      <TradeOfferItem
        items={receivingStockxIds}
        moneyOffer={receivingMoneyOffer}
        isInTrade={false}
        isStockxItem={true}
      />
      {renderSwapView()}
      <TradeOfferItem
        items={sendingProductIds}
        moneyOffer={sendingMoneyOffer}
        isInTrade={false}
        isStockxItem={false}
      />
    </BottomRowView>
  );
}

export default PublicOfferCell;
