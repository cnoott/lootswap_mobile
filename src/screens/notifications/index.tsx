/***
LootSwap - NOTIFICATIONS SCREEN
***/

import React, {FC} from 'react';
import {RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getUsersDetailsRequest} from '../../redux/modules';
import {NOTIF_MESSAGE} from '../../assets/images/svgs';
import {
  Container,
  FlastList,
  NotifItemContainer,
  IconContainer,
  EmptyView,
  NotifTitle,
  ActionText,
  Touchable,
} from './styles';

export const NotificationsScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {userData, requestedUserDetails} = auth;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUsersDetailsRequest(userData?._id));
    }, [userData?._id, dispatch]),
  );
  const onNotificationRefresh = () => {
    dispatch(getUsersDetailsRequest(userData?._id, false));
  };
  const renderNotifListItem = ({item}: any) => {
    return (
      <Touchable>
        <NotifItemContainer>
          <IconContainer>
            <SvgXml xml={NOTIF_MESSAGE} />
          </IconContainer>
          <EmptyView>
            <NotifTitle>{item?.title}</NotifTitle>
            <ActionText>{item?.description}</ActionText>
          </EmptyView>
        </NotifItemContainer>
      </Touchable>
    );
  };
  return (
    <Container>
      <InStackHeader back={true} title={'Notifications'} />
      <FlastList
        data={requestedUserDetails?.notifications || []}
        renderItem={renderNotifListItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onNotificationRefresh}
          />
        }
      />
    </Container>
  );
};

export default NotificationsScreen;
