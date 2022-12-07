/***
LootSwap - BOTTOM TABS SCREEN
***/

import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import BrowseScreen from '../screens/browse';
import ProfileScreen from '../screens/profile';
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
  /**
   *
   * Custom Tab Bar
   */
  const MyCustomTabBar = ({state, descriptors, navigation}) => {
    const auth: AuthProps = useSelector(state => state.auth);
    const {isLoggedIn} = getInitialRoute(auth.userData);
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
                {getTabBarIcon(isFocused, route.name)}
                <TabItemText isActive={isFocused}>{route.name}</TabItemText>
              </TabItemContainer>
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
      tabBar={props => <MyCustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Offers" component={BrowseScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={BrowseScreen} />
      <Tab.Screen name="Add loot" component={BrowseScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
