import {
  ProfileHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
  ProfileLeftTouchable,
  EmptyRowView,
  EmptyBox,
  RightIconTextContainer,
  RightIconText,
} from './styles';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  PROFILE_TRIPPLE_DOT_ICON,
  LEFT_BLACK_ARROW,
  LIKE_HEART_ICON,
  LIKE_HEART_ICON_RED,
  LIKE_HEART_ICON_WHITE,
} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  back?: boolean;
  right?: boolean;
  centerAligned?: boolean;
  onBackCall?: Function;
  onlyTitleCenterAlign?: boolean;
  printLabel?: boolean;
  printLabelButton?: any;
  heartIconRight?: boolean;
  heartIsRed?: boolean;
  onRightIconPress?: Function;
  rightIcon: any;
  rightIconText: string;
}

export const InStackHeader: FC<HeaderProps> = React.memo(props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const {
    title = 'Profile',
    back = true,
    right = false,
    centerAligned = false,
    onlyTitleCenterAlign = false,
    onBackCall,
    printLabel = false,
    printLabelButton = () => {},
    heartIconRight = false,
    heartIsRed = false,
    onRightIconPress = () => {},
    rightIconText = false,
    rightIcon = PROFILE_TRIPPLE_DOT_ICON,
  } = props;
  const onBackPress = () => {
    if (onBackCall) {
      onBackCall();
    } else {
      navigation.goBack();
    }
  };
  if (onlyTitleCenterAlign) {
    return (
      <ProfileHeaderContainer>
        {back ? (
          <ProfileLeftTouchable onPress={onBackPress}>
            <SvgXml xml={LEFT_BLACK_ARROW} />
          </ProfileLeftTouchable>
        ) : (
          <EmptyBox />
        )}
        <ProfileHeaderText>{title}</ProfileHeaderText>
        {right ? (
          <ProfileRightTouchable onPress={onRightIconPress}>
            <RightIconTextContainer>
              <SvgXml xml={rightIcon} />
              {rightIconText && <RightIconText>Filter</RightIconText>}
            </RightIconTextContainer>
          </ProfileRightTouchable>
        ) : (
          <EmptyBox />
        )}
        </ProfileHeaderContainer>
    );
  }
  return (
    <ProfileHeaderContainer centerAligned={centerAligned}>
      <EmptyRowView>
        {back && (
          <ProfileLeftTouchable onPress={onBackPress}>
            <SvgXml xml={LEFT_BLACK_ARROW} />
          </ProfileLeftTouchable>
        )}
        <ProfileHeaderText>{title}</ProfileHeaderText>
      </EmptyRowView>

      {heartIconRight ? (
        <ProfileRightTouchable onPress={onRightIconPress}>
          <SvgXml xml={heartIsRed ? LIKE_HEART_ICON_RED : LIKE_HEART_ICON} />
        </ProfileRightTouchable>
      ) : (
        <EmptyBox />
      )}


      {printLabel && printLabelButton()}
    </ProfileHeaderContainer>
  );
});
