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
import {
  getMyDetailsRequest,
  getUsersDetailsRequest,
  deleteNotifRequest,
  newNotifFalseRequest,
} from '../../redux/modules';
import {
  BOTTOM_TAB_OFFERS,
  CHAT_NOTIF,
  PROFILE_ORDERS,
} from '../../assets/images/svgs';
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
import {LSModal} from '../../components/commonComponents/LSModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {handleNavigation} from '../../utility/notification';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const NotificationsScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const {userData} = auth;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyDetailsRequest(userData?._id));
      dispatch(newNotifFalseRequest(userData?._id));
    }, [userData?._id, dispatch]),
  );
  const onNotificationRefresh = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    dispatch(getUsersDetailsRequest(userData?._id, false));
    dispatch(newNotifFalseRequest(userData?._id));
  };
  const svgOptions = (type: string) => {
    switch (type) {
      case 'trade':
        return BOTTOM_TAB_OFFERS;
      case 'message':
        return CHAT_NOTIF;
      case 'trade-order':
      case 'new-paypal-order':
      case 'paypal-order':
        return PROFILE_ORDERS;
      default:
        return BOTTOM_TAB_OFFERS;
    }
  };
  const handleNotifPress = (item: any) => {
    const message = {
      data: {
        ...item,
      },
    };
    handleNavigation(navigation, message, dispatch);
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
          <LSModal.CloseButton
            onCloseButtonPress={() =>
              dispatch(deleteNotifRequest({userId: userData?._id, notif: item}))
            }
          />
        </NotifItemContainer>
      </Touchable>
    );
  };
  return (
    <Container>
      <InStackHeader back={true} title={'Notifications'} />
      <FlastList
        data={userData?.notifications || []}
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
