import React, {FC} from 'react';
import {
  CreateContainer,
  TitleLabel,
  LogoImage,
  ButtonsContainer,
  SignInContainer,
  HaveAccountText,
  SigninText,
  CloseTouchable,
} from './styles';
import LSButton from '../../../components/commonComponents/LSButton';
import {HEADERLOGO} from '../../../constants/imageConstants';
import {Size, Type} from '../../../enums';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import GoogleButton from '../../../components/signInButtons/GoogleButton';
import AppleButton from '../../../components/signInButtons/AppleButton';
import {SvgXml} from 'react-native-svg';
import {TRADE_MODAL_CLOSE_BUTTON} from 'localsvgimages';

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken, referringUserId, marketingChannel} = auth;

  return (
    <CreateContainer>
      <CloseTouchable onPress={navigation.goBack}>
        <SvgXml xml={TRADE_MODAL_CLOSE_BUTTON} />
      </CloseTouchable>
      <LogoImage source={HEADERLOGO} />
      <TitleLabel>Create Your Account</TitleLabel>

      <ButtonsContainer>
        <LSButton
          title={'Continue with Email'}
          size={Size.Full}
          type={Type.Primary}
          radius={30}
          onPress={() => navigation.navigate('EmailSignupScreen')}
        />
        <View style={{marginBottom: 15}} />
        <GoogleButton />
        <View style={{marginBottom: 15}} />
        <AppleButton />
      </ButtonsContainer>
      <SignInContainer onPress={() => navigation.navigate('SignInScreen')}>
        <HaveAccountText>Already have an account?</HaveAccountText>
        <SigninText>Sign in</SigninText>
      </SignInContainer>
    </CreateContainer>
  );
};


export default CreateAccountScreen;
