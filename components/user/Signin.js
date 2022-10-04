import React, { useState, useEffect } from 'react';
import { useUserContext, useUserUpdate } from '../../shared/UserContext';
import { Text, View, Button, TextInput } from 'react-native';
import { signIn, authenticate, isAuthenticated } from '../../api/auth';

//TODO: 
// - make shared error component
// - Make login screen a pop-up slide over
// - redirect to home after login

const Signin = () => { 
    const [signedIn, setSignedIn] = useState(false);
    const [error, setError] = useState('');

    const userData = useUserContext();
    const updateUser = useUserUpdate();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const handleChange = name => e => {
        setLoginInfo({...loginInfo, [name]: e})
    };

    const handleSubmit = () => {
        signIn(loginInfo).then(response => {
            if (response.error) {
                setError(response.error)
            }
            else {
                authenticate(response, () => {
                    updateUser(response);
                    //setSignedIn(true);
                });
                console.log('response');
                console.log(response);
            }
        });
    };
    const init = async () => {
        const isAuth = await isAuthenticated();
        console.log(isAuth);
    };

    const handleTest = async () => {
        const isAuth = await isAuthenticated();
        console.log(isAuth);
    }

    useEffect(() => {
        init();
    },[]);

    return(
        <View>
            <Text> Sign in </Text>
            { error && (<Text>{error}</Text>) }
            
            <TextInput 
                placeholder='Email'
                onChangeText={handleChange('email')}
            />
            <TextInput 
                placeholder='Password'
                onChangeText={handleChange('password')}
            />

            <Button title='Signin' onPress={handleSubmit}/>
            <Button title='test' onPress={handleTest}/>

        </View>
    );
};

export default Signin;
