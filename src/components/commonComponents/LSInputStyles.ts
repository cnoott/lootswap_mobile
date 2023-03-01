import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const InputContainer = styled.View.attrs(props => ({
  marginTop: moderateScale(
    props.topSpace ? props.topSpace : props.isHomeSearch ? 0 : 15,
  ),
  mx: moderateScale(
    props.horizontalSpace ? props.horizontalSpace : props.isHomeSearch ? 0 : 24,
  ),
  bg: props?.inputBackColor
    ? props.inputBackColor
    : props.isHomeSearch
    ? props.theme.colors.commonSearchBack
    : props.theme.colors.inputBg,
  borderRadius: scale(props.inputRadius),
  pl: scale(props?.horizontalLeftPadding),
  pr: scale(props?.horizontalRightPadding),
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
  placeholderTextColor: '#404040',
  minHeight: scale(props?.height || 47),
  maxHeight: scale(240),
  shadowColor: props.theme.colors.primary,
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: {
    height: 1,
    width: 1,
  },
  fontSize: moderateScale(props.isHomeSearch ? 13 : 10),
  fontFamily: 'Urbanist',
  mx: scale(10),
  flex: 1,
  py: verticalScale(props.multiline ? 12 : 0),
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const Touchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
}))``;
