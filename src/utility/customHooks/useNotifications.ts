import {useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux'
import {handleNavigation} from '../notification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {newNotifTrueSuccess} from '../../redux/modules';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const onRemoteNotification = useCallback(
    (notification: any) => {
      const notifData = notification.getData();
      const isClicked = notifData.userInteraction === 1;

      if (isClicked) {
        handleNavigation(navigation, notifData.remoteMessage, dispatch, userData);
        console.log(JSON.stringify(notifData));
      } else {
        // Do something else with push notification
      }
      const result = PushNotificationIOS.FetchResult.NoData;
      notification.finish(result);
    },
    [dispatch, navigation, userData],
  );

  useEffect(() => {
    PushNotificationIOS.addEventListener('localNotification', onRemoteNotification);

    const unsubscribeOnMessage = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('TEST: opened from bg state:', remoteMessage);
        handleNavigation(navigation, remoteMessage, dispatch, userData);
      },
    );

    const unsubscribeOnNotificationOpenedApp = messaging().onMessage(
      remoteMessage => {
        console.log('NEW MESSAGE!!!');
        dispatch(newNotifTrueSuccess());
        PushNotificationIOS.addNotificationRequest({
          id: remoteMessage?.data?.objectId,
          title: remoteMessage?.notification?.title,
          body: remoteMessage?.notification?.body,
          category: 'localNotification',
          userInfo: {remoteMessage},
        });
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'TEST: notificaiton opened from quit state',
            remoteMessage.notification,
          );
          handleNavigation(navigation, remoteMessage, dispatch, userData);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      PushNotificationIOS.removeEventListener('localNotification');
    };
  }, [navigation, dispatch, userData, onRemoteNotification]);
};
