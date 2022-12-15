/***
LootSwap - MY LOOT SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container} from './styles';

export const LootScreen: FC<{}> = () => {
  return (
    <Container>
      <InStackHeader back={false} title={'Loot'} />
    </Container>
  );
};

export default LootScreen;
