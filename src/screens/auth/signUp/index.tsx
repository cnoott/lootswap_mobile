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
import {APPLE_ICON} from 'localsvgimages';
import {Size, Type} from '../../../enums';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signInWithAppleRequest} from '../../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import branch from 'react-native-branch';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import GoogleButton from '../../../components/signInButtons/GoogleButton';

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
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

  const appleSignUp = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      console.log(appleAuthRequestResponse);
      dispatch(
        signInWithAppleRequest({
          ...appleAuthRequestResponse,
          fcmToken: fcmToken.token,
          referringUserId: referringUserId,
        }),
      );
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
        <LSButton
          title={'Continue with Apple'}
          size={Size.Full}
          type={Type.Secondary}
          radius={30}
          icon={APPLE_ICON}
          onPress={appleSignUp}
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
