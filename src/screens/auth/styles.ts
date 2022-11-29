import styled from 'styled-components/native';
import { color, space, layout, border } from 'styled-system';
import { scale, verticalScale } from 'react-native-size-matters';

export const Container = styled.View.attrs({
  flex: 1,
})`
  ${color}
  ${space}
`;

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

export const ForgotContainer = styled.TouchableOpacity.attrs(() => ({}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${layout}
  ${color}
  ${border}
`;

export const ForgotText = styled.Text.attrs((props) => ({
  color: props.theme.colors.placeholder,
}))`
  font-size: 15px;
  font-family: 'System85Pro-Regular';
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
  font-family: 'Migra-Extrabold';

  ${color}
  ${space}
${layout}
`;
