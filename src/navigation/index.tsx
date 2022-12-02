/***
LOOTSWAP - NAVIGATION STACK CLASS
***/

import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '../screens/auth/signIn';
import CreateAccountScreen from '../screens/auth/signUp';
import BottomTabs from './bottomTab';
import {AuthProps} from '../redux/modules/auth/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {getInitialRoute} from '../utility/utility';
import LSLoader from '../components/commonComponents/LSLoader';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator
    initialRouteName={'SignInScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="SignInScreen"
      component={AuthScreen}
      options={{presentation: 'modal'}}
    />
    <Stack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreen}
      options={{presentation: 'modal'}}
    />
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
  </Stack.Navigator>
);

const AppNavigation = () => (
  <Stack.Navigator
    initialRouteName={'BottomTabs'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen
      name="SignInScreen"
      component={AuthScreen}
      options={{presentation: 'modal'}}
    />
    <Stack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreen}
      options={{presentation: 'modal'}}
    />
  </Stack.Navigator>
);

const StackNavigator: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {initialScreen, isLoggedIn} = getInitialRoute(auth.userData, dispatch); // Check whether the current session active or not
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={`${initialScreen}`}
        screenOptions={{
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen name="AppScreens" component={AppNavigation} />
        ) : (
          <Stack.Screen name="AuthScreen" component={AuthNavigation} />
        )}
      </Stack.Navigator>
      {<LSLoader isVisible={auth?.isLoading} />}
    </NavigationContainer>
  );
};

export default StackNavigator;
