import styled from 'styled-components/native';
import {color, space, layout, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ViewStyle} from 'react-native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.white,
}))`
  ${color}
`;

export const CreateContainer = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.white,
}))`
  justify-content: space-evenly;
  align-items: center;
  ${color}
`;

export const ButtonsContainer = styled.View.attrs(() => ({
}))`
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View.attrs({
  mt: verticalScale(20),
  mb: verticalScale(25),
  ml: scale(12),
})`
  ${space}
`;

export const SignInContainer = styled.View.attrs(() => ({
}))`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(15),
}))`
  font-size: ${scale(25)}px;
  font-family: Urbanist-Black;
  ${color}
  ${space}
  ${layout}
`;

export const TitleLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${scale(25)}px;
  font-family: Urbanist-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;


export const HeaderDesLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mt: scale(2),
  mb: verticalScale(46),
  ml: scale(15),
}))`
  font-size: ${scale(12)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${color}
  ${space}
  ${layout}
`;

export const TermsLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  my: scale(20),
}))`
  font-size: ${scale(11)}px;
  font-family: Urbanist;
  align-self: center;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const TermsLabelDark = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: scale(20),
}))`
  font-size: ${scale(12)}px;
  font-family: Urbanist;
  font-weight: 600;
  align-self: center;
  text-align: center;
  text-decoration: underline;
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
}))``;

export const ForgotPassLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(20),
}))`
  font-size: 16px;
  font-family: 'Urbanist-Bold';
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const FullView = styled.View.attrs({
  flex: 1,
})``;

export const ProfileContainerView = styled.View.attrs({
  width: scale(100),
  height: scale(60),
  ml: moderateScale(10),
  pb: moderateScale(10),
})`
  align-items: center;
  justify-content: center;
  ${space}
  ${color}
`;

export const ProfileUploadView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const EditIconContainer = styled.TouchableOpacity.attrs(() => ({
  zIndex: 1000,
}))`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

export const BottomButton = styled.TouchableOpacity.attrs(() => ({
  mb: verticalScale(35),
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const ButtonText1 = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${scale(13)}px;
  font-family: 'Urbanist-Light';
  ${color}
  ${space}
  ${layout}
`;

export const ButtonText2 = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${scale(13)}px;
  font-family: 'Urbanist-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs({
  width: scale(90),
  height: scale(90),
  borderRadius: scale(47),
  zIndex: 1000,
})`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const ImageUploadIndicator = styled.ActivityIndicator.attrs(props => ({
  size: scale(30),
  color: props.theme.colors.primary,
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const Innercontainer: ViewStyle = {
  flex: 1,
};

export const LogoImage = styled.Image.attrs({
  width: scale(220),
  height: scale(45),
})`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const ProfileRightView = styled.View.attrs(() => ({
  ml: scale(10),
}))`
  flex-direction: column;
  ${space}
`;

export const ProfileText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(5),
}))`
  font-size: ${scale(16)}px;
  font-family: 'Urbanist-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const HorizontalSpace = styled.View.attrs((props: any) => ({
  width: scale(props?.space || 10),
}))`
  ${space}
`;

export const Button = styled.TouchableOpacity.attrs((props: any) => ({
  px: scale(10),
  py: scale(8),
  bg: props?.primary
    ? props?.theme?.colors?.primary
    : props?.theme?.colors?.black,
  borderRadius: scale(15),
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${border}
`;

export const ButtonText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
  ml: scale(5),
}))`
  font-size: ${scale(12)}px;
  font-family: 'Urbanist';
  font-weight: 600;
  ${color}
  ${space}
`;

export const HaveAccountText = styled.Text.attrs(() => ({
  ml: scale(5),
}))`
  font-size: ${scale(13)}px;
  font-family: 'Urbanist-Light';
  ${color}
  ${space}
`;

export const SigninText = styled.Text.attrs(() => ({
  ml: scale(5),
}))`
  font-size: ${scale(13)}px;
  font-family: 'Urbanist-SemiBold';
  ${color}
  ${space}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;
