/***
  LootSwap - EDIT ADDRESS SCREEN
 ***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container, MainContent} from './editProfileStyles';
import {EditAddressComponent} from '../../components/profile/editAddressComponent';

export const AddressScreen: FC<{}> = () => {

  return (
    <MainContent>
      <InStackHeader title="Edit Shipping Address" />
      <Container>
        <EditAddressComponent />
      </Container>
    </MainContent>
  );
};

export default AddressScreen;
