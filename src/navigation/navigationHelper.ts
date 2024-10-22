/***
LOOTSWAP - HELPER CLASS FOR NAVIGATION
***/

import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export let isReadyRef = React.createRef();
export let navigationRef = React.createRef();

/*
Reset - A method to reset the current stack with the given screen
*/
export const resetRoute = (screenName = 'AppScreens', data = {}) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName, params: data}],
    }),
  );
};

export const goBack = () => {
  try {
    navigationRef.current?.goBack();
  } catch (e) {
    console.log('Error navigating back', e);
    resetRoute();
  }
};

export const navigateToOnboarding = () => {
  //navigationRef.current?.navigate('AppScreens');
  navigationRef.current?.navigate('OnboardingScreen');
};
