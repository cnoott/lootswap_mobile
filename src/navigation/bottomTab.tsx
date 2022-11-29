/***
LootSwap - BOTTOM TABS SCREEN
***/

import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import DashboardScreen from '../screens/dashboard';
import ActivitiesScreen from '../screens/activities';
import BrowseScreen from '../screens/browse';
import Settingscreen from '../screens/settings';
import {useTheme} from 'styled-components';
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  HOME_BOTTOM_TAB,
  PROFILE_BOTTOM_TAB,
  OFFERS_BOTTOM_TAB,
  ADD_LOOT_BOTTOM_TAB,
  NOTIFICATIONS_BOTTOM_TAB,
} from '../constants/constants';
import {verticalScale, moderateScale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (isFocused?: boolean, route?: string, styles?: any) => {
  let _source = HOME_BOTTOM_TAB;
  switch (route) {
    case 'Home':
      _source = HOME_BOTTOM_TAB;
      break;
    case 'Offers':
      _source = OFFERS_BOTTOM_TAB;
      break;
    case 'Profile':
      _source = PROFILE_BOTTOM_TAB;
      break;
    case 'Notifications':
      _source = NOTIFICATIONS_BOTTOM_TAB;
      break;
    case 'Add loot':
      _source = ADD_LOOT_BOTTOM_TAB;
      break;
    default:
      break;
  }
  if (isFocused) {
    return (
      <Image
        style={[styles.bottomBarImg, {tintColor: '#000'}]}
        source={_source}
        resizeMode={'contain'}
      />
    );
  } else {
    return (
      <Image
        style={[styles.bottomBarImg]}
        source={_source}
        resizeMode={'contain'}
      />
    );
  }
};

export const BottomTabs: FC<{}> = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  /**
   *
   * Custom Tab Bar
   */
  const MyCustomTabBar = ({state, descriptors, navigation}) => {
    return (
      <View style={styles.tabBarContainer}>
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
              if (index !== 0) {
                navigation.navigate('AuthScreen');
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
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
              style={{flex: 1, alignItems: 'center'}}>
              <View style={[{alignItems: 'center', justifyContent: 'center'}]}>
                {getTabBarIcon(isFocused, route.name, styles)}
                <Text
                  style={isFocused ? styles.tabLabelSelected : styles.tabLabel}>
                  {route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}
      tabBar={props => <MyCustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ActivitiesScreen} />
      <Tab.Screen name="Notifications" component={BrowseScreen} />
      <Tab.Screen name="Add loot" component={Settingscreen} />
    </Tab.Navigator>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: moderateScale(75),
      backgroundColor: theme.colors.white,
      shadowColor:
        Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.2)' : theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16,
      elevation: 24,
      paddingBottom: moderateScale(15),
    },
    bottomBarImg: {
      marginTop: moderateScale(2),
      width: verticalScale(18),
      height: verticalScale(18),
    },
    tabLabel: {
      color: theme.colors.placeholder,
      fontSize: moderateScale(10),
      marginTop: moderateScale(2),
      fontWeight: '600',
    },
    tabLabelSelected: {
      color: theme.colors.primary,
      fontSize: moderateScale(10),
      marginTop: moderateScale(2),
      fontWeight: '800',
    },
  });

export default BottomTabs;
