import {
  ProfileHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
  ProfileLeftTouchable,
  EmptyRowView,
} from './styles';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {LEFT_BLACK_ARROW, HOME_SEARCH_INPUT_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  back?: boolean;
  centerAligned?: boolean;
  onBackCall?: Function;
}

export const LSStackHeaderWithSearch: FC<HeaderProps> = React.memo(props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const {
    title = 'Profile',
    back = true,
    centerAligned = false,
    onBackCall,
  } = props;
  const onSearchPress = () => {};
  const onBackPress = () => {
    if (onBackCall) {
      onBackCall();
    } else {
      navigation.goBack();
    }
  };
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
      <ProfileRightTouchable onPress={onSearchPress}>
        <SvgXml xml={HOME_SEARCH_INPUT_ICON} />
      </ProfileRightTouchable>
    </ProfileHeaderContainer>
  );
});
