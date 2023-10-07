/***
  LootSwap - PUBLIC OFFER SCREEN
 ***/


import React, {FC, useState, useRef, useEffect} from 'react';
import {
  BrowsePublicOffersContainer,
  MoneyContainer,
  Spacing,
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
      <TradeReviewText>For</TradeReviewText>
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
      <TradeReviewText>Your</TradeReviewText>
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

  const showMoneyOffer = (moneyOffer: number) => (
    <MoneyContainer>
      <MoneyOfferText>+${moenyOffer}</MoneyOfferText>
    </MoneyContainer>
  );

  return (
    <BrowsePublicOffersContainer>
      <InStackHeader title={'Public Offer'} />
      <ScrollView>
        {showStockxProducts()}
        {sendingMoneyOffer !== 0 && showMoneyOffer(sendingMoneyOffer)}
        <Spacing />
        {showReceivingLoot()}
        {receivingMoneyOffer !== 0 && showMoneyOffer(receivingMoneyOffer)}
      </ScrollView>

    </BrowsePublicOffersContainer>
  );
};

export default PublicOfferScreen;
