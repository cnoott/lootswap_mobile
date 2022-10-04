import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { useUserContext, useUserUpdate } from '../../shared/UserContext';
import { isAuthenticated, signOut } from '../../api/auth';

//TODO: 
// - make shared error component
// - Make login screen a pop-up slide over

const Profile = () => { 
    const userData = useUserContext();
    const updateUser = useUserUpdate();

    const pressSignout = async () => {
        await signOut;
        updateUser(null);
    };

    return(
        <View>
            <Text> Profile Screen</Text>
            <Text> {JSON.stringify(userData)} </Text>
            <Button onPress={pressSignout} title='Signout'/>
        </View>
    );
};

export default Profile;
