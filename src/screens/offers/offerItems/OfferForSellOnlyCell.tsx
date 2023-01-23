/***
  LootSwap - OFFER FOR SELL ONLY ITEM
 ***/

import React, {FC} from 'react';
import {ImageContainer, Image} from '../styles';
import {
  OfferCellOnlyContainer,
  ItemNameText,
  ItemCategoryText,
  ItemSubLabel,
  OfferCellOnlyRightView,
} from '../tradeCheckoutStyle';

interface TradeCheckoutItemProp {
  itemData?: any;
}

export const OfferForSellOnlyCell: FC<TradeCheckoutItemProp> = props => {
  const {itemData} = props;
  const renderDescription = () => {
    return (
      <OfferCellOnlyRightView>
        <ItemNameText>{itemData?.name}</ItemNameText>
        <ItemCategoryText>{itemData?.description}</ItemCategoryText>
        <ItemSubLabel>Size: {itemData?.size}</ItemSubLabel>
        <ItemNameText>${itemData?.price}</ItemNameText>
      </OfferCellOnlyRightView>
    );
  };
  return (
    <OfferCellOnlyContainer>
      <ImageContainer size={120}>
        <Image size={120} source={{uri: itemData?.primary_photo}} />
      </ImageContainer>
      {renderDescription()}
    </OfferCellOnlyContainer>
  );
};

export default OfferForSellOnlyCell;
