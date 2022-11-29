import { ViewStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { color, space, layout } from 'styled-system';

export const Container = styled.View.attrs((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.modalBg,
}))``;

export const SubContainer = styled.View.attrs((props) => ({
  borderRadius: moderateScale(11.5),
  backgroundColor: props.theme.colors.secondary,
}))``;

export const ModalContainer = styled.View.attrs(() => ({
  height: moderateScale(54),
  marginLeft: moderateScale(17),
  marginTop: moderateScale(34),
}))`
  flex-direction: row;
  align-items: center;
`;

export const FlatList = styled.FlatList.attrs(() => ({}))``;

export const CenterBlock = styled.View.attrs(() => ({
  flex: 1,
}))``;

export const Touchable = styled.TouchableOpacity.attrs((props) => ({
  bg: props.theme.colors.bg,
  width: moderateScale(34),
  height: moderateScale(34),
}))`
  padding: 5px;
  margin-right: ${moderateScale(15)}px;
  border-radius: ${moderateScale(17)}px;
  align-items: center;
  ${color}
`;

export const HorizontalSeparator = styled.View.attrs((props) => ({
  height: moderateScale(2),
  bg: props.theme.colors.bg,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BlurStyle: ViewStyle = { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 };
