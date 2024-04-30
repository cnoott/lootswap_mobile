import analytics from '@react-native-firebase/analytics';
import RNUxcam from 'react-native-ux-cam';

declare type Status = 'logged_in' | 'not_logged_in';

const getCurrentEpochTime = (): number =>
  Math.floor(new Date().getTime() / 1000);

export const loggingService = () => {
  const setUserName = (name: string) => {
    RNUxcam.setUserIdentity(name);
    console.log('set user name:', name);
  };

  const setUserStatus = (status: Status) => {
    analytics().setUserProperties({user_status: status});
    console.log('set user status:', status);
  };

  const logEvent = (eventName: string, params: {[key: string]: any} = {}) => {
    const currentEpochTime = getCurrentEpochTime();
    params['timestamp'] = currentEpochTime;
    console.log(eventName, params);
    analytics().logEvent(eventName, params);
    RNUxcam.logEvent(eventName, params);
  };

  const logScreenView = (params: {[key: string]: any} = {}) => {
    const currentEpochTime = getCurrentEpochTime();
    params['timestamp'] = currentEpochTime;
    console.log(params);
    analytics().logScreenView(params);
  };

  return {
    setUserName,
    setUserStatus,
    logEvent,
    logScreenView,
  };
};
