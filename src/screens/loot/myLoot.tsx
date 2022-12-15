/***
LootSwap - MY LOOT SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container} from './styles';

export const MyLootScreen: FC<{}> = () => {
  return (
    <Container>
      <InStackHeader back={true} title={'My Loot'} />
    </Container>
  );
};

export default MyLootScreen;
