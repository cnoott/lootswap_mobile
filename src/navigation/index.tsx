/***
  LOOTSWAP - NAVIGATION STACK CLASS
 ***/

import React, {FC, useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import AuthScreen from '../screens/auth/signIn';
import CreateAccountScreen from '../screens/auth/signUp';
import EmailSignupScreen from '../screens/auth/signUp/emailSignupScreen';
import BottomTabs from './bottomTab';
import {useSelector, useDispatch} from 'react-redux';
import LSLoader from '../components/commonComponents/LSLoader';
import {LoadingProps} from '../redux/modules/loading/reducer';
import {
  versionCheck,
  getMyDetailsNoLoadRequest,
  getTradesHistory,
  getAllMyMessages,
} from '../redux/modules';
import {AuthProps} from '../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';
import {isReadyRef, navigationRef} from './navigationHelper';
import UserChatScreen from '../screens/message';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import CheckoutScreen from '../screens/buy/checkoutScreen';
import PublicProfileScreen from '../screens/profile/publicProfileScreen';
import ProfileReviewsScreen from '../screens/profile/profileReviewsScreen';
import ProductDetailsScreen from '../screens/productDetails';
import OffersMessageScreen from '../screens/offers/offerMessageScreen';
import TrackOrderScreen from '../screens/order/trackOrderScreen';
import DeviceInfo from 'react-native-device-info';
import {Alert as AlertModal} from 'react-native';
import {Linking, AppState} from 'react-native';
import {useNotifications} from '../utility/customHooks/useNotifications';
import useFCMNotifications from '../utility/customHooks/useFCMNotifications';
import useBranch from '../utility/customHooks/useBranch';
import {loggingService} from '../services/loggingService';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData, isLogedIn} = auth;
  const appState = useRef(AppState.currentState);

  useNotifications();
  useFCMNotifications();
  useBranch();

  useEffect(() => {
    if (isLogedIn) {
      console.log('cdalling here');
      dispatch(getMyDetailsNoLoadRequest(userData?._id));
    }
  }, [isLogedIn]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('back from bg home');
        if (isLogedIn) {
          dispatch(getMyDetailsNoLoadRequest(userData?._id));
          dispatch(
            getTradesHistory({
              userId: userData?._id,
            }),
          );
          dispatch(getAllMyMessages(userData?._id));
        }
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    dispatch(
      versionCheck(
        (latestVersionRes: String) => {
          if (latestVersionRes !== DeviceInfo.getVersion()) {
            AlertModal.alert(
              'Update Avaliable',
              'In order to continue using lootswap, you must update to the latest version',
              [
                {
                  text: 'Update',
                  onPress: () =>
                    Linking.openURL(
                      'https://apps.apple.com/us/app/lootswap/id6445904189',
                    ),
                  style: 'default',
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
            );
          }
        },
        error => {
          console.log('err in fetching version: ', error);
        },
      ),
    );
  }, [dispatch]);

  return (
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
      <Stack.Screen
        name="EmailSignupScreen"
        component={EmailSignupScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
      <Stack.Screen
        name="OffersMessageScreen"
        component={OffersMessageScreen}
      />
      <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <Stack.Screen
        name="ProductDetailsChatScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="PublicProfileScreen"
        component={PublicProfileScreen}
      />
      <Stack.Screen
        name="ProfileReviewsScreen"
        component={ProfileReviewsScreen}
      />
    </Stack.Navigator>
  );
};

const StackNavigator: FC<{}> = () => {
  const loading: LoadingProps = useSelector(state => state.loading);
  const navRef = useRef();
  const onNavigationReady = () => {
    SplashScreen.hide();
    navRef.current = navigationRef.current.getCurrentRoute().name;
    isReadyRef.current = true;
  };

  const linking = { // wtf
    prefixes: ['lootswap://'],
    config: {
      screens: {
        AppScreens: {
          screens: {
            BottomTabs: {
              screens: {
                Profile: {
                  screens: {
                    ProfileScreen: 'profile',
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigationReady}
      onStateChange={async () => {
        const previousRouteName = navRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          loggingService().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        navRef.current = currentRouteName;
      }}
      linking={linking}>
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
