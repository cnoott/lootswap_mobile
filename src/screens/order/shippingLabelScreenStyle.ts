import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled(KeyboardAwareScrollView).attrs(() => ({
  mx: scale(20),
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  flex: 1,
}))`
  ${color}
  ${layout}
  ${space}
`;

export const FullDivider = styled.View.attrs(props => ({
  bg: props.theme.colors.divider,
  height: verticalScale(1),
  width: '100%',
  alignSelf: 'center',
}))`
  ${space}
  ${layout}
  ${color}
`;

export const AddressContainer = styled.View.attrs(() => ({
  my: verticalScale(30),
  ml: scale(5),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const SubHeaderLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
  ${color}
`;

export const AddressText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  maxWidth: scale(180),
  mt: verticalScale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter;
  font-weight: 300;
  ${space}
  ${layout}
    ${color}
`;

export const TipContainer = styled.View.attrs(props => ({
  p: verticalScale(15),
  mb: verticalScale(20),
  bg: props.theme.colors.commonSearchBack,
  borderRadius: scale(10),
  alignSelf: 'stretch',
}))`
  ${space}
  ${layout}
    ${color}
    ${border}
`;

export const TipLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
    ${color}
`;

export const TipRowView = styled.View.attrs(() => ({
  ml: scale(10),
  mt: scale(10),
}))`
  flex-direction: row;
  ${space}
  ${layout}
  ${color}
`;

export const TipDotView = styled.View.attrs(props => ({
  height: scale(4),
  width: scale(4),
  bg: props.theme.colors.greyLabel,
  mr: scale(10),
  borderRadius: scale(2),
  mt: verticalScale(6),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const TipText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  maxWidth: '98%',
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${space}
  ${layout}
  ${color}
`;

export const SizeRowView = styled.View.attrs(() => ({
  mt: scale(10),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
  ${layout}
  ${color}
`;

export const SizeBox = styled.View.attrs(props => ({
  height: verticalScale(45),
  width: scale(80),
  bg: props.theme.colors.inputBg,
  borderRadius: scale(10),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const SizeLeftLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  maxWidth: scale(60),
  numberOfLines: 1,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
    ${color}
`;

export const SizeRightLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.placeholder,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
    ${color}
`;

export const DividerText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter;
  ${space}
  ${layout}
  ${color}
`;

export const Touchable = styled.TouchableOpacity``;

export const CalculateSizeText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  ml: scale(40),
  my: verticalScale(20),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Inter;
  font-weight: 400;
  text-decoration: underline;
  ${space}
  ${layout}
  ${color}
`;

export const WeightRowView = styled.View.attrs(() => ({
  mt: scale(10),
}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${layout}
  ${color}
`;

export const HorizontalSpace = styled.View.attrs(() => ({
  ml: scale(5),
}))`
  ${space}
`;

export const ChooseRateContainer = styled.View.attrs(() => ({
  my: verticalScale(30),
  ml: scale(5),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const RateTouchable = styled.TouchableOpacity.attrs((props: any) => ({
  mr: scale(10),
  height: scale(74),
  width: scale(82),
  borderRadius: scale(10),
  borderColor: props?.selected
    ? props?.theme?.colors?.primary
    : props?.theme?.colors?.searchBorder,
  borderWidth: 2,
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const USPSTopView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const USPSLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
  ${color}
`;

export const PriceLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  ${space}
  ${layout}
    ${color}
`;

export const DesText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mt: verticalScale(10),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter;
  ${space}
  ${layout}
    ${color}
`;
