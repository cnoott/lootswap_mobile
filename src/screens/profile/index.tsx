/***
LootSwap - FIRST TAB SCREEN
***/

import React, {FC, useState, useEffect} from 'react';
import {Platform} from 'react-native';
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
  BottomView,
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
import {signOutRequest, updateUser} from '../../redux/modules';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {getProfileOptions} from '../../utility/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getSignedRequest, uploadFile} from '../../services/imageUploadService';
import {WEB_APP_URL} from '@env';
import {Linking} from 'react-native';

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
      case 2:
        navigation.navigate('AddressScreen');
        break;
      case 3:
        navigation.navigate('MyLootScreen');
        break;
      case 4:
        navigation.navigate('MyOrdersListScreen');
        break;
      case 5:
        navigation.navigate('WalletScreen');
        break;
      case 6:
        navigation.navigate('LinkPaypalScreen', {goToListLoot: false});
        break;
      case 7:
        navigation.navigate('NotificationSettingScreen');
        break;
      case 8:
        Linking.openURL(`${WEB_APP_URL}/faq`);
        break;
      default:
        break;
    }
  };
  const onEditProfilePress = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.01,
      compressImageMaxHeight: 500,
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
              dispatch(updateUser({
                userId: userData?._id,
                userData: {profile_picture: url},
              }));
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
            <Image source={{uri: profileUrl}} />
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
        {getProfileOptions(userData).map((item, index) => {
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
        <BottomView />
      </SubContainer>
    </Container>
  );
};

export default ProfileScreen;
