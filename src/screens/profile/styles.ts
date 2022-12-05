import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  mx: moderateScale(15),
}))`
  ${space}
  ${layout}
`;

export const ProfileContainerView = styled.View.attrs({
  width: scale(105),
  height: scale(105),
})`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${space}
`;

export const ProfileUploadView = styled.TouchableOpacity``;

export const EditIconContainer = styled.TouchableOpacity.attrs(() => ({
  zIndex: 1000,
}))`
  position: absolute;
  right: 0px;
  bottom: 5px;
`;

export const Image = styled.Image.attrs({
  width: scale(100),
  height: scale(100),
  borderRadius: scale(50),
})`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const ImageUploadIndicator = styled.ActivityIndicator.attrs(props => ({
  size: scale(25),
  color: props.theme.colors.primary,
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const UserNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: 10,
}))`
  font-size: ${moderateScale(24)}px;
  font-family: Inter-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const FullWidthDivider = styled.View.attrs(props => ({
  height: verticalScale(1),
  bg: props.theme.colors.grey,
}))`
  align-self: stretch;
  ${space}
  ${layout}
  ${color}
`;

export const OptionsContainer = styled.View.attrs(props => ({
  px: moderateScale(3),
  mt: verticalScale(20),
}))`
  align-self: stretch;
  ${space}
`;

export const OptionItemContainer = styled.TouchableOpacity.attrs(props => ({
  py: verticalScale(5),
  mb: verticalScale(10),
  hitSlop: {top: 5, bottom: 5, left: 20, right: 20},
}))`
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  ${space}
`;

export const OptionText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(10),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignOutContainer = styled.TouchableOpacity.attrs(props => ({
  py: verticalScale(5),
  hitSlop: {top: 5, bottom: 5, left: 20, right: 20},
}))`
  align-self: stretch;
  align-items: center;
  flex-direction: row;
  ${space}
`;

export const SignOutText = styled.Text.attrs(props => ({
  color: props.theme.colors.redAlert,
  ml: scale(10),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;
