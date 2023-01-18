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
        <ItemNameText>{itemData?.name || 'Puma'}</ItemNameText>
        <ItemCategoryText>Puma XP500 </ItemCategoryText>
        <VerticalMargin />
        <StretchedRowView>
          <ItemSubLabel>Condition:</ItemSubLabel>
          <ItemSubValue>New with box</ItemSubValue>
        </StretchedRowView>
        <StretchedRowView>
          <ItemSubLabel>Size:</ItemSubLabel>
          <ItemSubValue>M</ItemSubValue>
        </StretchedRowView>
      </FullFlexView>
    );
  };
  return (
    <BottomRowView topMargin={1}>
      <ImageContainer size={120}>
        <Image size={120} source={{uri: 'https://picsum.photos/200'}} />
      </ImageContainer>
      {renderDescription()}
    </BottomRowView>
  );
};

export default TradeCheckoutItemCell;
