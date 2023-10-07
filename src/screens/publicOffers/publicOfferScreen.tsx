/***
  LootSwap - PUBLIC OFFER SCREEN
 ***/


import React, {FC, useState, useRef, useEffect} from 'react';
import {
  BrowsePublicOffersContainer,
  MoneyContainer,
} from './styles';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  ScrollSubContainer,
  TradeReviewText,
  TradeReviewTextTwo,
  AddMoneyContainer,
  MoneyOfferText,
  MarketValueContainer,
  MarketValueTitle,
  MarketValueText,
} from '../offers/startTrade/styles';
import StartTradeItemCell from '../../components/startTrade/startTradeItemCell';
import {
  calculateMarketValue,
  findMarketDataFromSize,
} from '../../utility/utility';
import ReviewStockxItemCell from '../../components/publicOffer/reviewStockxItemCell';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {ScrollView} from 'react-native';

const PublicOfferScreen: FC<any> = ({route}) => {
  const {publicOffer} = route?.params;
  const {
    receivingStockxProducts,
    sendingProductIds,
    receivingMoneyOffer,
    sendingMoneyOffer,
  } = publicOffer;

  const showReceivingLoot = () => (
    <>
      <TradeReviewText> Your loot </TradeReviewText>
      {sendingProductIds.map(item => (
        <StartTradeItemCell item={item} isReview={true} />
      ))}
      <MarketValueContainer>
        <MarketValueTitle>Total Est. Market Value: </MarketValueTitle>
        <MarketValueText>
          {calculateMarketValue(sendingProductIds)}
        </MarketValueText>
      </MarketValueContainer>
    </>
  );

  const showStockxProducts = () => (
    <>
      <TradeReviewText>Public Offer</TradeReviewText>
      {receivingStockxProducts.map(item => (
        <ReviewStockxItemCell
          stockxProduct={{...item.stockxId, chosenSize: item.chosenSize}}
        />
      ))}
      <MarketValueContainer>
        <MarketValueTitle>Total Est. Market Value: </MarketValueTitle>
        <MarketValueText>
          ${receivingStockxProducts.reduce(
            (sum, product) => sum + findMarketDataFromSize(product.stockxId, product.chosenSize)?.lastSale,
              0
          )}
        </MarketValueText>
      </MarketValueContainer>
    </>
  );

  const showSendingMoneyOffer = () => (
    <MoneyContainer>
      <MoneyOfferText>+${sendingMoneyOffer}</MoneyOfferText>
    </MoneyContainer>
  );

  return (
    <BrowsePublicOffersContainer>
      <InStackHeader title={'Public Offer'} />
      <ScrollView>
        {showReceivingLoot()}
        {showStockxProducts()}
        {showSendingMoneyOffer()}
      </ScrollView>

    </BrowsePublicOffersContainer>
  );
};

export default PublicOfferScreen;
