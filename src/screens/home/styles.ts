import styled from 'styled-components/native';
import { color, layout, space } from 'styled-system';
import { scale, moderateScale } from 'react-native-size-matters';

export const Container = styled.View.attrs((props) => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(22),
  mt: moderateScale(52),
}))`
  ${space}
  ${layout}
`;

export const SubHeaderContainer = styled.TouchableOpacity.attrs(() => ({}))`
  margin-top: ${(props) => (props.marginTop ? moderateScale(props.marginTop) : 0)}px;
  flex-direction: row;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const ButtonContainer = styled.View.attrs(() => ({}))`
  margin-top: ${moderateScale(54)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${color}
  ${space}
    ${layout}
`;

export const Image = styled.Image.attrs({
  width: scale(59),
  height: scale(59),
  mr: moderateScale(10),
})`
  ${color}
  ${space}
${layout}
`;

export const Block = styled.View.attrs({})``;

export const Text = styled.Text.attrs((props) => ({
  color: props.color,
}))`
  fontsize: ${(props) => moderateScale(props.fontSize)}px;
  margin-right: ${(props) => (props.marginRight ? moderateScale(props.marginRight) : 0)}px;
  font-family: 'System85Pro-Medium';
  ${color}
  ${space}
  ${layout}
`;

export const PriceText = styled.Text.attrs((props) => ({
  color: props.color,
  mt: moderateScale(14),
}))`
  fontsize: ${moderateScale(48)}px;
  font-family: 'System85Pro-Regular';
  ${color}
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({}))`
  margin-top: ${moderateScale(20)}px;
  margin-bottom: ${moderateScale(300)}px;
  padding-vertical: ${moderateScale(5)}px;

  ${color}
  ${space}
  ${layout}
`;

export const MarginR = styled.View.attrs(() => ({}))`
  margin-right: ${moderateScale(6)}px;

  ${color}
  ${space}
  ${layout}
`;

export const MarginT = styled.View.attrs(() => ({}))`
  margin-top: ${(props) => (props.mt ? moderateScale(props.mt) : 0)}px;

  ${color}
  ${space}
  ${layout}
`;
