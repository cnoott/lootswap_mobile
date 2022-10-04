import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '@env';

export const authenticate = async (loginData, next) => {
    try {
        const token = JSON.stringify(loginData);
        console.log('saving token: ' + token);
        await AsyncStorage.setItem('jwt', token);
        next();
    }
    catch (e) {
        console.log(e)
        next();
    }
};

export const isAuthenticated = async () => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        console.log('TOKEN!!')
        console.log(token);
        if (token) {
            return JSON.parse(token);
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e)
        return false;
    }
};

export const signIn = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signOut = async () => {
    try {
        await AsyncStorage.removeItem('jwt');
        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
};
