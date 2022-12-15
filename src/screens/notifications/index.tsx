/***
LootSwap - NOTIFICATIONS SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container} from './styles';

export const NotificationsScreen: FC<{}> = () => {
  return (
    <Container>
      <InStackHeader back={false} title={'Notifications'} />
    </Container>
  );
};

export default NotificationsScreen;
