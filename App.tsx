/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components';
import ReduxStore from './src/redux/store/store';
import theme from './src/theme';
import StackNavigator from './src/navigation';

const App = () => {
  return (
    <Provider store={ReduxStore.store}>
      <PersistGate loading={null} persistor={ReduxStore.persistor}>
        <ThemeProvider theme={theme}>
          <StackNavigator />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
