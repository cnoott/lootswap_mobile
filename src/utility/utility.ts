/***
LOOTSWAP - UTILITY
***/

const SESSION_TIME = 15; // In minutes

/*
On Launch -
Checking if current session has expired or not. Session is set to 15 minutes
*/
export const getInitialRoute = (loginTime: any, dispatch: any) => {
  let initialScreen = 'AuthScreen';
  if (loginTime) {
    const loggedInDate = new Date(loginTime);
    const currentDate = new Date();
    let diff = currentDate.valueOf() - loggedInDate.valueOf();
    let diffInMins = diff / 1000 / 60;
    if (diffInMins < SESSION_TIME) {
      initialScreen = 'BottomTabs';
    } else {
      // If current session is not active, resseting the redux state
      dispatch({type: ''});
    }
  }
  return initialScreen;
};
