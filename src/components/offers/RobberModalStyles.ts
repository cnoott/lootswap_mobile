import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const ModalContainerView = styled.View.attrs(() => ({
  p: scale(13),
}))`
  ${space}
`;

export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(10),
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalBodyText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  mb: verticalScale(12),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Medium;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;
export const PercentText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.redAlert,
  mb: verticalScale(12),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Medium;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;
