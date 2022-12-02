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
  ADD_USER_ICON,
  PROFILE_PLACEHOLDER_ICON,
  EDIT_PROFILE_ICON,
} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import LSInput from '../../../components/commonComponents/LSInput';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {signUpRequest} from '../../../redux/modules';

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
  Image,
  ImageUploadIndicator,
} from './styles';
import {
  getSignedRequest,
  uploadFile,
} from '../../../services/imageUploadService';
import {Alert} from 'react-native';

type FormProps = {
  email: string;
  password: string;
  username: string;
};

export const CreateAccountScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isImageUploading, setImageUploading] = useState(false);
  const [profileUrl, setProfileUrl] = useState('');
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter valid password'),
  });

  const onSubmit = (values: FormProps) => {
    if (profileUrl) {
      dispatch(
        signUpRequest({
          email: values?.email,
          name: values?.username,
          password: values?.password,
          profile_picture: profileUrl,
          fromMobile: true,
        }),
      );
    } else {
      Alert.alert('Please select profile picture');
    }
  };

  const onEditProfilePress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      setImageUploading(true);
      const fileData = {
        ...image,
        type: image?.mime,
      };
      getSignedRequest(fileData)
        .then(signedReqData => {
          uploadFile(fileData, signedReqData?.signedRequest, signedReqData?.url)
            .then(url => {
              setImageUploading(false);
              setProfileUrl(url);
            })
            .catch(error => {
              setImageUploading(false);
              console.log('error ====', error);
            });
        })
        .catch(() => {
          setImageUploading(false);
        });
    });
  };

  const renderBottomView = () => {
    return (
      <BottomButton
        onPress={() => {
          navigation.navigate('AuthScreen');
        }}>
        <ButtonText1>Already have an account?</ButtonText1>
        <ButtonText2> Sign In</ButtonText2>
      </BottomButton>
    );
  };

  const renderProfileUploadView = () => {
    return (
      <ProfileContainerView>
        <ProfileUploadView onPress={onEditProfilePress}>
          <SvgXml xml={PROFILE_PLACEHOLDER_ICON} />
          <EditIconContainer onPress={onEditProfilePress}>
            <SvgXml xml={EDIT_PROFILE_ICON} />
          </EditIconContainer>
          {profileUrl && <Image source={{uri: profileUrl}} />}
        </ProfileUploadView>
        {isImageUploading && <ImageUploadIndicator />}
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
