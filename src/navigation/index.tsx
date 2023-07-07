/***
  LOOTSWAP - NAVIGATION STACK CLASS
 ***/

import React, {FC, useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import AuthScreen from '../screens/auth/signIn';
import CreateAccountScreen from '../screens/auth/signUp';
import BottomTabs from './bottomTab';
import {useSelector, useDispatch} from 'react-redux';
import LSLoader from '../components/commonComponents/LSLoader';
import {LoadingProps} from '../redux/modules/loading/reducer';
import {versionCheck, newNotifTrueSuccess} from '../redux/modules';
import {Alert} from 'custom_top_alert';
import {isReadyRef, navigationRef} from './navigationHelper';
import UserChatScreen from '../screens/message';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import CheckoutScreen from '../screens/buy/checkoutScreen';
import PublicProfileScreen from '../screens/profile/publicProfileScreen';
import ProfileReviewsScreen from '../screens/profile/profileReviewsScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {handleNavigation} from '../utility/notification';
import messaging from '@react-native-firebase/messaging';
import ProductDetailsScreen from '../screens/productDetails';
import OffersMessageScreen from '../screens/offers/offerMessageScreen';
import TrackOrderScreen from '../screens/order/trackOrderScreen';
import DeviceInfo from 'react-native-device-info';
import {Alert as AlertModal} from 'react-native';
import {Linking} from 'react-native';
import branch from 'react-native-branch';
import {AuthProps} from '../../redux/modules/auth/reducer';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const [loading, setLoading] = useState(true);

  const needsAppStoreUpdate(version: String) => {
    // APPSTORE == the app needs to be updated through the AppStore and not automatically
    if (!version.includes(DeviceInfo.getVersion()) && version.includes('APPSTORE')) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(
      versionCheck(
        latestVersionRes => {
          if (needsAppStoreUpdate(latestVersionRes)) {
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

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('TEST: opened from bg state:', remoteMessage);
      handleNavigation(navigation, remoteMessage, dispatch, userData);
    });

    messaging().onMessage(async () => {
      console.log('NEW MESSAGE!!!');
      dispatch(newNotifTrueSuccess());
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'TEST: notificaiton opened from quit state',
            remoteMessage.notification,
          );
          handleNavigation(navigation, remoteMessage, dispatch, userData);
        }
        setLoading(false);
      });
  }, [navigation, dispatch, userData]);

  if (loading) {
    return null;
  }

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

  const linking = {
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
