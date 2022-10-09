import React, { useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../api/auth';

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();
const UserLoadingContext = React.createContext();

const IsHomeContext = React.createContext();
const IsHomeUpdateContext = React. createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const useUserUpdate = () => {
    return useContext(UserUpdateContext);
};

export const useUserLoading = () => {
    return useContext(UserLoadingContext);
};

export const useIsHome = () => {
    return useContext(IsHomeContext);
};

export const useUpdateIsHome = () => {
    return useContext(IsHomeUpdateContext);
};

//TODO: use useEffect to initially load auth token from local storage
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    
    //I use the state to render the go back button when not home
    const [home, setHome] = useState(true);

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
                    <IsHomeContext.Provider value={home}>
                        <IsHomeUpdateContext.Provider value={setHome}>
                            {children}
                        </IsHomeUpdateContext.Provider>
                    </IsHomeContext.Provider>
                </UserLoadingContext.Provider>
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
};
