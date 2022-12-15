/***
LootSwap - EDIT PROFILE SCREEN
***/

import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSInput from '../../components/commonComponents/LSInput';
import LSButton from '../../components/commonComponents/LSButton';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {
  Container,
  EmptyTopView,
  EmptyBottomView,
  TopSpaceView,
  Innercontainer,
} from './editProfileStyles';
import {Size, Type} from '../../enums';
import {EDIT_PROFILE_EMAIL_ICON} from 'localsvgimages';
import {Formik} from 'formik';
import * as yup from 'yup';

export const EditProfileScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;

  const profileValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .matches(/^[a-zA-Z0-9]+$/, 'Please enter valid username'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
  });

  const onSubmit = (values: FormProps) => {
    console.log('Values ===', values);
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Innercontainer}
      keyboardShouldPersistTaps={'handled'}>
      <Formik
        initialValues={{
          username: userData?.name,
          email: userData?.email,
        }}
        validationSchema={profileValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => onSubmit(values)}>
        {({handleChange, handleSubmit, errors, values}) => {
          return (
            <Container>
              <EmptyTopView>
                <InStackHeader title="Edit Profile" />
                <LSInput
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                  placeholder={'Username'}
                />
                <LSInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder={'Email'}
                  error={errors.email}
                  rightIcon={EDIT_PROFILE_EMAIL_ICON}
                />
                <TopSpaceView>
                  <LSButton
                    title={'Change Password'}
                    size={Size.Full}
                    type={Type.Grey}
                    radius={20}
                    onPress={() => {}}
                  />
                </TopSpaceView>
              </EmptyTopView>
              <EmptyBottomView>
                <LSButton
                  title={'Save'}
                  size={Size.Full}
                  type={Type.Primary}
                  radius={20}
                  onPress={handleSubmit}
                />
              </EmptyBottomView>
            </Container>
          );
        }}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;
