/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';
import ReduxStore from './src/redux/store/store';
import theme from './src/theme';
import StackNavigator from './src/navigation';
import {StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import {PUSHER_API_KEY, UXCAM_API_KEY} from '@env';
import RNUxcam from 'react-native-ux-cam';

let codePushOptions = {
  updateDialog: false,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      googleServicePlistPath: __DEV__
        ? 'GoogleService-Info-Dev'
        : 'GoogleService-Info-Prod',
    });


    RNUxcam.optIntoSchematicRecordings(); // Add this line to enable iOS screen recordings
    const configuration = {
      userAppKey: UXCAM_API_KEY,
      enableAutomaticScreenNameTagging: false,
      enableAdvancedGestureRecognition: true,
      enableImprovedScreenCapture: true,
      //occlusions?: UXCamOcclusion[],
    }
    RNUxcam.startWithConfiguration(configuration);

    const initPusher = async () => {
      const pusher = Pusher.getInstance();
      await pusher.init({
        apiKey: PUSHER_API_KEY,
        cluster: 'us2',
      });

      await pusher.connect();
    };

    initPusher();
  }, []);

  return (
    <Provider store={ReduxStore.store}>
      <StatusBar barStyle={'dark-content'} />
      <PersistGate loading={null} persistor={ReduxStore.persistor}>
        <ThemeProvider theme={theme}>
          <StackNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
