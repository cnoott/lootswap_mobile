import {useEffect, useCallback, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {handleNavigation} from '../notification';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {newNotifTrueSuccess, getMyDetailsRequest} from '../../redux/modules';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BackgroundFetch from 'react-native-background-fetch';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;

  const initBackgroundFetch = async () => {
    const onEvent = async taskId => {
      console.log('background fetch task: ', taskId);
      dispatch(
        getMyDetailsRequest(userData?._id, async (fetchedUserData: any) => {
          const unreadCount = fetchedUserData?.notifications?.filter(
            notif => !notif.isRead,
          ).length;
          if (unreadCount) {
            await PushNotificationIOS.setApplicationIconBadgeNumber(
              unreadCount,
            );
          }
          BackgroundFetch.finish(taskId);
        }),
      );
    };

    const onTimeout = async taskId => {
      BackgroundFetch.finish(taskId);
    };
    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 20},
      onEvent,
      onTimeout,
    );
    console.log('Background fetch status', status);
  };

  const onRemoteNotification = useCallback(
    (notification: any) => {
      const notifData = notification.getData();
      const isClicked = notifData.userInteraction === 1;

      if (isClicked) {
        console.log('ISCLICKED', notifData);
        handleNavigation(navigation, notifData, dispatch, userData);
      } else {
        // Do something else with push notification
      }
      const result = PushNotificationIOS.FetchResult.NoData;
      notification.finish(result);
    },
    [dispatch, navigation, userData],
  );

  useEffect(() => {
    if (isLogedIn) {
      initBackgroundFetch();
    }
  }, []);

  useEffect(() => {
    if (isLogedIn) {
      const unreadCount = userData?.notifications?.filter(
        notif => !notif.isRead,
      ).length;
      if (unreadCount) {
        PushNotificationIOS.setApplicationIconBadgeNumber(unreadCount);
      }
    }
  }, [userData?.notifications]);

  useEffect(() => {
    PushNotificationIOS.addEventListener(
      'localNotification',
      onRemoteNotification,
    );

    const unsubscribeOnMessage = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('TEST: opened from bg state:', remoteMessage);
        handleNavigation(navigation, remoteMessage, dispatch, userData);
      },
    );

    const unsubscribeOnNotificationOpenedApp = messaging().onMessage(
      remoteMessage => {
        console.log('NEW MESSAGE!!!', remoteMessage);
        dispatch(
          newNotifTrueSuccess({
            notifType: remoteMessage?.data?.notifType,
            objectId: remoteMessage?.data?.objectId,
          }),
        );
        PushNotificationIOS.addNotificationRequest({
          id: remoteMessage?.data?.objectId,
          title: remoteMessage?.notification?.title,
          body: remoteMessage?.notification?.body,
          category: 'localNotification',
          userInfo: {remoteMessage},
          sound: 'default',
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
