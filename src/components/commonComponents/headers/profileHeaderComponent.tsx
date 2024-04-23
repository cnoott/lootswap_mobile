import React, {FC} from 'react';
import {
  TouchableOpacity,
  OfferChatHeaderText,
  ProfileHeaderMessageContainer,
} from './styles';
import {LSProfileImageComponent} from '../profileImage';
import {LEFT_BLACK_ARROW, PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

interface ProfileHeaderComponentProps {
  otherUserName: string;
  otherUserData: any;
  otherUserPfp: string;
  profileInMiddle: boolean;
}

export const ProfileHeaderComponent: FC<
  ProfileHeaderComponentProps
> = props => {
  const {
    otherUserName,
    otherUserData,
    otherUserPfp,
    profileInMiddle = false,
  } = props;
  const navigation: NavigationProp<any, any> = useNavigation();

  return (
    <ProfileHeaderMessageContainer centerAligned={profileInMiddle}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgXml xml={LEFT_BLACK_ARROW} style={{marginRight: 17}} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PublicProfileScreen', {
            requestedUserDetails: otherUserData,
          })
        }>
        <LSProfileImageComponent
          profileUrl={otherUserPfp}
          imageHeight={34}
          imageWidth={34}
          imageRadius={17}
        />
        <OfferChatHeaderText>{otherUserName}</OfferChatHeaderText>
      </TouchableOpacity>

      <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} style={{opacity: 0}} />
    </ProfileHeaderMessageContainer>
  );
};

export default ProfileHeaderComponent;
