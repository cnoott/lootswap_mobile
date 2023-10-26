import {moderateScale, verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space} from 'styled-system';

export const SearchIconContainer = styled.View.attrs(() => ({
  mr: verticalScale(10),
}))`
  ${space}
  ${layout}
`;

export const DropdownStyle = {
  height: verticalScale(48),
  borderColor: 'gray',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
  marginTop: verticalScale(10),
};

export const DropdownStyleSearch = {
  height: verticalScale(48),
  borderColor: '#35383F',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
  marginTop: verticalScale(10),
  borderWidth: 1,
};

export const ItemContainerStyle = {
  borderRadius: 18,
};

export const SelectedBorder = {
  borderColor: '#6267FE',
};

export const PlaceholderStyle = {
  fontSize: moderateScale(14),
  fontWeight: '400',
};

export const SelectedTextStyle = {
  fontSize: moderateScale(14),
  fontWeight: '400',
};

export const InputSearchStyle = {
  height: verticalScale(40),
  fontSize: moderateScale(16),
};

export const IconStyle = {
  width: moderateScale(20),
  height: moderateScale(20),
};
