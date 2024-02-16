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

export const CreateAccountScreen: FC<{}> = () => {

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
        />
        <View style={{marginBottom: 15}} />
        <LSButton
          title={'Continue with Google'}
          size={Size.Full}
          type={Type.Grey}
          radius={30}
          icon={GOOGLE_ICON}
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

      <SignInContainer>
        <HaveAccountText>Already have an account?</HaveAccountText>
        <SigninText>Sign in</SigninText>
      </SignInContainer>
    </CreateContainer>
  );
};


export default CreateAccountScreen;
