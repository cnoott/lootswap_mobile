/***
LootSwap - FIRST TAB SCREEN
***/

import React, {FC} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import {
  Container,
  SubContainer,
  FlatList,
  ItemContainer,
  Image,
  FreeShipingContainer,
  ShippingText,
  CellBottomView,
  BottomHeaderView,
  HeaderTextMain,
  HeaderTextSub,
  BarView,
  EmptyRowView,
  HeaderDes,
} from './styles';

export const HomeScreen: FC<{}> = () => {
  const renderItem = () => {
    return (
      <ItemContainer>
        <Image source={{uri: 'https://picsum.photos/200/300'}} />
        <CellBottomView>
          <BottomHeaderView>
            <EmptyRowView>
              <HeaderTextMain>Adidas</HeaderTextMain>
              <BarView />
              <HeaderTextSub>Yeezy</HeaderTextSub>
            </EmptyRowView>
            <HeaderTextMain>$140</HeaderTextMain>
          </BottomHeaderView>
          <HeaderDes>Side Pure</HeaderDes>
          <EmptyRowView>
            <HeaderDes>New With Box </HeaderDes>
            <HeaderTextMain>11</HeaderTextMain>
          </EmptyRowView>
        </CellBottomView>
        <FreeShipingContainer>
          <ShippingText>Free Shipping</ShippingText>
        </FreeShipingContainer>
      </ItemContainer>
    );
  };
  return (
    <Container>
      <InHomeHeader />
      <SubContainer>
        <FlatList data={[1, 2, 3, 4, 5, 6, 7, 8]} renderItem={renderItem} />
      </SubContainer>
    </Container>
  );
};

export default HomeScreen;
