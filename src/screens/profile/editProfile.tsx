/***
LootSwap - EDIT PROFILE SCREEN
***/

import React, {FC, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSInput from '../../components/commonComponents/LSInput';
import {LSModal} from '../../components/commonComponents/LSModal';
import LSButton from '../../components/commonComponents/LSButton';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {ModalContainerView, ModalHeaderText, TopMargin} from '../offers/styles';
import {updateUser} from '../../redux/modules';
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
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onCloseModal = () => setIsModalVisible(false);
  const [pressedYes, setPressedYes] = useState(false);

  const profileValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter username')
      .matches(/^[a-zA-Z0-9]+$/, 'Please enter valid username'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please enter email'),
  });

  const onDeleteAccount = () => {
    setIsModalVisible(true);
  };

  const onSubmit = (values: FormProps) => {
    dispatch(
      updateUser({
        userId: userData?._id,
        userData: values,
      }),
    );
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Innercontainer}
      keyboardShouldPersistTaps={'handled'}>
      <Formik
        initialValues={{
          name: userData?.name,
          email: userData?.email,
        }}
        validationSchema={profileValidationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => onSubmit(values)}>
        {({handleChange, handleSubmit, errors, values}) => {
          return (
            <Container>
              <LSModal
                isVisible={isModalVisible}
                onBackdropPress={() => onCloseModal()}>
                <LSModal.BottomContainer>
                  <TopMargin />
                  <ModalHeaderText>
                    {pressedYes
                      ? 'Press yes again to confirm '
                      : 'Are you sure you want to delete your account?'}
                  </ModalHeaderText>
                  <TopMargin />
                  {pressedYes ? (
                    <LSButton
                      title={'YES!!!!'}
                      size={Size.Fit_To_Width}
                      type={Type.Primary}
                      radius={20}
                      fitToWidth={'90%'}
                      onPress={() => {}}
                    />
                  ) : (
                    <LSButton
                      title={"Yes, I'm sure"}
                      size={Size.Fit_To_Width}
                      type={Type.Primary}
                      radius={20}
                      fitToWidth={'90%'}
                      onPress={() => setPressedYes(true)}
                    />
                  )}
                  <TopMargin margin={2} />
                  <LSButton
                    title={'Cancel'}
                    size={Size.Fit_To_Width}
                    type={Type.Grey}
                    radius={20}
                    fitToWidth={'90%'}
                    onPress={() => onCloseModal()}
                  />
                  <LSModal.CloseButton
                    onCloseButtonPress={() => onCloseModal()}
                  />
                </LSModal.BottomContainer>
              </LSModal>
              <EmptyTopView>
                <InStackHeader title="Edit Profile" />
                <LSInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name}
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
                    title={'Delete Account'}
                    size={Size.Full}
                    type={Type.Error}
                    radius={20}
                    onPress={() => onDeleteAccount()}
                  />
                  {/*
                  <LSButton
                    title={'Change Password'}
                    size={Size.Full}
                    type={Type.Grey}
                    radius={20}
                    onPress={() => {}}
                  />
                  */}
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
