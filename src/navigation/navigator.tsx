/***
INSQUAD - HELPER CLASS FOR NAVIGATION
***/

import {CommonActions, NavigationProp} from '@react-navigation/native';

/*
Reset - A method to reset the current stack with the given screen
*/
export const reset = (
  navigation: NavigationProp<any, any>,
  screenName = '',
  data = {},
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {name: screenName},
        {
          name: screenName,
          params: data,
        },
      ],
    }),
  );
};
