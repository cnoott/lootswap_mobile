/***
LootSwap - LIST LOOT CHECKOUT SUCCESS
***/
import React, {FC, useEffect, useState} from 'react';
import {Size, Type} from 'custom_enums';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {PAYMENT_SUCCESS_GIF} from '../../constants/imageConstants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Container,
  SubContainer,
  SuccessLabel,
  DesLabel,
  SuccessImage,
} from '../offers/tradeSuccessScreenStyle';

const ListLootSuccessScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation();
  return (
    <Container>
      <InStackHeader title={''} />
      <SubContainer>
        <SuccessImage source={PAYMENT_SUCCESS_GIF} />
        <SuccessLabel>Success!</SuccessLabel>
        <DesLabel>
          Our team will verify your Item and will notify you when your item is
          live.
        </DesLabel>
      </SubContainer>
      <LSButton
        title={'Done'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'90%'}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }}
      />
    </Container>
  );
};

export default ListLootSuccessScreen;
