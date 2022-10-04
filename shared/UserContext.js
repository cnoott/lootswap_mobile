import React, { useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../api/auth';

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();
const UserLoadingContext = React.createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useUserUpdate = () => {
    return useContext(UserUpdateContext);
};

export const useUserLoading = () => {
    return useContext(UserLoadingContext);
};

//TODO: use useEffect to initially load auth token from local storage
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const init = async () => {
        console.log('INIT IN PROVIDER!');
        
        
        const loginData = await isAuthenticated();
        console.log(loginData);
        if (loginData) {
            setUser(loginData);
        }
        setLoading(false);
    };

    useEffect(() => {
        init();
    },[])


    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
                <UserLoadingContext.Provider value={loading}>
                    {children}
                </UserLoadingContext.Provider>
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
};
