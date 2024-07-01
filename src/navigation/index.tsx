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
  shouldShowGiveawayRequest,
} from '../redux/modules';
import {AuthProps} from '../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';
import {isReadyRef, navigationRef} from './navigationHelper';
import UserChatScreen from '../screens/message';
import {createStackNavigator} from '@react-navigation/stack';
import CheckoutScreen from '../screens/buy/checkoutScreen';
import PublicProfileScreen from '../screens/profile/publicProfileScreen';
import EditMoneyOfferTradeScreen from '../screens/offers/editMoneyOfferTradeScreen';
import ProfileReviewsScreen from '../screens/profile/profileReviewsScreen';
import ProductDetailsScreen from '../screens/productDetails';
import SendMoneyOfferScreen from '../screens/offers/sendMoneyOfferScreen';
import AddressScreen from '../screens/profile/addressScreen';
import OffersMessageScreen from '../screens/offers/offerMessageScreen';
import TrackOrderScreen from '../screens/order/trackOrderScreen';
import ChooseOfferTypeScreen from '../screens/offers/chooseOfferTypeScreen';
import EditTradeScreen from '../screens/offers/editTradeScreen';
import TradeCheckoutSuccessScreen from '../screens/offers/tradeCheckoutSuccessScreen';
import LootScreen from '../screens/loot';
import StartTradeScreen from '../screens/offers/startTrade';
import DeviceInfo from 'react-native-device-info';
import {Alert as AlertModal} from 'react-native';
import {Linking, AppState} from 'react-native';
import {useNotifications} from '../utility/customHooks/useNotifications';
import useFCMNotifications from '../utility/customHooks/useFCMNotifications';
import useBranch from '../utility/customHooks/useBranch';
import {loggingService} from '../services/loggingService';
import OnboardingScreen from '../screens/onboarding';
import SplashScreen from '../components/SplashScreen';
import CodePush from 'react-native-code-push';

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
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
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
              'Update Available',
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
  }, []);

  useEffect(() => {
    dispatch(shouldShowGiveawayRequest());
  }, []);

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

      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{presentation: 'modal'}}
      />

      <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
      <Stack.Screen
        name="ChooseOfferTypeScreen"
        component={ChooseOfferTypeScreen}
      />
      <Stack.Screen name="AddressScreenCheckout" component={AddressScreen} />
      <Stack.Screen name="AddressScreenBuyCheckout" component={AddressScreen} />
      <Stack.Screen
        name="BuyCheckoutSuccessScreen"
        component={TradeCheckoutSuccessScreen}
      />
      <Stack.Screen
        name="TradeCheckoutSuccessScreen"
        component={TradeCheckoutSuccessScreen}
      />
      <Stack.Screen name="StartTradeScreen" component={StartTradeScreen} />
      <Stack.Screen name="LootScreen" component={LootScreen} />
      <Stack.Screen
        name="SendMoneyOfferScreen"
        component={SendMoneyOfferScreen}
      />
      <Stack.Screen
        name="OffersMessageScreen"
        component={OffersMessageScreen}
      />
      <Stack.Screen
        name="MoneyOfferCheckoutScreen"
        component={CheckoutScreen}
      />
      <Stack.Screen
        name="EditMoneyOfferTradeScreen"
        component={EditMoneyOfferTradeScreen}
      />
      <Stack.Screen name="EditTradeScreen" component={EditTradeScreen} />
      <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
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
interface StackNavigatorProps {
  isSplashVisible: boolean;
  progress: number;
}
const StackNavigator: FC<StackNavigatorProps> = ({isSplashVisible, progress}) => {
  const loading: LoadingProps = useSelector(state => state.loading);
  const navRef = useRef();
  const onNavigationReady = () => {
    navRef.current = navigationRef.current.getCurrentRoute().name;
    isReadyRef.current = true;
  };

  const linking = {
    // wtf
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
        initialRouteName={isSplashVisible ? 'SplashScreen' : 'AppScreens'}
        screenOptions={{
          headerShown: false,
        }}>
        {isSplashVisible ? (
          <Stack.Screen name="SplashScreen">
            {props => <SplashScreen {...props} progress={progress} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="AppScreens" component={AppNavigation} />
        )}
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
