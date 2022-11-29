/***
INSQUAD - BOTTOM TABS SCREEN
***/

import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import DashboardScreen from '../screens/dashboard';
import ActivitiesScreen from '../screens/activities';
import BrowseScreen from '../screens/browse';
import Settingscreen from '../screens/settings';
import { useTheme } from 'styled-components';
import { Image } from 'react-native';
import {
  WALLET,
  DASHBOARD,
  SWAP,
  TELESCOPE,
  SETTINGS,
  DASHBOARD_ACTIVE,
  SWAP_ACTIVE,
  TELESCOPE_ACTIVE,
  WALLET_ACTIVE,
  SETTINGS_ACTIVE,
} from '../constants/constants';
import { verticalScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const renderIcon = (icon: any, needAdjustment = false) => {
  return (
    <Image
      style={{
        width: verticalScale(needAdjustment ? 22 : 18),
        height: verticalScale(needAdjustment ? 22 : 18),
      }}
      source={icon}
      resizeMode={'contain'}
    />
  );
};

export const BottomTabs: FC<{}> = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}>
      <Tab.Screen
        name="1"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (focused ? renderIcon(WALLET_ACTIVE) : renderIcon(WALLET)),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="2"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? renderIcon(DASHBOARD_ACTIVE) : renderIcon(DASHBOARD),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="3"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? renderIcon(SWAP_ACTIVE, true) : renderIcon(SWAP, true),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="4"
        component={BrowseScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? renderIcon(TELESCOPE_ACTIVE, true) : renderIcon(TELESCOPE, true),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="5"
        component={Settingscreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? renderIcon(SETTINGS_ACTIVE) : renderIcon(SETTINGS),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
