import styled from 'styled-components/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {layout, space, color} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  justify-content: center;
  align-items: center;
  ${layout}
`;

export const SuccessLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.successColor,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const PriceLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: verticalScale(5),
}))`
  font-size: ${moderateScale(32)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const DesLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  mx: scale(40),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  text-align: center;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const TransactionContainer = styled.View.attrs(props => ({
  mt: verticalScale(10),
  bg: props?.theme?.colors?.screenBg_light,
  px: scale(15),
  py: scale(20),
  mx: scale(20),
  borderRadius: scale(10),
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  ${layout}
  ${color}
  ${space}
`;

export const TransactionIDLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter-Bold;
  text-align: center;
  font-weight: 400;
  ${color}
  ${space}
    ${layout}
`;

export const TransactionIDText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Inter-Bold;
  text-align: center;
  ${color}
  ${space}
      ${layout}
`;

export const SuccessImage: any = styled.Image.attrs(() => ({
  width: scale(120),
  height: scale(120),
}))`
  align-self: center;
  ${color}
  ${space}
    ${layout}
`;
