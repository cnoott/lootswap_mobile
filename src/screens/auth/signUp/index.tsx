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
import {GOOGLE_ICON, APPLE_ICON} from 'localsvgimages';
import {Size, Type} from '../../../enums';
import {View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {signInWithGoogleRequest} from '../../../redux/modules';
import {useDispatch, useSelector} from 'react-redux';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import branch from 'react-native-branch';

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken} = auth;

  const [referringUserId, setReferringUserId] = useState('');

  const getReferringUserId = async () => { // XXX repeating code
    let installParams = await branch.getFirstReferringParams();
    if (installParams?.userId) {
      setReferringUserId(`${installParams?.userId}`);
      console.log(installParams, 'from google signup');
    }
  };

  const googleSignUp = async () => {
    const userInfo = await GoogleSignin.signIn();
    console.log('token', fcmToken.token);

    dispatch(
      signInWithGoogleRequest({
        ...userInfo,
        userData: userInfo.user,
        fcmToken: fcmToken.token,
        referringUserId: referringUserId,
      }),
    );
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
