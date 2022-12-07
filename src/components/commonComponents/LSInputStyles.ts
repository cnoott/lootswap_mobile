import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';
import {scale, moderateScale} from 'react-native-size-matters';

export const InputContainer = styled.View.attrs(props => ({
  marginTop: moderateScale(props.isHomeSearch ? 10 : 15),
  mx: moderateScale(props.isHomeSearch ? 0 : 24),
  bg: props.theme.colors.inputBg,
  borderRadius: scale(8.5),
  px: scale(10),
  borderWidth: moderateScale(props.isHomeSearch ? 1 : 0),
  marginBottom: moderateScale(props.isHomeSearch ? 10 : 0),
  borderColor: props.theme.colors.lightGrey,
}))`
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${border}
`;

export const ErrorText = styled.Text.attrs(props => ({
  color: props.theme.colors.danger,
  mb: scale(10),
  mt: scale(3),
  mx: moderateScale(24),
}))`
  font-size: ${moderateScale(12)}px;
  ${color}
  ${space}
`;

export const TextInput = styled.TextInput.attrs(props => ({
  color: props.theme.colors.black,
  placeholderTextColor: props.theme.colors.placeholder,
  height: scale(47),
  shadowColor: props.theme.colors.primary,
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: {
    height: 1,
    width: 1,
  },
  fontSize: moderateScale(props.isHomeSearch ? 17 : 15),
  mx: scale(10),
  flex: 1,
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const Touchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
}))``;
