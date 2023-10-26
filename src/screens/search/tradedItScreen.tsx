/***
  LootSwap - Traded It Screen
 ***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container} from './hasItScreenStyles';
import {OffersListView, OfferCellContainer} from '../offers/styles';
import TradeOfferCell from '../offers//offerItems/TradeOfferCell';

export const TradedItScreen: FC<any> = ({route}) => {
  const {foundTrades} = route.params;

  const renderOfferItem = ({item}: any) => {
    console.log("ITEM", item);
    return (
      <OfferCellContainer
        key={item._id}
        onPress={() => {}}>
        <TradeOfferCell offerItem={item} isInTrade={false} />
      </OfferCellContainer>
    );
  };

  return (
    <>
      <Container>
        <InStackHeader title={'Trades'} />
        <OffersListView
          data={foundTrades}
          renderItem={renderOfferItem}
          keyExtractor={item => item._id}
        />

      </Container>
    </>
  );
};

export default TradedItScreen;
