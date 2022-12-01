/***
LootSwap - FIRST TAB SCREEN
***/

import React, {FC} from 'react';
import {InHeader} from '../../components/header';
import {Container, SubContainer} from './styles';

export const HomeScreen: FC<{}> = () => {
  return (
    <Container>
      <InHeader />
      <SubContainer />
    </Container>
  );
};

export default HomeScreen;
