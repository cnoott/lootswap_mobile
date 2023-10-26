/***
  LOOTSWAP - START TRADE HEADER COMPONENT
 ***/
import React, {FC} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LEFT_BLACK_ARROW} from 'localsvgimages';
import {
  ChatOfferContainer,
  StartTradeHeaderContainer,
  EmptyRowView,
  TouchableOpacity,
  StartTradeText,
  StartTradeSubText,
} from './styles';
import {SvgXml} from 'react-native-svg';
import {LSProfileImageComponent} from '../profileImage';

interface HeaderProps {
  profilePicture: string;
  title: string;
  subText?: string;
  showPfp: boolean;
  onBackPress: Function;
}

export const LSStartTradeHeader: FC<HeaderProps> = React.memo(
  ({profilePicture, title, subText, showPfp, onBackPress}) => {
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top;

    return (
      <ChatOfferContainer paddingTop={paddingTop}>
        <StartTradeHeaderContainer>
          <EmptyRowView>
            <TouchableOpacity onPress={() => onBackPress()}>
              <SvgXml xml={LEFT_BLACK_ARROW} />
            </TouchableOpacity>
          </EmptyRowView>
          <EmptyRowView>
            {showPfp && (
              <LSProfileImageComponent
                profileUrl={profilePicture}
                imageHeight={34}
                imageWidth={34}
                imageRadius={17}
              />
            )}
            <StartTradeText showPfp={showPfp}>{title}</StartTradeText>
          </EmptyRowView>
          <EmptyRowView />
        </StartTradeHeaderContainer>
        {subText && <StartTradeSubText>{subText}</StartTradeSubText>}
      </ChatOfferContainer>
    );
  },
);

export default LSStartTradeHeader;
