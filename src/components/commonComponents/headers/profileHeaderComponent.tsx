import React, {FC} from 'react';
import {
  TouchableOpacity,
  OfferChatHeaderText,
} from './styles';
import {LSProfileImageComponent} from '../profileImage';
import {LEFT_BLACK_ARROW} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';

interface ProfileHeaderComponentProps {
  otherUserName: string;
  otherUserData: any;
  otherUserPfp: string;

}

export const ProfileHeaderComponent: FC<
  ProfileHeaderComponentProps
> = props => {
  const {otherUserName, otherUserData, otherUserPfp} = props;
  const navigation: NavigationProp<any, any> = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SvgXml xml={LEFT_BLACK_ARROW} />
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
    </>
  );
};

export default ProfileHeaderComponent;