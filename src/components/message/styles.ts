import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const MessageBoxContainer = styled.View.attrs(props => ({
  maxWidth: '80%',
  minWidth: '15%',
  minHeight: scale(42),
  maxHeight: scale(420),
  borderRadius: scale(10),
  borderBottomLeftRadius: scale(props?.self ? 10 : 20),
  borderTopLeftRadius: scale(props?.self ? 10 : 5),
  borderBottomRightRadius: scale(props?.self ? 20 : 10),
  borderTopRightRadius: scale(props?.self ? 5 : 10),
  bg: props?.self
    ? props?.theme?.colors?.primary
    : props?.theme?.colors?.commonSearchBack,
  my: verticalScale(5),
  justifyContent: 'center',
  alignSelf: props?.self ? 'flex-end' : 'flex-start',
  mx: scale(10),
  p: scale(10),
  pl: scale(15),
  flexShrink: 1,
}))`
  ${layout}
  ${color}
  ${space}
`;

export const MessageText = styled.Text.attrs(props => ({
  color: props?.self ? props.theme.colors.white : props.theme.colors.text_light,
  flex: 1,
  flexWrap: 'wrap',
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-ExtraBold;
  font-weight: 400;
  text-align: left
  ${color}
  ${space}
  ${layout}
`;

export const TimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist;
  position: absolute;
  right: 10px;
  bottom: 20px;
  ${color}
  ${space}
  ${layout}
`;
