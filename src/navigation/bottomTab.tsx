/***
LootSwap - BOTTOM TABS SCREEN
***/

import React, {FC, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import LikedProductScreen from '../screens/home/likedProductScreen';
import ProfileScreen from '../screens/profile';
import EditProfileScreen from '../screens/profile/editProfile';
import AddressScreen from '../screens/profile/addressScreen';
import NotificationSettingScreen from '../screens/profile/notificationSettings';
import WalletScreen from '../screens/profile/walletScreen';
import ReferralScreen from '../screens/profile/referralScreen';
import ProductDetailsScreen from '../screens/productDetails';
import LootScreen from '../screens/loot';
import MyLootScreen from '../screens/loot/myLoot';
import AddProductOverviewScreen from '../screens/loot/addProductOverview';
import NotificationsScreen from '../screens/notifications';
import OffersScreen from '../screens/offers';
import OffersMessageScreen from '../screens/offers/offerMessageScreen';
import TradeCheckoutScreen from '../screens/offers/tradeCheckoutScreen';
import TradeCheckoutSuccessScreen from '../screens/offers/tradeCheckoutSuccessScreen';
import CheckoutScreen from '../screens/buy/checkoutScreen';
import MyOrdersListScreen from '../screens/order/myOrdersListScreen';
import TrackOrderScreen from '../screens/order/trackOrderScreen';
import SubmitReviewScreen from '../screens/order/submitReviewScreen';
import ShippingLabelScreen from '../screens/order/shippingLabelScreen';
import ChooseServiceScreen from '../screens/order/chooseServiceScreen';
import {useTheme} from 'styled-components';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {getInitialRoute} from '../utility/utility';
import {AuthProps} from '../redux/modules/auth/reducer';
import {
  BOTTOM_TAB_HOME,
  BOTTOM_TAB_HOME_SELECTED,
  BOTTOM_TAB_LOOT,
  BOTTOM_TAB_LOOT_SELECTED,
  BOTTOM_TAB_PROFILE,
  BOTTOM_TAB_PROFILE_SELECTED,
  BOTTOM_TAB_NOTIFICATION,
  BOTTOM_TAB_NOTIFICATION_SELECTED,
  BOTTOM_TAB_OFFERS,
  BOTTOM_TAB_OFFERS_SELECTED,
} from 'localsvgimages';
import {
  TabBarContainer,
  TabItemTouchable,
  TabItemContainer,
  TabItemText,
} from './styles';
import PublicProfileScreen from '../screens/profile/publicProfileScreen';
import ListLootSuccessScreen from '../screens/loot/listLootSuccessScreen';
import PayPalLinkModal from '../components/paypalLinkModal';
import LinkPaypalScreen from '../screens/profile/linkPaypalScreen';
import LootEditAddressScreen from '../screens/loot/lootEditAddressScreen';
import {BOTTOM_TAB_NOTIFICATION_NEW} from '../assets/images/svgs';
import StartTradeScreen from '../screens/offers/startTrade';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigation = () => (
  <Stack.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="LikedProductScreen" component={LikedProductScreen} />
    <Stack.Screen name="LinkPaypalScreen" component={LinkPaypalScreen} />
    <Stack.Screen
      name="LootEditAddressScreen"
      component={LootEditAddressScreen}
    />
    <Stack.Screen
      name="ProductDetailsScreen"
      component={ProductDetailsScreen}
    />
    <Stack.Screen name="StartTradeScreen" component={StartTradeScreen} />
    <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen} />
    <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    <Stack.Screen name="AddressScreenBuyCheckout" component={AddressScreen} />
    <Stack.Screen
      name="BuyCheckoutSuccessScreen"
      component={TradeCheckoutSuccessScreen}
    />
  </Stack.Navigator>
);

const ProfileStackNavigation = () => (
  <Stack.Navigator
    initialRouteName={'ProfileScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="AddressScreen" component={AddressScreen} />
    <Stack.Screen name="MyLootScreen" component={MyLootScreen} />
    <Stack.Screen
      name="NotificationSettingScreen"
      component={NotificationSettingScreen}
    />
    <Stack.Screen name="LootScreen" component={LootScreen} />
    <Stack.Screen
      name="AddProductOverviewScreen"
      component={AddProductOverviewScreen}
    />
    <Stack.Screen name="MyOrdersListScreen" component={MyOrdersListScreen} />
    <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
    <Stack.Screen name="TradeCheckoutScreen" component={TradeCheckoutScreen} />
    <Stack.Screen name="SubmitReviewScreen" component={SubmitReviewScreen} />
    <Stack.Screen name="ShippingLabelScreen" component={ShippingLabelScreen} />
    <Stack.Screen name="ChooseServiceScreen" component={ChooseServiceScreen} />
    <Stack.Screen
      name="TradeCheckoutSuccessScreen"
      component={TradeCheckoutSuccessScreen}
    />
    <Stack.Screen name="WalletScreen" component={WalletScreen} />
    <Stack.Screen name="ReferralScreen" component={ReferralScreen} />
  </Stack.Navigator>
);

const LootStackNavigation = () => (
  <Stack.Navigator
    initialRouteName={'LootScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="LootScreen" component={LootScreen} />
    <Stack.Screen name="MyLootScreen" component={MyLootScreen} />
    <Stack.Screen
      name="LootEditAddressScreen"
      component={LootEditAddressScreen}
    />
    <Stack.Screen
      name="ProductDetailsMyLootScreen"
      component={ProductDetailsScreen}
    />
    <Stack.Screen
      name="AddProductOverviewScreen"
      component={AddProductOverviewScreen}
    />
    <Stack.Screen
      name="ListLootSuccessScreen"
      component={ListLootSuccessScreen}
    />
  </Stack.Navigator>
);

const OffersStackNavigation = () => (
  <Stack.Navigator
    initialRouteName={'OffersScreen'}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="OffersScreen" component={OffersScreen} />
    <Stack.Screen name="OffersMessageScreen" component={OffersMessageScreen} />
    <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen} />
    <Stack.Screen name="TradeCheckoutScreen" component={TradeCheckoutScreen} />
    <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
    <Stack.Screen name="SubmitReviewScreen" component={SubmitReviewScreen} />
    <Stack.Screen name="MoneyOfferCheckoutScreen" component={CheckoutScreen} />
    <Stack.Screen name="AddressScreenCheckout" component={AddressScreen} />
    <Stack.Screen
      name="TradeCheckoutSuccessScreen"
      component={TradeCheckoutSuccessScreen}
    />
    <Stack.Screen
      name="ProductDetailsScreen"
      component={ProductDetailsScreen}
    />
  </Stack.Navigator>
);

const getTabBarIcon = (isFocused?: boolean, route?: string, userData: any) => {
  let _source = BOTTOM_TAB_HOME;
  switch (route) {
    case 'Home':
      _source = isFocused ? BOTTOM_TAB_HOME_SELECTED : BOTTOM_TAB_HOME;
      break;
    case 'Offers/Inbox':
      _source = isFocused ? BOTTOM_TAB_OFFERS_SELECTED : BOTTOM_TAB_OFFERS;
      break;
    case 'Profile':
      _source = isFocused ? BOTTOM_TAB_PROFILE_SELECTED : BOTTOM_TAB_PROFILE;
      break;
    case 'Notifications':
      console.log('new notif', userData?.newNotification);
      if (userData?.newNotification) {
        _source = BOTTOM_TAB_NOTIFICATION_NEW;
        break;
      }
      _source = isFocused
        ? BOTTOM_TAB_NOTIFICATION_SELECTED
        : BOTTOM_TAB_NOTIFICATION;
      break;
    case 'List loot':
      _source = isFocused ? BOTTOM_TAB_LOOT_SELECTED : BOTTOM_TAB_LOOT;
      break;
    default:
      break;
  }
  return <SvgXml xml={_source} />;
};

export const BottomTabs: FC<{}> = () => {
  const theme = useTheme();
  /**
   *
   * Custom Tab Bar
   */
  const MyCustomTabBar = ({state, descriptors, navigation}) => {
    const auth: AuthProps = useSelector(reduxState => reduxState.auth);
    const {isLoggedIn} = getInitialRoute(auth.userData);
    const [isPayPalModalVisible, setPayPalModalVisible] = useState(false);
    return (
      <TabBarContainer>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              if (!isLoggedIn && [1, 2, 3, 4].includes(index)) {
                navigation.navigate('SignInScreen');
              } else if (index === 1 && !auth?.userData?.paypal_onboarded) {
                setPayPalModalVisible(true);
              } else if (
                index === 1 &&
                Object.keys(auth.userData?.shipping_address).length < 4
              ) {
                navigation.navigate('LootEditAddressScreen');
              } else {
                navigation.navigate({name: route.name, merge: true});
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItemTouchable
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}>
              <TabItemContainer>
                {getTabBarIcon(isFocused, route.name, auth.userData)}
                <TabItemText isActive={isFocused}>{route.name}</TabItemText>
              </TabItemContainer>
              <PayPalLinkModal
                isPayPalModalVisible={isPayPalModalVisible}
                setPayPalModalVisible={setPayPalModalVisible}
              />
            </TabItemTouchable>
          );
        })}
      </TabBarContainer>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}
      initialRouteName={'Home'}
      tabBar={props => <MyCustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen
        name="List loot"
        component={LootStackNavigation}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name="Profile" component={ProfileStackNavigation} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Offers/Inbox" component={OffersStackNavigation} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
