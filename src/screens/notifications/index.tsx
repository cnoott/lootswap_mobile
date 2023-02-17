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
import {getMyDetailsRequest, getUsersDetailsRequest} from '../../redux/modules';
import {NOTIF_MESSAGE, BOTTOM_TAB_OFFERS} from '../../assets/images/svgs';
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
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const NotificationsScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const {userData} = auth;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyDetailsRequest(userData?._id));
      console.log(userData?.notifications);
    }, [userData?._id, dispatch]),
  );
  const onNotificationRefresh = () => {
    dispatch(getUsersDetailsRequest(userData?._id, false));
  };
  const svgOptions = (type: string) => {
    switch(type) {
      case 'trade':
        return BOTTOM_TAB_OFFERS;
      default:
        return NOTIF_MESSAGE;
    }
  };
  const handleNotifPress = (item: any) => {
    if (item.notifType === 'trade') {
      navigation.reset({
        index: 0,
        routes: [{name: 'Offers/Inbox'}],
      });
      navigation.navigate('Offers/Inbox', {
        screen: 'OffersMessageScreen',
        params: {
          item: JSON.parse(item?.notifData),
        },
      });
    }
  };

  const renderNotifListItem = ({item}: any) => {
    return (
      <Touchable onPress={() => handleNotifPress(item)}>
        <NotifItemContainer>
          <IconContainer>
            <SvgXml xml={svgOptions(item.notifType)} />
          </IconContainer>
          <EmptyView>
            <NotifTitle>{item?.title}</NotifTitle>
            <ActionText>{item?.body}</ActionText>
          </EmptyView>
        </NotifItemContainer>
      </Touchable>
    );
  };
  return (
    <Container>
      <InStackHeader back={true} title={'Notifications'} />
      <FlastList
        data={userData?.notifications.reverse() || []}
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
