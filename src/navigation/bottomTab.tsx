/***
LootSwap - BOTTOM TABS SCREEN
***/

import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import BrowseScreen from '../screens/browse';
import ProfileScreen from '../screens/profile';
import {useTheme} from 'styled-components';
import {StyleSheet, Platform, View, TouchableOpacity, Text} from 'react-native';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {SvgXml} from 'react-native-svg';
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

const Tab = createBottomTabNavigator();

const getTabBarIcon = (isFocused?: boolean, route?: string) => {
  let _source = BOTTOM_TAB_HOME;
  switch (route) {
    case 'Home':
      _source = isFocused ? BOTTOM_TAB_HOME_SELECTED : BOTTOM_TAB_HOME;
      break;
    case 'Offers':
      _source = isFocused ? BOTTOM_TAB_OFFERS_SELECTED : BOTTOM_TAB_OFFERS;
      break;
    case 'Profile':
      _source = isFocused ? BOTTOM_TAB_PROFILE_SELECTED : BOTTOM_TAB_PROFILE;
      break;
    case 'Notifications':
      _source = isFocused
        ? BOTTOM_TAB_NOTIFICATION_SELECTED
        : BOTTOM_TAB_NOTIFICATION;
      break;
    case 'Add loot':
      _source = isFocused ? BOTTOM_TAB_LOOT_SELECTED : BOTTOM_TAB_LOOT;
      break;
    default:
      break;
  }
  return <SvgXml xml={_source} />;
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
              if ([1, 3, 4].includes(index)) {
                navigation.navigate('SignInScreen');
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
                {getTabBarIcon(isFocused, route.name)}
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
      <Tab.Screen name="Offers" component={BrowseScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={BrowseScreen} />
      <Tab.Screen name="Add loot" component={BrowseScreen} />
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
