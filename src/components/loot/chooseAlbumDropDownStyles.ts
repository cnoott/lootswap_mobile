import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space} from 'styled-system';

export const DropdownStyle = {
  height: verticalScale(48),
  width: scale(100),
  marginLeft: scale(13),
};

export const SelectedTextStyle = {
  fontSize: moderateScale(18),
  fontFamily: 'Urbanist-Bold',
  fontWeight: '700',
  color: 'black',
};

export const ItemTextStyle = {
  fontSize: moderateScale(17),
  fontFamily: 'Urbanist-Bold',
  fontWeight: '400',
  color: 'black',
};
