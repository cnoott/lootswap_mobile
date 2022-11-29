/***
LootSwap - FIRST TAB SCREEN
***/

import React, { FC } from 'react';
import { InHeader } from '../../components/header';
import {
  Container,
  SubContainer,
} from './styles';
import { useTheme } from 'styled-components';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { WalletProps } from '../../redux/modules/wallet/reducer';
import { getTitle } from '../../utility/utility';

export const HomeScreen: FC<{}> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const wallet: WalletProps = useSelector((state) => state.wallet); // Accessing wallet data from the redux state

  return (
    <Container>
      <InHeader title={getTitle(wallet.chainData)} />
      <SubContainer />
    </Container>
  );
};

export default HomeScreen;
