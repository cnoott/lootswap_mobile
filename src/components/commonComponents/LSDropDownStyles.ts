import {moderateScale, verticalScale} from 'react-native-size-matters';

export const DropdownStyle = {
  height: verticalScale(56),
  borderColor: 'gray',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
  marginTop: verticalScale(30),
};

export const DropdownStyleSearch = {
  height: verticalScale(56),
  borderColor: '#35383F',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
  marginTop: verticalScale(30),
  borderWidth: 1,
};

export const SelectedBorder = {
  borderColor: '#6267FE',
};

export const PlaceholderStyle = {
  fontSize: moderateScale(16),
  fontWeight: '400',
};

export const SelectedTextStyle = {
  fontSize: moderateScale(16),
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
