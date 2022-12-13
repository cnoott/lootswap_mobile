import {
  StackHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
  EmptyRowView,
} from './styles';
import {LEFT_BLACK_ARROW} from 'localsvgimages';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import {PhoneIcon} from 'react-native-heroicons/outline';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from 'styled-components';
import LSButton from '../LSButton';
import {Size, Type} from '../../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

export const InUserChatHeader: FC<HeaderProps> = React.memo(({title}) => {
  const theme = useTheme();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const onTrippleDotPress = () => {};

  return (
    <ProfileHeaderContainer>
      <EmptyRowView>
        <SvgXml xml={LEFT_BLACK_ARROW} />
        <StackHeaderText>{title}</StackHeaderText>
      </EmptyRowView>
      {true ? (
        <LSButton
          title={'View Item'}
          size={Size.Extra_Small}
          type={Type.Secondary}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <EmptyRowView>
          <ProfileRightTouchable onPress={onTrippleDotPress}>
            <PhoneIcon size={moderateScale(20)} color={theme?.colors?.black} />
          </ProfileRightTouchable>
          <ProfileRightTouchable onPress={onTrippleDotPress}>
            <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
          </ProfileRightTouchable>
        </EmptyRowView>
      )}
    </ProfileHeaderContainer>
  );
});
