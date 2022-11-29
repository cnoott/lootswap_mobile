/***
INSQUAD - THIRD TAB SCREEN
***/

import React, { FC } from 'react';
import { InHeader } from '../../components/header';
import { Container } from './styles';
export const ActivitiesScreen: FC<{}> = () => {
  return (
    <Container>
      <InHeader title={'Aptos'} />
    </Container>
  );
};

export default ActivitiesScreen;
