import {moderateScale, verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const StepOneContainer = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
  m: moderateScale(20),
}))`
  ${space}
  ${layout}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mt: verticalScale(50),
}))`
  ${space}
  ${layout}
`;

export const DropdownStyle = {
  height: verticalScale(56),
  borderColor: 'gray',
  borderRadius: moderateScale(16),
  paddingHorizontal: moderateScale(20),
  backgroundColor: '#FAFAFA',
};

export const PlaceholderStyle = {
  fontSize: moderateScale(16),
};

export const SelectedTextStyle = {
  fontSize: 16,
};

export const InputSearchStyle = {
  height: 40,
  fontSize: 16,
};

export const IconStyle = {
  width: moderateScale(20),
  height: moderateScale(20),
};

export const Innercontainer = {
  flex: 1,
  margin: moderateScale(15),
  marginHorizontal: moderateScale(25),
};
