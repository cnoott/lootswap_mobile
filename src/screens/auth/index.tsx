import React, {FC, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'styled-components';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  Container,
  HeaderContainer,
  SignInText,
  CreateAccountText,
  EmptyView,
  BottomButton,
  ButtonText,
} from './styles';

export const AuthScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const styles = makeStyles(theme);

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
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder={'Email'}
        />
        <TextInput
          style={styles.input}
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
        contentContainerStyle={styles.Innercontainer}
        keyboardShouldPersistTaps={'always'}>
        {renderHeader()}
        {renderBody()}
        {renderBottomButton()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    Innercontainer: {
      flex: 1,
      paddingHorizontal: scale(20),
    },
    input: {
      alignSelf: 'stretch',
      height: verticalScale(35),
      borderWidth: 2,
      borderColor: theme.colors.placeholder,
      marginBottom: verticalScale(10),
      paddingHorizontal: scale(10),
    },
  });

export default AuthScreen;
