import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {setFCMTokenRequest} from '../../redux/modules';
import Config from 'react-native-config';

const checkForPermissionGranted = (status: any) => {
  return (
    status === messaging.AuthorizationStatus.AUTHORIZED ||
    status === messaging.AuthorizationStatus.PROVISIONAL
  );
};

const useFCMNotifications = () => {
  const dispatch = useDispatch();

  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn, fcmToken} = auth;

  useEffect(() => {
    console.log('setting reg here', fcmToken);

    if (!fcmToken || new Date() > new Date(fcmToken?.expiry)) {
      configureNotifPermission();
    }
    console.log('Environment ====', Config?.ENV);
  }, []);

  const configureNotifPermission = async () => {
    const permissionStatus = await messaging().hasPermission();
    const isPermissionGranted = checkForPermissionGranted(permissionStatus);
    if (isPermissionGranted) {
      registerDeviceAndGetToken();
    } else {
      const authStatus = await messaging().requestPermission();
      const isGranted = checkForPermissionGranted(authStatus);
      if (isGranted) {
        registerDeviceAndGetToken();
      }
    }
  };
  const registerDeviceAndGetToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    console.log('setting reg');

    if (token) {
      const userId = isLogedIn ? userData?._id : null;
      const tokenData = {token, expiry, userId};

      console.log('FCM Token ====', tokenData);
      dispatch(setFCMTokenRequest(tokenData));
    }
  };
};

export default useFCMNotifications;
