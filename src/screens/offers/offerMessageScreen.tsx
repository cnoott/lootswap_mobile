/***
INSQUAD - OFFERS MESSAGE SCREEN
***/

import React, {FC} from 'react';
import {InUserChatHeader} from '../../components/commonComponents/headers/userChatHeader';
import {Container} from './styles';
export const OffersMessageScreen: FC<{}> = () => {
  return (
    <Container>
      <InUserChatHeader title={'Jamel E.'} />
    </Container>
  );
};

export default OffersMessageScreen;
