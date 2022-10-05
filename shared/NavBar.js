import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import Profile from '../components/user/Profile';
import AddLoot from '../components/AddLoot';
import Orders from '../components/Orders';
import Notifications from '../components/Notifications';
import Logo from '../assets/logo.png';
import Bell from '../assets/bell.png';
import HomeIcon from '../assets/home.png';
import AddLootIcon from '../assets/add-loot.png';
import OrdersIcon from '../assets/orders.png';
import OffersIcon from '../assets/offers.png';
import ProfileIcon from '../assets/profile.png';


import SplashScreen from '../shared/SplashScreen';
import Signin from '../components/user/Signin';
import Signup from '../components/user/Signup';
import { isAuthenticated } from '../api/auth';

import { useUserContext, useUserLoading } from './UserContext';


const TopLogo = () => (
    <Image
        source={Logo}
        style={{ height: 35, width: 186 }}
    />
);

const NotifButton = () => (
    <Image
        source={Bell}
        style={{ height: 25, width: 25, right: 10}}
    />
);

const TabIcon = ({source}) => (
    <Image
        source={source}
        style={{ height: 23, width: 23}}
    />
);

//TODO: 
// - So where would a page that isnt accessable from the navbar go (like 
//    > Probably like: (from HomeScreen -> on product click import Product and go to it using navigation
// - Get Navbar Icons to work
// - isSigned in state that shows different navigators
// - splsh screen

const NavBar = () => {
    const [loadingAuth, setLoadingAuth] = useState(true);

    const userData = useUserContext();
    const userLoading = useUserLoading();

    if (userLoading) {
        return <SplashScreen/>
    }

    const MainNavigator = () => {
        const Tab = createBottomTabNavigator();
        const BlankComponent = () => <View style={{ flex: 1, backgroundColor: 'white' }} />


        return (
            <Tab.Navigator
                screenOptions={{ 
                    headerTitle: () => <TopLogo/>,
                    headerRight: () => <NotifButton/>
                }}
            >
                { userData === null ? (
                    <>
                        <Tab.Screen 
                            name='Home' 
                            component={HomeScreen}
                            options={{ tabBarIcon: () => <TabIcon source={HomeIcon} /> }}
                        />

                        <Tab.Screen 
                            name='Add Loot' 
                            component={BlankComponent}
                            options={{ tabBarIcon: () => <TabIcon source={AddLootIcon} /> }}
                            listeners={({ navigation }) => ({
                                tabPress: e => {
                                    e.preventDefault()
                                    navigation.navigate('signin')
                                },
                            })}
                        />
                        <Tab.Screen 
                            name='Orders' 
                            component={BlankComponent}
                            options={{ tabBarIcon: () => <TabIcon source={OrdersIcon} /> }}
                            listeners={({ navigation }) => ({
                                tabPress: e => {
                                    e.preventDefault()
                                    navigation.navigate('signin')
                                },
                            })}
                        />
                        <Tab.Screen 
                            name='Offers' 
                            component={BlankComponent}
                            options={{ tabBarIcon: () => <TabIcon source={OffersIcon} /> }}
                            listeners={({ navigation }) => ({
                                tabPress: e => {
                                    e.preventDefault()
                                    navigation.navigate('signin')
                                },
                            })}
                        />
                        <Tab.Screen 
                            name='Profile' 
                            options={{ tabBarIcon: () => <TabIcon source={ProfileIcon} /> }}
                            component={BlankComponent}
                            listeners={({ navigation }) => ({
                                tabPress: e => {
                                    e.preventDefault()
                                    navigation.navigate('signin')
                                },
                            })}
                        />
                    </>
                ) : (
                    <>
                        <Tab.Screen 
                            name='Home' 
                            component={HomeScreen}
                            options={{ tabBarIcon: () => <TabIcon source={HomeIcon} /> }}
                        />

                        <Tab.Screen 
                            name='Add Loot' 
                            component={AddLoot}
                            options={{ tabBarIcon: () => <TabIcon source={AddLootIcon} /> }}
                        />
                        <Tab.Screen 
                            name='Orders' 
                            component={Orders}
                            options={{ tabBarIcon: () => <TabIcon source={OrdersIcon} /> }}
                        />
                        <Tab.Screen 
                            name='Offers' 
                            component={Notifications}
                            options={{ tabBarIcon: () => <TabIcon source={OffersIcon} /> }}
                        />
                        <Tab.Screen 
                            name='Profile' 
                            component={Profile}
                            options={{ tabBarIcon: () => <TabIcon source={ProfileIcon} /> }}
                        />
                    </>
                )}
            </Tab.Navigator>
        );
    };
    
    const RootStack = createStackNavigator();

    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Group>
                <RootStack.Screen name='main' component={MainNavigator}/>
            </RootStack.Group>

            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name='signin' component={Signin}/>
                <RootStack.Screen name='signup' component={Signup}/>
            </RootStack.Group>
        </RootStack.Navigator>
    );

};

export default NavBar;
