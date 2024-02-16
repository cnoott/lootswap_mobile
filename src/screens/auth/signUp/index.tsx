import React, {FC, useState, useEffect} from 'react';
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
import {Size, Type} from '../../../enums';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import branch from 'react-native-branch';
import GoogleButton from '../../../components/signInButtons/GoogleButton';
import AppleButton from '../../../components/signInButtons/AppleButton';

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken} = auth;

  const [referringUserId, setReferringUserId] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getReferringUserId();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const getReferringUserId = async () => { // XXX repeating code
    let installParams = await branch.getFirstReferringParams();
    if (installParams?.userId) {
      setReferringUserId(`${installParams?.userId}`);
      console.log(installParams, 'from google signup');
    }
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
        <GoogleButton fcmToken={fcmToken} referringUserId={referringUserId} />
        <View style={{marginBottom: 15}} />
        <AppleButton fcmToken={fcmToken} referringUserId={referringUserId} />
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
