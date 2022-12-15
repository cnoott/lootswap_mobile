/***
LootSwap - NOTIFICATION SETTINGS SCREEN
***/

import React, {FC, useState} from 'react';
import {Switch} from 'react-native';
import {useTheme} from 'styled-components';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {getNotificationSettingsList} from '../../utility/utility';
import {
  Container,
  SubContainer,
  ItemContainer,
  ItemLabel,
} from './notificationsSettingStyle';

export const NotificationSettingScreen: FC<{}> = () => {
  const theme = useTheme();
  const [settingsData, setSettingsData] = useState(
    getNotificationSettingsList(),
  );
  const onToggleChange = id => {
    const existingData = [...settingsData];
    const newData = existingData.map(p =>
      p.id === id ? {...p, status: !p.status} : p,
    );
    setSettingsData(newData);
  };
  const renderItems = data => {
    const isEnabled = data?.status;
    return (
      <ItemContainer>
        <ItemLabel>{data?.label}</ItemLabel>
        <Switch
          trackColor={{
            false: theme.colors.grey,
            true: theme.colors.toggle_dark,
          }}
          thumbColor={isEnabled ? theme.colors.white : theme.colors.white}
          ios_backgroundColor={theme.colors.grey}
          onValueChange={() => onToggleChange(data?.id)}
          value={isEnabled}
        />
      </ItemContainer>
    );
  };
  return (
    <Container>
      <InStackHeader title={'Notifications'} />
      <SubContainer>
        {settingsData?.map(data => {
          return renderItems(data);
        })}
      </SubContainer>
    </Container>
  );
};

export default NotificationSettingScreen;
