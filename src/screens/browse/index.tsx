/***
INSQUAD - FORTH TAB SCREEN
***/

import React, {FC} from 'react';
import {InHomeHeader} from '../../components/commonComponents/headers/homeHeader';
import {Container} from './styles';
export const BrowseScreen: FC<{}> = () => {
  return (
    <Container>
      <InHomeHeader title={'Aptos'} />
    </Container>
  );
};

export default BrowseScreen;
