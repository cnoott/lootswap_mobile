/***
  LootSwap - HasItScreen
 ***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, StockxProductCardContainer} from './hasItScreenStyles';
import LSProductCard from '../../components/productCard';
import StockxProductCard from '../../components/search/stockxProductCard';
import {FlatList} from '../home/styles';
import {FullDivider} from './styles';

export const HasItScreen: FC<any> = ({route}) => {
  const {stockxProduct, foundProducts} = route.params;

  const renderItem = ({item}: any) => {
    return <LSProductCard item={item} />
  };

  return (
    <>
      <Container>
        <InStackHeader title={''} />
        <StockxProductCardContainer>
          <StockxProductCard
            stockxProduct={stockxProduct}
            foundProducts={foundProducts}
            border={true}
          />
        </StockxProductCardContainer>
        <FullDivider />
        <FlatList
          data={foundProducts}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </Container>
    </>
  );
};

export default HasItScreen;


