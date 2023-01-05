/***
LootSwap - TRADE OFFER ITEM
***/

import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  ImageContainer,
  BottomRowView,
  EmptyView,
  SwapLine,
  Image,
  SwapButtonContainer,
} from '../styles';
import TradeOfferItem from './TradeOfferItem';
import {SWAP_ICON} from 'localsvgimages';

interface TradeOfferItemProp {
  offerItem?: number;
  topMargin?: number;
}

export const TradeOfferCell: FC<TradeOfferItemProp> = props => {
  const {offerItem, topMargin = 20} = props;
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
    <BottomRowView topMargin={topMargin}>
      <TradeOfferItem subItem={offerItem} />
      {renderSwapView()}
      <ImageContainer>
        <Image source={{uri: offerItem?.recieverItem?.primary_photo}} />
      </ImageContainer>
    </BottomRowView>
  );
};

export default TradeOfferCell;
