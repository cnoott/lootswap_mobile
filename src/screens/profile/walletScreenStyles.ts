import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  mx: moderateScale(20),
}))`
  ${space}
`;

export const MainLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(20),
  ml: scale(20),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${space}
  ${layout}
`;

export const WalletContainer = styled.View.attrs(() => ({
  height: verticalScale(220),
  mx: scale(10),
  alignSelf: 'stretch',
  borderRadius: scale(15),
  my: verticalScale(20),
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
  ${border}
`;

export const BalenceLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(56)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  align-self: center;
  position: absolute;
  ${space}
  ${layout}
  ${color}
`;

export const DesLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mx: scale(5),
  mb: verticalScale(40),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter;
  font-weight: 500;
  text-align: center;
  ${space}
  ${layout}
`;

export const EmptyTopView = styled.View``;
