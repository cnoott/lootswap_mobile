import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SvgXml} from 'react-native-svg';
import {
  LOOT_SWAP_LOGO,
  EMAIL_ICON,
  SHOW_HIDE_PASS_ICON,
  LOCK_ICON,
  ADD_USER_ICON,
  PROFILE_PLACEHOLDER_ICON,
  EDIT_PROFILE_ICON,
} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';
import LSInput from '../../../components/commonComponents/LSInput';
import LSButton from '../../../components/commonComponents/LSButton';
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
  EditIconContainer,
  ProfileUploadView,
  ProfileContainerView,
} from './styles';

type FormProps = {
  email: string;
  password: string;
  username: string;
};

export const CreateAccountScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter valid password'),
  });

  const onSubmit = (values: FormProps) => {};

  const renderBottomView = () => {
    return (
      <BottomButton
        onPress={() => {
          navigation.navigate('AuthScreen');
        }}>
        <ButtonText1>Already have an account?</ButtonText1>
        <ButtonText2> Sign in</ButtonText2>
      </BottomButton>
    );
  };

  const renderProfileUploadView = () => {
    return (
      <ProfileContainerView>
        <ProfileUploadView>
          <SvgXml xml={PROFILE_PLACEHOLDER_ICON} />
        </ProfileUploadView>
        <EditIconContainer>
          <SvgXml xml={EDIT_PROFILE_ICON} />
        </EditIconContainer>
      </ProfileContainerView>
    );
  };

  const renderBody = () => {
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
        }}
        validationSchema={loginValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => onSubmit(values)}>
        {({handleChange, handleSubmit, errors, values}) => {
          return (
            <FullView>
              <LSInput
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={'Email'}
                error={errors.email}
                leftIcon={EMAIL_ICON}
              />
              <LSInput
                onChangeText={handleChange('username')}
                value={values.username}
                placeholder={'Username'}
                error={errors.username}
                leftIcon={ADD_USER_ICON}
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
              {renderProfileUploadView()}
              <LSButton
                title={'Sign up'}
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
        <HeaderLabel>Create Your Account</HeaderLabel>
        {renderBody()}
        {renderBottomView()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CreateAccountScreen;
