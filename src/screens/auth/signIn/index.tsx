import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {
  LOOT_SWAP_LOGO,
  EMAIL_ICON,
  SHOW_HIDE_PASS_ICON,
  LOCK_ICON,
} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';
import LSInput from '../../../components/commonComponents/LSInput';
import LSButton from '../../../components/commonComponents/LSButton';
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
} from './styles';

type FormProps = {
  emailUsername: string;
  password: string;
};

export const AuthScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const loginValidationSchema = yup.object().shape({
    emailUsername: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email or username'),
    password: yup.string().required('Please enter valid password'),
  });

  const onSubmit = (values: FormProps) => {
    dispatch(
      signInRequest({
        email: values?.emailUsername,
        password: values?.password,
      }),
    );
  };

  const renderBottomView = () => {
    return (
      <BottomButton
        onPress={() => {
          navigation.navigate('CreateAccountScreen');
        }}>
        <ButtonText1>Don’t have an account?</ButtonText1>
        <ButtonText2> Sign Up</ButtonText2>
      </BottomButton>
    );
  };

  const renderBody = () => {
    return (
      <Formik
        initialValues={{
          emailUsername: 'test01@mailinator.com',
          password: '123456',
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
                placeholder={'Email/Username'}
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
                  isPasswordHidden ? SHOW_HIDE_PASS_ICON : SHOW_HIDE_PASS_ICON
                }
                onRightIconPress={() => setPasswordHidden(!isPasswordHidden)}
                secureTextEntry={isPasswordHidden}
              />
              <Touchable>
                <ForgotPassLabel>Forgot the password?</ForgotPassLabel>
              </Touchable>
              <LSButton
                title={'Sign in'}
                size={Size.Large}
                type={Type.Primary}
                onPress={handleSubmit}
              />
            </FullView>
          );
        }}
      </Formik>
    );
  };

  const renderHeaderLogo = () => {
    return (
      <HeaderContainer>
        <SvgXml xml={LOOT_SWAP_LOGO} />
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Innercontainer}
        keyboardShouldPersistTaps={'handled'}>
        {renderHeaderLogo()}
        <HeaderLabel>Login to your account</HeaderLabel>
        {renderBody()}
        {renderBottomView()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AuthScreen;
