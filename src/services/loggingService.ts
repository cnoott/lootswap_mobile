import analytics from '@react-native-firebase/analytics';

export const loggingService = () => {

  const setUserId = (id: string) => {
    analytics().setUserId(id);
  }

  const logEvent = (eventName: string, params?: {[key: string]: any}) => {
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    if (typeof params === 'undefined') {
      params = {}
    }
    params['timestamp'] = currentEpochTime;
    console.log(eventName, params)
    analytics().logEvent(eventName, params);
  }

  const logScreenView = (params: {[key: string]: any}) => {
    const currentEpochTime = Math.floor(new Date().getTime() / 1000);
    if (typeof params === 'undefined') {
      params = {}
    }
    params['timestamp'] = currentEpochTime;
    console.log(params)
    analytics().logScreenView(params);
  }

  return {
    setUserId,
    logEvent,
    logScreenView,
  }
}