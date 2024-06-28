/***
  LootSwap - SPLASH SCREEN
 ***/

import React, {FC} from 'react';
import CodePush from 'react-native-code-push';
import {ActivityIndicator} from 'react-native';
import {LOGO_WHITE} from '../constants/imageConstants';
import {
  SplashScreenContainer,
  Logo,
  LoadingIndicatorContainer,
  UpdateText,
} from './styles';

const SplashScreen: FC<{}> = () => {
  return (
    <SplashScreenContainer>
      <Logo source={LOGO_WHITE} />
      <LoadingIndicatorContainer>
        <UpdateText>Updating lootswap, Please Wait</UpdateText>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingIndicatorContainer>
    </SplashScreenContainer>
  );
};

export default SplashScreen;
