import React, {FC, useState} from 'react';
import {INButton} from '../../components/button';
import {InInput} from '../../components/input';
import {LOGO} from '../../constants/constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {
  Container,
  LogoImage,
  LogoText,
  BottomContainer,
  ForgotContainer,
  ForgotText,
} from './styles';
import {reset} from '../../navigation/navigator';
import {validatePassword} from '../../utility/utility';
import {AUTH_DATA} from '../../constants/actions';

export const AuthScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();

  /*
   * Authentication method
   */
  const unlockPress = () => {
    const validation = validatePassword(password); // Validating password
    if (validation.length === 0) {
      // Navigating and resetting to the bottom tabs screen and storing current login time to the redux state
      reset(navigation, 'BottomTabs');
      dispatch({
        type: AUTH_DATA.UPDATE,
        payload: {loginTime: new Date()},
      });
    } else {
      setPasswordError(validation);
    }
  };

  /*
   * Storing the password in the local state while user enter the password
   */
  const onChangeText = text => {
    if (passwordError) {
      setPasswordError('');
    }
    setPassword(text);
  };

  return (
    <Container>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
        <LogoImage source={LOGO} />
        <LogoText>MARTIAN</LogoText>
        <InInput
          onChangeText={onChangeText}
          secureTextEntry
          error={passwordError}
        />
        <INButton
          size={'lg'}
          title={'UNLOCK'}
          type={'primary'}
          onPress={unlockPress}
        />
      </KeyboardAwareScrollView>
      <BottomContainer>
        <ForgotContainer>
          <ForgotText>FORGOT PASSWORD</ForgotText>
        </ForgotContainer>
      </BottomContainer>
    </Container>
  );
};

export default AuthScreen;
