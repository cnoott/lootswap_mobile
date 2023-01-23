/***
  LootSwap - TRADE CHECKOUT ITEM
 ***/

import React, {FC} from 'react';
import {ImageContainer, Image} from '../styles';
import {
  BottomRowView,
  FullFlexView,
  ItemNameText,
  ItemCategoryText,
  StretchedRowView,
  ItemSubLabel,
  ItemSubValue,
  VerticalMargin,
} from '../tradeCheckoutStyle';

interface TradeCheckoutItemProp {
  itemData?: any;
}

export const TradeCheckoutItemCell: FC<TradeCheckoutItemProp> = props => {
  const {itemData} = props;
  const renderDescription = () => {
    return (
      <FullFlexView>
        <ItemNameText>{itemData?.brand}</ItemNameText>
        <ItemCategoryText>{itemData?.name}</ItemCategoryText>
        <VerticalMargin />
        <StretchedRowView>
          <ItemSubLabel>Condition:</ItemSubLabel>
          <ItemSubValue>{itemData?.condition}</ItemSubValue>
        </StretchedRowView>
        <StretchedRowView>
          <ItemSubLabel>Size:</ItemSubLabel>
          <ItemSubValue>{itemData?.size}</ItemSubValue>
        </StretchedRowView>
      </FullFlexView>
    );
  };
  return (
    <BottomRowView topMargin={1}>
      <ImageContainer size={120}>
        <Image size={120} source={{uri: itemData?.primary_photo}} />
      </ImageContainer>
      {renderDescription()}
    </BottomRowView>
  );
};

export default TradeCheckoutItemCell;
