import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {Platform} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs(() => ({
  flex: 1,
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  flex: 1,
}))``;

export const InputContainer = styled.View.attrs(props => ({
  mb: verticalScale(props?.bottomSpace || 16),
  px: scale(20),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const InputView = styled.View.attrs(() => ({
  width: '80%',
}))``;

export const Touchable = styled.TouchableOpacity``;

export const InputRightButtonView = styled.View.attrs(props => ({
  width: scale(48),
  height: scale(48),
  borderRadius: scale(24),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.theme?.colors?.primary,
}))`
  ${layout}
  ${color}
`;

export const SectionList = styled.SectionList.attrs(() => ({
  showVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ListHeaderContainer = styled.View.attrs(props => ({
  width: scale(108),
  height: scale(30),
  borderRadius: scale(10),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.theme?.colors?.divider,
}))`
  align-self: center;
  ${layout}
  ${color}
`;

export const ListHeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: 'Inter-Light';
  ${color}
  ${space}
  ${layout}
`;

export const MessageBoxContainer = styled.View.attrs(props => ({
  width: '70%',
  height: scale(80),
  borderRadius: scale(10),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.theme?.colors?.divider,
  my: verticalScale(15),
  alignSelf: props?.self ? 'flex-end' : 'flex-start',
}))`
  ${layout}
  ${color}
  ${space}
`;
