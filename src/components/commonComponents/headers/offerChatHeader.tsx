import {
  OfferChatHeaderText,
  ProfileHeaderContainer,
  ProfileLeftTouchable,
  EmptyRowView,
  TouchableOpacity,
  SpaceRowView,
} from './styles';
import {LEFT_BLACK_ARROW} from 'localsvgimages';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import LSButton from '../LSButton';
import {Size, Type} from '../../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LSProfileImageComponent} from '../profileImage';

interface HeaderProps {
  profilePicture: string;
  title: string;
  onAcceptPress: Function;
  onDeclinePress: Function;
  onTrippleDotPress: Function;
  offerItem: any;
  userData: any;
}

export const LSOfferChatHeader: FC<HeaderProps> = React.memo(
  ({
    title,
    onAcceptPress,
    onDeclinePress,
    onTrippleDotPress,
    profilePicture,
    offerItem,
    userData,
  }) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
    return (
      <ProfileHeaderContainer>
        <EmptyRowView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={LEFT_BLACK_ARROW} />
          </TouchableOpacity>
          <LSProfileImageComponent
            profileUrl={profilePicture}
            imageHeight={34}
            imageWidth={34}
            imageRadius={17}
          />
          <OfferChatHeaderText>{title}</OfferChatHeaderText>
        </EmptyRowView>
        <EmptyRowView>
          {offerItem?.reciever._id === userData?._id &&
            <LSButton
              title={'Accept'}
              size={Size.Extra_Small}
              type={Type.Success}
              radius={20}
              onPress={() => onAcceptPress()}
            />
          }
          <SpaceRowView />
          <SpaceRowView />
          <LSButton
            title={
              offerItem?.reciever._id === userData?._id ? 'Decline' : 'Cancel'
            }
            size={Size.Extra_Small}
            type={Type.Error}
            radius={20}
            onPress={() => onDeclinePress()}
          />
          <SpaceRowView />
          <ProfileLeftTouchable onPress={() => onTrippleDotPress()}>
            <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
          </ProfileLeftTouchable>
        </EmptyRowView>
      </ProfileHeaderContainer>
    );
  },
);
