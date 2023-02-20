import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
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
  useEffect(() => {
    configureNotifPermission();
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
    if (token) {
      dispatch(setFCMTokenRequest(token));
    }
  };
};

export default useFCMNotifications;
