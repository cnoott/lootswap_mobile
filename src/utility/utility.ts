/***
INSQUAD - UTILITY
***/

import { WALLET_DATA } from '../constants/actions';
const SESSION_TIME = 15; // In minutes

/*
Home Screen -
Getting Wallet and Chain title to show on the home screen
*/
export const getTitle = (data: any) => {
  const selectedData = data.filter((item) => item.selected);
  return selectedData[0]?.name || '';
};

/*
Auth Screen -
Checking if password is valid or not. It is set to minimum 6 characters. Also password can not have spaces at begining and end.
*/
export const validatePassword = (password: string) => {
  if (password.trim().length < 6) return 'Password should be 6 characters long';
  else return '';
};

/*
On Launch -
Checking if current session has expired or not. Session is set to 15 minutes
*/
export const getInitialRoute = (loginTime: any, dispatch: any) => {
  const loggedInDate = new Date(loginTime);
  const currentDate = new Date();
  let diff = currentDate.valueOf() - loggedInDate.valueOf();
  let diffInMins = diff / 1000 / 60;
  let initialScreen = 'AuthScreen';
  if (diffInMins < SESSION_TIME) {
    initialScreen = 'BottomTabs';
  } else {
    // If current session is not active, resseting the redux state
    dispatch({ type: WALLET_DATA.RESET });
  }
  return initialScreen;
};
