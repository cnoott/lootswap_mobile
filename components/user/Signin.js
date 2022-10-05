import React, { useState, useEffect } from 'react';
import { useUserContext, useUserUpdate } from '../../shared/UserContext';
import { Text, View, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import { signIn, authenticate, isAuthenticated } from '../../api/auth';

//TODO: 
// - make shared error component
// - Make login screen a pop-up slide over
// - redirect to home after login

const Signin = ({ navigation }) => { 
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
        <View style={styles.container}>
            <Text style={ styles.title }> Sign in </Text>
            <Pressable style={styles.createAcc} onPress={() => navigation.navigate('signup')}>
                <Text style={{ color: 'blue' }}> or Create Account </Text>
            </Pressable>
            { error && (<Text>{error}</Text>) }
            
            <TextInput 
                placeholder='Email'
                onChangeText={handleChange('email')}
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput 
                placeholder='Password'
                onChangeText={handleChange('password')}
                textContentType='password'
                secureTextEntry={true}
                style={styles.input}
            />

        
            <View style={styles.bottom}>
                <Pressable style={styles.signupButton}>
                    <Text style={{ color: 'white', fontSize: 25 }}> Signin </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 30,
        marginTop: 40,
    },
    input: {
        height: 40,
        width: '80%',
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    createAcc: {
        margin: 8,
        fontFamily: 'Inter-Black',
        fontSize: 20,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 70
    },

    signupButton: {
        paddingVertical: 10,
        paddingHorizontal: 90,
        backgroundColor: '#6267fe',
        borderRadius: 8
    },
});


export default Signin;
