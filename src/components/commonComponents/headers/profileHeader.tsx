import {
  ProfileHeaderText,
  ProfileHeaderContainer,
  ProfileRightTouchable,
} from './styles';
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import {signOutRequest} from '../../../redux/modules';
// import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title?: string;
}

export const InProfileHeader: FC<HeaderProps> = React.memo(() => {
  const dispatch = useDispatch();
  const onTrippleDotPress = () => {
    // dispatch(signOutRequest());
  };

  return (
    <ProfileHeaderContainer>
      <ProfileHeaderText>Profile</ProfileHeaderText>
      <ProfileRightTouchable onPress={onTrippleDotPress}>
        <SvgXml xml={PROFILE_TRIPPLE_DOT_ICON} />
      </ProfileRightTouchable>
    </ProfileHeaderContainer>
  );
});
