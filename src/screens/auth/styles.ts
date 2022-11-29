import styled from 'styled-components/native';
import {color, space, layout, border} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const Container = styled.View.attrs({
  flex: 1,
})`
  ${space}
`;

export const HeaderContainer = styled.View.attrs({
  mt: verticalScale(30),
  mb: verticalScale(30),
})`
  align-self: stretch;
  align-items: center;
  ${space}
`;

export const SignInText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: 26px;
  font-family: 'Inter-Light';
  ${color}
  ${space}
  ${layout}
`;

export const CreateAccountText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  mt: verticalScale(5),
}))`
  font-size: 14px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const BottomContainer = styled.View.attrs(() => ({
  position: 'absolute',
  flex: 1,
  left: 0,
  right: 0,
  bottom: 30,
}))`
  align-items: center;
  justify-content: center;
  ${layout}
  ${color}
  ${border}
`;

export const BottomButton = styled.TouchableOpacity.attrs(props => ({
  height: verticalScale(38),
  width: scale(220),
  borderRadius: scale(8),
  bg: props.theme.colors.primary,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  bottom: 60px;
  ${layout}
  ${color}
  ${border}
`;

export const ButtonText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: 22px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const TextInput = styled.TextInput.attrs(props => ({
  alignSelf: 'stretch',
  height: verticalScale(35),
  borderWidth: 2,
  borderColor: props.theme.colors.placeholder,
  marginBottom: verticalScale(10),
  paddingHorizontal: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ForgotText = styled.Text.attrs(props => ({
  color: props.theme.colors.placeholder,
}))`
  font-size: 15px;
  ${color}
  ${space}
${layout}
`;

export const LogoImage = styled.Image.attrs({
  width: scale(100),
  height: scale(100),
  alignSelf: 'center',
  mt: verticalScale(108),
})`
  ${color}
  ${space}
${layout}
`;

export const LogoText = styled.Text.attrs({
  textAlign: 'center',
  mt: verticalScale(18),
})`
  font-size: 40px;
  align-self: center;
  ${color}
  ${space}
${layout}
`;

export const Innercontainer = {
  flex: 1,
  paddingHorizontal: scale(20),
};
