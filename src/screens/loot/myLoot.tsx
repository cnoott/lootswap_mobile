/***
LootSwap - MY LOOT SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, SubContainer, FlatList} from './myLootStyles';
import MyLootCell from '../../components/loot/myLootItemCell';

export const MyLootScreen: FC<{}> = () => {
  return (
    <Container>
      <InStackHeader back={true} title={'My Loot'} />
      <SubContainer>
        <FlatList
          data={[...new Array(3).keys()]}
          renderItem={() => <MyLootCell />}
        />
      </SubContainer>
    </Container>
  );
};

export default MyLootScreen;
