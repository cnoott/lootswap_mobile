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
  SingleViewOffer,
  OfferText,
  OfferItemContainerCenter,
} from '../styles';
import TradeOfferItem from './TradeOfferItem';
import {SWAP_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {offerCellOnPress} from '../../../utility/utility';

interface TradeOfferItemProp {
  offerItem?: any;
  topMargin?: number;
  isInTrade?: boolean;
}

export const TradeOfferCell: FC<TradeOfferItemProp> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
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
        <TradeOfferItem subItem={offerItem} isInTrade={isInTrade} />
        {renderSwapView()}
        <OfferItemContainerCenter
          itemsCenter={true}
          onPress={() =>
            offerCellOnPress(
              offerItem?.recieverItem,
              offerItem,
              isInTrade,
              navigation,
            )
          }>
          <Image
            source={{uri: offerItem?.recieverItem?.primary_photo}}
            size={115}
          />
          <SingleViewOffer>
            <OfferText>+${offerItem.recieverMoneyOffer}</OfferText>
          </SingleViewOffer>
        </OfferItemContainerCenter>
      </BottomRowView>
    );
  } else {
    return (
      <BottomRowView topMargin={topMargin} onPress={() => console.log('yo')}>
        <TradeOfferItem subItem={offerItem} isInTrade={isInTrade} />
        {renderSwapView()}
        <ImageContainer
          onPress={() =>
            offerCellOnPress(
              offerItem?.recieverItem,
              offerItem,
              isInTrade,
              navigation,
            )
          }>
          <Image source={{uri: offerItem?.recieverItem?.primary_photo}} />
        </ImageContainer>
      </BottomRowView>
    );
  }
};

export default TradeOfferCell;
