import React, {FC} from 'react';
import {
  CreateContainer,
  TitleLabel,
  LogoImage,
  ButtonsContainer,
  SignInContainer,
  HaveAccountText,
  SigninText,
} from './styles';
import LSButton from '../../../components/commonComponents/LSButton';
import {HEADERLOGO} from '../../../constants/imageConstants';
import {GOOGLE_ICON, APPLE_ICON} from 'localsvgimages';
import {Size, Type} from '../../../enums';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  const googleSignUp = async () => {
    const userInfo = await GoogleSignin.signIn();
    console.log('USER INFO', userInfo);
  };

  return (
    <CreateContainer>
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
        <LSButton
          title={'Continue with Google'}
          size={Size.Full}
          type={Type.Grey}
          radius={30}
          icon={GOOGLE_ICON}
          onPress={googleSignUp}
        />
        <View style={{marginBottom: 15}} />
        <LSButton
          title={'Continue with Apple'}
          size={Size.Full}
          type={Type.Secondary}
          radius={30}
          icon={APPLE_ICON}
        />
      </ButtonsContainer>

      <SignInContainer
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <HaveAccountText>Already have an account?</HaveAccountText>
        <SigninText>Sign in</SigninText>
      </SignInContainer>
    </CreateContainer>
  );
};


export default CreateAccountScreen;
