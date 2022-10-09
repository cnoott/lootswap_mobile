import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { Image, Text, View, Pressable} from 'react-native';
import HomeScreen from '../components/home/HomeScreen';
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
import ProductPage from '../components/product_page/ProductPage';


import SplashScreen from '../shared/SplashScreen';
import Signin from '../components/user/Signin';
import Signup from '../components/user/Signup';
import { isAuthenticated } from '../api/auth';

import { useUserContext, useUserLoading, useIsHome, useUpdateIsHome } from './UserContext';

import Svg, { Path } from 'react-native-svg'


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

const BackIcon = ({isHome, setIsHome, navigation}) => {
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="black"
                viewBox="0 0 51 24"
                onPress={() => navigation.goBack()}
            >

                {!isHome && (<Path d="M15.75 19.5 8.25 12l7.5-7.5" />)}
            </Svg>
        );
};


const NavBar = () => {
    const [loadingAuth, setLoadingAuth] = useState(true);

    const userData = useUserContext();
    const userLoading = useUserLoading();

    const isHome = useIsHome();
    const setIsHome = useUpdateIsHome();

    if (userLoading) {
        return <SplashScreen/>
    }

    const MainNavigator = ({ navigation }) => {
        const Tab = createBottomTabNavigator();
        const BlankComponent = () => <View style={{ flex: 1, backgroundColor: 'white' }} />

            return (
                <Tab.Navigator
                    screenOptions={{ 
                        headerTitle: () => <TopLogo/>,
                        headerRight: () => <NotifButton/>,
                    }}
                >
                    { userData === null ? (
                        <>
                            <Tab.Screen 
                                name='HomeNavigator' 
                                component={HomeNavigator}
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
                                component={HomeNavigator}
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

    const HomeStack = createStackNavigator();
    const HomeNavigator = () => (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name='Listings' component={HomeScreen}/>
            <HomeStack.Screen name='ProductPage' component={ProductPage} options={{ headerShown: false }}/>
        </HomeStack.Navigator>
    );

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
