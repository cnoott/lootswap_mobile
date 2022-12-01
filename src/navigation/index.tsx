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
const Stack = createNativeStackNavigator();

const StackNavigator: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const initialScreen = getInitialRoute(auth.data?.loginTime, dispatch); // Check whether the current session active or not
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={`${initialScreen}`}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="AuthScreen"
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
    </NavigationContainer>
  );
};

export default StackNavigator;
