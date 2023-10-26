/***
  LootSwap - FoundPublicOffersScreeen
 ***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, StockxProductCardContainer} from './hasItScreenStyles';
import {PublicOffersFlatList} from '../publicOffers/styles';
import PublicOfferItem from '../../components/publicOffer/PublicOfferItem';

export const FoundPublicOffersScreen: FC<any> = ({route}) => {
  const {stockxProduct, foundPublicOffers} = route.params;

  const renderPublicOfferItem = ({item}: any) => {
    return (
      <PublicOfferItem
        publicOffer={item}
      />
    );
  };


  return (
    <>
      <InStackHeader title={'Public Offers'}/>
      <Container>
        <PublicOffersFlatList
          data={foundPublicOffers}
          renderItem={renderPublicOfferItem}
          keyExtractor={item => item?._id}
        />
      </Container>
    </>
  );
};

export default FoundPublicOffersScreen;
