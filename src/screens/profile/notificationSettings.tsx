/***
LootSwap - NOTIFICATION SETTINGS SCREEN
***/

import React, {FC} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {Container} from './styles';

export const NotificationSettingScreen: FC<{}> = () => {
  return (
    <Container>
      <InStackHeader title={'Notifications'} />
    </Container>
  );
};

export default NotificationSettingScreen;
