import {
  ProfileHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
  ProfileLeftTouchable,
  EmptyRowView,
  EmptyBox,
} from './styles';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {PROFILE_TRIPPLE_DOT_ICON, LEFT_BLACK_ARROW} from 'localsvgimages';
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
  } = props;
  const onTrippleDotPress = () => {};
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
          <ProfileRightTouchable onPress={onTrippleDotPress}>
            <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
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
      {right && (
        <ProfileRightTouchable onPress={onTrippleDotPress}>
          <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
        </ProfileRightTouchable>
      )}
      {printLabel && printLabelButton()}
    </ProfileHeaderContainer>
  );
});
