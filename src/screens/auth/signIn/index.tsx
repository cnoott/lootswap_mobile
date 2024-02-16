import React, {FC, useState, useEffect} from 'react';
import {Keyboard, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {
  LOOT_SWAP_LOGO,
  EMAIL_ICON,
  SHOW_HIDE_PASS_ICON,
  LOCK_ICON,
  SHOW_PASS_ICON,
} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';
import LSInput from '../../../components/commonComponents/LSInput';
import LSButton from '../../../components/commonComponents/LSButton';
import GoogleButton from '../../../components/signInButtons/GoogleButton';
import AppleButton from '../../../components/signInButtons/AppleButton';
import {signInRequest} from '../../../redux/modules';
import {Size, Type} from '../../../enums';
import {
  Container,
  HeaderContainer,
  HeaderLabel,
  BottomButton,
  ButtonText1,
  ButtonText2,
  Innercontainer,
  FullView,
  Touchable,
  ForgotPassLabel,
  HeaderDesLabel,
  Spacing,
} from './styles';
import {scale} from 'react-native-size-matters';
import {Linking} from 'react-native';
import {WEB_APP_URL} from '@env';
import {AuthProps} from '../../../redux/modules/auth/reducer';
import { loggingService } from '../../../services/loggingService';

type FormProps = {
  emailUsername: string;
  password: string;
};

export const AuthScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth: AuthProps = useSelector(state => state.auth);
  const {fcmToken} = auth;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const loginValidationSchema = yup.object().shape({
    emailUsername: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email or username'),
    password: yup.string().required('Please enter valid password'),
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = (values: FormProps) => {
    Keyboard.dismiss();
    console.log('FCM', fcmToken);
    dispatch(
      signInRequest({
        email: values?.emailUsername,
        password: values?.password,
        fcmToken: fcmToken.token,
      }),
    );
  };

  const renderBottomView = () => {
    return (
      <BottomButton
        onPress={() => {
          navigation.navigate('CreateAccountScreen');
          loggingService().logEvent('start_create_account');
        }}>
        <ButtonText1>Don’t have an account?</ButtonText1>
        <ButtonText2>Create Account</ButtonText2>
      </BottomButton>
    );
  };

  const handlePressForgotPass = async () => {
    const url = `${WEB_APP_URL}/password-reset-request`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const renderBody = () => {
    return (
      <Formik
        initialValues={{
          emailUsername: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => onSubmit(values)}>
        {({handleChange, handleSubmit, errors, values}) => {
          return (
            <FullView>
              <LSInput
                onChangeText={handleChange('emailUsername')}
                value={values.emailUsername}
                placeholder={'Email'}
                error={errors.emailUsername}
                leftIcon={EMAIL_ICON}
              />
              <LSInput
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={'Password'}
                error={errors.password}
                leftIcon={LOCK_ICON}
                rightIcon={
                  isPasswordHidden ? SHOW_HIDE_PASS_ICON : SHOW_PASS_ICON
                }
                onRightIconPress={() => setPasswordHidden(!isPasswordHidden)}
                secureTextEntry={isPasswordHidden}
              />

              <Spacing>
                <LSButton
                  title={'Login'}
                  size={Size.Full}
                  type={Type.Primary}
                  fitToWidth={'90%'}
                  radius={20}
                  onPress={handleSubmit}
                />
              </Spacing>
              <View style={{marginBottom: 15}} />
              <GoogleButton fcmToken={fcmToken} />
              <View style={{marginBottom: 15}} />
              <AppleButton fcmToken={fcmToken} />
              <Touchable onPress={() => handlePressForgotPass()}>
                <ForgotPassLabel>Forgot password?</ForgotPassLabel>
              </Touchable>
            </FullView>
          );
        }}
      </Formik>
    );
  };

  const renderHeaderLogo = () => {
    return (
      <HeaderContainer>
        <SvgXml xml={LOOT_SWAP_LOGO} height={scale(30)} width={scale(160)} />
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        scrollEnabled={isKeyboardVisible}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Innercontainer}
        keyboardShouldPersistTaps={'handled'}>
        {renderHeaderLogo()}
        <HeaderLabel>Login</HeaderLabel>
        <HeaderDesLabel>Welcome back!.</HeaderDesLabel>
        {renderBody()}
        {renderBottomView()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AuthScreen;
