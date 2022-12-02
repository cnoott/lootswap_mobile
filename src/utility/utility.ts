/***
LOOTSWAP - UTILITY
***/

const SESSION_TIME = 15; // In minutes

/*
On Launch -
Checking if current session has expired or not. Session is set to 15 minutes
*/
export const getInitialRoute = (userData: any, dispatch: any) => {
  let initialScreen = 'AuthScreen';
  let isLoggedIn = false;
  if (userData) {
    initialScreen = 'AppScreens';
    isLoggedIn = true;
  }
  return {initialScreen, isLoggedIn};
};
