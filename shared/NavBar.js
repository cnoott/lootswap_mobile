import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import Profile from '../components/user/Profile';
import AddLoot from '../components/AddLoot';
import Orders from '../components/Orders';
import Notifications from '../components/Notifications';
import Logo from '../assets/logo.png';
import SplashScreen from '../shared/SplashScreen';
import Signin from '../components/user/Signin';
import { isAuthenticated } from '../api/auth';

import { useUserContext, useUserLoading } from './UserContext';

import { HomeIcon } from 'react-native-heroicons/outline'

const Tab = createBottomTabNavigator();

const LogoImage = () => (
    <Image
        source={Logo}
        style={{ height: 35, width: 186 }}
    />
);

const Home = () => (
    <HomeIcon/>
);

//TODO: 
// - So where would a page that isnt accessable from the navbar go (like 
//    > Probably like: (from HomeScreen -> on product click import Product and go to it using navigation
// - Get Navbar Icons to work
// - isSigned in state that shows different navigators
// - splsh screen


const NavBar = () => {
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState(true);

    const userData = useUserContext();
    const userLoading = useUserLoading();
 
    
    if (userLoading) {
        return <SplashScreen/>
    }

    return (
        <Tab.Navigator
            screenOptions={{ headerTitle: () => <LogoImage/>}}
        >
            { userData === null ? (
                <>
                <Tab.Screen 
                    name='Home' 
                    component={HomeScreen}
                />
                <Tab.Screen 
                    name='Profile' 
                    component={() => <Signin setUser={setUser}/>}
                />
                <Tab.Screen 
                    name='Add Loot' 
                    component={Signin}
                />
                <Tab.Screen 
                    name='Orders' 
                    component={Signin}
                />
                <Tab.Screen 
                    name='Notifications' 
                    component={Signin}
                />
                </>
            ) : (
                <>
                <Tab.Screen 
                    name='Home' 
                    component={HomeScreen}
                />
                <Tab.Screen 
                    name='Profile' 
                    component={Profile}
                />
                <Tab.Screen 
                    name='Add Loot' 
                    component={AddLoot}
                />
                <Tab.Screen 
                    name='Orders' 
                    component={Orders}
                />
                <Tab.Screen 
                    name='Notifications' 
                    component={Notifications}
                />
                </>
            )}
        </Tab.Navigator>
    );
};

export default NavBar;
