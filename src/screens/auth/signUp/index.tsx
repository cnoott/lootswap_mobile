import React, {FC, useState, useEffect} from 'react';
import {Platform, Keyboard} from 'react-native';
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
  SHOW_PASS_ICON,
  SYNC_WHITE_ICON,
  UPLOAD_WHITE_ICON,
} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-crop-picker';
import LSInput from '../../../components/commonComponents/LSInput';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {signUpRequest} from '../../../redux/modules';
import {WEB_APP_URL} from '@env';
import {Linking} from 'react-native';

import {
  Container,
  HeaderContainer,
  HeaderLabel,
  BottomButton,
  ButtonText1,
  ButtonText2,
  Innercontainer,
  FullView,
  ProfileUploadView,
  ProfileContainerView,
  Image,
  ImageUploadIndicator,
  HeaderDesLabel,
  TermsLabel,
  TermsLabelDark,
  EmptyRowView,
  ProfileRightView,
  ProfileText,
  HorizontalSpace,
  Button,
  ButtonText,
} from './styles';
import {
  getSignedRequest,
  uploadFile,
} from '../../../services/imageUploadService';
import {Alert} from 'react-native';
import {scale} from 'react-native-size-matters';
import branch from 'react-native-branch';
import {Alert as AlertModal} from 'react-native';

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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [referringUserId, setReferringUserId] = useState('');

  const getReferringUserId = async () => {
    let installParams = await branch.getFirstReferringParams();
    console.log(installParams);
    if (installParams?.userId) {
      setReferringUserId(`${installParams?.userId}`);
      console.log(installParams, 'from signup');
      //Alert.alert(`${installParams?.userId}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getReferringUserId();
    }, 1000);
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
      clearTimeout(timeoutId);
    };
  }, []);

  const handleLinkPress = async (link: string) => {
    const url = `${WEB_APP_URL}/${link}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
    username: yup
      .string()
      .required('Please enter username')
      .matches(/^[a-zA-Z0-9]+$/, 'Please enter valid username'),
    password: yup
      .string()
      .required('Please enter valid password')
      .min(6, 'Atleast 6 characters required'),
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
          referringUserId: referringUserId,
        }),
      );
    } else {
      Alert.alert('Please select profile picture');
    }
  };

  const onEditProfilePress = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      compressImageQuality: 0.01,
      compressImageMaxHeight: 500,
      cropping: true,
    }).then(image => {
      image.sourceURL = 'file://' + image.path;
      setImageUploading(true);
      const fileData = {
        ...image,
        type: image?.mime,
        uri:
          Platform.OS === 'android'
            ? image?.sourceURL
            : image?.sourceURL?.replace('file://', ''),
      };
      getSignedRequest(fileData)
        .then(signedReqData => {
          uploadFile(fileData, signedReqData?.signedRequest, signedReqData?.url)
            .then(url => {
              setImageUploading(false);
              setProfileUrl(url);
            })
            .catch(() => {
              setImageUploading(false);
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
          navigation.navigate('SignInScreen');
        }}>
        <ButtonText1>Already have an account?</ButtonText1>
        <ButtonText2>Sign in</ButtonText2>
      </BottomButton>
    );
  };

  const randomizeProfileUrl = () => {
    const seed = Math.floor(Math.random() * 999999);
    const defaultProfileUrl = `https://avatars.dicebear.com/api/micah/${seed}.png`;
    setProfileUrl(defaultProfileUrl);
  };

  const renderProfileUploadView = () => {
    return (
      <EmptyRowView>
        <ProfileContainerView>
          <ProfileUploadView onPress={onEditProfilePress}>
            <SvgXml
              xml={PROFILE_PLACEHOLDER_ICON}
              height={scale(100)}
              width={scale(100)}
            />
            {profileUrl && <Image source={{uri: profileUrl}} />}
          </ProfileUploadView>
          {isImageUploading && <ImageUploadIndicator />}
        </ProfileContainerView>
        <ProfileRightView>
          <ProfileText>Profile Picture</ProfileText>
          <EmptyRowView>
            <Button onPress={() => randomizeProfileUrl()}>
              <SvgXml xml={SYNC_WHITE_ICON} />
              <ButtonText>Randomize</ButtonText>
            </Button>
            <HorizontalSpace />
            <Button onPress={() => onEditProfilePress()} primary={true}>
              <SvgXml xml={UPLOAD_WHITE_ICON} />
              <ButtonText>Upload</ButtonText>
            </Button>
          </EmptyRowView>
        </ProfileRightView>
      </EmptyRowView>
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
              {renderProfileUploadView()}
              <LSInput
                onChangeText={handleChange('username')}
                value={values.username}
                placeholder={'Username'}
                error={errors.username}
                leftIcon={ADD_USER_ICON}
              />
              <LSInput
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={'Email'}
                error={errors.email}
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
              <TermsLabel>
                {'By Creating an account you agree to our\n'}
                <TermsLabelDark onPress={() => handleLinkPress('TOS')}>
                  Terms and Service
                </TermsLabelDark>{' '}
                and{' '}
                <TermsLabelDark onPress={() => handleLinkPress('privacy')}>
                  Privacy Policy
                </TermsLabelDark>
              </TermsLabel>
              <LSButton
                title={'Create Account'}
                size={Size.Fit_To_Width}
                type={Type.Primary}
                fitToWidth={'90%'}
                radius={20}
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
        <HeaderLabel>Create your account</HeaderLabel>
        <HeaderDesLabel>
          Create your account & Join the lootswap community!
        </HeaderDesLabel>
        {renderBody()}
        {renderBottomView()}
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default CreateAccountScreen;
