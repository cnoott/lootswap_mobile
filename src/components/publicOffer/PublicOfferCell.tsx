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
  BottomRowTouchable,
} from '../../screens/offers/styles';
import {SvgXml} from 'react-native-svg';
import {SWAP_ICON} from 'localsvgimages';

interface PublicOfferProps {
  receivingStockxProducts: Array<any>;
  sendingProductIds: Array<any>;
  receivingMoneyOffer: Number;
  sendingMoneyOffer: Number;
  isFromHome?: Boolean;
  onPress?: Function;
}

export const PublicOfferCell: FC<PublicOfferProps> = props => {
  const {
    receivingStockxProducts,
    sendingProductIds,
    receivingMoneyOffer,
    sendingMoneyOffer,
    isFromHome = false,
    onPress = () => {},
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

  const renderMainContent = () => {
    return (
      <>
        <PublicOfferItemContainer>
          <AboveItemLabel>
            Item{receivingStockxProducts.length > 1 ? 's': ''} you are trading
          </AboveItemLabel>
          <TradeOfferItem
            items={receivingStockxProducts?.map(prod => {
              return {...prod.stockxId, chosenSize: prod.chosenSize};
            })}
            isInTrade={false}
            moneyOffer={receivingMoneyOffer}
            isStockxItem={true}
            isFromHome={isFromHome}
          />
        </PublicOfferItemContainer>
        {renderSwapView()}
        <PublicOfferItemContainer>
          <AboveItemLabel>
            Item{sendingProductIds.length > 1 ? 's' : ''} your are getting
          </AboveItemLabel>
          <TradeOfferItem
            items={sendingProductIds}
            moneyOffer={sendingMoneyOffer}
            isInTrade={false}
            isStockxItem={false}
            isFromHome={isFromHome}
          />
        </PublicOfferItemContainer>
      </>
    );
  };

  if (isFromHome) {
    return (
      <BottomRowTouchable
        topMargin={5}
        isFromHome={isFromHome}
        onPress={() => onPress()}>
        {renderMainContent()}
      </BottomRowTouchable>
    );
  } else {
    return (
      <BottomRowView topMargin={5} isFromHome={isFromHome}>
        {renderMainContent()}
      </BottomRowView>
    );
  }
}

export default PublicOfferCell;
