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
  BarContainer,
  Bar,
} from './styles';

interface SplashScreenProps {
  progress: Number;
}

const SplashScreen: FC<SplashScreenProps> = props => {
  const {progress} = props;
  return (
    <SplashScreenContainer>
      <Logo source={LOGO_WHITE} />
      <LoadingIndicatorContainer>
        <UpdateText>Updating lootswap, Please Wait</UpdateText>
        <BarContainer>
          <Bar progress={progress} />
        </BarContainer>
      </LoadingIndicatorContainer>
    </SplashScreenContainer>
  );
};

export default SplashScreen;
