/***
LootSwap - FIRST TAB SCREEN
***/

import React, {FC, useState} from 'react';
// import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  Container,
  SubContainer,
  ProfileContainerView,
  ProfileUploadView,
  EditIconContainer,
  Image,
  ImageUploadIndicator,
  UserNameText,
  FullWidthDivider,
  OptionsContainer,
  OptionItemContainer,
  OptionText,
  EmptyRowView,
  SignOutContainer,
  SignOutText,
} from './styles';
import {
  EDIT_PROFILE_ICON,
  PROFILE_PLACEHOLDER_ICON,
  RIGHT_ARROW,
  PROFILE_SIGN_OUT,
} from 'localsvgimages';
import {scale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {signOutRequest} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getProfileOptions} from '../../utility/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Option = {
  icon: string;
  title: string;
  index: Number;
};

export const ProfileScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const [profileUrl, setProfileUrl] = useState('');
  const [isImageUploading, setImageUploading] = useState(false);
  const {userData} = auth;
  const onProfileOptionPress = (index: Number) => {
    switch (index) {
      case 1:
        navigation.navigate('EditProfileScreen');
        break;
      case 3:
        navigation.navigate('MyLootScreen');
        break;
      case 6:
        navigation.navigate('NotificationSettingScreen');
        break;
      default:
        break;
    }
  };
  const onEditProfilePress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setImageUploading(true);
      // const fileData = {
      //   ...image,
      //   type: image?.mime,
      //   uri:
      //     Platform.OS === 'android'
      //       ? image?.sourceURL
      //       : image?.sourceURL?.replace('file://', ''),
      // };

      // Unwanted code
      setProfileUrl(image.path);
      setImageUploading(false);
    });
  };
  const onSignoutPress = () => {
    dispatch(signOutRequest());
  };
  const renderProfileUploadView = () => {
    return (
      <ProfileContainerView>
        <ProfileUploadView onPress={onEditProfilePress}>
          <SvgXml
            xml={PROFILE_PLACEHOLDER_ICON}
            height={scale(100)}
            width={scale(100)}
          />
          {profileUrl ? (
            <Image source={{uri: userData?.profileUrl}} />
          ) : (
            <Image source={{uri: userData?.profile_picture}} />
          )}
          <EditIconContainer onPress={onEditProfilePress}>
            <SvgXml
              xml={EDIT_PROFILE_ICON}
              height={scale(22)}
              width={scale(25)}
            />
          </EditIconContainer>
        </ProfileUploadView>
        {isImageUploading && <ImageUploadIndicator />}
      </ProfileContainerView>
    );
  };
  const renderOptionItem = (item: Option, index: Number) => {
    return (
      <OptionItemContainer
        key={index}
        onPress={() => onProfileOptionPress(item?.index)}>
        <EmptyRowView>
          <SvgXml xml={item?.icon} />
          <OptionText>{item?.title}</OptionText>
        </EmptyRowView>
        <SvgXml xml={RIGHT_ARROW} />
      </OptionItemContainer>
    );
  };
  const renderOptions = () => {
    return (
      <OptionsContainer>
        {getProfileOptions().map((item, index) => {
          return renderOptionItem(item, index);
        })}
      </OptionsContainer>
    );
  };
  const renderSignOut = () => {
    return (
      <SignOutContainer onPress={onSignoutPress}>
        <SvgXml xml={PROFILE_SIGN_OUT} />
        <SignOutText>{'Sign Out'}</SignOutText>
      </SignOutContainer>
    );
  };
  return (
    <Container>
      <InStackHeader back={false} right={true} />
      <SubContainer>
        {renderProfileUploadView()}
        <UserNameText>{userData?.name}</UserNameText>
        <FullWidthDivider />
        {renderOptions()}
        {renderSignOut()}
      </SubContainer>
    </Container>
  );
};

export default ProfileScreen;
