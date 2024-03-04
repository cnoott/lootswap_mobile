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

let codePushOptions = {
  updateDialog: true,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME, //might change it to ON_NEXT_RESUME if its too jarring
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      googleServicePlistPath: __DEV__
        ? 'GoogleService-Info-Dev'
        : 'GoogleService-Info-Prod',
    });
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
