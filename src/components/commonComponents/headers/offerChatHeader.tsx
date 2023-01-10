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
import {Trade_Status} from 'custom_enums';

interface HeaderProps {
  profilePicture: string;
  title: string;
  onAcceptPress: Function;
  onDeclinePress: Function;
  onTrippleDotPress: Function;
  offerItem: any;
  userData: any;
  profileUrl?: string;
  tradeStatus: string;
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
    tradeStatus,
  }) => {
    const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

    const renderOptions = () => {
      if (tradeStatus === Trade_Status?.Accepted) {
        //The trade accepted header will be here
        return <></>;
      }

      if (tradeStatus === Trade_Status?.Canceled) {
        //the cancled header will be here
        return <></>;
      }

      if (userData?._id === offerItem.reciever._id) {
        return (
          <>
            <LSButton
              title={'Accept'}
              size={Size.Extra_Small}
              type={Type.Success}
              radius={20}
              onPress={() => onAcceptPress()}
            />
            <SpaceRowView />
            <SpaceRowView />
            <LSButton
              title={'Decline'}
              size={Size.Extra_Small}
              type={Type.Error}
              radius={20}
              onPress={() => onDeclinePress()}
            />
            <SpaceRowView />
          </>
        );
      } else {
        return (
          <>
            <LSButton
              title={'Decline'}
              size={Size.Extra_Small}
              type={Type.Error}
              radius={20}
              onPress={() => onDeclinePress()}
            />
            <SpaceRowView />
          </>
        );
      }
    };

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
          {renderOptions()}
          <ProfileLeftTouchable onPress={() => onTrippleDotPress()}>
            <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
          </ProfileLeftTouchable>
        </EmptyRowView>
      </ProfileHeaderContainer>
    );
  },
);
