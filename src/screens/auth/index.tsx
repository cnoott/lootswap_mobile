import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Container,
  HeaderContainer,
  SignInText,
  CreateAccountText,
  EmptyView,
  BottomButton,
  ButtonText,
  TextInput,
  Innercontainer,
} from './styles';

export const AuthScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [password, setPassword] = useState('');

  const renderBottomButton = () => {
    return (
      <BottomButton>
        <ButtonText>Signin</ButtonText>
      </BottomButton>
    );
  };

  const renderBody = () => {
    return (
      <EmptyView>
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder={'Email'}
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder={'Password'}
        />
      </EmptyView>
    );
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        <SignInText>Sign In</SignInText>
        <CreateAccountText>or Create Account</CreateAccountText>
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        contentContainerStyle={Innercontainer}
        keyboardShouldPersistTaps={'always'}>
        {renderHeader()}
        {renderBody()}
        {renderBottomButton()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AuthScreen;
