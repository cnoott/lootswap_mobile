/***
  LOOTSWAP - START TRADE HEADER COMPONENT
 ***/
import React, {FC} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LEFT_BLACK_ARROW} from 'localsvgimages';
import {
  ChatOfferContainer,
  StartTradeHeaderContainer,
  EmptyRowView,
  TouchableOpacity,
  StartTradeText,
} from './styles';
import {SvgXml} from 'react-native-svg';
import {LSProfileImageComponent} from '../profileImage';

interface HeaderProps {
  profilePicture: string;
  title: string;
  isReview: boolean;
  onBackPress: Function;
}

export const LSStartTradeHeader: FC<HeaderProps> = React.memo(
  ({profilePicture, title, isReview, onBackPress}) => {

    return (
      <ChatOfferContainer>
        <StartTradeHeaderContainer>
          <EmptyRowView>
            <TouchableOpacity onPress={() => onBackPress()}>
              <SvgXml xml={LEFT_BLACK_ARROW}/>
            </TouchableOpacity>
          </EmptyRowView>
          <EmptyRowView>
            {!isReview && (
              <LSProfileImageComponent
                profileUrl={profilePicture}
                imageHeight={34}
                imageWidth={34}
                imageRadius={17}
              />
            )}
            <StartTradeText isReview={isReview}>{title}</StartTradeText>
            </EmptyRowView>
          <EmptyRowView />
        </StartTradeHeaderContainer>
      </ChatOfferContainer>
    );
  },
);

export default LSStartTradeHeader;