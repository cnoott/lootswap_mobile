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
import branch from 'react-native-branch'

const App = () => {
  useEffect(() => {
    branch.subscribe(async ({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }
      // params will never be null if error is null
      let installParams = await branch.getFirstReferringParams();
      console.log('from app.js', installParams);
    })
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

export default App;
