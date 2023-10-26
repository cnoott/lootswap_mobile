/***
  LootSwap - TRADE OFFER ITEM
 ***/

import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  BottomRowView,
  EmptyView,
  SwapLine,
  SwapButtonContainer,
} from '../styles';
import TradeOfferItem from './TradeOfferItem';
import {SWAP_ICON} from 'localsvgimages';

interface TradeOfferItemProp {
  offerItem?: any;
  topMargin?: number;
  isInTrade?: boolean;
}

export const TradeOfferCell: FC<TradeOfferItemProp> = props => {
  const {offerItem, topMargin = 20, isInTrade} = props;

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
  if (offerItem?.recieverMoneyOffer > 0) {
    return (
      <BottomRowView topMargin={topMargin}>
        <TradeOfferItem
          items={offerItem?.senderItems}
          moneyOffer={offerItem?.senderMoneyOffer}
          isInTrade={isInTrade}
        />
        {renderSwapView()}
        <TradeOfferItem
          items={offerItem?.recieverItems}
          moneyOffer={offerItem?.recieverMoneyOffer}
          isInTrade={isInTrade}
        />
      </BottomRowView>
    );
  } else {
    return (
      <BottomRowView topMargin={topMargin}>
        <TradeOfferItem
          items={offerItem?.senderItems}
          moneyOffer={offerItem?.senderMoneyOffer}
          isInTrade={isInTrade}
        />
        {renderSwapView()}
        <TradeOfferItem
          items={offerItem?.recieverItems}
          moneyOffer={offerItem?.recieverMoneyOffer}
          isInTrade={isInTrade}
        />
      </BottomRowView>
    );
  }
};

export default TradeOfferCell;
