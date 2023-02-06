/***
LOOTSWAP - NAVIGATION STACK CLASS
***/

import React, {FC, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import AuthScreen from '../screens/auth/signIn';
import CreateAccountScreen from '../screens/auth/signUp';
import BottomTabs from './bottomTab';
import {useSelector} from 'react-redux';
import LSLoader from '../components/commonComponents/LSLoader';
import {LoadingProps} from '../redux/modules/loading/reducer';
import {Alert} from 'custom_top_alert';
import {isReadyRef, navigationRef} from './navigationHelper';
import UserChatScreen from '../screens/message';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import CheckoutScreen from '../screens/buy/checkoutScreen';
import PublicProfileScreen from '../screens/profile/publicProfileScreen';
import ProfileReviewsScreen from '../screens/profile/profileReviewsScreen';

const Stack = createStackNavigator();

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
    <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
    <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen} />
    <Stack.Screen
      name="ProfileReviewsScreen"
      component={ProfileReviewsScreen}
    />
  </Stack.Navigator>
);

const StackNavigator: FC<{}> = () => {
  const loading: LoadingProps = useSelector(state => state.loading);
  const navRef = useRef();
  const onNavigationReady = () => {
    SplashScreen.hide();
    navRef.current = navigationRef.current.getCurrentRoute().name;
    isReadyRef.current = true;
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <Stack.Navigator
        initialRouteName={'AppScreens'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AppScreens" component={AppNavigation} />
      </Stack.Navigator>
      {<LSLoader isVisible={loading?.isLoading} />}
      {
        <DropdownAlert
          ref={ref => {
            Alert.setDropDown(ref);
          }}
          renderImage={() => null}
          tapToCloseEnabled
          useNativeDriver
          closeInterval={2000}
          startDelta={-300}
        />
      }
    </NavigationContainer>
  );
};

export default StackNavigator;
