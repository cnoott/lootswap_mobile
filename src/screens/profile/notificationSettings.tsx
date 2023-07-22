/***
LootSwap - NOTIFICATION SETTINGS SCREEN
***/

import React, {FC} from 'react';
import {Switch} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import {useTheme} from 'styled-components';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {updateUser} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  Container,
  SubContainer,
  ItemContainer,
  ItemLabel,
} from './notificationsSettingStyle';

//TODO:
// - DELETE the getNotificationSettingsList
// - Make a local state for the current user settings
//      > The initial state will be filled from
// - Each switch will change the state
// - Send the state in the updateUser function

export const NotificationSettingScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth || {};
  const dispatch = useDispatch();
  const theme = useTheme();

  // destructure the notification_settings from userData
  const {notification_settings} = userData || {};

  const onToggleChange = (settingName,value) => {
    const newNotificatonSettings = {
      ...notification_settings,
      [settingName]: value,
    };
    dispatch(
      updateUser({
        userId: userData?._id,
        userData: {
        ...userData,
        notification_settings: newNotificatonSettings,
        },
      }),
    );
  };

  const renderItems = (label, settingName) => {
 const isEnabled = notification_settings?.[settingName];
    return (
      <ItemContainer key={settingName}>
        <ItemLabel>{label}</ItemLabel>
        <Switch
          trackColor={{
            false: theme.colors.grey,
            true: theme.colors.toggle_dark,
          }}
          thumbColor={isEnabled ? theme.colors.white : theme.colors.white}
          ios_backgroundColor={theme.colors.grey}
          onValueChange={value => onToggleChange(settingName,value)}
          value={isEnabled}
        />
      </ItemContainer>
    );
  };
  return (
    <Container>
      <InStackHeader title={'Notification Settings'} />
      <SubContainer>
        {notification_settings && (
          <>
            {renderItems('Trade Sales Updates', 'tradeSalesUpdates')}
            {renderItems('Promos', 'promos')}
            {renderItems('New Items', 'newItems')}
            {renderItems('All Notifications', 'allNotifications')}
          </>
        )}
      </SubContainer>
    </Container>
  );
};

export default NotificationSettingScreen;
