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
  AboveItemLabel,
  PublicOfferItemContainer,
} from '../../screens/offers/styles';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON} from 'localsvgimages';

interface PublicOfferProps {
  receivingStockxProducts: Array<any>;
  sendingProductIds: Array<any>;
  receivingMoneyOffer: Number;
  sendingMoneyOffer: Number;
  isFromHome?: Boolean;
}

export const PublicOfferCell: FC<PublicOfferProps> = props => {
  const {
    receivingStockxProducts,
    sendingProductIds,
    receivingMoneyOffer,
    sendingMoneyOffer,
    isFromHome = false,
  } = props;
  const renderSwapView = () => {
    return (
      <EmptyView>
        <SwapLine size={95}/>
        <SwapButtonContainer>
          <SvgXml xml={SWAP_ICON} />
        </SwapButtonContainer>
      </EmptyView>
    );
  };


  return (
    <BottomRowView topMargin={5} isFromHome={isFromHome}>
      <PublicOfferItemContainer>
        <AboveItemLabel>Your</AboveItemLabel>
        <TradeOfferItem
          items={receivingStockxProducts.map(prod => prod.stockxId)}
          moneyOffer={receivingMoneyOffer}
          isInTrade={false}
          isStockxItem={true}
          isFromHome={isFromHome}
        />
      </PublicOfferItemContainer>
      {renderSwapView()}
      <PublicOfferItemContainer>
        <AboveItemLabel>For</AboveItemLabel>
        <TradeOfferItem
          items={sendingProductIds}
          moneyOffer={sendingMoneyOffer}
          isInTrade={false}
          isStockxItem={false}
          isFromHome={isFromHome}
        />
      </PublicOfferItemContainer>
    </BottomRowView>
  );
}

export default PublicOfferCell;
