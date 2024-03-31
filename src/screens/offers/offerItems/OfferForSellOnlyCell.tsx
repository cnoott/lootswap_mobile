/***
  LootSwap - OFFER FOR SELL ONLY ITEM
 ***/

import React, {FC} from 'react';
import {ImageContainer, Image, ItemNameText} from '../styles';
import {
  OfferCellOnlyContainer,
  ItemCategoryText,
  ItemSubLabel,
  OfferCellOnlyRightView,
} from '../../../components/offers/tradeCheckoutStyle';

interface TradeCheckoutItemProp {
  itemData?: any;
  isFromMessageScreen?: Boolean;
}

// TODO: check if checkout screen got effected by style changes

export const OfferForSellOnlyCell: FC<TradeCheckoutItemProp> = props => {
  const {itemData, isFromMessageScreen = false} = props;
  const renderDescription = () => {
    return (
      <OfferCellOnlyRightView>
        <ItemNameText>{itemData?.name}</ItemNameText>
        <ItemSubLabel>Size: {itemData?.size}</ItemSubLabel>
        <ItemSubLabel>Condition: {itemData?.condition}</ItemSubLabel>
        <ItemNameText>${itemData?.price}</ItemNameText>
      </OfferCellOnlyRightView>
    );
  };
  return (
    <OfferCellOnlyContainer isFromMessageScreen={isFromMessageScreen}>
      <ImageContainer size={75}>
        <Image size={75} source={{uri: itemData?.primary_photo}} />
      </ImageContainer>
      {renderDescription()}
    </OfferCellOnlyContainer>
  );
};

export default OfferForSellOnlyCell;
