/***
LootSwap - ADD LOOT EDIT ADDRESS SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, MainContent} from '../profile/editProfileStyles';
import {EditAddressComponent} from '../../components/profile/editAddressComponent';

export const LootEditAddressScreen: FC<{}> = () => {
  return (
    <MainContent>
      <InStackHeader title="Shipping Address"/>
      <Container>
        <EditAddressComponent isFromAddLoot={true}/>
      </Container>
    </MainContent>
  );
};

export default LootEditAddressScreen;
