/***
INSQUAD - FIFTH TAB SCREEN
***/

import React, { FC } from 'react';
import { InHeader } from '../../components/header';
import { Container } from './styles';
export const Settingscreen: FC<{}> = () => {
  return (
    <Container>
      <InHeader title={'Aptos'} />
    </Container>
  );
};

export default Settingscreen;
