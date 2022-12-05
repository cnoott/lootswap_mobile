/***
LootSwap - FIRST TAB SCREEN
***/

import React, {FC, useState} from 'react';
import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {InProfileHeader} from '../../components/commonComponents/headers/profileHeader';
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
  BOTTOM_TAB_PROFILE,
  PROFILE_ADDRESS,
  PROFILE_MY_LOOT,
  PROFILE_ORDERS,
  PROFILE_WALLET,
  PROFILE_REFERRAL,
  PROFILE_SUPPORT,
  PROFILE_SIGN_OUT,
  PROFILE_NOTIFICATION,
} from 'localsvgimages';
import {scale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {signOutRequest} from '../../redux/modules';

type Option = {
  icon: string;
  title: string;
  onPress: Function;
};

const optionsList: Array<Option> = [
  {
    icon: BOTTOM_TAB_PROFILE,
    title: 'Edit Profile',
    onPress: () => {},
  },
  {
    icon: PROFILE_ADDRESS,
    title: 'Address',
    onPress: () => {},
  },
  {
    icon: PROFILE_MY_LOOT,
    title: 'My loot',
    onPress: () => {},
  },
  {
    icon: PROFILE_ORDERS,
    title: 'Orders/Archive',
    onPress: () => {},
  },
  {
    icon: PROFILE_WALLET,
    title: 'Wallet',
    onPress: () => {},
  },
  {
    icon: PROFILE_NOTIFICATION,
    title: 'Notifications',
    onPress: () => {},
  },
  {
    icon: PROFILE_REFERRAL,
    title: 'Referral program',
    onPress: () => {},
  },
  {
    icon: PROFILE_SUPPORT,
    title: 'Customer support/Privacy Policy',
    onPress: () => {},
  },
];

export const ProfileScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [profileUrl, setProfileUrl] = useState('');
  const [isImageUploading, setImageUploading] = useState(false);
  const {userData} = auth;
  const onEditProfilePress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      // setImageUploading(true);
      const fileData = {
        ...image,
        type: image?.mime,
        uri:
          Platform.OS === 'android'
            ? image?.sourceURL
            : image?.sourceURL?.replace('file://', ''),
      };
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
  const renderOptionItem = (item: Option) => {
    return (
      <OptionItemContainer>
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
        {optionsList.map(item => {
          return renderOptionItem(item);
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
      <InProfileHeader />
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
